---
label: Confusion matrix
aliases:
  - ma trận nhầm lẫn
loanwords:
  - confusion matrix
plain_descriptions:
  - bảng thống kê đối chiếu giúp thấy rõ mô hình đoán đúng bao nhiêu lần và nhầm lẫn giữa những lớp nào
  - ma trận đối sánh giữa nhãn thực tế của dữ liệu và nhãn do mô hình máy học dự đoán
summary: >-
  Bảng thống kê dạng ma trận trực quan hóa hiệu năng của mô hình phân loại bằng cách đối chiếu các nhãn thực tế với các nhãn được mô hình dự đoán.
confusable_notes: {}
follow_up_questions:
  - Các ô nằm ngoài đường chéo chính của ma trận nhầm lẫn chỉ ra điều gì về sai số của mô hình?
  - Cách tính trung bình macro và micro từ ma trận nhầm lẫn đa lớp được thực hiện như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một bảng chấm thi của giáo viên không chỉ ghi tổng điểm, mà còn chỉ rõ có bao nhiêu học sinh đã chọn nhầm đáp án B thành đáp án D.

## Chi tiết
Trong bài toán nhị phân, ma trận nhầm lẫn chia kết quả kiểm thử thành 4 ô cơ bản: Dương tính thật (TP), Dương tính giả (FP), Âm tính thật (TN) và Âm tính giả (FN). Với bài toán đa lớp, các hàng thường biểu thị lớp thực tế và các cột biểu thị lớp được dự đoán. Quan sát các phần tử nằm ngoài đường chéo chính giúp kỹ sư biết chính xác hai nhóm nào đang bị mô hình nhận diện nhầm lẫn để tinh chỉnh dữ liệu.

## Định nghĩa chuyên ngành
Ma trận liên kết vuông kích thước N x N ánh xạ phân phối giữa nhãn chân lý thực tế và nhãn dự đoán của bộ phân loại thống kê.

## Ví dụ
Ma trận kiểm thử 1.000 nhật ký truy cập ghi nhận 950 mẫu âm tính thật, 30 mẫu dương tính thật, 15 cảnh báo sai và 5 trường hợp bỏ sót sự cố nguy hiểm.
