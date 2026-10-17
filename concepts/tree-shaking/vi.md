---
label: "Tree shaking"
aliases:
  - "loại bỏ mã thừa"
  - "dead code elimination"
loanwords:
  - "Tree shaking"
autolink:
  label: auto
plain_descriptions:
  - "lọc bỏ những đoạn mã không dùng đến để tệp tải về nhẹ hơn"
  - "kỹ thuật rung cây rụng lá úa giúp loại bỏ các hàm không bao giờ được gọi tới"
summary: "Kỹ thuật tối ưu hóa trong quá trình đóng gói giúp loại bỏ mã nguồn không được sử dụng khỏi sản phẩm cuối cùng."
confusable_notes: {}
follow_up_questions:
  - "Tại sao cơ chế Tree Shaking bắt buộc mã nguồn phải viết bằng cú pháp ES Module chuẩn?"
  - "Trường \"sideEffects: false\" trong tệp package.json giúp trình đóng gói loại bỏ mã thừa hiệu quả ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy hình dung bạn rung một cây táo: những chiếc lá héo úa hoặc cành khô mục sẽ rụng xuống đất, chỉ còn lại những quả táo ngon lành và cành cây khỏe mạnh ở lại trên cây.

## Chi tiết
Tree shaking dựa vào cấu trúc tĩnh của cú pháp ES Module (các câu lệnh import và export cố định). Trong lúc đóng gói dự án, trình biên dịch sẽ dò theo cây phụ thuộc và xác định những hàm, lớp đối tượng nào không bao giờ được gọi tới trong chương trình. Toàn bộ những phần mã thừa thãi này sẽ bị gọt bỏ hoàn toàn, giúp giảm đáng kể kích thước tệp tải về máy người dùng.

## Định nghĩa chuyên ngành
Quy trình loại bỏ mã chết thông qua phân tích tĩnh đồ thị phụ thuộc nhằm loại bỏ các xuất khẩu (exports) không có lời gọi thực thi.

## Ví dụ
Khi lập trình viên chỉ nhập một hàm formatDate từ thư viện có 100 hàm xử lý ngày tháng, kỹ thuật tree shaking sẽ loại bỏ 99 hàm còn lại khỏi tệp xuất bản.
