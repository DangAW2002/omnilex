---
label: Precision and recall
aliases:
  - độ chính xác và độ thu hồi
loanwords:
  - precision and recall
plain_descriptions:
  - cặp chỉ số đo lường tỷ lệ đoán trúng trong các trường hợp dương tính và tỷ lệ tìm đủ mọi trường hợp thực tế
  - hai thước đo đánh giá sự cân bằng giữa việc báo động nhầm và việc bỏ sót mục tiêu của mô hình phân loại
summary: >-
  Bộ đôi chỉ số đánh giá mô hình phân loại, trong đó precision đo lường tỷ lệ dự đoán tích cực là đúng, còn recall đo lường tỷ lệ các mẫu tích cực thực tế được phát hiện thành công.
confusable_notes: {}
follow_up_questions:
  - Việc điều chỉnh ngưỡng xác suất quyết định làm thay đổi cán cân giữa precision và recall như thế nào?
  - Tại sao một mô hình có precision rất cao nhưng recall quá thấp vẫn không đạt yêu cầu thực tế?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy hình dung một thám tử đi tìm đá quý bị mất cắp: precision đảm bảo mọi viên đá thám tử thu giữ đều là đá quý thật, còn recall đảm bảo không bỏ sót bất kỳ viên đá quý nào trong hầm chứa.

## Chi tiết
Precision được tính bằng số ca dương tính thật chia cho tổng số ca mô hình dự đoán là dương tính, nhằm hạn chế việc báo động nhầm. Recall được tính bằng số ca dương tính thật chia cho tổng số ca thực sự mang bệnh hoặc sự cố, nhằm tránh bỏ sót. Do việc hạ thấp ngưỡng ra quyết định sẽ bắt được nhiều mẫu hơn nhưng dễ kèm cảnh báo giả, các kỹ sư thường phân tích đường cong precision-recall để chọn điểm cân bằng.

## Định nghĩa chuyên ngành
Cặp chỉ số thống kê định lượng giá trị dự đoán dương tính (precision) và độ nhạy thực nghiệm (recall) trong kiểm định giả thuyết và phân loại nhị phân.

## Ví dụ
Hệ thống chẩn đoán y tế kiểm tra 100 ca bệnh thực tế, phát hiện đúng 90 ca và báo nhầm 10 người khỏe mạnh, đạt tỷ lệ recall là 90% và precision là 90%.
