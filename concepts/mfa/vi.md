---
label: Multi-factor authentication (MFA)
aliases:
  - MFA
  - 2FA
  - xác thực đa yếu tố
  - xác thực hai yếu tố
loanwords:
  - mfa
  - 2fa
autolink:
  aliases:
    MFA: always
    2FA: always
plain_descriptions:
  - đăng nhập bằng hai bước bảo mật như nhập mật khẩu rồi nhập thêm mã gửi về điện thoại
  - hàng rào bảo vệ tài khoản bắt buộc vừa có mật khẩu vừa có vân tay hoặc mã OTP
summary: Phương thức bảo mật yêu cầu người dùng cung cấp từ hai yếu tố xác thực độc lập trở lên trước khi được cấp quyền truy cập hệ thống.
confusable_notes: {}
follow_up_questions:
  - Vì sao mã xác thực gửi qua tin nhắn SMS kém an toàn hơn khóa bảo mật FIDO2 trước các cuộc tấn công chiếm đoạt SIM?
  - Hệ thống xác thực đa yếu tố thích ứng (adaptive MFA) phát hiện hành vi bất thường và kích hoạt bước kiểm tra bổ sung như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như thao tác rút tiền tại cây ATM: bạn không thể rút tiền nếu chỉ có thẻ ngân hàng, bạn bắt buộc phải nhập đúng cả mã PIN cá nhân.

## Chi tiết
Hệ thống MFA kết hợp ít nhất hai trong ba nhóm yếu tố: thứ bạn biết (mật khẩu), thứ bạn sở hữu (điện thoại nhận mã OTP, khóa bảo mật vật lý), và thứ gắn liền với bạn (vân tay, nhận diện khuôn mặt). Kẻ trộm có đánh cắp được mật khẩu cũng không thể vào được tài khoản.

## Định nghĩa chuyên ngành
Cơ chế xác minh danh tính điện tử đòi hỏi cung cấp nhiều bằng chứng độc lập thuộc các nhóm yếu tố khác nhau để phòng ngừa rủi ro lộ lọt thông tin đăng nhập đơn lẻ.

## Ví dụ
Đăng nhập vào ứng dụng ngân hàng số VCB Digibank bằng mật khẩu và xác thực thêm một lần nữa bằng mã OTP gửi qua tin nhắn Smart OTP.
