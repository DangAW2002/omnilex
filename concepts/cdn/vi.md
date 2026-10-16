---
label: Content Delivery Network (CDN)
aliases:
  - CDN
  - Mạng phân phối nội dung
loanwords:
  - CDN
  - content delivery network
plain_descriptions:
  - mạng lưới máy chủ đặt khắp nơi trên thế giới giúp tải trang web và hình ảnh cực nhanh từ trạm gần người dùng nhất
  - hệ thống bộ nhớ đệm phân tán giúp tăng tốc độ tải trang bằng cách lưu sẵn tệp tại các máy chủ biên
summary: >-
  Mạng lưới máy chủ proxy phân tán theo vị trí địa lý thực hiện lưu trữ đệm và phân phối nội dung web tới người dùng với
  độ trễ thấp.
confusable_notes: {}
follow_up_questions:
  - Các tiêu đề cache-control và thời gian sống (TTL) quyết định việc làm mới bộ nhớ đệm CDN như thế nào?
  - Mạng CDN bảo vệ máy chủ gốc chống lại các cuộc tấn công từ chối dịch vụ phân tán (DDoS) bằng cách nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
autolink:
  aliases:
    CDN: always
---

## Giải thích dễ hiểu
Giống như chuỗi cửa hàng tiện lợi ở đầu ngõ: thay vì phải về tận nông trại cách xa hàng trăm cây số để mua sữa, bạn ghé ngay cửa hàng gần nhà có sẵn sữa được chuyển tới từ trước.

## Chi tiết
Mạng CDN đặt các điểm đặt máy chủ (PoP) tại nhiều thành phố trên toàn cầu. Khi người dùng tải trang, hệ thống điều hướng họ đến máy chủ biên gần nhất theo vị trí địa lý. Nếu tệp (như ảnh, video hay mã giao diện) đã có trong bộ nhớ đệm, nó được trả về ngay lập tức; nếu chưa có, CDN lấy từ máy chủ gốc và lưu lại cho lần sau.

## Định nghĩa chuyên ngành
Mạng lưới lớp phủ phân tán toàn cầu gồm các nút biên tối ưu hóa việc phân phối nội dung thông qua định tuyến DNS theo địa lý, ngắt kết nối TLS và chắn tải cho máy chủ gốc.

## Ví dụ
Một trang tin điện tử đặt máy chủ gốc tại Singapore nhưng lưu đệm ảnh bài viết tại các trạm CDN ở Hà Nội, Tokyo và London giúp độc giả mở bài đọc tức thì.
