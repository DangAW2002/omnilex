---
label: Pagination
aliases:
  - phân trang
loanwords:
  - pagination
plain_descriptions:
  - kỹ thuật chia nhỏ danh sách dữ liệu dài thành nhiều trang để hiển thị dần
  - tải kết quả tìm kiếm theo từng đợt vài chục món thay vì tải hết toàn bộ một lúc
summary: Phương pháp phân chia các tập dữ liệu lớn thành từng phần hoặc từng trang nhỏ nhằm tối ưu hiệu năng và băng thông truyền tải.
confusable_notes: {}
follow_up_questions:
  - Vì sao phân trang theo con trỏ (cursor) chạy nhanh và ổn định hơn phân trang theo vị trí (offset)?
  - Cách tốt nhất để trả về các liên kết trang kế tiếp trong dữ liệu API là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như đọc một cuốn từ điển dày bằng cách lật từng trang có đánh số, thay vì trải một dải giấy dài hàng cây số ra sàn.

## Chi tiết
Hệ thống API thực hiện phân trang thông qua tham số offset-limit hoặc con trỏ (cursor). Phân trang theo con trỏ sử dụng khóa định danh có chỉ mục để tránh tình trạng lặp hoặc sót bản ghi khi danh sách có dữ liệu mới thêm vào liên tục.

## Định nghĩa chuyên ngành
Kỹ thuật phân mảnh tập kết quả truy vấn thành các đoạn giới hạn được tải tuần tự thông qua tham số chỉ mục hoặc con trỏ trạng thái.

## Ví dụ
Giao diện gọi yêu cầu `GET /orders?page=1&limit=10` để xem 10 đơn hàng gần nhất trong bảng điều khiển người dùng.
