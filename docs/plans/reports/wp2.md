# Báo cáo WP2: Schema, Validator, Nguồn dẫn chứng và Autolink

## Tóm tắt
WP2 hoàn thành việc nâng cấp toàn bộ hạ tầng schema và kiểm tra tính toàn vẹn của Termbridge. Mở rộng `concept.schema.json` hỗ trợ các mục nguồn `sources` có cấu trúc (`ref`, `locator`, `title`, `language`, `accessed`, `supports`, `quote`, `archive`) song song với việc giữ tương thích ngược dạng chuỗi URL; mở rộng `locale-entry.schema.json` với cấu hình `autolink`, `label_evidence`, và metadata dịch `translation`. Khởi tạo danh mục 20 nguồn uy tín chuẩn hóa tại `config/sources.yaml` theo đúng Quyết định D12 (xác minh bản quyền, ưu tiên CC BY và public domain). Triển khai 5 luật kiểm tra mới (Rules 14–18) cùng cảnh báo từ phổ thông (`config/common-words.<locale>.txt`). Cung cấp công cụ CLI `tb sources list` và `tb sources migrate` giúp chuyển đổi dữ liệu nguồn an toàn và idempotent. Toàn bộ 11 khái niệm hiện có đã được chuẩn hóa đạt 100% chuẩn kiểm tra `--strict`.

## Thay đổi
| File | Loại | Ghi chú |
|---|---|---|
| `config/sources.yaml` | Tạo mới | Danh mục 20 nguồn uy tín (NIST, SEC, W3C, IETF, ISO, K8s, MDN, v.v.) với phân loại tier và mức reuse |
| `config/common-words.vi.txt`, `config/common-words.en.txt` | Tạo mới | Danh sách từ kỹ thuật phổ thông nhằm ngăn ngừa over-autolinking |
| `schema/concept.schema.json` | Sửa | Hỗ trợ `oneOf` chuỗi URL hoặc đối tượng nguồn có cấu trúc |
| `schema/locale-entry.schema.json` | Sửa | Thêm `autolink`, `label_evidence`, `translated_from`, `translated_by`, `translated_at`, `coined`, `sources` |
| `packages/core/src/types.ts` | Sửa | Bổ sung `ConceptSource`, `LabelEvidence`, `AutolinkConfig`, `SourceCatalogEntry`, `SourcesConfig` |
| `packages/core/src/loader.ts` | Sửa | Bổ sung hàm nạp `loadSourcesConfig` và `loadCommonWords` |
| `packages/core/src/validator.ts` | Sửa | Triển khai Rules 14, 15, 16, 17, 18 và cảnh báo từ phổ thông thiếu `autolink` |
| `packages/core/src/builder.ts` | Sửa | Áp dụng cấu hình `autolink: always/never` cho nhãn và alias khi sinh `terms.json` |
| `packages/core/src/sources.ts` | Tạo mới | Module hỗ trợ suy diễn ref nguồn từ URL và di trú nguồn `migrateAllSources` |
| `packages/core/src/index.ts` | Sửa | Export các hàm và type từ `sources.ts` |
| `packages/cli/src/index.ts` | Sửa | Thêm lệnh `tb sources list` và `tb sources migrate` |
| `concepts/*/concept.yaml`, `concepts/*/vi.md` | Sửa | Di trú nguồn có cấu trúc và bổ sung `label_evidence` cho 11 khái niệm baseline |
| `docs/schema.md`, `AGENTS.md` | Sửa | Cập nhật tài liệu 18 luật toàn vẹn và đặc tả schema mới |
| `packages/core/test/rules-14-18.test.ts` | Tạo mới | Test T-V1: Kiểm tra Rules 14–18 với cả pass và fail fixtures |
| `packages/cli/test/sources-migrate.test.ts` | Tạo mới | Test T-V3: Kiểm tra suy diễn ref, tính idempotent của `tb sources migrate` |
| `packages/core/test/autolink.test.ts` | Tạo mới | Test T-V4: Kiểm tra cấu hình `autolink: always/never` và cảnh báo từ phổ thông |
| `docs/plans/wp/wp2.md` | Tạo mới | Ghi chú thiết kế WP2 |

## Quyết định và lệch kế hoạch
- Đã được người dùng duyệt triển khai theo Phương án 1: Cập nhật nguồn chuẩn và `label_evidence` cho toàn bộ 11 khái niệm hiện có để đảm bảo `validate --strict` đạt 100% không có lỗi/cảnh báo.
- Tuân thủ nghiêm ngặt D12: Các nguồn có `reuse: adapt` gồm `nist-csrc`, `investor-gov`, `sec-gov` (public domain Mỹ), `k8s-glossary` (CC BY 4.0), `vn-law-cyber` (văn bản quy phạm pháp luật theo Luật SHTT Việt Nam). Mọi nguồn khác mặc định `paraphrase-only` hoặc `cite-only`.

## Cổng kiểm tra
| Lệnh | Kết quả | Dòng tóm tắt nguyên văn |
|---|---|---|
| `pnpm install --frozen-lockfile` | Đạt | `Already up to date` |
| `pnpm typecheck` | Đạt (exit 0) | `$ tsc -b` |
| `pnpm build` | Đạt (exit 0) | `✔ Successfully generated 16 index files and 40 dist artifacts` |
| `pnpm test` | Đạt (exit 0) | `Test Files 11 passed (11) | Tests 42 passed (42)` |
| `claude plugin test packages/claude-mod` | Đạt (exit 0) | `10 pass, 0 fail Ran 10 tests across 2 files. [0.72s]` |
| `pnpm tb validate --strict` | Đạt (exit 0) | `✔ Validation passed successfully!` (0 errors, 0 warnings) |
| `pnpm --filter @termbridge/site build` | Đạt (exit 0) | `[build] 25 page(s) built in 1.01s` |
| `pnpm tb build && git diff --exit-code indexes/ llms.txt` | Đạt (exit 0) | Clean diff |
| `pnpm check:deterministic` | Đạt (exit 0) | `✔ Build is 100% deterministic! All 47 artifacts have identical sha256 hashes across builds.` |
| `pnpm bench:check` | Đạt (exit 0) | `✔ Scale 1000 PASSED all performance gates.` |

## Hiệu năng
| Chỉ số (quy mô 1.000 khái niệm) | Trước (WP1) | Sau (WP2) | Ngân sách | Đạt? |
|---|---|---|---|---|
| Mod load data | 166.96 ms | 169.27 ms | ≤ 300 ms | ☑ |
| Mod first scan (unmatched) | 1206.79 ms | 1244.30 ms | (P1 baseline) | ☑ |
| Mod subsequent scan | 134.79 ms | 137.39 ms | - | ☑ |
| CLI find (cold MiniSearch) | 38.17 ms | 35.39 ms | - | ☑ |
| MCP find (warm cache) | 1.54 ms | 1.27 ms | ≤ 20 ms | ☑ |
| Data size (terms + concepts) | 1.00 MB | 1.00 MB | ≤ 3.0 MB | ☑ |

## Test
- Đã thêm: 9 test mới trong 3 file test:
  - `packages/core/test/rules-14-18.test.ts` (5 tests: T-V1)
  - `packages/cli/test/sources-migrate.test.ts` (2 tests: T-V3)
  - `packages/core/test/autolink.test.ts` (2 tests: T-V4)
- Ma trận:
  - T-V1 ☑: Đầy đủ fixture pass và fail cho từng rule 14, 15, 16, 17, 18, kiểm tra đúng ruleId và mức lỗi
  - T-V2 ☑: 13 rule kiểm tra hiện có tiếp tục vượt qua 100% test case hiện có (`validation-rules.test.ts`)
  - T-V3 ☑: `tb sources migrate` suy diễn đúng ref từ domain URL, xử lý URL lạ thành `ref: unknown`, và hoàn toàn idempotent khi chạy nhiều lần
  - T-V4 ☑: `autolink: always` bật autolink cho từ viết tắt ngắn (2-3 ký tự), `never` tắt autolink cho từ phổ biến; phát hiện cảnh báo từ phổ thông khi thiếu cấu hình
  - T-X2 ☑: Bộ test vàng Claude Mod đạt 10/10 test (30 replies × 3 chế độ)

## Tự đánh giá
| Tiêu chí | Đạt/Không | Bằng chứng |
|---|---|---|
| Đúng chức năng | Đạt | Toàn bộ 5 luật mới, công cụ migration và autolink hoạt động chính xác |
| Tương thích ngược (C-1..3) | Đạt | Schema hỗ trợ cả định dạng chuỗi cũ và đối tượng mới; API và build artifacts tương thích 100% |
| Hiệu năng (P-1, P-2) | Đạt | Mọi chỉ số benchmark trong ngân sách; MCP find giữ mức siêu nhanh 1.27ms |
| Build xác định (D-4) | Đạt | `pnpm check:deterministic` hash 47/47 file khớp 100% qua 2 lượt build |
| Bảo mật/an toàn dữ liệu (D-9, 5.4, D12) | Đạt | Quyết định D12 được kiểm soát chặt qua `config/sources.yaml`; giới hạn độ dài `quote` ≤ 30 từ |
| Offline/hạ cấp (D-7, D-8) | Đạt | Hoàn toàn offline; không gọi network trong validator |
| Windows + Linux (D-5, T-X3) | Đạt | Đã kiểm tra đường dẫn slash chuẩn hóa trên Windows 11 |
| Tài liệu đã cập nhật | Đạt | Đã cập nhật `docs/schema.md`, `AGENTS.md`, ghi chú `wp2.md`, báo cáo `wp2.md` |

## Rủi ro còn lại và việc chưa làm
- Bước tiếp theo: WP3 (Mở rộng Taxonomy: `iot` và `product`, kiểm thử T-V5).
