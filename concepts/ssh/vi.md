---
label: Secure Shell (SSH)
aliases:
  - SSH
autolink:
  aliases:
    SSH: always
loanwords:
  - secure shell (ssh)
plain_descriptions:
  - công cụ đăng nhập và điều khiển máy chủ từ xa an toàn qua mạng mã hóa
  - kết nối dòng lệnh từ xa bảo mật thay thế cho giao thức Telnet không mã hóa
summary: Giao thức mạng mật mã dùng để vận hành các dịch vụ mạng an toàn trên môi trường mạng không tin cậy, phổ biến nhất để đăng nhập dòng lệnh từ xa.
confusable_notes: {}
follow_up_questions:
  - Cơ chế xác thực bằng cặp khóa công khai - khóa riêng tư (SSH key pair) an toàn hơn mật khẩu như thế nào?
  - Kỹ thuật chuyển tiếp cổng (SSH tunneling) giúp truy cập an toàn các dịch vụ cơ sở dữ liệu nội bộ ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc đi trong một chiếc xe bọc thép có kính đen chống nhìn trộm giữa phố đông người: bạn và máy chủ từ xa trao đổi thông tin bí mật mà không ai bên ngoài nhìn thấy hay nghe lén được.

## Chi tiết
SSH thay thế hoàn toàn các giao thức cũ không an toàn như Telnet bằng cách mã hóa toàn bộ phiên làm việc, từ mật khẩu đăng nhập đến từng ký tự gõ lệnh trên bàn phím. Mặc định hoạt động trên cổng TCP 22, SSH sử dụng các thuật toán mã hóa khóa bất đối xứng hiện đại (như Ed25519 hay RSA) để xác thực danh tính người dùng và máy chủ mà không bao giờ để lộ mật mã trên đường truyền.

## Định nghĩa chuyên ngành
Bộ giao thức mạng an toàn được định nghĩa trong RFC 4251 đến RFC 4254, cung cấp lớp truyền vận mã hóa mạnh mẽ, cơ chế xác thực đa dạng và khả năng ghép kênh nhiều phiên dòng lệnh hoặc truyền tệp (SFTP) trên cùng một kết nối.

## Ví dụ
Một kỹ sư vận hành gõ lệnh `ssh -i mykey.pem admin@198.51.100.5` trên máy tính cá nhân để mở màn hình dòng lệnh tương tác trên máy chủ đám mây và cập nhật cấu hình dịch vụ một cách bảo mật.
