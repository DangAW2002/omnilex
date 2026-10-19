import { describe, it, expect } from 'vitest';
import {
  createMatcher,
  createReverseMatcher,
  isWordChar,
  type TermEntry,
  type TermConcept
} from '../src/matcher.js';

function escapeRegex(value: string): string {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
}

// Baseline regex matcher implementation from register.js
function oldRegexMatcher(terms: TermEntry[], text: string) {
  const matchers = terms
    .filter((term) => term.autolink && term.concepts.length === 1)
    .map((term) => ({
      regex: new RegExp(
        `(?<![\\p{L}\\p{N}])${escapeRegex(term.key)}(?![\\p{L}\\p{N}])`,
        term.match === 'exact-case' ? 'gu' : 'giu'
      ),
      concept: term.concepts[0],
      term
    }));

  const candidates: Array<{ start: number; end: number; conceptId: string; key: string }> = [];
  for (const { regex, concept, term } of matchers) {
    for (const match of text.matchAll(regex)) {
      if (match.index !== undefined) {
        candidates.push({
          start: match.index,
          end: match.index + match[0].length,
          conceptId: concept.id,
          key: term.key
        });
      }
    }
  }

  const chosen: Array<{ start: number; end: number; conceptId: string; key: string }> = [];
  for (const candidate of candidates.sort((a, b) => a.start - b.start || b.end - a.end)) {
    if (!chosen.some((item) => candidate.start < item.end && candidate.end > item.start)) {
      chosen.push(candidate);
    }
  }
  return chosen;
}

// Simple LCG pseudo-random generator with fixed seed
function createRng(seed = 42) {
  let s = seed;
  return () => {
    s = (s * 1664525 + 1013904223) % 4294967296;
    return s / 4294967296;
  };
}

describe('Aho-Corasick Trie Matcher (WP4)', () => {
  const sampleConcepts: Record<string, TermConcept> = {
    compoundInterest: {
      id: 'compound-interest',
      label: 'Lãi kép',
      summary: 'Lãi tính trên gốc và lãi dồn tích.',
      domains: ['finance/banking']
    },
    interestRate: {
      id: 'interest-rate',
      label: 'Lãi suất',
      summary: 'Tỷ lệ phần trăm tính lãi.',
      domains: ['finance/banking']
    },
    compoundInterestRate: {
      id: 'compound-interest-rate',
      label: 'Lãi suất kép',
      summary: 'Lãi suất áp dụng cho lãi dồn tích.',
      domains: ['finance/banking']
    },
    api: {
      id: 'api',
      label: 'API',
      summary: 'Giao diện lập trình ứng dụng.',
      domains: ['it/software-engineering']
    },
    tokenLlm: {
      id: 'token-llm',
      label: 'Token (LLM)',
      summary: 'Đơn vị văn bản nhỏ nhất trong mô hình ngôn ngữ.',
      domains: ['it/ai-ml']
    },
    tokenCrypto: {
      id: 'token-crypto',
      label: 'Token (Crypto)',
      summary: 'Tài sản kỹ thuật số trên blockchain.',
      domains: ['finance/crypto']
    },
    cicd: {
      id: 'cicd',
      label: 'CI/CD',
      summary: 'Tích hợp liên tục và triển khai liên tục.',
      domains: ['it/devops']
    },
    ai: {
      id: 'ai',
      label: 'AI',
      summary: 'Trí tuệ nhân tạo.',
      domains: ['it/ai-ml']
    }
  };

  const sampleTerms: TermEntry[] = [
    {
      key: 'Lãi kép',
      match: 'any-case',
      concepts: [sampleConcepts.compoundInterest],
      autolink: true
    },
    {
      key: 'compound interest',
      match: 'any-case',
      concepts: [sampleConcepts.compoundInterest],
      autolink: true
    },
    {
      key: 'compound interest rate',
      match: 'any-case',
      concepts: [sampleConcepts.compoundInterestRate],
      autolink: true
    },
    {
      key: 'lãi suất',
      match: 'any-case',
      concepts: [sampleConcepts.interestRate],
      autolink: true
    },
    {
      key: 'API',
      match: 'exact-case',
      concepts: [sampleConcepts.api],
      autolink: true
    },
    {
      key: 'CI/CD',
      match: 'exact-case',
      concepts: [sampleConcepts.cicd],
      autolink: true
    },
    {
      key: 'AI',
      match: 'exact-case',
      concepts: [sampleConcepts.ai],
      autolink: true,
      autolinkConfig: 'always'
    },
    {
      key: 'token',
      match: 'any-case',
      concepts: [sampleConcepts.tokenLlm, sampleConcepts.tokenCrypto],
      autolink: false // Ambiguous homonym by default
    }
  ];

  it('T-M1: Unicode Word Boundaries', () => {
    const matcher = createMatcher(sampleTerms);

    // Should match at sentence end, quotes, brackets
    const text1 = 'Tìm hiểu về lãi kép. Bạn có thích "lãi kép"? (lãi kép)';
    const hits1 = matcher.termHits(text1);
    expect(hits1.length).toBe(3);
    for (const hit of hits1) {
      expect(hit.concept.id).toBe('compound-interest');
    }

    // Should NOT match when attached to letters or numbers
    const text2 = 'Khái niệm lãi képx và 1lãi kép hoặc lãi kép2 không được khớp.';
    const hits2 = matcher.termHits(text2);
    expect(hits2.length).toBe(0);

    // Slash and symbols boundary
    const text3 = 'Hệ thống áp dụng CI/CD cho quy trình phát triển.';
    const hits3 = matcher.termHits(text3);
    expect(hits3.length).toBe(1);
    expect(hits3[0].concept.id).toBe('cicd');
  });

  it('T-M2 (oracle): Exact comparison with old regex across >= 2,000 randomized texts', () => {
    const matcher = createMatcher(sampleTerms);
    const rng = createRng(42);

    const termKeys = ['Lãi kép', 'compound interest', 'compound interest rate', 'lãi suất', 'API', 'CI/CD', 'AI'];
    const nonTermWords = [
      'hệ thống', 'dữ liệu', 'ngân hàng', 'mô hình', 'ứng dụng', 'quy trình',
      'tối ưu', 'phân tích', 'tự động', 'triển khai', 'tính toán', 'phát triển',
      'the', 'system', 'rate', 'interest', 'compound', 'application', 'service'
    ];
    const punctuations = ['. ', ', ', '! ', '? ', ' ("', '") ', ' [', '] ', '\n', ' / '];

    const numSamples = 2000;
    let totalMatches = 0;

    for (let i = 0; i < numSamples; i++) {
      // Build a random text sentence with 3-10 words/terms
      const wordCount = 3 + Math.floor(rng() * 8);
      const parts: string[] = [];

      for (let w = 0; w < wordCount; w++) {
        const roll = rng();
        if (roll < 0.4) {
          // Pick a term with casing variations
          const rawTerm = termKeys[Math.floor(rng() * termKeys.length)];
          const caseRoll = rng();
          if (caseRoll < 0.3) {
            parts.push(rawTerm.toLowerCase());
          } else if (caseRoll < 0.6) {
            parts.push(rawTerm.toUpperCase());
          } else {
            parts.push(rawTerm);
          }
        } else {
          parts.push(nonTermWords[Math.floor(rng() * nonTermWords.length)]);
        }

        if (rng() < 0.3) {
          parts.push(punctuations[Math.floor(rng() * punctuations.length)].trim());
        }
      }

      const text = parts.join(' ');

      // Run old regex matcher
      const regexResults = oldRegexMatcher(sampleTerms, text);
      // Run new trie matcher
      const trieResults = matcher.termHits(text);

      expect(trieResults.length).toBe(regexResults.length);
      for (let m = 0; m < trieResults.length; m++) {
        expect(trieResults[m].start).toBe(regexResults[m].start);
        expect(trieResults[m].end).toBe(regexResults[m].end);
        expect(trieResults[m].concept.id).toBe(regexResults[m].conceptId);
      }
      totalMatches += trieResults.length;
    }

    expect(totalMatches).toBeGreaterThan(1000);
  });

  it('T-M3: Longest Match and Overlapping Spans', () => {
    const matcher = createMatcher(sampleTerms);

    // "compound interest rate" contains "compound interest"
    const text = 'The bank announced a new compound interest rate today.';
    const hits = matcher.termHits(text);
    expect(hits.length).toBe(1);
    expect(hits[0].concept.id).toBe('compound-interest-rate');
    expect(text.slice(hits[0].start, hits[0].end)).toBe('compound interest rate');
  });

  it('T-M4: Exact Case and Autolink Configuration', () => {
    const neverAutolinkTerm: TermEntry = {
      key: 'test',
      match: 'any-case',
      concepts: [{ id: 'test', label: 'Test', summary: 'Test', domains: [] }],
      autolink: false,
      autolinkConfig: 'never'
    };

    const matcher = createMatcher([...sampleTerms, neverAutolinkTerm]);

    // API is exact-case
    expect(matcher.termHits('Sử dụng API này.').length).toBe(1);
    expect(matcher.termHits('sử dụng api này.').length).toBe(0);

    // 2-character AI with autolink: always
    expect(matcher.termHits('Công nghệ AI đang phát triển.').length).toBe(1);
    expect(matcher.termHits('công nghệ ai đang phát triển.').length).toBe(0);

    // autolink: never never autolinks
    expect(matcher.termHits('Chạy test này.').length).toBe(0);
  });

  it('T-M5: Diacritics Preservation in Forward Matching', () => {
    const matcher = createMatcher(sampleTerms);

    // "Lãi kép" (has diacritics) must NOT match "lai kep"
    expect(matcher.termHits('Chúng ta nói về lãi kép.').length).toBe(1);
    expect(matcher.termHits('Chúng ta nói về lai kep.').length).toBe(0);
    expect(matcher.termHits('LÃI KÉP').length).toBe(1);
  });

  it('T-M6: Edge Cases: Empty, Whitespace, Code Fences, Wide Chars, 50 KB text', () => {
    const matcher = createMatcher(sampleTerms);

    // Empty and whitespace
    expect(matcher.termHits('').length).toBe(0);
    expect(matcher.termHits('   \t\n  \r\n ').length).toBe(0);

    // Blocked code ranges / clean transcript
    const codeText = '```ts\nconst api = "lãi kép";\n```\nNgoài code thì có lãi kép.';
    const blocked = [{ start: 0, end: 34 }];
    const hits = matcher.termHits(codeText, blocked);
    expect(hits.length).toBe(1);
    expect(hits[0].start).toBeGreaterThanOrEqual(34);

    // Emoji and wide characters offset check
    const emojiText = '🚀 💡 Phân tích lãi kép và 🌐 API.';
    const emojiHits = matcher.termHits(emojiText);
    expect(emojiHits.length).toBe(2);
    expect(emojiText.slice(emojiHits[0].start, emojiHits[0].end)).toBe('lãi kép');
    expect(emojiText.slice(emojiHits[1].start, emojiHits[1].end)).toBe('API');

    // 50 KB large text
    const largeChunk = 'Văn bản kiểm tra tải lớn không có từ khóa nào ở đây cả. '.repeat(1000); // ~56 KB
    const largeText = `${largeChunk} Cuối cùng xuất hiện lãi kép. ${largeChunk}`;
    const t0 = performance.now();
    const largeHits = matcher.termHits(largeText);
    const duration = performance.now() - t0;
    expect(largeHits.length).toBe(1);
    expect(duration).toBeLessThan(process.env.CI ? 300 : 50); // Must scan 100+ KB in < 50ms locally, relaxed under shared CI load
  });

  it('T-M7: Homonym Context Voting', () => {
    const matcher = createMatcher(sampleTerms);

    // Without context: 'token' is ambiguous (points to token-llm and token-crypto) -> no autolink
    const neutralText = 'Hệ thống kiểm tra tính hợp lệ của token trước khi xử lý.';
    const neutralHits = matcher.termHits(neutralText);
    expect(neutralHits.length).toBe(0);

    // With IT context: 'API' (it/software-engineering) and 'AI' (it/ai-ml) give 'it' domain majority votes
    const itContextText = 'Trong mô hình AI, API xử lý từng token văn bản đầu vào.';
    const itHits = matcher.termHits(itContextText);
    const tokenHit = itHits.find((h) => h.term?.key.toLowerCase() === 'token');
    expect(tokenHit).toBeDefined();
    expect(tokenHit?.concept.id).toBe('token-llm');

    // With Finance context: 'Lãi kép' (finance/banking) gives finance domain votes
    const financeContextText = 'Công ty áp dụng lãi kép cho tài sản token kỹ thuật số.';
    const financeHits = matcher.termHits(financeContextText);
    const cryptoTokenHit = financeHits.find((h) => h.term?.key.toLowerCase() === 'token');
    expect(cryptoTokenHit).toBeDefined();
    expect(cryptoTokenHit?.concept.id).toBe('token-crypto');
  });

  it('T-M8: Reverse Lookup Trie on Plain Descriptions', () => {
    const mockConcepts = [
      {
        id: 'compound-interest',
        label: 'Lãi kép',
        summary: 'Lãi dồn tích.',
        plain_descriptions: [
          'tiền lãi lại sinh ra lãi',
          'lãi mẹ đẻ lãi con',
          'short' // < 12 chars, must be ignored
        ]
      },
      {
        id: 'api',
        label: 'API',
        summary: 'Giao diện lập trình.',
        plain_descriptions: [
          'giao diện kết nối các ứng dụng phần mềm'
        ]
      }
    ];

    const reverseMatcher = createReverseMatcher(mockConcepts, 12);

    // Query with diacritics
    const textWithAccents = 'Làm sao để tiền lãi lại sinh ra lãi trong đầu tư?';
    const hints1 = reverseMatcher.reverseHints(textWithAccents);
    expect(hints1.length).toBe(1);
    expect(hints1[0].id).toBe('compound-interest');

    // Query without diacritics
    const textWithoutAccents = 'toi muon biet ve tien lai lai sinh ra lai trong dau tu';
    const hints2 = reverseMatcher.reverseHints(textWithoutAccents);
    expect(hints2.length).toBe(1);
    expect(hints2[0].id).toBe('compound-interest');

    // Second phrase
    const hints3 = reverseMatcher.reverseHints('Toi can mot giao dien ket noi cac ung dung phan mem voi nhau');
    expect(hints3.length).toBe(1);
    expect(hints3[0].id).toBe('api');

    // Spans extraction
    const spans = reverseMatcher.reverseSpans(textWithAccents, hints1);
    expect(spans.length).toBe(1);
    expect(textWithAccents.slice(spans[0].start, spans[0].end)).toBe('tiền lãi lại sinh ra lãi');

    const spansWithoutAccents = reverseMatcher.reverseSpans(textWithoutAccents, hints2);
    expect(spansWithoutAccents).toHaveLength(1);
    expect(textWithoutAccents.slice(spansWithoutAccents[0].start, spansWithoutAccents[0].end))
      .toBe('tien lai lai sinh ra lai');

    const nfdText = 'Tôi muốn biết về tiền lãi lại sinh ra lãi trong đầu tư';
    const nfdHints = reverseMatcher.reverseHints(nfdText);
    const nfdSpans = reverseMatcher.reverseSpans(nfdText, nfdHints);
    expect(nfdSpans).toHaveLength(1);
    expect(nfdText.slice(nfdSpans[0].start, nfdSpans[0].end).normalize('NFC'))
      .toBe('tiền lãi lại sinh ra lãi');
  });
});
