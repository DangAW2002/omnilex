---
label: Authentication
aliases:
  - AuthN
  - xác thực
loanwords:
  - authentication
autolink:
  aliases:
    AuthN: always
plain_descriptions:
  - kiểm tra xem người dùng hay thiết bị có đúng là đối tượng mà họ tuyên bố hay không
  - xác minh thông tin đăng nhập như mật khẩu hoặc sinh trắc học để chứng minh danh tính
summary: Quy trình bảo mật nhằm kiểm tra và xác nhận tính chính xác của danh tính do người dùng, thiết bị hoặc hệ thống tự khai báo.
confusable_notes:
  authorization: Authentication xác thực danh tính người dùng hoặc dịch vụ (bạn là ai); authorization xác định các quyền hạn và tài nguyên họ được phép truy cập (bạn được làm gì).
follow_up_questions:
  - Ba nhóm yếu tố xác thực chính trong an ninh truy cập bao gồm những gì?
  - Cơ chế xác thực không dùng mật khẩu như chuẩn FIDO2 giúp giảm thiểu nguy cơ bị đánh cắp tài khoản ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như khi bạn xuất trình hộ chiếu tại quầy làm thủ tục xuất nhập cảnh: nhân viên an ninh đối chiếu ảnh chụp, vi mạch sinh trắc học và con dấu chính thức để xác nhận bạn đúng là người có tên trên giấy tờ trước khi cho phép đi qua.

## Chi tiết
Authentication đối chiếu bằng chứng nhận dạng do thực thể cung cấp với dữ liệu đối chiếu đã lưu từ trước. Các yếu tố xác thực phổ biến gồm yếu tố nhận thức (mật khẩu, mã PIN), yếu tố sở hữu (thẻ thông minh, khóa an toàn phần cứng, ứng dụng tạo mã OTP), và yếu tố đặc trưng sinh trắc học (vân tay, khuôn mặt). Các hệ thống hiện đại kết hợp nhiều yếu tố độc lập, sử dụng cơ chế thử thách - phản hồi bằng mật mã thay vì gửi mật khẩu dạng văn bản rõ, đồng thời cấp token phiên làm việc có giới hạn thời gian sau khi xác minh thành công.

## Định nghĩa chuyên ngành
Biện pháp bảo đảm độ tin cậy về tính xác thực của danh tính hoặc đặc tính do một thực thể tự công bố thông qua các cơ chế kiểm tra chứng thực hoặc mật mã học.

## Ví dụ
Lập trình viên đăng nhập vào hệ thống quản lý mã nguồn của công ty bằng cặp khóa SSH kèm theo mã xác nhận từ ứng dụng Authenticator để chứng minh danh tính trước khi đẩy code lên kho lưu trữ.
