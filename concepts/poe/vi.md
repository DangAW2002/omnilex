---
label: "Power over Ethernet (PoE)"
aliases:
  - "PoE"
  - "Cấp nguồn qua Ethernet"
loanwords:
  - "poe"
autolink:
  aliases:
    PoE: always
plain_descriptions:
  - "công nghệ truyền nguồn điện trực tiếp qua dây cáp mạng ethernet cùng với dữ liệu"
  - "chuẩn cấp điện giúp camera giám sát và bộ phát wifi hoạt động mà không cần cắm ổ điện riêng"
summary: "Công nghệ mạng cho phép truyền tải đồng thời dòng điện một chiều và dữ liệu số trên cùng một sợi cáp mạng xoắn đôi Ethernet tiêu chuẩn."
confusable_notes:
  mesh-network: "PoE là phương thức cấp nguồn điện vật lý trực tiếp qua dây cáp mạng đồng Ethernet, còn mesh network là cấu trúc định tuyến không dây chuyển tiếp gói tin giữa các trạm sóng."
follow_up_questions:
  - "Chuẩn IEEE 802.3bt Loại 4 tận dụng cả bốn đôi dây cáp mạng để cung cấp công suất 90 watt như thế nào?"
  - "Quy trình đo điện trở bắt tay nhận diện thiết bị PoE diễn ra ra sao để tránh làm chập cháy các cổng mạng máy tính thông thường?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như sợi cáp sạc USB đa năng dành cho các thiết bị mạng công nghiệp, giúp chiếc camera an ninh hoặc bộ phát Wi-Fi gắn trên trần nhà vừa có mạng internet tốc độ cao, vừa có nguồn điện hoạt động chỉ qua một sợi dây mạng duy nhất mà không cần thợ điện kéo ổ cắm tới tận nơi.

## Chi tiết
Được chuẩn hóa qua các thế hệ IEEE 802.3af (15,4 W), 802.3at (PoE+, 30 W) và 802.3bt (lên đến 90 W), PoE đưa điện áp một chiều khoảng 48V lên các cặp dây đồng xoắn của cáp mạng Cat5e trở lên. Thiết bị cấp nguồn (PSE, như switch mạng PoE) thực hiện quy trình bắt tay đo điện trở của thiết bị nhận nguồn (PD) trước khi bơm điện áp cao. Quy trình an toàn này đảm bảo các thiết bị mạng thông thường không bị hư hỏng, đồng thời cắt giảm chi phí đi dây điện lưới cho các công trình lớn.

## Định nghĩa chuyên ngành
Quy chuẩn kỹ thuật thuộc IEEE 802.3 quy định việc truyền dẫn đồng thời năng lượng điện một chiều cùng tín hiệu dữ liệu số qua các đôi dây cáp mạng Ethernet bằng đồng.

## Ví dụ
Một tòa nhà sân bay lắp đặt hai trăm camera an ninh IP trên trần cao, toàn bộ thiết bị nhận nguồn điện và truyền dữ liệu video trực tiếp qua các cổng switch PoE mà không cần chạy dây nguồn 220V riêng.
