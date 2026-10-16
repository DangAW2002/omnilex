---
label: Cross-site request forgery (CSRF)
aliases:
  - CSRF
loanwords:
  - csrf
autolink:
  aliases:
    CSRF: always
plain_descriptions:
  - cuộc tấn công lừa trình duyệt tự động gửi các yêu cầu trái phép tới trang web bạn đang đăng nhập
  - bấm vào một liên kết bẫy khiến tài khoản ngân hàng hoặc mạng xã hội của bạn tự thực hiện giao dịch lạ
summary: Hình thức tấn công đánh lừa trình duyệt của người dùng gửi các yêu cầu giả mạo tới một ứng dụng web mà người đó đã xác thực từ trước.
confusable_notes:
  xss: CSRF lợi dụng phiên đăng nhập và cookie có sẵn của người dùng để thực hiện hành động trái phép, trong khi XSS tiêm thẳng mã độc vào trang web để thao túng trình duyệt.
follow_up_questions:
  - Cờ thuộc tính SameSite trên cookie (Strict hoặc Lax) giúp phòng vệ theo chiều sâu chống lại CSRF như thế nào?
  - Tại sao mã thông báo chống CSRF (synchronizer token) là bắt buộc cho các yêu cầu POST và PUT làm thay đổi trạng thái dữ liệu?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như kẻ gian lén kẹp thêm một phiếu rút tiền giả vào xấp giấy tờ của bạn ngay lúc bạn đưa cho giao dịch viên ngân hàng; nhân viên thấy giấy tờ hợp lệ nên cứ thế thực hiện giao dịch chuyển tiền.

## Chi tiết
Do trình duyệt có cơ chế tự động đính kèm cookie đăng nhập vào các yêu cầu gửi tới tên miền tương ứng, kẻ tấn công có thể tạo một trang web lạ chứa mã ngầm gửi lệnh tới trang web nạn nhân đang đăng nhập. Để phòng tránh, các hệ thống sử dụng mã thông báo chống CSRF (anti-CSRF token) hoặc cờ `SameSite` trên cookie.

## Định nghĩa chuyên ngành
Lỗ hổng bảo mật khai thác cơ chế tự động gửi thông tin xác thực của trình duyệt web để ép buộc người dùng gửi các yêu cầu HTTP ngoài ý muốn tới các dịch vụ đã đăng nhập.

## Ví dụ
Người dùng bấm vào một đường link trúng thưởng giả mạo, trang web đó tự động gửi ngầm yêu cầu đổi địa chỉ email tài khoản mạng xã hội của nạn nhân sang email của tin tặc.
