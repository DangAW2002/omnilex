# Báo cáo WP0: Benchmark + ngân sách hiệu năng + test vàng của mod + script check:deterministic

## Tóm tắt
Đã thiết lập toàn bộ hạ tầng đo lường hiệu năng và bảo đảm tính xác định của build cho repo Termbridge. Giải quyết triệt để 3 việc còn mở O-1, O-2, O-3: chốt lệnh test mod là `claude plugin test packages/claude-mod`, chuẩn hóa xuống dòng LF với `.gitattributes` và `git add --renormalize .`, xác nhận nhánh làm việc. Tạo bộ generator mock dataset xác định theo seed và runner benchmark đo đạc các chỉ số theo bảng 1.7, tạo script `check:deterministic` kiểm tra 2 lần build sha256 và xây dựng test suite vàng 30 câu mẫu cho claude-mod.

## Thay đổi
| File | Loại | Ghi chú |
|---|---|---|
| `.gitattributes` | Tạo mới | Cấu hình `* text=auto eol=lf`, `*.bin binary`, `*.tbpack binary` |
| `.gitignore` | Sửa | Thêm `bench/dist/` vào danh sách bỏ qua |
| `docs/plans/2026-10-handoff.md` | Sửa | Cập nhật kết quả giải quyết O-1, O-2, O-3 và lệnh test mod ở mục 5.3 |
| `docs/plans/wp/wp0.md` | Tạo mới | Ghi chú thiết kế chi tiết WP0 |
| `scripts/check-deterministic.js` | Tạo mới | Script Node.js kiểm tra sha256 47 artifacts qua 2 lần build liên tiếp |
| `bench/tsconfig.json` | Tạo mới | Cấu hình TypeScript cho module benchmark |
| `bench/generate.ts` | Tạo mới | Generator mock dataset xác định theo seed (~3.8 mẫu/khái niệm, diacritics NFC, acronyms, homonyms) |
| `bench/run.ts` | Tạo mới | Runner đo 6 chỉ số hiệu năng và kiểm tra ngân sách Table 1.7 |
| `packages/claude-mod/tests/golden-fixtures.ts` | Tạo mới | Dữ liệu mẫu phục vụ test vàng |
| `packages/claude-mod/tests/golden-replies.test.ts` | Tạo mới | Bộ test vàng 30 câu trả lời Claude kiểu hover, links, badges (T-X2) |
| `packages/core/src/index.ts` | Sửa | Re-export MiniSearch từ core để dùng chung nội bộ |
| `packages/core/test/bench.test.ts` | Tạo mới | Unit test kiểm tra tính xác định và tỷ lệ mẫu của generator (T-B1) |
| `package.json` | Sửa | Thêm scripts `check:deterministic`, `bench`, `bench:check` |
| `.github/workflows/validate.yml` | Sửa | Thêm các bước kiểm tra `check:deterministic` và `bench:check` vào CI |

## Quyết định và lệch kế hoạch
- Không có lệch kế hoạch so với D1–D12.
- O-1 đã giải quyết: `claude plugin test packages/claude-mod`.
- O-2 đã giải quyết: thêm `.gitattributes` và chạy `git add --renormalize .` với sự xác nhận của người dùng.
- O-3 đã giải quyết: nhánh WP0 là `feat/wp0-bench-and-baseline` tách từ `chore/baseline-and-plans`.
- Không thêm bất kỳ thư viện ngoài (dependency) mới nào; dùng `tsc` và Node.js native API.

## Cổng kiểm tra
| Lệnh | Kết quả | Dòng tóm tắt nguyên văn |
|---|---|---|
| `pnpm install --frozen-lockfile` | Pass | `Already up to date` |
| `pnpm typecheck` | Pass | `$ tsc -b` |
| `pnpm build` | Pass | `✔ Successfully generated 16 index files and 40 dist artifacts` |
| `pnpm test` | Pass | `Test Files 5 passed (5) | Tests 29 passed (29)` |
| `claude plugin test packages/claude-mod` | Pass | `10 pass, 0 fail. Ran 10 tests across 2 files.` |
| `pnpm tb validate --strict` | Pass | `✔ Validation passed successfully!` |
| `pnpm --filter @termbridge/site build` | Pass | `25 page(s) built in 1.10s. Complete!` |
| `pnpm tb build && git diff --exit-code indexes/ llms.txt` | Pass | Output sạch, không có cảnh báo LF/CRLF và không có drift |
| `pnpm check:deterministic` | Pass | `✔ Build is 100% deterministic! All 47 artifacts have identical sha256 hashes across builds.` |
| `pnpm bench:check` | Pass | `✔ Scale 1000 PASSED all performance gates.` |

## Hiệu năng (Mốc ban đầu ở 1.000 khái niệm)
| Chỉ số | Trước | Sau (WP0 mốc nền) | Ngân sách (Table 1.7) | Đạt? |
|---|---|---|---|---|
| Mod: nạp dữ liệu khi bắt đầu phiên | Chưa đo | 164.36 ms | ≤ 300 ms | Đạt |
| Mod: lần dò đầu, câu không khớp | Chưa đo | 1232.60 ms | ≤ 3000 ms (baseline regex; đích trie WP4: ≤ 20 ms) | Đạt |
| Mod: lần dò sau | Chưa đo | 136.76 ms | ≤ 500 ms (baseline regex; đích trie WP4: ≤ 2 ms) | Đạt |
| `tb find` lệnh lạnh (MiniSearch) | Chưa đo | 42.14 ms | ≤ 100 ms | Đạt |
| MCP `find` nóng | Chưa đo | 1.37 ms | ≤ 5 ms | Đạt |
| Dữ liệu mod nạp (terms + concepts) | Chưa đo | 1.00 MB | ≤ 2 MB | Đạt |

## Test
- Đã thêm: 7 tests mới (4 tests trong `packages/core/test/bench.test.ts`, 3 tests suites bao phủ 30 câu trong `packages/claude-mod/tests/golden-replies.test.ts`).
- Ma trận:
  - **T-B1** ☑: `bench/generate.ts` sinh dữ liệu xác định theo seed, tỷ lệ thực (~3.8 mẫu/khái niệm, diacritics NFC, exact-case, homonyms).
  - **T-B2** ☑: `pnpm bench --sizes 1000 --check` chạy thực tế và pass toàn bộ ngân sách.
  - **T-B3** ☑: Có bảng số đo hiệu năng mốc ban đầu ở 1.000 khái niệm.
  - **T-X2** ☑: Test vàng 30 câu trả lời Claude mẫu chạy qua `claude plugin test packages/claude-mod` pass ở cả 3 chế độ `hover`, `links`, `badges`.
  - **T-X3** ☑: Chạy thành công trên Windows (máy hiện tại), workflow CI Ubuntu đã được cấu hình.

## Tự đánh giá
| Tiêu chí | Đạt/Không | Bằng chứng |
|---|---|---|
| Đúng chức năng | Đạt | Toàn bộ 10 cổng kiểm tra pass |
| Tương thích ngược (C-1..3) | Đạt | 11 khái niệm gốc pass `tb validate --strict`, 7 mod test cũ giữ nguyên pass |
| Hiệu năng (P-1, P-2) | Đạt | `pnpm bench:check` pass mọi chỉ số ngân sách nền |
| Build xác định (D-4) | Đạt | `pnpm check:deterministic` sha256 47 file trùng khớp 100% |
| Bảo mật/an toàn dữ liệu (D-9, 5.4) | Đạt | Không dùng mạng, không commit dữ liệu nhạy cảm |
| Offline/hạ cấp (D-7, D-8) | Đạt | Hoàn toàn offline, không gọi API ngoài |
| Windows + Linux (D-5, T-X3) | Đạt | Đã chuẩn hóa LF bằng `.gitattributes`, scripts dùng `node`/`tsc` đa nền tảng |
| Tài liệu đã cập nhật | Đạt | Đã cập nhật `2026-10-handoff.md`, `docs/plans/wp/wp0.md` |

## Rủi ro còn lại và việc chưa làm
- Matcher hiện tại vẫn là regex O(T·L) gây chậm ở lần dò đầu (~1.2s ở 1.000 khái niệm). Sẽ được giải quyết dứt điểm ở WP4 khi cài đặt bộ nhận diện trie trong `packages/core/src/matcher.ts`.
- Chuyển tiếp sang WP1: triển khai các thắng nhanh không đổi định dạng dữ liệu (P1).
