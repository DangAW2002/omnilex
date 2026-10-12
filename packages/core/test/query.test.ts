import { describe, it, expect } from 'vitest';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import { loadAll } from '../src/loader.js';
import { findConcepts, showConcept, generateLocaleReport } from '../src/query.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const rootDir = path.resolve(__dirname, '../../../');

describe('Query and Reporting Engine', () => {
  it('should resolve reverse lookup query to correct concept', () => {
    const repoData = loadAll(rootDir);
    const results = findConcepts(repoData, 'tiền lãi lại sinh ra lãi', { locale: 'vi' });

    expect(results.length).toBeGreaterThan(0);
    expect(results[0].id).toBe('compound-interest');
  });

  it('should resolve forward lookup by ID', () => {
    const repoData = loadAll(rootDir);
    const result = showConcept(repoData, 'compound-interest', { locale: 'vi' });

    expect(result).not.toBeNull();
    expect(result?.localeEntry?.frontmatter.label).toBe('Lãi kép');
  });

  it('should generate locale coverage matrix', () => {
    const repoData = loadAll(rootDir);
    const report = generateLocaleReport(repoData);

    expect(report.length).toBe(3); // finance, media, it
  });
});
