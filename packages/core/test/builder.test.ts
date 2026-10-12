import { describe, it, expect } from 'vitest';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';
import { loadAll } from '../src/loader.js';
import { buildArtifacts } from '../src/builder.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../../');

describe('Artifact Builder Engine', () => {
  it('should build indexes, llms.txt, and dist artifacts cleanly', () => {
    const repoData = loadAll(rootDir);
    const outputs = buildArtifacts(repoData);

    expect(outputs.indexesGenerated.length).toBeGreaterThan(0);
    expect(outputs.distGenerated.length).toBeGreaterThan(0);

    const viIndexAll = path.join(rootDir, 'indexes', 'vi', '_all.md');
    expect(fs.existsSync(viIndexAll)).toBe(true);

    const homonymsFile = path.join(rootDir, 'indexes', 'vi', '_homonyms.md');
    expect(fs.existsSync(homonymsFile)).toBe(true);

    const llmsFile = path.join(rootDir, 'llms.txt');
    expect(fs.existsSync(llmsFile)).toBe(true);
  });
});
