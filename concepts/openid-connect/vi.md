---
label: OpenID Connect (OIDC)
aliases:
  - OIDC
loanwords:
  - openid connect (oidc)
autolink:
  aliases:
    OIDC: always
plain_descriptions:
  - tầng định danh xây trên OAuth giúp ứng dụng biết chính xác người đang đăng nhập là ai
  - đăng nhập vào trang web mới bằng tài khoản Google hoặc Apple sẵn có
summary: Giao thức định danh xây dựng trên nền OAuth 2.0 cho phép ứng dụng xác minh danh tính người dùng và lấy thông tin hồ sơ qua JSON Web Token.
confusable_notes:
  saml: OpenID Connect là lớp định danh nhẹ dựa trên JSON/REST xây dựng trên nền OAuth 2.0; SAML sử dụng tài liệu XML và cơ chế trao đổi nặng hơn trong các hệ thống SSO doanh nghiệp cũ.
follow_up_questions:
  - Những thông tin nhận dạng nào được chứa bên trong ID Token của luồng OIDC?
  - Endpoint UserInfo đóng vai trò bổ trợ dữ liệu như thế nào so với thông tin có sẵn trong ID Token?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như chiếc thẻ căn cước công dân gắn chip khi bạn làm thủ tục hành chính trực tuyến: nếu OAuth 2.0 giống như giấy ủy quyền cho phép đại lý nộp hồ sơ thay bạn, thì OpenID Connect chính là chiếc thẻ căn cước chứng minh rõ ràng họ tên và ngày sinh của bạn dưới định dạng điện tử tiêu chuẩn.

## Chi tiết
OpenID Connect (OIDC) mở rộng khuôn khổ phân quyền OAuth 2.0 bằng cách bổ sung thêm một tầng xác thực định danh. Trong khi OAuth 2.0 cốt lõi chỉ cấp access token để gọi tài nguyên mà không quy định người dùng thực sự là ai, OIDC giới thiệu thêm một JSON Web Token chuẩn hóa gọi là ID Token. Ứng dụng phía máy khách giải mã và xác minh chữ ký số của ID Token để biết chính xác danh tính người dùng, đọc các thuộc tính cơ bản (như email, mã định danh subject) và tự động cập nhật khóa công khai qua cơ chế khám phá chuẩn hóa (`/.well-known/openid-configuration`).

## Định nghĩa chuyên ngành
Giao thức và hồ sơ xác thực định danh vận hành trên nền tảng OAuth 2.0, cung cấp cho ứng dụng máy khách các khẳng định danh tính có thể kiểm chứng bằng mật mã thông qua định dạng JSON Web Token.

## Ví dụ
Một ứng dụng theo dõi tập luyện thể thao trên điện thoại hiển thị nút "Đăng nhập bằng Google", sử dụng OIDC để xác minh danh tính vận động viên và nhận email đã chứng thực mà không cần lưu trữ mật khẩu trên máy chủ của ứng dụng.
