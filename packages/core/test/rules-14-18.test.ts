import { describe, it, expect } from 'vitest';
import { validateRepository } from '../src/validator.js';
import type { RepositoryData, ConceptRecord, SourcesConfig } from '../src/types.js';

function createBaseRepo(): RepositoryData {
  const sourcesConfig: SourcesConfig = {
    'nist-csrc': {
      title: 'NIST CSRC Glossary',
      url: 'https://csrc.nist.gov/glossary',
      type: 'glossary',
      tier: 'A',
      languages: ['en'],
      license: 'public-domain',
      reuse: 'adapt',
      domains: ['it/security'],
    },
    'investor-gov': {
      title: 'Investor.gov',
      url: 'https://www.investor.gov',
      type: 'glossary',
      tier: 'B',
      languages: ['en'],
      license: 'public-domain',
      reuse: 'adapt',
      domains: ['finance'],
    },
    'iso-iec': {
      title: 'ISO/IEC Standards',
      url: 'https://www.iso.org',
      type: 'standard',
      tier: 'A',
      languages: ['en'],
      license: 'copyright',
      reuse: 'cite-only',
      domains: ['it'],
    },
    'wikipedia-vi': {
      title: 'Wikipedia VI',
      url: 'https://vi.wikipedia.org',
      type: 'encyclopedia',
      tier: 'C',
      languages: ['vi'],
      license: 'CC-BY-SA',
      reuse: 'paraphrase-only',
      domains: ['it', 'finance'],
    },
    'viblo': {
      title: 'Viblo Community',
      url: 'https://viblo.asia',
      type: 'community',
      tier: 'D',
      languages: ['vi'],
      license: 'community',
      reuse: 'paraphrase-only',
      domains: ['it'],
    },
  };

  const concepts = new Map<string, ConceptRecord>();
  return {
    rootDir: process.cwd(),
    concepts,
    taxonomy: new Map([
      ['it', { id: 'it', labels: { en: 'Information Technology' } }],
    ]),
    validDomainPaths: new Set(['it/security']),
    localesConfig: {
      pivot: 'en',
      locales: [
        { code: 'en', name: 'English', status: 'primary' },
        { code: 'vi', name: 'Vietnamese', status: 'primary' },
      ],
      fallback: { vi: ['en'] },
    },
    domainsConfig: {
      domains: [{ id: 'it', name: { en: 'IT' }, priority: 1, file: 'taxonomy/it.yaml' }],
    },
    reviewersConfig: {
      reviewers: {
        it: [{ handle: '@alice', name: 'Alice' }, { handle: '@bob', name: 'Bob' }],
      },
    },
    sourcesConfig,
    commonWords: {
      en: new Set(['model', 'container']),
      vi: new Set(['mô hình']),
    },
  };
}

function makeConcept(
  id: string,
  status: 'draft' | 'reviewed' | 'verified',
  sources: any[],
  viFrontmatter: any = {},
  enFrontmatter: any = {}
): ConceptRecord {
  return {
    id,
    dirPath: `/concepts/${id}`,
    metadata: {
      id,
      domains: ['it/security'],
      level: 1,
      status,
      provenance: {
        drafted_by: 'ai',
        reviewed_by: status !== 'draft' ? ['@alice', '@bob'] : undefined,
        reviewed_at: status !== 'draft' ? '2026-10-14' : undefined,
      },
      sources,
      relations: { related: ['other-concept'] },
    },
    locales: {
      en: {
        locale: 'en',
        frontmatter: {
          label: 'Security Token',
          plain_descriptions: ['hardware key for authentication', 'physical USB device for login'],
          summary: 'A physical device for authentication.',
          ...enFrontmatter,
        },
        content: 'Content in English',
        filePath: `/concepts/${id}/en.md`,
      },
      vi: {
        locale: 'vi',
        frontmatter: {
          label: 'Khóa bảo mật',
          plain_descriptions: ['khóa cứng đăng nhập', 'thiết bị USB bảo mật'],
          summary: 'Thiết bị vật lý dùng xác thực danh tính.',
          ...viFrontmatter,
        },
        content: 'Nội dung tiếng Việt',
        filePath: `/concepts/${id}/vi.md`,
      },
    },
  };
}

describe('Rules 14–18 Validator (T-V1)', () => {
  it('Rule 14: pass with valid structured source, fail when ref is unknown or missing fields', () => {
    const repo = createBaseRepo();
    // Valid concept
    repo.concepts.set('valid-c', makeConcept('valid-c', 'draft', [
      {
        ref: 'nist-csrc',
        locator: 'https://csrc.nist.gov/glossary/term/token',
        accessed: '2026-10-14',
        language: 'en',
      },
    ], { label_evidence: [{ ref: 'wikipedia-vi', locator: 'https://vi.wikipedia.org' }] }));

    // Invalid concept: missing ref and missing accessed
    repo.concepts.set('invalid-c', makeConcept('invalid-c', 'draft', [
      {
        ref: 'unknown-src',
        locator: 'https://example.com',
        language: 'en',
      },
    ], { label_evidence: [{ ref: 'wikipedia-vi', locator: 'https://vi.wikipedia.org' }] }));

    const report = validateRepository(repo, { checkIndexDrift: false });
    const rule14Issues = report.errors.filter((e) => e.ruleId === 14);

    expect(rule14Issues.length).toBeGreaterThanOrEqual(1);
    expect(rule14Issues.some((i) => i.conceptId === 'invalid-c' && i.message.includes('unknown-src'))).toBe(true);
    expect(rule14Issues.some((i) => i.conceptId === 'valid-c')).toBe(false);
  });

  it('Rule 15: warn when Vietnamese label differs from English and lacks label_evidence or loanword', () => {
    const repo = createBaseRepo();
    // Concept with label_evidence: pass
    repo.concepts.set('pass-c', makeConcept('pass-c', 'draft', [
      { ref: 'nist-csrc', locator: 'https://csrc.nist.gov', accessed: '2026-10-14', language: 'en' },
    ], {
      label: 'Khóa bảo mật',
      label_evidence: [{ ref: 'wikipedia-vi', locator: 'https://vi.wikipedia.org' }],
    }));

    // Concept lacking label_evidence: fail (warn)
    repo.concepts.set('fail-c', makeConcept('fail-c', 'draft', [
      { ref: 'nist-csrc', locator: 'https://csrc.nist.gov', accessed: '2026-10-14', language: 'en' },
    ], {
      label: 'Khóa bảo mật',
      label_evidence: [],
    }));

    // Concept where label is recognized loanword: pass
    repo.concepts.set('loanword-c', makeConcept('loanword-c', 'draft', [
      { ref: 'nist-csrc', locator: 'https://csrc.nist.gov', accessed: '2026-10-14', language: 'en' },
    ], {
      label: 'Token',
      loanwords: ['token'],
    }, {
      label: 'Token',
    }));

    const report = validateRepository(repo, { checkIndexDrift: false });
    const rule15Warnings = report.warnings.filter((w) => w.ruleId === 15);

    expect(rule15Warnings.some((w) => w.conceptId === 'fail-c')).toBe(true);
    expect(rule15Warnings.some((w) => w.conceptId === 'pass-c')).toBe(false);
    expect(rule15Warnings.some((w) => w.conceptId === 'loanword-c')).toBe(false);
  });

  it('Rule 16: fail when quote exceeds 30 words or when source has cite-only reuse', () => {
    const repo = createBaseRepo();
    // Pass: quote <= 30 words with adapt reuse
    repo.concepts.set('pass-quote', makeConcept('pass-quote', 'draft', [
      {
        ref: 'nist-csrc',
        locator: 'https://csrc.nist.gov',
        accessed: '2026-10-14',
        language: 'en',
        quote: 'A concrete short quote under thirty words.',
      },
    ], { label_evidence: [{ ref: 'wikipedia-vi', locator: 'https://vi.wikipedia.org' }] }));

    // Fail 1: Quote over 30 words
    const longQuote = Array(35).fill('word').join(' ');
    repo.concepts.set('fail-long-quote', makeConcept('fail-long-quote', 'draft', [
      {
        ref: 'nist-csrc',
        locator: 'https://csrc.nist.gov',
        accessed: '2026-10-14',
        language: 'en',
        quote: longQuote,
      },
    ], { label_evidence: [{ ref: 'wikipedia-vi', locator: 'https://vi.wikipedia.org' }] }));

    // Fail 2: Quote on cite-only source (iso-iec)
    repo.concepts.set('fail-cite-only', makeConcept('fail-cite-only', 'draft', [
      {
        ref: 'iso-iec',
        locator: 'https://iso.org',
        accessed: '2026-10-14',
        language: 'en',
        quote: 'Short quote forbidden on cite-only.',
      },
    ], { label_evidence: [{ ref: 'wikipedia-vi', locator: 'https://vi.wikipedia.org' }] }));

    const report = validateRepository(repo, { checkIndexDrift: false });
    const rule16Errors = report.errors.filter((e) => e.ruleId === 16);

    expect(rule16Errors.some((e) => e.conceptId === 'fail-long-quote')).toBe(true);
    expect(rule16Errors.some((e) => e.conceptId === 'fail-cite-only')).toBe(true);
    expect(rule16Errors.some((e) => e.conceptId === 'pass-quote')).toBe(false);
  });

  it('Rule 17: check source tier requirements by status (draft, reviewed, verified)', () => {
    const repo = createBaseRepo();
    // Pass reviewed: tier A source with supports: definition
    repo.concepts.set('pass-reviewed', makeConcept('pass-reviewed', 'reviewed', [
      {
        ref: 'nist-csrc',
        locator: 'https://csrc.nist.gov',
        accessed: '2026-10-14',
        language: 'en',
        supports: ['definition', 'summary'],
      },
    ], { label_evidence: [{ ref: 'wikipedia-vi', locator: 'https://vi.wikipedia.org' }] }));

    // Fail reviewed: tier A source but supports lacks 'definition'
    repo.concepts.set('fail-reviewed-no-def', makeConcept('fail-reviewed-no-def', 'reviewed', [
      {
        ref: 'nist-csrc',
        locator: 'https://csrc.nist.gov',
        accessed: '2026-10-14',
        language: 'en',
        supports: ['summary'],
      },
    ], { label_evidence: [{ ref: 'wikipedia-vi', locator: 'https://vi.wikipedia.org' }] }));

    // Fail reviewed: only tier C source
    repo.concepts.set('fail-reviewed-tier-c', makeConcept('fail-reviewed-tier-c', 'reviewed', [
      {
        ref: 'wikipedia-vi',
        locator: 'https://vi.wikipedia.org',
        accessed: '2026-10-14',
        language: 'vi',
        supports: ['definition'],
      },
    ], { label_evidence: [{ ref: 'wikipedia-vi', locator: 'https://vi.wikipedia.org' }] }));

    // Pass verified: 2 distinct sources, at least 1 tier A
    repo.concepts.set('pass-verified', makeConcept('pass-verified', 'verified', [
      { ref: 'nist-csrc', locator: 'https://csrc.nist.gov', accessed: '2026-10-14', language: 'en', supports: ['definition'] },
      { ref: 'investor-gov', locator: 'https://investor.gov', accessed: '2026-10-14', language: 'en', supports: ['summary'] },
    ], { label_evidence: [{ ref: 'wikipedia-vi', locator: 'https://vi.wikipedia.org' }] }));

    // Fail verified: 2 sources but neither is tier A (investor-gov tier B, wikipedia-vi tier C)
    repo.concepts.set('fail-verified-no-tier-a', makeConcept('fail-verified-no-tier-a', 'verified', [
      { ref: 'investor-gov', locator: 'https://investor.gov', accessed: '2026-10-14', language: 'en', supports: ['definition'] },
      { ref: 'wikipedia-vi', locator: 'https://vi.wikipedia.org', accessed: '2026-10-14', language: 'vi', supports: ['summary'] },
    ], { label_evidence: [{ ref: 'wikipedia-vi', locator: 'https://vi.wikipedia.org' }] }));

    const report = validateRepository(repo, { checkIndexDrift: false });
    const rule17Errors = report.errors.filter((e) => e.ruleId === 17);

    expect(rule17Errors.some((e) => e.conceptId === 'pass-reviewed')).toBe(false);
    expect(rule17Errors.some((e) => e.conceptId === 'fail-reviewed-no-def')).toBe(true);
    expect(rule17Errors.some((e) => e.conceptId === 'fail-reviewed-tier-c')).toBe(true);
    expect(rule17Errors.some((e) => e.conceptId === 'pass-verified')).toBe(false);
    expect(rule17Errors.some((e) => e.conceptId === 'fail-verified-no-tier-a')).toBe(true);
  });

  it('Rule 18: fail when translation is translated without translated_from and translated_by', () => {
    const repo = createBaseRepo();
    // Pass translated
    repo.concepts.set('pass-trans', makeConcept('pass-trans', 'draft', [
      { ref: 'nist-csrc', locator: 'https://csrc.nist.gov', accessed: '2026-10-14', language: 'en' },
    ], {
      label_evidence: [{ ref: 'wikipedia-vi', locator: 'https://vi.wikipedia.org' }],
      translation: 'translated',
      translated_from: 'en',
      translated_by: 'ai',
    }));

    // Fail translated: missing translated_from / translated_by
    repo.concepts.set('fail-trans', makeConcept('fail-trans', 'draft', [
      { ref: 'nist-csrc', locator: 'https://csrc.nist.gov', accessed: '2026-10-14', language: 'en' },
    ], {
      label_evidence: [{ ref: 'wikipedia-vi', locator: 'https://vi.wikipedia.org' }],
      translation: 'translated',
    }));

    const report = validateRepository(repo, { checkIndexDrift: false });
    const rule18Errors = report.errors.filter((e) => e.ruleId === 18);

    expect(rule18Errors.some((e) => e.conceptId === 'fail-trans')).toBe(true);
    expect(rule18Errors.some((e) => e.conceptId === 'pass-trans')).toBe(false);
  });
});
