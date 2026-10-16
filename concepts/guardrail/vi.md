---
label: Guardrail
qualifier: (AI)
aliases:
  - guardrails
loanwords:
  - guardrail
plain_descriptions:
  - các bộ lọc an toàn bao quanh chatbot
  - luật chặn câu trả lời độc hại hoặc lạc đề của AI
summary: Lớp kiểm soát đặt quanh đầu vào hoặc đầu ra của mô hình, phát hiện và chặn nội dung không an toàn, trái chính sách hoặc lạc đề.
confusable_notes: {}
follow_up_questions:
  - Vì sao nên chạy guardrail bên ngoài mô hình?
  - Guardrail có đối chiếu câu trả lời với tài liệu nguồn được không?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống hàng rào chắn dọc đường đèo: nó không lái xe giúp bạn, nhưng giữ cho xe không lao xuống vực.

## Chi tiết
Guardrail có thể lọc các nhóm nội dung độc hại, từ chối những chủ đề bị cấm, che dữ liệu cá nhân, đối chiếu câu trả lời với tài liệu nguồn và ép đúng định dạng. Chúng chạy như những bước kiểm tra hay bộ phân loại riêng, trước và sau mô hình, nên vẫn có tác dụng khi bản thân mô hình làm sai. Các dịch vụ có sẵn như Amazon Bedrock Guardrails cho cấu hình những kiểm tra này thành chính sách.

## Định nghĩa chuyên ngành
Cơ chế bảo vệ cấu hình được, đánh giá prompt và câu trả lời của mô hình theo các chính sách (nội dung, chủ đề, thông tin nhạy cảm, mức bám nguồn) rồi chặn hoặc chỉnh sửa chúng.

## Ví dụ
Trợ lý của một ngân hàng có guardrail che số thẻ trong câu trả lời và từ chối tư vấn đầu tư, chuyển các câu hỏi đó cho nhân viên.
