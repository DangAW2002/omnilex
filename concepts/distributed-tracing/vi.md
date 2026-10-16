---
label: Distributed tracing
aliases:
  - Truy vết phân tán
  - Theo dấu phân tán
loanwords:
  - distributed tracing
plain_descriptions:
  - theo dõi hành trình của một yêu cầu khi nó đi qua hàng loạt dịch vụ nhỏ để tìm ra nơi bị nghẽn
  - bản đồ ghi lại đường đi và thời gian thực thi của một thao tác qua nhiều máy chủ khác nhau
summary: >-
  Phương pháp giám sát theo dõi toàn bộ vòng đời của một yêu cầu thực thi khi nó luân chuyển qua nhiều dịch vụ và tiến
  trình phân tán trên mạng.
confusable_notes: {}
follow_up_questions:
  - Cơ chế lan truyền ngữ cảnh (context propagation) qua tiêu đề HTTP kết nối các chặng truy vết (span) như thế nào?
  - Chiến lược lấy mẫu nào giúp ghi lại các yêu cầu bị chậm bất thường mà không làm tràn bộ nhớ lưu trữ?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Tương tự như mã vận đơn chuyển phát nhanh: khi gói hàng đi qua bưu cục gửi, kho trung chuyển, trạm hải quan rồi tới tay người nhận, mỗi chặng đều quét mã để lưu lại ngày giờ chính xác.

## Chi tiết
Khi yêu cầu của người dùng tới cổng kết nối API, hệ thống gán một mã định danh vết duy nhất (trace ID) vào tiêu đề mạng. Khi yêu cầu được chuyển tiếp qua các dịch vụ nội bộ, cơ sở dữ liệu và hàng đợi tin nhắn, mỗi nơi đều ghi lại thời gian xử lý của mình (span). Công cụ phân tích sẽ ghép nối thành biểu đồ thác nước giúp nhận diện ngay điểm nghẽn.

## Định nghĩa chuyên ngành
Luồng viễn trắc toàn trình liên kết các khoảng thời gian thực thi mang tính nhân quả qua ranh giới các tiến trình phân tán bằng phương thức lan truyền siêu dữ liệu ngữ cảnh.

## Ví dụ
Một bản truy vết cho thấy thao tác đặt hàng mất 1.200 mili-giây, trong đó có tới 950 mili-giây là do chờ phản hồi từ cổng thanh toán của ngân hàng đối tác.
