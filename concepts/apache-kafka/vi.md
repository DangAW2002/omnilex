---
label: Apache Kafka
aliases:
  - Kafka
loanwords:
  - Apache Kafka
  - Kafka
autolink:
  aliases:
    Kafka: always
plain_descriptions:
  - nền tảng phần mềm phân tán ghi nhận các luồng dữ liệu liên tục qua nhiều máy chủ
  - trục truyền tin thời gian thực giúp lưu lịch sử sự kiện an toàn và phát lại khi cần
summary: Nền tảng luồng sự kiện phân tán dùng cho đường ống dữ liệu hiệu năng cao, phân tích thời gian thực và tích hợp hệ thống.
confusable_notes: {}
follow_up_questions:
  - Kafka đạt thông lượng ghi tuần tự cao bằng nhật ký commit chỉ ghi nối tiếp như thế nào?
  - Sự khác biệt giữa nhóm consumer và các partition riêng lẻ khi mở rộng quy mô Kafka là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy hình dung một bảng tin điều phối trung tâm nơi mọi chuyến hàng xuất kho đều được ghi vào sổ theo đúng thứ tự thời gian. Nhiều chi nhánh cùng đọc từ bảng tin này theo tốc độ riêng mà không làm mất ghi chép cũ.

## Chi tiết
Kafka chia nhỏ sự kiện thành các topic và phân vùng partition trên cụm máy chủ broker để bảo đảm chịu lỗi và xử lý song song. Bên gửi ghi nối tiếp các bản ghi kèm mốc thời gian và chỉ số offset vào từng phân vùng. Bên nhận tự quản lý vị trí đọc thông qua việc lưu offset, giúp nhiều dịch vụ xử lý song song và phát lại dữ liệu quá khứ mà không tốn bộ nhớ RAM của broker.

## Định nghĩa chuyên ngành
Kiến trúc nhật ký bản tin xuất bản - đăng ký phân tán có thể mở rộng theo chiều ngang, lưu trữ bền vững các chuỗi byte có thứ tự vào ổ đĩa phân vùng với chính sách nhân bản và lưu giữ cấu hình được.

## Ví dụ
Một sàn thương mại điện tử dùng Kafka để tiếp nhận 15.000 thông báo đơn hàng mỗi giây, cho phép hệ thống kho và hệ thống phân tích doanh thu cùng đọc dữ liệu mà không ảnh hưởng lẫn nhau.
