---
label: Schema
qualifier: (Cơ sở dữ liệu)
aliases:
  - lược đồ cơ sở dữ liệu
  - lược đồ dữ liệu
loanwords:
  - schema
autolink:
  label: never
plain_descriptions:
  - bản vẽ thiết kế tổng thể quy định các bảng, cột và quy tắc lưu trữ trong cơ sở dữ liệu
  - khung cấu trúc mô tả định dạng và mối liên hệ giữa các loại dữ liệu
summary: Bản thiết kế cấu trúc chính thức của cơ sở dữ liệu định nghĩa các bảng, trường thông tin, kiểu dữ liệu và các ràng buộc toàn vẹn.
confusable_notes: {}
follow_up_questions:
  - Mô hình định nghĩa cấu trúc khi ghi (schema-on-write) khác gì so với khi đọc (schema-on-read)?
  - Làm thế nào để tránh vi phạm ràng buộc khóa ngoại khi nạp một khối lượng dữ liệu lớn vào cơ sở dữ liệu?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như bản vẽ mặt bằng của một căn nhà: nó quy định vị trí từng phòng, kích thước mỗi phòng và cửa nào thông sang phòng nào.

## Chi tiết
Lược đồ định nghĩa cấu trúc dữ liệu, thiết lập khóa chính (primary key), khóa ngoại (foreign key), kiểu dữ liệu từng cột và các quy tắc kiểm tra tính hợp lệ. Hệ thống cơ sở dữ liệu căn cứ vào schema để đảm bảo dữ liệu ghi vào không bị sai lệch.

## Định nghĩa chuyên ngành
Mô hình tổ chức logic mô tả các thực thể dữ liệu, thuộc tính và mối quan hệ ràng buộc trong một hệ thống quản trị cơ sở dữ liệu.

## Ví dụ
Thiết kế schema cho hệ thống bán vé máy bay gồm bảng `chuyen_bay`, `hanh_khach` và `ve_da_dat` có liên kết khóa ngoại với nhau.
