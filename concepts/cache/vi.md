---
label: Cache
qualifier: (Phần mềm)
aliases:
  - bộ nhớ đệm phần mềm
  - bộ nhớ tạm
loanwords:
  - cache
autolink:
  label: never
plain_descriptions:
  - vùng lưu trữ tạm thời tốc độ cao giúp máy chủ trả lời nhanh mà không cần tính lại
  - lưu sẵn kết quả các câu lệnh hay dùng vào bộ nhớ RAM để người dùng không phải chờ lâu
summary: Lớp lưu trữ dữ liệu tạm thời tốc độ cao giúp phục vụ các yêu cầu truy xuất dữ liệu nhanh hơn so với việc đọc từ cơ sở dữ liệu chính.
confusable_notes: {}
follow_up_questions:
  - Những chiến lược làm mới dữ liệu đệm (cache invalidation) phổ biến nhất hiện nay là gì?
  - Hiện tượng dẫm đạp bộ nhớ đệm (cache stampede) xảy ra thế nào và cách phòng tránh ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như việc ghi lại các số điện thoại hay gọi vào mẩu giấy dán ngay trước bàn làm việc, thay vì lần nào cũng phải mở danh bạ dày cộp ra tra cứu.

## Chi tiết
Bộ nhớ đệm hoạt động trên các vùng nhớ tốc độ cao như RAM hoặc Redis. Khi có yêu cầu, hệ thống kiểm tra xem dữ liệu có sẵn trong cache không (cache hit); nếu chưa có (cache miss), hệ thống sẽ đọc từ ổ cứng, trả kết quả và lưu lại một bản sao kèm thời gian hết hạn (TTL).

## Định nghĩa chuyên ngành
Tầng lưu trữ trung gian có độ trễ thấp, lưu bản sao của các tập dữ liệu gốc để giảm tải cho hệ thống lưu trữ chính và tăng tốc độ xử lý.

## Ví dụ
Lưu thông tin giỏ hàng và danh mục hàng khuyến mãi vào Redis để phục vụ hàng vạn khách truy cập cùng lúc trong ngày săn sale.
