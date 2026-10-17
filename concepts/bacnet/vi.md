---
label: "BACnet"
aliases:
  - "Building Automation and Control Networks"
loanwords:
  - "bacnet"
autolink:
  label: always
plain_descriptions:
  - "giao thức truyền thông chuẩn mở dành riêng cho hệ thống tự động hóa tòa nhà"
  - "chuẩn kết nối giúp điều hòa, chiếu sáng và báo cháy của các hãng khác nhau nói chuyện được với nhau"
summary: "Giao thức truyền thông chuẩn mở chuyên dụng cho các hệ thống điều khiển tự động hóa tòa nhà, đảm bảo khả năng tương thích giữa các thiết bị điều hòa, chiếu sáng và an ninh của nhiều nhà sản xuất."
confusable_notes:
  can-bus: "BACnet là chuẩn truyền thông tầng ứng dụng cho tự động hóa hạ tầng tòa nhà (điều hòa, chiếu sáng, thang máy), trong khi CAN bus là bus vật lý nối tiếp cấp thấp cho động cơ ô tô và bo mạch máy móc công nghiệp."
follow_up_questions:
  - "Chuẩn BACnet/SC (Secure Connect) bảo mật đường truyền qua giao thức WebSocket và mã hóa TLS như thế nào?"
  - "Mô hình đối tượng và thuộc tính trong BACnet giúp chuẩn hóa việc điều khiển các cụm máy lạnh trung tâm ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một người phiên dịch đa năng trong một tòa nhà văn phòng hiện đại, giúp hệ thống điều hòa của hãng này, đèn chiếu sáng của hãng khác và hệ thống cảm biến nhiệt của hãng thứ ba hiểu được nhau để tự động bật tắt tiết kiệm điện.

## Chi tiết
Được phát triển bởi hiệp hội ASHRAE và chuẩn hóa quốc tế theo ISO 16484-5, BACnet mô hình hóa các thiết bị vật lý trong công trình thành các đối tượng trừu tượng (như Đầu vào Tương tự, Đầu ra Nhị phân, Lịch trình vận hành). Các thiết bị trao đổi trạng thái và nhận lệnh thông qua các dịch vụ chuẩn như ReadProperty và WriteProperty. Giao thức hỗ trợ linh hoạt nhiều tầng vật lý khác nhau, từ mạng cáp xoắn RS-485 (BACnet MS/TP), mạng cục bộ Ethernet (BACnet/IP) cho đến kết nối đám mây mã hóa TLS (BACnet/SC).

## Định nghĩa chuyên ngành
Giao thức truyền thông mở và quy chuẩn đối tượng ngữ nghĩa chuẩn hóa bởi ASHRAE phục vụ liên kết và điều khiển tự động hóa các phân hệ cơ điện trong công trình xây dựng.

## Ví dụ
Một tòa nhà trung tâm thương mại cao ba mươi tầng kết nối tám trăm bộ điều khiển van gió VAV và hệ thống máy lạnh trung tâm qua mạng BACnet/IP để tự động điều chỉnh nhiệt độ theo lượng khách ra vào.
