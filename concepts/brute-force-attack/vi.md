---
label: Brute-force attack
aliases:
  - tấn công vét cạn
loanwords:
  - brute-force attack
plain_descriptions:
  - thử lần lượt từng mật khẩu một theo cách thủ công hoặc tự động cho đến khi mở được khóa
  - cách bẻ khóa bằng việc thử hết toàn bộ các tổ hợp số và chữ cái có thể có
summary: Phương thức tấn công thử sai có hệ thống toàn bộ các mật khẩu, khóa hoặc mã băm khả dĩ cho đến khi tìm thấy kết quả chính xác.
confusable_notes: {}
follow_up_questions:
  - Hình thức tấn công nhồi thông tin xác thực (credential stuffing) khác gì so với tấn công vét cạn từ điển truyền thống?
  - Cơ chế phòng thủ nào ngăn chặn hiệu quả các đợt tấn công vét cạn phân tán vào cổng đăng nhập đám mây?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như khi bạn đứng trước một chiếc ổ khóa xe đạp 4 số và kiên nhẫn xoay từng nấc từ số 0000, 0001, 0002 cho đến tận 9999 cho tới khi ổ khóa bật mở ra.

## Chi tiết
Tấn công vét cạn (brute-force) dựa hoàn toàn vào năng lực tính toán của máy tính thay vì tìm kiếm lỗ hổng logic phức tạp. Kẻ tấn công sử dụng các công cụ tự động để thử hàng nghìn hoặc hàng triệu tổ hợp ký tự mỗi giây vào biểu mẫu đăng nhập hoặc các tệp băm mật khẩu ngoại tuyến. Các biến thể bao gồm tấn công từ điển (thử danh sách các từ thông dụng), tấn công rải mật khẩu (password spraying - chỉ thử một mật khẩu phổ biến trên hàng loạt tài khoản để không kích hoạt khóa tài khoản) và vét cạn ngược. Biện pháp ngăn chặn gồm khóa tài khoản tạm thời khi nhập sai quá số lần quy định, hiển thị mã CAPTCHA, giới hạn tần suất truy vấn theo địa chỉ IP và áp dụng bắt buộc xác thực đa yếu tố.

## Định nghĩa chuyên ngành
Kỹ thuật tấn công thử sai liên tục trong mật mã học hoặc kiểm soát truy cập, trong đó phần mềm tự động duyệt tuần tự qua toàn bộ không gian khóa nhằm tìm ra giá trị khớp.

## Ví dụ
Một đoạn mã độc gửi 500 yêu cầu đăng nhập mỗi phút vào cổng SSH để thử các mật khẩu phổ biến như `admin123` hay `root2026` cho đến khi truy cập thành công vào máy chủ.
