---
label: "Class"
qualifier: "(Lập trình)"
aliases:
  - "Lớp"
loanwords:
  - "class"
autolink:
  label: never
  aliases:
    Lớp: never
plain_descriptions:
  - "bản thiết kế mẫu dùng để tạo ra các đối tượng có cùng thuộc tính và hành vi"
  - "khuôn mẫu trong mã nguồn quy định dữ liệu và phương thức của một thực thể"
summary: "Khuôn mẫu mã nguồn có thể mở rộng, định nghĩa các thuộc tính trạng thái và phương thức hành vi để tạo ra đối tượng."
confusable_notes: {}
follow_up_questions:
  - "Kế thừa lớp khác gì so với tổng hợp đối tượng (composition) khi thiết kế kiến trúc phần mềm lớn?"
  - "Các từ khóa chỉ định phạm vi truy cập (access modifiers) bảo vệ tính đóng gói của lớp như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng bản vẽ thiết kế của một ngôi nhà liền kề. Bản vẽ chưa phải là nhà ở thực tế, nhưng từ một bản vẽ đó, đơn vị thi công có thể xây nên hàng chục căn nhà có cùng kết cấu phòng ốc dù màu sơn bên trong mỗi nhà có thể khác nhau.

## Chi tiết
Lớp gom các trường dữ liệu và phương thức xử lý vào một định nghĩa thống nhất. Khi khởi tạo một lớp, chương trình sẽ cấp phát bộ nhớ để sinh ra một đối tượng cụ thể thông qua hàm khởi tạo (constructor). Lớp hỗ trợ tính kế thừa, cho phép các lớp con tái sử dụng hoặc ghi đè những hành vi từ lớp cha. Cơ chế đóng gói với các mức truy cập như private, protected hay public giúp ngăn chặn việc can thiệp trực tiếp vào dữ liệu nội bộ, chỉ cho phép tương tác qua các phương thức công khai.

## Định nghĩa chuyên ngành
Cấu trúc định nghĩa kiểu dữ liệu phức hợp, đóng gói biểu diễn trạng thái và các phương thức xử lý để làm khuôn mẫu chuẩn cho việc khởi tạo đối tượng trong thời gian chạy.

## Ví dụ
Một lớp `BankAccount` khai báo thuộc tính số dư và phương thức `deposit(amount)`; khởi tạo một tài khoản mới với 200 đô la sẽ sinh ra một thực thể tài khoản độc lập trong bộ nhớ.
