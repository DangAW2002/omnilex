---
label: REST
aliases:
  - RESTful API
loanwords:
  - rest
  - rest api
autolink:
  label: always
plain_descriptions:
  - cách các ứng dụng và trang web trao đổi dữ liệu với máy chủ qua internet
  - chuẩn giao tiếp giữa ứng dụng điện thoại và hệ thống backend
summary: Kiến trúc phần mềm hướng tài nguyên sử dụng các phương thức HTTP chuẩn để truy xuất và cập nhật dữ liệu qua địa chỉ URI.
confusable_notes: {}
follow_up_questions:
  - REST khác gì so với các kiến trúc gọi thủ tục từ xa RPC?
  - Vì sao tính phi trạng thái giúp hệ thống REST dễ mở rộng quy mô?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như cuốn thực đơn trong nhà hàng: mỗi món có một mã số rõ ràng, bạn dùng phiếu yêu cầu chuẩn để gọi món hoặc hủy món mà nhà bếp hiểu được ngay.

## Chi tiết
Hệ thống REST trao đổi phi trạng thái qua giao thức HTTP, định danh từng đối tượng nghiệp vụ qua URI. Ứng dụng thao tác trên tài nguyên bằng các động từ như GET, POST, PUT, DELETE và thường trao đổi nội dung dưới định dạng JSON.

## Định nghĩa chuyên ngành
Phong cách kiến trúc phần mềm phân tán nhấn mạnh tính phi trạng thái, khả năng lưu đệm, địa chỉ tài nguyên thống nhất và tách biệt rõ ràng giữa client với server.

## Ví dụ
Ứng dụng ngân hàng số trên điện thoại gửi yêu cầu GET tới `/accounts/123/balance` để hiển thị số dư tài khoản.
