---
label: Attention mechanism
aliases:
  - Cơ chế chú ý
  - Cơ chế attention
loanwords:
  - attention mechanism
  - attention
plain_descriptions:
  - kỹ thuật giúp AI biết từ nào quan trọng nhất trong ngữ cảnh khi xử lý
  - giải pháp tính toán giúp mô hình tập trung vào thông tin liên quan trong câu
summary: Thuật toán toán học cho phép mô hình nơ-ron tính toán trọng số tương quan động giữa mọi phần tử trong một chuỗi dữ liệu đầu vào.
confusable_notes: {}
follow_up_questions:
  - Ma trận Query, Key và Value tương tác với nhau thế nào trong cơ chế chú ý tích vô hướng chuẩn hóa?
  - Vì sao độ phức tạp tính toán của cơ chế chú ý tiêu chuẩn lại tăng theo bình phương độ dài ngữ cảnh?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Khi đọc một bản điều khoản và bắt gặp đại từ “nó”, tâm trí bạn sẽ lập tức hướng sự chú ý về cụm danh từ công ty đã xuất hiện ở đoạn trước để hiểu chính xác chủ thể được nói tới.

## Chi tiết
Cơ chế chú ý tính toán mức độ liên quan giữa các token thông qua ba biểu diễn Query, Key và Value. Tích vô hướng giữa vector truy vấn Query và từng vector khóa Key đo lường mức độ tương đồng, được thu phóng để ổn định giá trị rồi đưa qua hàm softmax để sinh phân phối trọng số xác suất. Đầu ra cuối cùng là tổng có trọng số của các vector giá trị Value. Nhờ vậy, các từ trong cùng một văn bản có thể liên kết trực tiếp với nhau bất kể khoảng cách xa gần.

## Định nghĩa chuyên ngành
Hàm gộp động tính tổng có trọng số của các vector giá trị Value dựa trên các hệ số chuẩn hóa bắt nguồn từ tích vô hướng giữa vector truy vấn Query và vector khóa Key.

## Ví dụ
Mô hình dịch thuật khi dịch từ "nó" trong hồ sơ bệnh án tự động dồn trọng số chú ý cao nhất vào cụm từ "bệnh viện đa khoa" xuất hiện ở hai câu phía trước.
