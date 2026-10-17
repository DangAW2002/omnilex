---
label: Constrained Application Protocol (CoAP)
aliases:
  - "CoAP"
loanwords:
  - "constrained application protocol"
  - "coap"
autolink:
  aliases:
    CoAP: always
plain_descriptions:
  - giao thức truyền web tương tự http nhưng chạy trên udp siêu nhẹ cho vi mạch nhỏ
  - chuẩn giao tiếp dạng rest thu nhỏ dành riêng cho các mạng vô tuyến băng thông hẹp
summary: Giao thức truyền tải web dạng RESTful chạy trên nền UDP do IETF chuẩn hóa, chuyên dùng cho các vi điều khiển bị giới hạn bộ nhớ và mạng vô tuyến hay mất gói.
confusable_notes:
  mqtt: CoAP là giao thức dạng web REST trực tiếp giữa máy khách và máy chủ chạy trên UDP với các lệnh GET/POST, trong khi MQTT là hệ thống truyền tin qua máy chủ trung gian broker chạy trên nền kết nối TCP.
follow_up_questions:
  - CoAP đảm bảo gửi nhận tin cậy như thế nào mà không cần đến cơ chế bắt tay của TCP?
  - Giao thức bảo mật DTLS mã hóa dữ liệu CoAP trên nền UDP ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
CoAP giống như một phiên bản thu nhỏ siêu gọn gàng của trang web HTTP dành cho các con chip bé xíu: nó cho phép các cảm biến nhỏ gửi và lấy dữ liệu bằng các lệnh quen thuộc như GET và POST qua các gói tin UDP chớp nhoáng mà không cần duy trì kết nối liên tục.

## Chi tiết
Được định nghĩa trong chuẩn RFC 7252, CoAP tối ưu hóa mô hình REST thông qua việc nhị phân hóa phần tiêu đề cố định chỉ 4 byte trên nền UDP. Giao thức hỗ trợ hai cơ chế gửi: thông điệp cần xác nhận (Confirmable - CON) đòi hỏi gói phản hồi ACK để chống mất gói, và thông điệp không cần xác nhận (Non-confirmable - NON) cho các tín hiệu cập nhật liên tục. CoAP còn tích hợp cơ chế quan sát tài nguyên (Observe) giúp máy khách nhận dữ liệu đẩy từ máy chủ mà không cần thăm dò liên tục.

## Định nghĩa chuyên ngành
Giao thức truyền tải web tầng ứng dụng theo kiến trúc REST do IETF ban hành, được tối ưu hóa cho các nút mạng phần cứng hạn chế thông qua định dạng nhị phân trên giao vận UDP.

## Ví dụ
Cảm biến đỗ xe thông minh chôn dưới lòng đường gửi gói tin CoAP PUT qua mạng không dây về máy chủ trung tâm để thông báo trạng thái chỗ trống vừa có xe vào.
