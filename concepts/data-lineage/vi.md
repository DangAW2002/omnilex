---
label: Data lineage
aliases:
  - nguồn gốc dữ liệu
  - phả hệ dữ liệu
loanwords:
  - Data lineage
plain_descriptions:
  - việc truy vết toàn bộ đường đi của dữ liệu từ nơi sinh ra cho đến các bảng báo cáo cuối cùng
  - cây phả hệ trực quan cho biết các bản ghi thô đã trải qua những bước biến đổi nào
summary: Lịch sử và đường đi được ghi nhận của dữ liệu, mô tả chi tiết nguồn gốc, sự di chuyển, các bước biến đổi và đích đến theo thời gian.
confusable_notes: {}
follow_up_questions:
  - Phả hệ dữ liệu cấp cột tự động giúp ích thế nào trong việc tìm nguyên nhân gốc khi đường ống dữ liệu bị lỗi?
  - Tại sao nguồn gốc dữ liệu lại mang tính sống còn khi giải trình tuân thủ quy định kiểm toán?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như mã vạch truy xuất nguồn gốc thực phẩm: cho biết trái cây được trồng ở nông trại nào, qua trạm sơ chế nào, và xe nào đã chở tới kệ hàng siêu thị.

## Chi tiết
Data lineage ghi lại siêu dữ liệu thể hiện xuất xứ, các bước lọc ghép, công thức tính toán và sự di chuyển qua các tầng lưu trữ. Hệ thống danh mục dữ liệu xây dựng đồ thị liên kết từ bảng nghiệp vụ ban đầu, qua các tiến trình xử lý tự động, tới từng biểu đồ chỉ số, giúp kỹ sư phát hiện nhanh nguyên nhân khi số liệu bị sai hoặc đánh giá tác động trước khi đổi tên một cột cơ sở dữ liệu.

## Định nghĩa chuyên ngành
Mô hình biểu diễn cấu trúc và lược sử kiểm toán ghi lại xuất xứ, thứ tự phụ thuộc, các phép biến đổi mã nguồn và điểm tiêu thụ đầu cuối của các thực thể dữ liệu.

## Ví dụ
Một kỹ sư dữ liệu xem đồ thị data lineage để tìm ra chỉ số doanh thu tháng bị lệch bắt nguồn từ đoạn mã quy đổi tỷ giá ngoại tệ vừa được chỉnh sửa trước đó hai bước.
