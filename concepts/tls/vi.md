---
label: Transport Layer Security (TLS)
aliases:
  - TLS
loanwords:
  - tls
autolink:
  aliases:
    TLS: always
plain_descriptions:
  - giao thức bảo mật tạo nên biểu tượng ổ khóa và chữ https trên thanh địa chỉ trình duyệt web
  - đường hầm liên lạc được mã hóa bảo vệ thông tin truyền trên mạng khỏi bị nghe lén hoặc sửa đổi
summary: Giao thức bảo mật mật mã học cung cấp tính riêng tư, toàn vẹn dữ liệu và xác thực danh tính cho các kết nối truyền thông qua mạng máy tính.
confusable_notes:
  dtls: "TLS cung cấp bảo mật mật mã trên các luồng byte TCP có kết nối và đảm bảo thứ tự, trong khi DTLS điều chỉnh TLS để bảo vệ các giao thức truyền tải dạng gói tin không kết nối như UDP."
follow_up_questions:
  - Chuẩn TLS 1.3 đã rút ngắn thời gian bắt tay xuống còn 1 vòng truyền nhận (1-RTT) so với TLS 1.2 như thế nào?
  - Vì sao tính năng bảo mật chuyển tiếp (forward secrecy) lại quan trọng để ngăn việc giải mã các gói tin bị ghi lại trong quá khứ?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như việc chuyển tiền và chứng từ bằng xe bọc thép chuyên dụng chạy thẳng giữa các chi nhánh ngân hàng: người đi đường không thể nhìn trộm hay tráo đổi đồ bên trong xe.

## Chi tiết
TLS (phiên bản nâng cấp kế thừa của chuẩn SSL cũ) hoạt động giữa tầng mạng và tầng ứng dụng. Trong quá trình bắt tay (TLS handshake), trình duyệt kiểm tra chứng chỉ số của máy chủ (do tổ chức CA uy tín cấp), thỏa thuận thuật toán mã hóa và tạo khóa chung để bảo vệ luồng dữ liệu.

## Định nghĩa chuyên ngành
Giao thức mật mã chuẩn hóa theo RFC 8446 cung cấp khả năng bảo mật truyền thông đầu cuối, xác thực thực thể và đảm bảo tính toàn vẹn thông điệp trên mạng Internet.

## Ví dụ
Bảo vệ phiên giao dịch thanh toán trực tuyến qua HTTPS để các điểm phát Wi-Fi công cộng không thể nhìn trộm mật khẩu và số thẻ ngân hàng của người dùng.
