---
label: "Generics"
qualifier: "(Lập trình)"
aliases: []
loanwords:
  - "generics"
plain_descriptions:
  - "tính năng cho phép viết các lớp và hàm dùng kiểu dữ liệu giữ chỗ để người dùng truyền kiểu cụ thể vào sau"
  - "cơ chế khuôn mẫu mang lại sự an toàn kiểu dữ liệu cho nhiều loại đối tượng mà không phải sao chép mã nguồn"
summary: "Tính năng ngôn ngữ cho phép định nghĩa các thuật toán và cấu trúc dữ liệu với kiểu giữ chỗ, chỉ xác định kiểu cụ thể khi sử dụng."
confusable_notes: {}
follow_up_questions:
  - "Cơ chế reification giữ lại kiểu dữ liệu trong thời gian chạy của C# khác gì so với cơ chế xóa kiểu (type erasure) của Java?"
  - "Những trường hợp nào nên dùng ràng buộc kiểu (type constraints) để giới hạn tham số generics trong một giao diện nhất định?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một chiếc thùng nhựa vận chuyển có khe cắm nhãn phân loại. Nhà kho sử dụng cùng một mẫu thùng nhựa chắc chắn đó cho mọi loại hàng từ sách vở, đồ điện tử đến trái cây; khe cắm nhãn giúp nhân viên ghi rõ loại hàng bên trong để tránh bỏ lẫn sách vào thùng đựng linh kiện.

## Chi tiết
Generics cho phép lập trình viên viết các lớp, cấu trúc và hàm có khả năng tái sử dụng cao bằng cách tham số hóa kiểu dữ liệu. Thay vì phải viết riêng một hàm cho số nguyên, một hàm cho chuỗi hoặc dùng kiểu chung chung dễ gây lỗi ép kiểu lúc chạy, generics cho phép hoãn việc chọn kiểu dữ liệu cho tới khi sử dụng (ví dụ `List<T>`). Trình biên dịch kiểm tra tính an toàn kiểu dữ liệu ngay khi đóng gói mã nguồn. Ngoài ra, generics còn loại bỏ thao tác đóng gói/mở gói (boxing/unboxing) gây tốn bộ nhớ, mang lại hiệu năng chạy tối đa.

## Định nghĩa chuyên ngành
Tính năng ngôn ngữ hiện thực hóa tính đa hình tham số (parametric polymorphism), trong đó các thủ tục và kiểu dữ liệu được khai báo cùng các tham số kiểu tổng quát được phân giải cụ thể khi biên dịch hoặc thực thi.

## Ví dụ
Lập trình viên khai báo danh sách `List<int> scores = new List<int>();`; trình biên dịch sẽ chỉ cho phép đưa các số nguyên vào danh sách, lập tức báo lỗi đỏ nếu vô tình truyền nhầm một chuỗi văn bản.
