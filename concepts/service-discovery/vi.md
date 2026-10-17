---
label: Service discovery
aliases: []
loanwords:
  - service discovery
plain_descriptions:
  - cơ chế tự động giúp các dịch vụ phần mềm tìm thấy nhau trong mạng đám mây động
  - danh bạ mạng tự động cập nhật địa chỉ IP liên tục khi máy chủ co giãn hoặc khởi động lại
summary: Cơ chế tự động phát hiện và định vị địa chỉ mạng của các phiên bản dịch vụ trong hệ thống phân tán thông qua một sổ đăng ký cập nhật liên tục.
confusable_notes: {}
follow_up_questions:
  - Sự khác nhau giữa cơ chế khám phá dịch vụ phía client (client-side) và phía máy chủ (server-side) qua load balancer là gì?
  - Hệ thống DNS nội bộ trong Kubernetes (CoreDNS) tự động chuyển hướng lưu lượng đến các container khỏe mạnh ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như ứng dụng gọi xe công nghệ trên điện thoại: hành khách không cần lưu số điện thoại cá nhân của từng tài xế taxi; hệ thống ứng dụng tự động định vị các tài xế đang rảnh ở gần bạn nhất để kết nối đón khách.

## Chi tiết
Trong kiến trúc microservices và môi trường container co giãn liên tục, các máy ảo hoặc pod sinh ra và mất đi khiến địa chỉ IP thay đổi không ngừng. Cơ chế service discovery duy trì một danh bạ trung tâm (như CoreDNS trong Kubernetes hoặc Consul). Khi dịch vụ khởi động, nó tự đăng ký IP vào hệ thống. Các dịch vụ khác chỉ cần gọi qua tên định danh logic (như `auth-service`) mà không cần ghi cứng địa chỉ IP trong mã nguồn.

## Định nghĩa chuyên ngành
Kiến trúc danh bạ mạng phân tán lưu vết trạng thái và vị trí mạng của các thực thể tính toán theo thời gian thực, kết hợp kiểm tra độ khỏe định kỳ (health check) để định tuyến yêu cầu chính xác trong môi trường hạ tầng biến động.

## Ví dụ
Trong một cụm Kubernetes, dịch vụ thanh toán gọi đến cơ sở dữ liệu qua tên miền nội bộ `db-service.production.svc`, hệ thống tự động ánh xạ tên miền này đến đúng địa chỉ IP của container cơ sở dữ liệu đang hoạt động bình thường.
