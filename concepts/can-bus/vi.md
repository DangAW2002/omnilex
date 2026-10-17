---
label: "CAN bus"
aliases:
  - "Mạng CAN"
  - "Controller Area Network"
loanwords:
  - "can bus"
plain_descriptions:
  - "đường truyền hai dây giúp các vi mạch điều khiển trên ô tô và máy móc tự trao đổi thông tin"
  - "mạng truyền thông nối tiếp chịu nhiễu tốt kết nối các hộp đen điện tử trong xe hơi"
summary: "Chuẩn mạng truyền thông nối tiếp broadcast mạnh mẽ, cho phép các bộ điều khiển điện tử giao tiếp tin cậy qua đường truyền vi sai hai dây trong môi trường nhiều nhiễu như ô tô và công nghiệp."
confusable_notes:
  modbus: "CAN bus phân xử tranh chấp đường truyền theo mức ưu tiên của gói tin (bitwise arbitration) cho phép mọi thiết bị chủ động phát tin khi cần, còn Modbus bắt buộc phải theo mô hình master-slave trong đó thiết bị tớ chỉ được nói khi máy chủ thăm dò."
  bacnet: "CAN bus là bus vật lý nối tiếp cấp thấp cho động cơ ô tô và bo mạch máy móc công nghiệp, trong khi BACnet là chuẩn truyền thông tầng ứng dụng cho tự động hóa hạ tầng tòa nhà (điều hòa, chiếu sáng, thang máy)."
follow_up_questions:
  - "Nguyên lý phân xử bit không phá hủy (bitwise arbitration) giúp giải quyết xung đột khi nhiều vi điều khiển cùng phát dữ liệu ra sao?"
  - "Tại sao cặp dây vi sai CAN High và CAN Low lại có khả năng chống nhiễu điện từ cực kỳ hiệu quả?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/CAN_bus
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một đường dây liên lạc bộ đàm chung trên ô tô kết nối động cơ, phanh và bảng đồng hồ qua chỉ một cặp dây xoắn, nơi tín hiệu khẩn cấp của hệ thống phanh sẽ tự động chiếm quyền ưu tiên để truyền đi ngay tức khắc trước các tín hiệu âm thanh thông thường.

## Chi tiết
Được phát triển bởi Bosch và chuẩn hóa theo tiêu chuẩn quốc tế ISO 11898, mạng CAN vận hành trên đường truyền vi sai hai dây gồm CAN_H và CAN_L. Trong mạng CAN, dữ liệu được phát quảng bá tới toàn bộ các nút mạng mà không dùng địa chỉ thiết bị đích, thay vào đó mỗi khung tin mang một mã định danh xác định mức độ ưu tiên. Khi nhiều vi điều khiển phát tin cùng lúc, cơ chế phân xử bit chiếm ưu thế sẽ nhường quyền truyền cho khung tin có mức ưu tiên cao hơn mà không làm hỏng gói tin hay gây tắc nghẽn mạng.

## Định nghĩa chuyên ngành
Chuẩn bus truyền thông nối tiếp đa chủ dựa trên thông điệp, sử dụng tín hiệu vi sai hai dây và cơ chế phân định quyền ưu tiên theo bit ở tầng phần cứng nhằm đảm bảo tính toàn vẹn dữ liệu.

## Examples
Hệ thống điều khiển trên ô tô sử dụng đường truyền CAN bus tốc độ 500 kbps để liên tục truyền dữ liệu tốc độ bánh xe và lực đạp phanh giữa bộ điều khiển động cơ và hệ thống chống bó cứng phanh (ABS).
