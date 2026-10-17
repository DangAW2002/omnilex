---
label: Salt
qualifier: (Mật mã học)
aliases:
  - muối mật mã
loanwords:
  - salt
autolink:
  label: never
plain_descriptions:
  - chuỗi dữ liệu ngẫu nhiên trộn vào mật khẩu trước khi băm để chống tấn công tra bảng
  - thành phần ngẫu nhiên bổ sung để hai người đặt mật khẩu giống hệt nhau vẫn có chuỗi băm khác nhau
summary: Chuỗi dữ liệu ngẫu nhiên được ghép nối với mật khẩu bản rõ trước khi băm nhằm tạo ra giá trị băm duy nhất và vô hiệu hóa các bảng tra cứu tính sẵn.
confusable_notes: {}
follow_up_questions:
  - Vì sao kỹ thuật thêm salt giúp chống lại tấn công bảng cầu vồng nhưng không ngăn được việc thử mật khẩu trực tiếp?
  - Điểm khác biệt cơ bản giữa salt trong hàm băm và vector khởi tạo (IV) trong thuật toán mã hóa khối là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như khi hai người cùng mua một chiếc ổ khóa cùng nhãn hiệu: nếu mỗi người sơn lên ổ khóa của mình một vệt màu ngẫu nhiên không đụng hàng, kẻ gian không thể dùng một khuôn mẫu chế tạo sẵn để bẻ khóa cả hai chiếc cùng một lúc.

## Chi tiết
Khi người dùng đăng ký mật khẩu, bộ tạo số giả ngẫu nhiên an toàn tạo ra một chuỗi salt độc nhất (thường dài từ 16 byte trở lên). Hệ thống xác thực ghép nối chuỗi salt này với mật khẩu của người dùng trước khi đưa vào hàm dẫn xuất khóa như Argon2id, bcrypt hoặc PBKDF2. Cả giá trị băm kết quả và chuỗi salt đều được lưu cùng nhau trong cơ sở dữ liệu. Nhờ mỗi tài khoản sở hữu một giá trị salt riêng biệt, hai người dùng dù đặt mật khẩu giống hệt nhau cũng sẽ sinh ra hai chuỗi băm hoàn toàn khác nhau, vô hiệu hóa hoàn toàn các bảng cầu vồng (rainbow tables) tra cứu tính sẵn.

## Định nghĩa chuyên ngành
Chuỗi bit ngẫu nhiên hoặc giả ngẫu nhiên được kết hợp với mật khẩu bản rõ trước quá trình băm mật mã hoặc dẫn xuất khóa nhằm phòng chống các cuộc tấn công tra từ điển và bảng tính trước.

## Ví dụ
Cổng dịch vụ công trực tuyến tạo ra chuỗi salt ngẫu nhiên 128-bit cho mỗi công dân khi đăng ký tài khoản, ghép với mật khẩu trước khi tính toán mã băm Argon2id lưu vào máy chủ.
