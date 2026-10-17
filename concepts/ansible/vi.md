---
label: Ansible
aliases: []
loanwords:
  - ansible
plain_descriptions:
  - công cụ tự động hóa cấu hình máy chủ và cài đặt phần mềm từ xa qua giao thức SSH
  - phần mềm quản trị hệ thống dùng tệp kịch bản YAML mà không cần cài phần mềm đặc vụ
summary: Bộ công cụ tự động hóa CNTT mã nguồn mở chuyên quản lý cấu hình, triển khai ứng dụng và điều phối tác vụ mà không cần cài đặt phần mềm đại lý (agent) trên các máy chủ đích.
confusable_notes:
  terraform: Ansible tập trung vào quản lý cấu hình và cài đặt phần mềm bên trong máy chủ qua kịch bản SSH, trong khi Terraform chuyên về khởi tạo hạ tầng máy ảo và mạng đám mây.
follow_up_questions:
  - Kiến trúc không dùng đặc vụ (agentless) của Ansible giúp đơn giản hóa quản trị an ninh hệ thống ra sao?
  - Tính chất bất biến/bảo toàn (idempotency) bảo đảm việc chạy lại playbook nhiều lần không gây lỗi hệ thống như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như bếp trưởng gửi bảng công thức nấu ăn tới các chi nhánh nhà hàng: các đầu bếp làm theo từng bước hướng dẫn, nếu nguyên liệu nào đã được sơ chế sẵn rồi thì tự động bỏ qua để chuyển sang bước kế tiếp.

## Chi tiết
Ansible điều khiển các máy chủ được quản lý thông qua giao thức SSH tiêu chuẩn (hoặc WinRM đối với Windows), giúp loại bỏ hoàn toàn gánh nặng phải cài đặt và cập nhật các phần mềm quản trị ngầm. Quy trình tự động hóa được mô tả trong các tệp YAML trực quan gọi là playbook. Các module của Ansible tuân thủ tính bảo toàn (idempotent), chỉ thực hiện thay đổi khi trạng thái máy chủ thực tế chưa đúng với khai báo.

## Định nghĩa chuyên ngành
Hệ thống tự động hóa quản trị CNTT mã nguồn mở thực thi các module tác vụ có tính bảo toàn qua kết nối SSH, được điều phối bằng các kịch bản định dạng YAML mà không phụ thuộc vào daemon nền trên máy trạm.

## Ví dụ
Quản trị viên hệ thống chạy lệnh `ansible-playbook -i hosts web.yml` để cài đặt máy chủ web NGINX, sao chép chứng chỉ số HTTPS và khởi động lại dịch vụ đồng loạt trên 50 máy chủ Linux chỉ trong vài phút.
