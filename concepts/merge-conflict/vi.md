---
label: "Merge conflict"
aliases:
  - "Xung đột khi hợp nhất mã"
loanwords:
  - "merge conflict"
plain_descriptions:
  - "tình trạng hai nhánh cùng sửa đổi một dòng mã khiến hệ thống không thể tự động quyết định"
  - "sự mâu thuẫn trong quản lý mã nguồn buộc lập trình viên phải can thiệp thủ công để chọn dòng đúng"
summary: "Trạng thái xảy ra trong hệ thống quản lý phiên bản khi các nhánh có những sửa đổi đối nghịch trên cùng một đoạn mã hoặc xóa tệp mà nhánh khác đang sửa, ngăn cản việc gộp tự động."
confusable_notes:
  {}
follow_up_questions:
  - "Những thói quen làm việc nào giúp đội ngũ kỹ thuật giảm thiểu tần suất và độ phức tạp của xung đột hợp nhất?"
  - "Công cụ hiển thị 3 khung nhìn (3-way merge) hỗ trợ lập trình viên tra cứu commit gốc ra sao khi gỡ xung đột?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Hai người cùng viết đè lên một dòng trong cuốn sổ nhật ký chung với nội dung khác nhau, buộc cả hai phải ngồi lại để chọn lấy một câu thống nhất.

## Chi tiết
Git có thể tự động gộp các tệp khác nhau hoặc các đoạn mã nằm cách xa nhau. Nhưng nếu hai nhánh cùng sửa chung một vị trí kể từ điểm phân nhánh, Git sẽ dừng quá trình và gắn các ký hiệu đánh dấu (`<<<<<<<`, `=======`, `>>>>>>>`). Lập trình viên phải mở tệp, tự chọn lấy đoạn mã chính xác, xóa các ký hiệu xung đột rồi tạo commit hoàn tất việc gộp.

## Định nghĩa chuyên ngành
Tình trạng mâu thuẫn giữa các khối mã nguồn giao thoa phát sinh trong quá trình hợp nhất ba chiều (three-way merge) giữa các nhánh commit phân kỳ.

## Ví dụ
Lập trình viên A đổi cấu hình cổng mạng thành 8080 ở dòng 10, trong khi lập trình viên B đổi dòng đó thành 9000, khiến Git báo xung đột hợp nhất khi gộp hai nhánh.
