---
label: Document database
aliases:
  - cơ sở dữ liệu tài liệu
  - document store
loanwords:
  - Document database
plain_descriptions:
  - cơ sở dữ liệu lưu trữ các bản ghi dưới dạng các tệp tài liệu số tương tự như định dạng JSON
  - hệ thống linh hoạt nơi mỗi hồ sơ khách hàng tự chứa danh sách thông tin lồng nhau mà không cần ghép bảng
summary: Loại cơ sở dữ liệu phi quan hệ được thiết kế để lưu trữ, truy xuất và quản lý dữ liệu bán cấu trúc dưới dạng tài liệu như JSON hoặc BSON.
confusable_notes: {}
follow_up_questions:
  - Việc nhúng các đối tượng lồng nhau trong tài liệu khác gì so với việc chuẩn hóa dữ liệu qua các bảng liên kết khóa ngoại?
  - Cơ chế tạo chỉ mục phụ (secondary index) trên các trường lồng sâu trong tài liệu JSON hoạt động ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc cất hồ sơ thuế vào từng bìa kẹp giấy riêng biệt: mỗi bìa chứa đầy đủ biên lai, giấy tờ tùy thân và ghi chú của người đó ngay bên trong, thay vì xé lẻ biên lai để cất vào các ngăn tủ khác nhau.

## Chi tiết
Cơ sở dữ liệu tài liệu lưu trữ từng bản ghi hoàn chỉnh dưới dạng một tài liệu độc lập, phổ biến nhất là định dạng JSON, BSON hoặc XML. Không giống kho khóa - giá trị đơn thuần, hệ thống này hiểu rõ cấu trúc bên trong tài liệu, cho phép lập trình viên tìm kiếm, lọc và đánh chỉ mục trực tiếp trên các thuộc tính hoặc mảng lồng nhau mà không cần thực hiện các phép kết nối (JOIN) bảng phức tạp.

## Định nghĩa chuyên ngành
Hệ thống cơ sở dữ liệu NoSQL bán cấu trúc mô hình hóa các bản ghi dưới dạng tài liệu phân cấp tự mô tả (thường là JSON/BSON) hỗ trợ truy vấn và đánh chỉ mục sâu trên các trường dữ liệu nội tại.

## Ví dụ
Một website tin tức lưu bài báo, thông tin tác giả, danh sách từ khóa và các bình luận của độc giả chung trong một tài liệu JSON duy nhất, giúp tải toàn bộ trang bài viết chỉ qua một lần đọc.
