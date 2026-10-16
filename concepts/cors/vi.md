---
label: Cross-Origin Resource Sharing (CORS)
aliases:
  - CORS
loanwords:
  - cors
autolink:
  aliases:
    CORS: always
plain_descriptions:
  - cơ chế bảo mật trên trình duyệt quyết định trang web này có được gọi dữ liệu từ tên miền khác không
  - hàng rào ngăn chặn các trang web lạ tự ý gửi yêu cầu ngầm tới máy chủ dịch vụ của bạn
summary: Cơ chế an toàn dựa trên tiêu đề HTTP cho phép máy chủ cấp quyền cho trình duyệt tải tài nguyên từ các tên miền bên ngoài.
confusable_notes: {}
follow_up_questions:
  - Những điều kiện nào khiến trình duyệt tự động gửi yêu cầu thăm dò OPTIONS?
  - Vì sao việc đặt tiêu đề cho phép dấu hoa thị (*) sẽ thất bại khi bật chế độ gửi kèm cookie?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như thủ tục cấp thị thực xuất nhập cảnh: công dân của nước A muốn sang nước B phải được cơ quan hải quan nước B kiểm tra quy định cho phép nhập cảnh hay không.

## Chi tiết
Mặc định trình duyệt áp dụng chính sách cùng nguồn gốc (same-origin policy) để ngăn chặn mã độc. CORS cho phép nới lỏng chính sách này một cách an toàn thông qua các tiêu đề như `Access-Control-Allow-Origin` hoặc các yêu cầu thăm dò trước (preflight request).

## Định nghĩa chuyên ngành
Giao thức an ninh mạng phía trình duyệt sử dụng các tiêu đề HTTP để phân quyền chia sẻ tài nguyên giữa các tên miền khác nhau.

## Ví dụ
Giao diện web chạy tại `https://web.shopee.vn` gọi lấy dữ liệu sản phẩm từ máy chủ API tại `https://api.shopee.vn` mà không bị trình duyệt chặn.
