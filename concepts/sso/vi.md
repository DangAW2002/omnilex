---
label: Single sign-on (SSO)
aliases:
  - SSO
  - đăng nhập một lần
loanwords:
  - single sign-on (sso)
autolink:
  aliases:
    SSO: always
plain_descriptions:
  - đăng nhập một lần duy nhất để dùng được nhiều ứng dụng khác nhau
  - một tài khoản mở khóa toàn bộ các phần mềm làm việc trong ngày
summary: Cơ chế xác thực cho phép người dùng chỉ cần đăng nhập một lần là có thể truy cập nhiều ứng dụng liên kết mà không phải nhập lại thông tin.
confusable_notes: {}
follow_up_questions:
  - Vì sao việc áp dụng SSO lại làm tăng tầm quan trọng của xác thực đa yếu tố tại nhà cung cấp định danh?
  - Đội ngũ quản trị cần chuẩn bị kịch bản dự phòng nào khi máy chủ cung cấp định danh trung tâm gặp sự cố gián đoạn?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như chiếc vòng tay trọn gói ở công viên giải trí: thay vì phải xếp hàng mua và chìa từng tấm vé riêng lẻ ở mỗi trò chơi đu quay hay tàu lượn, bạn chỉ cần mua một chiếc vòng tay ở cổng chính là có thể thoải mái bước vào mọi khu trò chơi.

## Chi tiết
Cơ chế đăng nhập một lần thiết lập mối quan hệ tin cậy giữa Nhà cung cấp định danh (Identity Provider - IdP) trung tâm và các Nhà cung cấp dịch vụ (Service Provider - SP). Khi người dùng muốn vào một ứng dụng, ứng dụng đó chuyển hướng họ về IdP. IdP thực hiện xác thực một lần, tạo phiên đăng nhập và gửi lại một xác nhận hoặc token có chữ ký số an toàn cho dịch vụ. SSO giúp giảm triệt để sự mệt mỏi khi phải nhớ quá nhiều mật khẩu, xóa bỏ thao tác đăng nhập lặp đi lặp lại và cho phép thu hồi quyền truy cập tức thì khi nhân viên thôi việc.

## Định nghĩa chuyên ngành
Cơ chế quản lý thông tin xác thực tập trung cho phép một sự kiện xác thực duy nhất cấp quyền truy cập liền mạch vào nhiều hệ thống phần mềm độc lập trên các miền bảo mật khác nhau.

## Ví dụ
Nhân viên đăng nhập vào tài khoản Google Workspace công ty vào đầu ngày làm việc và tự động mở được các công cụ Slack, Jira và GitHub mà không cần gõ lại mật khẩu.
