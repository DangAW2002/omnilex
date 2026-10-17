---
label: "Promise"
qualifier: "(Lập trình)"
aliases: []
loanwords:
  - "promise"
autolink:
  label: never
plain_descriptions:
  - "đối tượng giữ chỗ đại diện cho kết quả chưa hoàn thành của một tác vụ chạy nền"
  - "vật đại diện cho một giá trị trong tương lai có thể thành công trả về dữ liệu hoặc thất bại vì lỗi"
summary: "Đối tượng đại diện cho kết quả thành công hoặc thất bại trong tương lai của một tác vụ xử lý bất đồng bộ."
confusable_notes: {}
follow_up_questions:
  - "Cơ chế nối chuỗi promise (promise chaining) giải quyết tình trạng lồng mã callback hell như thế nào?"
  - "Hành vi xử lý khi có một tác vụ thất bại khác nhau ra sao giữa Promise.all và Promise.allSettled?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng chiếc thẻ rung báo lấy đồ được phát tại một quán ăn nhanh. Chiếc thẻ chưa phải là món ăn, nhưng nó là cam kết rằng khi đầu bếp nấu xong, thẻ sẽ phát tín hiệu để khách đến quầy nhận suất ăn hoặc nhận lời xin lỗi nếu đã hết nguyên liệu.

## Chi tiết
Một promise tồn tại ở một trong ba trạng thái: đang chờ (pending), hoàn thành (fulfilled) hoặc bị từ chối (rejected). Nó bắt đầu ở trạng thái pending trong khi tác vụ chạy nền đang diễn ra. Khi xong, promise chuyển vĩnh viễn sang trạng thái fulfilled cùng dữ liệu kết quả hoặc rejected kèm lý do lỗi. Lập trình viên gắn các hàm phản hồi qua các phương thức `.then()`, `.catch()` và `.finally()`. Nhờ việc mỗi phương thức này trả về một promise mới, các bước xử lý liên tiếp có thể nối đuôi nhau mạch lạc thay vì lồng nhau phức tạp.

## Định nghĩa chuyên ngành
Mô hình máy trạng thái đại diện cho một tính toán trì hoãn bất đồng bộ, thực hiện một bước chuyển trạng thái duy nhất và không thể đảo ngược từ pending sang fulfilled hoặc rejected.

## Ví dụ
Một yêu cầu gửi dữ liệu lên máy chủ trả về một promise pending; sau 3 giây, nó chuyển sang fulfilled và gửi khối dữ liệu phản hồi HTTP 200 dung lượng 1.024 byte đến hàm xử lý.
