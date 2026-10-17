# Báo cáo WP8, wave 3: mở rộng IT và IoT (323 khái niệm)

Trạng thái: **đã commit và merge vào `master`** (tag `wave3-checkpoint-648`). Mọi khái niệm vẫn là `status: draft`, `provenance.drafted_by: ai`; chưa khái niệm nào được nâng trạng thái.

## Tóm tắt
Wave 3 đưa kho từ 325 lên **648 khái niệm**, tập trung vào IT và IoT: Kafka, Spark, Redis, CRM, ERP, Kubernetes, OAuth, MLOps, ESP32, LoRa, Zigbee, OPC UA… Quy trình giữ như wave 2: danh sách từ khóa chủ được kiểm trùng trước ([candidates/wave3/](../../../candidates/wave3/)), agy soạn theo 11 lô (mỗi lô một worktree và một nhánh), orchestrator kiểm chứng độc lập từng lô rồi mới merge. Lần này agy chạy bằng Gemini 3.8 Flash (Medium), mỗi đợt 3 lô để không cạn quota giữa chừng.

| Lĩnh vực | Trước | Sau | Theo nhánh cấp 2 (sau) |
|---|---|---|---|
| it | 155 | 420 | ai-ml 85, software-engineering 81, devops 61, web 49, data 48, security 43, infrastructure 37, business-systems 16 |
| iot | 25 | 83 | devices-sensors 28, connectivity-protocols 20, industrial 16, edge-cloud 11, applications 8 |
| finance, media, product | 145 | 145 | không đổi |

Nhánh taxonomy mới: `it/business-systems` (enterprise-apps, automation), `iot/applications`.

## Lỗi bắt được khi kiểm chứng
| Loại | Ví dụ | Xử lý |
|---|---|---|
| Bằng chứng nhãn vi sai | URL tìm kiếm Viblo thay cho trang thật; trang W3C không có bản tiếng Việt; Wikipedia không chứa "nền tảng thương mại điện tử"; 3 URL VietNamNet không tồn tại (404, có vẻ bịa) | Thay bằng trang thật chứa đúng nhãn (datapot.vn, ocd.vn, lsvn.vn, vlink.asia, Viblo); bỏ ref `vietnamnet` không còn dùng |
| Nhãn vi tự đặt | "Viễn thông tin học" cho telematics, kèm 2 alias không có nguồn | Dùng từ mượn "Telematics", bỏ alias |
| Sai dữ kiện | SPI 40 MHz đẩy màn 320×240 ở 60 khung/giây (cần ~74 Mbps); "ResNet 50 convolutional layers"; trích dẫn ITU-T Y.4471 cho V2X không kiểm được | Sửa thành ~30 khung/giây, "ResNet-50 … 50 layers"; bỏ trích dẫn |
| Thiếu qualifier đã lên kế hoạch | Classification, Regression, Clustering | Thêm (ML) / (Học máy) |

## Tích hợp
- Homonym: LoRa (IoT) ↔ LoRA (AI) và Thread (Lập trình) ↔ Thread (IoT), confusable hai chiều kèm ghi chú phân biệt.
- Kiểm overlap toàn cục trên 651 văn bản nguồn của cả 11 lô: sạch ở 8 từ; ở 6 từ chỉ còn cụm sáo ngữ trùng ngẫu nhiên (dãy Fibonacci của story point, tên mức MoSCoW, "at a specific point in time").
- Script kiểm chứng giờ coi nhãn viết tắt có trong `loanwords` (CRM, ERP, POS…) là từ mượn.

## Gói starter
Gói starter giờ chạm trần 1 MB (984 KB): `selectStarter` chỉ giữ được 163/182 khái niệm level 1. Test T-I6 đã sửa theo đúng quy tắc: lấy hết level 1 (tối đa 300), trừ khi trần 1 MB cắt trước, và khi bị cắt thì gói phải sát trần. **Cần quyết định D6**: nên chọn starter theo tiêu chí gì khi số khái niệm level 1 vượt dung lượng (ưu tiên lĩnh vực, độ phổ biến, hay rút gọn cards).

## Kết quả cổng (trên `master`, 648 khái niệm)
| Kiểm tra | Kết quả |
|---|---|
| `tb validate --strict` | ✔ 0 lỗi, 0 cảnh báo |
| `tb report collisions` | ✔ mọi homonym có qualifier và confusable hai chiều |
| `tb check overlap` (8 từ, 651 văn bản nguồn) | ✔ |
| vitest | 155/155 |
| `claude plugin test packages/claude-mod` | 17/17 |
| `check:deterministic` | ✔ 2295 file |
| `bench:check` (1k) | ✔ |
| site build | 1299 trang |

## Còn mở
- Toàn bộ vẫn là `draft`, cần người duyệt trước khi nâng trạng thái. Nên ưu tiên duyệt các homonym và nhãn vi chỉ có bằng chứng bậc D (blog/cộng đồng).
- Tiêu chí starter (D6), như mục trên.
- Ngân sách 10 ms của MCP ở 10.000 khái niệm vẫn chưa đạt (đã báo từ WP6).
