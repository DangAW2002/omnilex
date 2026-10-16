---
label: Principle of least privilege
aliases:
  - nguyên tắc đặc quyền tối thiểu
  - nguyên tắc quyền tối thiểu
  - least privilege
loanwords:
  - principle of least privilege
  - least privilege
plain_descriptions:
  - chỉ cấp cho nhân viên hoặc phần mềm đúng những quyền hạn tối thiểu vừa đủ để làm việc
  - nguyên tắc không cấp quyền quản trị viên cho bất kỳ ai nếu họ không thực sự cần thiết
summary: Nguyên tắc an ninh mạng quy định rằng người dùng, tài khoản và quy trình chỉ được cấp những quyền hạn tối thiểu cần thiết để hoàn thành công việc được giao.
confusable_notes: {}
follow_up_questions:
  - Cơ chế cấp quyền đúng lúc (just-in-time access) giúp duy trì nguyên tắc đặc quyền tối thiểu cho kỹ sư đám mây như thế nào?
  - Làm thế nào để phát hiện và thu hồi các quyền hạn bị tích lũy dư thừa (permission creep) theo thời gian trong tổ chức?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như việc phát thẻ phòng khách sạn cho nhân viên dọn phòng: thẻ chỉ mở được các phòng khách tầng 3, không thể mở được két sắt bảo mật trong phòng tổng giám đốc.

## Chi tiết
Nguyên tắc quyền tối thiểu giúp thu hẹp phạm vi thiệt hại khi có sự cố. Nếu một nhân viên bị đánh cắp tài khoản hoặc một máy chủ bị tấn công, tin tặc cũng không thể lợi dụng quyền hạn đó để lây lan sang các máy chủ khác hay can thiệp vào dữ liệu tài chính.

## Định nghĩa chuyên ngành
Quy tắc an ninh cốt lõi giới hạn quyền truy cập của mọi đối tượng trong hệ thống ở mức vừa đủ để thực thi nhiệm vụ được ủy quyền, loại bỏ mọi đặc quyền dư thừa.

## Ví dụ
Cấu hình cho tài khoản của nhân viên kho chỉ được xem và cập nhật trạng thái đơn hàng, không được quyền sửa giá sản phẩm hay xóa dữ liệu khách hàng.
