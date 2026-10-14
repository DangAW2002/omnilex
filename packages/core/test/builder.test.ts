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

    for (const indexPath of outputs.indexesGenerated) {
      const markdown = fs.readFileSync(indexPath, 'utf-8');
      for (const match of markdown.matchAll(/\]\(([^)]+\.md)\)/g)) {
        expect(fs.existsSync(path.resolve(path.dirname(indexPath), match[1]))).toBe(true);
      }
    }

    const terms = JSON.parse(fs.readFileSync(path.join(rootDir, 'dist', 'vi', 'terms.json'), 'utf-8'));
    const ambiguousMargin = terms.find((term: { key: string }) => term.key.toLowerCase() === 'margin');
    expect(ambiguousMargin.concepts.map((concept: { id: string }) => concept.id).sort()).toEqual(['margin', 'profit-margin']);
    expect(ambiguousMargin.autolink).toBe(false);

    const modData = path.join(rootDir, 'packages', 'claude-mod', 'data');
    const englishTerms = JSON.parse(fs.readFileSync(path.join(modData, 'terms-en.json'), 'utf-8'));
    const vietnameseConcepts = JSON.parse(fs.readFileSync(path.join(modData, 'concepts-vi.json'), 'utf-8'));
    const englishSearch = JSON.parse(fs.readFileSync(path.join(modData, 'search-en.json'), 'utf-8'));
    const englishConcepts = JSON.parse(fs.readFileSync(path.join(modData, 'concepts-en.json'), 'utf-8'));
    expect(englishTerms.some((term: { key: string }) => term.key === 'Compound Interest')).toBe(true);
    expect(vietnameseConcepts.find((concept: { id: string }) => concept.id === 'compound-interest').content)
      .toContain('Giải thích dễ hiểu');
    expect(englishSearch.find((concept: { id: string }) => concept.id === 'compound-interest').label)
      .toBe('Compound Interest');
    expect(englishConcepts.find((concept: { id: string }) => concept.id === 'compound-interest').content)
      .toContain('Easy explanation');
  });
});
