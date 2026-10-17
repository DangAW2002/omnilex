---
label: Underfitting
aliases:
  - dưới khớp
  - thiếu khớp
loanwords:
  - underfitting
plain_descriptions:
  - khi mô hình máy học quá đơn giản đến mức không học nổi quy luật cơ bản từ dữ liệu
  - hiện tượng mô hình cho kết quả kém ngay trên cả tập luyện tập lẫn tập kiểm tra thực tế
summary: >-
  Hiện tượng mô hình học máy quá đơn giản hoặc chưa được huấn luyện đủ, không nắm bắt được quy luật nội tại của dữ liệu và dẫn tới sai số cao trên cả tập huấn luyện lẫn tập kiểm thử.
confusable_notes:
  overfitting: Dưới khớp là mô hình quá đơn giản không nắm được quy luật ngay trên tập huấn luyện; quá khớp là mô hình học vẹt cả nhiễu và kém tổng quát hóa.
follow_up_questions:
  - Tăng dung lượng tham số và độ sâu của mạng nơ-ron giúp khắc phục tình trạng dưới khớp như thế nào?
  - Vì sao tình trạng dưới khớp tương ứng với vùng có độ chệch cao trong bài toán cân đổi độ chệch và phương sai?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc cố gắng giải thích toàn bộ sự biến đổi thời tiết phức tạp trong năm chỉ bằng một đường thẳng tắp; quy luật đưa ra quá đơn giản đến mức không khớp nổi với nhiệt độ thực tế.

## Chi tiết
Dưới khớp xuất hiện khi độ phức tạp của mô hình không đủ lớn để biểu diễn phân phối dữ liệu, hoặc khi thời gian huấn luyện kết thúc quá sớm. Dấu hiệu đặc trưng là độ mất mát trên tập huấn luyện vẫn rất cao và trên tập kiểm định cũng kém tương tự (độ chệch cao). Để khắc phục, các kỹ sư thường tăng số lượng tham số, bổ sung đặc trưng tính toán, giảm bớt điều chuẩn hoặc huấn luyện thêm số lượng epoch.

## Định nghĩa chuyên ngành
Trạng thái độ chệch thống kê cao trong đó không gian giả thuyết của bộ ước lượng không đủ năng lực xấp xỉ kỳ vọng có điều kiện thực tế của dữ liệu.

## Ví dụ
Dùng một phương trình đường thẳng đơn giản để khớp dữ liệu quỹ đạo bay hình parabol khiến mô hình chỉ đạt độ chính xác 52% trên tập huấn luyện và 50% trên tập kiểm định.
