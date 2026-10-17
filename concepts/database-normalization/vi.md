---
label: Chuẩn hóa dữ liệu
qualifier: (Cơ sở dữ liệu)
aliases:
  - chuẩn hóa cơ sở dữ liệu
  - normalization
loanwords: []
autolink:
  label: never
plain_descriptions:
  - sắp xếp lại các bảng dữ liệu để loại bỏ việc lưu lặp đi lặp lại cùng một thông tin
  - chia tách bảng sao cho mỗi mẩu thông tin chỉ cần lưu ở một nơi duy nhất
summary: Quá trình tổ chức lại các bảng trong cơ sở dữ liệu quan hệ theo các dạng chuẩn nhằm giảm thiểu dư thừa dữ liệu và nâng cao tính toàn vẹn.
confusable_notes: {}
follow_up_questions:
  - Dạng chuẩn 3 (3NF) loại bỏ các phụ thuộc hàm bắc cầu giữa các thuộc tính không khóa bằng cách nào?
  - Trong trường hợp nào thì việc cố tình giải chuẩn hóa (denormalization) lại là quyết định đúng đắn cho các hệ thống báo cáo?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Chu%E1%BA%A9n_h%C3%B3a_d%E1%BB%AF_li%E1%BB%87u
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc dọn dẹp danh bạ điện thoại: thay vì ghi đầy đủ địa chỉ trụ sở công ty vào từng người đồng nghiệp, bạn tạo riêng một trang ghi địa chỉ công ty và chỉ cần điền tên công ty vào thông tin của từng người.

## Chi tiết
Chuẩn hóa áp dụng các quy tắc toán học tuần tự (các dạng chuẩn 1NF, 2NF, 3NF, BCNF) lên lược đồ cơ sở dữ liệu quan hệ. Kỹ thuật này phân tách các bảng cồng kềnh thành các bảng nhỏ chuyên biệt và liên kết qua khóa ngoại. Nhờ loại bỏ dữ liệu trùng lặp, chuẩn hóa ngăn ngừa các lỗi bất thường khi thêm, sửa hoặc xóa, giúp việc đổi địa chỉ của khách hàng chỉ cần thực hiện trên đúng một dòng duy nhất.

## Định nghĩa chuyên ngành
Kỹ thuật thiết kế lược đồ quan hệ mang tính hệ thống nhằm phân tách các quan hệ để loại bỏ các bất thường cập nhật, phụ thuộc hàm không mong muốn và lưu trữ dư thừa thông qua việc tuân thủ các dạng chuẩn.

## Ví dụ
Một cửa hàng chuẩn hóa cơ sở dữ liệu bằng cách tách số điện thoại khách hàng sang bảng khách_hàng riêng, giúp việc sửa số điện thoại chỉ cần thực hiện một lần thay vì phải sửa trên 50 đơn hàng cũ của họ.
