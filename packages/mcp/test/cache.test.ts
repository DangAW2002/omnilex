import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as core from '@termbridge/core';
import { createToolHandler, handleToolCall } from '../src/index.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../');
// An empty home and a cwd without .termbridge/, so only the dist under test is read.
const emptyHome = fs.mkdtempSync(path.join(os.tmpdir(), 'tb-mcp-home-'));
process.env.TERMBRIDGE_HOME = emptyHome;

describe('T-S4: MCP loads each (locale, pack) index once across tool calls', () => {
  let tempRoot: string;

  beforeAll(() => {
    tempRoot = fs.mkdtempSync(path.join(os.tmpdir(), 'tb-mcp-cache-'));
    core.buildArtifacts({ ...core.loadAll(repoRoot), rootDir: tempRoot });
  });

  afterAll(() => {
    fs.rmSync(tempRoot, { recursive: true, force: true });
  });

  function countingIO(reads: string[]): core.PackIO {
    return {
      readText(relPath) {
        reads.push(relPath);
        const file = path.join(tempRoot, 'dist', ...relPath.split('/'));
        return fs.existsSync(file) ? fs.readFileSync(file, 'utf8') : null;
      },
    };
  }

  const isolated = (extra: object) => ({ cwd: emptyHome, home: emptyHome, ...extra });

  it('reads every shard once per locale and never loads the repository', async () => {
    const reads: string[] = [];
    const loadAllSpy = vi.spyOn(core, 'loadAll');
    const handle = createToolHandler(tempRoot, isolated({ io: countingIO(reads), manifestStamp: () => 1 }));

    for (const description of ['lãi kép', 'tiền gốc', 'lãi suất']) {
      expect((await handle('find_term', { description, locale: 'vi' })).candidates.length).toBeGreaterThan(0);
    }
    for (const description of ['compound interest', 'principal']) {
      expect((await handle('find_term', { description, locale: 'en' })).candidates.length).toBeGreaterThan(0);
    }

    expect(reads.filter((file) => file === 'manifest.json')).toHaveLength(1);
    expect(reads.filter((file) => file === 'vi/search-index.json')).toHaveLength(1);
    expect(reads.filter((file) => file === 'en/search-index.json')).toHaveLength(1);
    expect(loadAllSpy).not.toHaveBeenCalled();
    loadAllSpy.mockRestore();
  });

  it('reloads after the manifest changes', async () => {
    const reads: string[] = [];
    let stamp = 1;
    const handle = createToolHandler(tempRoot, isolated({ io: countingIO(reads), manifestStamp: () => stamp }));
    await handle('find_term', { description: 'lãi kép', locale: 'vi' });
    await handle('find_term', { description: 'lãi kép', locale: 'vi' });
    stamp = 2;
    await handle('find_term', { description: 'lãi kép', locale: 'vi' });
    expect(reads.filter((file) => file === 'manifest.json')).toHaveLength(2);
    expect(reads.filter((file) => file === 'vi/search-index.json')).toHaveLength(2);
  });

  it('answers explain_term and browse_domain from packs', async () => {
    const handle = createToolHandler(tempRoot, isolated({ io: countingIO([]), manifestStamp: () => 1 }));
    const explained = await handle('explain_term', { term: 'Lãi kép', locale: 'vi' });
    expect(explained.id).toBe('compound-interest');
    expect(explained.prerequisites).toEqual(['interest-rate', 'principal']);
    expect(explained.explanation_body.length).toBeGreaterThan(0);
    expect((await handle('explain_term', { term: 'margin', locale: 'en' })).ambiguous).toBe(true);
    expect((await handle('explain_term', { term: 'không có', locale: 'vi' })).error).toBeDefined();

    const legacy = createToolHandler(repoRoot, isolated({ manifestStamp: () => null }));
    const browse = await handle('browse_domain', { domain_path: 'finance/personal-finance', locale: 'vi' });
    const expected = await legacy('browse_domain', { domain_path: 'finance/personal-finance', locale: 'vi' });
    expect(browse.concepts.map((c: any) => c.id).sort()).toEqual(expected.concepts.map((c: any) => c.id).sort());
  });
});

describe('T-S4: repository fallback builds the index once per locale', () => {
  beforeEach(() => {
    core.clearSearchIndexCache();
  });

  it('builds the MiniSearch index exactly once per locale without dist', async () => {
    const addAllSpy = vi.spyOn(core.MiniSearch.prototype, 'addAll');
    const handle = createToolHandler(repoRoot, { cwd: emptyHome, home: emptyHome, manifestStamp: () => null });

    for (const description of ['lãi kép', 'tiền gốc', 'lãi suất']) {
      expect((await handle('find_term', { description, locale: 'vi' })).candidates).toBeDefined();
    }
    expect(addAllSpy).toHaveBeenCalledTimes(1);

    for (const description of ['compound interest', 'principal']) {
      expect((await handle('find_term', { description, locale: 'en' })).candidates).toBeDefined();
    }
    expect(addAllSpy).toHaveBeenCalledTimes(2);
    addAllSpy.mockRestore();
  });

  it('keeps the default handleToolCall export working', async () => {
    expect((await handleToolCall('find_term', { description: 'lãi kép', locale: 'vi' })).candidates[0].id).toBe('compound-interest');
  });
});

describe('MCP follows the project configuration (Plan 3.8)', () => {
  it('serves the packs a project selects and reloads when its config changes', async () => {
    const temp = fs.mkdtempSync(path.join(os.tmpdir(), 'tb-mcp-project-'));
    try {
      core.buildArtifacts({ ...core.loadAll(repoRoot), rootDir: path.join(temp, 'repo') });
      const dist = path.join(temp, 'repo', 'dist').split(path.sep).join('/');
      const project = path.join(temp, 'proj');
      fs.mkdirSync(path.join(project, '.termbridge'), { recursive: true });
      const config = path.join(project, '.termbridge', 'config.yaml');
      fs.writeFileSync(config, `root: true\npacks: ['dev:${dist}', -it]\n`);
      const handle = createToolHandler(path.join(temp, 'nowhere'), { cwd: project, home: path.join(temp, 'home') });
      const before = await handle('find_term', { description: 'token', locale: 'en' });
      expect(before.candidates.length).toBeGreaterThan(0);
      expect(before.candidates.every((c: any) => !c.domains[0].startsWith('it/'))).toBe(true);

      fs.writeFileSync(config, `root: true\npacks: ['dev:${dist}', -finance]\n`);
      const future = new Date(Date.now() + 5000);
      fs.utimesSync(config, future, future);
      const after = await handle('find_term', { description: 'token', locale: 'en' });
      expect(after.candidates.length).toBeGreaterThan(0);
      expect(after.candidates.every((c: any) => c.domains[0].startsWith('it/'))).toBe(true);
    } finally {
      fs.rmSync(temp, { recursive: true, force: true });
    }
  });
});
