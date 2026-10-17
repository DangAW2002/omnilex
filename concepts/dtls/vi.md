---
label: "DTLS"
aliases:
  - "Datagram Transport Layer Security"
  - "Bảo mật tầng truyền vận datagram"
loanwords:
  - "dtls"
autolink:
  label: always
plain_descriptions:
  - "giao thức mã hóa an toàn dành cho truyền tải dữ liệu dạng gói tin udp"
  - "chuẩn bảo mật cung cấp xác thực và chống nghe lén cho các gói tin mạng không kết nối"
summary: "Giao thức mật mã xây dựng dựa trên TLS, cung cấp tính bảo mật, toàn vẹn dữ liệu và xác thực danh tính cho các luồng truyền thông dựa trên gói tin datagram như UDP."
confusable_notes:
  tls: "TLS bắt buộc phải chạy trên luồng dữ liệu TCP đáng tin cậy và theo đúng thứ tự, trong khi DTLS bổ sung cơ chế đánh số gói, bộ hẹn giờ gửi lại và chống phát lại gói tin để bảo vệ các kết nối UDP không đảm bảo thứ tự."
follow_up_questions:
  - "DTLS xử lý tình trạng gói tin bắt tay bị đảo thứ tự hoặc thất lạc như thế nào?"
  - "Tại sao các ứng dụng IoT chạy pin và truyền phát âm thanh trực tiếp lại ưa chuộng DTLS hơn TLS truyền thống?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc bọc một lá thư gửi bằng bưu thiếp qua đường bưu điện vào một chiếc phong bì niêm phong mật mã đặc biệt: dù các tấm bưu thiếp có thể đến trước, đến sau hoặc bị thất lạc, nội dung bên trong vẫn được giữ bí mật và không thể bị sửa trộm.

## Chi tiết
Được chuẩn hóa bởi IETF trong RFC 9147 (phiên bản DTLS 1.3), DTLS kế thừa toàn bộ sức mạnh bảo mật của TLS để áp dụng cho các giao thức không tạo liên kết hướng luồng như UDP. Do mạng UDP không có cơ chế sửa lỗi thất lạc gói hay sắp xếp tuần tự, DTLS bổ sung trường số thứ tự rõ ràng vào thông điệp bắt tay, có cơ chế ghép mảnh và bộ định thời gửi lại. Ngoài ra, giao thức còn tích hợp trao đổi cookie phi trạng thái để ngăn chặn các cuộc tấn công từ chối dịch vụ (DoS) mạo danh địa chỉ IP.

## Định nghĩa chuyên ngành
Giao thức mật mã tầng giao vận cung cấp khả năng bảo vệ tính bí mật, xác thực hai chiều và toàn vẹn dữ liệu cho các luồng truyền thông datagram phi kết nối.

## Ví dụ
Cảm biến vị trí đỗ xe thông minh sử dụng DTLS trên nền giao thức CoAP/UDP để mã hóa dữ liệu báo chỗ trống gửi về máy chủ trung tâm điều hành giao thông thành phố.
