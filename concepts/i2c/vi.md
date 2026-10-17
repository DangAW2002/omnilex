---
label: "I²C"
aliases:
  - "I2C"
  - "Inter-Integrated Circuit"
loanwords:
  - "i2c"
  - "i²c"
autolink:
  aliases:
    I2C: always
plain_descriptions:
  - "chuẩn giao tiếp hai dây cho phép kết nối nhiều cảm biến vào cùng một vi điều khiển"
  - "giao thức truyền thông nối tiếp dùng một dây xung nhịp và một dây dữ liệu có định địa chỉ"
summary: "Chuẩn giao tiếp nối tiếp đồng bộ sử dụng hai đường dây hai chiều (SCL và SDA) có điện trở kéo lên nguồn để kết nối vi điều khiển với nhiều vi mạch ngoại vi trên cùng một bo mạch."
confusable_notes:
  spi-bus: "I²C chỉ cần hai dây chung cho mọi linh kiện nhờ cơ chế định địa chỉ bằng phần mềm, trong khi SPI dùng bốn dây và cần một đường chọn chip (CS) riêng cho từng thiết bị ngoại vi."
  uart: "I²C là bus đồng bộ có dây cấp xung nhịp chung cho phép ghép nhiều chip trên cùng đường dây, trong khi UART là giao thức truyền bất đồng bộ trực tiếp giữa hai thiết bị và không có dây xung nhịp."
follow_up_questions:
  - "Nguyên lý cực thu hở (open-drain) cùng điện trở kéo lên giúp nhiều linh kiện chia sẻ đường truyền I²C mà không bị chập mạch ra sao?"
  - "Kỹ thuật kéo giãn xung nhịp (clock stretching) trong I²C hoạt động thế nào khi thiết bị tớ chưa kịp xử lý dữ liệu?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một lớp học dùng chung một dây loa để nói chuyện và một dây gõ nhịp: giáo viên có thể gọi từng học sinh trả lời mà không sợ nhầm lẫn vì mỗi bạn đều có một số thứ tự riêng trên bàn.

## Chi tiết
Được phát minh bởi hãng Philips, giao thức I²C chuyên dùng để kết nối các vi mạch và cảm biến ở cự ly ngắn trên cùng một bản mạch. Toàn bộ hệ thống chỉ cần hai đường dây tín hiệu được kéo lên nguồn qua điện trở: đường xung nhịp SCL (Serial Clock) và đường dữ liệu SDA (Serial Data). Thiết bị chủ khởi tạo phiên giao tiếp bằng điều kiện START, gửi địa chỉ 7-bit hoặc 10-bit kèm chỉ định đọc/ghi, rồi đợi xung xác nhận ACK từ thiết bị tớ. Các tốc độ thông dụng bao gồm chế độ tiêu chuẩn (100 kbps), chế độ nhanh (400 kbps) và chế độ nhanh nâng cao (1 Mbps).

## Định nghĩa chuyên ngành
Cấu trúc bus truyền thông nối tiếp đồng bộ hai dây hai chiều theo cơ chế cực máng hở (open-drain), hỗ trợ nhiều thiết bị với hệ thống định địa chỉ phần cứng và cơ chế phân xử xung đột đường truyền.

## Ví dụ
Một mạch đo môi trường gắn cảm biến áp suất khí quyển, cảm biến độ ẩm không khí và chip đồng hồ thời gian thực vào chung hai chân I²C của vi điều khiển thông qua các địa chỉ riêng biệt 0x76, 0x40 và 0x68.
