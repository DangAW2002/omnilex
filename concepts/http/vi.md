---
label: "Hypertext Transfer Protocol (HTTP)"
aliases:
  - "HTTP"
loanwords:
  - "Hypertext Transfer Protocol (HTTP)"
  - "HTTP"
autolink:
  aliases:
    HTTP: always
plain_descriptions:
  - "quy tắc giao tiếp để trình duyệt và máy chủ trao đổi trang web"
  - "giao thức truyền tải yêu cầu và dữ liệu phản hồi trên mạng internet"
summary: "Giao thức tầng ứng dụng dùng để truyền tải các tài liệu siêu văn bản giữa trình duyệt và máy chủ web."
confusable_notes:
  https: "HTTP truyền văn bản thuần không mã hóa, trong khi HTTPS bọc luồng dữ liệu HTTP bên trong lớp mã hóa TLS để bảo mật."
follow_up_questions:
  - "HTTP/2 khác biệt gì so với HTTP/1.1 trong việc dồn kênh yêu cầu?"
  - "Vì sao HTTP truyền thống lại tiềm ẩn rủi ro lộ dữ liệu trên mạng công cộng?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy hình dung HTTP giống như việc gửi bưu thiếp qua bưu điện: người gửi viết rõ yêu cầu lên bưu thiếp, người nhận đọc và gửi thư hồi đáp, nhưng bất kỳ ai trên đường vận chuyển đều có thể nhìn thấy nội dung.

## Chi tiết
HTTP hoạt động theo mô hình yêu cầu - phản hồi (request - response) giữa máy khách và máy chủ qua kết nối TCP/IP. Trình duyệt gửi yêu cầu bao gồm phương thức hành động (như GET, POST), đường dẫn URL, các trường tiêu đề và phần thân nếu có. Máy chủ xử lý và trả về mã trạng thái cùng nội dung được yêu cầu. Các phiên bản mới hơn như HTTP/2 và HTTP/3 bổ sung khả năng đa luồng trên một kết nối mà vẫn giữ nguyên ngữ nghĩa cơ bản.

## Định nghĩa chuyên ngành
Giao thức truyền thông phi trạng thái ở tầng ứng dụng, phục vụ trao đổi tài liệu siêu văn bản trong các hệ thống thông tin phân tán.

## Ví dụ
Trình duyệt gửi yêu cầu GET /index.html với các tiêu đề chuẩn, máy chủ phản hồi với mã trạng thái 200 OK và trả về gói nội dung HTML dung lượng 45 kilobyte.
