---
label: Helm
aliases: []
qualifier: (Kubernetes)
loanwords:
  - helm
plain_descriptions:
  - trình quản lý gói cho Kubernetes giúp đóng gói ứng dụng phức tạp thành các biểu đồ mẫu
  - công cụ cài đặt và nâng cấp các ứng dụng chạy trên Kubernetes chỉ bằng một câu lệnh
summary: Trình quản lý gói chuyên dụng cho Kubernetes giúp đơn giản hóa việc định nghĩa, cài đặt và nâng cấp các ứng dụng container phức tạp thông qua các gói cấu hình chart.
confusable_notes: {}
follow_up_questions:
  - Các biểu đồ Helm Chart tách biệt khuôn mẫu manifest khỏi biến môi trường thông qua tệp values.yaml ra sao?
  - Cơ chế lưu vết phiên bản phát hành (release) của Helm hỗ trợ quay ngược phiên bản (rollback) tự động khi triển khai thất bại như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như cửa hàng ứng dụng App Store trên điện thoại hoặc lệnh brew/apt trên máy tính: thay vì phải tự tay sao chép và chỉnh sửa hàng chục tệp cấu hình rời rạc, bạn chỉ cần gõ một lệnh để cài trọn gói toàn bộ ứng dụng.

## Chi tiết
Một ứng dụng chạy trên Kubernetes thường cần hàng loạt tệp manifest YAML (Deployment, Service, Ingress, ConfigMap). Helm gom toàn bộ các tệp này vào một gói duy nhất gọi là Chart. Bằng cách tham số hóa các giá trị cấu hình trong tệp values.yaml, kỹ sư có thể triển khai cùng một Chart lên môi trường thử nghiệm hay sản xuất với số lượng bản sao và tên miền khác nhau một cách nhanh chóng.

## Định nghĩa chuyên ngành
Công cụ quản lý gói ứng dụng cho Kubernetes, sử dụng ngôn ngữ mẫu Go template để kết xuất các tệp manifest từ tệp tham số đầu vào và giao tiếp với Kubernetes API server để quản lý vòng đời phát hành ứng dụng.

## Ví dụ
Kỹ sư vận hành cài đặt trọn vẹn cụm công cụ giám sát hệ thống lên Kubernetes chỉ bằng một dòng lệnh `helm install prometheus prometheus-community/kube-prometheus-stack -f values.yaml` mà không phải viết tay từng tệp manifest.
