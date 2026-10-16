---
label: "Branch"
qualifier: "(Git)"
aliases:
  - "Nhánh mã nguồn"
loanwords:
  - "branch"
autolink:
  label: never
plain_descriptions:
  - "nhánh làm việc độc lập trong kho mã giúp phát triển tính năng an toàn mà không ảnh hưởng nhánh chính"
  - "con trỏ di động chỉ vào commit mới nhất của một tuyến phát triển riêng biệt"
summary: "Con trỏ tham chiếu di động nhẹ trỏ đến một commit cụ thể trong kho Git, đại diện cho một tiến trình phát triển mã nguồn độc lập."
confusable_notes:
  {}
follow_up_questions:
  - "Vì sao nhánh trong Git lại nhẹ và tạo nhanh hơn vượt trội so với các hệ thống quản lý phiên bản đời cũ?"
  - "Mô hình trunk-based development khác gì so với mô hình GitFlow về vòng đời tồn tại của nhánh?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Đặt một tờ giấy can trong suốt lên trên bản vẽ nhà để vẽ thử phương án chia phòng mà không làm lem bẩn bản thiết kế gốc bên dưới.

## Chi tiết
Trong Git, nhánh thực chất chỉ là một tệp văn bản nhỏ chứa mã băm 40 ký tự của commit mới nhất. Việc tạo nhánh diễn ra tức thì vì hệ thống không hề sao chép tệp tin thực tế. Khi lập trình viên tạo commit mới trên nhánh đang mở, con trỏ nhánh tự động dịch chuyển về phía trước. Điều này giúp các thành viên thoải mái thử nghiệm ý tưởng mới mà không lo làm hỏng mã nguồn đang chạy thực tế.

## Định nghĩa chuyên ngành
Tham chiếu định danh có thể thay đổi, theo dõi đỉnh commit trong đồ thị có hướng không chu trình (DAG) của kho lưu trữ Git.

## Ví dụ
Chạy lệnh `git checkout -b feature/dang-ky-tai-khoan` để tạo nhánh riêng cho công việc tạo tài khoản người dùng mới mà không làm ảnh hưởng nhánh main.
