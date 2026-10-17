---
label: Lưu trữ theo cột
aliases:
  - columnar storage
  - cơ sở dữ liệu theo cột
loanwords: []
plain_descriptions:
  - cách sắp xếp dữ liệu trên ổ cứng theo từng cột thay vì theo từng hàng
  - gom tất cả giá tiền nằm liền nhau trên ổ đĩa để tính tổng mà không cần đọc tên khách hàng
summary: Phương pháp lưu trữ cơ sở dữ liệu nhóm các giá trị theo cột thay vì theo hàng trên ổ đĩa, giúp tăng tốc tối đa các truy vấn tổng hợp phân tích.
confusable_notes: {}
follow_up_questions:
  - Tính đồng nhất dữ liệu theo cột giúp các thuật toán nén như nén từ điển và nén chuỗi đạt hiệu quả cao ra sao?
  - Tại sao lưu trữ theo dòng vẫn được ưu tiên hơn lưu trữ theo cột đối với các thao tác chèn từng bản ghi đơn lẻ?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: viblo
    locator: https://viblo.asia/search?q=columnar+storage
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc ghi danh sách học sinh ra các trang riêng biệt: một trang chỉ ghi chiều cao, giúp thầy giáo tính chiều cao trung bình của cả lớp trong nháy mắt mà không phải mở từng trang sơ yếu lý lịch chứa địa chỉ nhà.

## Chi tiết
Cơ sở dữ liệu truyền thống ghi toàn bộ một dòng dữ liệu nối tiếp nhau trên ổ cứng, khiến hệ thống phải đọc cả những trường không cần thiết khi tính tổng. Lưu trữ theo cột gom toàn bộ giá trị của cùng một cột nằm liền nhau. Do cùng một kiểu dữ liệu, hệ thống đạt tỷ lệ nén dung lượng vượt trội và cho phép bộ vi xử lý tính toán trực tiếp trên khối nén mà hoàn toàn bỏ qua các cột không liên quan trong câu lệnh truy vấn.

## Định nghĩa chuyên ngành
Kiến trúc bố trí lưu trữ vật lý tổ chức các bản ghi cơ sở dữ liệu theo từng cột thay vì theo từng dòng, giảm thiểu tối đa khối lượng đọc I/O đĩa cho các câu truy vấn quét và tổng hợp dữ liệu phân tích.

## Ví dụ
Một kho dữ liệu chứa 100 triệu dòng bán hàng chỉ cần đọc đúng cột số_tiền từ ổ cứng để tính tổng doanh thu, bỏ qua 45 cột thông tin khác và hoàn thành nhanh gấp 20 lần so với lưu trữ theo dòng.
