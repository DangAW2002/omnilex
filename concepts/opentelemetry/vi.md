---
label: OpenTelemetry
aliases:
  - Chuẩn thu thập dữ liệu đo lường OpenTelemetry
loanwords:
  - opentelemetry
plain_descriptions:
  - bộ tiêu chuẩn chung giúp thu thập dấu vết, chỉ số và nhật ký ứng dụng mà không phụ thuộc vào nhà cung cấp cụ thể
  - thư viện lập trình dùng để trích xuất dữ liệu đo lường từ mã nguồn và gửi tới bất kỳ hệ thống phân tích nào
summary: >-
  Khung làm việc mã nguồn mở trung lập của CNCF cung cấp các bộ API, SDK và công cụ chuẩn hóa nhằm tạo và xuất dữ liệu đo lường từ xa.
confusable_notes: {}
follow_up_questions:
  - "Việc sử dụng bộ trung chuyển OpenTelemetry Collector giúp tách rời mã nguồn ứng dụng khỏi các công cụ giám sát cụ thể như thế nào?"
  - "Tại sao chuẩn hóa việc truyền ngữ cảnh dấu vết (trace context) lại giúp theo dõi luồng giao dịch qua các ngôn ngữ lập trình khác nhau một cách mượt mà?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như chiếc đầu chuyển điện đa năng: thay vì phải gắn các loại phích cắm độc quyền khác nhau cho từng món đồ gia dụng, bạn dùng một chuẩn cắm duy nhất vừa vặn với mọi ổ điện trên thế giới.

## Chi tiết
OpenTelemetry (viết tắt là OTel) là dự án chuẩn hóa nguồn mở thuộc CNCF ra đời từ sự hợp nhất giữa OpenTracing và OpenCensus. Dự án định nghĩa mô hình dữ liệu chuẩn cùng các bộ thư viện lập trình (API và SDK) cho phép ghi nhận dấu vết giao dịch, chỉ số hoạt động và nhật ký ứng dụng. Điểm mạnh vượt trội của OpenTelemetry là tính độc lập: lập trình viên chỉ cần nhúng mã một lần là có thể đẩy dữ liệu tới nhiều công cụ phân tích khác nhau mà không bao giờ bị phụ thuộc vào một nhà cung cấp phần mềm duy nhất.

## Định nghĩa chuyên ngành
Khung làm việc và đặc tả kỹ thuật giám sát độc lập chuẩn hóa việc đo lường, thu thập và truyền tải dữ liệu dấu vết, chỉ số và nhật ký phân tán.

## Ví dụ
Một nhóm kỹ thuật nhúng OpenTelemetry vào các dịch vụ viết bằng Go và Node.js để gửi dữ liệu giao dịch về cụm lưu trữ chung, dễ dàng đổi nhà cung cấp phân tích mà không phải sửa mã nguồn.
