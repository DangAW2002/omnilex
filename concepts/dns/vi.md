---
label: Domain Name System (DNS)
aliases:
  - DNS
  - Hệ thống tên miền
loanwords:
  - DNS
  - domain name system
plain_descriptions:
  - cuốn danh bạ của mạng internet giúp dịch tên miền dễ nhớ như google.com thành dãy số địa chỉ IP của máy chủ
  - dịch vụ tra cứu tên trang web giúp máy tính kết nối đúng máy chủ cần tìm
summary: >-
  Hệ thống đặt tên phân cấp phân tán có nhiệm vụ dịch đổi tên miền mà con người đọc được thành địa chỉ IP dạng số phục
  vụ định tuyến mạng.
confusable_notes: {}
follow_up_questions:
  - >-
    Quá trình phân giải tên miền đệ quy (recursive resolution) hoạt động từ máy chủ gốc đến máy chủ có thẩm quyền ra
    sao?
  - Vì sao việc cập nhật bản ghi DNS (như A hoặc CNAME) lại cần thời gian lan truyền nếu cài đặt giá trị TTL cao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
autolink:
  aliases:
    DNS: always
---

## Giải thích dễ hiểu
Giống như danh bạ trong điện thoại di động: bạn chỉ cần bấm tìm tên người quen để gọi chứ không cần phải nhớ thuộc lòng từng dãy mười số điện thoại.

## Chi tiết
Hệ thống tên miền (DNS) được tổ chức theo cấp bậc hình cây (từ máy chủ gốc root, tên miền cấp cao nhất như `.com`, `.vn` đến tên miền con). Khi người dùng gõ địa chỉ, máy chủ phân giải đệ quy sẽ tra cứu qua từng cấp để lấy bản ghi địa chỉ (bản ghi A cho IPv4, AAAA cho IPv6) và lưu tạm vào bộ đệm theo thời gian sống (TTL).

## Định nghĩa chuyên ngành
Giao thức tầng ứng dụng và cơ sở dữ liệu phân cấp phân tán ánh xạ các nhãn tên miền dạng chữ sang định danh địa chỉ mạng của thiết bị.

## Ví dụ
Khi người dùng nhập `termbridge.org` vào trình duyệt, máy chủ DNS phân giải tên miền này và trả về địa chỉ IP `198.51.100.45` để kết nối.
