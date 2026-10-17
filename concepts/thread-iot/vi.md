---
label: "Thread"
qualifier: "(IoT)"
aliases:
  - "Giao thức Thread"
loanwords:
  - "thread"
autolink:
  label: never
plain_descriptions:
  - "chuẩn mạng lưới không dây tiết kiệm điện dùng địa chỉ IPv6 cho thiết bị nhà thông minh"
  - "giao thức mạng lưới tự phục hồi giúp các thiết bị gia đình kết nối thẳng mà không cần hub trung tâm"
summary: "Giao thức mạng lưới không dây công suất thấp dựa trên nền tảng địa chỉ IPv6 và chuẩn vô tuyến IEEE 802.15.4, mang lại kết nối tin cậy và tự phục hồi cho các thiết bị nhà thông minh."
confusable_notes:
  thread-programming: "Thread (IoT) là giao thức mạng lưới không dây, còn Thread (Lập trình) là luồng thực thi được hệ điều hành lập lịch bên trong một tiến trình."
  matter-iot: "Thread là giao thức tầng truyền dẫn mạng lưới không dây (tầng 3), trong khi Matter là tầng ứng dụng phía trên (tầng 7) chạy được đồng thời trên cả Thread, Wi-Fi và Ethernet."
follow_up_questions:
  - "Kỹ thuật nén tiêu đề 6LoWPAN giúp gói tin địa chỉ IPv6 truyền vừa vặn qua khung sóng vô tuyến 127 byte của chuẩn 802.15.4 như thế nào?"
  - "Bộ định tuyến biên Thread (Thread Border Router) đóng vai trò làm cầu nối giữa mạng lưới cảm biến với mạng Wi-Fi gia đình ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng các thiết bị nhà thông minh xếp thành một vòng tròn truyền tin: nếu một bóng đèn thông minh bất ngờ bị rút phích cắm, các công tắc và ổ cắm xung quanh sẽ tự động chuyển tin nhắn qua đường khác mà không làm gián đoạn hệ thống.

## Chi tiết
Được phát triển bởi liên minh Thread Group, giao thức Thread hoạt động trên nền tảng sóng vô tuyến 2.4 GHz theo chuẩn IEEE 802.15.4. Ưu điểm nổi bật của Thread là hỗ trợ địa chỉ mạng IPv6 nguyên bản thông qua kỹ thuật nén 6LoWPAN, giúp mỗi bóng đèn, khóa cửa và cảm biến đều sở hữu một địa chỉ IP riêng biệt có thể kết nối Internet an toàn. Mạng lưới không có điểm nghẽn trung tâm (single point of failure); nếu thiết bị đang giữ vai trò trưởng nhóm bị ngắt điện, một thiết bị định tuyến khác trong mạng sẽ lập tức đứng lên thay thế. Các bộ định tuyến biên (Border Router) kết nối mạng Thread thẳng vào mạng Wi-Fi gia đình.

## Định nghĩa chuyên ngành
Giao thức mạng lưới vô tuyến dựa trên địa chỉ IPv6 hoạt động trên lớp vật lý IEEE 802.15.4 ở băng tần 2.4 GHz, tích hợp mã hóa bảo mật DTLS và kiến trúc định tuyến tự phục hồi không có nút thắt cổ chai.

## Ví dụ
Một căn hộ lắp đặt 30 cảm biến khói, nhiệt độ và công tắc thông minh liên kết thành mạng lưới Thread, cho phép khóa cửa nhận lệnh mở khóa ngay lập tức ngay cả khi đường truyền Internet quốc tế của gia đình đang bị mất.
