---
label: API gateway
aliases:
  - Cổng API
loanwords:
  - api gateway
plain_descriptions:
  - cửa ngõ đón mọi yêu cầu từ người dùng rồi phân luồng về các dịch vụ phía sau
  - máy chủ trung gian kiểm tra quyền, giới hạn lưu lượng và định tuyến gọi API
summary: Mẫu máy chủ đóng vai trò cửa ngõ tập trung đón nhận yêu cầu từ client, chuyển tiếp tới các dịch vụ nội bộ phù hợp và thực thi các tác vụ kiểm soát chung.
confusable_notes:
  reverse-proxy: API gateway là một dạng reverse proxy chuyên biệt cho API ứng dụng với khả năng xác thực, biến đổi payload và điều phối dữ liệu, trong khi reverse proxy truyền thống tập trung chủ yếu vào chuyển tiếp mạng thô và lưu bộ nhớ đệm.
follow_up_questions:
  - Mẫu Backend-for-Frontend (BFF) phát triển dựa trên nền tảng API gateway như thế nào?
  - Những chiến lược nào giúp giảm thiểu rủi ro biến API gateway thành nút thắt cổ chai hiệu năng?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như quầy lễ tân ở tòa nhà tổng công ty lớn: đón khách, kiểm tra thẻ ra vào, giải đáp thắc mắc cơ bản và chỉ dẫn khách đến đúng thang máy của từng phòng ban.

## Chi tiết
Cổng API gateway nằm giữa các ứng dụng khách (điện thoại, trình duyệt, đối tác) và cụm vi dịch vụ bên trong. Thay vì client phải lưu trữ và gọi hàng chục địa chỉ IP khác nhau, chúng chỉ cần gửi yêu cầu tới một tên miền duy nhất. Tại đây, gateway kiểm tra mã xác thực token, áp dụng hạn mức gọi, kiểm tra dữ liệu đầu vào và chuyển đổi định dạng. Gateway cũng có thể gộp phản hồi từ nhiều dịch vụ thành một gói kết quả trả về, giảm hao pin và tiết kiệm băng thông trên mạng di động.

## Định nghĩa chuyên ngành
Thành phần kiến trúc đóng vai trò điều hướng biên tập trung, chuyển đổi giao thức, áp đặt kiểm soát quyền và thu thập nhật ký giám sát cho toàn bộ cụm dịch vụ vi mô.

## Ví dụ
Cổng API của nền tảng tài chính tiếp nhận 12.000 yêu cầu mỗi giây, kiểm tra token phiên của người dùng rồi chuyển song song lệnh tra cứu số dư và sao kê tài khoản về hai dịch vụ phía sau.
