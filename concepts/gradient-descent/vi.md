---
label: Gradient descent
aliases:
  - Hạ độ dốc
loanwords:
  - gradient descent
plain_descriptions:
  - thuật toán toán học cốt lõi giúp mô hình AI liên tục giảm thiểu sai số
  - phương pháp bước từng bước nhỏ xuôi theo dốc để tìm bộ trọng số tốt nhất
summary: Thuật toán tối ưu hóa lặp giúp điều chỉnh tham số mô hình ngược chiều với đạo hàm của hàm mất mát nhằm giảm thiểu sai số dự đoán.
confusable_notes: {}
follow_up_questions:
  - Tốc độ học (learning rate) ảnh hưởng như thế nào đến khả năng hội tụ của giải thuật hạ độ dốc?
  - Vì sao hạ độ dốc ngẫu nhiên theo lô nhỏ (mini-batch SGD) lại phổ biến hơn phương pháp dùng toàn bộ dữ liệu?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Hãy tưởng tượng bạn đang đứng trên đỉnh đồi giữa màn sương mù dày đặc: bạn không thấy đáy thung lũng, nhưng cảm nhận được độ dốc dưới chân và bước dò từng bước xuống phía dốc nhất cho đến khi xuống tới lòng chảo.

## Chi tiết
Giải thuật hạ độ dốc tính toán vector đạo hàm riêng của hàm mất mát đối với từng tham số cần tối ưu. Do gradient luôn chỉ theo hướng dốc lên mạnh nhất, các tham số sẽ được cập nhật ngược lại theo hướng dốc xuống, nhân với một hệ số tốc độ học. Trong thực tế, các biến thể như hạ độ dốc ngẫu nhiên theo lô nhỏ kết hợp với các bộ tối ưu như Adam hay AdamW giúp mô hình vượt qua các điểm yên ngựa và vùng bằng phẳng trên bề mặt hàm lỗi một cách trơn tru.

## Định nghĩa chuyên ngành
Phương pháp tối ưu hóa số học bậc một lặp đi lặp lại nhằm điều chỉnh vector tham số tỷ lệ thuận với nghịch đảo gradient của phiếm hàm mục tiêu sai số.

## Ví dụ
Thuật toán huấn luyện mạng phân loại hình ảnh cập nhật lại hàng triệu trọng số sau mỗi mẻ dữ liệu nhằm giảm tỷ lệ nhận diện nhầm biển báo giao thông.
