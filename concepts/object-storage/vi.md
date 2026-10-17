---
label: Object storage
aliases: []
loanwords:
  - object storage
plain_descriptions:
  - lưu trữ tệp dữ liệu trên đám mây truy cập qua đường dẫn web HTTP với mã định danh
  - nơi lưu trữ ảnh, video và tệp sao lưu dưới dạng đối tượng không cần chia thư mục lồng nhau
summary: Kiến trúc lưu trữ dữ liệu phi cấu trúc dưới dạng các đối tượng riêng biệt kèm siêu dữ liệu phong phú và định danh duy nhất trong không gian địa chỉ phẳng truy cập qua API.
confusable_notes:
  block-storage: Object storage lưu trữ toàn bộ tệp tin kèm metadata truy xuất qua giao thức HTTP web, còn block storage cung cấp các khối sector thô gắn vào máy ảo như một ổ cứng gắn trong.
follow_up_questions:
  - Tính nhất quán dữ liệu (read-after-write consistency) tác động ra sao đến các thao tác ghi và đọc trên hệ thống lưu trữ đối tượng?
  - Chính sách vòng đời dữ liệu (lifecycle policy) tự động chuyển đổi đối tượng ít dùng sang kho lưu trữ lạnh (cold storage) như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như quầy gửi áo khoác ở rạp hát: bạn đưa áo cho nhân viên và nhận về một chiếc thẻ nhựa có đánh số; khi ra về, bạn chỉ cần đưa thẻ ra là lấy đúng chiếc áo của mình mà không cần quan tâm nó được treo ở móc nào bên trong.

## Chi tiết
Khác với hệ thống tệp truyền thống (có cây thư mục lồng nhau) hay lưu trữ khối, lưu trữ đối tượng tổ chức dữ liệu thành các thùng chứa phẳng (bucket). Mỗi đối tượng bao gồm dữ liệu nhị phân, các nhãn siêu dữ liệu (metadata) tùy biến và một khóa định danh (key) duy nhất. Dữ liệu được thao tác trực tiếp qua các lệnh HTTP (GET, PUT, DELETE), cho phép mở rộng dung lượng gần như vô hạn mà không lo đầy ổ đĩa.

## Định nghĩa chuyên ngành
Kiến trúc lưu trữ phân tán quản lý các khối nhị phân phi cấu trúc thành các đối tượng bất biến trong không gian tên phẳng, sử dụng giao diện lập trình RESTful qua HTTP để lưu trữ, truy xuất và phân quyền.

## Ví dụ
Một nền tảng xem phim trực tuyến lưu trữ hàng triệu ảnh đại diện phim trên dịch vụ Amazon S3, mỗi ảnh được tải về qua một đường link HTTPS duy nhất (như https://mybucket.s3.amazonaws.com/posters/movie1.png) thông qua mạng phân phối nội dung CDN.
