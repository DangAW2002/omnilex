---
label: Docker
aliases:
  - Nền tảng Docker
loanwords:
  - docker
plain_descriptions:
  - phần mềm phổ biến nhất giúp đóng gói, quản lý và chạy các container ứng dụng
  - công cụ chuẩn giúp lập trình viên tạo và chia sẻ môi trường phần mềm đồng nhất
summary: >-
  Nền tảng phần mềm cung cấp công cụ xây dựng, chia sẻ và thực thi các container ứng dụng thông qua cơ chế ảo hóa của hệ
  điều hành máy chủ.
confusable_notes: {}
follow_up_questions:
  - Docker daemon phối hợp với containerd và runc như thế nào khi vận hành?
  - Docker Compose đem lại lợi ích gì khi quản lý môi trường thử nghiệm đa dịch vụ?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Hãy hình dung Docker như ban quản lý cảng biển: họ cung cấp thùng hàng chuẩn, xe cẩu và quy trình xếp dỡ để mọi hàng hóa đều được đóng gói và vận chuyển nhanh gọn.

## Chi tiết
Docker phổ biến hóa công nghệ container nhờ giao diện dòng lệnh trực quan, tệp khai báo đơn giản (Dockerfile) và kho lưu trữ tập trung (Docker Hub). Phía dưới hệ thống, Docker Engine kết nối với các tầng thực thi như containerd và runc để thiết lập các thành phần của nhân hệ điều hành, giúp vận hành container mượt mà.

## Định nghĩa chuyên ngành
Hệ sinh thái quản lý container bao gồm phần mềm máy khách, dịch vụ nền quản lý tiến trình, công cụ biên dịch image và các đặc tả thực thi tiêu chuẩn.

## Ví dụ
Chạy lệnh `docker run -d -p 8080:80 nginx` để khởi động máy chủ web Nginx cách ly gắn với cổng 8080 trên máy tính cá nhân chỉ mất chưa tới hai giây.
