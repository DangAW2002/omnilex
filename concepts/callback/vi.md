---
label: "Callback"
qualifier: "(Lập trình)"
aliases:
  - "Hàm gọi lại"
loanwords:
  - "callback"
plain_descriptions:
  - "hàm được truyền làm tham số vào một hàm khác để được gọi chạy vào thời điểm thích hợp"
  - "đoạn mã xử lý giao cho một thủ tục để kích hoạt khi có sự kiện hoặc tác vụ hoàn tất"
summary: "Hàm được truyền dưới dạng đối số cho một thủ tục khác để được gọi lại khi một sự kiện hoặc tác vụ nhất định hoàn thành."
confusable_notes: {}
follow_up_questions:
  - "Sự khác biệt giữa callback đồng bộ chạy ngay lập tức và callback bất đồng bộ chạy theo sự kiện là gì?"
  - "Tình trạng lồng nhiều tầng callback (callback hell) đã gây khó khăn cho việc bắt lỗi trong các ứng dụng đời đầu ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng việc gửi một bưu kiện qua đơn vị vận chuyển và để lại số điện thoại liên lạc. Nhân viên giao hàng cầm bưu kiện đi giao và sẽ gọi đúng vào số máy đó ngay khi người nhận ký biên bản bàn giao thành công.

## Chi tiết
Trong các hệ thống hỗ trợ hàm bậc cao, callback cho phép người gọi tùy biến hành vi hoặc tiếp nhận kết quả từ một thủ tục. Callback có thể là đồng bộ, tức là được thực thi ngay lập tức trong khung ngăn xếp hiện tại (như khi lặp qua mảng), hoặc bất đồng bộ, được đẩy vào hàng đợi sự kiện để chạy khi hoàn thành đọc ghi đĩa hoặc nhận dữ liệu mạng. Mặc dù rất linh hoạt, việc lồng ghép quá nhiều tầng callback bất đồng bộ dễ dẫn đến cấu trúc mã khó bảo trì (callback hell), hiện nay thường được thay thế bằng promise và async/await.

## Định nghĩa chuyên ngành
Tham chiếu tới một khối mã thực thi được truyền làm đối số cho một thủ tục tiếp nhận, thiết lập cơ chế đảo ngược quyền điều khiển để thủ tục đó kích hoạt khi thỏa mãn điều kiện quy định.

## Ví dụ
Một ứng dụng đăng ký hàm phản hồi khi gửi biểu mẫu: khi người dùng bấm nút xác nhận, hệ thống gọi hàm `onSave()` đã đăng ký để xử lý dữ liệu vừa nhập.
