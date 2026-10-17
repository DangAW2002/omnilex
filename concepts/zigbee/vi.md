---
label: Zigbee
aliases: []
loanwords:
  - "zigbee"
plain_descriptions:
  - chuẩn sóng không dây tạo mạng lưới liên kết các công tắc và cảm biến trong nhà
  - giao thức mạng lưới tiêu thụ ít điện năng truyền tiếp tín hiệu qua các bóng đèn thông minh
summary: Chuẩn mạng lưới không dây công suất thấp dựa trên nền tảng IEEE 802.15.4, chuyên dùng cho các thiết bị điều khiển và tự động hóa nhà ở.
confusable_notes: {}
follow_up_questions:
  - Ba vai trò thiết bị gồm Coordinator, Router và End Device phối hợp với nhau ra sao trong mạng Zigbee?
  - Mạng Zigbee dùng thuật toán nào để tự chữa lành đường truyền khi một nút chuyển tiếp bị mất nguồn?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Zigbee là chuẩn kết nối không dây nơi các thiết bị cắm điện như bóng đèn hay ổ cắm đóng vai trò như các trạm chuyển tiếp: tín hiệu từ cảm biến cửa ở xa không cần phát trực tiếp về hub, mà có thể nhảy qua các bóng đèn trung gian để về đích.

## Chi tiết
Được quản lý bởi Liên minh Tiêu chuẩn Kết nối (CSA), Zigbee sử dụng tầng vật lý theo chuẩn IEEE 802.15.4 ở dải tần 2.4 GHz với tốc độ truyền 250 kbps. Hệ thống bao gồm một bộ điều phối trung tâm (Coordinator), các nút định tuyến chuyển tiếp (Router) và các thiết bị đầu cuối chạy pin (End Device). Nhờ cấu trúc mạng lưới tự tái lập tuyến (self-healing), nếu một bóng đèn trung gian bị tắt nguồn, mạng Zigbee sẽ tự động tìm kiếm đường dẫn khác để bảo đảm thông tin không bị gián đoạn.

## Định nghĩa chuyên ngành
Đặc tả kỹ thuật mạng vô tuyến công suất thấp theo cấu trúc liên kết lưới dựa trên chuẩn IEEE 802.15.4, được thiết kế cho các hệ thống giám sát và điều khiển phân tán.

## Ví dụ
Hệ thống ba mươi bóng đèn thông minh Zigbee trong một căn hộ liên tục chuyển tiếp lệnh điều khiển từ công tắc không dây gắn tường về bộ điều khiển trung tâm.
