import { describe, expect, it } from 'vitest';
import { createLookupIndex } from '../src/lookup.js';

describe('ConceptLookupIndex', () => {
  it('searches descriptions with accent folding and returns the best candidates', () => {
    const index = createLookupIndex([
      {
        id: 'compound-interest',
        label: 'Lãi kép',
        summary: 'Lãi được cộng vào gốc.',
        plain_descriptions: ['tiền lãi lại sinh ra lãi'],
        aliases: ['lãi nhập gốc'],
        loanwords: ['compound interest'],
      },
      {
        id: 'principal',
        label: 'Tiền gốc',
        summary: 'Khoản ban đầu được đem đi đầu tư.',
        plain_descriptions: ['số tiền ban đầu'],
        aliases: [],
        loanwords: [],
      },
    ]);

    expect(index.search('tien lai lai sinh ra lai')[0]?.id).toBe('compound-interest');
    expect(index.search('tiền gốc')[0]?.id).toBe('principal');
    expect(index.search('unrelated query')).toEqual([]);
  });
});
