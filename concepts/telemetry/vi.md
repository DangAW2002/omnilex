---
label: Telemetry
aliases:
  - "Đo từ xa"
loanwords:
  - "telemetry"
plain_descriptions:
  - quá trình tự động thu thập các chỉ số vận hành từ xa và gửi về trạm theo dõi trung tâm
  - dòng dữ liệu đo đạc liên tục từ các thiết bị hiện trường truyền về hệ thống điều hành
summary: Quá trình tự động đo lường, thu thập các chỉ số hoạt động từ những thiết bị ở xa và truyền tải dữ liệu về trung tâm giám sát.
confusable_notes: {}
follow_up_questions:
  - Cơ sở dữ liệu chuỗi thời gian tối ưu việc lưu trữ và truy vấn luồng dữ liệu đo từ xa tần suất cao như thế nào?
  - Các định dạng nhị phân như Protocol Buffers hay CBOR giúp tiết kiệm dung lượng truyền dữ liệu đo từ xa ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Telemetry (đo từ xa) hoạt động như chiếc đồng hồ đeo tay theo dõi nhịp tim cho máy móc: thay vì cử kỹ thuật viên cầm sổ đi ghi số liệu từng trạm bơm hay cột điện gió, máy móc tự động đo nhiệt độ, áp suất rồi bắn dữ liệu về phòng điều hành từng giây.

## Chi tiết
Quy trình telemetry bao gồm việc lấy mẫu cảm biến, gắn nhãn thời gian chính xác (timestamp), đóng gói dữ liệu và truyền đi qua các giao thức mạng như MQTT hay CoAP. Để tránh quá tải đường truyền viễn thông 4G, các thiết bị thường áp dụng kỹ thuật lọc vùng chết (deadband) - chỉ phát tin khi giá trị đo đạc thay đổi vượt quá một ngưỡng nhất định. Tại máy chủ trung tâm, dữ liệu được tiếp nhận qua hàng đợi thông điệp và lưu vào cơ sở dữ liệu chuỗi thời gian (Time-Series DB) để vẽ biểu đồ và kích hoạt cảnh báo.

## Định nghĩa chuyên ngành
Quá trình tự động hóa cao ghi nhận các thông số vận hành thực tế và gửi dữ liệu từ các nguồn ở xa qua kênh viễn thông về thiết bị tiếp nhận để phục vụ theo dõi và chẩn đoán.

## Ví dụ
Hệ thống xe buýt điện thông minh tại Hà Nội tự động truyền dữ liệu đo từ xa về nhiệt độ khối pin, dòng điện động cơ và tốc độ xe về trung tâm điều hành mỗi 3 giây một lần.
