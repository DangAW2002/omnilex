---
label: Data lake
aliases:
  - hồ dữ liệu
loanwords:
  - data lake
plain_descriptions:
  - kho chứa khổng lồ lưu giữ mọi loại dữ liệu thô ở định dạng gốc cho đến khi cần dùng đến
  - bể chứa dữ liệu linh hoạt chứa cả tệp âm thanh, video, nhật ký hệ thống mà không bắt buộc tạo bảng
summary: Kho lưu trữ tập trung có khả năng lưu giữ khối lượng lớn dữ liệu thô ở định dạng nguyên bản, từ dữ liệu có cấu trúc đến phi cấu trúc.
confusable_notes:
  data-warehouse: Data lake lưu trữ khối lượng lớn dữ liệu thô chưa qua xử lý theo mô hình schema-on-read, còn data warehouse tổ chức dữ liệu sạch theo mô hình schema-on-write định sẵn.
follow_up_questions:
  - Những chiến lược quản trị dữ liệu nào giúp ngăn ngừa hồ dữ liệu bị biến thành một "vũng lầy dữ liệu" không thể kiểm soát?
  - Các định dạng bảng mở như Apache Iceberg hay Delta Lake bổ sung tính năng giao dịch ACID cho hồ dữ liệu ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như một hồ nước tự nhiên tiếp nhận nước từ nhiều con suối: nước cứ thế chảy vào hồ và đọng lại nguyên sơ, khi nào cần tưới cây hay lọc nước sinh hoạt thì mới bơm ra xử lý.

## Chi tiết
Hồ dữ liệu tận dụng dung lượng lưu trữ đám mây giá rẻ (như Amazon S3 hay Azure Blob Storage). Thay vì bắt dữ liệu phải vào khuôn khổ trước khi lưu, hồ dữ liệu áp dụng nguyên tắc đọc mới định nghĩa cấu trúc (schema-on-read), giúp các chuyên gia dữ liệu tự do khám phá và huấn luyện mô hình máy học.

## Định nghĩa chuyên ngành
Kiến trúc lưu trữ dữ liệu quy mô lớn cho phép giữ lại toàn bộ dữ liệu thô chưa biến đổi từ nhiều nguồn phát sinh theo mô hình schema-on-read.

## Ví dụ
Lưu trữ toàn bộ nhật ký máy chủ, hình ảnh hóa đơn quét từ camera và tệp âm thanh ghi âm cuộc gọi hỗ trợ vào Amazon S3 để phân tích sau.
