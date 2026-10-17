---
label: Modbus
aliases: []
loanwords:
  - "modbus"
plain_descriptions:
  - giao thức công nghiệp kinh điển giao tiếp giữa thiết bị chủ và thiết bị tớ qua thanh ghi số
  - chuẩn truyền thông nối tiếp và tcp đơn giản phổ biến nhất trong hệ thống tự động hóa
summary: Giao thức truyền thông công nghiệp theo mô hình chủ - tớ (master/slave) được sử dụng rộng rãi để đọc và ghi các bảng thanh ghi dữ liệu qua đường truyền nối tiếp hoặc mạng Ethernet.
confusable_notes:
  can-bus: "Modbus bắt buộc phải theo mô hình master-slave trong đó thiết bị tớ chỉ được phản hồi khi máy chủ thăm dò, còn CAN bus phân xử tranh chấp đường truyền theo mức ưu tiên của gói tin cho phép mọi thiết bị chủ động phát tin khi cần."
  opc-ua: Modbus truyền dữ liệu qua các bảng thanh ghi 16-bit và cờ nhị phân thô không có mã hóa, trong khi OPC UA là mô hình hướng đối tượng đa tầng có gắn ngữ nghĩa và chứng chỉ bảo mật đầy đủ.
follow_up_questions:
  - Sự khác biệt về cấu trúc khung truyền giữa Modbus RTU nhị phân qua cổng RS-485 và gói tin Modbus TCP qua cổng 502 là gì?
  - Vì sao giao thức Modbus nguyên bản không có cơ chế xác thực và các tường lửa công nghiệp bảo vệ đường truyền thanh ghi này ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Modbus giống như một cuốn sổ cái kế toán được đánh số thứ tự từng dòng: máy tính điều khiển gọi điện hỏi thiết bị tớ "cho tôi đọc giá trị ở dòng 40001", thiết bị tớ chỉ việc đọc đúng con số ghi trong ô đó mà không cần mật khẩu hay kiểm tra phức tạp.

## Chi tiết
Do hãng Modicon phát minh năm 1979, Modbus vận hành theo cơ chế hỏi - đáp (polling) giữa một thiết bị chủ (Master) và nhiều thiết bị tớ (Slave). Dữ liệu phân bổ vào bốn bảng nhớ: ngõ vào rời rạc (Discrete Inputs), cờ điều khiển (Coils), thanh ghi ngõ vào (Input Registers) và thanh ghi lưu giữ 16-bit (Holding Registers). Hai biến thể phổ biến nhất là Modbus RTU (truyền nhị phân nén qua cổng nối tiếp RS-485 kèm mã kiểm tra CRC) và Modbus TCP (chạy trên mạng Ethernet qua cổng TCP 502). Vì không có mã hóa nội tại, Modbus cần được cô lập trong các mạng nội bộ an toàn.

## Định nghĩa chuyên ngành
Giao thức truyền thông tầng ứng dụng mở theo mô hình chủ - tớ phục vụ việc trao đổi dữ liệu số giữa các thiết bị tự động hóa thông qua đường truyền nối tiếp hoặc mạng IP.

## Ví dụ
Hệ thống quản lý tòa nhà dùng giao thức Modbus RTU đọc thông số dòng điện và điện áp ba pha từ đồng hồ công tơ điện tử qua cáp xoắn đôi RS-485 về máy tính trung tâm.
