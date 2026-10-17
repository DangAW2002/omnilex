---
label: "Code splitting"
aliases:
  - "phân tách mã nguồn"
  - "chia nhỏ gói mã"
loanwords:
  - "Code splitting"
autolink:
  label: auto
plain_descriptions:
  - "chia nhỏ ứng dụng web thành từng phần để chỉ tải về khi người dùng cần"
  - "cắt nhỏ tệp mã lớn thành các gói nhỏ giúp mở trang đầu nhanh hơn"
summary: "Kỹ thuật chia nhỏ gói mã nguồn thành nhiều phần nhỏ hơn để tải theo yêu cầu hoặc tải song song nhằm tăng tốc độ tải trang."
confusable_notes:
  lazy-loading: "Code splitting là hành động kỹ thuật chia nhỏ gói mã thành các tệp rời, còn lazy loading là hành động trì hoãn tải các tệp đó tới khi cần dùng."
follow_up_questions:
  - "Cú pháp dynamic import() báo hiệu cho trình đóng gói tách tệp như thế nào?"
  - "Nên áp dụng phân tách mã theo tuyến đường (route-based) hay theo thành phần giao diện (component-based)?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Code splitting giống như việc chia bộ bách khoa toàn thư thành từng tập nhỏ: độc giả hỏi bài lịch sử thì chỉ phát đúng tập lịch sử, không bắt họ vác cả bộ 20 tập nặng nề về nhà.

## Chi tiết
Thay vì bắt người dùng tải về một tệp mã nguồn khổng lồ chứa toàn bộ tính năng của trang web, kỹ thuật code splitting cắt nhỏ chương trình thành các phần riêng biệt. Trang quản trị viên được tách riêng khỏi trang chủ, các biểu đồ phân tích được đóng gói riêng. Nhờ đó, người dùng mở trang chủ chỉ cần tải một tệp rất nhẹ và trang sẽ hiển thị gần như ngay lập tức.

## Định nghĩa chuyên ngành
Chiến lược phân tách đồ thị phụ thuộc thành các tệp gói riêng biệt được nạp bất đồng bộ theo ngữ cảnh điều hướng của người dùng.

## Ví dụ
Tách mã trang thanh toán thành tệp riêng 50 KB, giúp người dùng chỉ duyệt hàng không phải tốn dung lượng tải mã thanh toán về máy.
