---
label: Replication
qualifier: (Cơ sở dữ liệu)
aliases:
  - sao chép cơ sở dữ liệu
  - nhân bản dữ liệu
loanwords:
  - replication
autolink:
  label: never
plain_descriptions:
  - tự động sao chép toàn bộ dữ liệu sang các máy chủ dự phòng để hệ thống không bị gián đoạn khi máy chính gặp sự cố
  - đồng bộ dữ liệu sang nhiều bản sao để người dùng đọc thông tin nhanh hơn mà không làm nghẽn máy chủ ghi
summary: Quá trình sao chép liên tục dữ liệu từ một máy chủ cơ sở dữ liệu sang một hoặc nhiều máy chủ bản sao nhằm tăng tính sẵn sàng và khả năng đọc dữ liệu.
confusable_notes:
  sharding: Replication nhân bản toàn bộ dữ liệu giống nhau qua các server để tăng độ sẵn sàng và đọc, còn sharding phân mảnh các dòng dữ liệu khác nhau sang từng máy chủ để mở rộng dung lượng và ghi.
follow_up_questions:
  - Độ trễ sao chép (replication lag) trong mô hình bất đồng bộ gây ra hiện tượng đọc phải dữ liệu cũ như thế nào?
  - Hệ thống tự động chuyển giao quyền làm chủ (failover) và nâng cấp máy chủ phụ diễn ra theo quy trình nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như cuốn sổ viết có giấy than lót sẵn: bạn viết gì lên trang đầu thì trang dưới cũng được in lại y hệt, lỡ trang trên bị rách thì vẫn còn bản sao bên dưới để dùng.

## Chi tiết
Trong mô hình master-replica (hoặc primary-replica), mọi thao tác ghi dữ liệu được thực hiện trên máy chủ chính, sau đó bản ghi thay đổi được truyền đồng bộ hoặc bất đồng bộ sang các máy chủ phụ (replica). Nếu máy chính gặp sự cố, một máy phụ sẽ được đưa lên thay thế ngay.

## Định nghĩa chuyên ngành
Quy trình đồng bộ hóa dữ liệu phân tán, đảm bảo trạng thái dữ liệu trên các máy chủ cơ sở dữ liệu mục tiêu luôn phản ánh kịp thời các giao dịch phát sinh từ máy chủ nguồn.

## Ví dụ
Cấu hình hai máy chủ replica trong MySQL để xử lý các báo cáo thống kê cuối ngày, giảm tải cho máy chủ chính chuyên ghi nhận đơn hàng.
