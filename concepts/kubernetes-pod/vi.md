---
label: Pod
qualifier: (Kubernetes)
aliases:
  - Kubernetes pod
loanwords:
  - pod
plain_descriptions:
  - đơn vị nhỏ nhất có thể triển khai trong Kubernetes, chứa một hoặc nhiều container gắn kết chặt chẽ
  - vỏ bọc dùng chung địa chỉ mạng IP và ổ đĩa cho các container liên quan
summary: >-
  Đơn vị tính toán nhỏ nhất có thể triển khai trong Kubernetes, bao bọc một hoặc nhiều container liên kết mật thiết và
  dùng chung tài nguyên mạng cùng ổ đĩa.
confusable_notes: {}
follow_up_questions:
  - Khi nào nên áp dụng mô hình sidecar để đặt nhiều container trong cùng một pod?
  - Vì sao các pod trong Kubernetes được thiết kế theo tư duy tạm thời (ephemeral) thay vì máy chủ cố định?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
autolink:
  label: never
---

## Giải thích dễ hiểu
Giống như quả đậu Hà Lan: nhiều hạt đậu cùng nằm chung bên trong một lớp vỏ bảo vệ, chia sẻ cùng một môi trường dưỡng chất.

## Chi tiết
Trong Kubernetes, hệ thống không điều phối từng container đơn lẻ lên máy chủ mà luôn đặt chúng vào bên trong một pod. Các container trong cùng pod chia sẻ chung không gian mạng (cùng địa chỉ IP và dải cổng) nên có thể giao tiếp với nhau qua `localhost`. Chúng cũng có thể gắn chung ổ đĩa dữ liệu để chia sẻ tệp.

## Định nghĩa chuyên ngành
Thực thể trừu tượng nguyên tử đại diện cho nhóm container cùng định vị trên một nút máy chủ, chia sẻ chung không gian giao tiếp tiến trình, mạng và phân vùng lưu trữ.

## Ví dụ
Một pod chứa container ứng dụng web chính chạy song song cùng container phụ (sidecar) chuyên thu thập nhật ký truy cập để gửi về máy chủ giám sát trung tâm.
