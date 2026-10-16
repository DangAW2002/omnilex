---
label: Throughput
aliases:
  - Thông lượng
  - Thông lượng xử lý
  - Năng suất xử lý
loanwords:
  - throughput
plain_descriptions:
  - tổng khối lượng công việc hoặc dữ liệu mà hệ thống máy tính xử lý xong trong một giây
  - số lượng giao dịch hoặc số megabyte truyền tải qua hệ thống trong một khoảng thời gian
summary: >-
  Tốc độ mà một hệ thống máy tính, kênh truyền thông hoặc ứng dụng xử lý và chuyển giao thành công dữ liệu hoặc giao
  dịch trong một đơn vị thời gian.
confusable_notes:
  latency: >-
    Throughput biểu thị khối lượng công việc hệ thống xử lý được trong một giây, còn latency thể hiện thời gian hoàn
    thành của từng yêu cầu riêng lẻ từ đầu đến cuối.
follow_up_questions:
  - 'Định luật Little liên kết ba yếu tố: số lượng tác vụ đồng thời, độ trễ và thông lượng như thế nào?'
  - Tại sao khi tải vượt quá thông lượng tối đa thì độ trễ lại tăng vọt theo cấp số nhân do hiện tượng hàng đợi?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như lượng nước chảy qua một đường ống lớn: throughput chính là số lít nước phun ra khỏi miệng vòi trong một phút, bất kể từng giọt nước riêng lẻ mất bao nhiêu giây để di chuyển hết đường ống.

## Chi tiết
Thông lượng đo lường công suất và sức tải của hệ thống. Chỉ số này thường được tính bằng số yêu cầu mỗi giây (RPS), số giao dịch mỗi giây (TPS) hoặc tốc độ truyền dữ liệu (Mbps). Trong khi độ trễ cho biết từng yêu cầu chạy nhanh hay chậm, thông lượng cho thấy sức chịu tải tối đa của hệ thống trước khi các hàng đợi bị tràn.

## Định nghĩa chuyên ngành
Thước đo tốc độ định lượng xác định khối lượng các thao tác xử lý, thông điệp hoặc byte dữ liệu được truyền tải thành công trong một khoảng thời gian cụ thể.

## Ví dụ
Hệ thống hàng đợi tin nhắn phân tán đạt thông lượng xử lý ổn định ở mức 250.000 thông điệp mỗi giây vào thời điểm lưu lượng truy cập cao điểm.
