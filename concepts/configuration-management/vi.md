---
label: Configuration management
aliases:
  - Quản lý cấu hình
loanwords:
  - configuration management
plain_descriptions:
  - việc dùng tập lệnh để tự động thiết lập phần mềm và các tùy chọn hệ thống đồng bộ trên nhiều máy chủ
  - phương pháp kiểm soát sự đồng nhất của cài đặt máy chủ bằng mã nguồn để tránh tình trạng sai lệch cấu hình
summary: >-
  Phương pháp kỹ thuật và công cụ nhằm thiết lập, theo dõi và duy trì tính nhất quán của các cài đặt phần mềm và cấu hình hệ thống trên toàn bộ hạ tầng.
confusable_notes:
  immutable-infrastructure: >-
    Quản lý cấu hình cập nhật và duy trì trạng thái trên các máy chủ hiện có theo thời gian, còn hạ tầng bất biến thay thế hoàn toàn máy chủ mới thay vì chỉnh sửa trực tiếp trên máy cũ.
follow_up_questions:
  - "Tính chất bất biến kép (idempotency) trong các kịch bản quản lý cấu hình giúp ngăn ngừa lỗi lặp lại như thế nào?"
  - "Hiện tượng trôi dạt cấu hình (configuration drift) phát sinh khi kỹ sư tự ý sửa trực tiếp trên máy chủ gây ra những nguy cơ gì?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như bản vẽ thiết kế chuẩn cho hàng trăm căn phòng khách sạn: thay vì để từng thợ tự đóng bàn ghế theo ý riêng, mọi căn phòng đều được lắp đặt đồng bộ theo danh sách quy chuẩn.

## Chi tiết
Quản lý cấu hình là phương pháp sử dụng mã nguồn và kịch bản tự động để thiết lập và duy trì tính đồng nhất của hệ điều hành, phần mềm và các thông số kỹ thuật trên máy chủ. Các công cụ như Ansible hay Puppet cho phép kỹ sư khai báo trạng thái mong muốn của hệ thống: gói phần mềm nào cần cài, quyền người dùng nào cần cấp và cổng mạng nào cần mở. Kịch bản sẽ tự động đối soát và đưa các máy chủ về đúng trạng thái khai báo mà không cần đăng nhập thủ công từng máy, giúp loại bỏ hoàn toàn các máy chủ cá biệt khó tái tạo.

## Định nghĩa chuyên ngành
Quy trình kỹ thuật hệ thống nhằm thiết lập và duy trì tính nhất quán về thuộc tính chức năng và cấu hình vật lý của hạ tầng công nghệ thông tin.

## Ví dụ
Kỹ sư chạy một kịch bản Ansible để đồng bộ cấu hình bảo mật và nâng cấp gói phần mềm trên 150 máy chủ trong cụm dữ liệu chỉ trong vài phút thay vì gõ lệnh trên từng máy.
