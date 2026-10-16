---
label: Few-shot prompting
aliases:
  - few-shot
loanwords:
  - few-shot prompting
plain_descriptions:
  - cho AI xem vài ví dụ mẫu trước khi hỏi
  - dạy bằng ví dụ ngay trong câu hỏi
summary: Kỹ thuật viết prompt có kèm vài ví dụ mẫu của nhiệm vụ để mô hình làm theo đúng khuôn đó.
confusable_notes: {}
follow_up_questions:
  - Thường cần bao nhiêu ví dụ là đủ?
  - Zero-shot và few-shot prompting khác nhau thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống việc đưa cho đồng nghiệp mới xem hai tờ khai đã điền sẵn trước khi giao một tờ trống.

## Chi tiết
Ví dụ cho mô hình thấy định dạng, giọng văn và quy tắc ra quyết định rõ hơn nhiều so với chỉ mô tả bằng lời. Zero-shot là không có ví dụ, one-shot là một ví dụ, few-shot là vài ví dụ. Ví dụ nên đa dạng và đúng, vì mô hình bắt chước cả những điểm lạ trong đó, và mỗi ví dụ đều chiếm chỗ trong cửa sổ ngữ cảnh.

## Định nghĩa chuyên ngành
Prompt chứa nhiều hơn một ví dụ về cặp đầu vào và đầu ra mong muốn, dùng để định hướng mô hình mà không thay đổi trọng số của nó.

## Ví dụ
Prompt “Hà Nội → miền Bắc; Cần Thơ → miền Tây; Huế →” khiến mô hình trả lời “miền Trung”.
