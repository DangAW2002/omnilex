---
label: "Idempotency"
aliases:
  - "Tính lũy đẳng"
loanwords:
  - "idempotency"
plain_descriptions:
  - "tính chất mà khi thực hiện một hành động nhiều lần vẫn cho ra kết quả y hệt như làm một lần"
  - "khả năng gửi lại yêu cầu nhiều lần mà không lo bị trừ tiền hai lần hay tạo dữ liệu trùng lặp"
summary: "Thuộc tính của một thao tác mà việc thực hiện lặp lại nhiều lần với cùng dữ liệu đầu vào vẫn tạo ra trạng thái hệ thống giống hệt như khi thực hiện một lần duy nhất."
confusable_notes:
  {}
follow_up_questions:
  - "Khóa lũy đẳng (idempotency key) trong tiêu đề HTTP giúp ngăn chặn thanh toán trùng lặp khi rớt mạng ra sao?"
  - "Vì sao các phương thức HTTP GET, PUT và DELETE là lũy đẳng trong khi POST thì không?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Nút bấm gọi thang máy: bạn bấm một lần thì đèn sáng và thang máy bắt đầu di chuyển; bạn bấm thêm mười lần nữa thì thang máy vẫn chỉ lên đón bạn một lần chứ không điều mười chiếc thang máy tới.

## Chi tiết
Trong các hệ thống phân tán, khi kết nối mạng chập chờn, máy khách không thể biết yêu cầu đã được xử lý thành công hay chưa. Nhờ tính lũy đẳng, máy khách có thể an tâm gửi lại yêu cầu mà không sợ bị trùng dữ liệu. Hệ thống máy chủ thường dùng khóa lũy đẳng lưu trong Redis để nhận diện các yêu cầu trùng lặp và trả về ngay kết quả đã xử lý trước đó.

## Định nghĩa chuyên ngành
Thuộc tính đảm bảo rằng việc áp dụng một thao tác toán tử nhiều lần lên một trạng thái hệ thống sẽ tạo ra kết quả chuyển đổi trạng thái đồng nhất, không gây tích lũy tác dụng phụ.

## Ví dụ
Cổng thanh toán trực tuyến sử dụng mã Idempotency-Key để khi người dùng nhấn nút Xác nhận liên tục do mạng chậm thì tài khoản ngân hàng cũng chỉ bị trừ tiền một lần duy nhất.
