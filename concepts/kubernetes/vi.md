---
label: Kubernetes
aliases:
  - K8s
loanwords:
  - kubernetes
  - k8s
plain_descriptions:
  - hệ thống điều phối tự động triển khai, mở rộng và tự phục hồi container trên nhiều máy chủ
  - nền tảng tiêu chuẩn quản lý hàng loạt container trong môi trường vận hành lớn
summary: >-
  Hệ thống điều phối container mã nguồn mở giúp tự động hóa quá trình triển khai, mở rộng quy mô, quản lý và tự phục hồi
  các ứng dụng đóng gói trong container.
confusable_notes: {}
follow_up_questions:
  - Cơ sở dữ liệu etcd trong cụm điều khiển giữ vai trò gì để duy trì trạng thái của Kubernetes?
  - Kubernetes tự động phát hiện và thay thế các pod bị lỗi bằng cơ chế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
autolink:
  aliases:
    K8s: always
---

## Giải thích dễ hiểu
Hình dung như vị nhạc trưởng của một dàn nhạc giao hưởng: không trực tiếp chơi từng nhạc cụ, nhạc trưởng điều tiết hàng trăm nghệ sĩ vào đúng nhịp và giữ cho cả buổi biểu diễn luôn hài hòa.

## Chi tiết
Kubernetes kết hợp nhiều máy chủ vật lý hoặc máy ảo thành một cụm thống nhất dưới sự quản lý của cụm điều khiển (control plane). Kỹ sư khai báo trạng thái mong muốn qua tệp cấu hình YAML. Các bộ điều khiển liên tục đối soát: nếu một máy chủ gặp sự cố hoặc ứng dụng bị dừng đột ngột, Kubernetes lập tức điều chuyển container sang máy chủ khỏe mạnh khác.

## Định nghĩa chuyên ngành
Kiến trúc điều khiển phân tán duy trì trạng thái mong muốn đã khai báo của các tải công việc container hóa thông qua vòng lặp hòa giải trạng thái liên tục và API hướng khai báo.

## Ví dụ
Một sàn thương mại điện tử vận hành 300 phiên bản của dịch vụ tìm kiếm trên 20 máy chủ, tự động nâng lên 800 phiên bản khi lượng truy cập tăng vọt vào ngày hội mua sắm.
