---
label: MQTT
aliases: []
loanwords:
  - "mqtt"
autolink:
  label: always
plain_descriptions:
  - giao thức nhắn tin siêu nhẹ trung chuyển dữ liệu giữa cảm biến và máy chủ qua broker
  - chuẩn truyền tin theo cơ chế xuất bản và đăng ký qua mạng tcp cho thiết bị iot
summary: Giao thức truyền thông điệp gọn nhẹ theo mô hình xuất bản - đăng ký trên nền TCP, được tối ưu cho các thiết bị phần cứng hạn chế và mạng có độ trễ cao.
confusable_notes:
  coap: MQTT sử dụng mô hình phát hành/đăng ký thông qua máy chủ trung gian broker trên luồng TCP bền bỉ, còn CoAP triển khai mô hình RESTful dạng yêu cầu/phản hồi trực tiếp trên nền UDP không trạng thái.
follow_up_questions:
  - Sự khác nhau về mặt vận hành giữa ba mức chất lượng dịch vụ QoS 0, 1 và 2 trong MQTT là gì?
  - Tính năng Last Will and Testament (LWT) hỗ trợ phát hiện sự cố thiết bị mất kết nối đột ngột ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
MQTT hoạt động như một bảng tin công cộng: thay vì từng cảm biến phải gọi điện trực tiếp cho từng máy tính, cảm biến chỉ cần dán mẩu tin ngắn lên một trạm trung tâm (broker) theo chuyên mục nhất định, và bất kỳ ai đăng ký theo dõi chuyên mục đó sẽ nhận được ngay.

## Chi tiết
Nhờ phần tiêu đề gói tin chỉ từ 2 byte, MQTT tiết kiệm băng thông tối đa so với giao thức HTTP truyền thống. Các nút cảm biến (client) duy trì kết nối TCP với máy chủ trung gian (broker) và gửi dữ liệu lên các chủ đề phân cấp (topic). Giao thức cung cấp ba mức tin cậy: QoS 0 (gửi tối đa một lần, không cam kết), QoS 1 (gửi ít nhất một lần, có xác nhận phản hồi) và QoS 2 (đảm bảo đúng một lần duy nhất qua cơ chế bắt tay 4 bước). Phiên bản MQTT v5 còn hỗ trợ thêm tính năng hết hạn thông điệp và chia sẻ thuê bao.

## Định nghĩa chuyên ngành
Giao thức truyền thông điệp mở theo mô hình xuất bản - đăng ký chạy trên nền TCP/IP, được chuẩn hóa bởi OASIS nhằm tối ưu hóa việc truyền dữ liệu đo lường từ xa trong điều kiện tài nguyên hạn hẹp.

## Ví dụ
Đồng hồ điện tử thông minh trong chung cư định kỳ 10 giây một lần gửi thông số tiêu thụ điện lên broker MQTT theo chủ đề meter/p01/voltage với cam kết QoS 1.
