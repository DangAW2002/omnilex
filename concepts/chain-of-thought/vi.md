---
label: Chain-of-thought prompting
aliases:
  - chain-of-thought
  - CoT
loanwords:
  - chain-of-thought
autolink:
  aliases:
    CoT: never
plain_descriptions:
  - bảo AI suy nghĩ từng bước một
  - bắt AI trình bày cách giải trước khi đưa đáp án
summary: Kỹ thuật viết prompt yêu cầu mô hình lập luận qua các bước trung gian trước khi đưa ra câu trả lời cuối cùng.
confusable_notes: {}
follow_up_questions:
  - Phần lập luận viết ra có phản ánh đúng cách mô hình thực sự ra quyết định không?
  - Loại câu hỏi nào được lợi nhiều nhất khi lập luận từng bước?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống thầy dạy toán bắt học sinh trình bày lời giải: viết ra từng bước sẽ phát hiện được những lỗi mà đoán nhanh dễ mắc phải.

## Chi tiết
Yêu cầu lập luận từng bước, hoặc đưa ví dụ có kèm lập luận, thường giúp tăng độ chính xác với bài toán số học, logic và câu hỏi nhiều bước. Các bước hiện ra cũng giúp người đọc kiểm tra kết quả. Đổi lại, cách này tốn thêm token đầu ra, và phần giải thích viết ra không chắc là con đường mô hình thực sự đã đi.

## Định nghĩa chuyên ngành
Kỹ thuật prompt engineering khơi gợi các bước lập luận trung gian một cách tường minh từ mô hình ngôn ngữ lớn trước câu trả lời cuối cùng.

## Ví dụ
“Điện thoại giá 8 triệu đồng, giảm 15%, sau đó cộng 10% VAT. Giá cuối là bao nhiêu? Hãy suy nghĩ từng bước.” Mô hình tính ra 6,8 triệu, rồi 7,48 triệu.
