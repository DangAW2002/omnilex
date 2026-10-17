---
label: Jenkins
aliases:
  - Máy chủ tự động hóa Jenkins
loanwords:
  - jenkins
plain_descriptions:
  - máy chủ tự lưu trữ dùng để lên lịch và chạy các bước đóng gói, kiểm thử phần mềm tự động
  - công cụ tự động hóa nguồn mở giúp điều phối quy trình phân phối phần mềm qua hàng nghìn plugin
summary: >-
  Máy chủ tự động hóa mã nguồn mở độc lập hỗ trợ thiết lập các pipeline xây dựng, kiểm thử và triển khai phần mềm thông qua hệ thống plugin đa dạng.
confusable_notes:
  github-actions: >-
    Jenkins là máy chủ tự động hóa độc lập tự lưu trữ với hệ sinh thái tiện ích mở rộng phong phú, trong khi GitHub Actions là dịch vụ luồng công việc được quản lý trực tiếp trên GitHub.
follow_up_questions:
  - "Những đánh đổi về mặt bảo mật và chi phí vận hành khi doanh nghiệp tự quản lý cụm Jenkins là gì?"
  - "Tệp Jenkinsfile dạng khai báo (declarative) giúp quản lý quy trình CI/CD hiệu quả hơn kiểu cấu hình giao diện cũ ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một quản đốc phân xưởng do chính công ty thuê về, chuyên nhận phiếu giao việc, phân chia cho các thợ máy làm rồi báo cáo kết quả hoàn thành.

## Chi tiết
Jenkins là hệ thống máy chủ tự động hóa mã nguồn mở viết bằng Java. Hệ thống hoạt động theo mô hình máy chủ điều khiển (controller) và các nút phụ trợ (agent), trong đó máy chủ chính quản lý lịch trình và giao việc đóng gói phần mềm cho các nút con xử lý. Quy trình kiểm thử và triển khai được định nghĩa bằng mã Groovy trong tệp Jenkinsfile lưu cùng mã nguồn dự án. Với hàng nghìn plugin mở rộng, Jenkins có thể kết nối tới hầu hết các công cụ lưu trữ mã nguồn, dịch vụ đám mây và hệ thống thông báo nội bộ.

## Định nghĩa chuyên ngành
Máy chủ tự động hóa tích hợp liên tục và phân phối liên tục mã nguồn mở viết bằng Java, hỗ trợ điều phối các tác vụ phân tán thông qua kịch bản pipeline.

## Ví dụ
Một ngân hàng vận hành cụm máy chủ Jenkins trong mạng nội bộ biệt lập để tự động dịch mã nguồn và đóng gói ứng dụng ngân hàng lõi mà không gửi dữ liệu ra ngoài Internet.
