---
label: "Edge case"
aliases:
  - "Trường hợp biên"
  - "Trường hợp cực đoan"
loanwords:
  - "edge case"
plain_descriptions:
  - "tình huống bất thường chỉ xảy ra tại các giới hạn cực trị của tham số hoạt động"
  - "kịch bản dữ liệu hiếm gặp hoặc ngoại lệ mà phần mềm phải xử lý trơn tru không để phát sinh lỗi"
summary: "Tình huống vận hành hoặc dữ liệu đầu vào đặc biệt chỉ xuất hiện ở các giới hạn cực tiểu hoặc cực đại của tham số, kiểm tra độ bền vững ở các ranh giới của hệ thống."
confusable_notes:
  {}
follow_up_questions:
  - "Kỹ thuật phân tích giá trị biên (boundary value analysis) giúp kỹ sư kiểm thử phát hiện các trường hợp biên ra sao?"
  - "Các phương pháp kiểm thử dựa trên thuộc tính (property-based testing) và fuzzing tìm ra các trường hợp biên bất ngờ bằng cách nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Một thang máy chở người thông thường nhưng phải được thiết kế để không gặp sự cố dù tải trọng bên trong chỉ là một hạt cát hay chạm đúng giới hạn tối đa 1.000 kg.

## Chi tiết
Trường hợp biên thường xuất hiện tại các ranh giới dữ liệu như danh sách rỗng, số 0, số âm, ngày nhuận, chuỗi ký tự cực dài hoặc thời điểm ngắt kết nối mạng đúng một phần nghìn giây. Lập trình viên hay tập trung vào luồng hoạt động thông thường, nhưng chính việc bao phủ tốt các trường hợp biên trong kiểm thử mới giúp phần mềm chống chịu được các lỗi sập bất ngờ trong thực tế.

## Định nghĩa chuyên ngành
Điều kiện vận hành biên phát sinh tại vùng ngoại vi của miền tham số đầu vào hoặc cấu hình hệ thống, thử thách độ chính xác của thuật toán dưới các ràng buộc không điển hình.

## Ví dụ
Kiểm thử hàm chia quà tặng khi danh sách người nhận bằng 0 hoặc số tiền chuyển khoản nhập vào vượt quá giới hạn tối đa của kiểu số nguyên 64-bit.
