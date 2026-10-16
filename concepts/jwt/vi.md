---
label: JSON Web Token (JWT)
aliases:
  - JWT
loanwords:
  - jwt
autolink:
  aliases:
    JWT: always
plain_descriptions:
  - chuỗi ký tự nhỏ gọn có chữ ký số dùng để chứng minh danh tính khi gọi API
  - mã xác thực gồm ba phần nối nhau bằng dấu chấm mang theo thông tin đăng nhập của người dùng
summary: Phương thức biểu diễn quyền truy cập dạng chuỗi văn bản nhỏ gọn, an toàn trên URL và được bảo vệ bằng chữ ký số.
confusable_notes: {}
follow_up_questions:
  - Tại sao không bao giờ được lưu các dữ liệu cá nhân nhạy cảm bên trong phần thân (payload) của token JWT thông thường?
  - Làm thế nào để hệ thống thu hồi sớm một token JWT khi phát hiện bị lộ trước khi nó tự hết hạn?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như chiếc vòng đeo tay sự kiện có đóng dấu chìm: bảo vệ ở từng cổng vào chỉ cần liếc nhìn con dấu hợp lệ là cho qua ngay, không cần gọi điện hỏi lại ban tổ chức.

## Chi tiết
Chuỗi JWT gồm ba phần mã hóa base64 nối với nhau bằng dấu chấm: Header (thuật toán mã hóa), Payload (thông tin người dùng và hạn sử dụng) và Signature (chữ ký số). Máy chủ có thể kiểm tra tính hợp lệ của chữ ký mà không cần truy vấn lại cơ sở dữ liệu.

## Định nghĩa chuyên ngành
Chuẩn định dạng mã thông báo bảo mật được định nghĩa theo RFC 7519, cho phép truyền tải các yêu cầu dữ liệu JSON có thể xác minh tính toàn vẹn bằng chữ ký mật mã.

## Ví dụ
Đính kèm mã `Bearer eyJhbG...` vào tiêu đề Authorization của mỗi yêu cầu gửi từ ứng dụng di động tới máy chủ backend.
