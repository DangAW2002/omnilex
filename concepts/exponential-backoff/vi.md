---
label: Exponential backoff
aliases:
  - Lùi lũy thừa
  - Chờ lùi theo hàm mũ
loanwords:
  - exponential backoff
plain_descriptions:
  - tăng gấp đôi thời gian chờ sau mỗi lần thử lại lệnh bị lỗi
  - thuật toán giãn cách thời gian gọi lại để hệ thống đích kịp hồi sức
summary: Thuật toán tăng dần độ trễ giữa các lần thử lại sau mỗi lần thất bại theo hàm số mũ nhằm tránh gây quá tải dồn dập cho dịch vụ đang nghẽn.
confusable_notes: {}
follow_up_questions:
  - Vì sao việc kết hợp độ trễ ngẫu nhiên (jitter) lại đóng vai trò cốt yếu để tránh bầy đàn ùa vào (thundering herd)?
  - Các bộ thư viện SDK client cân bằng giữa thời gian chờ tối đa và trải nghiệm người dùng như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Khi gõ cửa một phòng làm việc đang khóa mà không thấy mở, nếu cứ gõ liên hồi mỗi giây sẽ gây bực mình; chờ 2 giây, rồi 4 giây, rồi 8 giây sẽ cho người bên trong đủ thời gian hoàn thành dở việc.

## Chi tiết
Khi các dịch vụ phân tán gặp trục trặc tạm thời do mạng rung lắc hoặc quá tải bộ vi xử lý, việc liên tục thử lại ngay lập tức sẽ nhân đôi lượng truy cập, khiến máy chủ đích không thể hồi phục. Thuật toán lùi lũy thừa tính toán thời gian nghỉ trước lần thử thứ n theo công thức T(n) = B * 2^(n-1). Trong thực tế, các hệ thống luôn kết hợp thêm một khoảng ngẫu nhiên (jitter) để dàn đều các yêu cầu từ nhiều máy khách, ngăn chặn hiện tượng hàng ngàn máy cùng gửi lệnh một lúc.

## Định nghĩa chuyên ngành
Thuật toán phục hồi lỗi phân tán tăng thời gian chờ thử lại theo hàm mũ tương ứng với số lần thất bại liên tiếp nhằm chống sụp đổ do tắc nghẽn mạng.

## Ví dụ
Một nhóm thiết bị IoT khi tải dữ liệu thất bại sẽ chờ 100 mili giây, sau đó là 200 mili giây, 400 mili giây và 800 mili giây trước khi chạm mốc chặn trên 30 giây.
