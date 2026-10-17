---
label: Materialized view
aliases:
  - khung nhìn cụ thể hóa
  - view vật lý
loanwords:
  - Materialized view
plain_descriptions:
  - bảng báo cáo cơ sở dữ liệu lưu sẵn kết quả tính toán xuống ổ cứng để xem lại ngay lập tức
  - việc chạy trước một phép ghép bảng phức tạp tốn thời gian rồi cất bản kết quả đó lên ổ đĩa
summary: Đối tượng cơ sở dữ liệu chứa kết quả tính toán sẵn của một câu truy vấn được lưu trữ vật lý trên ổ đĩa để truy xuất tốc độ cao.
confusable_notes: {}
follow_up_questions:
  - Sự khác nhau trong vận hành giữa làm mới toàn bộ (complete refresh) và làm mới tăng dần (incremental refresh) là gì?
  - Khi nào kiến trúc sư nên chọn materialized view trong cơ sở dữ liệu thay vì bộ nhớ đệm Redis ở tầng ứng dụng?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc chụp ảnh lại bảng thực đơn đặc biệt của nhà hàng: thay vì mỗi lần khách hỏi lại phải chạy vào bếp hỏi đầu bếp hôm nay còn những món gì và giá bao nhiêu, người phục vụ chỉ cần mở bức ảnh đã chụp sẵn ra xem.

## Chi tiết
Một khung nhìn (view) thông thường trong cơ sở dữ liệu chỉ là một câu lệnh truy vấn ảo, mỗi lần gọi đến nó hệ thống lại phải chạy lại toàn bộ các phép kết nối và tính tổng từ đầu. Ngược lại, materialized view chạy câu lệnh đó một lần rồi ghi trực tiếp kết quả xuống ổ đĩa như một bảng dữ liệu thật. Bảng này có thể đánh chỉ mục riêng và làm mới định kỳ, giúp các câu truy vấn báo cáo phức tạp trả về kết quả chỉ trong vài mili giây.

## Định nghĩa chuyên ngành
Đối tượng lược đồ cơ sở dữ liệu bền vững lưu giữ tập kết quả vật lý cụ thể hóa của một câu truy vấn phức tạp trên ổ đĩa, hỗ trợ các cơ chế làm mới định kỳ, thủ công hoặc kích hoạt theo sự kiện.

## Ví dụ
Một cổng thông tin tài chính tạo một materialized view làm mới mỗi giờ một lần ghép nối 5 bảng dữ liệu để hiển thị tổng doanh số theo vùng, phục vụ hàng nghìn người xem chỉ trong 2 mili giây.
