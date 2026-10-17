---
label: "Device shadow"
aliases:
  - "Device twin"
  - "Bản sao trạng thái thiết bị"
loanwords:
  - "device shadow"
plain_descriptions:
  - "bản ghi lưu trạng thái của thiết bị trên đám mây giúp ứng dụng điều khiển ngay cả khi thiết bị mất mạng"
  - "tài liệu ảo đồng bộ giữa cài đặt mong muốn và trạng thái thực tế của máy móc qua mạng"
summary: "Tài liệu ảo được lưu trữ trên nền tảng đám mây, giúp duy trì và đồng bộ hóa trạng thái thực tế lẫn trạng thái mong muốn của thiết bị IoT ngay cả khi kết nối mạng chập chờn."
confusable_notes:
  digital-twin: "Device shadow là tệp tài liệu JSON gọn nhẹ lưu trữ trạng thái đồng bộ (mong muốn và thực tế) của phần cứng, trong khi digital twin là mô hình mô phỏng kỹ thuật số hoàn chỉnh chứa cả thuật toán vật lý và lịch sử vận hành sâu rộng."
  lwm2m: "Device shadow là mô hình đám mây lưu trữ trạng thái bản sao của thiết bị dưới dạng tệp JSON, trong khi LwM2M là chuẩn giao thức quản lý thiết bị hoàn chỉnh với mô hình đối tượng số hóa chuẩn tắc và tập lệnh CoAP."
follow_up_questions:
  - "Cơ chế đối soát delta giữa trạng thái mong muốn (desired) và trạng thái báo cáo (reported) diễn ra như thế nào?"
  - "Các chủ đề MQTT (topics) nào được sử dụng để tự động gửi thông báo đồng bộ khi thiết bị ngoại tuyến kết nối lại?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một chiếc bảng thông báo đặt trước cửa phòng: bạn viết các yêu cầu cần làm lên bảng trong lúc người trợ lý đi vắng; ngay khi bước vào phòng, người trợ lý đọc bảng, thực hiện yêu cầu rồi ghi xác nhận hoàn thành lại lên bảng.

## Chi tiết
Trong các nền tảng đám mây như AWS IoT hay Azure IoT Hub, device shadow (hay device twin) là một tài liệu JSON được lưu trữ liên tục. Bản ghi này có hai nhánh chính: nhánh "desired" (trạng thái mong muốn do ứng dụng người dùng thiết lập, ví dụ như nhiệt độ phòng mong muốn) và nhánh "reported" (trạng thái thực tế do thiết bị phản hồi). Khi thiết bị ngoại tuyến, người dùng vẫn có thể xem lại thông số đo gần nhất hoặc đặt cấu hình mới. Khi có mạng trở lại, máy chủ sẽ tự động gửi gói tin chênh lệch (delta) để thiết bị nạp cấu hình và báo cáo lại.

## Định nghĩa chuyên ngành
Dịch vụ tài liệu ảo lưu trữ trên đám mây giúp tách biệt tương tác tầng ứng dụng khỏi kết nối vật lý trực tiếp, duy trì đồng bộ trạng thái mong muốn và trạng thái phản hồi của thiết bị IoT.

## Ví dụ
Người dùng dùng ứng dụng di động bật bình nước nóng ở nhà trong khi hệ thống mạng Wi-Fi tại nhà đang bị mất kết nối; đám mây lưu trạng thái bật vào device shadow và ngay khi có mạng trở lại, bình nóng lạnh lập tức nhận lệnh và bật đun nước.
