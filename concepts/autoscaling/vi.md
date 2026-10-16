---
label: Autoscaling
aliases:
  - Tự động co giãn
  - Tự động mở rộng quy mô
loanwords:
  - autoscaling
plain_descriptions:
  - tự động bật thêm máy chủ khi đông người truy cập và tự tắt bớt khi vắng khách để tiết kiệm tiền
  - tính năng linh hoạt tăng giảm số lượng máy chủ dựa trên nhu cầu sử dụng thực tế
summary: >-
  Cơ chế điện toán đám mây tự động điều chỉnh tăng hoặc giảm số lượng tài nguyên máy tính đang hoạt động căn cứ theo chỉ
  số tải thực tế.
confusable_notes: {}
follow_up_questions:
  - Thời gian chờ nguội (cooldown period) ngăn ngừa hiện tượng co giãn liên tục gây bất ổn hệ thống như thế nào?
  - >-
    Sự khác nhau cơ bản giữa mở rộng theo chiều ngang (thêm máy chủ) và mở rộng theo chiều dọc (tăng cấu hình máy) là
    gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như trạm thu phí trên đường cao tốc: vào giờ cao điểm xe cộ ùn ứ, trạm lập tức mở thêm nhiều làn thu phí phụ, đến đêm vắng xe lại đóng bớt làn để tiết kiệm nhân sự.

## Chi tiết
Tính năng tự động co giãn liên tục theo dõi các chỉ số như mức tiêu thụ CPU, RAM hay số lượng yêu cầu trong hàng đợi. Khi vượt quá ngưỡng quy định, hệ thống tự động khởi động thêm máy chủ mới và thêm vào bộ cân bằng tải. Khi lượng truy cập hạ nhiệt, hệ thống ngắt kết nối an toàn và tắt bớt máy chủ thừa để giảm thiểu chi phí thuê đám mây.

## Định nghĩa chuyên ngành
Vòng lặp điều khiển phản hồi tự động thay đổi dung lượng các phiên bản tải công việc dựa trên các chỉ số viễn trắc đối chiếu với chính sách ngưỡng thiết lập sẵn.

## Ví dụ
Hệ thống bán vé xem ca nhạc duy trì mặc định 5 máy chủ vào ngày thường, nhưng tự động tăng lên 35 máy chủ vào đúng giờ mở bán vé để phục vụ lượng truy cập khổng lồ.
