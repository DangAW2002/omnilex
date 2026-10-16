---
label: Log
qualifier: (Phần mềm)
aliases:
  - Nhật ký phần mềm
  - Tệp nhật ký
loanwords:
  - log
plain_descriptions:
  - dòng ghi chép kèm mốc thời gian do phần mềm tạo ra để giải thích nó vừa thực hiện việc gì
  - cuốn nhật ký ghi lại các hành động, cảnh báo và lỗi xảy ra trong quá trình chạy ứng dụng
summary: >-
  Bản ghi sự kiện độc lập kèm dấu thời gian thể hiện một hành động hoặc biến đổi trạng thái do chương trình máy tính
  phát ra.
confusable_notes: {}
follow_up_questions:
  - Vì sao việc ghi log có cấu trúc dạng JSON được ưa chuộng hơn văn bản thô trong hệ thống hiện đại?
  - Chính sách lưu trữ và lấy mẫu log nào giúp cân bằng giữa chi phí đĩa cứng và yêu cầu tuân thủ?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
autolink:
  label: never
---

## Giải thích dễ hiểu
Giống như nhật ký hải trình của thuyền trưởng: mỗi khi tàu bẻ lái, gặp sóng lớn hoặc cập bến, thuyền trưởng đều ghi rõ ngày giờ và sự việc vào một dòng riêng.

## Chi tiết
Ứng dụng ghi nhận thông tin theo các cấp độ nghiêm trọng tăng dần (DEBUG, INFO, WARN, ERROR, FATAL). Trong hệ thống phân tán, log thường được xuất dưới định dạng JSON có cấu trúc chứa sẵn mã người dùng, mã yêu cầu và tên dịch vụ, giúp hệ thống phân tích nhật ký tập trung dễ dàng truy vấn.

## Định nghĩa chuyên ngành
Bản ghi sự kiện bất biến được sắp xếp theo trình tự thời gian bao gồm mốc thời gian, nội dung thông báo, mức độ nghiêm trọng và siêu dữ liệu ngữ cảnh.

## Ví dụ
Dịch vụ xác thực xuất ra bản ghi `{"level":"WARN","msg":"Đăng nhập thất bại","ip":"192.0.2.1"}` khi có người nhập sai mật khẩu ba lần liên tiếp.
