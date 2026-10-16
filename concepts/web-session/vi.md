---
label: Session
qualifier: (Web)
aliases:
  - phiên làm việc web
  - phiên người dùng
loanwords:
  - session
autolink:
  label: never
plain_descriptions:
  - bản ghi trên máy chủ ghi nhớ bạn đã đăng nhập khi chuyển qua lại giữa các trang web
  - trạng thái kết nối ghi nhận toàn bộ hoạt động của người dùng trong một lần vào web
summary: Cơ chế lưu trữ trạng thái người dùng trên máy chủ xuyên suốt các yêu cầu mạng phi trạng thái của giao thức HTTP.
confusable_notes: {}
follow_up_questions:
  - Tấn công cố định phiên (session fixation) hoạt động như thế nào và cách phòng chống ra sao?
  - Những thách thức kỹ thuật nào nảy sinh khi mở rộng phiên làm việc trên các cụm máy chủ phân tán?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như mở một hóa đơn mở tại quán cà phê: mỗi lần bạn gọi thêm đồ uống, nhân viên đối chiếu số thẻ bàn để ghi tiếp vào tài khoản của bạn mà không bắt bạn khai lại họ tên.

## Chi tiết
Vì giao thức HTTP không tự lưu trạng thái, máy chủ sẽ tạo một phiên làm việc (session) và gửi mã định danh ngẫu nhiên (session ID) về lưu ở cookie trên trình duyệt. Mỗi khi người dùng bấm xem trang khác, máy chủ đối chiếu mã này để nhận diện tài khoản.

## Định nghĩa chuyên ngành
Ngữ cảnh lưu trữ trạng thái phiên tương tác giữa người dùng và ứng dụng web trên máy chủ, liên kết các truy vấn HTTP riêng lẻ thành một chuỗi hoạt động liên tục.

## Ví dụ
Người dùng đăng nhập tài khoản Zalo Web và tiếp tục trò chuyện qua lại giữa các cửa sổ mà không bị máy chủ yêu cầu nhập lại mật khẩu.
