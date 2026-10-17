---
label: "Serial Peripheral Interface (SPI)"
aliases:
  - "SPI"
  - "Giao diện ngoại vi nối tiếp"
loanwords:
  - "spi"
  - "spi bus"
autolink:
  aliases:
    SPI: always
plain_descriptions:
  - "chuẩn truyền dữ liệu bốn dây tốc độ cao nối vi điều khiển với thẻ nhớ và màn hình"
  - "giao thức truyền thông nối tiếp đồng bộ cho phép vừa gửi vừa nhận dữ liệu cùng lúc"
summary: "Chuẩn giao tiếp nối tiếp đồng bộ bốn dây tốc độ cao, hỗ trợ truyền dữ liệu song công toàn phần (full-duplex) giữa chip điều khiển chủ và các thiết bị ngoại vi thông qua chân chọn chip."
confusable_notes:
  i2c: "SPI đạt tốc độ truyền dữ liệu cao hơn nhiều (hàng chục MHz) nhờ dùng bốn dây riêng biệt và chân chọn chip cứng, trong khi I²C chỉ dùng hai dây chung nhưng tốc độ thấp hơn."
  uart: "SPI dùng dây xung nhịp đồng bộ để truyền nhận dữ liệu đồng thời hai chiều, trong khi UART truyền bất đồng bộ không có dây xung nhịp và phụ thuộc vào tốc độ baud thỏa thuận trước."
follow_up_questions:
  - "Bốn chế độ truyền dữ liệu của SPI được xác định bởi cực tính xung (CPOL) và pha xung (CPHA) như thế nào?"
  - "Khó khăn lớn nhất khi kết nối quá nhiều thiết bị ngoại vi SPI vào cùng một vi điều khiển là gì?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng hai băng chuyền chạy song song giữa người chỉ huy và công nhân: một băng chuyền chuyển hàng vào và một băng chuyền chuyển hàng ra cùng một lúc, nhịp nhàng theo từng tiếng tích tắc của chiếc đồng hồ gõ nhịp.

## Chi tiết
Được phát triển bởi Motorola, giao thức SPI chuyên dùng cho các đường truyền dữ liệu cự ly ngắn cần tốc độ rất cao trên bo mạch. Hệ thống sử dụng bốn đường dây chính: dây cấp xung nhịp SCLK, dây phát dữ liệu từ chủ sang tớ MOSI, dây nhận dữ liệu từ tớ về chủ MISO và dây kích hoạt chọn chip CS. Nhờ cơ chế truyền đồng bộ song công toàn phần, mỗi nhịp xung nhịp đẩy một bit dữ liệu đi đồng thời ở cả hai chiều. Tốc độ truyền của SPI thường đạt từ 10 MHz đến 80 MHz, rất thích hợp cho việc đọc thẻ nhớ SD, điều khiển màn hình LCD và truyền dữ liệu cho chip nhớ flash.

## Định nghĩa chuyên ngành
Giao tiếp truyền thông nối tiếp đồng bộ bốn dây, hỗ trợ truyền song công toàn phần giữa một thiết bị chủ và các thiết bị ngoại vi thông qua các đường truyền dữ liệu độc lập và tín hiệu chọn mạch phần cứng.

## Ví dụ
Một máy đo y tế truyền dữ liệu sóng điện tim từ chip chuyển đổi analog sang màn hình màu TFT thông qua đường truyền SPI tốc độ 40 MHz để hiển thị biểu đồ tức thì.
