---
label: Message queue
aliases:
  - hàng đợi thông điệp
  - hàng đợi tác vụ
loanwords:
  - message queue
plain_descriptions:
  - hàng đợi trung gian lưu các công việc để các máy chủ xử lý lần lượt theo thứ tự
  - vùng đệm giữ các tác vụ nặng chạy ngầm giúp trang web không bị treo khi đông người dùng
summary: Thành phần trung gian lưu trữ các thông điệp theo thứ tự để các tiến trình tiêu thụ xử lý bất đồng bộ.
confusable_notes: {}
follow_up_questions:
  - Hàng đợi thư chết (dead-letter queue) giúp xử lý các gói tin lỗi gây nghẽn hệ thống ra sao?
  - Điểm khác biệt cơ bản giữa hàng đợi điểm-tới-điểm và mô hình xuất bản-đăng ký (pub-sub) là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như khay xếp phiếu gọi món ở nhà hàng: bồi bàn cứ gài phiếu vào khay rồi quay ra đón khách tiếp, các đầu bếp bên trong lần lượt rút từng phiếu ra nấu mà không bị quá tải.

## Chi tiết
Hệ thống hàng đợi tách rời bên gửi (producer) và bên nhận (consumer). Bên gửi đẩy gói tin vào hàng đợi mà không cần chờ bên nhận hoàn thành ngay, dữ liệu được giữ an toàn theo cơ chế vào trước ra trước (FIFO) cho tới khi có tiến trình rảnh tay tiếp nhận.

## Định nghĩa chuyên ngành
Cơ chế truyền thông điệp bất đồng bộ phân tán, cung cấp khả năng đệm dữ liệu và phân tách tải giữa các thành phần trong hệ thống phần mềm.

## Ví dụ
Đẩy tác vụ gửi email xác nhận đặt hàng vào RabbitMQ hoặc Kafka để máy chủ web trả về giao diện thành công ngay lập tức cho khách hàng.
