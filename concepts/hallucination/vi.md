---
label: Ảo giác
qualifier: (AI)
aliases: []
loanwords:
  - hallucination
plain_descriptions:
  - khi AI tự bịa ra thông tin mà vẫn nói rất chắc
  - chatbot đưa dẫn chứng hoặc số liệu không có thật
summary: Nội dung do mô hình tạo sinh viết ra nghe có vẻ hợp lý nhưng sai hoặc không có căn cứ, lại được trình bày như sự thật.
confusable_notes: {}
follow_up_questions:
  - Retrieval-Augmented Generation giúp giảm ảo giác như thế nào?
  - Vì sao trích dẫn bị bịa ra lại đặc biệt nguy hiểm?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/%E1%BA%A2o_gi%C3%A1c_(tr%C3%AD_tu%E1%BB%87_nh%C3%A2n_t%E1%BA%A1o)
    accessed: '2026-10-16'
---

## Giải thích dễ hiểu
Giống một học sinh không bao giờ chịu nói “em không biết”, gặp câu nào không nhớ cũng tự tin bịa ra một đáp án nghe rất xuôi.

## Chi tiết
Mô hình ngôn ngữ tạo ra văn bản có xác suất cao chứ không đi tra cứu sự thật, nên nó có thể bịa tên người, con số, câu trích dẫn hay nguồn tài liệu. Nguy cơ tăng khi chủ đề ít người biết, khi phải suy luận nhiều bước hoặc khi thiếu ngữ cảnh. Cách hạn chế thường dùng là bắt câu trả lời dựa trên tài liệu được cung cấp, yêu cầu trích nguồn, cho phép mô hình nói rằng nó không chắc, và để con người kiểm tra các khẳng định quan trọng.

## Định nghĩa chuyên ngành
Việc sinh ra nội dung trôi chảy, trông hợp lý nhưng sai sự thật hoặc không được đầu vào hay nguồn đáng tin cậy nào hỗ trợ.

## Ví dụ
Được hỏi về một bản án, chatbot đưa ra số hiệu vụ án và ngày tuyên án không hề tồn tại; luật sư nào dùng ngay mà không kiểm tra sẽ bị đánh lừa.
