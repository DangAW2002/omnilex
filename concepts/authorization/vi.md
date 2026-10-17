---
label: Authorization
qualifier: (Bảo mật)
aliases:
  - AuthZ
  - phân quyền
  - ủy quyền
loanwords:
  - authorization
autolink:
  aliases:
    AuthZ: always
plain_descriptions:
  - quyết định người dùng đã đăng nhập được phép thực hiện những thao tác nào
  - cấp quyền cụ thể để sử dụng các tài nguyên được bảo vệ
summary: Quy trình bảo mật xác định xem một thực thể đã xác thực danh tính có đủ quyền hạn để thực hiện thao tác hoặc truy cập tài nguyên hay không.
confusable_notes:
  authentication: Authorization quyết định các quyền hạn và tài nguyên mà một đối tượng được phép truy cập; authentication xác minh danh tính của đối tượng đó trước.
follow_up_questions:
  - Kiểm soát truy cập dựa trên thuộc tính (ABAC) khác gì so với dựa trên vai trò (RBAC)?
  - Vì sao quy trình phân quyền luôn phải được kiểm tra ở máy chủ thay vì tin tưởng dữ liệu từ máy trạm?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như vào một tòa nhà văn phòng: sau khi xuất trình thẻ nhân viên ở quầy lễ tân để chứng minh bạn là ai, chiếc thẻ đó chỉ mở được các cánh cửa dẫn vào tầng làm việc và kho lưu trữ phù hợp với trách nhiệm công việc của bạn.

## Chi tiết
Authorization diễn ra sau khi danh tính đã được kiểm chứng. Hệ thống đối chiếu các thuộc tính định danh, vai trò và điều kiện ngữ cảnh của bên yêu cầu (như địa chỉ mạng hoặc thời gian truy cập) với các chính sách an ninh định sẵn. Cơ chế kiểm soát truy cập đánh giá các quy tắc này nhằm cho phép, từ chối hoặc giới hạn tương tác với dữ liệu, endpoint hoặc giao diện quản trị. Kiến trúc hiện đại thường triển khai phân quyền phi tập trung qua các công cụ thực thi chính sách và các claim trong token chuẩn hóa.

## Định nghĩa chuyên ngành
Quá trình đối chiếu các đặc quyền của một chủ thể đã xác thực với chính sách kiểm soát truy cập nhằm cấp phép hoặc ngăn chặn các thao tác cụ thể trên đối tượng hệ thống.

## Ví dụ
Nền tảng thương mại điện tử cho phép nhân viên chăm sóc khách hàng xem lịch sử đơn hàng nhưng từ chối quyền duyệt hoàn tiền trên 10 triệu đồng nếu không có chữ ký của quản lý.
