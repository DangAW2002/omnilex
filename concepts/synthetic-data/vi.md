---
label: Synthetic data
aliases:
  - dữ liệu tổng hợp
loanwords:
  - synthetic data
plain_descriptions:
  - dữ liệu do thuật toán máy tính tự tạo ra mô phỏng thực tế chứ không phải thu thập từ con người
  - các tập dữ liệu nhân tạo giúp huấn luyện AI mà không lo vi phạm quyền riêng tư của khách hàng
summary: >-
  Dữ liệu được tạo ra một cách nhân tạo bằng các thuật toán toán học hoặc mô phỏng kỹ thuật số, phản ánh chính xác các đặc tính thống kê của dữ liệu thực tế mà không chứa thông tin cá nhân nhạy cảm.
confusable_notes: {}
follow_up_questions:
  - Cơ chế bảo mật vi sai (differential privacy) ngăn ngừa việc đảo ngược dữ liệu tổng hợp như thế nào?
  - Làm thế nào để kiểm tra tính đại diện và tránh hiện tượng mô hình sao chép lại các lỗi sai khi dùng dữ liệu nhân tạo?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc dùng buồng lái mô phỏng không gian ảo để phi công tập hạ cánh trong giông bão, thay vì phải đợi một cơn bão thật ngoài đời gây nguy hiểm cho hành khách.

## Chi tiết
Dữ liệu tổng hợp giải quyết các bài toán thiếu hụt mẫu huấn luyện, chi phí bản quyền và rào cản bảo mật thông tin y tế, tài chính. Các phương pháp tạo dữ liệu gồm môi trường mô phỏng 3D vật lý (tạo ảnh xe chạy trong sương mù) và các mô hình tạo sinh như GAN hay diffusion. Dữ liệu nhân tạo giúp tăng cường các trường hợp biên hiếm gặp và cho phép chia sẻ dữ liệu nghiên cứu rộng rãi.

## Định nghĩa chuyên ngành
Tập hợp các quan sát được sinh ra thông qua thuật toán tính toán nhằm bảo tồn phân phối xác suất đồng thời của hệ thống mà không sử dụng bản ghi thực nghiệm gốc.

## Ví dụ
Viện nghiên cứu y tế tạo ra 50.000 hồ sơ bệnh án tổng hợp có các chỉ số huyết áp và nhịp tim chân thực để kiểm thử phần mềm mà không tiết lộ danh tính của bất kỳ bệnh nhân thật nào.
