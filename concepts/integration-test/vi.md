---
label: "Integration test"
aliases:
  - "Kiểm thử tích hợp"
loanwords:
  - "integration test"
plain_descriptions:
  - "kiểm tra xem các phần khác nhau của phần mềm khi ghép nối lại có chạy trơn tru không"
  - "bài test kiểm tra sự phối hợp giữa mã nguồn với cơ sở dữ liệu và các dịch vụ liên quan"
summary: "Bài kiểm thử tự động nhằm xác minh nhiều thành phần, module hoặc hệ thống kết nối có thể phối hợp và truyền nhận dữ liệu chính xác với nhau."
confusable_notes:
  unit-test: "Kiểm thử tích hợp xác minh tương tác giữa các thành phần, cơ sở dữ liệu hoặc dịch vụ, trong khi kiểm thử đơn vị đánh giá một đơn vị logic đơn lẻ trong sự cô lập hoàn toàn."
follow_up_questions:
  - "Làm thế nào để duy trì tốc độ kiểm thử khi bài test phải kết nối với cơ sở dữ liệu thực?"
  - "Những chiến lược nào giúp giảm thiểu tình trạng bài test chạy chập chờn (flaky test) trong quy trình CI?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Sau khi kiểm tra động cơ và vô lăng hoạt động tốt lúc đứng yên, bạn lắp chúng vào khung gầm để kiểm tra xem khi đánh lái thì bánh xe có chuyển hướng mượt mà không.

## Chi tiết
Kiểm thử tích hợp tập trung vào các mối nối giữa những thành phần phần mềm. Khác với kiểm thử đơn vị, bài kiểm thử này thường tương tác với hạ tầng thật như cơ sở dữ liệu, hàng đợi thông điệp hoặc bộ nhớ đệm để phát hiện sai lệch định dạng dữ liệu, xung đột giao dịch và lỗi kết nối mạng.

## Định nghĩa chuyên ngành
Quy trình thẩm định tự động kiểm tra tính toàn vẹn của hợp đồng giao diện, quy trình truyền tải dữ liệu và sự tương tác giữa các hệ thống con và tầng hạ tầng tích hợp.

## Ví dụ
Kiểm thử luồng đặt món ăn: khi người dùng bấm thanh toán, hệ thống phải vừa ghi dữ liệu vào cơ sở dữ liệu MySQL, vừa bắn thông báo sang hàng đợi RabbitMQ cho tài xế.
