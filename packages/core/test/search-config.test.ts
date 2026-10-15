import { describe, expect, it } from 'vitest';
import { generateMockDataset } from '../../../bench/generate.js';
import {
  SEARCH_RESULT_LIMIT,
  createSearchIndex,
  loadSearchIndex,
  searchConfigHash,
  searchIndexToJSON,
  searchIndexes,
  type SearchDoc,
} from '../src/search-config.js';

const dataset = generateMockDataset(1000, 42);
const docs: SearchDoc[] = dataset.conceptsVi.map((concept) => ({
  id: concept.id,
  label: concept.label,
  qualifier: concept.qualifier,
  aliases: concept.aliases.join(' '),
  loanwords: concept.loanwords.join(' '),
  plain_descriptions: concept.plain_descriptions.join(' '),
  summary: concept.summary,
  domains: concept.domains,
  status: concept.status,
}));

const queries = [
  // labels with and without diacritics
  ...dataset.conceptsVi.slice(0, 12).map((concept) => concept.label),
  ...dataset.conceptsVi.slice(12, 22).map((concept) => concept.label.normalize('NFD').replace(/\p{M}/gu, '')),
  // English labels and acronyms
  ...dataset.conceptsEn.slice(0, 8).map((concept) => concept.label),
  'API', 'JWT', 'RAG', 'IoT',
  // prefixes
  'lã', 'tiề', 'hệ th', 'giao', 'comp', 'prin', 'plat',
  // light typos
  'lãi kẹp', 'tiên gốc', 'hệ thông', 'giao thuc', 'thuật toan', 'compund', 'pipline',
  // descriptions
  ...dataset.conceptsVi.slice(30, 36).map((concept) => concept.plain_descriptions[0]).filter(Boolean),
];

describe('T-S1: prebuilt index on the bench dataset', () => {
  it('loadJSON gives identical results to a freshly built index on >= 50 queries', () => {
    expect(queries.length).toBeGreaterThanOrEqual(50);
    const fresh = createSearchIndex(docs);
    const loaded = loadSearchIndex(searchIndexToJSON(fresh));
    for (const query of queries) {
      const a = fresh.search(query);
      const b = loaded.search(query);
      expect(b.map((hit) => hit.id), query).toEqual(a.map((hit) => hit.id));
      b.forEach((hit, i) => expect(hit.score).toBeCloseTo(a[i].score, 8));
      const rankedFresh = searchIndexes([fresh], query);
      const rankedLoaded = searchIndexes([loaded], query);
      expect(rankedLoaded.map((hit) => hit.id), query).toEqual(rankedFresh.map((hit) => hit.id));
      rankedLoaded.forEach((hit, i) => expect(hit.score).toBeCloseTo(rankedFresh[i].score, 8));
    }
  });
});

describe('Two-pass ranking (Q4)', () => {
  const index = createSearchIndex(docs);

  it('skips fuzzy matching when exact and prefix matches find something', () => {
    const query = 'hệ thống';
    const exact = index.search(query, { fuzzy: false });
    expect(exact.length).toBeGreaterThanOrEqual(SEARCH_RESULT_LIMIT);
    const ids = new Set(exact.map((hit) => hit.id));
    expect(searchIndexes([index], query).every((hit) => ids.has(hit.id))).toBe(true);

    const label = docs[0].label;
    const few = new Set(index.search(label, { fuzzy: false }).map((hit) => hit.id));
    expect(few.size).toBeGreaterThan(0);
    expect(searchIndexes([index], label).every((hit) => few.has(hit.id))).toBe(true);
  });

  it('falls back to fuzzy matching for typos', () => {
    const query = 'compund';
    expect(index.search(query, { fuzzy: false })).toHaveLength(0);
    expect(searchIndexes([index], query).length).toBeGreaterThan(0);
  });

  it('has a stable config hash', () => {
    expect(searchConfigHash()).toMatch(/^[0-9a-f]{16}$/);
    expect(searchConfigHash()).toBe(searchConfigHash());
  });
});

describe('domainMatches', () => {
  it('matches taxonomy prefixes on segment boundaries', async () => {
    const { domainMatches } = await import('../src/search-config.js');
    expect(domainMatches('it/web/api', 'it')).toBe(true);
    expect(domainMatches('it/web/api', 'it/web')).toBe(true);
    expect(domainMatches('it/web/api', 'it/web/')).toBe(true);
    expect(domainMatches('it', 'it')).toBe(true);
    expect(domainMatches('iot/edge-cloud', 'it')).toBe(false);
    expect(domainMatches('it/webhooks', 'it/web')).toBe(false);
  });
});
