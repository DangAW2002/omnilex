---
label: Horizontal scaling
aliases:
  - Scale out
  - Mở rộng theo chiều ngang
loanwords:
  - horizontal scaling
  - scale out
plain_descriptions:
  - thêm nhiều máy chủ mới vào hệ thống để cùng chia tải công việc
  - tăng năng lực xử lý bằng cách chạy nhiều bản sao ứng dụng trên nhiều máy khác nhau
summary: Biện pháp gia tăng năng lực xử lý của hệ thống bằng cách bổ sung thêm nhiều máy chủ hoặc thực thể tính toán độc lập vào cụm tài nguyên để phân tán tải.
confusable_notes:
  vertical-scaling: Mở rộng theo chiều ngang (scale out) bổ sung thêm nhiều máy tính độc lập để dàn trải tải, trong khi mở rộng theo chiều dọc (scale up) nâng cấp phần cứng mạnh hơn như CPU hay RAM cho một máy duy nhất.
follow_up_questions:
  - Ứng dụng cần đáp ứng điều kiện kiến trúc phi trạng thái (stateless) nào để có thể mở rộng theo chiều ngang trơn tru?
  - Bộ nhớ đệm phân tán và cơ sở dữ liệu dùng chung hỗ trợ việc mở rộng theo chiều ngang ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Thay vì cố tìm thuê một người khổng lồ khỏe phi thường để khuân vác, nhà kho thuê thêm 10 công nhân bình thường cùng làm việc song song để chia nhau khiêng hàng.

## Chi tiết
Mở rộng theo chiều ngang (scale out) gia tăng thông lượng và khả năng phục vụ đồng thời bằng cách bổ sung thêm các máy chủ có cấu hình tương đương đứng sau một bộ cân bằng tải. Khi lượng truy cập tăng đột biến, hệ thống tự động giãn nở (autoscaling) sẽ khởi tạo thêm các máy ảo hoặc vùng chứa container. Nhờ tải được chia nhỏ cho từng máy, không máy nào bị quá tải. Tuy nhiên, kiến trúc này đòi hỏi ứng dụng phải được thiết kế phi trạng thái, đẩy dữ liệu phiên làm việc ra bộ nhớ đệm dùng chung.

## Định nghĩa chuyên ngành
Phương thức mở rộng năng lực tính toán bằng cách bổ sung thêm các nút xử lý độc lập hoạt động song song trong một cụm phân tán được điều phối tập trung.

## Ví dụ
Một trang web bán vé tự động tăng số lượng container từ 5 lên 30 máy khi mở bán vé đêm ca nhạc lớn, xử lý êm đẹp 60.000 lượt yêu cầu mỗi phút.
