---
label: Service mesh
aliases:
  - Lưới dịch vụ
loanwords:
  - service mesh
plain_descriptions:
  - lớp hạ tầng chuyên quản lý kết nối mạng giữa các dịch vụ microservice
  - mạng lưới proxy sidecar bảo mật và theo dõi liên lạc nội bộ giữa các dịch vụ
summary: Lớp hạ tầng chuyên dụng gồm các proxy sidecar đảm nhiệm điều phối, mã hóa an toàn và giám sát lưu lượng giao tiếp giữa các vi dịch vụ mà không can thiệp mã nguồn ứng dụng.
confusable_notes: {}
follow_up_questions:
  - Sự khác biệt về mặt vận hành giữa control plane và data plane trong service mesh là gì?
  - Khi nào độ trễ bổ sung của proxy sidecar làm mất đi lợi thế bảo mật của giao thức mTLS?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy hình dung mỗi nhà ngoại giao luôn có một cận vệ đi kèm bên cạnh, chịu trách nhiệm gửi nhận thư từ tuyệt mật, kiểm tra danh tính và ghi sổ nhật ký mà không cần nhà ngoại giao bận tâm.

## Chi tiết
Khi hệ thống vi dịch vụ phình to lên hàng trăm thành phần, việc tự viết mã cấp chứng chỉ mTLS, ngắt mạch, phát hiện dịch vụ và theo dõi luồng trong từng ngôn ngữ lập trình trở nên quá tải. Lưới dịch vụ chuyển giao toàn bộ các tác vụ mạng này cho các proxy gọn nhẹ (như Envoy) chạy kèm dạng sidecar trong cùng pod máy chủ. Một bộ điều khiển trung tâm (control plane) sẽ phân phát cấu hình và khóa định danh xuống các proxy ở tầng dữ liệu (data plane) để chúng tự động bảo vệ đường truyền.

## Định nghĩa chuyên ngành
Lớp hạ tầng có thể lập trình với độ trễ thấp, chuyên quản lý khối lượng lớn giao tiếp giữa các tiến trình thông qua việc chèn proxy trong suốt và thực thi chính sách bảo mật tập trung.

## Ví dụ
Cụm gồm 150 dịch vụ trên Kubernetes dùng proxy sidecar để tự động mã hóa mTLS và thu thập dấu vết độ trễ cho 45.000 cuộc gọi RPC nội bộ mỗi phút.
