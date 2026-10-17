---
label: "Máy chủ web"
aliases:
  - "web server"
  - "máy chủ HTTP"
loanwords:
  - "web server"
plain_descriptions:
  - "máy tính và phần mềm chuyên tiếp nhận yêu cầu và gửi trang web cho người dùng"
  - "hệ thống lưu trữ và phân phát các tệp HTML, hình ảnh qua mạng internet"
summary: "Hệ thống phần cứng hoặc phần mềm chuyên xử lý các yêu cầu từ máy khách qua giao thức HTTP để cung cấp tài nguyên trang web."
confusable_notes:
  nginx: "Máy chủ web là thuật ngữ chung chỉ hệ thống phục vụ giao thức web, còn Nginx là một phần mềm máy chủ web cụ thể rất nổi tiếng."
follow_up_questions:
  - "Máy chủ web tĩnh khác biệt gì so với máy chủ ứng dụng web động?"
  - "Kiến trúc máy chủ hướng sự kiện có ưu điểm gì trong việc xử lý hàng triệu kết nối đồng thời?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/M%C3%A1y_ch%E1%BB%A7_web
    accessed: "2026-10-17"
---

## Giải thích dễ hiểu
Máy chủ web giống như thủ thư tại thư viện: khi bạn mang phiếu mượn ghi mã số sách (đường link URL) đến quầy, thủ thư sẽ đi tìm đúng cuốn sách đó trên kệ rồi trao tận tay bạn.

## Chi tiết
Thuật ngữ máy chủ web có thể hiểu theo hai khía cạnh: phần cứng là chiếc máy tính chuyên dụng nối mạng internet 24/7, và phần mềm (như Nginx, Apache) chạy trên máy tính đó để lắng nghe các cổng mạng (cổng 80 và 443). Khi có yêu cầu gửi tới, phần mềm máy chủ web sẽ kiểm tra bảo mật, định tuyến yêu cầu, đọc tệp trên đĩa cứng hoặc gọi ứng dụng backend để tạo dữ liệu trả về cho trình duyệt.

## Định nghĩa chuyên ngành
Hệ thống phần mềm dịch vụ mạng triển khai các tiêu chuẩn HTTP để phân tích yêu cầu từ máy khách và phục vụ các tài nguyên siêu văn bản.

## Ví dụ
Máy chủ web tiếp nhận yêu cầu GET /bang-gia, đọc tệp html trong thư mục lưu trữ và truyền nội dung hoàn chỉnh về điện thoại của khách hàng.
