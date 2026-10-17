---
label: API key
aliases:
  - khóa API
loanwords:
  - api key
plain_descriptions:
  - chuỗi ký tự bí mật mà ứng dụng gửi kèm để tự nhận diện khi gọi dịch vụ web
  - mật khẩu kỹ thuật số giúp nhà cung cấp theo dõi mức dùng và kiểm soát quyền truy cập API
summary: Chuỗi ký tự định danh duy nhất do ứng dụng gửi kèm để xác thực chương trình gọi dịch vụ và theo dõi hạn mức sử dụng API.
confusable_notes: {}
follow_up_questions:
  - Vì sao lập trình viên không bao giờ nên nhúng trực tiếp API key vào mã nguồn phía giao diện người dùng?
  - Các nền tảng đám mây hiện đại hỗ trợ cơ chế tự động xoay vòng và giới hạn phạm vi quyền của API key như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như mã số khách hàng in trên thẻ thành viên của doanh nghiệp: mỗi khi phần mềm gửi đơn đặt hàng sang kho đối tác, nó gửi kèm mã này để nhà kho biết đơn hàng đến từ công ty nào và tài khoản đó có đang hoạt động hay không.

## Chi tiết
Khóa API thường được tạo từ giao diện quản trị dành cho nhà phát triển và liên kết chặt chẽ với một dự án hoặc phần mềm cụ thể. Khi thực hiện giao tiếp qua giao thức HTTP, phía máy khách gửi kèm khóa trong tiêu đề HTTP (như `X-API-Key` hoặc `Authorization`), trong chuỗi truy vấn URL, hoặc trong cookie. Khác với token đăng nhập của người dùng cá nhân, API key chủ yếu định danh chính phần mềm gọi dịch vụ, rất thích hợp cho việc kết nối giữa các hệ thống máy chủ, giới hạn tần suất gọi và tính cước theo lượng tài nguyên tiêu thụ. Nguyên tắc bảo mật bắt buộc phải áp dụng giới hạn theo địa chỉ IP, tên miền hoặc phương thức HTTP cho từng khóa.

## Định nghĩa chuyên ngành
Mã định danh bảo mật dạng chuỗi ký tự do ứng dụng máy khách gửi kèm trong các yêu cầu giao tiếp nhằm định danh và xác thực phần mềm gọi dịch vụ để phục vụ kiểm soát truy cập, đo lường và ghi nhật ký sử dụng.

## Ví dụ
Trang web hiển thị thông tin thời tiết gửi kèm chuỗi API key dài 32 ký tự trong tiêu đề mỗi lần gọi đến máy chủ dữ liệu khí tượng để tính toán số lượt truy vấn trong ngày.
