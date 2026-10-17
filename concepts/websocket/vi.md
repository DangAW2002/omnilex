---
label: WebSocket
aliases:
  - Giao thức WebSocket
loanwords:
  - websocket
plain_descriptions:
  - đường truyền liên tục hai chiều cho phép máy chủ và trình duyệt trao đổi tức thì
  - kết nối mạng duy trì thường trực sau bước nâng cấp từ yêu cầu HTTP
summary: Giao thức truyền thông máy tính cung cấp kênh giao tiếp song công hai chiều toàn phần qua một kết nối TCP duy nhất, được khởi tạo thông qua cái bắt tay nâng cấp từ HTTP.
confusable_notes:
  server-sent-events: WebSocket hỗ trợ giao tiếp hai chiều liên tục giữa client và máy chủ trên kết nối TCP riêng, trong khi Server-Sent Events là luồng đơn hướng chỉ đẩy dữ liệu từ máy chủ xuống client qua giao thức HTTP chuẩn.
follow_up_questions:
  - Quá trình nâng cấp kết nối HTTP mã 101 Switching Protocols thiết lập phiên WebSocket ra sao?
  - Việc cấu hình khung xung nhịp kiểm tra (ping/pong) giúp phát hiện kết nối ngầm bị đứt sau bộ cân bằng tải như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một cuộc gọi điện thoại trực tiếp: sau khi nhấc máy kết nối, cả hai người đều có thể vừa nói vừa nghe cùng một lúc mà không cần phải cúp máy gọi lại cho mỗi câu nói.

## Chi tiết
Giao thức HTTP truyền thống yêu cầu máy khách luôn phải chủ động gửi yêu cầu, khiến các ứng dụng thời gian thực phải dùng các kỹ thuật thăm dò (polling) hao tốn tài nguyên. Giao thức WebSocket bắt đầu qua cổng HTTP tiêu chuẩn với tiêu đề Upgrade. Khi máy chủ chấp thuận bằng mã phản hồi 101 Switching Protocols, kết nối TCP bên dưới sẽ chuyển sang giao thức đóng khung dữ liệu thường trực. Cả hai bên đều có thể gửi các khung tin văn bản UTF-8 hoặc dữ liệu nhị phân với phần tiêu đề chỉ từ 2 đến 10 byte.

## Định nghĩa chuyên ngành
Giao thức truyền thông song công toàn phần hai chiều chuẩn hóa, thiết lập đường truyền khung tin liên tục trên một socket TCP duy nhất thông qua thỏa thuận giao thức ban đầu.

## Ví dụ
Một ứng dụng soạn thảo tài liệu trực tuyến mở phiên WebSocket cho 5 người cùng viết, đồng bộ tọa độ con trỏ chuột và từng ký tự gõ phím với độ trễ dưới 10 mili giây.
