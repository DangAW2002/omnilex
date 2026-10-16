---
label: "Type checking"
aliases:
  - "Kiểm tra kiểu dữ liệu"
loanwords:
  - "type checking"
plain_descriptions:
  - "kiểm tra xem biến số và tham số hàm có nhận đúng loại dữ liệu mong muốn hay không"
  - "phát hiện các xung đột sai lệch kiểu dữ liệu trước hoặc trong khi chương trình chạy"
summary: "Quy trình kiểm chứng nhằm xác thực các giá trị dữ liệu gán cho biến hoặc truyền vào hàm có tuân thủ đúng quy tắc hệ thống kiểu của ngôn ngữ lập trình hay không."
confusable_notes:
  {}
follow_up_questions:
  - "Sự đánh đổi về hiệu năng và khả năng bảo trì giữa kiểm tra kiểu tĩnh và kiểm tra kiểu động là gì?"
  - "Cơ chế gradual typing giúp các dự án lớn bổ sung định kiểu từng bước như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Máy đếm tiền tự động chỉ cho phép đưa tiền polymer đúng kích thước vào khay, lập tức đẩy ra nếu gặp tờ giấy lộn hoặc tiền xu sai kích cỡ.

## Chi tiết
Kiểm tra kiểu dữ liệu giúp ngăn ngừa các lỗi thực thi nghiêm trọng như gọi hàm trên một biến rỗng (null/undefined). Ở các ngôn ngữ có kiểm tra kiểu tĩnh (như TypeScript, Go, Java), lỗi sai kiểu được phát hiện ngay khi gõ mã nguồn trong IDE. Ngược lại, ngôn ngữ kiểu động (như Python, JavaScript) kiểm tra tính hợp lệ của kiểu dữ liệu tại thời điểm chương trình đang chạy.

## Định nghĩa chuyên ngành
Cơ chế phân tích ngữ nghĩa tĩnh hoặc động nhằm đảm bảo mọi biểu thức và toán tử trong chương trình tuân thủ các ràng buộc kiểu hình thức theo đặc tả ngôn ngữ.

## Ví dụ
Trình biên dịch TypeScript báo lỗi đỏ khi lập trình viên cố tình truyền một chuỗi văn bản vào hàm tính tổng chỉ nhận mảng số nguyên.
