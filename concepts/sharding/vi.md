---
label: Sharding
aliases:
  - phân mảnh cơ sở dữ liệu
  - phân vùng ngang
loanwords:
  - sharding
plain_descriptions:
  - kỹ thuật chia nhỏ bảng dữ liệu khổng lồ sang nhiều máy chủ riêng biệt để chia tải
  - tách người dùng sang các cụm máy chủ khác nhau dựa theo khu vực hoặc mã định danh
summary: Mô hình kiến trúc cơ sở dữ liệu phân chia một tập dữ liệu logic theo chiều ngang sang nhiều máy chủ vật lý độc lập.
confusable_notes:
  database-replication: Sharding chia nhỏ dữ liệu thành các phần riêng biệt trên nhiều node, còn replication sao chép cùng một tập dữ liệu nguyên vẹn tới nhiều máy chủ khác nhau.
follow_up_questions:
  - Việc chọn sai khóa phân mảnh (shard key) gây ra tình trạng nghẽn điểm nóng (hot-spotting) như thế nào?
  - Các phép kết nối bảng chéo mảnh (cross-shard join) ảnh hưởng thế nào đến độ trễ truy vấn?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Thay vì cố nhét hàng triệu hồ sơ vào một chiếc tủ tài liệu duy nhất sắp gãy, người ta mua 10 chiếc tủ nhỏ và xếp hồ sơ tên A-C vào tủ 1, D-F vào tủ 2.

## Chi tiết
Sharding phân bổ các dòng dữ liệu dựa vào khóa phân mảnh (shard key) như mã khách hàng hay vùng địa lý. Mỗi máy chủ shard nắm giữ một phần dữ liệu riêng biệt, giúp toàn bộ hệ thống mở rộng khả năng ghi và lưu trữ vượt qua giới hạn phần cứng của một máy đơn lẻ.

## Định nghĩa chuyên ngành
Chiến lược phân vùng dữ liệu theo chiều ngang, trong đó các tập con bản ghi được phân phối trên các nút máy chủ độc lập không chia sẻ bộ nhớ.

## Ví dụ
Ứng dụng mạng xã hội phân mảnh dữ liệu người dùng miền Bắc sang cụm máy chủ Hà Nội và người dùng miền Nam sang cụm máy chủ TP.HCM.
