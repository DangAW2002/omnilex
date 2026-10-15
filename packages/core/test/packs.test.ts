import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAll } from '../src/loader.js';
import { buildArtifacts } from '../src/builder.js';
import { lookupConcepts, findConcepts, clearSearchIndexCache } from '../src/query.js';
import { PackStore, type PackIO } from '../src/pack-reader.js';
import {
  PACK_FORMAT_VERSION,
  PACK_TIERS,
  PACK_TIER_FILES,
  mergeTerms,
  packIdForDomain,
  termConceptFromCard,
  cardToSearchDoc,
  type PackCard,
  type PackTerm,
} from '../src/pack-format.js';
import { packingResolver } from '../src/packs.js';
import { createSearchIndex, searchConfigHash, searchIndexes } from '../src/search-config.js';
import type { RepositoryData } from '../src/types.js';
import Ajv from 'ajv';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const repoRoot = path.resolve(__dirname, '../../../');

let tempRoot: string;
let distDir: string;
let repo: RepositoryData;

function fsIO(reads?: string[], overrides: Record<string, string | null> = {}): PackIO {
  return {
    readText(relPath) {
      reads?.push(relPath);
      if (relPath in overrides) return overrides[relPath];
      const target = path.join(distDir, ...relPath.split('/'));
      return fs.existsSync(target) ? fs.readFileSync(target, 'utf-8') : null;
    },
  };
}

const readDist = (relPath: string) => fs.readFileSync(path.join(distDir, ...relPath.split('/')), 'utf-8');
const readDistJson = (relPath: string) => JSON.parse(readDist(relPath));
const sha256 = (content: string) => crypto.createHash('sha256').update(content, 'utf8').digest('hex');

beforeAll(() => {
  tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'tb-packs-test-'));
  repo = loadAll(repoRoot);
  buildArtifacts({ ...repo, rootDir: tempRoot });
  distDir = path.join(tempRoot, 'dist');
});

afterAll(() => {
  fs.rmSync(tempRoot, { recursive: true, force: true });
});

describe('T-P1: builder emits packs in the 3.2 format', () => {
  it('writes a manifest with the current format version and search config hash', () => {
    const manifest = readDistJson('manifest.json');
    expect(manifest.formatVersion).toBe(PACK_FORMAT_VERSION);
    expect(manifest.searchConfigHash).toBe(searchConfigHash());
    expect(manifest.locales).toEqual([...repo.localesConfig.locales.map((l) => l.code)].sort());
    expect(manifest.packs.map((pack: any) => pack.id)).toEqual([...manifest.packs.map((pack: any) => pack.id)].sort());
  });

  it('validates manifest.json and every pack.json against the JSON schemas', () => {
    const AjvClass = (Ajv as any).default || Ajv;
    const ajv = new AjvClass({ allErrors: true });
    const schema = (name: string) => JSON.parse(fs.readFileSync(path.join(repoRoot, 'schema', name), 'utf-8'));
    const validateManifest = ajv.compile(schema('manifest.schema.json'));
    const validatePack = ajv.compile(schema('pack.schema.json'));
    const manifest = readDistJson('manifest.json');
    expect(validateManifest(manifest), JSON.stringify(validateManifest.errors)).toBe(true);
    for (const entry of manifest.packs) {
      const pack = readDistJson(entry.path);
      expect(validatePack(pack), `${entry.id}: ${JSON.stringify(validatePack.errors)}`).toBe(true);
    }
  });

  it('puts every concept in exactly one content pack chosen by its primary domain', () => {
    const manifest = readDistJson('manifest.json');
    const packingOf = packingResolver(repo.domainsConfig);
    for (const locale of manifest.locales) {
      const seen = new Map<string, string>();
      for (const entry of manifest.packs.filter((pack: any) => pack.kind === 'content')) {
        const cards: PackCard[] = readDistJson(`packs/${entry.id}/${locale}/cards.json`);
        expect(cards.length).toBeGreaterThan(0);
        expect(cards.length).toBe(entry.concepts);
        for (const card of cards) {
          expect(seen.has(card.id)).toBe(false);
          seen.set(card.id, entry.id);
          expect(packIdForDomain(card.domains[0], packingOf)).toBe(entry.id);
        }
      }
      expect([...seen.keys()].sort()).toEqual([...repo.concepts.keys()].sort());
    }
  });

  it('records secondary domains of other packs in alsoIn', () => {
    const cards: PackCard[] = readDistJson('packs/finance.personal-finance/vi/cards.json');
    const compound = cards.find((card) => card.id === 'compound-interest')!;
    expect(compound.domains).toEqual(['finance/personal-finance/saving', 'finance/investing/portfolio-risk']);
    expect(compound.alsoIn).toEqual(['finance.investing']);
  });

  it('stores sha256 and byte counts that match every tier file and pack.json', () => {
    const manifest = readDistJson('manifest.json');
    for (const entry of manifest.packs) {
      const packText = readDist(entry.path);
      expect(sha256(packText)).toBe(entry.sha256);
      const pack = JSON.parse(packText);
      if (pack.kind !== 'content') continue;
      for (const tier of PACK_TIERS) {
        let total = 0;
        for (const locale of pack.locales) {
          const content = readDist(`packs/${pack.id}/${locale}/${PACK_TIER_FILES[tier]}`);
          expect(pack.tiers[tier].files[locale].sha256).toBe(sha256(content));
          expect(pack.tiers[tier].files[locale].bytes).toBe(Buffer.byteLength(content, 'utf8'));
          total += Buffer.byteLength(content, 'utf8');
        }
        expect(pack.tiers[tier].bytes).toBe(total);
      }
      expect(pack.tiers.search.configHash).toBe(searchConfigHash());
      expect(pack.status.draft + pack.status.reviewed + pack.status.verified + pack.status.deprecated).toBe(pack.concepts);
    }
  });

  it('builds meta-packs that only carry requires', () => {
    const manifest = readDistJson('manifest.json');
    const contentIds = manifest.packs.filter((pack: any) => pack.kind === 'content').map((pack: any) => pack.id);
    const finance = readDistJson('packs/finance/pack.json');
    expect(finance.kind).toBe('meta');
    expect(finance.tiers).toBeUndefined();
    expect(finance.concepts).toBe(0);
    expect(Object.keys(finance.requires)).toEqual(contentIds.filter((id: string) => id.startsWith('finance.')));
    expect(fs.readdirSync(path.join(distDir, 'packs', 'finance'))).toEqual(['pack.json']);
    const tech = readDistJson('packs/tech/pack.json');
    expect(Object.keys(tech.requires)).toContain('it');
  });

  it('keeps iot and product whole (packing: root) and splits other roots at level 2', () => {
    const packingOf = packingResolver(repo.domainsConfig);
    expect(packIdForDomain('iot/edge-cloud/gateways', packingOf)).toBe('iot');
    expect(packIdForDomain('product/agile-scrum', packingOf)).toBe('product');
    expect(packIdForDomain('it/ai-ml/llm-agents', packingOf)).toBe('it.ai-ml');
    expect(packIdForDomain('it', packingOf)).toBe('it.core');
  });

  it('writes explanations without local file paths', () => {
    const lines = readDist('packs/finance.personal-finance/vi/explanations.jsonl').trim().split('\n');
    const cards: PackCard[] = readDistJson('packs/finance.personal-finance/vi/cards.json');
    expect(lines).toHaveLength(cards.length);
    for (const line of lines) {
      const record = JSON.parse(line);
      expect(record.entry.filePath).toBeUndefined();
      expect(record.entry.content.length).toBeGreaterThan(0);
    }
  });
});

describe('Pack data matches the legacy outputs', () => {
  it('mergeTerms over all packs reproduces dist/<locale>/terms.json', () => {
    const manifest = readDistJson('manifest.json');
    for (const locale of manifest.locales) {
      const terms: PackTerm[] = [];
      const cards = new Map<string, PackCard>();
      for (const entry of manifest.packs.filter((pack: any) => pack.kind === 'content')) {
        terms.push(...readDistJson(`packs/${entry.id}/${locale}/terms.json`));
        for (const card of readDistJson(`packs/${entry.id}/${locale}/cards.json`)) cards.set(card.id, card);
      }
      const canonical = (list: any[]) => list
        // The display key is the first spelling met, so compare it case-insensitively.
        .map((term) => ({ ...term, key: term.key.toLowerCase(), concepts: [...term.concepts].sort((a: any, b: any) => a.id.localeCompare(b.id)) }))
        .sort((a, b) => a.key.localeCompare(b.key));
      const merged = mergeTerms(terms, (id) => (cards.has(id) ? termConceptFromCard(cards.get(id)!) : undefined));
      expect(JSON.parse(JSON.stringify(canonical(merged)))).toEqual(canonical(readDistJson(`${locale}/terms.json`)));
    }
  });

  it('tier-0 lookup returns the same concepts as lookupConcepts', () => {
    const store = new PackStore(fsIO());
    const targets = ['Lãi kép', 'lai kep', 'margin', 'Margin', 'token', 'id:principal', 'principal', 'API', 'không có'];
    for (const locale of ['vi', 'en']) {
      for (const target of targets) {
        const expected = lookupConcepts(repo, target, { locale }).map((match) => match.record.id).sort();
        expect(store.lookup(target, { locale }).map((card) => card.id).sort()).toEqual(expected);
      }
    }
  });

  it('explanation matches dist/<locale>/concepts/<id>.json and falls back to the JSONL tier', () => {
    const store = new PackStore(fsIO());
    const legacy = readDistJson('vi/concepts/compound-interest.json');
    expect(store.explanation('compound-interest', 'vi')?.entry.content).toBe(legacy.entry.content);

    const packOnly = new PackStore(fsIO(undefined, { 'vi/concepts/compound-interest.json': null }));
    const record = packOnly.explanation('compound-interest', 'vi');
    expect(record?.entry.content).toBe(legacy.entry.content);
    expect(record?.metadata.domains).toEqual(legacy.metadata.domains);
  });

  it('ranks the default selection exactly like the single repository index', () => {
    clearSearchIndexCache();
    const store = new PackStore(fsIO());
    const queries: Array<[string, string]> = [
      ['vi', 'lãi kép'], ['vi', 'tien lai lai sinh ra lai'], ['vi', 'tiền gốc'], ['vi', 'lãi suất'],
      ['vi', 'ký quỹ'], ['vi', 'đăng nhập'], ['en', 'compound interest'], ['en', 'principal'],
      ['en', 'interest rate'], ['en', 'cookie'], ['en', 'token'], ['en', 'profit margin'],
    ];
    for (const [locale, query] of queries) {
      const legacy = findConcepts(repo, query, { locale });
      const packed = store.find(query, { locale });
      expect(packed[0]?.id, `${locale}: ${query}`).toBe(legacy[0]?.id);
      expect(packed.map((hit) => hit.id).sort(), `${locale}: ${query}`).toEqual(legacy.map((hit) => hit.id).sort());
    }
  });
});

describe('T-P5: format versions', () => {
  it('loads formatVersion 1 and treats a missing manifest as the legacy layout (0)', () => {
    const current = new PackStore(fsIO());
    expect(current.available).toBe(true);
    expect(current.formatVersion).toBe(1);

    const notices: string[] = [];
    const legacy = new PackStore(fsIO(undefined, { 'manifest.json': null }), (message) => notices.push(message));
    expect(legacy.available).toBe(false);
    expect(legacy.formatVersion).toBe(0);
    expect(legacy.find('lãi kép', { locale: 'vi' })).toEqual([]);
    expect(notices).toEqual([]);
  });

  it('skips a newer manifest with exactly one notice and never throws', () => {
    const manifest = readDistJson('manifest.json');
    const notices: string[] = [];
    const store = new PackStore(
      fsIO(undefined, { 'manifest.json': JSON.stringify({ ...manifest, formatVersion: PACK_FORMAT_VERSION + 1 }) }),
      (message) => notices.push(message)
    );
    expect(store.available).toBe(false);
    expect(store.find('lãi kép', { locale: 'vi' })).toEqual([]);
    expect(store.lookup('Lãi kép', { locale: 'vi' })).toEqual([]);
    expect(store.explanation('compound-interest', 'vi')).toBeNull();
    expect(notices).toHaveLength(1);
  });

  it('skips a single newer pack and keeps the others usable', () => {
    const pack = readDistJson('packs/finance.personal-finance/pack.json');
    const notices: string[] = [];
    const store = new PackStore(
      fsIO(undefined, { 'packs/finance.personal-finance/pack.json': JSON.stringify({ ...pack, formatVersion: PACK_FORMAT_VERSION + 1 }) }),
      (message) => notices.push(message)
    );
    expect(store.find('lãi kép', { locale: 'vi' }).map((hit) => hit.id)).not.toContain('compound-interest');
    expect(store.find('lãi suất', { locale: 'vi' }).length).toBeGreaterThan(0);
    store.find('tiền gốc', { locale: 'vi' });
    expect(notices).toHaveLength(1);
  });
});

describe('T-S2: search config hash mismatch', () => {
  it('rebuilds the combined index from cards when the manifest hash differs', () => {
    const manifest = readDistJson('manifest.json');
    const reads: string[] = [];
    const notices: string[] = [];
    const stale = new PackStore(
      fsIO(reads, { 'manifest.json': JSON.stringify({ ...manifest, searchConfigHash: 'stale' }) }),
      (message) => notices.push(message)
    );
    const fresh = new PackStore(fsIO());
    for (const query of ['lãi kép', 'đăng nhập', 'compound interest']) {
      const locale = query === 'compound interest' ? 'en' : 'vi';
      expect(stale.find(query, { locale }).map((hit) => hit.id)).toEqual(fresh.find(query, { locale }).map((hit) => hit.id));
    }
    expect(notices).toHaveLength(1);
    expect(reads.some((file) => file.endsWith('search-index.json'))).toBe(false);
  });

  it('rebuilds a pack index from cards, warns once, and returns the same results', () => {
    const pack = readDistJson('packs/finance.personal-finance/pack.json');
    pack.tiers.search.configHash = 'stale';
    const reads: string[] = [];
    const notices: string[] = [];
    const stale = new PackStore(
      fsIO(reads, { 'packs/finance.personal-finance/pack.json': JSON.stringify(pack) }),
      (message) => notices.push(message)
    );
    const fresh = new PackStore(fsIO());
    for (const query of ['lãi kép', 'tiền gốc', 'tien lai lai sinh ra lai']) {
      const packs = ['finance.personal-finance'];
      expect(stale.find(query, { locale: 'vi', packs }).map((hit) => hit.id)).toEqual(fresh.find(query, { locale: 'vi', packs }).map((hit) => hit.id));
    }
    expect(notices).toHaveLength(1);
    expect(reads).not.toContain('packs/finance.personal-finance/vi/search-index.json');
    expect(reads).toContain('packs/finance.personal-finance/vi/cards.json');
  });
});

describe('T-S3/T-S4: reads only what is needed, once', () => {
  it('reads the manifest, pack.json and the shard of the selected packs only', () => {
    const reads: string[] = [];
    const store = new PackStore(fsIO(reads));
    const hits = store.find('lãi kép', { locale: 'vi', packs: ['finance.personal-finance'] });
    expect(hits[0]?.id).toBe('compound-interest');
    expect(reads).toEqual([
      'manifest.json',
      'packs/finance.personal-finance/pack.json',
      'packs/finance.personal-finance/vi/search-index.json',
    ]);
  });

  it('uses the combined index, not per-pack shards, when every pack is selected', () => {
    const reads: string[] = [];
    const store = new PackStore(fsIO(reads));
    expect(store.find('lãi kép', { locale: 'vi' })[0]?.id).toBe('compound-interest');
    expect(reads.filter((file) => file.endsWith('search-index.json'))).toEqual(['vi/search-index.json']);
  });

  it('expands a meta-pack and indexes exactly its content packs', () => {
    const reads: string[] = [];
    const store = new PackStore(fsIO(reads));
    const hits = store.find('lãi', { locale: 'vi', packs: ['finance'] });
    expect(hits.length).toBeGreaterThan(0);
    const cards = reads.filter((file) => file.endsWith('cards.json'));
    expect(cards.length).toBeGreaterThan(1);
    expect(cards.every((file) => file.startsWith('packs/finance.'))).toBe(true);
    expect(reads.some((file) => file.endsWith('search-index.json'))).toBe(false);
  });

  it('ranks a multi-pack subset exactly like an index over the same concepts (Q3)', () => {
    const cached = new Map<string, string>();
    const cache = { read: (key: string) => cached.get(key) ?? null, write: (key: string, text: string) => void cached.set(key, text) };
    const store = new PackStore(fsIO(), () => {}, { cache });
    const packs = ['finance.personal-finance', 'finance.investing', 'it.security'];
    const cards = packs.flatMap((id) => readDistJson(`packs/${id}/vi/cards.json`));
    const reference = createSearchIndex(cards.map(cardToSearchDoc));
    for (const query of ['lãi', 'đăng nhập', 'token', 'tien goc', 'rủi ro']) {
      expect(store.find(query, { locale: 'vi', packs }).map((hit) => hit.id), query)
        .toEqual(searchIndexes([reference], query).map((hit) => hit.id));
    }
    expect(cached.size).toBe(1);
    const reads: string[] = [];
    const again = new PackStore(fsIO(reads), () => {}, { cache });
    again.find('lãi', { locale: 'vi', packs });
    expect(reads.some((file) => file.endsWith('cards.json'))).toBe(false);
  });

  it('loads each (locale, pack) shard once across many queries', () => {
    const reads: string[] = [];
    const store = new PackStore(fsIO(reads));
    for (const query of ['lãi kép', 'tiền gốc', 'lãi suất', 'token']) store.find(query, { locale: 'vi' });
    store.find('principal', { locale: 'en' });
    const shards = reads.filter((file) => file.endsWith('search-index.json'));
    expect(new Set(shards).size).toBe(shards.length);
  });

  it('reports an unknown pack once and searches nothing for it', () => {
    const notices: string[] = [];
    const store = new PackStore(fsIO(), (message) => notices.push(message));
    expect(store.find('lãi kép', { locale: 'vi', packs: ['nope'] })).toEqual([]);
    store.find('lãi kép', { locale: 'vi', packs: ['nope'] });
    expect(notices).toHaveLength(1);
  });
});
