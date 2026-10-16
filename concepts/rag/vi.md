---
label: Retrieval-Augmented Generation
aliases:
  - RAG
loanwords:
  - retrieval-augmented generation
autolink:
  aliases:
    RAG: always
plain_descriptions:
  - cho AI tra tài liệu của mình trước khi trả lời
  - chatbot trả lời dựa trên tài liệu nội bộ của công ty
summary: Kỹ thuật tìm các tài liệu liên quan ngay khi có câu hỏi rồi đưa chúng vào prompt để mô hình trả lời dựa trên đó.
confusable_notes:
  fine-tuning: Fine-tuning thay đổi trọng số của mô hình bằng cách huấn luyện thêm; RAG giữ nguyên mô hình và đưa dữ kiện vào prompt.
follow_up_questions:
  - Khi nào nên chọn RAG thay vì fine-tuning?
  - Vì sao chất lượng bước truy xuất quyết định chất lượng của hệ thống RAG?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống một bài thi được mở sách: thay vì trả lời theo trí nhớ, mô hình được đưa đúng những trang cần thiết rồi mới trả lời.

## Chi tiết
Hệ thống RAG chia tài liệu thành từng đoạn, biến mỗi đoạn thành embedding rồi lưu lại, thường trong một cơ sở dữ liệu vector. Với mỗi câu hỏi, hệ thống tìm những đoạn giống nhất, đặt chúng vào prompt và yêu cầu mô hình trả lời từ tư liệu đó, tốt nhất là có trích dẫn. Câu trả lời luôn cập nhật mà không phải huấn luyện lại và ít bị ảo giác hơn, nhưng hệ thống chỉ tốt bằng những gì nó tìm được.

## Định nghĩa chuyên ngành
Kỹ thuật neo câu trả lời, trong đó đầu ra của mô hình được điều kiện hóa bởi thông tin truy xuất từ một nguồn tri thức bên ngoài ngay lúc suy luận.

## Ví dụ
Trợ lý nhân sự trả lời câu “Tôi còn bao nhiêu ngày phép năm?” bằng cách tìm đúng điều khoản trong sổ tay công ty rồi trích lại.
