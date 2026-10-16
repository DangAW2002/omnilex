---
label: Token
qualifier: (Xác thực)
aliases: [mã xác thực, access token]
loanwords: [bearer token]
plain_descriptions:
  - chuỗi ký tự chứng minh đã đăng nhập
  - vé vào cổng kỹ thuật số khi gọi API
summary: Chuỗi mã hóa gửi kèm theo mỗi yêu cầu để chứng minh danh tính và quyền hạn của người dùng hoặc ứng dụng.
confusable_notes:
  token-llm: Token của AI là đơn vị đếm từ vựng, không liên quan đến bảo mật hay đăng nhập.
  token-crypto: Token tiền mã hóa là tài sản số lưu trữ trên blockchain.
follow_up_questions:
  - Phân biệt Access Token và Refresh Token trong chuẩn OAuth 2.0?
  - Làm thế nào để lưu trữ token an toàn trên trình duyệt tránh tấn công XSS?
translation: native
---

## Giải thích dễ hiểu
Giống như chiếc vé điện tử quét mã vạch ở cổng khu vui chơi: bạn chỉ cần trình vé này ra ở mỗi trò chơi mà không cần phải chìa chứng minh thư mỗi lần.

## Chi tiết
Sau khi người dùng đăng nhập bằng mật khẩu, máy chủ cấp một token (như JSON Web Token - JWT). Client lưu trữ và gửi kèm token trong tiêu đề `Authorization` của các yêu cầu HTTP sau đó.

## Định nghĩa chuyên ngành
Chuỗi dữ liệu an toàn đại diện cho ngữ cảnh phiên làm việc hoặc quyền hạn được ủy quyền trong giao thức xác thực không lưu trạng thái (stateless authentication).

## Ví dụ
Chuỗi header HTTP: `Authorization: Bearer eyJhbGciOi...`
