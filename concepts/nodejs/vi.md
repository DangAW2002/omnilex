---
label: "Node.js"
aliases:
  - "Node"
loanwords:
  - "Node.js"
  - "Node"
autolink:
  label: auto
plain_descriptions:
  - "môi trường cho phép chạy mã JavaScript trực tiếp trên máy chủ thay vì trong trình duyệt"
  - "nền tảng chạy mã JavaScript phía backend giúp xây dựng các dịch vụ web tốc độ cao"
summary: "Môi trường thực thi JavaScript đa nền tảng, mã nguồn mở, cho phép chạy mã nguồn JavaScript bên ngoài trình duyệt web."
confusable_notes: {}
follow_up_questions:
  - "Thư viện libuv trong Node.js giúp xử lý các tác vụ I/O không chặn (non-blocking) ra sao?"
  - "Tại sao các tác vụ tính toán nặng ngốn CPU lại cần tránh chạy trực tiếp trên luồng chính của Node.js?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Node.js đưa JavaScript ra khỏi phạm vi trình duyệt để biến nó thành công cụ điều khiển máy chủ mạnh mẽ, giúp lập trình viên dùng duy nhất một ngôn ngữ cho cả phần nhìn thấy lẫn phần xử lý ngầm.

## Chi tiết
Được xây dựng trên nền tảng engine V8 của Chrome và thư viện libuv, Node.js hoạt động theo mô hình đơn luồng hướng sự kiện và nhập xuất không chặn luồng (non-blocking I/O). Thay vì tạo một luồng riêng cho mỗi kết nối như máy chủ truyền thống, Node.js ủy quyền các tác vụ đọc ghi ổ đĩa và mạng cho hệ điều hành, cho phép một máy chủ xử lý đồng thời hàng chục nghìn kết nối với lượng RAM khiêm tốn.

## Định nghĩa chuyên ngành
Môi trường thực thi mã kịch bản phía máy chủ dựa trên động cơ V8, cung cấp các API giao tiếp trực tiếp với hệ điều hành và mạng máy tính.

## Ví dụ
Đoạn mã máy chủ tạo bằng Node.js có thể lắng nghe tại cổng 3000 và phản hồi dữ liệu JSON cho các ứng dụng di động với độ trễ chỉ vài mili giây.
