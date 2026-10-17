---
label: "General-purpose input/output (GPIO)"
aliases:
  - "GPIO"
  - "Chân vào ra đa dụng"
loanwords:
  - "gpio"
autolink:
  aliases:
    GPIO: always
plain_descriptions:
  - "các chân kim loại trên vi mạch cho phép phần mềm bật tắt hoặc đọc tín hiệu điện"
  - "cổng vào ra kỹ thuật số đa năng dùng để cắm nối với đèn LED, nút bấm và cảm biến"
summary: "Các chân tín hiệu số trên vi mạch tích hợp mà phần mềm có thể linh hoạt lập trình để đóng vai trò làm đầu vào đọc dữ liệu hoặc đầu ra điều khiển thiết bị điện tử."
confusable_notes: {}
follow_up_questions:
  - "Điện trở kéo lên (pull-up) và kéo xuống (pull-down) bên trong chân GPIO có tác dụng chống trạng thái trôi nổi ra sao?"
  - "Cơ chế ngắt phần cứng trên chân GPIO giúp vi điều khiển thức giấc ngay khi có tín hiệu nút bấm như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy hình dung các chân GPIO như những chiếc công tắc và chuông cửa mini trên vi mạch: phần mềm có thể gạt công tắc để cấp điện thắp sáng bóng đèn, hoặc ngồi lắng nghe xem có ai bấm chuông cửa hay không.

## Chi tiết
Chân tín hiệu vào ra đa năng GPIO là cầu nối trực tiếp giữa mã lệnh phần mềm và mạch điện tử vật lý bên ngoài. Bằng các câu lệnh trong chương trình, mỗi chân có thể được cấu hình thành ngõ vào (input) để đo xem điện áp đang ở mức cao (logic 1) hay mức thấp (logic 0), hoặc ngõ ra (output) để phát điện áp điều khiển rơ-le và đèn báo. Các vi điều khiển hiện đại còn tích hợp sẵn điện trở kéo nội bộ và bộ bắt ngắt tín hiệu, cho phép vi xử lý phản ứng trong vòng vài phần triệu giây khi có thay đổi trạng thái điện áp.

## Định nghĩa chuyên ngành
Giao diện chân tín hiệu số có thể cấu hình linh hoạt trên linh kiện bán dẫn, cho phép lập trình hướng truyền tín hiệu (đầu vào hoặc đầu ra), điện trở đệm và khả năng kích hoạt ngắt phần cứng thông qua các thanh ghi điều khiển.

## Ví dụ
Một mạch cảnh báo thông minh cài đặt chân GPIO số 2 làm ngõ vào để nhận tín hiệu báo động từ công tắc cửa từ, và chân GPIO số 4 làm ngõ ra để đóng rơ-le kích hoạt còi hú khi cửa bị cạy.
