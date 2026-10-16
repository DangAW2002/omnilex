---
label: GraphQL
aliases: []
loanwords:
  - graphql
autolink:
  label: auto
plain_descriptions:
  - ngôn ngữ truy vấn giúp ứng dụng chỉ lấy đúng những trường thông tin cần thiết
  - cách lấy dữ liệu từ nhiều nguồn khác nhau về giao diện chỉ bằng một lần gọi duy nhất
summary: Ngôn ngữ truy vấn và môi trường thực thi cho API cho phép ứng dụng phía giao diện định nghĩa chính xác cấu trúc dữ liệu mong muốn nhận về.
confusable_notes: {}
follow_up_questions:
  - Cơ chế DataLoader trong GraphQL giải quyết bài toán truy vấn N+1 như thế nào?
  - Trong trường hợp nào xây dựng REST API vẫn thuận lợi hơn dùng GraphQL?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Thay vì nhận một phần ăn đóng gói sẵn có cả những món bạn không ăn, bạn tự tích chọn từng món vào phiếu và nhà bếp chuẩn bị đúng những gì bạn yêu cầu.

## Chi tiết
GraphQL chỉ mở một endpoint duy nhất và hoạt động dựa trên bộ schema có định kiểu chặt chẽ. Phía giao diện gửi chuỗi truy vấn mô tả các trường cần lấy; máy chủ sẽ xử lý và gom toàn bộ dữ liệu trả về trong một gói phản hồi JSON duy nhất.

## Định nghĩa chuyên ngành
Công nghệ truy vấn hướng cấu trúc dữ liệu cho phép ứng dụng client kiểm soát nội dung phản hồi, tránh tình trạng thừa hoặc thiếu dữ liệu khi gọi mạng.

## Ví dụ
Ứng dụng điện thoại chỉ hỏi lấy `họ tên` và `ảnh đại diện` của người dùng thay vì phải tải toàn bộ thông tin tài khoản và lịch sử giao dịch.
