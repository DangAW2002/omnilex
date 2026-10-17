import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAll } from '../src/loader.js';
import { buildArtifacts } from '../src/builder.js';
import {
  editConfigPacks,
  frozenInstall,
  installPack,
  nodePackIO,
  nodeProjectFS,
  pruneStore,
  readLockFile,
  registerProject,
  verifyLock,
  writeLockFile,
} from '../src/pack-install.js';
import { openProject, toPosix } from '../src/project.js';
import { PackStore } from '../src/pack-reader.js';
import { searchConfigHash } from '../src/search-config.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../');
let temp: string;
let dist: string;
let home: string;

beforeAll(() => {
  temp = toPosix(fs.mkdtempSync(path.join(os.tmpdir(), 'tb-store-')));
  buildArtifacts({ ...loadAll(repoRoot), rootDir: `${temp}/repo` });
  dist = `${temp}/repo/dist`;
  home = `${temp}/home`;
});

afterAll(() => {
  fs.rmSync(temp, { recursive: true, force: true });
});

const lockOf = (installed: ReturnType<typeof installPack>) => ({
  lockfileVersion: 1 as const,
  packs: Object.fromEntries(installed.map((item) => [item.id, item.entry])),
});

function project(name: string, config: string): string {
  const dir = `${temp}/${name}`;
  fs.mkdirSync(`${dir}/.termbridge`, { recursive: true });
  fs.writeFileSync(`${dir}/.termbridge/config.yaml`, config);
  return dir;
}

describe('T-P6: store and lockfile', () => {
  it('installs from a built dist, verifies every tier and reuses the copy', () => {
    const first = installPack({ home, sources: [dist], id: 'finance.investing' });
    expect(first).toHaveLength(1);
    expect(first[0].store).toMatch(/^finance\.investing@\d+\.\d+\.\d+-[0-9a-f]{8}$/);
    expect(first[0].reused).toBe(false);
    expect(fs.existsSync(`${home}/store/${first[0].store}/vi/cards.json`)).toBe(true);
    const again = installPack({ home, sources: [dist], id: 'finance.investing' });
    expect(again[0].reused).toBe(true);
    expect(verifyLock(home, lockOf(first))).toEqual([]);
  });

  it('installs what a meta-pack requires', () => {
    const installed = installPack({ home, sources: [dist], id: 'finance' });
    // The meta-pack installs itself plus exactly what its pack.json requires.
    const expected = ['finance', ...Object.keys(JSON.parse(fs.readFileSync(path.join(dist, 'packs', 'finance', 'pack.json'), 'utf-8')).requires).sort()];
    expect(expected.length).toBeGreaterThan(1);
    expect(installed.map((item) => item.id)).toEqual(expected);
  });

  it('fails on a wrong hash and leaves no store entry behind', () => {
    const bad = `${temp}/bad-dist`;
    fs.cpSync(dist, bad, { recursive: true });
    fs.appendFileSync(`${bad}/packs/it.web/en/cards.json`, ' ');
    expect(() => installPack({ home: `${temp}/home-bad`, sources: [bad], id: 'it.web' })).toThrow(/sha256/);
    expect(fs.existsSync(`${temp}/home-bad/store`) ? fs.readdirSync(`${temp}/home-bad/store`) : []).toEqual([]);
  });

  it('detects a store copy that no longer matches the lockfile', () => {
    const installed = installPack({ home: `${temp}/home-tamper`, sources: [dist], id: 'it.security' });
    fs.appendFileSync(`${temp}/home-tamper/store/${installed[0].store}/vi/terms.json`, ' ');
    expect(verifyLock(`${temp}/home-tamper`, lockOf(installed)).join('\n')).toMatch(/sha256 mismatch vi\/terms.json/);
  });

  it('install --frozen fails when the lock does not match the configuration', () => {
    const installed = installPack({ home, sources: [dist], id: 'finance.investing' });
    const lock = lockOf(installed);
    expect(frozenInstall({ home, lock, sources: [dist], wanted: ['finance.investing'] })).toEqual([]);
    expect(frozenInstall({ home, lock, sources: [dist], wanted: ['finance.investing', 'it.web'] })[0]).toMatch(/does not match/);
    const wrong = { ...lock, packs: { 'finance.investing': { ...lock.packs['finance.investing'], sha256: '0'.repeat(64) } } };
    expect(frozenInstall({ home, lock: wrong, sources: [dist], wanted: ['finance.investing'] }).join('\n')).toMatch(/differs from the lockfile/);
  });

  it('shares one store copy between two projects and prune keeps what they reference', () => {
    const sharedHome = `${temp}/home-shared`;
    const a = project('proj-a', 'packs: [+it.web]\n');
    const b = project('proj-b', 'packs: [+it.web, +iot]\n');
    const web = installPack({ home: sharedHome, sources: [dist], id: 'it.web' });
    const security = installPack({ home: sharedHome, sources: [dist], id: 'it.security' });
    writeLockFile(`${a}/.termbridge/lock.json`, lockOf(web));
    writeLockFile(`${b}/.termbridge/lock.json`, lockOf(web));
    registerProject(sharedHome, a);
    registerProject(sharedHome, b);
    expect(readLockFile(`${a}/.termbridge/lock.json`).packs['it.web'].store).toBe(readLockFile(`${b}/.termbridge/lock.json`).packs['it.web'].store);
    expect(fs.readdirSync(`${sharedHome}/store`)).toHaveLength(2);

    const result = pruneStore(sharedHome);
    expect(result.kept).toEqual([web[0].store]);
    expect(result.removed).toEqual([security[0].store]);

    fs.rmSync(a, { recursive: true, force: true });
    expect(pruneStore(sharedHome).forgotten).toEqual([a]);
    expect(pruneStore(sharedHome).kept).toEqual([web[0].store]);
  });

  it('refuses an install over limits.diskMB', () => {
    expect(() => installPack({ home: `${temp}/home-disk`, sources: [dist], id: 'finance.investing', diskMB: 0.001 })).toThrow(/diskMB/);
  });

  it('edits the packs list of a config file', () => {
    const file = `${temp}/edit/.termbridge/config.yaml`;
    editConfigPacks(file, (packs) => [...packs, '+it.web']);
    expect(editConfigPacks(file, (packs) => [...packs, '-finance'])).toEqual(['+it.web', '-finance']);
    expect(fs.readFileSync(file, 'utf-8')).toContain('+it.web');
  });
});

describe('openProject over dev builds and the store', () => {
  it('resolves a dev build and keeps its combined index', async () => {
    const dir = project('proj-dev', `root: true\npacks: ['dev:${dist}']\n`);
    const ctx = await openProject(nodeProjectFS, { cwd: dir, home: `${temp}/empty-home`, surface: 'cli', configHash: searchConfigHash() });
    expect(ctx.resolved.packs.length).toBeGreaterThan(5);
    expect(ctx.manifest.search?.files.vi.path).toBe(`${dist}/vi/search-index.json`);
    const store = new PackStore(nodePackIO, () => {}, { manifest: ctx.manifest });
    expect(store.find('lãi kép', { locale: 'vi' })[0]?.id).toBe('compound-interest');
    expect(store.explanation('compound-interest', 'vi')?.entry.content.length).toBeGreaterThan(0);
  });

  it('reads store packs pinned by the project lock and reports missing ones once', async () => {
    const pinnedHome = `${temp}/home-pinned`;
    const dir = project('proj-store', 'root: true\npacks: [+finance.investing, +media.journalism]\n');
    const installed = installPack({ home: pinnedHome, sources: [dist], id: 'finance.investing' });
    writeLockFile(`${dir}/.termbridge/lock.json`, lockOf(installed));
    const ctx = await openProject(nodeProjectFS, { cwd: dir, home: pinnedHome, surface: 'cli', configHash: searchConfigHash() });
    expect(ctx.resolved.packs.map((p) => p.id)).toEqual(['finance.investing']);
    expect(ctx.notices.filter((n) => n.includes('media.journalism'))).toHaveLength(1);
    expect(ctx.manifest.search).toBeUndefined();
    const store = new PackStore(nodePackIO, () => {}, { manifest: ctx.manifest });
    expect(store.find('ký quỹ', { locale: 'vi' })[0]?.id).toBe('margin');
    // Store packs have no per-concept files: the explanation comes from the JSONL tier.
    expect(store.explanation('margin', 'vi')?.entry.content.length).toBeGreaterThan(0);
  });

  it('plans lite without search or explanations', async () => {
    const dir = project('proj-lite', `root: true\nprofile: lite\npacks: ['dev:${dist}']\n`);
    const ctx = await openProject(nodeProjectFS, { cwd: dir, home: `${temp}/empty-home`, surface: 'mod', configHash: searchConfigHash() });
    expect(ctx.plan.packs.every((p) => p.tiers.search === 'off' && p.tiers.explanations === 'off')).toBe(true);
    expect(ctx.disabled['it.web']).toEqual(['search', 'explanations']);
    const store = new PackStore(nodePackIO, () => {}, { manifest: ctx.manifest, disabled: ctx.disabled });
    expect(store.explanation('cookie', 'vi')).toBeNull();
  });
});
