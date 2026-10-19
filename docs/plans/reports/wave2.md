# Báo cáo WP8, wave 2: mở rộng mọi lĩnh vực (294 khái niệm)

Trạng thái: **đã commit và merge vào `master`** (tag `wave2-checkpoint-325`). Mọi khái niệm vẫn là `status: draft`, `provenance.drafted_by: ai`; chưa khái niệm nào được nâng trạng thái.

## Tóm tắt
Wave 2 đưa kho từ 31 lên **325 khái niệm**, phủ cả 5 lĩnh vực. Orchestrator (Claude) lập danh sách từ khóa chủ, kiểm trùng trước khi soạn, rồi giao soạn cho agy (Gemini) theo 10 lô song song, mỗi lô một worktree và một nhánh. Lô nào cũng được orchestrator kiểm chứng độc lập trước khi merge, không dựa vào báo cáo "đã pass" của agent.

| Lĩnh vực | Số khái niệm | Theo nhánh cấp 2 |
|---|---|---|
| it | 155 | ai-ml 51, software-engineering 31, devops 26, web 15, security 13, data 11, infrastructure 8 |
| finance | 62 | investing 17, corporate-finance 13, personal-finance 10, economics 9, accounting 7, banking 6 |
| media | 49 | digital-marketing 24, journalism 8, content-production 8, pr-communications 5, publishing 4 |
| product | 34 | agile-scrum 15, metrics 8, delivery-planning 6, product-management 5 |
| iot | 25 | connectivity-protocols 7, devices-sensors 6, edge-cloud 6, industrial 6 |

Danh mục nguồn (`config/sources.yaml`) tăng lên 104 mục.

## Quy trình
1. **Danh sách chủ, chống trùng trước khi soạn**: [candidates/wave2/_all.yaml](../../../candidates/wave2/_all.yaml), mỗi id thuộc đúng một lô. Script kiểm trùng so id, domain, nhãn và từ viết tắt với 31 khái niệm có sẵn và giữa các lô. Phát hiện `apr` trùng alias của `interest-rate`, thay bằng `overdraft`. Homonym được gán qualifier từ đầu (Lead (Báo chí)/(Marketing), Index (Cơ sở dữ liệu), Model (AI)…).
2. **Soạn**: agy theo spec chung, chỉ soạn đúng id được giao, không commit.
3. **Kiểm chứng của orchestrator, mỗi lô**:
   - phạm vi file bị sửa;
   - đủ id, `draft`/`ai`, có nguồn A/B cho định nghĩa;
   - fetch mọi URL nguồn và bằng chứng (HTTP 200, anchor có thật);
   - trang bằng chứng phải chứa đúng nhãn tiếng Việt;
   - rà bậc nguồn mới;
   - chạy lại validate strict, collisions, overlap (8 và 6 từ), toàn bộ test;
   - đọc tay mẫu 20% (seed 20261016).
4. **Tích hợp**: merge vào `content/wave2`, hợp nhất `sources.yaml`, build lại file sinh, chạy đủ cổng, fast-forward `master`, gắn tag mốc.

## Lỗi bắt được khi kiểm chứng
| Loại | Ví dụ | Xử lý |
|---|---|---|
| Chép nguồn | 7 câu từ Scrum Guide/Atlassian (product); summary design-pattern và định nghĩa mesh-network gần như chép Wikipedia; gradient-descent chép Google ML Glossary (chỉ lộ ra khi gom văn bản nguồn của cả 10 lô) | Viết lại; ngưỡng 8 từ sạch, ngưỡng 6 từ chỉ còn tên các mức MoSCoW |
| Nâng bậc nguồn | Blog HubSpot/Intercom/Mixpanel, Coursera, CFI, Atlassian, từ điển Oxford, báo VietnamPlus/Báo Chính phủ, MIT KB được ghi bậc A/B | Hạ về C/D; tìm nguồn A/B thật cho 33 khái niệm (Agile Alliance, Microsoft Learn, Google Research, Firebase, GA4 Help, Cypress, Journalist's Resource, Reuters Institute, GOV.UK, NYT Ethical Journalism, CDC CERC…) |
| Bằng chứng nhãn vi sai | "Chuyển khoản ngân hàng", "Đa dạng hóa danh mục", "Truyền thông khủng hoảng" không có trên trang dẫn chứng; URL Wikipedia gõ sai dấu | Đổi nhãn theo đúng chữ trên trang thật, hoặc tìm trang chứa đúng nhãn |
| Sai dữ kiện | "pixel coordinates"; B-tree là "binary search"; pod "persistent storage"; merge conflict "unresolvable"; điểm tín dụng tốt thì "không cần chứng minh thu nhập"; GDP Việt Nam 2026 và CPI bịa số | Sửa; ví dụ số liệu đổi thành giả định có phép tính đúng |
| Alias sai/quá phổ thông | "Sử thi" cho epic, "Thời gian phản hồi" cho latency, "Pager duty"; "Nhiệt độ", "Tham số", "Thư viện", "Tiêu đề"… | Bỏ alias sai; đặt `autolink: never` cho từ phổ thông |
| File rác | 6 script `*.mjs` ở gốc repo (lô se) | Xóa |

## Thay đổi ngoài nội dung
- Test coverage và meta-pack đã gắn cứng số liệu tài chính từ thời có 31 khái niệm. Giờ chúng suy ra kỳ vọng từ dữ liệu: coverage đếm theo domain chính, meta-pack so với `requires` trong `pack.json`. Logic được kiểm giữ nguyên.
- Fixture của test taxonomy-extension đổi nhãn khỏi "MQTT" để không va chạm với khái niệm `mqtt` thật.

## Kết quả cổng (trên `master`, 325 khái niệm)
| Kiểm tra | Kết quả |
|---|---|
| `tb validate --strict` | ✔ 0 lỗi, 0 cảnh báo |
| `tb report collisions` | ✔ mọi homonym có qualifier và confusable hai chiều (token, margin, lead) |
| `tb check overlap` (8 / 6 từ, 313 văn bản nguồn) | ✔ / chỉ còn "must have should have could have" (tên phương pháp) |
| vitest | 155/155 |
| `claude plugin test packages/claude-mod` | 17/17 |
| `check:deterministic` | ✔ 1312 file |
| `bench:check` (1k) | ✔ |
| site build | 653 trang |
| Gói starter | 740 KB (giới hạn 1 MB) |

## Còn mở
- Vẫn là `draft` toàn bộ: người duyệt trong `config/reviewers.yaml` cần duyệt trước khi nâng trạng thái. Nên ưu tiên duyệt 100% homonym và các khái niệm tài chính/pháp lý viện dẫn văn bản Việt Nam (Nghị định 52/2024, Thông tư 04/2022/TT-NHNN, Điều 25 Luật SHTT).
- Gói starter đã 740 KB. Đợt sau cần xem lại tiêu chí chọn khái niệm cho starter (D6) trước khi vượt 1 MB.
- Ngân sách 10 ms của MCP ở 10.000 khái niệm vẫn chưa đạt (đã báo từ WP6).
- `uk-govs` và `gov-uk` là hai ref của cùng một nhà xuất bản (do hai lô thêm song song). Hai ref này vô hại nhưng có thể gộp sau.
