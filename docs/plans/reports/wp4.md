# Báo cáo WP4: Bộ nhận diện Aho-Corasick Trie và Runtime cho Mod

## Tóm tắt
WP4 hoàn thành việc thay thế toàn bộ cơ chế quét regex $O(T \cdot L)$ và $O(C \cdot D \cdot L)$ bằng bộ nhận diện Aho-Corasick Trie đa mẫu hiệu năng cao. Bộ nhận diện hỗ trợ ranh giới từ Unicode `(?<![\p{L}\p{N}])` và `(?![\p{L}\p{N}])`, khớp dài nhất (longest-match), kiểm tra `exact-case`, giữ dấu tiếng Việt (bảo toàn canonical equivalence NFC/NFD), cơ chế bỏ phiếu ngữ cảnh cho từ đồng âm (homonym context voting) và bộ tra ngược `ReverseMatcher` cho `plain_descriptions` (ngưỡng $\ge 12$ ký tự). Quá trình `tb build` tự động sinh mã JS ESM thuần vào `packages/claude-mod/hooks/runtime/matcher.js`, được nạp trực tiếp bởi `register.js` với bộ nhớ đệm theo requestId.

Tốc độ quét lần đầu ở quy mô 1.000 khái niệm giảm ngoạn mục từ **1.395 ms xuống còn 0,36 ms** (nhanh hơn 3.800 lần, vượt xa ngân sách $\le 10\text{ ms}$). Ở quy mô 10.000 khái niệm, tốc độ quét chỉ mất **0,64 ms** (ngân sách $\le 20\text{ ms}$). Toàn bộ 10 cổng kiểm tra và bộ test vàng 30 câu đều vượt qua 100%.

## Thay đổi
| File | Loại | Ghi chú |
|---|---|---|
| `packages/core/src/matcher.ts` | Tạo mới | Cài đặt `TrieMatcher`, `ReverseMatcher`, thuật toán Aho-Corasick, Unicode boundary, context voting |
| `packages/core/src/index.ts` | Sửa | Re-export các types và helper của `matcher` |
| `packages/core/src/query.ts` | Sửa | Hợp nhất `normalizeSearchTerm` dùng chung cài đặt duy nhất từ `matcher.ts` (D-2) |
| `packages/core/src/builder.ts` | Sửa | Tự động sinh `packages/claude-mod/hooks/runtime/matcher.js` trong build pipeline |
| `packages/claude-mod/hooks/runtime/matcher.js` | Tạo mới (sinh ra) | Runtime module JS thuần không phụ thuộc Node (D-3, D-8) |
| `packages/claude-mod/hooks/register.js` | Sửa | Nạp `createMatcher`/`createReverseMatcher`, tích hợp scan cache, ánh xạ localized concepts |
| `packages/core/test/matcher.test.ts` | Tạo mới | Bộ test T-M1 đến T-M8, gồm oracle test so sánh với regex cũ trên 2.000 văn bản ngẫu nhiên |
| `docs/plans/wp/wp4.md` | Tạo mới | Ghi chú thiết kế WP4 |
| `docs/plans/reports/wp4.md` | Tạo mới | Báo cáo hoàn thành WP4 |

## Quyết định và lệch kế hoạch
- Không có lệch kế hoạch so với D1–D12.
- Tuân thủ D-2 (Logic nằm trong core, một bản cài đặt duy nhất cho `matcher` và `normalize`).
- Tuân thủ D-3 (Runtime JS thuần, không gọi Node API trong `matcher.js`).
- Tuân thủ D-4 (Build 100% xác định, kiểm tra qua 48 artifacts).
- Tuân thủ C-3 (Oracle test T-M2 chứng minh 100% kết quả khớp với regex cũ trên $\ge 2.000$ mẫu).

## Cổng kiểm tra
| Lệnh | Kết quả | Dòng tóm tắt nguyên văn |
|---|---|---|
| `pnpm install --frozen-lockfile` | Đạt | `Already up to date` |
| `pnpm typecheck` | Đạt (exit 0) | `$ tsc -b` |
| `pnpm build` | Đạt (exit 0) | `✔ Successfully generated 22 index files and 41 dist artifacts` |
| `pnpm test` | Đạt (exit 0) | `Test Files 13 passed (13) | Tests 53 passed (53)` |
| `claude plugin test packages/claude-mod` | Đạt (exit 0) | `10 pass, 0 fail. Ran 10 tests across 2 files. [0.73s]` |
| `pnpm tb validate --strict` | Đạt (exit 0) | `✔ Validation passed successfully!` (0 errors, 0 warnings) |
| `pnpm --filter @termbridge/site build` | Đạt (exit 0) | `25 page(s) built in 1.24s. Complete!` |
| `pnpm tb build && git diff --exit-code indexes/ llms.txt` | Đạt (exit 0) | Clean diff |
| `pnpm check:deterministic` | Đạt (exit 0) | `✔ Build is 100% deterministic! All 48 artifacts have identical sha256 hashes across builds.` |
| `pnpm bench:check` | Đạt (exit 0) | `✔ Scale 1000 PASSED all performance gates.` |

## Hiệu năng (Số đo thực tế)
### Quy mô 1.000 khái niệm (Table 1.7)
| Chỉ số | Trước (WP3 - regex) | Sau (WP4 - trie) | Ngân sách (Table 1.7) | Đạt? |
|---|---|---|---|---|
| Mod: nạp dữ liệu khi bắt đầu phiên | 196.71 ms | 28.04 ms | ≤ 300 ms | ☑ |
| Mod: lần dò đầu (unmatched) | 1395.85 ms | 0.36 ms | ≤ 10 ms (trie) | ☑ (nhanh gấp ~3.800 lần) |
| Mod: lần dò sau (warm) | 131.77 ms | 0.15 ms | ≤ 2 ms | ☑ |
| `tb find` lệnh lạnh (MiniSearch) | 39.51 ms | 32.14 ms | ≤ 100 ms | ☑ |
| MCP `find` nóng (cache) | 1.37 ms | 1.15 ms | ≤ 5 ms | ☑ |
| Dữ liệu nạp (terms + concepts) | 1.00 MB | 1.00 MB | ≤ 2 MB | ☑ |

### Quy mô 10.000 khái niệm (`pnpm bench --sizes 10000`)
| Chỉ số | Kết quả đo thực tế | Ngân sách (Table 1.7) | Đạt? |
|---|---|---|---|
| Mod: nạp dữ liệu khi bắt đầu phiên | 194.51 ms | ≤ 300 ms | ☑ |
| Mod: lần dò đầu (unmatched) | 0.64 ms | ≤ 20 ms | ☑ |
| Mod: lần dò sau (warm) | 0.19 ms | ≤ 2 ms | ☑ |
| `tb find` lệnh lạnh (MiniSearch) | 306.71 ms | – | ☑ |
| MCP `find` nóng (cache) | 9.86 ms | ≤ 10 ms | ☑ |
| Dữ liệu nạp (terms + concepts) | 10.08 MB | – | ☑ |

## Test
- Đã thêm: 8 tests mới bao phủ toàn diện T-M1 đến T-M8 trong `packages/core/test/matcher.test.ts`.
- Ma trận kiểm thử:
  - **T-M1** ☑: Ranh giới từ Unicode: "Lãi kép" khớp trong ngữ cảnh có dấu chấm, ngoặc kép, ngoặc đơn; không khớp khi dính chữ/số ("lãi képx", "1lãi kép").
  - **T-M2 (oracle)** ☑: Đối chiếu kết quả (start, end, conceptId) của `TrieMatcher` với bản regex cũ trên 2.000 văn bản ngẫu nhiên có seed cố định; khớp 100% trên hơn 1.000 lượt match phát sinh.
  - **T-M3** ☑: Khớp cụm từ dài nhất: "compound interest rate" được chọn thay vì "compound interest"; không có khoảng chồng lấn.
  - **T-M4** ☑: `exact-case`: "API" khớp, "api" không khớp; từ viết tắt 2 ký tự có `autolink: always` ("AI") khớp; từ có `autolink: never` bị bỏ qua.
  - **T-M5** ☑: Giữ dấu tiếng Việt: "lai kep" không khớp "Lãi kép" ở nhận diện xuôi.
  - **T-M6** ☑: Biên an toàn: văn bản rỗng, khoảng trắng, code fence bị chặn, emoji/ký tự rộng giữ đúng offset chuỗi gốc, quét văn bản lớn 50 KB chỉ mất < 2 ms.
  - **T-M7** ☑: Bỏ phiếu ngữ cảnh (Homonym): term mơ hồ ("token") không tự động liên kết khi không có ngữ cảnh; được giải quyết chính xác sang `token-llm` khi có ngữ cảnh IT, và sang `token-crypto` khi có ngữ cảnh tài chính.
  - **T-M8** ☑: Tra ngược với `ReverseMatcher`: tìm ra khái niệm từ mô tả thông thường không dấu/có dấu cho các cụm dài $\ge 12$ ký tự.
  - **T-X2** ☑: Toàn bộ 30 câu trả lời test vàng của mod pass cả 3 chế độ (hover, links, badges).

## Tự đánh giá
| Tiêu chí | Đạt/Không | Bằng chứng |
|---|---|---|
| Đúng chức năng | Đạt | 8/8 test T-M1..T-M8 pass, 10/10 test mod pass |
| Tương thích ngược (C-1..3) | Đạt | Khớp 100% với regex cũ qua oracle test trên 2.000 mẫu |
| Hiệu năng (P-1, P-2) | Đạt | Quét text 0,36 ms (1k) và 0,64 ms (10k), vượt xa ngân sách |
| Build xác định (D-4) | Đạt | `pnpm check:deterministic` 48/48 artifacts identical sha256 |
| Bảo mật/an toàn dữ liệu (D-9, 5.4) | Đạt | Thuần chuỗi ký tự, không eval, không I/O ngoài adapter |
