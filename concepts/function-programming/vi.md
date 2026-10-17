---
label: "Function"
qualifier: "(Lập trình)"
aliases:
  - "Hàm"
loanwords:
  - "function"
autolink:
  label: never
  aliases:
    Hàm: never
plain_descriptions:
  - "khối mã tái sử dụng được viết để thực hiện một tác vụ tính toán cụ thể"
  - "tập hợp các câu lệnh có nhận tham số đầu vào và trả về kết quả"
summary: "Khối câu lệnh độc lập tiếp nhận tham số, thực thi chuỗi thao tác xử lý và có thể trả về một kết quả đầu ra."
confusable_notes: {}
follow_up_questions:
  - "Ngăn xếp lệnh (call stack) quản lý khung thực thi và địa chỉ trả về ra sao khi các hàm gọi lồng nhau?"
  - "Những tiêu chí nào phân biệt giữa hàm thuần khiết và thủ tục gây ra tác dụng phụ?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một chiếc máy xay sinh tố. Việc bỏ trái cây và sữa vào cối đóng vai trò như các đối số đầu vào; nhấn nút sẽ kích hoạt quy trình xay, và kết quả trút ra ly là một món đồ uống hoàn chỉnh.

## Chi tiết
Hàm đóng gói các câu lệnh phía sau một giao diện gọi lệnh rõ ràng. Nó nhận vào không hoặc nhiều tham số đầu vào, biến đổi chúng và trả về kết quả thông qua từ khóa return, hoặc chỉ thực hiện các chuỗi tác vụ cần thiết. Trong hầu hết các ngôn ngữ hiện đại, hàm là thành phần hạng nhất (first-class citizen), nghĩa là có thể gán vào biến, truyền làm tham số cho hàm khác hoặc được trả về từ một hàm. Hàm còn thiết lập phạm vi từ vựng cục bộ cho các biến bên trong, tránh xung đột tên với mã nguồn bên ngoài.

## Định nghĩa chuyên ngành
Đơn vị cấu thành phần mềm có thể gọi thực thi cùng chữ ký hàm riêng biệt, gắn kết đối số đầu vào trong một khung kích hoạt cục bộ để thực thi tuần tự và trả về kết quả ước lượng.

## Ví dụ
Một hàm mang tên `calculateTax(subtotal, rate)` nhận vào giá trị hóa đơn 500 đô la và mức thuế 0,08 để trả về đúng 40 đô la tiền thuế phải nộp.
