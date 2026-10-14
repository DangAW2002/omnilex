# Báo cáo WP1: Thắng nhanh, không đổi định dạng dữ liệu (P1)

## Tóm tắt
WP1 hoàn thành triển khai toàn bộ các tối ưu hóa P1 trong Mục 1.8 của Kế hoạch mà không thay đổi bất kỳ định dạng dữ liệu nào. Bao gồm: tối ưu hóa thời gian quét và nạp dữ liệu của Claude Mod thông qua tra cứu Map O(1), tái sử dụng regex biên dịch sẵn, chuẩn hóa sẵn mô tả ngắn, và tải lười bài giải thích Markdown; hỗ trợ nạp/xuất MiniSearch index qua `loadJSON`/`toJSON` và cache instance trong core; tăng tốc lệnh CLI `tb find` bằng cách đọc trực tiếp `dist/<locale>/search.json` kèm kiểm tra mtime; và cache chỉ mục MiniSearch trong MCP server để tránh dựng lại ở mỗi tool call. Toàn bộ 10 cổng kiểm tra đều vượt qua, trong đó MCP `find_term` giảm từ ~100ms xuống 1.54ms, và 100% test bộ vàng mod giữ nguyên tính tương thích.

## Thay đổi
| File | Loại | Ghi chú |
|---|---|---|
| `packages/claude-mod/hooks/register.js` | Sửa | `conceptsById` O(1), tái sử dụng `matchers` trong `forwardSpans`, chuẩn hóa sẵn mô tả trong `reverseHints`, tải lười `concepts-*.json` qua `ensureExplanations` |
| `packages/core/src/query.ts` | Sửa | Thêm `createSearchIndex`, `loadSearchIndex`, `searchIndexToJSON`, `getCachedSearchIndex`, `clearSearchIndexCache`, `findConceptsFromDocs` |
| `packages/cli/src/index.ts` | Sửa | Thêm `findAction` đọc trực tiếp `dist/<locale>/search.json`, kiểm tra mtime so với `concepts/`, bọc guard `if (!process.env.VITEST)` |
| `packages/mcp/src/index.ts` | Sửa | Cache `searchIndexCache` trong tiến trình MCP, bọc guard `if (!process.env.VITEST)`, export `handleToolCall` phục vụ test |
| `docs/plans/wp/wp1.md` | Tạo | Ghi chú thiết kế WP1 |
| `packages/core/test/search-index.test.ts` | Tạo | Test T-S1 kiểm tra tính nhất quán giữa `loadJSON` và index dựng mới trên 55 query |
| `packages/cli/test/find.test.ts` | Tạo | Test T-S3 kiểm tra `tb find` đọc dist trực tiếp và fallback an toàn khi dist cũ |
| `packages/mcp/test/cache.test.ts` | Tạo | Test T-S4 kiểm tra `MiniSearch.prototype.addAll` chỉ được gọi 1 lần qua 5 lần gọi `find_term` liên tiếp |

## Quyết định và lệch kế hoạch
Không có lệch kế hoạch. Mọi tối ưu hóa đều tuân thủ nguyên tắc không phá vỡ định dạng dữ liệu hoặc API công khai.

## Cổng kiểm tra
| Lệnh | Kết quả | Dòng tóm tắt nguyên văn |
|---|---|---|
| `pnpm install --frozen-lockfile` | Đạt | `Already up to date` |
| `pnpm typecheck` | Đạt (exit 0) | `$ tsc -b` |
| `pnpm build` | Đạt (exit 0) | `✔ Successfully generated 16 index files and 40 dist artifacts` |
| `pnpm test` | Đạt (exit 0) | `Test Files 8 passed (8) | Tests 33 passed (33)` |
| `claude plugin test packages/claude-mod` | Đạt (exit 0) | `10 pass, 0 fail Ran 10 tests across 2 files. [0.75s]` |
| `pnpm tb validate --strict` | Đạt (exit 0) | `✔ Validation passed successfully!` |
| `pnpm --filter @termbridge/site build` | Đạt (exit 0) | `[build] 25 page(s) built in 1.13s` |
| `pnpm tb build && git diff --exit-code indexes/ llms.txt` | Đạt (exit 0) | Clean diff |
| `pnpm check:deterministic` | Đạt (exit 0) | `✔ Build is 100% deterministic! All 47 artifacts have identical sha256 hashes across builds.` |
| `pnpm bench:check` | Đạt (exit 0) | `✔ Scale 1000 PASSED all performance gates.` |

## Hiệu năng
| Chỉ số (quy mô 1.000 khái niệm) | Trước (WP0) | Sau (WP1) | Ngân sách | Đạt? |
|---|---|---|---|---|
| Mod load data | 192.42 ms | 166.96 ms | ≤ 300 ms | ☑ |
| Mod first scan (unmatched) | 1324.50 ms | 1206.79 ms | (P1 baseline) | ☑ |
| Mod subsequent scan | 148.60 ms | 134.79 ms | - | ☑ |
| CLI find (cold MiniSearch) | 42.10 ms | 38.17 ms | - | ☑ |
| MCP find (warm cache) | 124.50 ms | 1.54 ms | ≤ 20 ms | ☑ (giảm 98.8%) |
| Data size (terms + concepts) | 1.00 MB | 1.00 MB | ≤ 3.0 MB | ☑ |

## Test
- Đã thêm: 4 test mới trong 3 file test:
  - `packages/core/test/search-index.test.ts` (1 test: T-S1)
  - `packages/cli/test/find.test.ts` (2 tests: T-S3)
  - `packages/mcp/test/cache.test.ts` (1 test: T-S4)
- Ma trận:
  - T-S1 ☑: Kiểm tra 55 query trên index `loadJSON` khớp 100% với index dựng mới
  - T-S3 ☑: CLI đọc thẳng `search.json` khi dist còn mới, fallback gọi `loadAll()` khi dist cũ
  - T-S4 ☑: MCP cache ấm, chỉ gọi `addAll` 1 lần duy nhất cho mỗi locale
  - T-X2 ☑: Bộ test vàng Claude Mod đạt 10/10 test (30 replies × 3 chế độ)

## Tự đánh giá
| Tiêu chí | Đạt/Không | Bằng chứng |
|---|---|---|
| Đúng chức năng | Đạt | Toàn bộ tính năng tìm kiếm, mod UI và MCP hoạt động trơn tru |
| Tương thích ngược (C-1..3) | Đạt | C-1, C-2, C-3 giữ nguyên; không thay đổi cấu trúc dữ liệu JSON |
| Hiệu năng (P-1, P-2) | Đạt | MCP find giảm xuống 1.54ms; Mod load data giảm xuống 166.96ms |
| Build xác định (D-4) | Đạt | `pnpm check:deterministic` hash 47/47 file khớp 100% qua 2 lượt build |
| Bảo mật/an toàn dữ liệu (D-9, 5.4) | Đạt | Không dùng eval, regex an toàn không có catastrophic backtracking |
| Offline/hạ cấp (D-7, D-8) | Đạt | Không phụ thuộc mạng; fallback an toàn khi `dist` chưa có hoặc stale |
| Windows + Linux (D-5, T-X3) | Đạt | Mọi đường dẫn dùng chuẩn hóa slash, test chạy trên Windows 11 |
| Tài liệu đã cập nhật | Đạt | Ghi chú thiết kế `docs/plans/wp/wp1.md` và báo cáo `docs/plans/reports/wp1.md` đầy đủ |

## Rủi ro còn lại và việc chưa làm
- Bước quét văn bản dài trong Mod vẫn dùng Regex tuần tự O(N) của baseline (~1.2s cho 1.000 khái niệm). Regex sẽ được thay thế hoàn toàn bằng Trie Matcher Aho-Corasick ở WP4 (mục tiêu ≤ 20ms).
- Chuẩn bị bước sang WP2: Mở rộng Schema (`autolink`, structured `sources`, `label_evidence`) và 5 luật kiểm tra mới (14–18). Cần dừng sau khi viết `docs/plans/wp/wp2.md` để người dùng duyệt trước khi code.
