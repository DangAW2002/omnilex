// packages/core/src/matcher.ts: Multi-pattern Aho-Corasick Trie Matcher and Mod Runtime Engine
export interface TermConcept {
  id: string;
  label: string;
  qualifier?: string;
  summary: string;
  domains?: string[];
  plain_descriptions?: string[];
  normalized_descriptions?: string[];
}

export interface TermEntry {
  key: string;
  match: 'exact-case' | 'any-case';
  concepts: TermConcept[];
  autolink: boolean;
  autolinkConfig?: 'always' | 'never' | 'auto';
}

export interface Range {
  start: number;
  end: number;
}

export interface MatchSpan {
  start: number;
  end: number;
  term?: TermEntry;
  concept: TermConcept;
  text?: string;
}

export function isWordChar(ch: string): boolean {
  if (!ch) return false;
  return /^[\p{L}\p{N}]$/u.test(ch);
}

function getCharBefore(text: string, index: number): string {
  if (index <= 0) return '';
  const prevCode = text.charCodeAt(index - 1);
  if (prevCode >= 0xdc00 && prevCode <= 0xdfff && index >= 2) {
    return text.slice(index - 2, index);
  }
  return text[index - 1];
}

function getCharAfter(text: string, index: number): string {
  if (index >= text.length) return '';
  const code = text.charCodeAt(index);
  if (code >= 0xd800 && code <= 0xdbff && index + 1 < text.length) {
    return text.slice(index, index + 2);
  }
  return text[index];
}

export function cleanTranscript(text: string): string {
  return text
    .replace(/```[\s\S]*?```/g, ' ')
    .replace(/`[^`\n]+`/g, ' ')
    .replace(/https?:\/\/\S+/g, ' ')
    .replace(/\]\([^)]*\)/g, ' ');
}

export function normalizeSearchTerm(value: string): string {
  return value
    .normalize('NFD')
    .replace(/\p{M}/gu, '')
    .replace(/đ/gi, 'd')
    .toLowerCase();
}

interface OutputEntry {
  term: TermEntry;
  key: string;
  len: number;
  exactCase: boolean;
}

interface TrieNode {
  transitions: Map<string, number>;
  fail: number;
  outputs: OutputEntry[];
}

export class TrieMatcher {
  private nodes: TrieNode[];
  private terms: TermEntry[];

  constructor(terms: TermEntry[]) {
    this.terms = terms;
    this.nodes = [{ transitions: new Map(), fail: 0, outputs: [] }];
    this.buildTrie();
  }

  private buildTrie(): void {
    for (const term of this.terms) {
      if (term.autolinkConfig === 'never') continue;
      // Ambiguous homonyms are kept for context voting, but non-homonyms with autolink: false are skipped
      if (!term.autolink && term.concepts.length <= 1) continue;

      const normKey = term.key.normalize('NFC').toLowerCase();
      if (!normKey) continue;

      let curr = 0;
      for (const ch of normKey) {
        if (!this.nodes[curr].transitions.has(ch)) {
          const nextId = this.nodes.length;
          this.nodes[curr].transitions.set(ch, nextId);
          this.nodes.push({ transitions: new Map(), fail: 0, outputs: [] });
        }
        curr = this.nodes[curr].transitions.get(ch)!;
      }

      this.nodes[curr].outputs.push({
        term,
        key: term.key.normalize('NFC'),
        len: normKey.length,
        exactCase: term.match === 'exact-case'
      });
    }

    // BFS construction of Aho-Corasick failure transitions and output propagation
    const queue: number[] = [];
    for (const [, next] of this.nodes[0].transitions) {
      queue.push(next);
    }

    while (queue.length > 0) {
      const curr = queue.shift()!;
      for (const [ch, next] of this.nodes[curr].transitions) {
        let f = this.nodes[curr].fail;
        while (f !== 0 && !this.nodes[f].transitions.has(ch)) {
          f = this.nodes[f].fail;
        }
        const failTarget = this.nodes[f].transitions.get(ch) || 0;
        this.nodes[next].fail = failTarget;
        if (this.nodes[failTarget].outputs.length > 0) {
          this.nodes[next].outputs.push(...this.nodes[failTarget].outputs);
        }
        queue.push(next);
      }
    }
  }

  public match(rawText: string, options?: { blocked?: Range[] }): MatchSpan[] {
    if (!rawText || !rawText.trim()) return [];

    let text = rawText;
    let mapToRaw: ((nfcStart: number, nfcEnd: number) => { start: number; end: number }) | null = null;

    // Handle NFD canonical equivalence and offset mapping if text is not NFC
    if (rawText !== rawText.normalize('NFC')) {
      text = rawText.normalize('NFC');
      const rawSegs = [...new Intl.Segmenter().segment(rawText)];
      const nfcSegs = [...new Intl.Segmenter().segment(text)];
      if (rawSegs.length === nfcSegs.length) {
        mapToRaw = (nfcStart: number, nfcEnd: number) => {
          let startSegIdx = 0;
          let endSegIdx = nfcSegs.length - 1;
          for (let i = 0; i < nfcSegs.length; i++) {
            if (nfcSegs[i].index <= nfcStart) startSegIdx = i;
            if (nfcSegs[i].index + nfcSegs[i].segment.length >= nfcEnd) {
              endSegIdx = i;
              break;
            }
          }
          const start = rawSegs[startSegIdx].index;
          const end = rawSegs[endSegIdx].index + rawSegs[endSegIdx].segment.length;
          return { start, end };
        };
      }
    }

    const rawCandidates: Array<{
      start: number;
      end: number;
      term: TermEntry;
    }> = [];

    let curr = 0;
    for (let i = 0; i < text.length; i++) {
      const ch = text[i].toLowerCase();
      while (curr !== 0 && !this.nodes[curr].transitions.has(ch)) {
        curr = this.nodes[curr].fail;
      }
      curr = this.nodes[curr].transitions.get(ch) || 0;

      if (this.nodes[curr].outputs.length > 0) {
        for (const out of this.nodes[curr].outputs) {
          const matchStart = i + 1 - out.len;
          const matchEnd = i + 1;

          // Unicode word boundary check
          const before = getCharBefore(text, matchStart);
          if (isWordChar(before)) continue;

          const after = getCharAfter(text, matchEnd);
          if (isWordChar(after)) continue;

          // exact-case check
          if (out.exactCase && text.slice(matchStart, matchEnd) !== out.key) {
            continue;
          }

          let start = matchStart;
          let end = matchEnd;
          if (mapToRaw) {
            const mapped = mapToRaw(start, end);
            start = mapped.start;
            end = mapped.end;
          }

          rawCandidates.push({
            start,
            end,
            term: out.term
          });
        }
      }
    }

    // Filter blocked ranges
    const blocked = options?.blocked;
    let candidates = rawCandidates;
    if (blocked && blocked.length > 0) {
      candidates = candidates.filter((cand) =>
        !blocked.some((b) => cand.start < b.end && cand.end > b.start)
      );
    }

    // Count context votes from unambiguous concepts
    const domainVotes: Record<string, number> = {};
    for (const cand of candidates) {
      if (cand.term.concepts.length === 1) {
        const concept = cand.term.concepts[0];
        for (const d of concept.domains || []) {
          const root = d.split('/')[0];
          domainVotes[root] = (domainVotes[root] || 0) + 1;
          domainVotes[d] = (domainVotes[d] || 0) + 1;
        }
      }
    }

    // Resolve candidates
    const resolvable: MatchSpan[] = [];
    for (const cand of candidates) {
      if (cand.term.concepts.length === 1) {
        resolvable.push({
          start: cand.start,
          end: cand.end,
          term: cand.term,
          concept: cand.term.concepts[0]
        });
      } else if (cand.term.concepts.length > 1) {
        // Homonym context voting
        let bestConcept: TermConcept | null = null;
        let bestScore = -1;
        let secondBestScore = -1;

        for (const concept of cand.term.concepts) {
          let score = 0;
          for (const d of concept.domains || []) {
            const root = d.split('/')[0];
            score += (domainVotes[root] || 0) + (domainVotes[d] || 0);
          }
          if (score > bestScore) {
            secondBestScore = bestScore;
            bestScore = score;
            bestConcept = concept;
          } else if (score === bestScore) {
            secondBestScore = score;
          }
        }

        // Only autolink if there is a distinct winning domain
        if (bestConcept && bestScore > 0 && bestScore > secondBestScore) {
          resolvable.push({
            start: cand.start,
            end: cand.end,
            term: cand.term,
            concept: bestConcept
          });
        }
      }
    }

    // Sort: longest match first (a.start - b.start || b.end - a.end)
    resolvable.sort((a, b) => a.start - b.start || b.end - a.end);

    // Pick non-overlapping spans
    const chosen: MatchSpan[] = [];
    for (const cand of resolvable) {
      if (!chosen.some((item) => cand.start < item.end && cand.end > item.start)) {
        chosen.push(cand);
      }
    }

    return chosen;
  }

  public termHits(text: string, blocked: Range[] = []): MatchSpan[] {
    return this.match(text, { blocked });
  }

  public forwardSpans(text: string, maxBadges = 4): MatchSpan[] {
    const hits = this.match(text);
    return hits.slice(0, maxBadges);
  }

  public matchedConcepts(text: string, maxBadges = 4): TermConcept[] {
    const visible = cleanTranscript(text);
    const hits = this.match(visible);
    const unique: TermConcept[] = [];
    const seen = new Set<string>();

    for (const hit of hits) {
      if (!seen.has(hit.concept.id)) {
        seen.add(hit.concept.id);
        unique.push(hit.concept);
        if (unique.length >= maxBadges) break;
      }
    }
    return unique;
  }
}

interface ReverseOutputEntry {
  concept: any;
  phrase: string;
  len: number;
}

interface ReverseTrieNode {
  transitions: Map<string, number>;
  fail: number;
  outputs: ReverseOutputEntry[];
}

export class ReverseMatcher {
  private nodes: ReverseTrieNode[];
  private minLength: number;

  constructor(concepts: any[], minLength = 12) {
    this.minLength = minLength;
    this.nodes = [{ transitions: new Map(), fail: 0, outputs: [] }];
    this.buildTrie(concepts);
  }

  private buildTrie(concepts: any[]): void {
    for (const concept of concepts) {
      const descriptions = concept.plain_descriptions || [];
      for (const desc of descriptions) {
        const norm = normalizeSearchTerm(desc);
        if (norm.length < this.minLength) continue;

        let curr = 0;
        for (const ch of norm) {
          if (!this.nodes[curr].transitions.has(ch)) {
            const nextId = this.nodes.length;
            this.nodes[curr].transitions.set(ch, nextId);
            this.nodes.push({ transitions: new Map(), fail: 0, outputs: [] });
          }
          curr = this.nodes[curr].transitions.get(ch)!;
        }

        this.nodes[curr].outputs.push({
          concept,
          phrase: desc,
          len: norm.length
        });
      }
    }

    // BFS failure links
    const queue: number[] = [];
    for (const [, next] of this.nodes[0].transitions) {
      queue.push(next);
    }

    while (queue.length > 0) {
      const curr = queue.shift()!;
      for (const [ch, next] of this.nodes[curr].transitions) {
        let f = this.nodes[curr].fail;
        while (f !== 0 && !this.nodes[f].transitions.has(ch)) {
          f = this.nodes[f].fail;
        }
        const failTarget = this.nodes[f].transitions.get(ch) || 0;
        this.nodes[next].fail = failTarget;
        if (this.nodes[failTarget].outputs.length > 0) {
          this.nodes[next].outputs.push(...this.nodes[failTarget].outputs);
        }
        queue.push(next);
      }
    }
  }

  public reverseHints(text: string, maxBadges = 4): any[] {
    const norm = normalizeSearchTerm(text);
    if (!norm) return [];

    const found: any[] = [];
    const seen = new Set<string>();

    let curr = 0;
    for (let i = 0; i < norm.length; i++) {
      const ch = norm[i];
      while (curr !== 0 && !this.nodes[curr].transitions.has(ch)) {
        curr = this.nodes[curr].fail;
      }
      curr = this.nodes[curr].transitions.get(ch) || 0;

      if (this.nodes[curr].outputs.length > 0) {
        for (const out of this.nodes[curr].outputs) {
          if (!seen.has(out.concept.id)) {
            seen.add(out.concept.id);
            found.push(out.concept);
            if (found.length >= maxBadges) return found;
          }
        }
      }
    }
    return found;
  }

  public reverseSpans(text: string, hints: any[], maxBadges = 4): MatchSpan[] {
    const candidates: MatchSpan[] = [];
    const lower = text.toLocaleLowerCase();

    for (const concept of hints) {
      for (const description of concept.plain_descriptions || []) {
        const phrase = description.toLocaleLowerCase();
        let idx = lower.indexOf(phrase);
        while (idx !== -1) {
          candidates.push({
            start: idx,
            end: idx + description.length,
            concept
          });
          idx = lower.indexOf(phrase, idx + phrase.length);
        }
      }
    }

    candidates.sort((a, b) => a.start - b.start || b.end - a.end);
    const chosen: MatchSpan[] = [];
    for (const cand of candidates) {
      if (!chosen.some((item) => cand.start < item.end && cand.end > item.start)) {
        chosen.push(cand);
        if (chosen.length >= maxBadges) break;
      }
    }
    return chosen;
  }
}

export function createMatcher(terms: TermEntry[]): TrieMatcher {
  return new TrieMatcher(terms);
}

export function createReverseMatcher(concepts: any[], minLength = 12): ReverseMatcher {
  return new ReverseMatcher(concepts, minLength);
}
