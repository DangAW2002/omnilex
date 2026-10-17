---
label: Failover
aliases:
  - Chuyển đổi dự phòng
  - Chuyển giao dự phòng
loanwords:
  - failover
plain_descriptions:
  - tự động chuyển quyền xử lý sang máy chủ phụ khi máy chủ chính gặp sự cố
  - quy trình bàn giao lưu lượng sang nút dự phòng mà người dùng không nhận ra
summary: Quy trình vận hành tự động hoặc thủ công chuyển tiếp toàn bộ tác vụ xử lý và lưu lượng sang một hệ thống dự phòng đang ở trạng thái sẵn sàng ngay khi hệ thống chính gặp lỗi.
confusable_notes: {}
follow_up_questions:
  - Hiện tượng "phân rã não bộ" (split-brain) xuất hiện trong quá trình chuyển đổi dự phòng ra sao và cơ chế túc số (quorum) ngăn chặn nó như thế nào?
  - Cơ chế dự phòng nóng (hot standby) khác gì so với dự phòng ấm (warm standby) về tốc độ chuyển giao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như máy phát điện dự phòng tại bệnh viện: ngay khi lưới điện thành phố bị cúp, bộ chuyển mạch tự động lập tức khởi động máy nổ để duy trì nguồn điện liên tục cho phòng mổ.

## Chi tiết
Chuyển đổi dự phòng (failover) đảm bảo tính liên tục của dịch vụ bằng cách bàn giao công việc sang máy chủ phụ khi máy chủ chính ngừng phản hồi. Trong một cụm cơ sở dữ liệu, các dịch vụ giám sát liên tục gửi tín hiệu nhịp tim (heartbeat); nếu máy chủ chính mất tín hiệu quá thời hạn quy định, thuật toán đồng thuận sẽ nâng cấp máy chủ phụ lên làm máy chủ ghi chính. Bộ định tuyến DNS hoặc địa chỉ IP ảo sẽ chuyển hướng truy cập trong vài giây. Các hệ thống phải dùng cơ chế túc số để tránh hiện tượng cả hai máy cùng tưởng mình là nút chính.

## Định nghĩa chuyên ngành
Quy trình khôi phục lỗi chuyển đổi điểm cuối kết nối và quyền xử lý từ thành phần gặp sự cố sang hệ thống dự phòng dựa trên các chỉ báo kiểm tra sức khỏe đã xác thực.

## Ví dụ
Máy chủ cơ sở dữ liệu chính bị sự cố phần cứng đột ngột, cụm điều phối tự động chỉ định máy chủ dự phòng nóng lên làm máy chủ chính chỉ trong vòng 15 giây mà không làm mất dữ liệu.
