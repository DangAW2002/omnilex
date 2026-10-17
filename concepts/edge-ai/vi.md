---
label: "Edge AI"
aliases:
  - "Trí tuệ nhân tạo tại biên"
  - "On-device AI"
loanwords:
  - "edge ai"
plain_descriptions:
  - "chạy các mô hình trí tuệ nhân tạo trực tiếp trên thiết bị mà không cần gửi dữ liệu lên máy chủ"
  - "suy luận mạng nơ-ron ngay trên chip của camera hoặc cảm biến để xử lý tức thì"
summary: "Việc triển khai và thực thi các mô hình trí tuệ nhân tạo, học sâu trực tiếp trên phần cứng của thiết bị biên mà không phụ thuộc vào kết nối máy chủ đám mây."
confusable_notes:
  fog-computing: "Edge AI tập trung cụ thể vào việc tối ưu và chạy các mô hình học máy (mạng nơ-ron, thị giác máy) ngay trên chip biên, trong khi fog computing là kiến trúc mạng và hạ tầng tính toán phân tán đa năng rộng hơn."
follow_up_questions:
  - "Kỹ thuật lượng tử hóa trọng số (INT8) giúp nén mô hình học sâu vừa khít với bộ nhớ RAM nhỏ của vi điều khiển ra sao?"
  - "Edge AI mang lại lợi ích gì về mặt bảo mật quyền riêng tư cho các hệ thống camera giám sát thông minh?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc bố trí một chuyên gia kiểm định sản phẩm có mắt nhìn tinh tường đứng soi trực tiếp từng con ốc trên băng chuyền, thay vì phải chụp ảnh từng chi tiết rồi gửi thư về văn phòng tổng đài cách đó hàng trăm cây số để chờ người duyệt.

## Chi tiết
Edge AI chuyển đổi giai đoạn suy luận (inference) của các mô hình học máy từ các cụm máy chủ đám mây đắt tiền xuống các dòng chip xử lý chuyên dụng như NPU (Neural Processing Unit), GPU nhúng hoặc vi điều khiển. Nhờ các kỹ thuật tối ưu hóa như lượng tử hóa trọng số (chuyển đổi từ số thực FP32 sang số nguyên 8-bit INT8) và tỉa thưa mạng nơ-ron, các mô hình nhận diện giọng nói hay thị giác máy có thể chạy ổn định với công suất tiêu thụ dưới vài watt. Việc xử lý tại chỗ giúp phản hồi trong vài mili giây, bảo mật hình ảnh nhạy cảm và duy trì hoạt động ngay cả khi đứt mạng.

## Định nghĩa chuyên ngành
Cơ chế triển khai và vận hành quy trình suy luận của các mô hình học máy trực tiếp trên kiến trúc phần cứng xử lý cục bộ được tích hợp bên trong hoặc kề cận các nút mạng biên.

## Ví dụ
Hệ thống camera giao thông trên cao tốc tích hợp chip Edge AI để tự động nhận dạng biển số xe và phát hiện tài xế lấn làn trong thời gian thực mà không cần tải luồng video trực tiếp độ nét cao về trung tâm.
