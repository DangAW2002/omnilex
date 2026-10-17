---
label: Server-sent events (SSE)
aliases:
  - SSE
  - Sự kiện từ máy chủ
loanwords:
  - server-sent events (sse)
  - sse
autolink:
  aliases:
    SSE: always
plain_descriptions:
  - máy chủ tự động đẩy các bản tin văn bản mới về trình duyệt qua một kết nối HTTP duy nhất
  - luồng truyền một chiều gửi sự kiện trực tiếp từ máy chủ xuống client theo thời gian thực
summary: Công nghệ web cho phép máy khách nhận luồng dữ liệu sự kiện cập nhật liên tục từ máy chủ theo thời gian thực qua một kết nối HTTP tiêu chuẩn được mở sẵn.
confusable_notes:
  websocket: Server-Sent Events cung cấp luồng đẩy dữ liệu đơn hướng gọn nhẹ từ máy chủ tới client qua HTTP tiêu chuẩn kèm tính năng tự kết nối lại, còn WebSocket hỗ trợ truyền dữ liệu hai chiều và dữ liệu nhị phân trên giao thức riêng.
follow_up_questions:
  - Vì sao SSE lại đặc biệt phù hợp cho các tác vụ truyền luồng từng phần tử chữ (token) từ mô hình ngôn ngữ lớn?
  - Khả năng ghép kênh của HTTP/2 đã khắc phục giới hạn số lượng kết nối tối đa của SSE trên HTTP/1.1 như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như bảng điện tử chạy chữ tin tức: màn hình luôn bật sáng và trung tâm truyền thông liên tục đẩy các dòng tin mới hoặc giá vàng cập nhật ngay khi vừa có biến động.

## Chi tiết
Server-Sent Events (SSE) là chuẩn công nghệ chạy trên nền HTTP, trong đó máy khách gửi một yêu cầu GET với tiêu đề chấp nhận kiểu nội dung text/event-stream. Máy chủ duy trì mở kết nối này và đẩy các dòng dữ liệu văn bản có định dạng tiền tố như data:, event:, và id:. Trình duyệt web có sẵn giao diện EventSource để tự động đọc luồng dữ liệu và tự kết nối lại khi mạng đứt mà lập trình viên không phải tự viết mã phục hồi. Khác với WebSocket, SSE đi qua tường lửa và proxy thông thường dễ dàng.

## Định nghĩa chuyên ngành
Quy chuẩn truyền luồng dữ liệu đơn hướng trên giao thức HTTP, cho phép máy chủ đẩy các bản ghi văn bản UTF-8 bất đồng bộ về phía ứng dụng khách qua một kênh duy nhất.

## Ví dụ
Một trợ lý trí tuệ nhân tạo truyền luồng từng từ câu trả lời về trình duyệt người dùng qua kết nối SSE, tạo hiệu ứng chữ gõ ra mượt mà theo tiến độ suy luận của mô hình.
