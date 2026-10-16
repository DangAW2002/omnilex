---
label: Structured output
aliases:
  - structured outputs
loanwords:
  - structured output
plain_descriptions:
  - bắt AI trả lời đúng một định dạng dữ liệu cố định
  - nhận về JSON thay vì một đoạn chữ tự do
summary: Đầu ra của mô hình bị ràng buộc theo một định dạng cho trước, thường là JSON schema, để phần mềm đọc được một cách tin cậy.
confusable_notes: {}
follow_up_questions:
  - Structured output khác gì so với chỉ dặn “trả về JSON” trong prompt?
  - Khi nào nên dùng function calling thay thế?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống yêu cầu trả lời trên một mẫu phiếu in sẵn các ô cố định, thay vì viết một lá thư tự do.

## Chi tiết
Ứng dụng thường cần các trường dữ liệu chứ không cần văn xuôi. Schema liệt kê các khóa bắt buộc và kiểu của chúng; ở chế độ structured output, nhà cung cấp ràng buộc quá trình sinh để câu trả lời luôn khớp schema, thay vì chỉ trông vào lời dặn. Cách này đi cùng function calling rất tự nhiên, vì tham số của lời gọi hàm cũng có cấu trúc.

## Định nghĩa chuyên ngành
Việc sinh nội dung bị ràng buộc bởi một schema do bên gọi cung cấp, bảo đảm đầu ra đúng cú pháp và tuân theo schema đó, ví dụ JSON.

## Ví dụ
Một cửa hàng trích tên, số điện thoại và địa chỉ từ tin nhắn của khách; mọi kết quả đều là JSON hợp lệ, đưa thẳng vào hệ thống đơn hàng.
