---
label: Certificate
qualifier: (TLS)
aliases:
  - chứng chỉ TLS
  - chứng chỉ SSL
  - chứng chỉ X.509
loanwords:
  - certificate
autolink:
  label: never
  aliases:
    chứng chỉ TLS: auto
    chứng chỉ SSL: auto
    chứng chỉ X.509: auto
plain_descriptions:
  - giấy chứng nhận điện tử chứng minh một trang web sở hữu tên miền và khóa công khai hợp pháp
  - chứng thư an toàn giúp kích hoạt biểu tượng ổ khóa và đường truyền HTTPS trên trình duyệt
summary: Tệp dữ liệu số tuân theo chuẩn X.509 có chữ ký số nhằm gắn kết một khóa công khai với tên miền hoặc danh tính của chủ thể.
confusable_notes: {}
follow_up_questions:
  - Cơ chế Certificate Transparency hỗ trợ phát hiện các chứng chỉ bị cấp trái phép ra sao?
  - Quá trình tự động gia hạn chứng chỉ qua giao thức ACME của các tổ chức như Let's Encrypt diễn ra như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như giấy phép đăng ký kinh doanh có dấu đỏ treo trên tường của một cửa hiệu: nó mang con dấu chính thức của chính quyền để xác thực tên cửa hàng, địa chỉ và chủ sở hữu, giúp khách hàng bước vào cảm thấy an tâm rằng đây là cửa hàng thật chứ không phải cơ sở mạo danh.

## Chi tiết
Chứng chỉ TLS tuân thủ định dạng chuẩn quốc tế ITU-T X.509. Nó chứa thông tin về tên miền của chủ thể (Common Name và Subject Alternative Names), thông tin tổ chức, khóa công khai của máy chủ, thời hạn hiệu lực, các thuật toán mã hóa sử dụng và chữ ký số của Tổ chức chứng thực số (CA) phát hành. Khi trình duyệt web kết nối đến một máy chủ HTTPS, trình duyệt sẽ kiểm tra chứng chỉ này, lần theo chuỗi tin cậy ngược về chứng chỉ gốc (root CA) được cài sẵn trên hệ điều hành và xác nhận tên miền trùng khớp trước khi mở phiên mã hóa.

## Định nghĩa chuyên ngành
Đối tượng dữ liệu có chữ ký số theo chuẩn X.509 dùng để liên kết xác thực một khóa công khai với một tên miền hoặc thông tin định danh của thực thể sở hữu.

## Ví dụ
Máy chủ ngân hàng trực tuyến gửi chứng chỉ TLS X.509 cho trình duyệt của khách hàng để chứng minh quyền sở hữu trang web `ebank.vietcombank.com.vn` và cung cấp khóa công khai cho bước bắt tay mã hóa.
