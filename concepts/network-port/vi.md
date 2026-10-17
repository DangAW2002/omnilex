---
label: Cổng
aliases: []
qualifier: (Mạng)
autolink:
  label: never
loanwords:
  - port
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/TCP
    accessed: '2026-10-17'

plain_descriptions:
  - con số đánh dấu kênh truyền đưa dữ liệu đến đúng phần mềm đang chạy trên máy
  - cửa giao tiếp mạng phân biệt luồng dữ liệu web, email hay cơ sở dữ liệu trên cùng một máy chủ
summary: Chỉ số 16-bit trong tiêu đề tầng giao vận dùng để định danh một tiến trình dịch vụ hoặc điểm cuối truyền thông cụ thể trên máy tính.
confusable_notes: {}
follow_up_questions:
  - Cổng chuẩn (0-1023), cổng đăng ký (1024-49151) và cổng động ngắn hạn (49152-65535) có vai trò và quy định sử dụng ra sao?
  - Tại sao một socket kết nối mạng luôn phải kết hợp cả địa chỉ IP và số hiệu cổng mới có thể liên lạc thông suốt?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như số phòng căn hộ bên trong một tòa nhà chung cư: địa chỉ tòa nhà dẫn đường bưu tá đến cổng chung, còn số căn hộ giúp gửi đúng bức thư vào khe cửa của từng gia đình.

## Chi tiết
Cổng mạng có giá trị từ 0 đến 65535 được ghi trong tiêu đề của giao thức TCP hoặc UDP. Dải cổng từ 0 đến 1023 là các cổng hệ thống chuẩn hóa cho các dịch vụ mạng quen thuộc như cổng 80 cho web HTTP, 443 cho web mã hóa HTTPS, 22 cho SSH và 53 cho DNS. Khi gói dữ liệu tới card mạng, hệ điều hành nhìn vào số cổng đích để chuyển dữ liệu vào đúng chương trình đang lắng nghe.

## Định nghĩa chuyên ngành
Cấu trúc định địa chỉ tầng giao vận theo chuẩn RFC 6335, được biểu diễn bằng một số nguyên không dấu 16-bit giúp hệ điều hành ghép kênh nhiều ứng dụng mạng chạy đồng thời trên cùng một địa chỉ IP.

## Ví dụ
Một máy chủ đám mây chạy cùng lúc trang web bán hàng lắng nghe trên cổng TCP 443 và tiến trình quản trị dòng lệnh SSH lắng nghe trên cổng TCP 22 trên cùng một địa chỉ IP duy nhất.
