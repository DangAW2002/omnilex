---
label: Prometheus
qualifier: (Giám sát)
aliases:
  - Hệ thống giám sát Prometheus
loanwords:
  - prometheus
plain_descriptions:
  - phần mềm nguồn mở định kỳ thu thập và lưu trữ các con số đo lường hiệu năng của máy chủ theo dòng thời gian
  - công cụ giám sát kéo dữ liệu metric về và cho phép kỹ sư tra cứu bằng ngôn ngữ PromQL
summary: >-
  Bộ công cụ giám sát và cảnh báo mã nguồn mở lưu trữ dữ liệu chỉ số theo chuỗi thời gian và hỗ trợ truy vấn đa chiều bằng ngôn ngữ PromQL.
confusable_notes:
  grafana: >-
    Prometheus là cơ sở dữ liệu chuỗi thời gian thu thập metric và phát cảnh báo, trong khi Grafana là nền tảng trực quan hóa hiển thị biểu đồ từ các nguồn như Prometheus.
follow_up_questions:
  - "Mô hình định kỳ kéo dữ liệu (pull) của Prometheus có ưu điểm gì so với việc để ứng dụng tự đẩy dữ liệu (push)?"
  - "Cách gắn nhãn (label) cho từng số đo giúp ích như thế nào khi truy vấn dữ liệu bằng ngôn ngữ PromQL?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như nhân viên ghi chỉ số công tơ điện định kỳ đến từng nhà kiểm tra số đo, ghi vào sổ theo thời gian và báo động ngay nếu có nhà dùng điện tăng đột biến.

## Chi tiết
Prometheus là bộ công cụ giám sát mã nguồn mở chuẩn mực được bảo trợ bởi CNCF, rất phổ biến trong môi trường Kubernetes. Hệ thống hoạt động theo cơ chế kéo (pull): định kỳ gửi yêu cầu HTTP tới các máy chủ ứng dụng để thu thập các số đo hiệu năng. Toàn bộ dữ liệu được lưu vào cơ sở dữ liệu chuỗi thời gian nội bộ đi kèm các cặp nhãn thông tin. Kỹ sư sử dụng ngôn ngữ PromQL để thực hiện các phép tính phức tạp như tính tốc độ tăng trưởng, tỷ lệ lỗi và phần trăm tải. Hệ thống cũng tích hợp bộ phát hiện cảnh báo để chuyển tiếp tới công cụ Alertmanager.

## Định nghĩa chuyên ngành
Hệ thống giám sát chuỗi thời gian đa chiều thu thập dữ liệu chỉ số bằng mô hình kéo và cung cấp ngôn ngữ truy vấn chức năng PromQL.

## Ví dụ
Prometheus thu thập chỉ số từ 40 máy chủ ứng dụng web cứ mỗi 15 giây một lần, ghi nhận số lượng truy vấn và thời gian xử lý kèm các nhãn phân loại theo từng cụm dịch vụ.
