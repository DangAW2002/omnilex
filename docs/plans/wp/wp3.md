# Ghi chú thiết kế WP3: Mở rộng Taxonomy (it, iot, product)

## 1. Mục tiêu và phạm vi
Triển khai mở rộng phân loại học (taxonomy) chuẩn bị cho việc bổ sung từ vựng công nghệ quy mô lớn (theo Mục 2.1 của Kế hoạch):
1. **Mở rộng `taxonomy/it.yaml`**:
   - Nhánh `it/software-engineering`: bổ sung `version-control` và `practices`.
   - Tách `it/devops` thành nhánh cấp 2 độc lập: `ci-cd`, `containers`, `observability`, `sre-operations`, `iac`.
   - Nhánh `it/ai-ml`: bổ sung `mlops`, `nlp`, `computer-vision`, `ai-safety-governance`.
2. **Khởi tạo taxonomy gốc mới `taxonomy/iot.yaml`**:
   - `devices-sensors`, `connectivity-protocols`, `edge-cloud`, `industrial`.
3. **Khởi tạo taxonomy gốc mới `taxonomy/product.yaml`**:
   - `product-management`, `agile-scrum`, `delivery-planning`, `metrics`.
4. **Cập nhật cấu hình**:
   - `config/domains.yaml`: Khai báo 2 miền gốc mới `iot` và `product`.
   - `config/reviewers.yaml`: Bổ sung danh sách người duyệt phụ trách cho `iot` và `product`.

## 2. Các file sẽ đổi / tạo mới
- **Sửa**:
  - `taxonomy/it.yaml`
  - `config/domains.yaml`
  - `config/reviewers.yaml`
- **Tạo mới**:
  - `docs/plans/wp/wp3.md`
  - `taxonomy/iot.yaml`
  - `taxonomy/product.yaml`
  - `packages/core/test/taxonomy-extension.test.ts` (test T-V5)

## 3. Interface & Cấu trúc
Tuân thủ nghiêm ngặt JSON schema `taxonomy.schema.json` và `domains.schema.json`. Mọi node đều có `id` (kebab-case) và `labels` đầy đủ ở 2 ngôn ngữ `vi` và `en`.

## 4. Test sẽ viết (T-V5)
- Kiểm tra các đường dẫn domain mới thuộc `iot/...` và `product/...` được nạp đầy đủ vào `validDomainPaths`.
- Kiểm tra `reviewers.yaml` có người duyệt hợp lệ cho `iot` và `product`.
- Kiểm tra validator kiểm tra thành công khái niệm thuộc miền `iot` hoặc `product`.

## 5. Rủi ro
- Thay đổi taxonomy ảnh hưởng đến chỉ mục tạo mới (`indexes/<locale>/<domain>.md`): Builder sẽ tự động tạo thư mục index mới cho `iot` và `product`. Đảm bảo `pnpm tb build` và `pnpm check:deterministic` kiểm tra sự nhất quán.
