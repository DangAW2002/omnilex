---
label: Certificate authority (CA)
aliases:
  - CA
  - nhà cung cấp chứng thực số
  - tổ chức chứng thực chữ ký số
loanwords:
  - certificate authority (ca)
autolink:
  aliases:
    CA: always
plain_descriptions:
  - tổ chức uy tín chuyên cấp chứng chỉ số để xác nhận danh tính của các trang web và công ty
  - cơ quan cấp hộ chiếu số của thế giới mạng chịu trách nhiệm ký xác thực các chứng chỉ
summary: Tổ chức bên thứ ba đáng tin cậy chuyên thẩm định danh tính của các thực thể và phát hành chứng chỉ số có chữ ký điện tử.
confusable_notes: {}
follow_up_questions:
  - Các tổ chức cấp chứng chỉ gốc (root CA) thiết lập và duy trì lòng tin trên các hệ điều hành và trình duyệt lớn ra sao?
  - Quy trình quản lý khóa riêng tư trong thiết bị bảo mật phần cứng (HSM) tại các CA được thực hiện nghiêm ngặt như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như Cục Quản lý xuất nhập cảnh cấp hộ chiếu: bạn nộp giấy khai sinh và hồ sơ tùy thân, cơ quan nhà nước đối soát kỹ lưỡng rồi cấp một cuốn hộ chiếu có con dấu quốc gia mà các sân bay và ngân hàng quốc tế đều tin tưởng chấp nhận.

## Chi tiết
Tổ chức chứng thực số (CA) là trụ cột trong Hạ tầng khóa công khai (PKI). Khi một cơ quan hoặc trang web cần chứng chỉ, họ tạo cặp khóa mật mã rồi gửi Yêu cầu ký chứng chỉ (CSR) lên CA. CA thực hiện các bước kiểm tra nghiêm ngặt để xác minh người yêu cầu thực sự sở hữu tên miền hoặc đại diện hợp pháp cho tổ chức. Sau khi xác minh thành công, CA dùng khóa riêng tư của mình để ký điện tử lên chứng chỉ đó. Các hệ điều hành và trình duyệt web tích hợp sẵn kho chứng chỉ gốc đáng tin cậy; khi gặp một chứng chỉ được ký bởi CA uy tín, trình duyệt sẽ tự động chấp nhận danh tính của máy chủ mà không cảnh báo lỗi.

## Định nghĩa chuyên ngành
Thực thể tin cậy trong hạ tầng khóa công khai chịu trách nhiệm thẩm định danh tính của các chủ thể và phát hành các chứng chỉ khóa công khai có chữ ký số.

## Ví dụ
Đội ngũ kỹ thuật gửi yêu cầu cấp chứng chỉ TLS cho tên miền dịch vụ đến tổ chức Let's Encrypt; hệ thống CA này tự động kiểm tra bản ghi DNS để xác thực quyền quản trị trước khi ký phát chứng chỉ số hợp lệ.
