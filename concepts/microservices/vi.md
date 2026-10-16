---
label: "Microservices"
aliases:
  - "Kiến trúc vi dịch vụ"
loanwords:
  - "microservices"
  - "microservice"
plain_descriptions:
  - "xây dựng phần mềm thành tập hợp các dịch vụ nhỏ chạy độc lập và kết nối qua mạng"
  - "mô hình kiến trúc nơi mỗi chức năng kinh doanh là một chương trình riêng biệt tự triển khai"
summary: "Mô hình kiến trúc phần mềm phân chia ứng dụng thành tập hợp các dịch vụ nhỏ, liên kết lỏng lẻo, có thể triển khai độc lập và giao tiếp với nhau qua các giao thức mạng gọn nhẹ."
confusable_notes:
  {}
follow_up_questions:
  - "Những độ phức tạp vận hành nào (như truy vết phân tán và tính nhất quán sau cùng) phát sinh khi chuyển từ hệ thống nguyên khối sang microservices?"
  - "Phương pháp thiết kế hướng miền (Domain-Driven Design) hỗ trợ xác định ranh giới ngữ cảnh (bounded context) cho vi dịch vụ như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Khu phố ẩm thực gồm nhiều ki-ốt độc lập (quán phở, tiệm bánh mì, quán chè) tự quản lý nhân viên và tính tiền riêng, thay vì một nhà hàng khổng lồ nơi tất cả khách phải chen chúc qua một quầy thanh toán duy nhất.

## Chi tiết
Trong kiến trúc microservices, mỗi dịch vụ tập trung vào một năng lực nghiệp vụ cụ thể, sở hữu cơ sở dữ liệu riêng biệt và có thể được viết bằng ngôn ngữ lập trình khác nhau. Các dịch vụ giao tiếp qua HTTP REST, gRPC hoặc hàng đợi thông điệp (message queue). Mô hình này giúp các đội ngũ kỹ thuật làm việc độc lập và mở rộng quy mô linh hoạt, nhưng đòi hỏi hạ tầng điều phối và giám sát phân tán phức tạp.

## Định nghĩa chuyên ngành
Khuôn mẫu kiến trúc phân tán phân rã hệ thống doanh nghiệp thành các dịch vụ tự trị theo ngữ cảnh giới hạn, tương tác qua mạng thông qua các giao diện hợp đồng được chuẩn hóa.

## Ví dụ
Một sàn thương mại điện tử tách riêng dịch vụ thanh toán, dịch vụ quản lý kho hàng và dịch vụ gợi ý sản phẩm thành ba microservices độc lập giao tiếp qua RabbitMQ.
