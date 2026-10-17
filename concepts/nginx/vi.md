---
label: "Nginx"
aliases:
  - "NGINX"
loanwords:
  - "Nginx"
  - "NGINX"
autolink:
  label: auto
  aliases:
    NGINX: always
plain_descriptions:
  - "phần mềm máy chủ web hiệu năng cao nổi tiếng chuyên gánh lượng truy cập lớn"
  - "chương trình máy chủ mã nguồn mở chuyên phân phối tải và làm trạm chuyển tiếp proxy"
summary: "Phần mềm máy chủ web và trạm chuyển tiếp đảo ngược (reverse proxy) mã nguồn mở nổi tiếng với hiệu năng cao và tiêu tốn ít bộ nhớ."
confusable_notes:
  web-server: "Máy chủ web là danh mục khái niệm chung, còn Nginx là một phần mềm triển khai cụ thể có kiến trúc hướng sự kiện."
follow_up_questions:
  - "Kiến trúc hướng sự kiện bất đồng bộ của Nginx giải quyết bài toán 10.000 kết nối đồng thời (C10k) ra sao?"
  - "Nginx thực hiện vai trò chấm dứt mã hóa SSL (SSL Termination) cho các ứng dụng backend như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Nginx giống như một nhân viên điều phối thông minh tại cửa kiểm soát an ninh sân bay: hướng dẫn hàng nghìn hành khách vào đúng làn đi nhanh nhất mà không bao giờ bị ùn ứ.

## Chi tiết
Được tạo ra nhằm giải quyết bài toán C10k (phục vụ 10.000 kết nối cùng lúc), Nginx sử dụng mô hình bất đồng bộ và hướng sự kiện thay vì tạo luồng riêng cho mỗi yêu cầu. Nhờ đó, máy chủ Nginx có thể duy trì hàng chục nghìn kết nối mạng với dung lượng bộ nhớ RAM cực kỳ thấp. Nginx thường được sử dụng làm máy chủ phát tệp tĩnh, bộ cân bằng tải (load balancer) và làm cổng chuyển tiếp proxy bảo vệ cho các máy chủ ứng dụng bên trong.

## Định nghĩa chuyên ngành
Chương trình máy chủ mạng bất đồng bộ đa chức năng hoạt động như một máy chủ HTTP, bộ cân bằng tải và trạm chuyển tiếp proxy.

## Ví dụ
Hệ thống sử dụng Nginx đứng ở cổng ngoài để giải mã kết nối HTTPS an toàn rồi chia đều lượt truy cập cho 4 cụm máy chủ ứng dụng chạy phía sau.
