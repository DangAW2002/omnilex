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
    fields: ['label', 'aliases', 'loanwords', 'plain_descriptions', 'summary'],
    storeFields: ['id', 'label', 'qualifier', 'summary', 'domains', 'plain_descriptions'],
    searchOptions: {
      boost: { plain_descriptions: 3, label: 2, aliases: 2, summary: 1 },
      fuzzy: 0.2,
      prefix: true,
    },
  });

  miniSearch.addAll(docs);
  const rawResults = miniSearch.search(query);

  return rawResults.slice(0, 10).map((r) => ({
    id: r.id,
    label: r.label,
    qualifier: r.qualifier,
    summary: r.summary,
    domains: r.domains,
    score: r.score,
  }));
}

export function showConcept(
  repoData: RepositoryData,
  idOrLabel: string,
  options: { locale?: string } = {}
): { record: ConceptRecord; localeEntry?: any; rawMarkdown?: string } | null {
  const targetLocale = options.locale || repoData.localesConfig.pivot;

  // Direct lookup by ID
  let record = repoData.concepts.get(idOrLabel);

  // If not found by ID, look up by label or alias
  if (!record) {
    const norm = idOrLabel.trim().toLowerCase();
    for (const r of repoData.concepts.values()) {
      const entry = r.locales[targetLocale] || r.locales[repoData.localesConfig.pivot];
      if (entry) {
        if (entry.frontmatter.label.toLowerCase() === norm) {
          record = r;
          break;
        }
        if (entry.frontmatter.aliases?.some((a) => a.toLowerCase() === norm)) {
          record = r;
          break;
        }
      }
    }
  }

  if (!record) return null;

  const localeEntry = record.locales[targetLocale] || record.locales[repoData.localesConfig.pivot];
  return {
    record,
    localeEntry,
    rawMarkdown: localeEntry?.content,
  };
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
