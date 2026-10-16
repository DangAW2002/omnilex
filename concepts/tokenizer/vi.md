---
label: Tokenizer
aliases: []
loanwords:
  - tokenizer
plain_descriptions:
  - phần cắt chữ thành từng mẩu cho AI đọc
  - thứ quyết định một câu tốn bao nhiêu token
summary: Thành phần tách dữ liệu đầu vào như văn bản thành các token thuộc một bộ từ vựng cố định và đổi chúng thành mã số cho mô hình.
confusable_notes: {}
follow_up_questions:
  - Vì sao cùng một đoạn văn lại ra số token khác nhau trên các mô hình khác nhau?
  - Vì sao tiếng Việt thường tốn nhiều token hơn tiếng Anh?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống việc cắt một câu thành các mảnh ghép theo một bộ hình dạng có sẵn trước khi đưa vào máy.

## Chi tiết
Phần lớn tokenizer của LLM dùng phương pháp chia theo đơn vị nhỏ hơn từ, chẳng hạn byte-pair encoding: từ hay gặp thành một token, từ hiếm bị tách thành nhiều token. Mỗi mô hình có bộ từ vựng riêng nên cùng một đoạn văn sẽ ra số token khác nhau, và tiếng Việt có dấu thường cần nhiều token hơn tiếng Anh để diễn đạt cùng một ý. Các mô hình đa phương thức còn tách cả hình ảnh hay âm thanh thành token.

## Định nghĩa chuyên ngành
Thuật toán ánh xạ dữ liệu thô, chẳng hạn văn bản, thành các đơn vị (token) và mã số nguyên mà mô hình làm việc cùng.

## Ví dụ
Từ “unbelievable” có thể bị tách thành “un”, “believ” và “able”; một bài viết tiếng Việt 1.000 chữ có thể tốn nhiều token hơn hẳn bản dịch tiếng Anh của nó.
