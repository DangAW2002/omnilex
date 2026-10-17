---
label: Reranking
aliases:
  - xếp hạng lại
loanwords:
  - reranking
plain_descriptions:
  - bước chấm điểm lần hai giúp sắp xếp lại các kết quả tìm kiếm để đưa câu trả lời chuẩn nhất lên đầu
  - kỹ thuật dùng mô hình học sâu chấm điểm chi tiết độ liên quan của các tài liệu vừa tìm được
summary: >-
  Kỹ thuật truy xuất thông tin hai giai đoạn trong đó một mô hình tính toán chuyên sâu đánh giá lại và sắp xếp lại danh sách các tài liệu ứng viên để tối ưu hóa thứ hạng hiển thị.
confusable_notes: {}
follow_up_questions:
  - Tại sao kiến trúc cross-encoder mang lại độ chính xác cao hơn nhưng tốn tài nguyên hơn bi-encoder trong bài toán reranking?
  - Reranking giúp cải thiện độ chuẩn xác của ngữ cảnh đầu vào trong hệ thống RAG như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như quy trình tuyển dụng nhân sự: phòng nhân sự trước tiên lọc nhanh 500 hồ sơ để chọn ra 10 ứng viên tiềm năng, sau đó giám đốc trực tiếp phỏng vấn kỹ 10 người này để chọn ra người xuất sắc nhất.

## Chi tiết
Giai đoạn truy xuất ban đầu (như bi-encoder hoặc BM25) tập trung vào tốc độ để lọc ra khoảng 50 đến 100 tài liệu từ hàng triệu dữ liệu. Bước reranking sau đó đưa câu hỏi và từng tài liệu vào một mô hình cross-encoder để tính toán cơ chế chú ý đầy đủ giữa các từ. Sự tương tác từ-qua-từ này giúp nắm bắt trọn vẹn ngữ nghĩa tinh tế, đưa các đoạn văn trả lời đúng trọng tâm nhất lên đầu danh sách.

## Định nghĩa chuyên ngành
Quy trình chấm điểm thứ cấp đánh giá tương tác chú ý chéo hoàn toàn giữa chuỗi truy vấn và chuỗi ứng viên nhằm sắp xếp lại thứ tự của tập tài liệu thu nhận.

## Ví dụ
Kho tri thức doanh nghiệp tìm nhanh được 50 tài liệu liên quan bằng tìm kiếm véc-tơ, sau đó bộ reranking chấm điểm lại và đưa đúng 3 tài liệu quy định quan trọng nhất lên đầu bảng.
