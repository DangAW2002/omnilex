---
label: "URL"
aliases:
  - "Uniform Resource Locator"
  - "địa chỉ web"
loanwords:
  - "URL"
  - "Uniform Resource Locator"
autolink:
  label: always
plain_descriptions:
  - "chuỗi địa chỉ bạn gõ vào thanh tìm kiếm của trình duyệt để vào trang web"
  - "đường link tiêu chuẩn chỉ đúng vị trí của tài liệu trên mạng internet"
summary: "Chuỗi định danh tiêu chuẩn chỉ định vị trí cụ thể và phương thức truy cập của một tài nguyên trên mạng."
confusable_notes: {}
follow_up_questions:
  - "URL và URI phân biệt nhau như thế nào trong kiến trúc web?"
  - "Thành phần query parameter và fragment anchor hoạt động ra sao trên trình duyệt?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
URL tương tự như địa chỉ nhà bưu chính đầy đủ: ghi rõ dịch vụ chuyển phát (giao thức), tên tòa nhà (tên miền), tầng lầu (đường dẫn thư mục) và số phòng cụ thể (tham số).

## Chi tiết
Một URL hoàn chỉnh bao gồm các thành phần: giao thức (scheme như https), tên máy chủ hoặc miền, cổng kết nối (port), đường dẫn thư mục tài nguyên (path), chuỗi truy vấn (query parameters bắt đầu bằng dấu ?) và định danh vị trí trang (fragment anchor bắt đầu bằng dấu #). Trình duyệt tách nhỏ chuỗi này để thực hiện tra cứu DNS, kết nối và gửi yêu cầu chính xác.

## Định nghĩa chuyên ngành
Chuỗi định vị tài nguyên đồng nhất, một tập con của URI vừa định danh vừa chỉ ra cơ chế truy xuất tài nguyên qua mạng.

## Ví dụ
Địa chỉ https://example.com:8080/products/search?category=books#reviews chứa giao thức https, tên miền example.com, cổng 8080, đường dẫn tìm kiếm sách và vị trí neo phần đánh giá.
