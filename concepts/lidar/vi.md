---
label: "LiDAR"
aliases:
  - "Lidar"
  - "Hệ thống quét laser"
loanwords:
  - "lidar"
autolink:
  aliases:
    LiDAR: always
    LIDAR: always
plain_descriptions:
  - "cảm biến phát tia laser và đo thời gian dội lại để vẽ bản đồ không gian ba chiều"
  - "mắt thần quét laser đo khoảng cách lắp trên xe tự lái và máy hút bụi thông minh"
summary: "Phương pháp viễn thám quang học sử dụng chùm tia laser xung chiếu vào vật thể và đo thời gian phản xạ ánh sáng dội lại để lập bản đồ tọa độ ba chiều với độ chính xác cao."
confusable_notes: {}
follow_up_questions:
  - "Công nghệ LiDAR thể rắn (solid-state) loại bỏ các cụm gương xoay cơ học để tăng độ bền cho xe hơi như thế nào?"
  - "Tại sao bước sóng laser trong LiDAR cần được lựa chọn cẩn thận để đảm bảo an toàn tuyệt đối cho mắt người đi đường?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một chú dơi bay trong đêm tối phát ra sóng siêu âm để dò đường, nhưng thay vì dùng âm thanh, cảm biến bắn ra hàng triệu tia laser vô hình va vào tường và bàn ghế rồi dội lại để vẽ nên một bức tranh 3D hoàn hảo về căn phòng.

## Chi tiết
Hệ thống LiDAR (Light Detection and Ranging) phát các xung ánh sáng laser ngắn ở dải hồng ngoại và bấm giờ chính xác thời gian tia sáng bay đi rồi dội ngược lại máy thu quang điện. Dựa trên vận tốc ánh sáng cố định, cảm biến tính ra khoảng cách tới từng điểm vật cản với sai số chỉ vài milimet. Khi kết hợp với gương xoay hoặc mảng quang học bán dẫn, thiết bị quét khắp không gian xung quanh để tạo thành một đám mây điểm (point cloud) dày đặc, giúp xe tự lái, robot hút bụi và máy bay lập bản đồ địa hình định vị vật cản chính xác.

## Định nghĩa chuyên ngành
Công nghệ viễn thám chủ động sử dụng bức xạ laser xung kết hợp để đo khoảng cách và góc phương vị tới các bề mặt phản xạ thông qua nguyên lý đo thời gian truyền của chùm ánh sáng (Time-of-Flight).

## Ví dụ
Một chiếc xe tự lái gắn cụm cảm biến LiDAR 32 kênh trên mui xe, liên tục bắn 600.000 tia laser mỗi giây để phát hiện người đi bộ và chướng ngại vật ở khoảng cách 100 mét trong sương mù.
