---
label: LoRaWAN
aliases: []
loanwords:
  - "lorawan"
plain_descriptions:
  - công nghệ sóng vô tuyến truyền dữ liệu xa hàng chục cây số mà không tốn pin
  - chuẩn mạng diện rộng năng lượng thấp kết nối cảm biến ngoài trời không cần sim 4g
summary: Giao thức mạng diện rộng công suất thấp (LPWAN) cho phép các thiết bị cảm biến chạy pin truyền dữ liệu tầm xa trên các dải tần vô tuyến không cần cấp phép.
confusable_notes:
  nb-iot: LoRaWAN sử dụng băng tần vô tuyến dưới 1 GHz miễn cấp phép với các trạm gateway do người dùng tự dựng hoặc qua mạng cộng đồng, trong khi NB-IoT chạy trực tiếp trên các dải sóng di động được cấp phép của nhà mạng viễn thông.
follow_up_questions:
  - Ba lớp thiết bị Class A, Class B và Class C trong LoRaWAN khác nhau thế nào về khả năng nhận lệnh từ máy chủ?
  - Thuật toán điều chỉnh tốc độ dữ liệu thích ứng (ADR) giúp kéo dài tuổi thọ pin của cảm biến ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
LoRaWAN hoạt động như một chiếc bộ đàm tầm xa siêu tiết kiệm pin dành cho máy móc: nó giúp cảm biến đo mực nước lũ ở tít trên đồi xa hàng chục cây số vẫn bắn được tín hiệu báo động về trạm thu mà không cần cắm điện hay lắp SIM điện thoại.

## Chi tiết
Do Liên minh LoRa (LoRa Alliance) phát triển, LoRaWAN khai thác công nghệ điều chế xung LoRa trên các dải tần dưới 1 GHz (như 920-925 MHz tại Việt Nam). Mạng lưới triển khai theo cấu trúc hình sao lồng nhau (star-of-stars): các trạm gateway thu sóng từ cảm biến rồi chuyển tiếp qua mạng Internet về máy chủ mạng trung tâm (Network Server). Dữ liệu được bảo mật hai lớp bằng thuật toán mã hóa AES-128, phân tách độc lập giữa khóa xác thực đường truyền và khóa nội dung ứng dụng.

## Định nghĩa chuyên ngành
Giao thức điều khiển truy cập môi trường (MAC) tầng mạng diện rộng công suất thấp, cung cấp khả năng truyền thông hai chiều an toàn cho các thiết bị di động và cố định qua cự ly nhiều kilomet.

## Ví dụ
Hệ thống quan trắc độ ẩm đất và lượng mưa tại nông trường cà phê Lâm Đồng sử dụng cảm biến LoRaWAN truyền dữ liệu về trạm thu trên đồi cách đó sáu cây số.
