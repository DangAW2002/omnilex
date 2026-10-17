---
label: "Geofencing"
aliases:
  - "Hàng rào địa lý"
  - "Vùng giới hạn địa lý ảo"
loanwords:
  - "geofencing"
plain_descriptions:
  - "vẽ hàng rào ảo trên bản đồ để tự động kích hoạt báo động khi thiết bị đi ra hoặc đi vào"
  - "tính năng định vị tự động gửi thông báo khi xe cộ hoặc người vượt qua ranh giới quy định"
summary: "Công nghệ thiết lập một ranh giới địa lý ảo trên bản đồ số, tự động kích hoạt các lệnh xử lý hoặc cảnh báo khi thiết bị được giám sát di chuyển ra vào khu vực này."
confusable_notes:
  asset-tracking: "Theo dõi tài sản là việc thu thập liên tục tọa độ vị trí của đồ vật theo thời gian, còn geofencing là công cụ thuật toán so sánh tọa độ đó với một vùng ranh giới hình học để phát cảnh báo khi vượt ranh."
follow_up_questions:
  - "Thuật toán bắn tia (ray casting) xác định một tọa độ GPS nằm trong hay ngoài đa giác hàng rào địa lý phức tạp như thế nào?"
  - "Bộ lọc trễ khoảng cách (hysteresis) giúp ngăn chặn tình trạng gửi báo động liên tục khi xe đỗ sát mép ranh giới ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc bạn dùng phấn vẽ một vòng tròn vô hình quanh công trường xây dựng trên bản đồ số, để ngay khi có chiếc xe lu hoặc máy xúc chạy vượt ra khỏi vòng phấn đó, điện thoại của bạn sẽ lập tức rung chuông báo động chống trộm.

## Chi tiết
Dịch vụ hàng rào địa lý định nghĩa các vùng không gian dưới dạng hình tròn (tâm vĩ độ, kinh độ và bán kính) hoặc các đa giác hình học phức tạp theo chuẩn định dạng GeoJSON. Khi thiết bị định vị gửi tọa độ về máy chủ, thuật toán hình học tính toán điểm nằm trong đa giác (point-in-polygon) sẽ phân loại sự kiện thành ba trạng thái: ĐI VÀO (ENTER), ĐI RA (EXIT) hoặc LƯU LẠI (DWELL). Các sự kiện này được nối với hệ thống phần mềm để tự động chấm công lái xe, khóa bánh xe máy điện thuê chung hoặc mở barie trạm thu phí không dừng.

## Định nghĩa chuyên ngành
Tính năng điện toán không gian thiết lập các ranh giới hình học ảo trên hệ tọa độ địa lý nhằm tự động kích hoạt các sự kiện xử lý khi đối tượng giám sát di chuyển qua lại ranh giới.

## Ví dụ
Dịch vụ cho thuê xe đạp điện công cộng thiết lập hàng rào địa lý ảo bao quanh khu phố đi bộ, tự động ngắt động cơ trợ lực điện và phát âm thanh cảnh báo khi người thuê xe cố tình chạy xe vào khu vực cấm.
