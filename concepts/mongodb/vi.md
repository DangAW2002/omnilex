---
label: MongoDB
aliases: []
loanwords:
  - MongoDB
plain_descriptions:
  - cơ sở dữ liệu phổ biến lưu trữ bản ghi dưới dạng các tài liệu JSON linh hoạt thay vì các bảng cứng nhắc
  - phần mềm cơ sở dữ liệu dạng tài liệu được giới lập trình web yêu thích nhờ khả năng lưu dữ liệu tùy biến dễ dàng
summary: Cơ sở dữ liệu tài liệu mã nguồn mở phổ biến lưu trữ dữ liệu vận hành dưới dạng các tài liệu BSON linh hoạt tương tự JSON.
confusable_notes: {}
follow_up_questions:
  - Sự linh hoạt về lược đồ động của MongoDB giúp tăng tốc độ phát triển sản phẩm mẫu như thế nào?
  - Cơ chế nhóm bản sao (replica set) mang lại tính sẵn sàng cao và tự động chuyển đổi dự phòng ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như cuốn sổ tay lưu công thức nấu ăn điện tử: mỗi món ăn có thể có số lượng nguyên liệu, các bước nấu và hình ảnh minh họa hoàn toàn khác nhau mà không cần gò ép vào một mẫu in sẵn cố định.

## Chi tiết
MongoDB là cơ sở dữ liệu tài liệu hàng đầu lưu trữ dữ liệu trong các tập hợp (collection) chứa tài liệu BSON (Binary JSON). Các trường dữ liệu có thể thay đổi linh hoạt giữa các tài liệu, và các cấu trúc phức tạp như mảng hoặc tài liệu con có thể nhúng trực tiếp. MongoDB cung cấp đường ống phân tích tổng hợp (aggregation pipeline), khả năng phân mảnh dữ liệu (sharding) ngang qua nhiều máy chủ và hỗ trợ giao dịch ACID trên nhiều tài liệu.

## Định nghĩa chuyên ngành
Hệ thống cơ sở dữ liệu NoSQL định hướng tài liệu phân tán, lưu trữ dữ liệu dưới định dạng tuần hoàn nhị phân tương thích JSON (BSON) với khả năng phân mảnh ngang tự động và nhân bản cụm máy chủ.

## Ví dụ
Một ứng dụng mua sắm trực tuyến dùng MongoDB để lưu danh mục sản phẩm, cho phép mặt hàng quần áo chứa các thuộc tính kích cỡ và màu sắc, trong khi mặt hàng điện tử chứa thuộc tính điện áp và thời lượng pin.
