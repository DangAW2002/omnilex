import { describe, it, expect } from 'vitest';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';
import { migrateAllSources, resolveSourceRef } from '@termbridge/core';

describe('tb sources migrate (T-V3)', () => {
  it('correctly infers known source refs from URLs', () => {
    const sourcesConfig = {
      'investor-gov': { url: 'https://www.investor.gov' } as any,
      'sec-gov': { url: 'https://www.sec.gov' } as any,
      'nist-csrc': { url: 'https://csrc.nist.gov/glossary' } as any,
    };

    expect(resolveSourceRef('https://www.investor.gov/intro/terms', sourcesConfig)).toBe('investor-gov');
    expect(resolveSourceRef('https://www.sec.gov/reports/guide', sourcesConfig)).toBe('sec-gov');
    expect(resolveSourceRef('https://csrc.nist.gov/glossary/term/token', sourcesConfig)).toBe('nist-csrc');
    expect(resolveSourceRef('https://unknown-site.org/some/page', sourcesConfig)).toBe('unknown');
  });

  it('migrates string URLs to structured objects and is idempotent', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tb-sources-test-'));
    try {
      const conceptsDir = path.join(tempDir, 'concepts', 'test-concept');
      fs.mkdirSync(conceptsDir, { recursive: true });
      const conceptYaml = path.join(conceptsDir, 'concept.yaml');

      const initialYaml = `id: test-concept
domains:
  - finance/investing
level: 1
status: draft
provenance:
  drafted_by: ai
sources:
  - https://www.investor.gov/intro/basics
  - https://unknown-random-domain.com/article
`;
      fs.writeFileSync(conceptYaml, initialYaml, 'utf-8');

      // Create config/sources.yaml in tempDir
      const configDir = path.join(tempDir, 'config');
      fs.mkdirSync(configDir, { recursive: true });
      const sourcesYaml = `investor-gov:
  title: Investor.gov Glossary
  url: https://www.investor.gov
  tier: B
  reuse: adapt
  languages:
    - en
`;
      fs.writeFileSync(path.join(configDir, 'sources.yaml'), sourcesYaml, 'utf-8');

      // Pass 1: Run migration
      const res1 = migrateAllSources(tempDir);
      expect(res1.migratedConcepts).toBe(1);
      expect(res1.migratedSourcesCount).toBe(2);
      expect(res1.warnings.length).toBe(1);
      expect(res1.warnings[0]).toContain('unknown');

      // Verify content of concept.yaml
      const migrated1 = fs.readFileSync(conceptYaml, 'utf-8');
      expect(migrated1).toContain('ref: investor-gov');
      expect(migrated1).toContain('locator: https://www.investor.gov/intro/basics');
      expect(migrated1).toContain('accessed: \'2026-10-14\'');
      expect(migrated1).toContain('ref: unknown');
      expect(migrated1).toContain('locator: https://unknown-random-domain.com/article');

      // Pass 2: Run migration again (idempotency check)
      const res2 = migrateAllSources(tempDir);
      expect(res2.migratedConcepts).toBe(0);
      expect(res2.migratedSourcesCount).toBe(0);

      const migrated2 = fs.readFileSync(conceptYaml, 'utf-8');
      expect(migrated2).toBe(migrated1);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });
});
