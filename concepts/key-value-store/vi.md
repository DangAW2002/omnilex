---
label: Key-value store
aliases:
  - cơ sở dữ liệu khóa - giá trị
  - kho khóa - giá trị
loanwords:
  - Key-value store
plain_descriptions:
  - cơ sở dữ liệu đơn giản và siêu nhanh lưu trữ và tìm kiếm bản ghi dựa vào khóa định danh duy nhất
  - kho dữ liệu dạng từ điển nơi bạn đưa ra một từ khóa để nhận lại giá trị tương ứng ngay lập tức
summary: Loại cơ sở dữ liệu phi quan hệ sử dụng mô hình mảng kết hợp đơn giản, trong đó mỗi phần tử dữ liệu được đánh chỉ mục bằng một khóa riêng biệt.
confusable_notes: {}
follow_up_questions:
  - Bảng băm trên bộ nhớ RAM giúp cơ sở dữ liệu khóa - giá trị đạt độ phức tạp tìm kiếm O(1) như thế nào?
  - Khi nào đội ngũ kỹ thuật nên chuyển từ kho khóa - giá trị đơn giản sang cơ sở dữ liệu tài liệu hoặc quan hệ?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như quầy gửi áo khoác ở nhà hát: bạn gửi áo và nhận lại một tấm thẻ bài có đánh số (khóa). Khi về, bạn đưa lại đúng tấm thẻ bài đó để lấy lại chiếc áo của mình ngay lập tức mà nhân viên không cần biết trong túi áo có gì.

## Chi tiết
Cơ sở dữ liệu khóa - giá trị là mô hình đơn giản nhất trong thế giới NoSQL. Dữ liệu được lưu dưới dạng một khối thông tin tùy ý gắn liền với một chuỗi định danh duy nhất (khóa). Hệ thống không bắt buộc tuân theo bất kỳ cấu trúc bảng nào bên trong giá trị, nhờ đó các thao tác đọc và ghi (GET, SET) đạt tốc độ tối đa với độ phức tạp O(1) và dễ dàng phân tán ra nhiều máy chủ bằng thuật toán băm nhất quán.

## Định nghĩa chuyên ngành
Hệ thống lưu trữ phi quan hệ ánh xạ các khóa định danh duy nhất tới các gói dữ liệu đính kèm, được tối ưu hóa cho các thao tác tra cứu CRUD theo khóa đơn lẻ với thông lượng cao.

## Ví dụ
Một trang thương mại điện tử lưu thông tin giỏ hàng của người dùng vào kho khóa - giá trị với khóa dạng session:user_8912, giúp tải lại giỏ hàng chỉ trong vòng 1 mili giây.
