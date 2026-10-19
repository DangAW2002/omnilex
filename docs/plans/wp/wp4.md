# Ghi chú thiết kế WP4: Bộ nhận diện trie trong core + sinh hooks/runtime/ cho mod

## 1. Phạm vi
- Cài đặt bộ nhận diện Aho-Corasick Trie đa mẫu (multi-pattern matching) trong `packages/core/src/matcher.ts`, thay thế toàn bộ vòng lặp regex $O(T \cdot L)$ và $O(C \cdot D \cdot L)$.
- Hỗ trợ ranh giới từ Unicode `(?<![\p{L}\p{N}])` và `(?![\p{L}\p{N}])`, khớp dài nhất (longest-match), không chồng lấn, kiểm tra `exact-case`, giữ dấu tiếng Việt (NFC/NFD canonical equivalence).
- Cơ chế bỏ phiếu theo ngữ cảnh cho từ đồng âm (homonym context voting) dựa trên các khái niệm không mơ hồ trong cùng văn bản.
- Bộ tra ngược `ReverseMatcher` trên `plain_descriptions` (đã bỏ dấu, ngưỡng $\ge 12$ ký tự).
- Cập nhật build pipeline trong `packages/core/src/builder.ts` để sinh mã JS thuần (không phụ thuộc Node) vào `packages/claude-mod/hooks/runtime/matcher.js`.
- Cập nhật `packages/claude-mod/hooks/register.js` sử dụng runtime matcher thay thế các hàm regex cũ.
- Viết bộ test đầy đủ T-M1 đến T-M8 trong `packages/core/test/matcher.test.ts` (gồm oracle test so sánh với regex cũ trên $\ge 2.000$ văn bản ngẫu nhiên có seed cố định).
- Xác minh ngân sách hiệu năng Table 1.7 qua `pnpm bench:check` ($\le 10\text{ ms}$ cho first scan và $\le 2\text{ ms}$ cho subsequent scan ở quy mô 1.000 khái niệm, và đo ở 10.000 khái niệm).

## 2. Các file sẽ thay đổi hoặc tạo mới
| File | Loại | Trách nhiệm |
|---|---|---|
| `packages/core/src/matcher.ts` | Tạo mới | Cài đặt thuật toán Aho-Corasick Trie matcher, Unicode boundary, context voting, reverse matcher |
| `packages/core/src/index.ts` | Sửa | Re-export các kiểu và hàm matcher từ core |
| `packages/core/src/builder.ts` | Sửa | Sinh file `packages/claude-mod/hooks/runtime/matcher.js` trong quá trình `tb build` |
| `packages/claude-mod/hooks/register.js` | Sửa | Tích hợp runtime matcher, cache `(requestId, hash)` |
| `packages/core/test/matcher.test.ts` | Tạo mới | Bộ test T-M1 đến T-M8 (oracle $\ge 2.000$ mẫu, Unicode boundary, longest match, exact-case, homonym voting, reverse trie) |
| `docs/plans/reports/wp4.md` | Tạo mới | Báo cáo hoàn thành WP4 |

## 3. Interface (Kiểu dữ liệu & Chữ ký hàm)

```typescript
export interface TermConcept {
  id: string;
  label: string;
  qualifier?: string;
  summary: string;
  domains?: string[];
}

export interface TermEntry {
  key: string;
  match: 'exact-case' | 'any-case';
  concepts: TermConcept[];
  autolink: boolean;
  autolinkConfig?: 'always' | 'never' | 'auto';
}

export interface MatchSpan {
  start: number;
  end: number;
  term?: TermEntry;
  concept: TermConcept;
  text?: string;
}

export interface Range {
  start: number;
  end: number;
}

export interface TrieNode {
  transitions: Map<string, number>;
  fail: number;
  outputs: Array<{
    term: TermEntry;
    key: string;
    len: number;
    exactCase: boolean;
  }>;
}

export class TrieMatcher {
  constructor(terms: TermEntry[]);
  match(text: string, options?: { blocked?: Range[] }): MatchSpan[];
  matchedConcepts(text: string, maxBadges?: number): TermConcept[];
  termHits(text: string, blocked?: Range[]): MatchSpan[];
  forwardSpans(text: string, maxBadges?: number): MatchSpan[];
}

export class ReverseMatcher {
  constructor(concepts: any[], minLength?: number);
  reverseHints(text: string, maxBadges?: number): any[];
  reverseSpans(text: string, hints: any[], maxBadges?: number): MatchSpan[];
}

export function createMatcher(terms: TermEntry[]): TrieMatcher;
export function createReverseMatcher(concepts: any[], minLength?: number): ReverseMatcher;
export function isWordChar(ch: string): boolean;
```

## 4. Test sẽ viết
- **T-M1**: Ranh giới từ Unicode (`(?<![\p{L}\p{N}])` / `(?![\p{L}\p{N}])`, dấu câu biên, không dính liền chữ/số).
- **T-M2 (oracle)**: So sánh kết quả với bản regex cũ trên $\ge 2.000$ văn bản ngẫu nhiên có seed cố định (trộn terms, aliases, hoa thường, dấu câu, xuống dòng, tiếng Việt).
- **T-M3**: Khớp dài nhất (longest-match) và giải quyết chồng lấn (overlapping spans).
- **T-M4**: `exact-case` (từ viết tắt như API vs api), kiểm tra quy tắc `autolink: always` / `autolink: never`.
- **T-M5**: Giữ dấu tiếng Việt ở nhận diện xuôi ("lãi kép" vs "lai kep").
- **T-M6**: Xử lý biên (văn bản rỗng, khoảng trắng, chỉ code fence, emoji/ký tự rộng giữ đúng offset, văn bản 50 KB).
- **T-M7**: Homonym context voting (tính điểm theo lĩnh vực, giải quyết khi có chênh lệch rõ, không autolink khi hòa hoặc không có ngữ cảnh).
- **T-M8**: Tra ngược với `ReverseMatcher` trên `plain_descriptions` (bỏ dấu, ngưỡng $\ge 12$ ký tự).

## 5. Rủi ro và biện pháp xử lý
- **Rủi ro 1: Lệch offset ký tự khi gặp Unicode surrogate pairs hoặc NFD.**
  - *Biện pháp*: Giữ nguyên chuỗi gốc, kiểm tra ranh giới bằng Unicode code point; với văn bản NFD, dùng grapheme cluster mapping đối chiếu về vị trí chuỗi gốc.
- **Rủi ro 2: Runtime mod không có môi trường Node.js.**
  - *Biện pháp*: Toàn bộ code trong `matcher.ts` là TypeScript/ESM thuần, không dùng `node:fs`, `node:path`, `process`. File runtime được sinh nguyên bản là ESM JS độc lập.
- **Rủi ro 3: Vượt ngân sách bộ nhớ khi dựng trie với nhiều thuật ngữ.**
  - *Biện pháp*: Dùng `Map<string, number>` cho transitions, chia sẻ nút chung, chỉ lưu outputs ở nút kết thúc.
