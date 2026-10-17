---
label: "HTTPS"
aliases:
  - "Hypertext Transfer Protocol Secure"
loanwords:
  - "HTTPS"
  - "Hypertext Transfer Protocol Secure"
autolink:
  label: always
plain_descriptions:
  - "kết nối web được mã hóa giúp bảo vệ thông tin không bị xem trộm"
  - "phiên bản an toàn của HTTP với biểu tượng ổ khóa trên thanh địa chỉ"
summary: "Phiên bản bảo mật của giao thức HTTP sử dụng mã hóa TLS để bảo vệ toàn bộ dữ liệu truyền giữa trình duyệt và máy chủ."
confusable_notes:
  http: "HTTP truyền tin ở dạng văn bản thuần, còn HTTPS mã hóa toàn bộ dữ liệu để chống nghe lén, giả mạo và giả danh."
follow_up_questions:
  - "Quá trình xác thực chứng chỉ TLS ngăn chặn tấn công giả mạo (Man-in-the-Middle) ra sao?"
  - "HTTPS có bảo vệ được dữ liệu nếu máy chủ bị xâm nhập trực tiếp hay không?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Nếu HTTP giống như gửi bưu thiếp mở thì HTTPS đặt lá thư đó vào trong một chiếc hộp sắt có khóa số bảo mật, chỉ người nhận đích thực mới mở được.

## Chi tiết
HTTPS thiết lập kênh bảo mật bằng giao thức TLS trước khi trao đổi bất kỳ dữ liệu HTTP nào. Trong quá trình bắt tay (handshake), máy chủ gửi chứng chỉ số do tổ chức cấp chứng chỉ (CA) uy tín ký để chứng minh danh tính. Hai bên thỏa thuận thuật toán mã hóa và tạo khóa phiên đối xứng. Sau khi hoàn tất, toàn bộ đường dẫn, cookie, mã phiên và nội dung gửi đi đều được giữ kín và chống sửa đổi trái phép.

## Định nghĩa chuyên ngành
Giao thức truyền tải siêu văn bản được bọc trong một phiên mã hóa TLS, mặc định hoạt động qua cổng TCP 443.

## Ví dụ
Khi người dùng nhập mật khẩu vào cổng thanh toán ngân hàng, kết nối HTTPS biến chuỗi thông tin thành chuỗi mã hóa phức tạp khiến kẻ xấu cùng mạng Wi-Fi không thể đọc được.
