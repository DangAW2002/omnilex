import MiniSearch from 'minisearch';
import type { ConceptRecord, RepositoryData } from './types.js';

export interface FindResult {
  id: string;
  label: string;
  qualifier?: string;
  matchedPlainDescription?: string;
  summary: string;
  domains: string[];
  score: number;
}

export function normalizeSearchTerm(value: string): string {
  return value.normalize('NFD').replace(/\p{M}/gu, '').replace(/đ/gi, 'd').toLowerCase();
}

export function findConcepts(
  repoData: RepositoryData,
  query: string,
  options: { locale?: string; domain?: string } = {}
): FindResult[] {
  const targetLocale = options.locale || repoData.localesConfig.pivot;
  const targetDomain = options.domain;

  const docs: Array<{
    id: string;
    label: string;
    qualifier?: string;
    aliases: string;
    loanwords: string;
    plain_descriptions: string;
    summary: string;
    domains: string[];
  }> = [];

  for (const record of repoData.concepts.values()) {
    if (targetDomain) {
      const inDomain = record.metadata.domains.some((d) => d.startsWith(targetDomain));
      if (!inDomain) continue;
    }

    const entry = record.locales[targetLocale] || record.locales[repoData.localesConfig.pivot];
    if (!entry) continue;

    const fm = entry.frontmatter;
    docs.push({
      id: record.id,
      label: fm.label || record.id,
      qualifier: fm.qualifier,
      aliases: (fm.aliases || []).join(' '),
      loanwords: (fm.loanwords || []).join(' '),
      plain_descriptions: (fm.plain_descriptions || []).join(' '),
      summary: fm.summary || '',
      domains: record.metadata.domains,
    });
  }

  const miniSearch = new MiniSearch({
    fields: ['id', 'label', 'aliases', 'loanwords', 'plain_descriptions', 'summary'],
    storeFields: ['id', 'label', 'qualifier', 'summary', 'domains', 'plain_descriptions'],
    processTerm: normalizeSearchTerm,
    searchOptions: {
      boost: { id: 3, plain_descriptions: 3, label: 3, aliases: 2, summary: 1 },
      combineWith: 'AND',
      fuzzy: 0.15,
      prefix: true,
    },
  });

  miniSearch.addAll(docs);
  const rawResults = miniSearch.search(query);

  const bestScore = rawResults[0]?.score || 0;
  return rawResults.filter((r) => r.score >= bestScore * 0.35).slice(0, 5).map((r) => ({
    id: r.id,
    label: r.label,
    qualifier: r.qualifier,
    summary: r.summary,
    domains: r.domains,
    score: r.score,
  }));
}

export function lookupConcepts(
  repoData: RepositoryData,
  idOrLabel: string,
  options: { locale?: string } = {}
): Array<{ record: ConceptRecord; localeEntry?: any; rawMarkdown?: string }> {
  const targetLocale = options.locale || repoData.localesConfig.pivot;
  const explicitId = idOrLabel.startsWith('id:') ? idOrLabel.slice(3) : null;
  const matches = explicitId ? [repoData.concepts.get(explicitId)].filter((record): record is ConceptRecord => !!record)
    : Array.from(repoData.concepts.values()).filter((record) => {
    const entry = record.locales[targetLocale] || record.locales[repoData.localesConfig.pivot];
    const normalized = normalizeSearchTerm(idOrLabel.trim());
    return entry && (
      normalizeSearchTerm(entry.frontmatter.label) === normalized ||
      entry.frontmatter.aliases?.some((alias) => normalizeSearchTerm(alias) === normalized)
    );
  });
  if (!explicitId && matches.length === 0) {
    const direct = repoData.concepts.get(idOrLabel);
    if (direct) matches.push(direct);
  }

  return matches.map((record) => {
    const localeEntry = record.locales[targetLocale] || record.locales[repoData.localesConfig.pivot];
    return { record, localeEntry, rawMarkdown: localeEntry?.content };
  });
}

export function showConcept(
  repoData: RepositoryData,
  idOrLabel: string,
  options: { locale?: string } = {}
): { record: ConceptRecord; localeEntry?: any; rawMarkdown?: string } | null {
  const matches = lookupConcepts(repoData, idOrLabel, options);
  return matches.length === 1 ? matches[0] : null;
}

export interface LocaleReportRow {
  domain: string;
  totalConcepts: number;
  coverageByLocale: Record<string, { count: number; percentage: number }>;
}

export function generateLocaleReport(repoData: RepositoryData): LocaleReportRow[] {
  const rows: LocaleReportRow[] = [];
  const primaryLocales = repoData.localesConfig.locales.map((l) => l.code);

  for (const domain of repoData.domainsConfig.domains) {
    const domainConcepts = Array.from(repoData.concepts.values()).filter((c) =>
      c.metadata.domains.some((d) => d.startsWith(domain.id))
    );

    const total = domainConcepts.length;
    const coverage: Record<string, { count: number; percentage: number }> = {};

    for (const loc of primaryLocales) {
      const covered = domainConcepts.filter((c) => !!c.locales[loc]).length;
      coverage[loc] = {
        count: covered,
        percentage: total > 0 ? Math.round((covered / total) * 100) : 0,
      };
    }

    rows.push({
      domain: domain.id,
      totalConcepts: total,
      coverageByLocale: coverage,
    });
  }

  return rows;
}

export interface ReviewReportRow {
  id: string;
  label: string;
  domain: string;
  status: string;
  draftedBy: string;
}

export function generateReviewReport(repoData: RepositoryData): ReviewReportRow[] {
  const rows: ReviewReportRow[] = [];
  const pivot = repoData.localesConfig.pivot;

  for (const record of repoData.concepts.values()) {
    if (record.metadata.status === 'draft') {
      const entry = record.locales[pivot] || Object.values(record.locales)[0];
      rows.push({
        id: record.id,
        label: entry?.frontmatter.label || record.id,
        domain: record.metadata.domains[0] || 'unknown',
        status: record.metadata.status,
        draftedBy: record.metadata.provenance.drafted_by || 'unknown',
      });
    }
  }

  return rows.sort((a, b) => a.domain.localeCompare(b.domain));
}
