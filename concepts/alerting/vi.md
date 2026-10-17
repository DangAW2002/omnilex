---
label: Alerting
aliases:
  - Hệ thống cảnh báo
loanwords:
  - alerting
plain_descriptions:
  - cơ chế tự động gửi tin nhắn hoặc gọi điện cho kỹ sư khi máy chủ gặp sự cố bất thường
  - tính năng theo dõi các chỉ số và phát tín hiệu báo động khi vượt qua ngưỡng an toàn
summary: >-
  Cơ chế tự động đối soát dữ liệu giám sát với các quy tắc định sẵn để gửi thông báo tức thời cho đội ngũ trực ban khi hệ thống phát sinh sự cố.
confusable_notes: {}
follow_up_questions:
  - "Vì sao cảnh báo nên tập trung vào mức độ ảnh hưởng của người dùng thay vì chỉ dựa trên các dấu hiệu nhỏ của từng máy chủ?"
  - "Cơ chế gộp và lọc cảnh báo trùng lặp giúp giảm thiểu tình trạng mệt mỏi vì chuông báo động của kỹ sư ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như thiết bị báo khói trong nhà: hễ phát hiện nồng độ khói vượt mức an toàn là nó lập tức hú còi và gửi tin nhắn cảnh báo tới chủ nhà ngay giữa đêm.

## Chi tiết
Hệ thống alerting liên tục kiểm tra các chuỗi số liệu giám sát và nhật ký hệ thống dựa trên các quy tắc toán học đã thiết lập từ trước. Khi một chỉ số vượt quá ngưỡng nguy hiểm trong khoảng thời gian nhất định (ví dụ tỷ lệ yêu cầu thất bại vượt 2% trong 5 phút), hệ thống sẽ tạo ra cảnh báo. Các bộ quản lý cảnh báo hiện đại có khả năng gộp các cảnh báo cùng nguồn, hoãn thông báo khi đang bảo trì định kỳ và gửi tin nhắn khẩn cấp tới ứng dụng của kỹ sư trực. Mục tiêu quan trọng nhất là chỉ kích hoạt chuông báo khi có sự cố thực sự đòi hỏi con người can thiệp.

## Định nghĩa chuyên ngành
Hệ thống đánh giá số liệu đo lường tự động phát tín hiệu cảnh báo có cấu trúc khi các chỉ số giám sát vi phạm ngưỡng quy định trong khoảng thời gian xác định.

## Ví dụ
Khi tỷ lệ lỗi giao dịch thanh toán trực tuyến vượt quá 3% trong 3 phút liên tiếp, hệ thống alerting lập tức kích hoạt tin nhắn khẩn cấp gửi tới điện thoại của kỹ sư trực ban.
