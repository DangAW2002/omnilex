---
label: Cơ sở dữ liệu vector
aliases: []
loanwords:
  - vector database
plain_descriptions:
  - kho dữ liệu tìm theo ý nghĩa gần giống
  - nơi lưu trữ tìm kiếm theo độ gần nhau của các dãy số
summary: Cơ sở dữ liệu chuyên lưu vector embedding và trả về nhanh những vector giống nhất với vector của câu truy vấn.
confusable_notes: {}
follow_up_questions:
  - Tìm láng giềng gần đúng đánh đổi điều gì để lấy tốc độ?
  - Làm RAG có bắt buộc phải dùng cơ sở dữ liệu vector riêng không?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
label_evidence:
  - ref: topdev
    locator: https://topdev.vn/blog/co-so-du-lieu-vector-database/
    accessed: '2026-10-16'
---

## Giải thích dễ hiểu
Giống một thủ thư xếp sách theo độ gần nhau của chủ đề chứ không theo tên sách, nên hỏi một cuốn là được đưa luôn cả những cuốn bên cạnh.

## Chi tiết
Mỗi bản ghi gồm một vector và metadata. Thay vì so khớp chính xác, câu truy vấn hỏi những láng giềng gần nhất theo khoảng cách cosine hoặc Euclid. Các chỉ mục tìm láng giềng gần đúng như HNSW hay IVF giữ tốc độ nhanh trên hàng triệu vector bằng cách chấp nhận sai lệch nhỏ. Nhiều hệ quản trị cơ sở dữ liệu thông thường nay cũng có thêm tìm kiếm vector bên cạnh truy vấn quen thuộc.

## Định nghĩa chuyên ngành
Kho dữ liệu chuyên lập chỉ mục và truy vấn vector nhiều chiều theo độ tương đồng, thường dùng tìm kiếm láng giềng gần đúng.

## Ví dụ
Một shop online lưu embedding của mọi ảnh sản phẩm; khách tải lên một tấm ảnh là nhận về mười món giống nhất.
