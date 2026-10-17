---
label: F1 score
aliases:
  - điểm F1
  - F1-score
loanwords:
  - F1 score
plain_descriptions:
  - chỉ số tổng hợp kết hợp độ chính xác precision và độ thu hồi recall thành một điểm số duy nhất
  - thước đo hiệu quả phân loại đáng tin cậy ngay cả khi các lớp dữ liệu bị chênh lệch số lượng lớn
summary: >-
  Chỉ số đánh giá thống kê tính trung bình điều hòa giữa precision và recall nhằm mang lại thước đo cân bằng duy nhất cho chất lượng của mô hình phân loại.
confusable_notes: {}
follow_up_questions:
  - Tại sao trung bình điều hòa lại phạt nặng sự chênh lệch lớn giữa precision và recall hơn trung bình số học?
  - Khi nào cần sử dụng biến thể chỉ số F-beta với trọng số beta khác 1?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như cách chấm điểm toàn diện một vận động viên: thay vì lấy điểm trung bình cộng để môn xuất sắc gỡ lại môn quá kém, điểm số sẽ tụt mạnh nếu bạn để một trong hai chỉ số rơi xuống mức yếu.

## Chi tiết
Công thức tính F1 score là 2 * (Precision * Recall) / (Precision + Recall), đảm bảo rằng nếu một trong hai chỉ số tiến về 0 thì điểm F1 tổng thể cũng sẽ sụt giảm nghiêm trọng. Đặc tính này giúp F1 score trở thành thước đo tin cậy hơn hẳn độ chính xác thông thường trên các tập dữ liệu mất cân bằng nghiêm trọng, nơi mô hình đoán bừa lớp chiếm đa số cũng có thể đạt tỷ lệ chính xác cao giả tạo.

## Định nghĩa chuyên ngành
Trung bình điều hòa của độ chính xác dương tính (precision) và độ nhạy (recall), biểu thị tiêu chuẩn vô hướng cân bằng giữa hai khía cạnh phân loại.

## Ví dụ
Một mô hình có chỉ số precision đạt 80% và recall đạt 60% sẽ có điểm F1 là 68,57%, tính theo công thức 2 * (0,80 * 0,60) / (0,80 + 0,60).
