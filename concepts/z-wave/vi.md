---
label: "Z-Wave"
aliases: []
loanwords:
  - "z-wave"
plain_descriptions:
  - "chuẩn sóng không dây cho nhà thông minh chạy dải tần riêng không lo bị nghẽn mạng Wi-Fi"
  - "giao thức mạng lưới tầm xa dưới 1 GHz giúp cảm biến và khóa cửa xuyên tường tốt hơn"
summary: "Giao thức truyền thông không dây mạng lưới hoạt động ở dải tần số dưới 1 GHz (sub-GHz), được thiết kế chuyên biệt để tự động hóa nhà ở mà không bị nhiễu sóng bởi mạng Wi-Fi."
confusable_notes:
  zigbee: "Z-Wave hoạt động ở dải tần số dưới 1 GHz (khoảng 868 hoặc 908 MHz) hoàn toàn cách ly với sóng Wi-Fi và Bluetooth 2.4 GHz, trong khi Zigbee chủ yếu chen chúc trong dải tần 2.4 GHz đông đúc."
follow_up_questions:
  - "Tại sao bước sóng tần số dưới 1 GHz giúp tín hiệu Z-Wave đâm xuyên qua các bức tường bê tông và sàn nhà dày tốt hơn sóng 2.4 GHz?"
  - "Khung bảo mật bắt buộc Z-Wave S2 (Security 2) bảo vệ các khóa cửa điện tử thông minh chống lại các đợt tấn công giải mã như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một kênh bộ đàm riêng biệt chỉ dành riêng cho các thiết bị trong nhà: vì phát sóng ở dải tần số riêng cách xa các cục phát Wi-Fi và lò vi sóng, tín hiệu sóng có thể dễ dàng đi xuyên qua những bức tường bê tông kiên cố.

## Chi tiết
Được phát triển ban đầu bởi Zensys (nay thuộc Silicon Labs), Z-Wave hoạt động ở dải tần số vô tuyến dưới 1 GHz (như 908.42 MHz tại Bắc Mỹ và 868.42 MHz tại châu Âu). Việc lựa chọn dải tần này mang lại khả năng đâm xuyên vật cản tường nhà và sàn bê tông vượt trội, đồng thời hoàn toàn tránh được tình trạng nghẽn sóng ở dải tần 2.4 GHz đang bị Wi-Fi và Bluetooth chiếm dụng. Mạng Z-Wave tổ chức theo cấu trúc lưới (mesh) hỗ trợ tối đa 232 thiết bị với tối đa 4 bước nhảy chuyển tiếp. Mọi thiết bị hiện đại bắt buộc phải tích hợp tiêu chuẩn bảo mật Z-Wave S2 sử dụng thuật toán mã hóa AES-128 để chống đột nhập.

## Định nghĩa chuyên ngành
Giao thức truyền thông vô tuyến dải hẹp dưới 1 GHz được tiêu chuẩn hóa (theo khuyến nghị ITU-T G.9959), tối ưu hóa cho mạng lưới điều khiển thông lượng thấp, độ trễ nhỏ trong các hệ thống tự động hóa nhà ở.

## Ví dụ
Một hệ thống an ninh gia đình sử dụng Z-Wave để liên kết các khóa cửa thông minh, cảm biến vỡ kính và còi báo động xuyên qua ngôi nhà ba tầng mà không bao giờ bị nghẽn sóng bởi các thiết bị xem phim trực tuyến qua Wi-Fi.
