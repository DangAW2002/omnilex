import { normalizeSearchTerm } from './matcher.js';
/**
 * Runtime friendly search index for the mod's inline lookup pane.
 * Candidate concepts are found through shared trigrams and terms so each
 * input update scores only relevant concepts instead of scanning the corpus.
 */
export class ConceptLookupIndex {
    entries;
    trigrams = new Map();
    tokens = new Map();
    constructor(concepts) {
        this.entries = concepts.map((concept, index) => {
            const fields = [
                { value: normalizeSearchTerm(concept.label || ''), weight: 4 },
                ...(concept.plain_descriptions || []).map((value) => ({ value: normalizeSearchTerm(value), weight: 4 })),
                ...(concept.aliases || []).map((value) => ({ value: normalizeSearchTerm(value), weight: 3 })),
                ...(concept.loanwords || []).map((value) => ({ value: normalizeSearchTerm(value), weight: 3 })),
                { value: normalizeSearchTerm(concept.summary || ''), weight: 1 },
            ];
            for (const field of fields) {
                const chars = [...field.value];
                const grams = new Set();
                for (let i = 0; i + 2 < chars.length; i++)
                    grams.add(chars.slice(i, i + 3).join(''));
                for (const gram of grams)
                    this.addPosting(this.trigrams, gram, index);
                const words = new Set(field.value.split(/[^\p{L}\p{N}]+/u).filter(Boolean));
                for (const word of words)
                    this.addPosting(this.tokens, word, index);
            }
            return { concept, fields };
        });
    }
    addPosting(index, key, conceptIndex) {
        let posting = index.get(key);
        if (!posting)
            index.set(key, (posting = new Set()));
        posting.add(conceptIndex);
    }
    matchingTrigrams(value) {
        const chars = [...value];
        if (chars.length < 3)
            return new Set();
        const grams = new Set();
        for (let i = 0; i + 2 < chars.length; i++)
            grams.add(chars.slice(i, i + 3).join(''));
        const postings = [...grams].map((gram) => this.trigrams.get(gram));
        if (postings.some((posting) => !posting))
            return new Set();
        postings.sort((a, b) => a.size - b.size);
        const [smallest, ...rest] = postings;
        const matches = new Set();
        for (const index of smallest) {
            if (rest.every((posting) => posting.has(index)))
                matches.add(index);
        }
        return matches;
    }
    search(input, limit = 5) {
        const needle = normalizeSearchTerm(input.trim());
        if (!needle || limit <= 0)
            return [];
        const candidates = this.matchingTrigrams(needle);
        const tokens = [...new Set(needle.split(/[^\p{L}\p{N}]+/u).filter(Boolean))];
        for (const token of tokens) {
            const matches = [...token].length >= 3
                ? this.matchingTrigrams(token)
                : this.tokens.get(token) || new Set();
            for (const index of matches)
                candidates.add(index);
        }
        const scored = [];
        for (const index of candidates) {
            const entry = this.entries[index];
            let score = 0;
            for (const field of entry.fields) {
                if (field.value === needle)
                    score = Math.max(score, field.weight * 20);
                else if (field.value.includes(needle))
                    score = Math.max(score, field.weight * 10);
                else {
                    const hits = tokens.filter((token) => field.value.includes(token)).length;
                    if (hits)
                        score = Math.max(score, field.weight * hits / tokens.length);
                }
            }
            if (score >= 0.5)
                scored.push({ concept: entry.concept, score });
        }
        return scored
            .sort((a, b) => b.score - a.score || a.concept.label.localeCompare(b.concept.label))
            .slice(0, limit)
            .map((item) => item.concept);
    }
}
export function createLookupIndex(concepts) {
    return new ConceptLookupIndex(concepts);
}
