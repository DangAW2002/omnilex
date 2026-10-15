// Candidate terms (Plan 2.3, D4): counted from local Claude Code transcripts,
// only when the person opts in, and only as term + count. Sentences, file
// names and any other transcript text never leave this function.
import fs from 'node:fs';
import path from 'node:path';
import { cleanTranscript, normalizeSearchTerm } from './matcher.js';
import type { RepositoryData } from './types.js';

const STOPWORDS = new Set([
  // en
  'a', 'an', 'the', 'and', 'or', 'but', 'if', 'then', 'else', 'of', 'to', 'in', 'on', 'at', 'by', 'for', 'with', 'from',
  'as', 'is', 'are', 'was', 'were', 'be', 'been', 'being', 'it', 'its', 'this', 'that', 'these', 'those', 'you', 'your',
  'we', 'our', 'i', 'me', 'my', 'he', 'she', 'they', 'them', 'their', 'not', 'no', 'yes', 'so', 'do', 'does', 'did',
  'can', 'could', 'will', 'would', 'should', 'may', 'might', 'have', 'has', 'had', 'there', 'here', 'what', 'which',
  'who', 'when', 'where', 'why', 'how', 'all', 'any', 'each', 'more', 'most', 'some', 'such', 'than', 'too', 'very',
  'just', 'also', 'into', 'out', 'up', 'down', 'about', 'over', 'now', 'only', 'one', 'two', 'new', 'use', 'used',
  'using', 'let', 'lets', 'see', 'get', 'got', 'need', 'make', 'like', 'want', 'file', 'line', 'run', 'add',
  // vi
  'và', 'là', 'của', 'có', 'cho', 'với', 'các', 'những', 'một', 'này', 'đó', 'khi', 'thì', 'mà', 'để', 'được', 'bị',
  'không', 'đã', 'đang', 'sẽ', 'cũng', 'như', 'nếu', 'vì', 'nên', 'hay', 'hoặc', 'trong', 'ngoài', 'trên', 'dưới',
  'từ', 'đến', 'tới', 'ra', 'vào', 'lại', 'rồi', 'thêm', 'bạn', 'tôi', 'mình', 'chúng', 'ta', 'họ', 'nó', 'gì',
  'nào', 'đây', 'kia', 'ở', 'theo', 'về', 'sau', 'trước', 'rất', 'nhiều', 'ít', 'cần', 'phải', 'nhé', 'ạ', 'thể',
]);

export interface Candidate {
  term: string;
  count: number;
  acronym?: boolean;
  generic?: boolean;
}

// Assistant text blocks of a Claude Code transcript line (JSONL).
export function assistantTexts(line: string): string[] {
  let record: any;
  try {
    record = JSON.parse(line);
  } catch {
    return [];
  }
  const message = record?.message;
  const isAssistant = record?.type === 'assistant' || message?.role === 'assistant';
  if (!isAssistant || !message) return [];
  if (typeof message.content === 'string') return [message.content];
  if (!Array.isArray(message.content)) return [];
  return message.content.filter((block: any) => block?.type === 'text' && typeof block.text === 'string').map((block: any) => block.text);
}

export function knownTerms(repo: RepositoryData): Set<string> {
  const known = new Set<string>();
  for (const record of repo.concepts.values()) {
    known.add(normalizeSearchTerm(record.id.replace(/-/g, ' ')));
    for (const entry of Object.values(record.locales)) {
      const fm = entry.frontmatter;
      for (const value of [fm.label, ...(fm.aliases || []), ...(fm.loanwords || [])]) {
        if (value) known.add(normalizeSearchTerm(value.trim()));
      }
    }
  }
  return known;
}

// Counts 1-3 word phrases (no stopword at either end, no digits-only words)
// and acronyms, minus what the repository already has.
export function countCandidates(
  texts: Iterable<string>,
  options: { known: Set<string>; common?: Set<string>; minCount?: number; top?: number }
): Candidate[] {
  const counts = new Map<string, { display: string; count: number; acronym: boolean }>();
  const bump = (display: string, acronym: boolean) => {
    const key = normalizeSearchTerm(display);
    if (options.known.has(key)) return;
    const current = counts.get(key);
    if (current) current.count++;
    else counts.set(key, { display, count: 1, acronym });
  };
  for (const raw of texts) {
    const text = cleanTranscript(raw).replace(/~~~[\s\S]*?~~~/g, ' ');
    for (const sentence of text.split(/[.!?;:\n()[\]{}"“”]+/)) {
      const words = sentence.match(/[\p{L}\p{N}][\p{L}\p{N}'’/+-]*/gu) || [];
      for (let i = 0; i < words.length; i++) {
        const word = words[i];
        if (/^[A-Z][A-Z0-9/+-]{1,7}$/.test(word) && /[A-Z].*[A-Z]|[A-Z][0-9]/.test(word)) {
          bump(word, true);
          continue;
        }
        for (let n = 1; n <= 3 && i + n <= words.length; n++) {
          const gram = words.slice(i, i + n);
          const first = gram[0].toLowerCase();
          const last = gram[gram.length - 1].toLowerCase();
          if (STOPWORDS.has(first) || STOPWORDS.has(last)) continue;
          if (gram.some((item) => /^\d+$/.test(item) || item.length > 32)) continue;
          if (n === 1 && first.length < 4) continue;
          bump(gram.join(' ').toLowerCase(), false);
        }
      }
    }
  }
  const minCount = options.minCount ?? 3;
  return [...counts.values()]
    .filter((item) => item.count >= minCount)
    .sort((a, b) => b.count - a.count || (a.display < b.display ? -1 : 1))
    .slice(0, options.top ?? 500)
    .map((item) => ({
      term: item.display,
      count: item.count,
      ...(item.acronym ? { acronym: true } : {}),
      ...(options.common?.has(item.display.toLowerCase()) ? { generic: true } : {}),
    }));
}

export function* transcriptTexts(dir: string): Generator<string> {
  if (!fs.existsSync(dir)) return;
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) yield* transcriptTexts(full);
    else if (entry.isFile() && entry.name.endsWith('.jsonl')) {
      for (const line of fs.readFileSync(full, 'utf-8').split('\n')) {
        if (line.trim()) yield* assistantTexts(line);
      }
    }
  }
}
