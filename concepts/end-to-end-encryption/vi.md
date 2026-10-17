---
label: End-to-end encryption (E2EE)
aliases:
  - E2EE
  - mã hóa đầu cuối
loanwords:
  - end-to-end encryption (e2ee)
autolink:
  aliases:
    E2EE: always
plain_descriptions:
  - mã hóa tin nhắn để chỉ người gửi và người nhận đọc được, máy chủ trung gian không thể xem
  - chế độ nhắn tin bảo mật mà ngay cả công ty cung cấp dịch vụ chat cũng không giải mã được
summary: Cơ chế bảo mật truyền thông trong đó dữ liệu được mã hóa ngay trên thiết bị người gửi và chỉ được giải mã bởi người nhận đích, ngăn chặn bên trung gian đọc nội dung.
confusable_notes: {}
follow_up_questions:
  - Giao thức Double Ratchet mang lại tính năng bảo mật chuyển tiếp (forward secrecy) trong các ứng dụng chat như thế nào?
  - Dữ liệu siêu dữ liệu (metadata) nào vẫn có thể bị nhà mạng hoặc máy chủ ghi nhận dù nội dung tin nhắn đã được mã hóa đầu cuối?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc bạn đặt bức thư vào trong một chiếc hộp sắt có khóa an toàn rồi mới giao cho người giao hàng: bạn đã trao sẵn chiếc chìa khóa duy nhất cho bạn mình từ trước, nên bác tài xế và nhân viên kho bãi trung chuyển dù cầm hộp cũng không thể mở ra xem trộm nội dung bên trong.

## Chi tiết
Trong cơ chế mã hóa đầu cuối (E2EE), các khóa mật mã được tạo và lưu trữ độc quyền trên các thiết bị đầu cuối của người dùng. Khi người gửi soạn tin nhắn, ứng dụng trên máy sẽ mã hóa nội dung bằng khóa của người nhận (hoặc khóa phiên sinh ra từ bước bắt tay bất đối xứng). Toàn bộ máy chủ định tuyến, nhà mạng viễn thông và nhà cung cấp dịch vụ đám mây chỉ chuyển tiếp các khối bản mã mà không nắm giữ khóa riêng tư để giải mã. Các giao thức E2EE hiện đại (như giao thức Signal) tích hợp cơ chế xoay vòng khóa liên tục nhằm bảo đảm tính bảo mật chuyển tiếp, nghĩa là kẻ gian dù lộ một khóa trong tương lai cũng không thể giải mã lại các cuộc trò chuyện đã diễn ra trong quá khứ.

## Định nghĩa chuyên ngành
Kiến trúc an ninh truyền thông bảo đảm dữ liệu luôn ở trạng thái mã hóa trên toàn bộ hành trình truyền dẫn giữa hai điểm cuối, duy trì tính bí mật tuyệt đối trước các nút mạng trung gian và nhà cung cấp dịch vụ.

## Ví dụ
Ứng dụng nhắn tin Zalo hoặc WhatsApp bật chế độ mã hóa đầu cuối cho các cuộc gọi thoại và tin nhắn cá nhân, khiến cho ngay cả khi máy chủ bị tấn công thì dữ liệu thu được vẫn chỉ là các chuỗi ký tự xáo trộn vô nghĩa.
