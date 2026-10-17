---
label: "JavaScript"
aliases:
  - "JS"
loanwords:
  - "JavaScript"
  - "JS"
autolink:
  aliases:
    JS: always
plain_descriptions:
  - "ngôn ngữ lập trình giúp trang web có thể tương tác và chuyển động linh hoạt"
  - "ngôn ngữ kịch bản chạy trực tiếp trong mọi trình duyệt web hiện đại"
summary: "Ngôn ngữ lập trình thông dịch đa nền tảng, cho phép tạo ra các tính năng tương tác phức tạp trên trang web."
confusable_notes:
  typescript: "JavaScript có kiểu động và chạy trực tiếp trên trình duyệt, trong khi TypeScript bổ sung hệ thống kiểu tĩnh và phải biên dịch về JavaScript."
follow_up_questions:
  - "Cơ chế Event Loop trong JavaScript xử lý tác vụ bất đồng bộ như thế nào?"
  - "Kế thừa dựa trên nguyên mẫu (prototype) trong JavaScript hoạt động ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Nếu HTML là khung xe, CSS là màu sơn thì JavaScript chính là động cơ, tay lái và bảng điều khiển giúp chiếc xe chuyển động và phản hồi khi người lái bấm nút.

## Chi tiết
JavaScript là ngôn ngữ có tính năng định kiểu động, lập trình hướng đối tượng dựa trên nguyên mẫu (prototype), và mô hình xử lý bất đồng bộ không chặn luồng nhờ Event Loop. Ngôn ngữ được chuẩn hóa theo chuẩn ECMAScript. Ban đầu chỉ chạy trên trình duyệt để thay đổi DOM và bắt tương tác chuột, ngày nay JavaScript chạy rộng rãi ở cả máy chủ thông qua Node.js.

## Định nghĩa chuyên ngành
Ngôn ngữ kịch bản đơn luồng hướng sự kiện tuân theo đặc tả ECMAScript, hỗ trợ hàm hạng nhất và mô hình đối tượng linh hoạt.

## Ví dụ
Đoạn mã document.getElementById("toggleBtn").addEventListener("click", toggleMenu) lắng nghe thao tác nhấp chuột để ẩn hoặc hiện thanh điều hướng trên trang.
