---
label: SAML
aliases:
  - Security Assertion Markup Language
loanwords:
  - saml
autolink:
  label: always
  aliases:
    Security Assertion Markup Language: auto
plain_descriptions:
  - chuẩn định dạng XML để chuyển dữ liệu đăng nhập giữa hệ thống định danh và trang web
  - giao thức đăng nhập một lần cho doanh nghiệp dùng các xác nhận bảo mật có chữ ký số
summary: Chuẩn mở dựa trên XML để trao đổi dữ liệu xác thực và phân quyền giữa nhà cung cấp định danh và nhà cung cấp dịch vụ.
confusable_notes:
  openid-connect: SAML là chuẩn liên minh định danh dựa trên định dạng XML phổ biến trong doanh nghiệp truyền thống; OpenID Connect dựa trên REST/JSON xây dựng trên OAuth 2.0 phù hợp hơn cho ứng dụng di động và web hiện đại.
follow_up_questions:
  - Luồng đăng nhập do nhà cung cấp định danh khởi tạo khác gì so với luồng do nhà cung cấp dịch vụ khởi tạo trong SAML?
  - Biện pháp kỹ thuật nào giúp ngăn chặn tấn công bao bọc chữ ký XML (XML signature wrapping) trong các bản tin SAML?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một bức thư công tác có công chứng: khi nhân viên đến làm việc với đối tác, họ xuất trình bức thư có đóng dấu niêm phong của công ty chủ quản để xác nhận danh tính và quyền hạn, giúp bên đối tác tin tưởng ngay mà không cần gọi điện kiểm tra lại.

## Chi tiết
SAML (phổ biến nhất là phiên bản 2.0) xác định ba vai trò chính: chủ thể người dùng, Nhà cung cấp định danh (IdP), và Nhà cung cấp dịch vụ (SP). Giao thức này trao đổi các gói tin XML chứa các xác nhận (assertion) về phiên xác thực, các thuộc tính người dùng và quyết định phân quyền. Các assertion này được ký điện tử bằng mật mã khóa công khai để chống giả mạo danh tính. Nhờ tính hoàn thiện cao và khả năng truyền tải thuộc tính chi tiết, SAML là chuẩn mực phổ biến trong hạ tầng đăng nhập một lần của khối cơ quan chính phủ và doanh nghiệp lớn.

## Định nghĩa chuyên ngành
Khuôn khổ XML dùng trong quản lý định danh liên kết, quy định các giao thức, liên kết truyền thông và hồ sơ cấu hình để truyền tải các xác nhận bảo mật giữa các miền quản trị độc lập.

## Ví dụ
Sinh viên đại học truy cập cổng tài liệu khoa học trực tuyến bên ngoài; hệ thống chuyển hướng sinh viên về trang đăng nhập của trường để xác minh tư cách sinh viên qua gói tin SAML trước khi mở quyền tải bài báo.
