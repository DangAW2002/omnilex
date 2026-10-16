---
label: Cửa sổ ngữ cảnh
aliases: []
loanwords:
  - context window
plain_descriptions:
  - AI nhớ được bao nhiêu chữ cùng một lúc
  - giới hạn trí nhớ tạm thời của AI
summary: Số token tối đa mô hình xét được trong một lần gọi, gồm cả prompt, phần hội thoại trước đó và câu trả lời của nó.
confusable_notes: {}
follow_up_questions:
  - Điều gì xảy ra khi cuộc hội thoại dài vượt quá cửa sổ ngữ cảnh?
  - Vì sao cửa sổ ngữ cảnh càng lớn thì càng tốn chi phí?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
label_evidence:
  - ref: viblo
    locator: https://viblo.asia/p/cua-so-ngu-canh-context-window-la-gi-va-quan-ly-ra-sao-lZL9XQkvJQK
    accessed: '2026-10-16'
---

## Giải thích dễ hiểu
Hãy hình dung một chiếc bàn làm việc có kích thước cố định: tài liệu, cuộc trò chuyện và câu trả lời đang viết đều phải nằm vừa trên đó, bàn đầy thì phải dọn bớt thứ gì đó xuống.

## Chi tiết
Cửa sổ ngữ cảnh được đếm bằng token chứ không phải bằng từ. Mọi thứ dùng chung phần chỗ này: system prompt, lịch sử chat, tệp đính kèm, kết quả của công cụ và cả câu trả lời được sinh ra. Cửa sổ lớn hơn cho phép mô hình dùng nhiều tư liệu hơn, đổi lại chạy lâu hơn và tốn tiền hơn. Khi cuộc chat vượt quá giới hạn, phần cũ phải bị bỏ đi hoặc được tóm tắt lại.

## Định nghĩa chuyên ngành
Ngân sách token của một yêu cầu: tổng lượng đầu vào và đầu ra được sinh mà mô hình xử lý được trong một lần.

## Ví dụ
Cửa sổ 200.000 token chứa được vài trăm trang văn bản: đủ cho một bản hợp đồng dài kèm các câu hỏi về nó, nhưng không đủ cho cả một codebase hàng triệu dòng.
