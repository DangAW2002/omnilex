---
label: Circuit breaker
qualifier: (Phần mềm)
aliases:
  - Bộ ngắt mạch
  - Mẫu ngắt mạch
loanwords:
  - circuit breaker
plain_descriptions:
  - cầu dao tự động ngắt kết nối tới dịch vụ đang hỏng để cứu cả hệ thống
  - cơ chế phản hồi lỗi tức thì khi máy chủ phía sau ngừng tiếp nhận tín hiệu
summary: Mẫu thiết kế ngăn chặn ứng dụng liên tục gọi một dịch vụ đang gặp sự cố, tự động ngắt mạch để trả về phản hồi lỗi ngay lập tức và tự hồi phục khi đối tác khỏe lại.
confusable_notes: {}
follow_up_questions:
  - Trạng thái bán mở (half-open) làm thế nào để thăm dò và khôi phục mạch một cách an toàn?
  - Những chỉ số đo lường nào phù hợp nhất để kích hoạt chuyển trạng thái ngắt mạch?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như chiếc aptomat ngắt điện trong gia đình: khi đường dây bị chập hoặc quá tải nhiệt, cầu dao tự động ngắt ngay lập tức để bảo vệ các thiết bị điện và chống cháy nổ.

## Chi tiết
Khi một dịch vụ từ xa bị treo hoặc phản hồi chậm, các luồng xử lý của ứng dụng gọi tới sẽ bị giữ lại chờ đợi thời gian quá hạn, làm cạn kiệt luồng và gây sập lan truyền toàn hệ thống. Mẫu circuit breaker theo dõi tỷ lệ lỗi trong một khung thời gian trượt. Ở trạng thái Đóng (Closed), lệnh đi qua bình thường. Khi tỷ lệ thất bại vượt ngưỡng (như 50%), mạch chuyển sang Mở (Open), chặn đứng các lệnh tiếp theo và trả về phản hồi thay thế ngay. Sau một thời gian chờ, mạch chuyển sang Bán mở (Half-Open) để thử nghiệm vài cuộc gọi thăm dò.

## Định nghĩa chuyên ngành
Máy trạng thái quản lý độ chịu lỗi bao bọc các thao tác gọi mạng, theo dõi tần suất lỗi nhằm nhanh chóng giảm tải cho dịch vụ kiệt sức và duy trì hoạt động tối thiểu.

## Ví dụ
Hệ thống thanh toán gặp tỷ lệ lỗi 60% khi gọi sang đối tác tính phí vận chuyển ngoài, lập tức ngắt mạch và áp dụng mức phí đồng giá tạm thời cho 800 khách mua hàng.
