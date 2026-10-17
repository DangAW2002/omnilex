---
label: Data lakehouse
aliases:
  - lakehouse
loanwords:
  - Data lakehouse
  - lakehouse
plain_descriptions:
  - mô hình lưu trữ hiện đại kết hợp chi phí rẻ của kho tệp thô với tốc độ truy vấn của kho dữ liệu
  - kiến trúc cho phép chạy báo cáo kinh doanh và huấn luyện học máy trực tiếp trên cùng một nguồn tệp
summary: Kiến trúc quản lý dữ liệu hiện đại kết hợp khả năng lưu trữ linh hoạt của data lake với tính toàn vẹn ACID của data warehouse.
confusable_notes: {}
follow_up_questions:
  - Các định dạng bảng mở như Delta Lake, Iceberg và Hudi mang tính chất ACID lên lưu trữ đối tượng bằng cách nào?
  - Tại sao kiến trúc lakehouse giúp doanh nghiệp loại bỏ việc sao chép dữ liệu giữa kho lake và kho warehouse?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một kho hàng tổng rộng lớn chứa hàng hóa bán buôn giá rẻ, nhưng bên trong được quy hoạch sẵn các quầy kệ ngăn nắp có dán mã vạch để khách mua lẻ có thể quét tính tiền ngay tại chỗ.

## Chi tiết
Data lakehouse lưu trữ dữ liệu chính dưới dạng các tệp định dạng mở (như Parquet) trên hạ tầng lưu trữ đối tượng chi phí thấp. Một lớp quản lý siêu dữ liệu thông minh (như Apache Iceberg hay Delta Lake) sẽ bổ sung tính năng giao dịch ACID, kiểm soát lược đồ bảng và lưu lịch sử thay đổi, cho phép chạy các câu lệnh SQL báo cáo lẫn các mô hình học máy trên cùng một bản dữ liệu duy nhất.

## Định nghĩa chuyên ngành
Kiến trúc dữ liệu lai triển khai tầng quản trị siêu dữ liệu của kho dữ liệu, khả năng ghi nhật ký giao dịch ACID và các kỹ thuật tối ưu truy vấn trực tiếp trên hạ tầng data lake lưu trữ đối tượng.

## Ví dụ
Một nền tảng xem phim trực tuyến lưu 500 terabyte nhật ký xem video dạng tệp Parquet trên đám mây, cho phép phòng kinh doanh truy vấn số liệu bằng SQL mà không cần chuyển sang kho dữ liệu riêng.
