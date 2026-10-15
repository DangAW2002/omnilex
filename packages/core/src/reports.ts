// tb report coverage / collisions (Plan 2.6) and the verbatim-overlap check
// for content batches (T-C5).
import fs from 'node:fs';
import path from 'node:path';
import { normalizeSearchTerm } from './matcher.js';
import { domainMatches } from './search-config.js';
import type { RepositoryData } from './types.js';

export interface CoverageRow {
  branch: string;
  concepts: number;
  locales: Record<string, number>;
  status: Record<string, number>;
}

// Concepts per level-2 branch (by primary domain) under a prefix.
export function coverageReport(repo: RepositoryData, prefix?: string): CoverageRow[] {
  const locales = repo.localesConfig.locales.filter((locale) => locale.status === 'primary').map((locale) => locale.code);
  const rows = new Map<string, CoverageRow>();
  for (const record of repo.concepts.values()) {
    const primary = record.metadata.domains?.[0];
    if (!primary || (prefix && !domainMatches(primary, prefix))) continue;
    const branch = primary.split('/').slice(0, 2).join('/');
    let row = rows.get(branch);
    if (!row) {
      row = { branch, concepts: 0, locales: Object.fromEntries(locales.map((code) => [code, 0])), status: {} };
      rows.set(branch, row);
    }
    row.concepts++;
    for (const code of locales) if (record.locales[code]) row.locales[code]++;
    row.status[record.metadata.status] = (row.status[record.metadata.status] || 0) + 1;
  }
  return [...rows.values()].sort((a, b) => a.branch.localeCompare(b.branch));
}

export interface CollisionRow {
  locale: string;
  key: string;
  concepts: string[];
  problems: string[];
}

// Keys (labels, aliases, loanwords) shared by several concepts, with what each
// homonym still lacks: qualifiers and two-way confusable links (T-C2).
export function collisionsReport(repo: RepositoryData): CollisionRow[] {
  const groups = new Map<string, { locale: string; key: string; ids: Set<string> }>();
  for (const record of repo.concepts.values()) {
    for (const [locale, entry] of Object.entries(record.locales)) {
      const fm = entry.frontmatter;
      for (const value of [fm.label, ...(fm.aliases || []), ...(fm.loanwords || [])]) {
        if (!value) continue;
        const key = value.trim().toLowerCase();
        const id = `${locale}\u0000${key}`;
        if (!groups.has(id)) groups.set(id, { locale, key, ids: new Set() });
        groups.get(id)!.ids.add(record.id);
      }
    }
  }
  const rows: CollisionRow[] = [];
  for (const { locale, key, ids } of groups.values()) {
    if (ids.size < 2) continue;
    const concepts = [...ids].sort();
    const problems: string[] = [];
    for (const id of concepts) {
      const record = repo.concepts.get(id)!;
      for (const code of Object.keys(record.locales)) {
        if (!record.locales[code].frontmatter.qualifier) problems.push(`${id}: thiếu qualifier (${code}) / no qualifier`);
      }
      for (const other of concepts) {
        if (other === id) continue;
        if (!(record.metadata.relations?.confusable || []).includes(other)) problems.push(`${id} → ${other}: thiếu confusable / not confusable`);
      }
    }
    rows.push({ locale, key, concepts, problems: [...new Set(problems)] });
  }
  return rows.sort((a, b) => a.locale.localeCompare(b.locale) || a.key.localeCompare(b.key));
}

export interface OverlapMatch {
  concept: string;
  locale: string;
  against: string;
  words: string;
}

function words(text: string): string[] {
  return normalizeSearchTerm(text).match(/[\p{L}\p{N}]+/gu) || [];
}

function shingles(list: string[], size: number): Set<string> {
  const result = new Set<string>();
  for (let i = 0; i + size <= list.length; i++) result.add(list.slice(i, i + size).join(' '));
  return result;
}

// T-C5: no run of `size` (default 8) words in a concept may repeat a quote or
// the text of a fetched paraphrase-only source (<sourcesDir>/<ref>/*.txt).
export function overlapReport(repo: RepositoryData, options: { sourcesDir?: string; size?: number; conceptIds?: string[] } = {}): OverlapMatch[] {
  const size = options.size ?? 8;
  const references: Array<{ name: string; grams: Set<string> }> = [];
  for (const record of repo.concepts.values()) {
    const all = [...(record.metadata.sources || []), ...Object.values(record.locales).flatMap((entry) => entry.frontmatter.sources || [])];
    for (const source of all) {
      if (typeof source === 'object' && source.quote) references.push({ name: `quote ${source.ref} (${record.id})`, grams: shingles(words(source.quote), size) });
    }
  }
  if (options.sourcesDir && fs.existsSync(options.sourcesDir)) {
    for (const ref of fs.readdirSync(options.sourcesDir).sort()) {
      const reuse = repo.sourcesConfig?.[ref]?.reuse;
      if (reuse === 'adapt') continue;
      const dir = path.join(options.sourcesDir, ref);
      if (!fs.statSync(dir).isDirectory()) continue;
      for (const file of fs.readdirSync(dir).filter((name) => name.endsWith('.txt')).sort()) {
        references.push({ name: `${ref}/${file}`, grams: shingles(words(fs.readFileSync(path.join(dir, file), 'utf-8')), size) });
      }
    }
  }
  const matches: OverlapMatch[] = [];
  const wanted = options.conceptIds ? new Set(options.conceptIds) : null;
  for (const record of repo.concepts.values()) {
    if (wanted && !wanted.has(record.id)) continue;
    for (const [locale, entry] of Object.entries(record.locales)) {
      const fm = entry.frontmatter;
      const text = [fm.summary, ...(fm.plain_descriptions || []), entry.content].join('\n');
      const own = shingles(words(text), size);
      for (const reference of references) {
        for (const gram of own) {
          if (reference.grams.has(gram)) {
            matches.push({ concept: record.id, locale, against: reference.name, words: gram });
            break;
          }
        }
      }
    }
  }
  return matches;
}
