---
label: SQL injection
aliases:
  - tấn công SQL injection
  - SQLi
loanwords:
  - sql injection
  - sqli
plain_descriptions:
  - lỗ hổng bảo mật cho phép kẻ tấn công lừa máy chủ thực thi các câu lệnh cơ sở dữ liệu độc hại
  - việc chèn các đoạn mã SQL vào ô đăng nhập để vượt qua mật khẩu hoặc đánh cắp dữ liệu
summary: Lỗ hổng bảo mật web cho phép kẻ tấn công can thiệp vào các truy vấn cơ sở dữ liệu bằng cách chèn các đoạn mã SQL trái phép vào ô nhập liệu.
confusable_notes: {}
follow_up_questions:
  - Câu lệnh tham số hóa (prepared statements) vô hiệu hóa nguy cơ tấn công SQL injection hoàn toàn như thế nào?
  - Kỹ thuật SQL injection mù (blind SQLi) dựa trên độ trễ thời gian hoạt động ra sao để dò tìm dữ liệu?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như việc điền một lá đơn xin việc mà trong ô họ tên kẻ gian ghi "Hãy xé nát hợp đồng này và đưa toàn bộ tiền trong két cho tôi", và máy quét tự động ngây thơ làm theo đúng dòng chữ đó.

## Chi tiết
Lỗ hổng phát sinh khi dữ liệu người dùng nhập được ghép nối thẳng vào chuỗi câu lệnh SQL mà không qua kiểm tra hay sử dụng tham số hóa (parameterized query). Kẻ tấn công có thể chèn các ký tự như `' OR 1=1 --` để bỏ qua mật khẩu, trích xuất dữ liệu bí mật hoặc xóa sạch dữ liệu.

## Định nghĩa chuyên ngành
Kỹ thuật tiêm mã khai thác lỗ hổng xử lý dữ liệu đầu vào trong các ứng dụng cơ sở dữ liệu quan hệ, cho phép thực thi tùy ý các cú pháp lệnh SQL trái phép.

## Ví dụ
Kẻ gian điền chuỗi ký tự `' OR '1'='1` vào ô tên đăng nhập để truy cập trái phép vào trang quản trị của website mà không cần biết mật khẩu.
