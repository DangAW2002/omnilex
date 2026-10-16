---
label: Temperature
qualifier: (AI)
aliases:
  - Nhiệt độ
loanwords:
  - temperature
autolink:
  label: never
plain_descriptions:
  - thông số AI điều chỉnh mức độ sáng tạo hay khuôn mẫu của câu trả lời
  - nút chỉnh độ ngẫu nhiên từ chính xác máy móc đến phong phú bất ngờ
summary: Siêu tham số lấy mẫu điều chỉnh độ dốc của phân phối xác suất token trước khi áp dụng hàm softmax nhằm kiểm soát tính ngẫu nhiên của câu trả lời.
confusable_notes:
  top-p-sampling: Temperature điều chỉnh độ phẳng hoặc nhọn của toàn bộ phân phối xác suất, trong khi top-p sampling cắt tỉa danh sách ứng viên chỉ giữ lại nhóm có tổng xác suất tích lũy đạt ngưỡng.
follow_up_questions:
  - Vì sao các bài toán viết code và trích xuất dữ liệu thường đòi hỏi đặt temperature gần mức 0?
  - Về mặt toán học, điều gì xảy ra với phân phối xác suất khi temperature tiến dần về 0 hoặc tiến ra vô cùng?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Hãy tưởng tượng temperature giống như nút vặn nhiệt độ trên máy nổ bỏng ngô: ở nhiệt độ thấp, từng hạt ngô chín đều nổ ra theo trật tự dễ đoán; khi tăng nhiệt độ lên cao, các hạt ngô nổ tung tóe bất ngờ theo nhiều hướng ngẫu hứng.

## Chi tiết
Trước khi mô hình ngôn ngữ chọn từ tiếp theo, nó tính ra một mảng điểm số thô gọi là logit. Giá trị temperature đóng vai trò là số chia cho các logit này trước khi đưa vào hàm làm mềm softmax. Thiết lập temperature thấp (như 0,1 hoặc 0,2) sẽ kéo giãn khoảng cách điểm số, khiến từ có xác suất cao nhất gần như luôn luôn được chọn—rất thích hợp cho lập trình và tính toán số học. Ngược lại, temperature cao (như 0,8 đến 1,0) sẽ san phẳng các đỉnh xác suất, trao cơ hội cho các từ ít phổ biến hơn xuất hiện để tạo sự sáng tạo.

## Định nghĩa chuyên ngành
Hệ số co dãn áp dụng lên vector logit trước phép chuẩn hóa softmax nhằm điều tiết entropy của phân phối xác suất phân loại token đầu ra.

## Ví dụ
Hệ thống trích xuất thông tin hợp đồng pháp lý đặt temperature bằng 0,0 để đảm bảo mỗi lần tra cứu điều khoản phạt đều trả về kết quả số liệu đồng nhất tuyệt đối.
