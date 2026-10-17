---
label: Regularization
qualifier: (ML)
aliases:
  - chính quy hóa
  - điều chuẩn
loanwords:
  - regularization
plain_descriptions:
  - kỹ thuật kiểm soát giúp mô hình máy học không trở nên quá phức tạp hoặc ghi nhớ nhiễu dữ liệu
  - phương pháp áp dụng hình phạt toán học để ngăn chặn trọng số tăng quá mức khi huấn luyện
summary: >-
  Tập hợp các kỹ thuật thống kê nhằm phạt độ phức tạp của mô hình trong quá trình huấn luyện, giúp chống quá khớp và nâng cao năng lực tổng quát hóa.
confusable_notes: {}
follow_up_questions:
  - Điều chuẩn L1 triệt tiêu các trọng số thừa về số 0 khác biệt như thế nào so với điều chuẩn L2?
  - Vì sao kỹ thuật dropout lại có tác dụng tương đương việc kết hợp nhiều mạng nơ-ron con?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc lắp các gờ giảm tốc trên đường đua: nó ngăn người lái xe phóng bạt mạng qua những lối tắt hiểm hóc chỉ dùng được trên một cung đường quen, buộc họ phải học cách lái ổn định trên mọi địa hình.

## Chi tiết
Regularization bổ sung một đại lượng phạt vào hàm mất mát gốc dựa trên độ lớn của các tham số. Hai kỹ thuật cơ bản là điều chuẩn L1 (Lasso) cộng thêm tổng giá trị tuyệt đối của trọng số giúp tạo ra ma trận thưa, và điều chuẩn L2 (Ridge) cộng thêm bình phương độ lớn trọng số để giữ cho các giá trị phân bổ đồng đều. Trong mạng nơ-ron sâu, các phương pháp như dropout, chuẩn hóa theo lô và dừng sớm cũng là những hình thức điều chuẩn hữu hiệu.

## Định nghĩa chuyên ngành
Việc đưa thêm các ràng buộc cấu trúc hoặc số hạng phạt vào bài toán tối thiểu hóa rủi ro thực nghiệm nhằm giới hạn dung lượng của không gian giả thuyết.

## Ví dụ
Thêm hệ số phạt điều chuẩn L2 mức 0,01 vào hàm mất mát giúp thu nhỏ biên độ của 50 trọng số hồi quy, làm giảm 18% sai số kiểm định so với mô hình ban đầu.
