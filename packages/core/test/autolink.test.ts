import { describe, it, expect } from 'vitest';
import { buildArtifacts } from '../src/builder.js';
import { validateRepository } from '../src/validator.js';
import type { RepositoryData, ConceptRecord } from '../src/types.js';
import fs from 'node:fs';
import path from 'node:path';
import os from 'node:os';

function createRepoWithAutolink(tempDir: string): RepositoryData {
  const concepts = new Map<string, ConceptRecord>();

  // Concept 1: Short acronym (2 chars) with autolink: always
  concepts.set('ci-concept', {
    id: 'ci-concept',
    dirPath: path.join(tempDir, 'concepts', 'ci-concept'),
    metadata: {
      id: 'ci-concept',
      domains: ['it/devops'],
      level: 1,
      status: 'draft',
      provenance: { drafted_by: 'ai' },
      sources: [
        { ref: 'nist-csrc', locator: 'https://csrc.nist.gov', accessed: '2026-10-14', language: 'en' },
      ],
      relations: { related: ['pipeline-concept'] },
    },
    locales: {
      en: {
        locale: 'en',
        frontmatter: {
          label: 'CI',
          plain_descriptions: ['continuous integration automated testing'],
          summary: 'Continuous Integration methodology.',
          autolink: { label: 'always' },
        },
        content: 'CI details',
        filePath: path.join(tempDir, 'concepts', 'ci-concept', 'en.md'),
      },
    },
  });

  // Concept 2: Common word with autolink: never
  concepts.set('pipeline-concept', {
    id: 'pipeline-concept',
    dirPath: path.join(tempDir, 'concepts', 'pipeline-concept'),
    metadata: {
      id: 'pipeline-concept',
      domains: ['it/devops'],
      level: 1,
      status: 'draft',
      provenance: { drafted_by: 'ai' },
      sources: [
        { ref: 'nist-csrc', locator: 'https://csrc.nist.gov', accessed: '2026-10-14', language: 'en' },
      ],
      relations: { related: ['ci-concept'] },
    },
    locales: {
      en: {
        locale: 'en',
        frontmatter: {
          label: 'Pipeline',
          plain_descriptions: ['series of automated build steps'],
          summary: 'Software build and test pipeline.',
          autolink: { label: 'never' },
        },
        content: 'Pipeline details',
        filePath: path.join(tempDir, 'concepts', 'pipeline-concept', 'en.md'),
      },
    },
  });

  // Concept 3: Common word WITHOUT autolink setting (should trigger warning)
  concepts.set('container-concept', {
    id: 'container-concept',
    dirPath: path.join(tempDir, 'concepts', 'container-concept'),
    metadata: {
      id: 'container-concept',
      domains: ['it/devops'],
      level: 1,
      status: 'draft',
      provenance: { drafted_by: 'ai' },
      sources: [
        { ref: 'nist-csrc', locator: 'https://csrc.nist.gov', accessed: '2026-10-14', language: 'en' },
      ],
      relations: { related: ['ci-concept'] },
    },
    locales: {
      en: {
        locale: 'en',
        frontmatter: {
          label: 'Container',
          plain_descriptions: ['isolated Linux user space package'],
          summary: 'Standardized unit of software.',
          // No autolink decision
        },
        content: 'Container details',
        filePath: path.join(tempDir, 'concepts', 'container-concept', 'en.md'),
      },
    },
  });

  return {
    rootDir: tempDir,
    concepts,
    taxonomy: new Map([
      ['it', { id: 'it', labels: { en: 'Information Technology' } }],
    ]),
    validDomainPaths: new Set(['it/devops']),
    localesConfig: {
      pivot: 'en',
      locales: [{ code: 'en', name: 'English', status: 'primary' }],
      fallback: {},
    },
    domainsConfig: {
      domains: [{ id: 'it', name: { en: 'IT' }, priority: 1, file: 'taxonomy/it.yaml' }],
    },
    reviewersConfig: { reviewers: {} },
    sourcesConfig: {
      'nist-csrc': {
        title: 'NIST CSRC',
        url: 'https://csrc.nist.gov',
        type: 'glossary',
        tier: 'A',
        languages: ['en'],
        license: 'public-domain',
        reuse: 'adapt',
        domains: ['it/devops'],
      },
    },
    commonWords: {
      en: new Set(['container', 'pipeline']),
    },
  };
}

describe('Autolink Configuration and Common Words (T-V4)', () => {
  it('builder honors autolink: always for short acronyms and never for generic words', () => {
    const tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'tb-autolink-test-'));
    try {
      const repo = createRepoWithAutolink(tempDir);
      buildArtifacts(repo);

      const termsPath = path.join(tempDir, 'dist', 'en', 'terms.json');
      expect(fs.existsSync(termsPath)).toBe(true);

      const terms = JSON.parse(fs.readFileSync(termsPath, 'utf-8'));
      const ciTerm = terms.find((t: any) => t.key === 'CI');
      const pipelineTerm = terms.find((t: any) => t.key === 'Pipeline');
      const containerTerm = terms.find((t: any) => t.key === 'Container');

      // 'CI' has length 2 <= 3, but autolink: always => autolink is TRUE!
      expect(ciTerm).toBeDefined();
      expect(ciTerm.autolink).toBe(true);

      // 'Pipeline' has autolink: never => autolink is FALSE!
      expect(pipelineTerm).toBeDefined();
      expect(pipelineTerm.autolink).toBe(false);

      // 'Container' has no explicit setting and length > 3 => autolink is TRUE (default)
      expect(containerTerm).toBeDefined();
      expect(containerTerm.autolink).toBe(true);
    } finally {
      fs.rmSync(tempDir, { recursive: true, force: true });
    }
  });

  it('validator warns when a common word lacks explicit autolink decision', () => {
    const repo = createRepoWithAutolink(process.cwd());
    const report = validateRepository(repo, { checkIndexDrift: false });

    // 'container-concept' has label 'Container' in commonWords without autolink setting
    const commonWordWarnings = report.warnings.filter((w) => w.message.includes('common word'));
    expect(commonWordWarnings.length).toBeGreaterThanOrEqual(1);
    expect(commonWordWarnings.some((w) => w.conceptId === 'container-concept')).toBe(true);

    // 'pipeline-concept' has explicit autolink: never => should NOT warn
    expect(commonWordWarnings.some((w) => w.conceptId === 'pipeline-concept')).toBe(false);
  });
});
