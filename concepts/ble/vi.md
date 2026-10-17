---
label: Bluetooth Low Energy (BLE)
aliases:
  - "BLE"
  - "Bluetooth năng lượng thấp"
loanwords:
  - "bluetooth low energy"
  - "ble"
autolink:
  aliases:
    BLE: always
plain_descriptions:
  - công nghệ vô tuyến tầm ngắn tiêu thụ cực ít pin dùng cho vòng đeo tay và phụ kiện
  - chuẩn bluetooth tiết kiệm năng lượng kết nối cảm biến với điện thoại ở cự ly gần
summary: Công nghệ mạng cá nhân không dây cự ly ngắn được thiết kế để truyền tải dữ liệu với mức tiêu thụ điện năng cực thấp.
confusable_notes: {}
follow_up_questions:
  - Cấu trúc hồ sơ thuộc tính chung GATT tổ chức dữ liệu thành các dịch vụ và đặc tính như thế nào?
  - Chế độ phát quảng bá không kết nối mang lại lợi ích gì cho các trạm định vị beacon trong nhà?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Khác với Bluetooth truyền thống thường dùng cho tai nghe nhạc liên tục làm hao pin nhanh, Bluetooth năng lượng thấp (BLE) gần như ngủ yên phần lớn thời gian và chỉ thức dậy trong vài phần nghìn giây để bắn dữ liệu cảm biến rồi lập tức chợp mắt lại.

## Chi tiết
BLE vận hành trên dải tần 2.4 GHz được chia thành 40 kênh tần số, trong đó có 3 kênh dành riêng cho việc phát quảng bá và tìm kiếm thiết bị. Dữ liệu trong BLE được chuẩn hóa theo mô hình GATT gồm các Dịch vụ (Services) và Đặc tính (Characteristics) được định danh bởi chuỗi UUID. Nhờ chu kỳ hoạt động cực ngắn và khả năng kết nối tức thì, thiết bị đo nhịp tim hoặc thẻ định vị có thể dùng liên tục từ một đến vài năm chỉ với một viên pin cúc áo.

## Định nghĩa chuyên ngành
Chuẩn công nghệ mạng không dây cá nhân tầm ngắn do Bluetooth SIG phát triển, tối ưu hóa mức tiêu thụ năng lượng và kiến trúc truyền tin cho các thiết bị ngoại vi chạy pin.

## Ví dụ
Thiết bị đo nhịp tim đeo ngực tự động phát tín hiệu BLE truyền nhịp tim từng giây về đồng hồ chạy bộ thông minh của người dùng.
