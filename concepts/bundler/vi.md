---
label: "Bundler"
qualifier: "(JavaScript)"
aliases:
  - "module bundler"
  - "bộ đóng gói mã"
loanwords:
  - "Bundler"
  - "module bundler"
autolink:
  label: auto
plain_descriptions:
  - "công cụ gom hàng trăm tệp mã nguồn nhỏ thành vài tệp gọn gàng để trình duyệt tải nhanh hơn"
  - "chương trình đóng gói và tối ưu hóa các tệp JavaScript, CSS trước khi đưa lên mạng"
summary: "Công cụ đóng gói và xử lý các tệp mã nguồn cùng tài nguyên liên quan thành các gói tệp hoàn chỉnh để triển khai lên web."
confusable_notes: {}
follow_up_questions:
  - "Các bundler thế hệ mới như Vite và esbuild tận dụng Native ES Modules để tăng tốc độ phát triển thế nào?"
  - "Cây phụ thuộc (dependency graph) được bundler xây dựng qua những bước nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Bundler giống như người đóng gói đồ đạc chuyên nghiệp: gom hàng trăm món đồ lặt vặt nằm rải rác trong phòng rồi sắp xếp ngăn nắp vào một chiếc va li gọn gàng để bạn mang đi đường.

## Chi tiết
Khi lập trình web hiện đại, mã nguồn được chia nhỏ thành hàng trăm tệp nhỏ để dễ quản lý. Bundler (như Webpack, Rollup, Vite) sẽ bắt đầu từ tệp mấu chốt, phân tích cây quan hệ phụ thuộc thông qua các câu lệnh import, chuyển đổi mã TypeScript sang JavaScript, nén nhỏ dung lượng và tạo ra vài tệp kết quả tối ưu nhất cho trình duyệt tải về.

## Định nghĩa chuyên ngành
Công cụ xây dựng phần mềm phân tích đồ thị phụ thuộc của các mô-đun và tạo ra các gói tài nguyên tĩnh được tối ưu hóa cho môi trường sản xuất.

## Ví dụ
Công cụ Webpack phân tích dự án gồm 80 tệp thành phần và đóng gói thành một tệp bundle.min.js dung lượng 90 KB để đưa lên máy chủ web.
