---
label: Cross-site scripting (XSS)
aliases:
  - XSS
loanwords:
  - xss
autolink:
  aliases:
    XSS: always
plain_descriptions:
  - lỗ hổng bảo mật cho phép kẻ xấu chèn mã JavaScript độc hại vào trang web để tấn công người xem
  - gài mã độc vào phần bình luận của website khiến người đọc bị đánh cắp thông tin đăng nhập
summary: Lỗ hổng tiêm mã độc phía client cho phép tin tặc cài cắm các đoạn mã kịch bản độc hại vào trang web uy tín để thực thi trên trình duyệt của nạn nhân.
confusable_notes:
  csrf: XSS thực thi mã độc JavaScript trực tiếp trong trình duyệt của nạn nhân, còn CSRF lừa trình duyệt gửi yêu cầu ngoài ý muốn tới dịch vụ mà nạn nhân đã đăng nhập.
follow_up_questions:
  - Tiêu đề Content Security Policy (CSP) giúp ngăn chặn việc thực thi các đoạn mã độc nội tuyến như thế nào?
  - Điểm khác biệt giữa XSS lưu trữ (stored) trong cơ sở dữ liệu và XSS phản xạ (reflected) qua tham số URL là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như việc ai đó lén dán một tờ thông báo giả mạo lên bảng tin công cộng của khu phố; bà con đi qua đọc được tưởng là thông báo của ban quản lý nên làm theo hướng dẫn lừa đảo.

## Chi tiết
Lỗ hổng XSS xảy ra khi dữ liệu người dùng gửi lên không được mã hóa kỹ trước khi hiển thị lại trên trang HTML. Khi người khác vào xem trang, đoạn mã JavaScript độc hại sẽ tự động chạy trên trình duyệt của họ, cho phép kẻ xấu đọc lén cookie đăng nhập hoặc chuyển hướng sang trang web giả mạo.

## Định nghĩa chuyên ngành
Lỗ hổng an toàn ứng dụng web cho phép chèn mã kịch bản phía máy khách vào nội dung trang web mà không được khử khuẩn đầy đủ, dẫn đến việc thực thi mã trái phép trong ngữ cảnh phiên duyệt của người dùng.

## Ví dụ
Kẻ xấu đăng bình luận chứa mã JavaScript độc hại vào diễn đàn để tự động gửi trộm cookie của bất kỳ ai vào đọc bài viết đó.
