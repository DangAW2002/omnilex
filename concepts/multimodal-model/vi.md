---
label: Multimodal model
aliases:
  - mô hình đa phương thức
loanwords:
  - multimodal model
plain_descriptions:
  - hệ thống AI có khả năng hiểu và kết hợp đồng thời nhiều dạng dữ liệu như văn bản, hình ảnh và âm thanh
  - mô hình trí tuệ nhân tạo có thể vừa nhìn ảnh vừa nghe câu hỏi để đưa ra câu trả lời
summary: >-
  Mô hình trí tuệ nhân tạo có năng lực tiếp nhận, xử lý và tạo ra thông tin từ nhiều phương thức dữ liệu khác nhau như văn bản, hình ảnh, âm thanh và video trong một hệ thống thống nhất.
confusable_notes: {}
follow_up_questions:
  - Cơ chế chú ý chéo liên kết các không gian biểu diễn giữa bộ mã hóa hình ảnh và văn bản như thế nào?
  - Chiến lược phân mảnh token nào cho phép xử lý dữ liệu âm thanh liên tục cùng lúc với văn bản rời rạc?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một chuyên gia tư vấn vừa nhìn vào biểu đồ tài chính trên bàn, vừa lắng nghe bạn hỏi qua lời nói và chỉ ngay cho bạn số liệu cần tìm.

## Chi tiết
Mô hình đa phương thức ánh xạ các loại dữ liệu khác nhau về một không gian véc-tơ tiềm ẩn chung. Trước đây hệ thống cần ghép nối các bộ mã hóa riêng rẽ thông qua lớp chiếu thích ứng. Các mô hình hiện đại đã xử lý trực tiếp các mảng ảnh, âm thanh và từ ngữ dưới dạng các token thống nhất trong cùng một mạng transformer, cho phép thực hiện các bài toán phức tạp như hỏi đáp trên hình ảnh hoặc đọc hiểu tài liệu phức hợp.

## Định nghĩa chuyên ngành
Kiến trúc mạng nơ-ron sâu học biểu diễn kết hợp và áp dụng cơ chế tự chú ý chéo trên các phương thức dữ liệu đầu vào và đầu ra không đồng nhất.

## Ví dụ
Ứng dụng giám định bảo hiểm tiếp nhận một bức ảnh chụp vết móp xe cùng một đoạn ghi âm miêu tả tai nạn, tự động ước tính chi phí bồi thường 1.200 USD chỉ trong một bước xử lý.
