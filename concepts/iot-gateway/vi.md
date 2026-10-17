---
label: Gateway
qualifier: (IoT)
aliases:
  - "IoT gateway"
  - "Cổng kết nối IoT"
loanwords:
  - "gateway"
  - "iot gateway"
autolink:
  label: never
plain_descriptions:
  - thiết bị trung gian thu thập dữ liệu từ cảm biến địa phương rồi chuyển tiếp lên đám mây
  - hộp chuyển đổi kết nối chuyển ngữ các giao thức vô tuyến nội bộ sang mạng internet
summary: Thiết bị phần cứng hoặc phần mềm trung gian có nhiệm vụ thu thập dữ liệu từ mạng cảm biến trường, chuyển đổi giao thức và định tuyến an toàn lên đám mây.
confusable_notes: {}
follow_up_questions:
  - Gateway IoT thực hiện chuyển đổi giao thức giữa cổng truyền thông nối tiếp Modbus sang MQTT đám mây như thế nào?
  - Những tính năng xử lý cục bộ nào giúp gateway duy trì ghi nhận dữ liệu khi kết nối Internet diện rộng bị đứt?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Gateway IoT giống như một thông dịch viên kiêm trạm bưu điện trung tâm: nó gom các mẩu tin từ các cảm biến xung quanh nói những tiếng địa phương như Zigbee, BLE hay RS-485, dịch sang ngôn ngữ chuẩn của Internet rồi đóng gói gửi lên mây.

## Chi tiết
Đứng ở ranh giới giữa mạng thiết bị hiện trường và mạng công nghệ thông tin (IT), gateway IoT đóng vai trò điểm gom và chuẩn hóa dữ liệu. Thiết bị này chuyển tiếp giữa các chuẩn vật lý tầm ngắn (RS-485, Zigbee, BLE) sang các kết nối diện rộng (Ethernet, Wi-Fi, 4G/5G). Ngoài chức năng bắc cầu giao thức, gateway hiện đại còn đảm nhiệm việc lọc bỏ dữ liệu rác, đệm dữ liệu vào bộ nhớ cục bộ khi rớt mạng và thực thi các chứng chỉ bảo mật mã hóa đường truyền.

## Định nghĩa chuyên ngành
Nút giao tiếp liên mạng thực hiện chức năng chuyển đổi giao thức, tiền xử lý dữ liệu và bắc cầu kết nối giữa mạng cảm biến trường và hệ thống máy chủ mạng diện rộng.

## Ví dụ
Bộ gateway công nghiệp gắn tủ điện đọc dữ liệu nhiệt độ từ 10 dàn lạnh kho lạnh qua cổng Modbus RS-485, sau đó đóng gói JSON và gửi qua sóng 4G lên máy chủ đám mây.
