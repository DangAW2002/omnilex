---
label: "Null reference"
aliases:
  - "Null pointer"
  - "Tham chiếu null"
  - "Con trỏ null"
loanwords:
  - "null reference"
plain_descriptions:
  - "con trỏ hoặc biến cố tình không trỏ tới bất kỳ địa chỉ ô nhớ hay đối tượng hợp lệ nào"
  - "trạng thái tham chiếu rỗng gây sập phần mềm nếu chương trình cố truy cập dữ liệu bên trong mà không kiểm tra"
summary: "Giá trị tham chiếu hoặc con trỏ biểu thị sự vắng mặt của đối tượng hoặc không trỏ tới bất kỳ địa chỉ hợp lệ nào trong bộ nhớ."
confusable_notes: {}
follow_up_questions:
  - "Vì sao nhà khoa học Tony Hoare gọi phát minh ra tham chiếu null là sai lầm trị giá hàng tỷ đô la?"
  - "Các ngôn ngữ hiện đại sử dụng kiểu Option/Maybe và hệ thống kiểu cho phép null (nullable types) để loại bỏ lỗi con trỏ rỗng ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một bức thư gửi qua bưu điện nhưng dòng ghi địa chỉ người nhận bị bỏ trống hoàn toàn. Khi người đưa thư cầm bức thư lên để giao, họ không có địa chỉ nào để tìm đến, khiến việc phát thư bị ngừng lại hoàn toàn trong bối rối.

## Chi tiết
Trong bộ nhớ máy tính, biến tham chiếu thường lưu địa chỉ số của một đối tượng được cấp phát trên vùng nhớ heap. Một tham chiếu null mang giá trị đặc biệt (thường biểu diễn bằng số 0x0) nhằm đánh dấu rằng biến này hiện không trỏ tới đối tượng nào. Nếu chương trình cố tình đọc thuộc tính hoặc gọi hàm trên một biến đang giữ giá trị null, hệ thống sẽ lập tức báo lỗi nghiêm trọng (như `NullPointerException` trong Java hay lỗi truy cập bộ nhớ segmentation fault trong C). Các ngôn ngữ hiện đại phòng ngừa lỗi này bằng toán tử điều hướng an toàn (`?.`) và hệ thống kiểm tra kiểu dữ liệu null ngay khi biên dịch.

## Định nghĩa chuyên ngành
Giá trị lính canh được gán cho một biến tham chiếu nhằm xác định rằng nó không trỏ tới bất kỳ đối tượng thời gian chạy hoặc vị trí bộ nhớ hợp lệ nào trong không gian địa chỉ ứng dụng.

## Ví dụ
Một đoạn mã khai báo `User user = null;`; nếu cố tình gọi lệnh `user.getName()` trước khi khởi tạo người dùng, luồng thực thi sẽ bị sập ngay lập tức vì lỗi tham chiếu null.
