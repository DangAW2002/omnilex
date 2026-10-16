---
label: Observability
aliases:
  - Khả năng quan sát
  - o11y
loanwords:
  - observability
plain_descriptions:
  - khả năng hiểu rõ mọi chuyện đang diễn ra bên trong hệ thống chỉ nhờ vào dữ liệu nó xuất ra
  - năng lực điều tra và tìm ra nguyên nhân gốc rễ của những sự cố phần mềm chưa từng gặp
summary: >-
  Khả năng suy luận và làm rõ trạng thái hoạt động bên trong của hệ thống phần mềm phức tạp thông qua dữ liệu đo lường
  từ xa thu thập được.
confusable_notes: {}
follow_up_questions:
  - >-
    Khả năng quan sát (observability) khác biệt cơ bản thế nào so với việc giám sát (monitoring) dựa trên ngưỡng cố
    định?
  - >-
    Vì sao các trường dữ liệu có độ biến thiên cao (high-cardinality) lại tối quan trọng khi chẩn đoán lỗi trong
    microservices?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như bảng đồng hồ điện tử và máy quét lỗi trên ô tô hiện đại: người thợ sửa xe không cần tháo tung động cơ mà vẫn biết chính xác bugi nào đang bị đánh lửa yếu.

## Chi tiết
Khả năng quan sát được xây dựng trên ba trụ cột dữ liệu chính: số đo định lượng (metrics), nhật ký sự kiện (logs) và vết thực thi phân tán (traces). Sự kết hợp đồng bộ giữa ba loại dữ liệu này giúp kỹ sư phân tích và đặt ra những câu hỏi bất kỳ khi xảy ra sự cố trên môi trường sản xuất mà không cần sửa mã nguồn.

## Định nghĩa chuyên ngành
Đặc tính của kiến trúc phần mềm biểu thị mức độ phản ánh chính xác hành vi nội tại của hệ thống thông qua các tín hiệu viễn trắc gồm số liệu, nhật ký và vết truy vết.

## Ví dụ
Sử dụng hệ thống OpenTelemetry để tìm ra mối liên hệ giữa việc máy chủ cơ sở dữ liệu bị chậm với các giao dịch thanh toán giỏ hàng đi qua ba dịch vụ nội bộ.
