---
label: "LwM2M"
aliases:
  - "Lightweight M2M"
  - "Lightweight Machine-to-Machine"
loanwords:
  - "lwm2m"
autolink:
  label: always
plain_descriptions:
  - "chuẩn giao thức mở quản lý cấu hình và cập nhật phần mềm cho thiết bị iot tài nguyên yếu"
  - "giao thức gọn nhẹ chạy trên CoAP dùng để giám sát từ xa các vi điều khiển công suất thấp"
summary: "Giao thức mở quản lý thiết bị chuẩn hóa bởi Open Mobile Alliance, tối ưu cho việc truyền dữ liệu cảm biến, cấu hình và cập nhật firmware trên phần cứng hạn chế tài nguyên."
confusable_notes:
  device-shadow: "LwM2M là chuẩn giao thức quản lý thiết bị hoàn chỉnh với mô hình đối tượng số hóa chuẩn tắc và tập lệnh CoAP, trong khi device shadow là mô hình đám mây lưu trữ trạng thái bản sao của thiết bị dưới dạng tệp JSON."
follow_up_questions:
  - "Bảng danh mục Đối tượng (Object) và Tài nguyên (Resource) của LwM2M giúp các nhà sản xuất đồng hồ đo đạt tính tương thích như thế nào?"
  - "LwM2M hỗ trợ việc nạp các gói cập nhật phần mềm vi sai (delta OTA) qua mạng NB-IoT băng thông hẹp ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một chiếc điều khiển từ xa có ngôn ngữ chung, cho phép các kỹ sư đô thị kiểm tra pin, cài đặt lại cấu hình và cập nhật phần mềm cho hàng vạn chiếc đồng hồ nước của các hãng sản xuất khác nhau bằng các câu lệnh giống hệt nhau.

## Chi tiết
Được phát triển bởi Open Mobile Alliance (OMA), LwM2M hoạt động trên nền tảng CoAP qua giao thức UDP hoặc SMS, được bảo mật bằng DTLS hoặc OSCORE. Giao thức này tổ chức dữ liệu theo mô hình đối tượng hướng cấu trúc, trong đó mỗi chức năng được gán một mã số chuẩn hóa (như Đối tượng 3 chứa thông tin thiết bị, Đối tượng 5 phục vụ nâng cấp firmware). LwM2M vận hành qua bốn giao diện chính: Khởi tạo khóa bảo mật (Bootstrap), Đăng ký thiết bị (Registration), Quản lý thiết bị (Device Management) và Báo cáo dữ liệu (Information Reporting).

## Định nghĩa chuyên ngành
Giao thức tầng ứng dụng và quản trị tài nguyên chuẩn hóa bởi OMA phục vụ thu thập dữ liệu đo đạc, thiết lập thông số và cập nhật vi mã từ xa cho các nút mạng nhúng hạn chế phần cứng.

## Ví dụ
Công ty cấp nước triển khai máy chủ LwM2M để quản lý, đọc số nước tiêu thụ, kiểm tra mức pin và cập nhật phần mềm định kỳ cho tám mươi nghìn đồng hồ nước thông minh lắp đặt tại các hộ dân.
