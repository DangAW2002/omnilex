---
label: Khóa chính
aliases:
  - primary key
  - PK
autolink:
  aliases:
    PK: always
loanwords: []
plain_descriptions:
  - mã định danh duy nhất giúp phân biệt một dòng với toàn bộ các dòng khác trong bảng dữ liệu
  - cột nhận diện độc nhất (như số căn cước công dân) để bảo đảm không bao giờ có bản ghi trùng lặp
summary: Một cột hoặc tập hợp các cột trong bảng cơ sở dữ liệu quan hệ dùng để định danh duy nhất mỗi bản ghi trong bảng đó.
confusable_notes:
  foreign-key: Khóa chính dùng để định danh duy nhất một dòng trong chính bảng đó, trong khi khóa ngoại nằm ở bảng khác và trỏ về khóa chính để liên kết dữ liệu.
follow_up_questions:
  - Đánh đổi giữa việc dùng khóa chính số nguyên tự tăng và chuỗi UUID trong cơ sở dữ liệu phân tán là gì?
  - Tại sao khóa chính bắt buộc phải thỏa mãn đồng thời tính duy nhất và không được phép mang giá trị rỗng (NOT NULL)?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Kh%C3%B3a_ch%C3%ADnh
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như số thẻ Căn cước công dân: mỗi người dân chỉ có một số duy nhất, không ai trùng với ai, giúp cơ quan nhà nước không bao giờ nhầm lẫn hồ sơ của hai người.

## Chi tiết
Trong thiết kế cơ sở dữ liệu quan hệ, mỗi bảng cần xác định một khóa chính gồm một hoặc nhiều cột kết hợp. Hệ quản trị cơ sở dữ liệu sẽ tự động tạo một chỉ mục duy nhất (thường là B-tree dạng clustered) trên cột này, từ chối mọi thao tác thêm mới hoặc sửa đổi có ý định tạo bản ghi trùng lặp hoặc để trống giá trị (NULL). Điều này bảo đảm tính toàn vẹn thực thể và giúp truy vấn bản ghi cực nhanh.

## Định nghĩa chuyên ngành
Khóa ứng viên được chọn trong lược đồ quan hệ nhằm áp đặt các ràng buộc duy nhất và ràng buộc không rỗng (NOT NULL) trên các thuộc tính, định danh duy nhất cho từng bộ dữ liệu trong bảng.

## Ví dụ
Bảng nhân sự của công ty gán cho mỗi nhân viên một mã mã_nhân_viên duy nhất làm khóa chính, giúp bảng lương phân biệt chính xác hồ sơ giữa hai người cùng tên "Nguyễn Văn A".
