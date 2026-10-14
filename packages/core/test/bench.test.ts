import { describe, it, expect } from 'vitest';
import { generateMockDataset } from '../../../bench/generate.js';

describe('T-B1: Benchmark Generator Determinism and Pattern Proportions', () => {
  it('produces 100% identical dataset when called with the same seed', () => {
    const data1 = generateMockDataset(100, 42);
    const data2 = generateMockDataset(100, 42);

    expect(data1.size).toBe(100);
    expect(data2.size).toBe(100);
    expect(data1.termsVi.length).toBe(data2.termsVi.length);
    expect(data1.termsEn.length).toBe(data2.termsEn.length);
    expect(data1.patternCountVi).toBe(data2.patternCountVi);
    expect(data1.patternCountEn).toBe(data2.patternCountEn);

    expect(JSON.stringify(data1.conceptsVi)).toBe(JSON.stringify(data2.conceptsVi));
    expect(JSON.stringify(data1.termsVi)).toBe(JSON.stringify(data2.termsVi));
    expect(JSON.stringify(data1.conceptsEn)).toBe(JSON.stringify(data2.conceptsEn));
    expect(JSON.stringify(data1.termsEn)).toBe(JSON.stringify(data2.termsEn));
  });

  it('produces different dataset with different seeds', () => {
    const dataA = generateMockDataset(100, 42);
    const dataB = generateMockDataset(100, 999);

    expect(JSON.stringify(dataA.conceptsVi)).not.toBe(JSON.stringify(dataB.conceptsVi));
  });

  it('adheres to realistic pattern proportions (~3.8 patterns per concept)', () => {
    const data = generateMockDataset(1000, 42);

    // Kỳ vọng ~3.8 mẫu nhận diện (label + aliases + loanwords + 2 plain descriptions)
    expect(data.patternsPerConceptVi).toBeGreaterThanOrEqual(3.5);
    expect(data.patternsPerConceptVi).toBeLessThanOrEqual(4.5);

    expect(data.patternsPerConceptEn).toBeGreaterThanOrEqual(3.5);
    expect(data.patternsPerConceptEn).toBeLessThanOrEqual(4.5);
  });

  it('includes exact-case acronyms and homonyms with qualifiers', () => {
    const data = generateMockDataset(200, 42);

    const exactCaseTerms = data.termsVi.filter((t) => t.match === 'exact-case');
    expect(exactCaseTerms.length).toBeGreaterThan(0);

    const homonyms = data.conceptsVi.filter((c) => c.qualifier !== undefined);
    expect(homonyms.length).toBeGreaterThan(0);
  });
});
