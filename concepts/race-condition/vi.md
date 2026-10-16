---
label: "Race condition"
aliases:
  - "Điều kiện tranh chấp"
loanwords:
  - "race condition"
plain_descriptions:
  - "lỗi phần mềm khi hai tác vụ cùng sửa một dữ liệu dẫn đến kết quả sai lệch tùy theo việc ai chạy trước"
  - "tình trạng bất thường xảy ra do nhiều luồng xử lý đồng thời tranh giành can thiệp vào một tài nguyên chung"
summary: "Hiện tượng sai hỏng trong lập trình đồng thời khi kết quả của hệ thống phụ thuộc vào thứ tự thực thi ngẫu nhiên hoặc tốc độ xử lý giữa các luồng dữ liệu song song."
confusable_notes:
  {}
follow_up_questions:
  - "Cơ chế khóa (mutex) và giao dịch nguyên tử (atomic transaction) ngăn chặn race condition như thế nào?"
  - "Tại sao lỗi race condition rất khó tái hiện và bắt lỗi trong môi trường phát triển cục bộ?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Hai người cùng cầm hai thẻ ATM rút số tiền 500.000 đồng còn lại duy nhất trong một tài khoản ngân hàng ở hai cây ATM khác nhau vào đúng một tích tắc.

## Chi tiết
Lỗi phát sinh khi có từ hai tiến trình hoặc luồng trở lên cùng truy cập và chỉnh sửa một vùng dữ liệu chung mà không có cơ chế đồng bộ hóa. Chuỗi thao tác kiểm tra rồi mới sửa (check-then-act) rất dễ bị lỗi nếu một luồng can thiệp vào giữa thời điểm luồng kia vừa đọc xong dữ liệu. Để khắc phục, kỹ sư áp dụng cơ chế khóa phân tán, biến nguyên tử hoặc thiết kế dữ liệu bất biến.

## Định nghĩa chuyên ngành
Tình huống bất định trong xử lý đồng thời khi độ chính xác của trạng thái dữ liệu bị xâm hại do sự phụ thuộc vào thời điểm và trình tự lập lịch của các luồng thực thi cạnh tranh.

## Ví dụ
Hai người dùng cùng bấm nút xác nhận mua chiếc vé hòa nhạc duy nhất còn lại trên hệ thống bán vé trực tuyến, dẫn đến việc bán trùng vé nếu bước cập nhật giỏ hàng không dùng khóa cơ sở dữ liệu.
