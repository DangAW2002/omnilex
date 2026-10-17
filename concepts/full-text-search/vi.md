---
label: Tìm kiếm toàn văn
aliases:
  - full-text search
  - FTS
autolink:
  aliases:
    FTS: always
loanwords: []
plain_descriptions:
  - việc tìm từ và cụm từ bên trong các tài liệu dài thay vì chỉ so khớp mã số chính xác
  - kỹ thuật tìm kiếm thông minh hiểu được từ gốc, bỏ qua từ nối thông thường và chấp nhận sai lỗi nhỏ
summary: Kỹ thuật tìm kiếm các tài liệu văn bản hoặc trường dữ liệu bằng cách so khớp từ ngữ, gốc từ và cụm từ thông qua chỉ mục đảo.
confusable_notes: {}
follow_up_questions:
  - Quá trình tách từ (tokenization), loại bỏ từ dừng và chuẩn hóa gốc từ chuẩn bị dữ liệu cho chỉ mục đảo ra sao?
  - Công thức tính điểm độ liên quan như TF-IDF hay BM25 xếp hạng kết quả tìm kiếm dựa trên mức độ quan trọng thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: ocd-vn
    locator: https://ocd.vn/tinh-nang-tim-kiem-toan-van/
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc bấm nút tìm kiếm từ khóa trong ứng dụng đọc sách điện tử: bạn gõ vài từ và ứng dụng lập tức liệt kê mọi câu văn có chứa các từ đó, kể cả khi từ được viết hoa hay ở dạng số nhiều.

## Chi tiết
Khác với câu lệnh so sánh chuỗi đơn giản trong cơ sở dữ liệu (như lệnh LIKE '%từ%') vốn phải quét chậm chạp từng dòng từ đầu đến cuối bảng, tìm kiếm toàn văn đưa văn bản qua một bộ phân tích ngôn ngữ. Hệ thống chia văn bản thành các từ tố (token), loại bỏ các hư từ không mang ý nghĩa (như "và", "nhưng"), đưa từ về dạng nguyên thể và đưa vào chỉ mục đảo. Khi tìm kiếm, thuật toán tính điểm mức độ liên quan (như BM25) để sắp xếp kết quả từ khớp nhất xuống dưới.

## Định nghĩa chuyên ngành
Phương pháp thu hồi thông tin kiểm tra toàn bộ các từ trong văn bản thông qua việc tạo chỉ mục đảo, chuẩn hóa hình thái ngôn ngữ học và tính điểm mức độ liên quan theo mô hình toán học.

## Ví dụ
Một cơ sở dữ liệu văn bản pháp luật cho phép luật sư tìm kiếm trong 50.000 bản án cụm từ "xâm phạm quyền sở hữu trí tuệ", xếp hạng các bản án có nội dung liên quan nhất trong chưa đầy 50 mili giây.
