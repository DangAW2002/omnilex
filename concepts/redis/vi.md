---
label: Redis
aliases: []
loanwords:
  - Redis
plain_descriptions:
  - kho dữ liệu siêu tốc trên bộ nhớ RAM dùng làm bộ đệm để tăng tốc độ trang web
  - phần mềm ghi nhớ tức thì các phép đếm và thông tin người dùng chỉ trong một phần nghìn giây
summary: Kho lưu trữ cấu trúc dữ liệu trên bộ nhớ mã nguồn mở được dùng làm cơ sở dữ liệu tốc độ cao, bộ nhớ đệm, môi giới tin nhắn và công cụ luồng.
confusable_notes: {}
follow_up_questions:
  - Cơ chế vòng lặp sự kiện đơn luồng trong Redis giúp loại bỏ xung đột khóa khi phục vụ truy vấn dưới mili giây ra sao?
  - Các tùy chọn lưu trữ bền bỉ (ảnh chụp RDB và nhật ký ghi nối AOF) bảo vệ dữ liệu chống mất mát khi mất điện RAM thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc để chìa khóa xe và ví tiền ngay trên bàn cạnh cửa ra vào: bạn có thể cầm lấy ngay lập tức khi bước ra khỏi nhà mà không phải mất thời gian chạy lên lầu lục tìm trong ngăn kéo tủ.

## Chi tiết
Redis lưu toàn bộ dữ liệu trực tiếp trên bộ nhớ RAM của hệ thống, mang lại tốc độ đọc và ghi cực nhanh dưới một phần nghìn giây. Ngoài chuỗi ký tự thông thường, Redis hỗ trợ sẵn nhiều cấu trúc dữ liệu phong phú: danh sách liên kết, tập hợp, tập hợp có thứ tự (sorted set dùng cho bảng xếp hạng), bảng băm và luồng dữ liệu. Hệ thống hỗ trợ sao lưu ngầm xuống ổ cứng định kỳ (RDB và AOF) để bảo toàn dữ liệu khi khởi động lại.

## Định nghĩa chuyên ngành
Máy chủ cấu trúc dữ liệu khóa - giá trị chạy trên bộ nhớ RAM mã nguồn mở, thực thi các thao tác thông qua vòng lặp sự kiện I/O đơn luồng không nghẽn với cam kết phản hồi dưới mili giây.

## Ví dụ
Một tựa game trực tuyến dùng cấu trúc Sorted Set trong Redis để duy trì bảng xếp hạng top 100 game thủ thời gian thực, tính toán cập nhật thứ hạng cho 50.000 người chơi trong chưa đầy 2 mili giây.
