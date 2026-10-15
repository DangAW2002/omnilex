import { describe, expect, it } from 'vitest';
import { maxSatisfying, satisfies } from '../src/semver.js';
import { mergeConfigLayers } from '../src/config.js';
import { planLoad, resolvePacks, type Catalog, type CatalogPack } from '../src/resolver.js';

const MB = 1024 * 1024;

function pack(id: string, version: string, extra: Partial<CatalogPack> = {}): CatalogPack {
  return {
    id,
    version,
    kind: 'content',
    requires: {},
    concepts: 10,
    sha256: `${id}-${version}`,
    sourceId: 'store',
    path: `/store/${id}@${version}/pack.json`,
    tiers: {
      terms: { bytes: MB, files: { vi: { bytes: MB / 2, sha256: '' }, en: { bytes: MB / 2, sha256: '' } } },
      cards: { bytes: 2 * MB, files: { vi: { bytes: MB, sha256: '' }, en: { bytes: MB, sha256: '' } } },
      search: { bytes: 4 * MB, files: { vi: { bytes: 2 * MB, sha256: '' }, en: { bytes: 2 * MB, sha256: '' } } },
      explanations: { bytes: 8 * MB, files: { vi: { bytes: 4 * MB, sha256: '' }, en: { bytes: 4 * MB, sha256: '' } } },
    },
    ...extra,
  };
}

const meta = (id: string, version: string, requires: Record<string, string>) => pack(id, version, { kind: 'meta', requires, tiers: undefined, concepts: 0 });

function catalog(packs: CatalogPack[], pins?: Record<string, string>): Catalog {
  return { sources: [{ id: 'store', kind: 'store', dir: '/store' }], packs, pins };
}

const ops = (...items: string[]) => mergeConfigLayers([{ kind: 'project', source: 'p', dir: '/p', config: { packs: items } }]).packOps;

describe('semver', () => {
  it('handles caret, tilde, comparators and wildcards', () => {
    expect(satisfies('0.3.2', '^0.3')).toBe(true);
    expect(satisfies('0.4.0', '^0.3')).toBe(false);
    expect(satisfies('0.1.5', '^0.1.0')).toBe(true);
    expect(satisfies('0.2.0', '^0.1.0')).toBe(false);
    expect(satisfies('0.0.3', '^0.0.3')).toBe(true);
    expect(satisfies('0.0.4', '^0.0.3')).toBe(false);
    expect(satisfies('1.9.0', '^1.2')).toBe(true);
    expect(satisfies('2.0.0', '^1.2')).toBe(false);
    expect(satisfies('1.2.9', '~1.2.3')).toBe(true);
    expect(satisfies('1.3.0', '~1.2.3')).toBe(false);
    expect(satisfies('2.0.0', '>=1.0.0 <3')).toBe(true);
    expect(satisfies('3.0.0', '>=1.0.0 <3')).toBe(false);
    expect(satisfies('1.0.0-beta', '^1.0.0')).toBe(false);
    expect(satisfies('5.1.0', '*')).toBe(true);
    expect(satisfies('1.2.3', '1.2.3')).toBe(true);
    expect(satisfies('1.2.4', '1.2.x')).toBe(true);
    expect(satisfies('1.0.0', '^2 || ^1')).toBe(true);
    expect(maxSatisfying(['0.1.0', '0.1.9', '0.2.0', 'bad'], '^0.1')).toBe('0.1.9');
    expect(maxSatisfying(['0.1.0'], '^1')).toBeNull();
  });
});

describe('T-P3: dependency resolution', () => {
  const packs = [
    pack('it.ai-ml', '0.1.0'), pack('it.ai-ml', '0.1.4'), pack('it.ai-ml', '0.2.0'),
    pack('it.web', '0.1.0'), pack('iot', '0.1.0'), pack('finance.investing', '0.1.0'),
    meta('it', '0.1.0', { 'it.ai-ml': '^0.1', 'it.web': '^0.1' }),
    meta('tech', '0.1.0', { it: '^0.1', iot: '^0.1' }),
  ];

  it('expands nested meta-packs and picks the highest version in range', () => {
    const result = resolvePacks(ops('+tech'), catalog(packs));
    expect(result.packs.map((p) => `${p.id}@${p.version}`)).toEqual(['it.ai-ml@0.1.4', 'it.web@0.1.0', 'iot@0.1.0']);
    expect(result.errors).toEqual([]);
  });

  it('honours lockfile pins inside the range', () => {
    const result = resolvePacks(ops('+it.ai-ml@^0.1'), catalog(packs, { 'it.ai-ml': '0.1.0' }));
    expect(result.packs.map((p) => p.version)).toEqual(['0.1.0']);
  });

  it('applies - after + and keeps priority order', () => {
    const result = resolvePacks(ops('+finance.investing', '+tech', '-it.web'), catalog(packs));
    expect(result.packs.map((p) => p.id)).toEqual(['finance.investing', 'it.ai-ml', 'iot']);
  });

  it('reports a dependency cycle clearly and keeps what it can', () => {
    const cyclic = [...packs, meta('a', '0.1.0', { b: '*', iot: '*' }), meta('b', '0.1.0', { a: '*' })];
    const result = resolvePacks(ops('+a'), catalog(cyclic));
    expect(result.errors).toEqual(['Vòng phụ thuộc giữa các gói / dependency cycle: a → b → a']);
    expect(result.packs.map((p) => p.id)).toEqual(['iot']);
  });

  it('lists missing packs and resolves the rest', () => {
    const result = resolvePacks(ops('+iot', '+media.journalism', '+it.ai-ml@^9'), catalog(packs));
    expect(result.packs.map((p) => p.id)).toEqual(['iot']);
    expect(result.missing).toEqual(['it.ai-ml@^9', 'media.journalism']);
  });

  it('selects every content pack when nothing is configured (D3)', () => {
    const result = resolvePacks([], catalog(packs), { packsConfigured: false });
    expect(result.packs.map((p) => p.id).sort()).toEqual(['finance.investing', 'iot', 'it.ai-ml', 'it.web']);
  });

  it('prefers a dev build over the store', () => {
    const dev = pack('iot', '0.0.1', { sourceId: 'dev0' });
    const c: Catalog = { sources: [{ id: 'dev0', kind: 'dev', dir: '/repo/dist', contentIds: ['iot'] }, { id: 'store', kind: 'store', dir: '/store' }], packs: [...packs, dev] };
    expect(resolvePacks(ops('+iot'), c).packs[0].sourceId).toBe('dev0');
  });
});

describe('T-P4: resource budget', () => {
  const three = [pack('a', '1.0.0'), pack('b', '1.0.0'), pack('c', '1.0.0')];
  const effective = (limits: { memoryMB?: number }, explanations?: 'eager') => ({
    profile: 'standard' as const,
    tiers: { vectors: 'auto' as const, explanations },
    limits,
  });

  it('plans tiers per profile', () => {
    const lite = planLoad(three, { ...effective({}), profile: 'lite' }, { surface: 'cli', locale: 'vi' });
    expect(lite.packs[0].tiers).toMatchObject({ terms: 'eager', cards: 'eager', search: 'off', explanations: 'off' });
    const cli = planLoad(three, effective({}), { surface: 'cli', locale: 'vi' });
    expect(cli.packs[0].tiers).toMatchObject({ search: 'eager', explanations: 'lazy' });
    const mod = planLoad(three, effective({}), { surface: 'mod', locale: 'vi' });
    expect(mod.packs[0].tiers.search).toBe('lazy');
  });

  it('degrades in the 3.5 order and reports every step', () => {
    const notices: string[] = [];
    // per pack: terms 0.5*3 + cards 1*3 + search 2*2 + explanations 4*1.5 = 14.5 MB;
    // lazy explanations leave 8.5, lazy search 4.5, so 3 packs need one dropped
    const plan = planLoad(three, effective({ memoryMB: 10 }, 'eager'), { surface: 'cli', locale: 'vi', notice: (m) => notices.push(m) });
    expect(plan.steps).toEqual(notices);
    expect(plan.steps).toHaveLength(3);
    expect(plan.steps[0]).toMatch(/explanations now lazy/);
    expect(plan.steps[1]).toMatch(/search index loads on first search/);
    expect(plan.steps[2]).toMatch(/dropped pack c/);
    expect(plan.packs.map((p) => p.pack.id)).toEqual(['a', 'b']);
    expect(plan.dropped.map((p) => p.id)).toEqual(['c']);
    expect(plan.estimateMB).toBeCloseTo(9, 5);
  });

  it('does nothing when the plan fits', () => {
    const plan = planLoad(three, effective({ memoryMB: 1000 }), { surface: 'cli', locale: 'vi' });
    expect(plan.steps).toEqual([]);
    expect(plan.packs).toHaveLength(3);
  });

  it('falls back from semantic to standard with one notice', () => {
    const notices: string[] = [];
    const plan = planLoad(three, { ...effective({}), profile: 'semantic' }, { surface: 'cli', locale: 'vi', notice: (m) => notices.push(m) });
    expect(plan.profile).toBe('standard');
    expect(notices).toHaveLength(1);
  });
});

describe('meta-packs in the resolution', () => {
  it('reports the meta-packs it expanded so lockfiles can record them', () => {
    const packs = [pack('iot', '0.1.0'), pack('it.web', '0.1.0'), meta('it', '0.1.0', { 'it.web': '*' }), meta('tech', '0.1.0', { it: '*', iot: '*' })];
    const result = resolvePacks(ops('+tech'), catalog(packs));
    expect(result.metas.map((p) => p.id)).toEqual(['tech', 'it']);
  });
});
