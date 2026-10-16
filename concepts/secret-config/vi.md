---
label: Secret
qualifier: (Phần mềm)
aliases:
  - Dữ liệu bí mật
  - Thông tin bí mật phần mềm
  - Khóa bí mật
loanwords:
  - secret
plain_descriptions:
  - dữ liệu nhạy cảm như mật khẩu, khóa API và chứng chỉ mã hóa không bao giờ được để lộ trong mã nguồn
  - thông tin xác thực bảo mật giúp phần mềm kết nối an toàn với cơ sở dữ liệu và dịch vụ bên ngoài
summary: >-
  Tài sản cấu hình nhạy cảm như mật khẩu, mã xác thực hoặc chứng chỉ số đòi hỏi cơ chế mã hóa và quản lý truy cập nghiêm
  ngặt.
confusable_notes: {}
follow_up_questions:
  - Vì sao việc lưu trữ trực tiếp secret trong kho mã nguồn Git là lỗ hổng bảo mật nghiêm trọng?
  - Các hệ thống quản lý secret chuyên dụng tự động tạo mới và luân chuyển (rotate) mật khẩu định kỳ như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
autolink:
  label: never
---

## Giải thích dễ hiểu
Giống như chìa khóa két sắt hoặc mã số két ngân hàng: không ai viết mã khóa lên một tấm bưu thiếp gửi bưu điện, mà phải cất trong tủ bảo mật và chỉ trao tận tay người có trách nhiệm.

## Chi tiết
Secret bao gồm mật khẩu cơ sở dữ liệu, khóa API thanh toán và khóa chứng chỉ bảo mật SSL. Nguyên tắc an ninh nghiêm cấm lưu trực tiếp các thông tin này trong mã nguồn hoặc đóng gói vào container image. Thay vào đó, các kho chuyên dụng (như HashiCorp Vault hay Kubernetes Secret) mã hóa dữ liệu và truyền trực tiếp vào bộ nhớ RAM của ứng dụng khi chạy.

## Định nghĩa chuyên ngành
Dữ liệu vận hành được bảo vệ bằng mật mã đại diện cho quyền truy cập, đòi hỏi cơ chế mã hóa khi truyền tải và lưu trữ kèm hệ thống ghi nhận nhật ký kiểm toán.

## Ví dụ
Lưu trữ khóa API thanh toán trực tuyến trong kho khóa bảo mật, chỉ nạp vào bộ nhớ của container ứng dụng đúng lúc khởi động hệ thống.
