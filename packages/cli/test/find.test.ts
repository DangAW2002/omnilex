import { describe, it, expect, vi, beforeAll, afterAll } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAll, buildArtifacts } from '@omnilex/core';
import { findAction } from '../src/index.js';

// No .termbridge/ above cwd and an empty home: only the layout under test is read.
const emptyHome = fs.mkdtempSync(path.join(os.tmpdir(), 'tb-cli-home-'));
process.env.TERMBRIDGE_HOME = emptyHome;

describe('T-S3: tb find does not call loadAll() when dist is fresh', () => {
  const fakeDocs = [
    {
      id: 'compound-interest',
      label: 'Lãi kép',
      summary: 'Tiền lãi được cộng vào gốc.',
      domains: ['finance/personal-finance/saving'],
    },
  ];

  it('uses prebuilt dist/vi/search.json directly and never calls loadAll when dist is fresh', async () => {
    const mockLoadAll = vi.fn();
    const mockFindConcepts = vi.fn();
    const mockFindConceptsFromDocs = vi.fn().mockReturnValue([
      { id: 'compound-interest', label: 'Lãi kép', score: 1.0 },
    ]);

    const mockFs = {
      existsSync: vi.fn((p: string) => true),
      statSync: vi.fn((p: string) => {
        if (p.includes('search.json')) {
          return { mtimeMs: 2000 } as any; // dist mới hơn
        }
        return { mtimeMs: 1000 } as any; // concepts cũ hơn
      }),
      readFileSync: vi.fn().mockReturnValue(JSON.stringify(fakeDocs)),
    } as any;

    const { results, usedPrebuilt } = await findAction(
      '/mock/root',
      'lãi kép',
      { locale: 'vi' },
      {
        loadAll: mockLoadAll as any,
        findConcepts: mockFindConcepts as any,
        findConceptsFromDocs: mockFindConceptsFromDocs as any,
        fs: mockFs,
        cwd: emptyHome,
        home: emptyHome,
      }
    );

    expect(usedPrebuilt).toBe(true);
    expect(mockLoadAll).not.toHaveBeenCalled();
    expect(mockFindConceptsFromDocs).toHaveBeenCalledWith(
      fakeDocs,
      'lãi kép',
      expect.objectContaining({ cacheKey: 'cli-dist:vi' })
    );
    expect(results).toHaveLength(1);
    expect(results[0].id).toBe('compound-interest');
  });

  it('falls back to loadAll() with warning when dist is stale (concepts newer than dist)', async () => {
    const mockLoadAll = vi.fn().mockReturnValue({ concepts: new Map() });
    const mockFindConcepts = vi.fn().mockReturnValue([
      { id: 'compound-interest', label: 'Lãi kép', score: 1.0 },
    ]);
    const mockFindConceptsFromDocs = vi.fn();

    const mockFs = {
      existsSync: vi.fn((p: string) => true),
      statSync: vi.fn((p: string) => {
        if (p.includes('search.json')) {
          return { mtimeMs: 1000 } as any; // dist cũ hơn
        }
        return { mtimeMs: 2000 } as any; // concepts mới hơn
      }),
      readFileSync: vi.fn(),
    } as any;

    const warnSpy = vi.spyOn(console, 'warn').mockImplementation(() => {});

    const { results, usedPrebuilt } = await findAction(
      '/mock/root',
      'lãi kép',
      { locale: 'vi' },
      {
        loadAll: mockLoadAll as any,
        findConcepts: mockFindConcepts as any,
        findConceptsFromDocs: mockFindConceptsFromDocs as any,
        fs: mockFs,
        cwd: emptyHome,
        home: emptyHome,
      }
    );

    expect(usedPrebuilt).toBe(false);
    expect(warnSpy).toHaveBeenCalled();
    expect(mockLoadAll).toHaveBeenCalledWith('/mock/root');
    expect(mockFindConcepts).toHaveBeenCalled();
    expect(mockFindConceptsFromDocs).not.toHaveBeenCalled();
    expect(results).toHaveLength(1);

    warnSpy.mockRestore();
  });
});

describe('T-S3: tb find reads packs when dist/manifest.json is fresh', () => {
  const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../');
  let tempRoot: string;

  beforeAll(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'tb-cli-find-'));
    const repo = loadAll(repoRoot);
    buildArtifacts({ ...repo, rootDir: tempRoot });
  });

  afterAll(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  function countingFs(reads: string[]) {
    return {
      ...fs,
      readFileSync: ((file: string, ...rest: any[]) => {
        reads.push(path.relative(tempRoot, file).split(path.sep).join('/'));
        return (fs.readFileSync as any)(file, ...rest);
      }) as typeof fs.readFileSync,
    };
  }

  it('never calls loadAll and reads only the manifest, pack.json files and the combined shard', async () => {
    const reads: string[] = [];
    const mockLoadAll = vi.fn();
    const { results, usedPrebuilt } = await findAction(tempRoot, 'lãi kép', { locale: 'vi' }, {
      fs: countingFs(reads),
      loadAll: mockLoadAll,
      cwd: tempRoot,
    });
    expect(usedPrebuilt).toBe(true);
    expect(mockLoadAll).not.toHaveBeenCalled();
    expect(results[0].id).toBe('compound-interest');
    const manifest = JSON.parse(fs.readFileSync(path.join(tempRoot, 'dist', 'manifest.json'), 'utf8'));
    const packFiles = manifest.packs.filter((pack: any) => pack.kind === 'content' && pack.role !== 'starter').map((pack: any) => `dist/${pack.path}`);
    expect(reads).toEqual(['dist/manifest.json', ...packFiles, 'dist/vi/search-index.json']);
    expect(reads.some((file) => file.includes('/concepts/') || file.endsWith('cards.json'))).toBe(false);
  });

  it('reads only the packs passed with --pack', async () => {
    const reads: string[] = [];
    const { results } = await findAction(tempRoot, 'token', { locale: 'en', pack: 'it' }, { fs: countingFs(reads), cwd: tempRoot });
    expect(results.length).toBeGreaterThan(0);
    expect(results.every((hit: any) => hit.domains[0].startsWith('it/'))).toBe(true);
    const packFiles = reads.filter((file) => file.startsWith('dist/packs/') && !file.endsWith('pack.json'));
    expect(packFiles.length).toBeGreaterThan(0);
    expect(packFiles.every((file) => file.startsWith('dist/packs/it.'))).toBe(true);
  });
});
