---
label: Mã hóa
aliases:
  - Encryption
loanwords:
  - encryption
plain_descriptions:
  - biến đổi thông tin quan trọng thành các ký tự xáo trộn mà chỉ ai có chìa khóa giải mã mới đọc được
  - khóa dữ liệu nhạy cảm bằng chìa khóa số để người lạ dù chặn được gói tin cũng không hiểu gì
summary: Quá trình biến đổi thông tin dạng bản rõ thành dạng bản mã xáo trộn để chỉ những bên có khóa giải mã hợp lệ mới có thể đọc được.
confusable_notes:
  hashing: Mã hóa là phép chuyển đổi hai chiều có thể hoàn nguyên bằng khóa bí mật, trong khi băm (hashing) tạo ra chuỗi tóm lược một chiều không thể đảo ngược.
follow_up_questions:
  - Điểm khác biệt về mặt hiệu năng tính toán giữa mã hóa đối xứng (như AES) và mã hóa bất đối xứng (như RSA) là gì?
  - Mô hình mã hóa phong bì (envelope encryption) bảo vệ các tệp dữ liệu lớn bằng cặp khóa DEK và KEK như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/M%C3%A3_h%C3%B3a
    accessed: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như việc đặt bức thư bí mật vào trong một chiếc hộp sắt có khóa an toàn: chỉ người cầm chiếc chìa khóa khớp với ổ khóa mới mở được hộp để xem nội dung thư.

## Chi tiết
Mã hóa có hai dạng chính: mã hóa đối xứng (như chuẩn AES), trong đó bên gửi và bên nhận dùng chung một khóa bí mật; và mã hóa bất đối xứng (như chuẩn RSA), sử dụng một khóa công khai để mã hóa và một khóa riêng tư để giải mã.

## Định nghĩa chuyên ngành
Quy trình chuyển đổi dữ liệu gốc (bản rõ) thành định dạng không thể đọc được (bản mã) bằng các thuật toán mật mã học, nhằm bảo đảm tính bí mật tuyệt đối của thông tin.

## Ví dụ
Mã hóa số tài khoản ngân hàng và mật khẩu giao dịch bằng thuật toán AES-256 trước khi lưu vào ổ cứng máy chủ.
