---
label: "TinyML"
aliases:
  - "Học máy trên vi điều khiển"
loanwords:
  - "tinyml"
plain_descriptions:
  - "chạy các mô hình trí tuệ nhân tạo trực tiếp trên chip vi điều khiển siêu nhỏ tiết kiệm pin"
  - "thuật toán học máy thông minh được thu gọn để hoạt động trong các thiết bị điện tử chỉ dùng vài mili-oát điện"
summary: "Phân ngành học máy tập trung vào việc tối ưu hóa và thực thi các mô hình mạng nơ-ron trực tiếp trên các chip vi điều khiển có tài nguyên phần cứng hạn chế và mức tiêu thụ điện năng cực thấp."
confusable_notes: {}
follow_up_questions:
  - "Các kỹ thuật lượng tử hóa số nguyên 8-bit (INT8) và tỉa thưa trọng số nén mô hình AI để vừa vặn trong 256 KB bộ nhớ RAM như thế nào?"
  - "Việc nhận diện câu lệnh giọng nói đánh thức tại chỗ bằng TinyML mang lại lợi ích gì về bảo mật quyền riêng tư và độ trễ?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng việc huấn luyện một chú chó cứu hộ nghiệp vụ thông minh, rồi thu nhỏ toàn bộ kỹ năng đánh hơi thính nhạy của chú chó vào một con chip tí hon gắn trong chiếc chuông báo khói chạy pin mà không cần kết nối mạng Internet.

## Chi tiết
TinyML đưa các khả năng suy luận trí tuệ nhân tạo xuống trực tiếp các thiết bị phần cứng ở rìa mạng tiêu thụ cực ít điện. Trong khi các mô hình AI lớn đòi hỏi những máy chủ đồ họa GPU ngốn hàng trăm oát điện, các mô hình TinyML được tinh giản để chạy vừa vặn trên các chip vi điều khiển 32-bit (như ARM Cortex-M hoặc ESP32) chỉ có vài trăm kilobyte RAM và hoạt động ở mức công suất mili-oát. Quy trình tối ưu hóa sử dụng các kỹ thuật lượng tử hóa dữ liệu số nguyên INT8 và lược bỏ trọng số thừa thông qua các thư viện như TensorFlow Lite for Microcontrollers. Các ứng dụng thực tế phổ biến gồm nhận diện từ khóa giọng nói, phát hiện rung lắc bất thường của máy móc và nhận diện cử chỉ.

## Định nghĩa chuyên ngành
Lĩnh vực kỹ thuật nghiên cứu và triển khai các thuật toán suy luận học máy trên các hệ thống nhúng và vi điều khiển có giới hạn tài nguyên tính toán nghiêm ngặt, vận hành trong phạm vi công suất tiêu thụ dưới một mili-oát.

## Ví dụ
Một cảm biến cơ khí gắn trên máy bơm công nghiệp chạy mô hình TinyML ngay trên chip ARM Cortex-M4 để phân tích dao động rung, lập tức phát hiện nguy cơ kẹt trục bi mà không cần gửi dữ liệu âm thanh thô lên đám mây.
