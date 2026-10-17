---
label: "Async/await"
aliases: []
loanwords:
  - "async/await"
plain_descriptions:
  - "cú pháp giúp viết mã bất đồng bộ trông giống như các câu lệnh tuần tự thông thường"
  - "từ khóa tạm dừng hàm để chờ kết quả từ tác vụ nền mà không làm đơ giao diện hay nghẽn luồng"
summary: "Cú pháp mở rộng giúp cấu trúc các tác vụ bất đồng bộ dựa trên promise theo phong cách tuần tự, nâng cao tính dễ đọc của mã nguồn."
confusable_notes: {}
follow_up_questions:
  - "Vòng lặp sự kiện (event loop) tiếp tục thực thi phần mã phía sau từ khóa await ra sao khi promise hoàn tất?"
  - "Tại sao việc tuần tự await các tác vụ không phụ thuộc lẫn nhau lại gây lãng phí thời gian thay vì kích hoạt đồng thời?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng việc đặt thợ mộc đóng một chiếc bàn gỗ. Thay vì đứng bất động ở xưởng suốt hai tuần để nhìn thợ làm, khách hàng nhận một phiếu hẹn rồi về nhà tiếp tục công việc hàng ngày, và chỉ quay lại nhận bàn khi nhận được thông báo đã hoàn thành.

## Chi tiết
Từ khóa `async` đánh dấu một hàm luôn tự động đóng gói giá trị trả về vào một promise. Bên trong hàm này, từ khóa `await` tạm hoãn tiến trình của các dòng mã phía sau cho tới khi promise được giải quyết hoặc trả về lỗi. Điểm cốt lõi là sự tạm dừng này trả lại quyền điều khiển cho luồng hệ thống hoặc vòng lặp sự kiện, giúp chương trình vẫn lắng nghe được các thao tác bấm chuột hay dữ liệu mạng khác. Việc xử lý lỗi được thực hiện tự nhiên thông qua khối lệnh `try...catch` quen thuộc.

## Định nghĩa chuyên ngành
Đặc tả cú pháp trên nền tảng trừu tượng promise cho phép tạm dừng coroutine tại các điểm chỉ định mà không gây chặn luồng hệ điều hành cơ sở, phục hồi thực thi khi tác vụ hoàn tất.

## Ví dụ
Một đoạn mã tải thông tin tài khoản: lệnh `const user = await fetchUser(42);` sẽ tạm dừng hàm hiện tại chờ phản hồi từ máy chủ, trong khi ứng dụng vẫn cuộn trang mượt mà.
