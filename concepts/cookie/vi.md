---
label: Cookie
aliases: [tệp cookie trình duyệt]
loanwords: [cookie]
plain_descriptions:
  - tệp nhỏ web lưu lại để nhớ bạn là ai khi quay lại
  - thứ các trang web hay bắt bạn bấm chấp nhận theo dõi
summary: Tệp dữ liệu nhỏ được máy chủ gửi và lưu trên trình duyệt của người dùng để ghi nhớ thông tin phiên và theo dõi hành vi.
confusable_notes: {}
follow_up_questions:
  - Phân biệt First-party cookie và Third-party cookie trong quyền riêng tư số?
  - Chính sách Privacy Sandbox của Google ảnh hưởng thế nào đến quảng cáo nhắm mục tiêu?
translation: native
---

## Giải thích dễ hiểu
Giống như chiếc vé giữ xe hoặc mẩu giấy ghi nhớ mà bảo vệ kẹp vào giỏ xe của bạn: khi quay lại cổng, họ nhìn mẩu giấy là biết xe của bạn và bạn đã vào từ lúc nào.

## Chi tiết
Cookie được gửi qua tiêu đề HTTP `Set-Cookie` và trình duyệt tự động gửi lại qua tiêu đề `Cookie` ở mỗi yêu cầu tiếp theo đến cùng tên miền (nếu hợp lệ về domain, path và hạn sử dụng).

## Định nghĩa chuyên ngành
Chuỗi mẩu tin trạng thái nhỏ (HTTP State Management Mechanism) được trao đổi giữa máy chủ web và tác tử người dùng để duy trì tính liên tục cho giao thức HTTP phi trạng thái.

## Ví dụ
Lưu trạng thái đăng nhập hoặc ghi nhớ danh sách giỏ hàng khi người dùng tắt trình duyệt rồi mở lại.
