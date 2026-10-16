---
label: "Linter"
aliases:
  - "Công cụ kiểm tra tĩnh mã nguồn"
loanwords:
  - "linter"
plain_descriptions:
  - "công cụ quét mã nguồn để tìm lỗi cú pháp, cách viết cẩu thả và nguy cơ phát sinh lỗi"
  - "phần mềm kiểm tra chính tả tự động cho ngôn ngữ lập trình"
summary: "Công cụ phân tích tĩnh mã nguồn nhằm phát hiện lỗi lập trình, điểm bất thường về cú pháp, vi phạm quy ước định dạng và các nguy cơ bảo mật trước khi chạy mã."
confusable_notes:
  {}
follow_up_questions:
  - "Linter khác gì so với một công cụ tự động định dạng mã nguồn như Prettier?"
  - "Việc cài đặt linter chạy tự động trong Git hook pre-commit mang lại lợi ích gì cho đội ngũ?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như tính năng kiểm tra ngữ pháp và lỗi chính tả trong ứng dụng soạn thảo văn bản, tự động gạch chân đỏ những câu từ sai ngữ pháp hay gõ nhầm chữ ngay khi bạn đang viết.

## Chi tiết
Linter phân tích cú pháp mã nguồn thành cây cú pháp trừu tượng (AST) và đối chiếu với tập quy tắc được cấu hình sẵn. Nó giúp phát hiện sớm các biến khai báo nhưng không dùng, thiếu sót trong xử lý ngoại lệ hoặc vi phạm tiêu chuẩn định dạng của đội ngũ mà không cần phải chạy chương trình.

## Định nghĩa chuyên ngành
Tiện ích phân tích tĩnh duyệt qua cấu trúc văn bản mã nguồn để đánh giá sự tuân thủ các ràng buộc về cú pháp, ngữ nghĩa, phong cách viết và quy tắc an toàn.

## Ví dụ
Cài đặt ESLint trong dự án TypeScript để tự động chặn các đoạn mã khai báo biến kiểu any hoặc quên gắn từ khóa await trước một hàm bất đồng bộ.
