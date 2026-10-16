---
label: Object-Relational Mapping (ORM)
aliases:
  - ORM
loanwords:
  - orm
autolink:
  aliases:
    ORM: always
plain_descriptions:
  - công cụ giúp lập trình viên thao tác với cơ sở dữ liệu bằng các đối tượng mã nguồn thông thường
  - phần mềm tự động dịch các class trong code thành các bảng và dòng trong cơ sở dữ liệu
summary: Kỹ thuật lập trình tạo cầu nối chuyển đổi giữa các đối tượng trong mã nguồn hướng đối tượng và các bảng trong cơ sở dữ liệu quan hệ.
confusable_notes: {}
follow_up_questions:
  - Hiện tượng bất tương thích trở kháng (impedance mismatch) giữa đối tượng và quan hệ là gì?
  - Làm thế nào để phát hiện và khắc phục lỗi phát sinh truy vấn N+1 khi sử dụng ORM?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như một thông dịch viên chuyên nghiệp: bạn nói bằng tiếng Việt và người đó tự dịch sang tiếng nước ngoài để ghi chép vào sổ lưu trữ mà bạn không cần học ngữ pháp của họ.

## Chi tiết
Các thư viện ORM ánh xạ các lớp (class) trong ngôn ngữ lập trình như C#, Java hay TypeScript thành các bảng trong cơ sở dữ liệu. Lập trình viên chỉ cần thao tác trên biến và đối tượng, ORM sẽ tự sinh các câu lệnh SQL để truy vấn hoặc cập nhật.

## Định nghĩa chuyên ngành
Tầng trừu tượng hóa dữ liệu cho phép lập trình viên tương tác với cơ sở dữ liệu quan hệ thông qua mô hình hướng đối tượng mà không cần viết trực tiếp các câu lệnh SQL thô.

## Ví dụ
Dùng lệnh `user.save()` trong Prisma hoặc Entity Framework để tự động chạy câu lệnh `UPDATE` cập nhật hồ sơ người dùng trong MySQL.
