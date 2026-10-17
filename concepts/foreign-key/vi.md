---
label: Khóa ngoại
aliases:
  - foreign key
  - FK
autolink:
  aliases:
    FK: always
loanwords: []
plain_descriptions:
  - cột dữ liệu trong một bảng trỏ tới mã nhận diện của dòng trong bảng khác để tạo liên kết
  - mối liên kết bảo đảm rằng một đơn hàng không thể được tạo cho một khách hàng không tồn tại
summary: Cột hoặc tập hợp các cột trong bảng cơ sở dữ liệu quan hệ dùng để tạo mối liên kết dữ liệu giữa hai bảng bằng cách tham chiếu tới khóa chính của bảng khác.
confusable_notes:
  primary-key: Khóa chính định danh duy nhất bản ghi trong chính bảng đó, trong khi khóa ngoại tham chiếu tới khóa chính của bảng khác để duy trì tính toàn vẹn tham chiếu.
follow_up_questions:
  - Quy tắc xóa theo chuỗi (CASCADE DELETE) và cập nhật theo chuỗi (CASCADE UPDATE) hoạt động thế nào trong ràng buộc khóa ngoại?
  - Tại sao việc không tạo chỉ mục cho cột khóa ngoại có thể gây nghẽn hiệu năng nghiêm trọng khi bảng cha thay đổi dữ liệu?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Kh%C3%B3a_ngo%E1%BA%A1i
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc ghi mã số sinh viên vào phiếu mượn sách thư viện: mã số này liên kết chiếc phiếu mượn với hồ sơ đầy đủ của sinh viên đó trong sổ lưu của nhà trường.

## Chi tiết
Khóa ngoại thực thi nguyên tắc toàn vẹn tham chiếu giữa các bảng trong cơ sở dữ liệu quan hệ. Khi kích hoạt ràng buộc này, hệ quản trị cơ sở dữ liệu sẽ kiểm tra để chắc chắn rằng mọi giá trị nhập vào bảng con đều phải có thực ở bảng cha. Nó cũng ngăn chặn việc vô tình xóa một dòng ở bảng cha khi đang có dữ liệu liên quan ở bảng con, trừ khi lập trình viên chỉ định rõ quy tắc xóa dây chuyền (ON DELETE CASCADE).

## Định nghĩa chuyên ngành
Ràng buộc toàn vẹn tham chiếu liên kết một thuộc tính trong bảng với khóa chính hoặc khóa ứng viên của một bảng khác, bảo đảm tính hợp lệ của mối quan hệ giữa các thực thể dữ liệu.

## Ví dụ
Bảng đơn_hàng có cột mã_khách_hàng được khai báo làm khóa ngoại trỏ về bảng khách_hàng, hệ thống sẽ báo lỗi ngay lập tức nếu nhân viên nhập đơn cho một mã khách hàng không có trong hệ thống.
