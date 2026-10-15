import { normalizeSearchTerm } from './matcher.js';

export interface LookupConcept {
  id: string;
  label: string;
  qualifier?: string;
  summary: string;
  domains?: string[];
  status?: string;
  plain_descriptions?: string[];
  aliases?: string[];
  loanwords?: string[];
}

interface LookupField {
  value: string;
  weight: number;
}

interface LookupEntry {
  concept: LookupConcept;
  fields: LookupField[];
}

/**
 * Runtime friendly search index for the mod's inline lookup pane.
 * Candidate concepts are found through shared trigrams and terms so each
 * input update scores only relevant concepts instead of scanning the corpus.
 */
export class ConceptLookupIndex {
  private entries: LookupEntry[];
  private trigrams = new Map<string, Set<number>>();
  private tokens = new Map<string, Set<number>>();

  constructor(concepts: LookupConcept[]) {
    this.entries = concepts.map((concept, index) => {
      const fields: LookupField[] = [
        { value: normalizeSearchTerm(concept.label || ''), weight: 4 },
        ...(concept.plain_descriptions || []).map((value) => ({ value: normalizeSearchTerm(value), weight: 4 })),
        ...(concept.aliases || []).map((value) => ({ value: normalizeSearchTerm(value), weight: 3 })),
        ...(concept.loanwords || []).map((value) => ({ value: normalizeSearchTerm(value), weight: 3 })),
        { value: normalizeSearchTerm(concept.summary || ''), weight: 1 },
      ];

      for (const field of fields) {
        const chars = [...field.value];
        const grams = new Set<string>();
        for (let i = 0; i + 2 < chars.length; i++) grams.add(chars.slice(i, i + 3).join(''));
        for (const gram of grams) this.addPosting(this.trigrams, gram, index);

        const words = new Set(field.value.split(/[^\p{L}\p{N}]+/u).filter(Boolean));
        for (const word of words) this.addPosting(this.tokens, word, index);
      }

      return { concept, fields };
    });
  }

  private addPosting(index: Map<string, Set<number>>, key: string, conceptIndex: number): void {
    let posting = index.get(key);
    if (!posting) index.set(key, (posting = new Set()));
    posting.add(conceptIndex);
  }

  private matchingTrigrams(value: string): Set<number> {
    const chars = [...value];
    if (chars.length < 3) return new Set();
    const grams = new Set<string>();
    for (let i = 0; i + 2 < chars.length; i++) grams.add(chars.slice(i, i + 3).join(''));
    const postings = [...grams].map((gram) => this.trigrams.get(gram));
    if (postings.some((posting) => !posting)) return new Set();
    postings.sort((a, b) => a!.size - b!.size);
    const [smallest, ...rest] = postings as Set<number>[];
    const matches = new Set<number>();
    for (const index of smallest) {
      if (rest.every((posting) => posting.has(index))) matches.add(index);
    }
    return matches;
  }

  search(input: string, limit = 5): LookupConcept[] {
    const needle = normalizeSearchTerm(input.trim());
    if (!needle || limit <= 0) return [];

    const candidates = this.matchingTrigrams(needle);
    const tokens = [...new Set(needle.split(/[^\p{L}\p{N}]+/u).filter(Boolean))];
    for (const token of tokens) {
      const matches = [...token].length >= 3
        ? this.matchingTrigrams(token)
        : this.tokens.get(token) || new Set<number>();
      for (const index of matches) candidates.add(index);
    }

    const scored: Array<{ concept: LookupConcept; score: number }> = [];
    for (const index of candidates) {
      const entry = this.entries[index];
      let score = 0;
      for (const field of entry.fields) {
        if (field.value === needle) score = Math.max(score, field.weight * 20);
        else if (field.value.includes(needle)) score = Math.max(score, field.weight * 10);
        else {
          const hits = tokens.filter((token) => field.value.includes(token)).length;
          if (hits) score = Math.max(score, field.weight * hits / tokens.length);
        }
      }
      if (score >= 0.5) scored.push({ concept: entry.concept, score });
    }

    return scored
      .sort((a, b) => b.score - a.score || a.concept.label.localeCompare(b.concept.label))
      .slice(0, limit)
      .map((item) => item.concept);
  }
}

export function createLookupIndex(concepts: LookupConcept[]): ConceptLookupIndex {
  return new ConceptLookupIndex(concepts);
}
