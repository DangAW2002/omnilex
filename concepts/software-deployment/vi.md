---
label: Deployment
qualifier: (Phần mềm)
aliases:
  - Triển khai phần mềm
loanwords:
  - deployment
plain_descriptions:
  - quá trình cài đặt và kích hoạt phiên bản phần mềm mới lên máy chủ cho người dùng sử dụng
  - hoạt động phát hành các gói ứng dụng cập nhật ra môi trường chạy thực tế
summary: Quy trình vận hành phát hành, cài đặt, cấu hình và kích hoạt phiên bản phần mềm trên môi trường máy chủ đích.
confusable_notes: {}
follow_up_questions:
  - Cơ chế triển khai dạng cuốn chiếu (rolling deployment) giúp cập nhật hệ thống không gián đoạn như thế nào?
  - Các bài kiểm tra sức khỏe (health checks) ngăn chặn phiên bản lỗi nhận lưu lượng truy cập ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
autolink:
  label: never
---

## Giải thích dễ hiểu
Tương tự việc đổi mới đội xe buýt thành phố: xe mới lần lượt lăn bánh vào tuyến đường thay thế xe cũ quay về xưởng, hành khách trên bến luôn có xe đi liên tục.

## Chi tiết
Triển khai phần mềm bao gồm việc đưa các sản phẩm đóng gói (như mã nhị phân hay container image) vào môi trường máy chủ. Các chiến lược hiện đại như rolling update thay thế dần từng máy chủ, chờ phiên bản mới vượt qua các bước kiểm tra hoạt động mới tắt dần phiên bản cũ. Trong Kubernetes, đối tượng Deployment đảm nhiệm quản lý bản sao và trạng thái cập nhật.

## Định nghĩa chuyên ngành
Quy trình vận hành hoặc bộ điều khiển hướng khai báo quản lý số lượng bản sao, tiến trình cập nhật và trạng thái hoàn nguyên của tải công việc đang chạy.

## Ví dụ
Cập nhật hệ thống thanh toán trực tuyến từ phiên bản 2.1 lên 2.2 trên cụm sáu máy chủ theo từng cặp hai máy một, bảo đảm dịch vụ không bị gián đoạn giây nào.
