---
label: "Design pattern"
aliases:
  - "Mẫu thiết kế"
loanwords:
  - "design pattern"
plain_descriptions:
  - "giải pháp mẫu có thể tái sử dụng để giải quyết các vấn đề thiết kế thường gặp trong lập trình"
  - "bản vẽ thiết kế chuẩn giúp tổ chức cấu trúc phần mềm mạch lạc và dễ mở rộng"
summary: "Một cách tổ chức mã đã có tên gọi và đã được kiểm chứng, dùng để giải những bài toán thiết kế mà lập trình viên gặp đi gặp lại, như tạo đối tượng hay phản ứng khi dữ liệu thay đổi."
confusable_notes:
  {}
follow_up_questions:
  - "Ba nhóm mẫu thiết kế kinh điển của Gang of Four (GoF)—khởi tạo, cấu trúc và hành vi—được phân chia ra sao?"
  - "Hậu quả gì xảy ra khi lập trình viên cố tình áp đặt các mẫu thiết kế phức tạp vào những bài toán vốn chỉ cần giải pháp đơn giản?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Bản vẽ mẫu cầu thang của kiến trúc sư: có thể tùy chỉnh kích thước cho từng ngôi nhà nhưng nguyên lý về độ dốc, bậc thang và lan can luôn được áp dụng chuẩn mực mà không cần nghĩ lại từ đầu.

## Chi tiết
Mẫu thiết kế (design pattern) không phải là các đoạn mã cụ thể để sao chép thẳng vào chương trình, mà là khuôn mẫu tư duy mô tả mối quan hệ giữa các lớp đối tượng và module. Các mẫu nổi tiếng như Singleton, Factory, Observer trong lập trình hướng đối tượng hay Circuit Breaker trong hệ thống phân tán cung cấp tiếng nói chung giúp các kỹ sư hiểu ý đồ kiến trúc của nhau nhanh chóng.

## Định nghĩa chuyên ngành
Bản mẫu cấu trúc hoặc hành vi hình thức đóng gói các tương tác đối tượng tối ưu nhằm giải quyết một vấn đề kỹ thuật lặp lại trong một ngữ cảnh phát triển cụ thể.

## Ví dụ
Sử dụng mẫu thiết kế Observer để cho phép nhiều thành phần giao diện khác nhau tự động cập nhật khi số dư ví tiền của người dùng thay đổi.
