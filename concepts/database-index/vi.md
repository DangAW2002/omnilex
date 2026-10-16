---
label: Index
qualifier: (Cơ sở dữ liệu)
aliases:
  - chỉ mục cơ sở dữ liệu
  - chỉ mục
loanwords:
  - index
autolink:
  label: never
plain_descriptions:
  - bảng tra cứu nhanh giúp cơ sở dữ liệu tìm thấy dòng cần xem trong tích tắc thay vì phải quét cả ổ đĩa
  - mục lục tra cứu ở cuối sách giúp tìm đúng dữ liệu mà không cần đọc hết cả bảng
summary: Cấu trúc dữ liệu phụ trợ liên kết với bảng nhằm tăng tốc độ truy tìm bản ghi với chi phí là tốn thêm dung lượng và giảm tốc độ ghi.
confusable_notes: {}
follow_up_questions:
  - Tại sao tạo quá nhiều chỉ mục lại làm suy giảm hiệu năng ghi và chèn dữ liệu?
  - Điểm khác biệt về mặt cấu trúc giữa chỉ mục gom cụm (clustered) và không gom cụm (non-clustered) là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như mục lục tra cứu theo vần chữ cái ở cuối cuốn sách dày: thay vì phải lật đọc từng trang trong số 800 trang, bạn tra ngay được số trang cần đọc trong vài giây.

## Chi tiết
Nếu không có chỉ mục, hệ thống buộc phải duyệt tuần tự toàn bộ bảng (full table scan). Khi có chỉ mục (thường dùng cấu trúc cây B-Tree), hệ thống tìm kiếm theo cấu trúc phân nhánh có thứ tự, giảm số phép so sánh từ hàng triệu xuống chỉ vài thao tác.

## Định nghĩa chuyên ngành
Cấu trúc dữ liệu chuyên biệt lưu trữ các khóa tìm kiếm và con trỏ tương ứng, cho phép rút ngắn thời gian định vị bản ghi trong các bảng cơ sở dữ liệu.

## Ví dụ
Tạo chỉ mục trên cột `so_can_cuoc` để hệ thống tìm kiếm thông tin công dân ngay lập tức mà không phải quét toàn bộ bảng dân cư.
