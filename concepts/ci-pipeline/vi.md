---
label: Pipeline
qualifier: (CI/CD)
aliases:
  - Đường ống CI/CD
  - đường ống tự động
loanwords:
  - pipeline
plain_descriptions:
  - chuỗi các bước tự động hóa tuần tự để kiểm tra và đóng gói mã nguồn
  - đường dẫn tự động đưa mã lệnh từ máy tính lập trình viên ra bản phát hành hoàn chỉnh
summary: Chuỗi các giai đoạn thực thi tự động tuần tự thực hiện biên dịch, kiểm thử và đóng gói các bản cập nhật phần mềm.
confusable_notes: {}
follow_up_questions:
  - Vì sao nên tách các bài kiểm thử tích hợp tốn thời gian sang chặng sau của pipeline?
  - Cơ chế lưu đệm (cache) giúp tăng tốc độ chạy pipeline như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
autolink:
  label: never
---

## Giải thích dễ hiểu
Giống như quy trình làm thủ tục tại sân bay: hành lý đi qua băng chuyền kiểm tra an ninh, quét tải trọng và phân loại cẩn thận trước khi được đưa lên máy bay.

## Chi tiết
Pipeline CI tổ chức công việc kỹ thuật thành các giai đoạn chặt chẽ như biên dịch, chạy kiểm thử đơn vị, quét lỗ hổng bảo mật và lưu trữ sản phẩm đóng gói. Các tác vụ trong cùng giai đoạn có thể chạy song song trên nhiều máy chủ phụ trợ để tiết kiệm thời gian. Khi phát hiện lỗi ở bất kỳ bước nào, hệ thống dừng lại ngay lập tức.

## Định nghĩa chuyên ngành
Đồ thị thực thi có hướng khai báo các bước tuần tự và các ràng buộc phụ thuộc nhằm thẩm định mã nguồn và tạo ra gói phần mềm hoàn chỉnh.

## Ví dụ
Quy trình GitHub Actions trong đó bước một kiểm tra chuẩn mã nguồn, bước hai chạy song song các bài kiểm thử trong 45 giây, và bước ba xuất bản gói triển khai.
