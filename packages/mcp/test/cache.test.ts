import { describe, it, expect, vi, beforeAll, afterAll, beforeEach } from 'vitest';
import fs from 'node:fs';
import os from 'node:os';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import * as core from '@termbridge/core';
import { createToolHandler, handleToolCall } from '../src/index.js';

const repoRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '../../../');

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

  it('reads every shard once per locale and never loads the repository', () => {
    const reads: string[] = [];
    const loadAllSpy = vi.spyOn(core, 'loadAll');
    const handle = createToolHandler(tempRoot, { io: countingIO(reads), manifestStamp: () => 1 });

    for (const description of ['lãi kép', 'tiền gốc', 'lãi suất']) {
      expect(handle('find_term', { description, locale: 'vi' }).candidates.length).toBeGreaterThan(0);
    }
    for (const description of ['compound interest', 'principal']) {
      expect(handle('find_term', { description, locale: 'en' }).candidates.length).toBeGreaterThan(0);
    }

    expect(reads.filter((file) => file === 'manifest.json')).toHaveLength(1);
    expect(reads.filter((file) => file === 'vi/search-index.json')).toHaveLength(1);
    expect(reads.filter((file) => file === 'en/search-index.json')).toHaveLength(1);
    expect(loadAllSpy).not.toHaveBeenCalled();
    loadAllSpy.mockRestore();
  });

  it('reloads after the manifest changes', () => {
    const reads: string[] = [];
    let stamp = 1;
    const handle = createToolHandler(tempRoot, { io: countingIO(reads), manifestStamp: () => stamp });
    handle('find_term', { description: 'lãi kép', locale: 'vi' });
    handle('find_term', { description: 'lãi kép', locale: 'vi' });
    stamp = 2;
    handle('find_term', { description: 'lãi kép', locale: 'vi' });
    expect(reads.filter((file) => file === 'manifest.json')).toHaveLength(2);
    expect(reads.filter((file) => file === 'vi/search-index.json')).toHaveLength(2);
  });

  it('answers explain_term and browse_domain from packs', () => {
    const handle = createToolHandler(tempRoot, { io: countingIO([]), manifestStamp: () => 1 });
    const explained = handle('explain_term', { term: 'Lãi kép', locale: 'vi' });
    expect(explained.id).toBe('compound-interest');
    expect(explained.prerequisites).toEqual(['interest-rate', 'principal']);
    expect(explained.explanation_body.length).toBeGreaterThan(0);
    expect(handle('explain_term', { term: 'margin', locale: 'en' }).ambiguous).toBe(true);
    expect(handle('explain_term', { term: 'không có', locale: 'vi' }).error).toBeDefined();

    const legacy = createToolHandler(repoRoot, { manifestStamp: () => null });
    const browse = handle('browse_domain', { domain_path: 'finance/personal-finance', locale: 'vi' });
    const expected = legacy('browse_domain', { domain_path: 'finance/personal-finance', locale: 'vi' });
    expect(browse.concepts.map((c: any) => c.id).sort()).toEqual(expected.concepts.map((c: any) => c.id).sort());
  });
});

describe('T-S4: repository fallback builds the index once per locale', () => {
  beforeEach(() => {
    core.clearSearchIndexCache();
  });

  it('builds the MiniSearch index exactly once per locale without dist', () => {
    const addAllSpy = vi.spyOn(core.MiniSearch.prototype, 'addAll');
    const handle = createToolHandler(repoRoot, { manifestStamp: () => null });

    for (const description of ['lãi kép', 'tiền gốc', 'lãi suất']) {
      expect(handle('find_term', { description, locale: 'vi' }).candidates).toBeDefined();
    }
    expect(addAllSpy).toHaveBeenCalledTimes(1);

    for (const description of ['compound interest', 'principal']) {
      expect(handle('find_term', { description, locale: 'en' }).candidates).toBeDefined();
    }
    expect(addAllSpy).toHaveBeenCalledTimes(2);
    addAllSpy.mockRestore();
  });

  it('keeps the default handleToolCall export working', () => {
    expect(handleToolCall('find_term', { description: 'lãi kép', locale: 'vi' }).candidates[0].id).toBe('compound-interest');
  });
});
