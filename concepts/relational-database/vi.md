---
label: Cơ sở dữ liệu quan hệ
aliases:
  - RDBMS
  - relational database
autolink:
  aliases:
    RDBMS: always
loanwords: []
plain_descriptions:
  - hệ thống lưu trữ điện tử sắp xếp dữ liệu thành các bảng ngăn nắp liên kết với nhau qua các khóa
  - phần mềm cơ sở dữ liệu có cấu trúc dùng lệnh SQL để giữ thông tin kết nối và chính xác tuyệt đối
summary: Loại cơ sở dữ liệu lưu trữ và quản lý thông tin dưới dạng các bảng có cấu trúc xác định trước và liên kết với nhau qua các mối quan hệ logic.
confusable_notes:
  nosql: Cơ sở dữ liệu quan hệ áp dụng cấu trúc bảng chặt chẽ, ràng buộc khóa ngoại và bảo đảm tính toàn vẹn ACID bằng lệnh SQL, trong khi hệ thống NoSQL ưu tiên lược đồ linh hoạt và khả năng mở rộng theo chiều ngang.
follow_up_questions:
  - Các ràng buộc toàn vẹn quan hệ và khóa ngoại ngăn chặn các bản ghi mồ côi giữa các bảng liên kết như thế nào?
  - Đánh đổi về mặt kiến trúc giữa việc mở rộng theo chiều dọc của cơ sở dữ liệu quan hệ và mở rộng theo chiều ngang là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/C%C6%A1_s%E1%BB%9F_d%E1%BB%AF_li%E1%BB%87u_quan_h%E1%BB%87
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như tập hợp các trang tính liên kết trong một file Excel: trang đầu tiên ghi danh sách khách hàng kèm mã số, trang thứ hai ghi các đơn hàng và chỉ cần điền mã số khách hàng đó để biết ai mua mà không phải gõ lại địa chỉ nhà.

## Chi tiết
Được phát minh bởi Edgar F. Codd, cơ sở dữ liệu quan hệ tổ chức dữ liệu vào các bảng gồm các hàng và cột có cấu trúc định sẵn. Mối liên hệ giữa các bảng được thiết lập thông qua khóa chính và khóa ngoại, được phần mềm tự động kiểm tra và bảo đảm. Hệ thống sử dụng ngôn ngữ truy vấn có cấu trúc (SQL), cung cấp các bảo đảm giao dịch ACID và tối ưu hóa tốc độ tìm kiếm nhờ hệ thống chỉ mục (index).

## Định nghĩa chuyên ngành
Kiến trúc cơ sở dữ liệu dựa trên mô hình dữ liệu quan hệ, tổ chức thông tin thành các bảng gồm hàng và cột với các ràng buộc quan hệ toán học, lược đồ định sẵn và bảo đảm giao dịch ACID.

## Ví dụ
Một ứng dụng ngân hàng sử dụng cơ sở dữ liệu quan hệ PostgreSQL để bảo đảm lệnh chuyển tiền từ bảng tài khoản thanh toán sang bảng tài khoản tiết kiệm luôn khớp số dư và không bị thất thoát.
