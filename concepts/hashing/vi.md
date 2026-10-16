---
label: Hashing
qualifier: (Mật mã học)
aliases:
  - hàm băm mật mã
  - băm dữ liệu
loanwords:
  - hashing
plain_descriptions:
  - thuật toán một chiều biến đổi dữ liệu thành một chuỗi dấu vân tay có độ dài cố định không thể đảo ngược
  - phép toán biến mật khẩu thành một chuỗi ký tự ngẫu nhiên để lưu trữ an toàn trong cơ sở dữ liệu
summary: Quy trình toán học một chiều biến đổi dữ liệu có kích thước tùy ý thành một chuỗi ký tự có độ dài cố định không thể hoàn nguyên.
confusable_notes:
  encryption: Hashing là hàm biến đổi một chiều không thể đảo ngược, còn mã hóa (encryption) là quá trình hai chiều cho phép giải mã dữ liệu về dạng ban đầu bằng khóa.
follow_up_questions:
  - Kỹ thuật thêm muối (salt) giúp vô hiệu hóa các cuộc tấn công tra cứu bảng cầu vồng (rainbow table) như thế nào?
  - Tại sao các thuật toán như Argon2 hay bcrypt lại được cố tình thiết kế để chạy chậm và tốn bộ nhớ khi băm mật khẩu?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như việc cho miếng thịt bò tươi vào máy xay nhuyễn: bạn rất dễ xay thịt thành thịt băm, nhưng không ai có thể ghép các vụn thịt băm đó trở lại thành miếng thịt bò ban đầu.

## Chi tiết
Các thuật toán băm mật mã (như SHA-256, bcrypt) có đặc tính quan trọng: cùng một đầu vào luôn ra cùng một chuỗi băm, không thể đảo ngược để tìm lại dữ liệu gốc, và xác suất hai nội dung khác nhau sinh ra cùng một mã băm (va chạm) là cực kỳ nhỏ.

## Định nghĩa chuyên ngành
Thuật toán toán học tất định, một chiều, chuyển đổi một khối dữ liệu đầu vào có độ dài bất kỳ thành một chuỗi bit có độ dài cố định thỏa mãn tính kháng tiền ảnh và kháng va chạm.

## Ví dụ
Lưu mật khẩu người dùng dưới dạng chuỗi băm bcrypt kèm chuỗi muối (salt) để nhân viên kỹ thuật hay kẻ gian có xem cơ sở dữ liệu cũng không biết được mật khẩu gốc.
