---
label: "TypeScript"
aliases:
  - "TS"
loanwords:
  - "TypeScript"
  - "TS"
autolink:
  aliases:
    TS: never
plain_descriptions:
  - "phiên bản JavaScript bổ sung kiểm tra kiểu dữ liệu để tránh lỗi phần mềm"
  - "ngôn ngữ mở rộng của JavaScript giúp viết mã an toàn và dễ bảo trì hơn"
summary: "Ngôn ngữ lập trình mã nguồn mở phát triển từ JavaScript, bổ sung hệ thống kiểu tĩnh giúp phát hiện lỗi sớm trước khi chạy."
confusable_notes:
  javascript: "TypeScript cung cấp kiểm tra kiểu tĩnh lúc biên dịch, trong khi JavaScript xử lý kiểu linh hoạt lúc chương trình đang chạy."
follow_up_questions:
  - "Hệ thống kiểu cấu trúc (structural typing) trong TypeScript hoạt động thế nào?"
  - "Kiểu Generic trong TypeScript mang lại lợi ích gì cho các dự án quy mô lớn?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy coi TypeScript như phần mềm kiểm tra lỗi chính tả tự động gắn vào JavaScript: nó phát hiện sai sót ngữ pháp ngay khi bạn đang gõ phím thay vì chờ xuất bản.

## Chi tiết
Do Microsoft phát triển, TypeScript bổ sung cú pháp khai báo kiểu, interface, enum và generic vào JavaScript. Trình biên dịch TypeScript phân tích cú pháp để đảm bảo các tham số truyền vào hàm và thuộc tính đối tượng luôn chuẩn xác. Sau khi xác thực không có lỗi kiểu, mã nguồn được biên dịch thành JavaScript thuần để chạy trên trình duyệt hoặc máy chủ.

## Định nghĩa chuyên ngành
Tập cha có định kiểu tĩnh của JavaScript, hỗ trợ kiểm tra kiểu nghiêm ngặt và chuyển đổi mã sang các phiên bản ECMAScript mục tiêu.

## Ví dụ
Khai báo function calculateTotal(price: number, quantity: number): number ngăn chặn lập trình viên vô tình truyền dữ liệu dạng chuỗi vào phép tính số học.
