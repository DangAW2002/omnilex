---
label: Block storage
aliases: []
loanwords:
  - block storage
plain_descriptions:
  - ổ cứng ảo gắn trực tiếp vào máy chủ đám mây để cài hệ điều hành hoặc cơ sở dữ liệu
  - dịch vụ lưu trữ tốc độ cao chia thành từng khối dung lượng cố định cho máy ảo
summary: Kiến trúc lưu trữ chia nhỏ dữ liệu thành các khối thô có kích thước cố định, gắn kết vào máy ảo như một ổ đĩa cục bộ phục vụ các tác vụ đọc ghi tốc độ cao.
confusable_notes:
  object-storage: Block storage đóng vai trò như ổ cứng thô để định dạng hệ thống tệp và chạy cơ sở dữ liệu, còn object storage lưu trữ tệp hoàn chỉnh truy cập qua giao thức web HTTP.
follow_up_questions:
  - Chỉ số IOPS (số thao tác đọc ghi mỗi giây) và thông lượng băng thông quyết định hiệu năng của cơ sở dữ liệu trên ổ đĩa block ra sao?
  - Tính năng tạo ảnh chụp nhanh (snapshot) theo thời điểm giúp sao lưu và phục hồi dữ liệu ổ đĩa sang vùng khác như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc cắm một chiếc ổ cứng thể rắn SSD gắn ngoài vào cổng máy tính: hệ điều hành nhận diện ổ đĩa, cho phép định dạng phân vùng (NTFS hay ext4) và đọc ghi dữ liệu siêu tốc.

## Chi tiết
Lưu trữ khối tách rời các cụm ổ cứng vật lý khỏi máy chủ tính toán qua mạng lưu trữ chuyên dụng (SAN). Máy ảo gắn kết các ổ đĩa này như các thiết bị khối cục bộ (như /dev/sda). Hệ điều hành bên trong máy ảo trực tiếp tổ chức cấu trúc tệp hoặc bảng cơ sở dữ liệu lên từng khối dữ liệu (block 4KB) với độ trễ thấp và tốc độ xử lý I/O cao.

## Định nghĩa chuyên ngành
Công nghệ lưu trữ cấp phát các phân vùng khối thô thông qua các giao thức mạng lưu trữ chuyên biệt (như iSCSI hoặc NVMe-oF) tới các máy chủ tính toán, cho phép hệ điều hành tùy ý tạo hệ thống tệp và tối ưu hiệu năng đọc ghi ngẫu nhiên.

## Ví dụ
Một hệ thống cơ sở dữ liệu giao dịch PostgreSQL chạy trên máy chủ đám mây được gắn ổ đĩa lưu trữ khối dung lượng 500 GB với cam kết tốc độ 3.000 IOPS để đáp ứng nhu cầu ghi dữ liệu hóa đơn liên tục.
