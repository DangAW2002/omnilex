---
label: Chunking
qualifier: (RAG)
aliases:
  - phân đoạn tài liệu
loanwords:
  - chunking
plain_descriptions:
  - chia nhỏ các tài liệu dài thành từng đoạn văn ngắn gọn trước khi lưu vào cơ sở dữ liệu tìm kiếm cho AI
  - kỹ thuật cắt văn bản thành các khúc vừa vặn có gối đầu để mô hình ngôn ngữ tra cứu chính xác
summary: >-
  Quy trình phân chia các tài liệu dài thành những đoạn văn bản nhỏ gọn, có cấu trúc mạch lạc nhằm tối ưu hóa việc tạo véc-tơ ngữ nghĩa và nâng cao độ chính xác khi truy xuất trong hệ thống RAG.
confusable_notes: {}
follow_up_questions:
  - Việc để các đoạn văn gối đầu lên nhau (overlap) giúp giữ gìn tính liền mạch của ngữ cảnh như thế nào?
  - Phương pháp phân đoạn theo cấu trúc tiêu đề tài liệu mang lại ưu thế gì so với cắt đều theo số lượng từ?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc tóm tắt một cuốn bách khoa toàn thư thành các tấm thẻ ghi chú nhỏ: thẻ quá to thì chứa nhiều thông tin thừa, thẻ quá nhỏ thì cụt ngủn mất hết ý nghĩa của câu chuyện.

## Chi tiết
Mô hình ngôn ngữ có giới hạn cửa sổ ngữ cảnh, và các mô hình embedding sẽ bị loãng ý nghĩa nếu phải nén cả một tập tài liệu dài vào một véc-tơ đơn lẻ. Kỹ thuật chunking chia tách văn bản theo số lượng token, theo các đề mục tiêu đề hoặc theo câu. Việc duy trì một tỷ lệ gối đầu nhỏ (khoảng 10-20% độ dài đoạn) giúp giữ trọn vẹn ngữ cảnh giữa các đoạn liền kề, tránh làm đứt gãy ý nghĩa khi tìm kiếm.

## Định nghĩa chuyên ngành
Quá trình thuật toán phân đoạn văn bản thành các cửa sổ token rời rạc được hiệu chỉnh phù hợp với trường tiếp nhận của mô hình embedding dày đặc.

## Ví dụ
Một tài liệu hướng dẫn kỹ thuật dài 40 trang gồm 15.000 từ được chia thành 35 đoạn, mỗi đoạn 500 token kèm 50 token gối đầu, đảm bảo các bảng cấu hình quan trọng không bị cắt rời.
