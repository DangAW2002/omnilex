---
label: RabbitMQ
aliases: []
loanwords:
  - RabbitMQ
plain_descriptions:
  - phần mềm trung gian mã nguồn mở định tuyến công việc chạy ngầm an toàn giữa các chương trình
  - bưu tá trung gian tiếp nhận, lưu trữ và chia việc cho các máy chủ xử lý đang rảnh rỗi
summary: Phần mềm môi giới tin nhắn mã nguồn mở giúp định tuyến thông điệp giữa các ứng dụng phân tán qua giao thức như AMQP.
confusable_notes: {}
follow_up_questions:
  - Các loại exchange direct, topic và fanout trong RabbitMQ khác nhau như thế nào về logic định tuyến?
  - Trong điều kiện hệ thống nào thì đội ngũ kỹ thuật nên ưu tiên RabbitMQ thay vì Apache Kafka?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một bưu cục trung tâm nơi thư từ gửi đến được phân loại vào các ngăn tủ riêng, và nhân viên giao hàng sẽ rút từng lá thư ra để đi phát ngay khi vừa xong việc trước.

## Chi tiết
RabbitMQ được xây dựng trên nền tảng Erlang OTP giúp xử lý đồng thời và đảm bảo độ tin cậy cao. Ứng dụng nguồn gửi tin nhắn đến các trạm exchange, nơi này căn cứ vào khóa routing key và quy tắc binding để chuyển tin vào các hàng đợi FIFO. Ứng dụng xử lý lấy việc từ hàng đợi, xác nhận hoàn thành, hoặc kích hoạt cơ chế thử lại và đưa vào hàng đợi lỗi khi gặp sự cố.

## Định nghĩa chuyên ngành
Hệ thống phần mềm môi giới hàng đợi tin nhắn phân tán triển khai chuẩn giao thức AMQP, cung cấp cơ chế định tuyến đa dạng, xác nhận nhận tin và ngữ nghĩa chuyển phát linh hoạt.

## Ví dụ
Một website chỉnh sửa ảnh đưa các yêu cầu nén video vào hàng đợi RabbitMQ để bốn máy chủ ngầm tự động nhận việc xử lý mà không làm nghẽn giao diện người dùng.
