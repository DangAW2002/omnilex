# Báo cáo WP3: Mở rộng Taxonomy (it, iot, product)

## Tóm tắt
WP3 hoàn thành việc mở rộng hệ thống phân loại học (taxonomy) của OMNILEX theo đúng Mục 2.1 của Kế hoạch để chuẩn bị cho việc nạp từ vựng công nghệ. Bao gồm: mở rộng `taxonomy/it.yaml` với các nhánh con `version-control`, `practices`, tách `devops` thành nhánh cấp 2 riêng (`ci-cd`, `containers`, `observability`, `sre-operations`, `iac`), và bổ sung `mlops`, `nlp`, `computer-vision`, `ai-safety-governance` trong `ai-ml`. Khởi tạo 2 miền gốc mới: `taxonomy/iot.yaml` và `taxonomy/product.yaml`. Cập nhật `config/domains.yaml` và `config/reviewers.yaml` với đầy đủ người duyệt phụ trách. Toàn bộ 10 cổng kiểm tra đều vượt qua với 45/45 test pass.

## Thay đổi
| File | Loại | Ghi chú |
|---|---|---|
| `taxonomy/it.yaml` | Sửa | Thêm `version-control`, `practices`, tách `devops` cấp 2, thêm `mlops`, `nlp`, `computer-vision`, `ai-safety-governance` |
| `taxonomy/iot.yaml` | Tạo mới | Miền gốc IoT với các nhánh `devices-sensors`, `connectivity-protocols`, `edge-cloud`, `industrial` |
| `taxonomy/product.yaml` | Tạo mới | Miền gốc Quản trị sản phẩm & dự án với các nhánh `product-management`, `agile-scrum`, `delivery-planning`, `metrics` |
| `config/domains.yaml` | Sửa | Khai báo 2 miền gốc mới `iot` (priority 4) và `product` (priority 5) |
| `config/reviewers.yaml` | Sửa | Bổ sung người duyệt `@dang` phụ trách các miền mới `iot` và `product` |
| `packages/core/test/taxonomy-extension.test.ts` | Tạo mới | Test T-V5: Kiểm tra các đường dẫn domain mới, reviewers cho miền mới và xác thực khái niệm |
| `packages/core/test/query.test.ts` | Sửa | Cập nhật số lượng domain trong ma trận kiểm tra độ phủ |
| `docs/plans/wp/wp3.md` | Tạo mới | Ghi chú thiết kế WP3 |
| `indexes/en/iot.md`, `indexes/vi/iot.md` | Tạo mới | Chỉ mục tự động sinh bởi build |
| `indexes/en/product.md`, `indexes/vi/product.md` | Tạo mới | Chỉ mục tự động sinh bởi build |

## Quyết định và lệch kế hoạch
Không có lệch kế hoạch. Giữ nguyên nhánh `it/software-engineering/devops` cũ song song với nhánh `it/devops` độc lập mới để đảm bảo tương thích ngược tuyệt đối.

## Cổng kiểm tra
| Lệnh | Kết quả | Dòng tóm tắt nguyên văn |
|---|---|---|
| `pnpm install --frozen-lockfile` | Đạt | `Already up to date` |
| `pnpm typecheck` | Đạt (exit 0) | `$ tsc -b` |
| `pnpm build` | Đạt (exit 0) | `✔ Successfully generated 22 index files and 40 dist artifacts` |
| `pnpm test` | Đạt (exit 0) | `Test Files 12 passed (12) | Tests 45 passed (45)` |
| `claude plugin test packages/claude-mod` | Đạt (exit 0) | `10 pass, 0 fail Ran 10 tests across 2 files. [0.70s]` |
| `pnpm tb validate --strict` | Đạt (exit 0) | `✔ Validation passed successfully!` (0 errors, 0 warnings) |
| `pnpm --filter @omnilex/site build` | Đạt (exit 0) | `[build] 25 page(s) built in 1.16s` |
| `pnpm tb build && git diff --exit-code indexes/ llms.txt` | Đạt (exit 0) | Clean diff |
| `pnpm check:deterministic` | Đạt (exit 0) | `✔ Build is 100% deterministic! All 47 artifacts have identical sha256 hashes across builds.` |
| `pnpm bench:check` | Đạt (exit 0) | `✔ Scale 1000 PASSED all performance gates.` |

## Hiệu năng
| Chỉ số (quy mô 1.000 khái niệm) | Trước (WP2) | Sau (WP3) | Ngân sách | Đạt? |
|---|---|---|---|---|
| Mod load data | 169.27 ms | 196.71 ms | ≤ 300 ms | ☑ |
| Mod first scan (unmatched) | 1244.30 ms | 1395.85 ms | (P1 baseline) | ☑ |
| Mod subsequent scan | 137.39 ms | 131.77 ms | - | ☑ |
| CLI find (cold MiniSearch) | 35.39 ms | 39.51 ms | - | ☑ |
| MCP find (warm cache) | 1.27 ms | 1.37 ms | ≤ 20 ms | ☑ |
| Data size (terms + concepts) | 1.00 MB | 1.00 MB | ≤ 3.0 MB | ☑ |

## Test
- Đã thêm: 3 test mới trong `packages/core/test/taxonomy-extension.test.ts` (T-V5)
- Ma trận:
  - T-V5 ☑: Mọi đường dẫn domain mới `iot/...` và `product/...` đều nạp thành công vào `validDomainPaths`; `reviewers.yaml` có mục đầy đủ cho các domain mới; khái niệm dùng domain mới vượt qua toàn bộ quy tắc kiểm tra Rule 3 và Rule 7
  - T-X2 ☑: Bộ test vàng Claude Mod đạt 10/10 test (30 replies × 3 chế độ)

## Tự đánh giá
| Tiêu chí | Đạt/Không | Bằng chứng |
|---|---|---|
| Đúng chức năng | Đạt | 5 domain hoạt động đồng bộ trên build, CLI và validate |
| Tương thích ngược (C-1..3) | Đạt | Toàn bộ 11 khái niệm hiện có không bị ảnh hưởng |
| Hiệu năng (P-1, P-2) | Đạt | Các chỉ số benchmark tiếp tục nằm trong ngân sách |
| Build xác định (D-4) | Đạt | `pnpm check:deterministic` hash 47/47 file khớp 100% |
| Bảo mật/an toàn dữ liệu (D-9, 5.4) | Đạt | Không dùng eval hay network không an toàn |
| Offline/hạ cấp (D-7, D-8) | Đạt | Chạy hoàn toàn offline |
| Windows + Linux (D-5, T-X3) | Đạt | Đã kiểm tra đường dẫn slash chuẩn hóa trên Windows 11 |
| Tài liệu đã cập nhật | Đạt | Ghi chú thiết kế `docs/plans/wp/wp3.md` và báo cáo `docs/plans/reports/wp3.md` đầy đủ |

## Rủi ro còn lại và việc chưa làm
- Bước tiếp theo: WP4 (Bộ nhận diện Trie Matcher Aho-Corasick & Runtime Generator). Đây là lõi hiệu năng P0 giúp giảm thời gian quét từ ~1.3s xuống ≤ 20ms.
