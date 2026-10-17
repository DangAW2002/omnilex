---
label: "Document Object Model (DOM)"
aliases:
  - "DOM"
loanwords:
  - "Document Object Model (DOM)"
  - "DOM"
autolink:
  aliases:
    DOM: always
plain_descriptions:
  - "cây cấu trúc bên trong trang web cho phép mã lập trình đọc và chỉnh sửa"
  - "mô hình đối tượng đại diện cho các phần tử HTML trên màn hình trình duyệt"
summary: "Giao diện lập trình ứng dụng biểu diễn tài liệu HTML dưới dạng cây phân cấp các đối tượng có thể truy xuất và sửa đổi."
confusable_notes: {}
follow_up_questions:
  - "Tại sao thao tác liên tục vào DOM thật lại dễ gây giảm hiệu năng trang web?"
  - "Khái niệm Virtual DOM giải quyết bài toán tối ưu hóa cập nhật giao diện như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
DOM giống như một gia phả phân nhánh của trang web: mỗi thẻ, đoạn văn hay nút bấm là một thành viên mà bạn có thể tìm đến để thay đổi tên tuổi hoặc vị trí.

## Chi tiết
Khi trình duyệt tải mã HTML, engine kết xuất sẽ phân tích các thẻ để xây dựng một cây đối tượng trong bộ nhớ gọi là cây DOM. Mỗi phần tử là một nút (node) cung cấp các hàm và thuộc tính tương tác thông qua JavaScript như document.querySelector hay element.remove(). Nhờ đó, giao diện có thể thay đổi ngay tức thì mà không cần nạp lại trang web.

## Định nghĩa chuyên ngành
Mô hình đối tượng tài liệu cung cấp cấu trúc biểu diễn dạng cây chuẩn hóa cho các phần tử web cùng các hàm giao tiếp lập trình độc lập ngôn ngữ.

## Ví dụ
Lệnh document.getElementById("alert-box").style.display = "none"; tìm đến phần tử hộp thông báo và ẩn nó khỏi giao diện đang hiển thị.
