---
label: "Unit test"
aliases:
  - "Kiểm thử đơn vị"
loanwords:
  - "unit test"
plain_descriptions:
  - "kiểm tra tự động xem từng hàm nhỏ trong phần mềm có chạy đúng hay không"
  - "bài kiểm tra cô lập một đoạn mã nhỏ nhất xem kết quả trả về có chính xác"
summary: "Bài kiểm tra tự động nhằm cô lập và xác minh tính đúng đắn của đơn vị mã nguồn nhỏ nhất có thể kiểm thử trong ứng dụng."
confusable_notes:
  integration-test: "Kiểm thử đơn vị cô lập và kiểm tra từng hàm hoặc lớp riêng lẻ với các phụ thuộc giả lập; kiểm thử tích hợp xác minh sự phối hợp giữa nhiều thành phần hoặc hệ thống con thực tế."
follow_up_questions:
  - "Vì sao bài kiểm thử đơn vị không nên kết nối trực tiếp đến cơ sở dữ liệu hay mạng bên ngoài?"
  - "Độ bao phủ mã nguồn (code coverage) khác gì so với chất lượng khẳng định (assertion) trong kiểm thử?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Kiểm tra kỹ từng viên gạch xem có nứt vỡ hay đúng kích thước tiêu chuẩn không trước khi đưa vào xây dựng cả bức tường lớn.

## Chi tiết
Kiểm thử đơn vị thường tuân theo cấu trúc Chuẩn bị - Thực hiện - Khẳng định (Arrange-Act-Assert). Bài kiểm tra tập trung vào các hàm tính toán, phương thức xử lý độc lập. Mọi thành phần phụ thuộc bên ngoài như cơ sở dữ liệu hay API mạng đều được thay thế bằng đối tượng giả lập (mock) để đảm bảo tốc độ chạy tính bằng mili giây.

## Định nghĩa chuyên ngành
Quy trình thẩm định tự động mức vi mô áp dụng cho các khối mã nguồn độc lập nhằm đảm bảo tính hợp lệ của logic xử lý trong các điều kiện tiền đề xác định.

## Ví dụ
Kiểm thử hàm tính tiền điện gia đình để đảm bảo rằng khi nhập lượng tiêu thụ 150 kWh thì kết quả tính toán theo từng bậc lũy kế trả về chính xác số tiền quy định.
