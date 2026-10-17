# Báo cáo Wave 3: Lô Biz (18 khái niệm)

Trạng thái: **hoàn thành soạn thảo và vượt qua toàn bộ cổng kiểm thử** (2026-10-17).
Tất cả 18 khái niệm đều ở `status: draft`, `provenance: { drafted_by: ai }`.

## Danh sách khái niệm
| id | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|
| `crm` | Customer relationship management (CRM) | CRM | 1 | microsoft-learn (B) | từ mượn |
| `erp` | Enterprise resource planning (ERP) | ERP | 2 | microsoft-learn (B) | từ mượn |
| `cms` | Content management system (CMS) | CMS | 1 | mdn (B) | từ mượn |
| `hrm-system` | Human resource management system (HRMS) | HRMS | 1 | microsoft-learn (B) | từ mượn |
| `pos-system` | Point of sale (POS) | POS | 1 | microsoft-learn (B) | từ mượn |
| `business-intelligence` | Business intelligence (BI) | Kinh doanh thông minh | 2 | aws-docs (B) | wikipedia-vi |
| `data-visualization` | Data visualization | Data visualization | 1 | aws-docs (B) | từ mượn |
| `payment-gateway` | Payment gateway | Cổng thanh toán | 2 | stripe-docs (B) | wikipedia-vi |
| `e-commerce-platform` | E-commerce platform | Nền tảng thương mại điện tử | 1 | microsoft-learn (B) | wikipedia-vi |
| `help-desk` | Help desk | Help desk | 1 | microsoft-learn (B) | từ mượn |
| `itsm` | IT service management (ITSM) | ITSM | 2 | nist-csrc (A) | từ mượn |
| `itil` | ITIL | ITIL | 2 | nist-csrc (A) | từ mượn |
| `rpa` | Robotic process automation (RPA) | RPA | 2 | microsoft-learn (B) | từ mượn |
| `low-code` | Low-code | Low-code | 1 | aws-docs (B) | từ mượn |
| `no-code` | No-code | No-code | 1 | aws-docs (B) | từ mượn |
| `workflow-automation` | Workflow automation | Tự động hóa quy trình | 1 | microsoft-learn (B) | wikipedia-vi |
| `ipaas` | Integration platform as a service (iPaaS) | iPaaS | 2 | aws-docs (B) | từ mượn |
| `digital-transformation` | Digital transformation | Chuyển đổi số | 1 | google-cloud-docs (B) | wikipedia-vi |

Mọi khái niệm:
- `status: draft`, `provenance.drafted_by: ai`.
- `en` viết từ nguồn (`translation: native`). `vi` dịch từ `en` (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: '2026-10-17'`).
- Mỗi locale có ít nhất 2 `plain_descriptions` độc nhất, không trùng lặp và đầy đủ 4 phần thân bài (`## Easy explanation` / `## Giải thích dễ hiểu`, `## Details` / `## Chi tiết`, `## Technical definition` / `## Định nghĩa chuyên ngành`, `## Examples` / `## Ví dụ`).
- Đồ thị quan hệ `prerequisites` tạo thành DAG không có chu trình. Các quan hệ `related` được kết nối chặt chẽ giữa các khái niệm doanh nghiệp liên quan.
- Quyết định `autolink`:
  - Từ viết tắt (acronyms):
    - `autolink: { label: always, aliases: { <ACR>: always } }` cho `CRM`, `ERP`, `CMS`, `HRMS`, `ITSM`, `RPA`, `iPaaS`, `BI`.
    - `autolink: { label: always }` cho `ITIL`.
    - `autolink: { label: never, aliases: { POS: never } }` cho `POS` theo yêu cầu ghi chú nhằm tránh xung đột tự động liên kết quá mức.

## Mục mới trong `config/sources.yaml`
Mục nguồn mới được thêm ở cuối file dưới chú thích `# wave3 biz`, tuân thủ `reuse: paraphrase-only`:
| ref | Bậc | Loại | Giấy phép | Ghi chú |
|---|---|---|---|---|
| `stripe-docs` | B | docs | all-rights-reserved | Tài liệu chính thức của Stripe Inc. phục vụ định nghĩa cổng thanh toán |

Mọi URL nguồn và bằng chứng đều được kiểm tra thực tế (HTTP 200) và văn bản thuần tương ứng đã được lưu trữ trong `candidates/.sources/` phục vụ kiểm tra trùng lặp bản quyền.

## Kết quả kiểm tra chất lượng (Quality Gates)
| Lệnh kiểm tra | Dòng kết quả cuối cùng |
|---|---|
| `pnpm tb validate --strict` | `✔ Validation passed successfully!` |
| `pnpm tb build` | `✔ Successfully generated 22 index files and 1373 dist artifacts:` |
| `pnpm tb report collisions` | `✔ mọi homonym đều có qualifier và confusable hai chiều` |
| `pnpm tb check overlap` | `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words` |
| `pnpm tb check overlap --size 6 --concepts crm,erp,cms,hrm-system,pos-system,business-intelligence,data-visualization,payment-gateway,e-commerce-platform,help-desk,itsm,itil,rpa,low-code,no-code,workflow-automation,ipaas,digital-transformation` | `✔ Không có đoạn trùng ≥ 6 từ / no copied runs of 6+ words` |

## Các điểm tồn đọng / Không hoàn thành
- Không có: toàn bộ 18 khái niệm trong danh mục `candidates/wave3/biz.yaml` đều được soạn thảo hoàn chỉnh, đáp ứng toàn diện tiêu chuẩn schema, integrity rules, và vượt qua tất cả các cổng kiểm tra bắt buộc với 0 lỗi và 0 cảnh báo.
