---
label: OAuth
aliases:
  - OAuth 2.0
loanwords:
  - oauth
plain_descriptions:
  - giao thức giúp bạn đăng nhập bằng Google hoặc Facebook mà không cần đưa mật khẩu cho ứng dụng
  - cơ chế ủy quyền cho phép phần mềm truy cập tài nguyên của bạn với quyền hạn giới hạn
summary: Khung ủy quyền tiêu chuẩn mở cho phép ứng dụng bên thứ ba truy cập có giới hạn vào tài nguyên người dùng mà không cần chia sẻ mật khẩu.
confusable_notes: {}
follow_up_questions:
  - Vì sao luồng mã ủy quyền kèm PKCE (Proof Key for Code Exchange) được khuyến nghị thay thế cho luồng Implicit cũ trên ứng dụng web?
  - Điểm khác biệt cốt lõi giữa việc xác thực danh tính bằng OpenID Connect và cấp quyền hạn bằng OAuth 2.0 thuần túy là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như chiếc chìa khóa phụ bạn giao cho nhân viên đỗ xe: chìa khóa đó chỉ đủ để nổ máy và lùi xe vào bãi đỗ, không thể mở được cốp xe hay hộp đựng đồ cá nhân.

## Chi tiết
Chuẩn OAuth 2.0 tách biệt máy chủ xác thực và máy chủ tài nguyên. Người dùng đăng nhập trực tiếp trên trang nhà cung cấp (như Google), sau đó máy chủ cấp một mã truy cập (access token) có phạm vi nhất định cho ứng dụng bên thứ ba sử dụng.

## Định nghĩa chuyên ngành
Giao thức ủy quyền phân quyền được định nghĩa trong RFC 6749, cho phép cấp phát mã truy cập có phạm vi xác định thông qua các quy trình phê duyệt bảo mật.

## Ví dụ
Bấm nút "Đăng nhập bằng tài khoản Google" trên trang tuyển dụng TopCV để tự động tạo hồ sơ mà không cần đặt mật khẩu mới.
