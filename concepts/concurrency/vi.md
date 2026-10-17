---
label: "Concurrency"
aliases:
  - "Xử lý đồng thời"
  - "Đồng thời"
loanwords:
  - "concurrency"
plain_descriptions:
  - "khả năng hệ thống quản lý nhiều tác vụ cùng lúc bằng cách xen kẽ tiến trình xử lý trong cùng một khoảng thời gian"
  - "cấu trúc phần mềm điều phối nhiều công việc song hành mà không bắt buộc chúng phải chạy tại cùng một tích tắc vật lý"
summary: "Khả năng cấu trúc và điều phối nhiều tác vụ tính toán độc lập cùng tiến triển trong các khoảng thời gian đan xen nhau."
confusable_notes:
  parallelism: "Đồng thời (concurrency) là việc xử lý nhiều việc cùng lúc về mặt cấu trúc và điều phối, trong khi song song (parallelism) là việc thực thi nhiều lệnh tại đúng cùng một thời điểm trên nhiều lõi phần cứng."
follow_up_questions:
  - "Bằng cách nào một vi xử lý đơn lõi vẫn có thể đạt được tính đồng thời mượt mà mà không cần chạy song song?"
  - "Những cơ chế điều phối nào giúp ngăn ngừa xung đột dữ liệu và nghẽn tài nguyên trên các máy chủ có mật độ truy cập cao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một nhân viên pha cà phê phục vụ vào giờ cao điểm. Nhân viên này xay cà phê cho khách A, quay sang đánh sữa cho khách B trong lúc máy đang chiết xuất espresso, rồi đưa ly cho khách C; cả ba cốc đều được làm trong vòng 5 phút dù người đó chỉ có một đôi tay.

## Chi tiết
Đồng thời là đặc tính kiến trúc tổ chức hệ thống thành các luồng xử lý độc lập về mặt logic. Các tác vụ này xen kẽ tiến triển trong cùng một khoảng thời gian. Khả năng này có thể đạt được ngay trên một bộ vi xử lý đơn lõi nhờ cơ chế phân chia lát cắt thời gian (time-slicing) và chuyển đổi ngữ cảnh, hoặc qua các vòng lặp sự kiện bất đồng bộ. Dù hệ thống đồng thời có thể tận dụng phần cứng song song khi có sẵn, mục tiêu cốt lõi của nó là tổ chức chương trình sao cho việc chờ đợi tác vụ chậm (như đọc đĩa hay gọi mạng) không làm nghẽn các công việc khác.

## Định nghĩa chuyên ngành
Sự phân rã kiến trúc của một chương trình thành các luồng tính toán hoặc coroutine độc lập có vòng đời chồng lấn nhau, bất kể có sự hỗ trợ của phần cứng thực thi song song hay không.

## Ví dụ
Một máy chủ trò chuyện trực tuyến duy trì kết nối cho 500 người dùng; trong lúc chờ người số 12 gõ tin nhắn qua mạng, máy chủ đọc và điều phối ngay gói tin vừa gửi đến từ người số 89.
