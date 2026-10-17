---
label: "Inertial measurement unit (IMU)"
aliases:
  - "IMU"
  - "Bộ đo lường quán tính"
loanwords:
  - "imu"
autolink:
  aliases:
    IMU: always
plain_descriptions:
  - "cụm cảm biến kết hợp đo gia tốc và con quay hồi chuyển để theo dõi hướng và chuyển động"
  - "cảm biến tư thế giúp điện thoại hay drone biết nó đang nghiêng, quay hay di chuyển hướng nào"
summary: "Khối cảm biến tích hợp đa trục kết hợp gia tốc kế, con quay hồi chuyển và từ kế để đo đạc gia tốc tuyến tính, vận tốc góc và hướng không gian của vật thể chuyển động."
confusable_notes:
  accelerometer: "Gia tốc kế chỉ đo lực tác động và gia tốc tịnh tiến thẳng theo các trục tọa độ, trong khi IMU kết hợp thêm con quay hồi chuyển để đo tốc độ xoay và xác định toàn diện tư thế nghiêng."
follow_up_questions:
  - "Thuật toán hợp nhất dữ liệu như bộ lọc Kalman kết hợp gia tốc kế và con quay hồi chuyển để triệt tiêu độ trôi góc ra sao?"
  - "Khác biệt giữa cảm biến IMU 6 bậc tự do (6-DOF) và IMU 9 bậc tự do (9-DOF) có thêm từ kế là gì?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy hình dung hệ thống tiền đình bên trong tai người: các ống bán khuyên chứa dịch lỏng giúp não bạn biết rõ mình đang cúi đầu, xoay người hay đi thang máy ngay cả khi bạn đang nhắm chặt mắt.

## Chi tiết
Bộ đo lường quán tính (IMU) tích hợp các linh kiện cơ vi điện tử (MEMS) vào một con chip bán dẫn duy nhất. Một cảm biến IMU 6 trục tiêu chuẩn bao gồm một gia tốc kế 3 trục (đo lực quán tính trên các trục X, Y, Z) và một con quay hồi chuyển 3 trục (đo tốc độ xoay góc nghiêng, góc chúi và góc quay). Các loại IMU 9 trục tích hợp thêm cảm biến từ trường 3 trục đóng vai trò như la bàn số. Phần mềm nhúng sử dụng các thuật toán lọc bù để ghép nối dữ liệu từ các cảm biến này, giúp giữ thăng bằng cho máy bay không người lái (drone), kính thực tế ảo và định vị dẫn đường khi mất sóng GPS.

## Định nghĩa chuyên ngành
Cụm cảm biến điện tử gồm các gia tốc kế và con quay đo vận tốc góc trực giao, dùng để thu thập và cung cấp các tham số về lực tác động riêng, tốc độ quay và góc nghiêng của đối tượng so với hệ quy chiếu quán tính.

## Ví dụ
Một chiếc flycam đọc dữ liệu từ cảm biến IMU 6 trục 500 lần mỗi giây để phát hiện gió giật làm nghiêng cánh và tự động tăng tốc cánh quạt tương ứng nhằm giữ flycam đứng yên trên không trung.
