import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAll } from '../src/loader.js';
import { buildArtifacts } from '../src/builder.js';
import { validateRepository } from '../src/validator.js';
import { PackStore } from '../src/pack-reader.js';
import { nodePackIO, nodeProjectFS } from '../src/pack-install.js';
import { fromCsv, fromTbx, parseXml, rowFromExplanation, toCsv, toJsonl, toTbx, writeConcepts, type ExchangeRow } from '../src/exchange.js';
import { overlayCards, overlayTerms, parseOverlay } from '../src/overlay.js';
import { mergeTerms } from '../src/pack-format.js';
import { createMatcher } from '../src/matcher.js';
import { openProject } from '../src/project.js';
import { buildLocalPack, ensureLocalPacks } from '../src/glossary.js';
import { searchConfigHash } from '../src/search-config.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../');
let temp: string;
let dist: string;
let rows: ExchangeRow[];

function storeOf(distDir: string, options: any = {}) {
  return new PackStore({ readText: (rel) => nodePackIO.readText(path.join(distDir, ...rel.split('/'))) }, () => {}, options);
}

beforeAll(() => {
  temp = fs.mkdtempSync(path.join(os.tmpdir(), 'tb-exchange-'));
  buildArtifacts({ ...loadAll(repoRoot), rootDir: path.join(temp, 'repo') });
  dist = path.join(temp, 'repo', 'dist');
  const store = storeOf(dist);
  rows = [];
  for (const locale of ['vi', 'en']) {
    for (const packId of store.contentPacks()) {
      for (const card of store.cards(packId, locale)) {
        const row = rowFromExplanation(card, store.explanation(card.id, locale)!, locale);
        if (row) rows.push(row);
      }
    }
  }
});

afterAll(() => {
  fs.rmSync(temp, { recursive: true, force: true });
});

function repoCopy(name: string): string {
  const dir = path.join(temp, name);
  for (const sub of ['config', 'schema', 'taxonomy']) fs.cpSync(path.join(repoRoot, sub), path.join(dir, sub), { recursive: true });
  fs.mkdirSync(path.join(dir, 'concepts'), { recursive: true });
  return dir;
}

describe('T-I2: CSV and TBX round trips', () => {
  it('exports one row per concept and locale with its own content', () => {
    const repo = loadAll(repoRoot);
    const expected = [...repo.concepts.values()].reduce((sum, record) => sum + ['vi', 'en'].filter((locale) => record.locales[locale]).length, 0);
    expect(rows.length).toBe(expected);
  });

  it('CSV export -> import -> export is identical', () => {
    const csv = toCsv(rows);
    expect(csv.split('\r\n')[0]).toBe('id,locale,label,qualifier,aliases,loanwords,plain_descriptions,summary,domains,level,body,locale_extra,concept_extra');
    const back = fromCsv(csv);
    expect(toCsv(back)).toBe(csv);
    expect(back).toEqual(JSON.parse(JSON.stringify(rows.map((row) => ({ ...row, qualifier: row.qualifier || undefined })))));
  });

  it('CSV quoting survives commas, quotes and new lines', () => {
    const tricky: ExchangeRow = { ...rows[0], summary: 'a, "b"\nc', body: '## X\r\nline, "q"' };
    expect(fromCsv(toCsv([tricky]))[0]).toEqual(JSON.parse(JSON.stringify(tricky)));
  });

  it('TBX is well-formed TBX-Basic and keeps the fields it supports', () => {
    const tbx = toTbx(rows);
    const root = parseXml(tbx);
    const tbxNode = root.children.find((node) => node.name === 'tbx')!;
    expect(tbxNode.attrs.type).toBe('TBX-Basic');
    expect(tbxNode.attrs.xmlns).toBe('urn:iso:std:iso:30042:ed-2');
    expect(tbxNode.children.map((node) => node.name)).toEqual(['tbxHeader', 'text']);
    const back = fromTbx(tbx);
    const key = (row: ExchangeRow) => `${row.id}/${row.locale}`;
    const sorted = (list: ExchangeRow[]) => [...list].sort((a, b) => key(a).localeCompare(key(b)));
    expect(sorted(back).map((row) => [key(row), row.label, row.aliases, row.loanwords, row.summary, row.domains]))
      .toEqual(sorted(rows).map((row) => [key(row), row.label, row.aliases, row.loanwords, row.summary, row.domains]));
  });

  it('JSONL has one parseable line per row', () => {
    const lines = toJsonl(rows).trim().split('\n');
    expect(lines).toHaveLength(rows.length);
    expect(JSON.parse(lines[0]).id).toBe(rows[0].id);
  });
});

describe('T-I3: import into concepts/', () => {
  it('writes drafts drafted_by: import that pass validate --strict', () => {
    const dir = repoCopy('repo-import');
    const result = writeConcepts(fromCsv(toCsv(rows)), path.join(dir, 'concepts'), { mode: 'repository' });
    expect(result.errors).toEqual([]);
    const repo = loadAll(dir);
    expect(repo.concepts.size).toBe(loadAll(repoRoot).concepts.size);
    for (const record of repo.concepts.values()) {
      expect(record.metadata.status).toBe('draft');
      expect(record.metadata.provenance).toEqual({ drafted_by: 'import' });
    }
    // As in the CLI flow: import, tb build, then validate --strict.
    buildArtifacts(repo);
    const report = validateRepository(loadAll(dir), { strict: true });
    expect(report.errors.map((issue) => issue.message)).toEqual([]);
    expect(report.warnings.map((issue) => issue.message)).toEqual([]);
    // Content comes through unchanged.
    const original = loadAll(repoRoot).concepts.get('compound-interest')!;
    const imported = repo.concepts.get('compound-interest')!;
    expect(imported.locales.vi.content.trim()).toBe(original.locales.vi.content.trim());
    expect(imported.locales.vi.frontmatter).toEqual(original.locales.vi.frontmatter);
    expect(imported.metadata.relations).toEqual(original.metadata.relations);
  });

  it('refuses rows without sources and never overwrites without --overwrite', () => {
    const dir = repoCopy('repo-refuse');
    const bare = rows.filter((row) => row.id === 'cookie').map((row) => ({ ...row, concept_extra: {} }));
    expect(writeConcepts(bare, path.join(dir, 'concepts'), { mode: 'repository' }).errors[0]).toMatch(/no sources/);
    const one = rows.filter((row) => row.id === 'cookie');
    writeConcepts(one, path.join(dir, 'concepts'), { mode: 'repository' });
    expect(writeConcepts(one, path.join(dir, 'concepts'), { mode: 'repository' }).skipped).toHaveLength(1);
    // A TBX file has no sources: fine for a glossary, refused for concepts/.
    const fromTbxRows = fromTbx(toTbx(one));
    expect(writeConcepts(fromTbxRows, path.join(dir, 'glossary'), { mode: 'glossary' }).written).toEqual(['cookie']);
  });
});

describe('T-I4: overlay', () => {
  const { overlay, warnings } = parseOverlay({
    concepts: {
      cookie: { autolink: 'never' },
      'compound-interest': { aliases: { vi: ['+lãi mẹ đẻ lãi con', '-lãi nhập gốc'] } },
    },
    exclude: ['roi'],
    prefer: { token: 'token-llm' },
  }, 'test');

  it('parses without warnings', () => {
    expect(warnings).toEqual([]);
  });

  it('excludes, prefers, overrides autolink and edits aliases in recognition', () => {
    const plain = storeOf(dist);
    const ids = plain.contentPacks();
    const terms = (store: PackStore) => ids.flatMap((id) => store.terms(id, 'vi'));
    const cards = (store: PackStore) => new Map(ids.flatMap((id) => store.cards(id, 'vi')).map((card) => [card.id, card]));
    const overlaid = storeOf(dist, { overlay });
    const merged = mergeTerms(terms(overlaid), (id) => cards(overlaid).get(id));
    const keyOf = (key: string) => merged.find((term) => term.key.toLowerCase() === key);

    expect(merged.some((term) => term.concepts.some((concept) => concept.id === 'roi'))).toBe(false);
    expect(keyOf('cookie')!.autolink).toBe(false);
    expect(keyOf('token')!.concepts.map((concept) => concept.id)).toEqual(['token-llm']);
    expect(keyOf('lãi mẹ đẻ lãi con')!.concepts.map((concept) => concept.id)).toEqual(['compound-interest']);
    expect(keyOf('lãi nhập gốc')).toBeUndefined();

    const matcher = createMatcher(merged as any);
    expect(matcher.matchedConcepts('Đây là lãi mẹ đẻ lãi con.', 4).map((concept: any) => concept.id)).toContain('compound-interest');
  });

  it('applies to lookup and search, never to explanations', () => {
    const plain = storeOf(dist);
    const overlaid = storeOf(dist, { overlay });
    expect(overlaid.lookup('token', { locale: 'vi' }).map((card) => card.id)).toEqual(['token-llm']);
    expect(plain.lookup('token', { locale: 'vi' }).length).toBeGreaterThan(1);
    expect(overlaid.lookup('ROI', { locale: 'vi' })).toEqual([]);
    expect(overlaid.find('tỷ suất hoàn vốn', { locale: 'vi' }).map((hit) => hit.id)).not.toContain('roi');
    expect(plain.find('tỷ suất hoàn vốn', { locale: 'vi' }).map((hit) => hit.id)).toContain('roi');
    expect(overlaid.lookup('lãi mẹ đẻ lãi con', { locale: 'vi' }).map((card) => card.id)).toEqual(['compound-interest']);
    expect(overlaid.explanation('compound-interest', 'vi')).toEqual(plain.explanation('compound-interest', 'vi'));
    expect(overlayCards(overlay, [], 'vi')).toEqual([]);
    expect(overlayTerms(overlay, [], 'vi')).toEqual([]);
  });

  it('is read from .termbridge/overrides.yaml by openProject', async () => {
    const project = path.join(temp, 'proj-overlay');
    fs.mkdirSync(path.join(project, '.termbridge'), { recursive: true });
    fs.writeFileSync(path.join(project, '.termbridge', 'config.yaml'), `root: true\npacks: ['dev:${dist.split(path.sep).join('/')}']\n`);
    fs.writeFileSync(path.join(project, '.termbridge', 'overrides.yaml'), 'exclude: [roi]\nprefer: { token: token-llm }\n');
    const ctx = await openProject(nodeProjectFS, { cwd: project, home: path.join(temp, 'home'), surface: 'cli', configHash: searchConfigHash() });
    expect(ctx.overlay.exclude).toEqual(['roi']);
    expect(ctx.watch.some((file) => file.endsWith('overrides.yaml'))).toBe(true);
  });
});

describe('local glossary (Plan 3.7)', () => {
  it('builds local.<name>, serves it through local:, and rebuilds when sources change', async () => {
    const project = path.join(temp, 'proj-glossary');
    const glossary = path.join(project, '.termbridge', 'glossary');
    fs.mkdirSync(glossary, { recursive: true });
    writeConcepts(fromCsv(toCsv(rows.filter((row) => row.id === 'cookie'))).map((row) => ({ ...row, id: 'team-cookie', label: `${row.label} nội bộ` })), glossary, { mode: 'glossary' });
    fs.writeFileSync(path.join(project, '.termbridge', 'config.yaml'), 'root: true\npacks: [local:./.termbridge/glossary]\n');

    const open = () => openProject(nodeProjectFS, { cwd: project, home: path.join(temp, 'home-glossary'), surface: 'cli', configHash: searchConfigHash() });
    const before = await open();
    expect(before.plan.packs).toHaveLength(0);
    expect(before.notices.join('\n')).toMatch(/not built yet/);

    expect(ensureLocalPacks(before).changed).toBe(true);
    const ctx = await open();
    expect(ctx.plan.packs.map((item) => item.pack.id)).toEqual(['local.glossary']);
    const store = new PackStore(nodePackIO, () => {}, { manifest: ctx.manifest });
    expect(store.lookup('Cookie nội bộ', { locale: 'vi' }).map((card) => card.id)).toEqual(['team-cookie']);
    expect(store.explanation('team-cookie', 'vi')?.entry.content.length).toBeGreaterThan(0);

    expect(ensureLocalPacks(ctx).changed).toBe(false);
    const md = path.join(glossary, 'team-cookie', 'vi.md');
    fs.writeFileSync(md, fs.readFileSync(md, 'utf-8').replace('Cookie nội bộ', 'Bánh quy nội bộ'));
    expect(ensureLocalPacks(ctx).changed).toBe(true);

    const cache = buildLocalPack(glossary, path.join(temp, 'cache-x'), { knownIds: new Set(['team-cookie']) });
    expect(cache.notices.join('\n')).toMatch(/same id as an installed pack/);
  });
});
