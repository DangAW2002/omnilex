import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import crypto from 'node:crypto';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAll } from '../src/loader.js';
import { buildArtifacts } from '../src/builder.js';
import { PACK_SCHEMA } from '../src/pack-schema.js';
import { STARTER_MAX_BYTES, type PackCard } from '../src/pack-format.js';
import { PackStore } from '../src/pack-reader.js';
import { nodePackIO } from '../src/pack-install.js';
import { derivePack, filesToTbpack, importTbpack, inspectTbpack, packDirToTbpack } from '../src/tbpack.js';
import { buildRegistry, installFromRegistries } from '../src/registry.js';
import { readZip, writeZip } from '../src/zip.js';
import { domainMatches } from '../src/search-config.js';
import type { RepositoryData } from '../src/types.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../');
let temp: string;
let dist: string;
let repo: RepositoryData;

beforeAll(() => {
  temp = fs.mkdtempSync(path.join(os.tmpdir(), 'tb-tbpack-'));
  repo = loadAll(repoRoot);
  buildArtifacts({ ...repo, rootDir: path.join(temp, 'repo') });
  dist = path.join(temp, 'repo', 'dist');
});

afterAll(() => {
  fs.rmSync(temp, { recursive: true, force: true });
});

const sha256 = (data: Buffer | string) => crypto.createHash('sha256').update(data).digest('hex');
const listFiles = (dir: string): string[] => fs.existsSync(dir)
  ? fs.readdirSync(dir, { withFileTypes: true }).flatMap((entry) => entry.isDirectory()
    ? listFiles(path.join(dir, entry.name)).map((file) => `${entry.name}/${file}`)
    : [entry.name]).sort()
  : [];

describe('T-I6: starter pack', () => {
  it('is at most 1 MB, has exactly terms, cards and search, and holds level-1 concepts', () => {
    const pack = JSON.parse(fs.readFileSync(path.join(dist, 'packs', 'starter', 'pack.json'), 'utf-8'));
    expect(pack.role).toBe('starter');
    expect(Object.keys(pack.tiers).sort()).toEqual(['cards', 'search', 'terms']);
    const bytes = Object.values(pack.tiers).reduce((sum: number, tier: any) => sum + tier.bytes, 0);
    expect(bytes).toBeLessThanOrEqual(STARTER_MAX_BYTES);
    const cards: PackCard[] = JSON.parse(fs.readFileSync(path.join(dist, 'packs', 'starter', 'vi', 'cards.json'), 'utf-8'));
    expect(cards.length).toBe(pack.concepts);
    expect(cards.every((card) => card.level === 1)).toBe(true);
    const levelOne = [...repo.concepts.values()].filter((record) => record.metadata.level === 1).length;
    // Every level-1 concept up to 300, unless the 1 MB cap stops it first.
    const wanted = Math.min(levelOne, 300);
    expect(cards.length).toBeLessThanOrEqual(wanted);
    if (cards.length < wanted) expect(bytes).toBeGreaterThan(STARTER_MAX_BYTES * 0.9);
  });

  it('ships with the mod as a small dist of its own', () => {
    const bundled = path.join(temp, 'repo', 'packages', 'claude-mod', 'data', 'starter');
    // The temp repo has no packages/claude-mod; the real build writes it.
    expect(fs.existsSync(bundled)).toBe(false);
    const real = path.join(repoRoot, 'packages', 'claude-mod', 'data', 'starter', 'manifest.json');
    expect(JSON.parse(fs.readFileSync(real, 'utf-8')).packs.map((entry: any) => entry.id)).toEqual(['starter']);
  });
});

describe('T-I5: attributions.json', () => {
  it('lists every reuse: adapt source the concepts of each pack draw on', () => {
    const manifest = JSON.parse(fs.readFileSync(path.join(dist, 'manifest.json'), 'utf-8'));
    for (const entry of manifest.packs.filter((item: any) => item.kind === 'content')) {
      const dir = path.join(dist, 'packs', entry.id);
      const cards: PackCard[] = JSON.parse(fs.readFileSync(path.join(dir, 'vi', 'cards.json'), 'utf-8'));
      const expected = new Map<string, Set<string>>();
      for (const card of cards) {
        const record = repo.concepts.get(card.id)!;
        const refs = [record.metadata.sources, ...Object.values(record.locales).map((locale) => locale.frontmatter.sources)]
          .flat()
          .flatMap((source: any) => (source && typeof source === 'object' ? [source.ref] : []));
        for (const ref of refs) {
          if (repo.sourcesConfig?.[ref]?.reuse !== 'adapt') continue;
          if (!expected.has(ref)) expected.set(ref, new Set());
          expected.get(ref)!.add(card.id);
        }
      }
      const attributions = JSON.parse(fs.readFileSync(path.join(dir, 'attributions.json'), 'utf-8'));
      expect(attributions.map((item: any) => [item.ref, item.concepts]), entry.id)
        .toEqual([...expected].sort(([a], [b]) => a.localeCompare(b)).map(([ref, ids]) => [ref, [...ids].sort()]));
      for (const item of attributions) expect(item.license).toBe(repo.sourcesConfig![item.ref].license);
    }
  });
});

describe('T-I2: .tbpack round trip', () => {
  it('export -> import gives byte-identical store files and the same effective data', () => {
    const home = path.join(temp, 'home-roundtrip');
    const source = path.join(dist, 'packs', 'finance.investing');
    const installed = importTbpack(packDirToTbpack(source), { home });
    const stored = path.join(home, 'store', installed.store);
    expect(listFiles(stored)).toEqual(listFiles(source));
    for (const file of listFiles(source)) {
      expect(sha256(fs.readFileSync(path.join(stored, file))), file).toBe(sha256(fs.readFileSync(path.join(source, file))));
    }
    const manifest = (dir: string) => ({
      formatVersion: 1, searchConfigHash: '', locales: [],
      packs: [{ id: 'finance.investing', kind: 'content' as const, version: installed.version, path: `${dir.split(path.sep).join('/')}/pack.json`, sha256: '', concepts: 3 }],
    });
    const fromStore = new PackStore(nodePackIO, () => {}, { manifest: manifest(stored) });
    const fromDist = new PackStore(nodePackIO, () => {}, { manifest: manifest(source) });
    for (const query of ['ký quỹ', 'token', 'roi']) {
      expect(fromStore.find(query, { locale: 'vi' })).toEqual(fromDist.find(query, { locale: 'vi' }));
    }
    // The dist reads its per-concept file (which keeps the build's filePath); the store reads the JSONL tier.
    const a = fromStore.explanation('margin', 'vi')!;
    const b = fromDist.explanation('margin', 'vi')!;
    expect(a.entry.content).toBe(b.entry.content);
    expect(a.entry.frontmatter).toEqual(b.entry.frontmatter);
    expect(a.metadata).toEqual(b.metadata);
    expect(importTbpack(packDirToTbpack(source), { home }).reused).toBe(true);
  });

  it('derives a pack by domain, locales and tiers that passes every import check', () => {
    const dirs = ['finance.investing', 'finance.personal-finance', 'it.web'].map((id) => path.join(dist, 'packs', id));
    const { dir, pack } = derivePack(dirs, {
      id: 'local.investing',
      title: { en: 'Investing' },
      version: '0.1.0',
      filter: (card) => card.domains.some((domain) => domainMatches(domain, 'finance/investing')),
      locales: ['vi'],
      tiers: ['terms', 'cards', 'search'],
    });
    expect(pack.locales).toEqual(['vi']);
    expect(Object.keys(pack.tiers!).sort()).toEqual(['cards', 'search', 'terms']);
    const cards: PackCard[] = JSON.parse(dir.get('vi/cards.json')!);
    const expected = dirs
      .flatMap((dir) => JSON.parse(fs.readFileSync(path.join(dir, 'vi', 'cards.json'), 'utf-8')) as PackCard[])
      .filter((card) => card.domains.some((domain) => domainMatches(domain, 'finance/investing')))
      .map((card) => card.id);
    expect(cards.map((card) => card.id).sort()).toEqual([...new Set(expected)].sort());
    expect(cards.length).toBeGreaterThan(1);
    const checked = inspectTbpack(filesToTbpack(dir));
    expect(checked.pack.id).toBe('local.investing');
  });

  it('keeps the embedded schema identical to schema/pack.schema.json', () => {
    expect(PACK_SCHEMA).toEqual(JSON.parse(fs.readFileSync(path.join(repoRoot, 'schema', 'pack.schema.json'), 'utf-8')));
  });
});

describe('T-I1: hostile .tbpack files are refused', () => {
  const source = () => path.join(dist, 'packs', 'it.web');
  const goodEntries = () => readZip(packDirToTbpack(source()));

  function expectRefused(buffer: Buffer, message: RegExp, options: any = {}) {
    const home = fs.mkdtempSync(path.join(temp, 'home-bad-'));
    const before = listFiles(temp).filter((file) => !file.startsWith(path.basename(home)));
    expect(() => importTbpack(buffer, { home, ...options })).toThrow(message);
    expect(listFiles(path.join(home, 'store')).filter((file) => !file.startsWith('.tmp'))).toEqual([]);
    expect(listFiles(path.join(home, 'store')).filter((file) => file.startsWith('.tmp'))).toEqual([]);
    expect(listFiles(temp).filter((file) => !file.startsWith(path.basename(home)))).toEqual(before);
  }

  it('refuses ../, absolute and drive paths', () => {
    for (const name of ['../evil.json', 'vi/../../evil.json', '/abs.json', 'C:/evil.json', 'vi\\terms.json']) {
      expectRefused(writeZip([...goodEntries(), { name, data: Buffer.from('{}') }]), /unsafe path|not allowed/);
    }
  });

  it('refuses unknown file names and undeclared files', () => {
    expectRefused(writeZip([...goodEntries(), { name: 'vi/run.sh', data: Buffer.from('rm -rf /') }]), /not allowed/);
    expectRefused(writeZip([...goodEntries(), { name: 'ja/vectors.bin', data: Buffer.from('x') }]), /not allowed/);
    const withoutJa = goodEntries().filter((entry) => !entry.name.startsWith('ja/'));
    expectRefused(writeZip(withoutJa), /missing declared file/);
    expectRefused(writeZip([...goodEntries(), { name: 'xx/terms.json', data: Buffer.from('[]') }]), /not declared/);
  });

  it('refuses symlink entries', () => {
    const zip = writeZip(goodEntries());
    // Mark the first central-directory entry as a symlink (mode 0o120777).
    const central = zip.indexOf(Buffer.from([0x50, 0x4b, 0x01, 0x02]));
    zip.writeUInt32LE((0o120777 << 16) >>> 0, central + 38);
    expectRefused(zip, /symlink/);
  });

  it('refuses entries over the size limits and inflation bombs', () => {
    expectRefused(packDirToTbpack(source()), /exceeds/, { limits: { maxEntries: 512, maxEntryBytes: 100, maxTotalBytes: 1e9 } });
    expectRefused(packDirToTbpack(source()), /exceeds/, { limits: { maxEntries: 512, maxEntryBytes: 1e9, maxTotalBytes: 1000 } });
    const bomb = writeZip([{ name: 'pack.json', data: Buffer.alloc(200000, 32) }]);
    // Declare 10 bytes while the deflated data expands to 200 kB.
    const local = bomb.indexOf(Buffer.from([0x50, 0x4b, 0x03, 0x04]));
    const central = bomb.indexOf(Buffer.from([0x50, 0x4b, 0x01, 0x02]));
    bomb.writeUInt32LE(10, local + 22);
    bomb.writeUInt32LE(10, central + 24);
    expectRefused(bomb, /cannot inflate|size differs/);
  });

  it('refuses malformed JSON, a pack.json that fails the schema, and wrong hashes', () => {
    const entries = goodEntries();
    const pack = JSON.parse(entries.find((entry) => entry.name === 'pack.json')!.data.toString('utf-8'));
    const broken = '{"not json';
    pack.tiers.cards.files.vi = { bytes: Buffer.byteLength(broken), sha256: sha256(broken) };
    const swapped = entries.map((entry) => entry.name === 'pack.json'
      ? { name: 'pack.json', data: Buffer.from(JSON.stringify(pack)) }
      : entry.name === 'vi/cards.json' ? { name: entry.name, data: Buffer.from(broken) } : entry);
    expectRefused(writeZip(swapped), /malformed JSON/);

    const noId = entries.map((entry) => entry.name === 'pack.json'
      ? { name: 'pack.json', data: Buffer.from(JSON.stringify({ ...pack, id: '../../evil' })) }
      : entry);
    expectRefused(writeZip(noId), /fails the schema/);
    expectRefused(writeZip([{ name: 'pack.json', data: Buffer.from('nope') }]), /not JSON/);

    const tampered = entries.map((entry) => entry.name === 'vi/terms.json' ? { name: entry.name, data: Buffer.from('[]') } : entry);
    expectRefused(writeZip(tampered), /sha256 mismatch/);
    expectRefused(packDirToTbpack(source()), /differs from the registry/, { expectedSha: '0'.repeat(64) });
    expectRefused(Buffer.from('not a zip at all, definitely not'), /not a zip/);
  });
});

describe('registry', () => {
  it('builds registry.json and installs a meta-pack with what it requires, offline', async () => {
    const out = path.join(temp, 'registry');
    const registry = buildRegistry({ distDir: dist, outDir: out, name: 'test' });
    expect(registry.packs.finance.versions[Object.keys(registry.packs.finance.versions)[0]].url).toMatch(/^finance-.*\.tbpack$/);
    const home = path.join(temp, 'home-registry');
    const installed = await installFromRegistries({ home, registries: [path.join(out, 'registry.json')], id: 'finance' });
    const expected = ['finance', ...Object.keys(JSON.parse(fs.readFileSync(path.join(dist, 'packs', 'finance', 'pack.json'), 'utf-8')).requires).sort()];
    expect(expected.length).toBeGreaterThan(1);
    expect(installed.map((item) => item.id)).toEqual(expected);
    expect(installed.every((item) => item.official === false)).toBe(true);
    await expect(installFromRegistries({ home, registries: [path.join(out, 'registry.json')], id: 'nope' })).rejects.toThrow(/not found/);
  });

  it('refuses a .tbpack whose sha256 differs from the registry', async () => {
    const out = path.join(temp, 'registry-bad');
    const registry = buildRegistry({ distDir: dist, outDir: out });
    const version = Object.keys(registry.packs['it.web'].versions)[0];
    fs.appendFileSync(path.join(out, registry.packs['it.web'].versions[version].url), Buffer.from([0]));
    await expect(installFromRegistries({ home: path.join(temp, 'home-registry-bad'), registries: [path.join(out, 'registry.json')], id: 'it.web' }))
      .rejects.toThrow(/differs from the registry/);
  });
});
