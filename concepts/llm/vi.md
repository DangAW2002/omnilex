---
label: Mô hình ngôn ngữ lớn
aliases:
  - LLM
loanwords:
  - large language model
autolink:
  aliases:
    LLM: always
plain_descriptions:
  - AI viết chữ bằng cách đoán từ tiếp theo
  - bộ não phía sau ChatGPT, Gemini hay Claude
summary: Mạng nơ-ron rất lớn, học từ lượng văn bản khổng lồ, đọc và viết ngôn ngữ bằng cách đoán token tiếp theo.
confusable_notes: {}
follow_up_questions:
  - Vì sao mô hình ngôn ngữ lớn đôi khi khẳng định sai một cách rất tự tin?
  - Cửa sổ ngữ cảnh giới hạn những gì LLM dùng được như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/M%C3%B4_h%C3%ACnh_ng%C3%B4n_ng%E1%BB%AF_l%E1%BB%9Bn
    accessed: '2026-10-16'
---

## Giải thích dễ hiểu
Hãy hình dung tính năng gợi ý chữ trên bàn phím điện thoại, nhưng đã được huấn luyện trên một phần rất lớn của Internet: đưa cho nó phần mở đầu, nó cứ thế viết tiếp từng mẩu hợp lý cho tới khi thành một câu trả lời hoàn chỉnh.

## Chi tiết
LLM thường là một mô hình Transformer với hàng tỷ tham số. Mô hình được huấn luyện trước để đoán token kế tiếp trên một kho văn bản rất rộng, sau đó thường được tinh chỉnh bằng chỉ dẫn và phản hồi của con người để biết làm theo yêu cầu. Nó đọc văn bản dưới dạng token, chỉ dùng được những gì nằm vừa trong cửa sổ ngữ cảnh, và có thể nói sai một cách trôi chảy, hiện tượng gọi là ảo giác.

## Định nghĩa chuyên ngành
Mô hình ngôn ngữ có số lượng tham số rất lớn; trên thực tế là mô hình dựa trên Transformer, được huấn luyện trên kho văn bản lớn để dự đoán và sinh chuỗi token.

## Ví dụ
Một lập trình viên dán log lỗi và hỏi cách sửa, LLM đề xuất bản vá. Bộ phận chăm sóc khách hàng của một sàn thương mại điện tử để LLM soạn nháp câu trả lời, nhân viên đọc lại rồi mới gửi.
