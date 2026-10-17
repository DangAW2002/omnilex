---
label: "Remote terminal unit (RTU)"
aliases:
  - "RTU"
  - "Thiết bị đầu cuối từ xa"
loanwords:
  - "rtu"
autolink:
  aliases:
    RTU: always
plain_descriptions:
  - "thiết bị điện tử chuyên dụng thu thập dữ liệu cảm biến tại các trạm xa xôi không có người trực"
  - "bộ vi xử lý hiện trường chuyển đổi tín hiệu đo đạc và truyền về trung tâm điều khiển scada qua sóng vô tuyến"
summary: "Thiết bị điện tử vi xử lý công nghiệp được lắp đặt tại các địa điểm xa xôi, chuyên thu thập tín hiệu cảm biến, điều khiển cục bộ và truyền dữ liệu về hệ thống SCADA trung tâm."
confusable_notes:
  plc: "RTU được tối ưu hóa cho việc truyền dữ liệu từ xa qua sóng vô tuyến, vệ tinh hoặc mạng di động với mức tiêu thụ điện thấp thích hợp chạy pin năng lượng mặt trời, còn PLC được thiết kế chuyên biệt cho việc điều khiển vòng lặp tốc độ cao, siêu chính xác trong nhà máy."
follow_up_questions:
  - "Chế độ quản lý năng lượng thông minh giúp RTU duy trì hoạt động nhiều tháng trên các trạm đo thủy văn chạy pin mặt trời như thế nào?"
  - "Các giao thức truyền tin như DNP3 hay IEC 60870-5-104 giúp RTU lưu trữ sự kiện và gửi bù dữ liệu khi đứt mạng ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một trạm quan sát khí tượng tự động đặt trên đỉnh núi hẻo lánh: không có người túc trực, chạy hoàn toàn bằng pin mặt trời, đều đặn đo mực nước sông và áp suất đường ống rồi phát sóng vô tuyến báo về đập thủy điện dưới chân núi.

## Chi tiết
RTU đóng vai trò là trạm thu thập tín hiệu tiền tiêu trong các mạng lưới SCADA quản lý lưới điện, cấp thoát nước và đường ống dầu khí trải dài hàng trăm cây số. Được chế tạo để chịu đựng thời tiết khắc nghiệt từ nhiệt độ âm sâu đến nắng gắt, RTU tích hợp các cổng đọc tín hiệu analog và digital có khả năng chống sét lan truyền. Thiết bị lưu trữ sự kiện kèm tem thời gian chính xác từ định vị GPS, tự động thực thi các kịch bản đóng cắt khẩn cấp và truyền dữ liệu về trung tâm qua sóng vệ tinh, 4G hoặc bộ đàm UHF bằng các giao thức DNP3 hoặc IEC 60870-5-104.

## Định nghĩa chuyên ngành
Hệ thống thu thập dữ liệu và điều khiển vi xử lý chuyên dụng được lắp đặt tại hiện trường xa xôi, thực thi chức năng giao tiếp hai chiều với trạm chủ qua hạ tầng mạng diện rộng.

## Ví dụ
Công ty truyền tải điện lắp đặt các bộ RTU tại các trạm biến áp trung gian 110kV không người trực, tự động gửi thông số điện áp và điều khiển đóng cắt máy cắt điện từ xa từ trung tâm điều độ điều khiển.
