---
label: Backpressure
aliases:
  - Áp lực ngược
  - Kiểm soát dòng dữ liệu
loanwords:
  - backpressure
plain_descriptions:
  - phát tín hiệu yêu cầu nguồn gửi dữ liệu chậm lại để bên nhận không bị quá tải sập nguồn
  - cơ chế bên tiêu thụ thông báo số lượng bản ghi có thể xử lý cho bên sản xuất biết
summary: Cơ chế điều tiết luồng dữ liệu trong các đường ống xử lý bất đồng bộ, trong đó thành phần tiêu thụ gửi tín hiệu ngược về phía sản xuất để giới hạn tốc độ truyền tải tránh gây quá tải bộ nhớ.
confusable_notes: {}
follow_up_questions:
  - Cơ chế cấp hạn mức (credit-based) khác gì so với chiến lược xả bớt gói tin (drop) khi áp lực ngược kéo dài?
  - Chuẩn Reactive Streams chuẩn hóa tín hiệu yêu cầu lượng dữ liệu của bên đăng ký (Subscriber) qua hàm request như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như chậu rửa bát: nếu bạn vặn vòi nước xả tối đa trong khi lỗ thoát nước bên dưới chảy chậm, chậu sẽ nhanh chóng bị tràn nước ra sàn nhà trừ khi bạn vặn nhỏ vòi nước lại cho khớp với tốc độ thoát.

## Chi tiết
Trong các đường ống xử lý bất đồng bộ, bên sản xuất dữ liệu (như cổng mạng tốc độ cao) có thể đẩy dữ liệu nhanh hơn nhiều so với khả năng tiêu thụ của bên nhận (như ghi vào đĩa hoặc ghi vào cơ sở dữ liệu). Việc để dữ liệu dồn ứ vô hạn trong hàng đợi bộ nhớ sẽ gây tràn bộ nhớ và làm sập ứng dụng. Cơ chế áp lực ngược tạo ra vòng lặp phản hồi: bên tiêu thụ liên tục thông báo số lượng bản ghi nó có thể tiếp nhận tiếp theo. Khi hàng đợi đầy, bên phát sẽ tự động hãm tốc độ hoặc tạm dừng gửi tin.

## Định nghĩa chuyên ngành
Giao thức điều tiết dòng dữ liệu phản hồi trong các kênh truyền thông bất đồng bộ, ngăn ngừa cạn kiệt bộ nhớ bằng cách gắn kết năng lực tiếp nhận của bên tiêu thụ vào tốc độ phát sinh của bên sản xuất.

## Ví dụ
Đường ống xử lý video trong đó tiến trình nén phim chỉ yêu cầu đọc từng đợt 5 khung hình thô từ luồng camera, đảm bảo bộ nhớ đệm RAM không bị tràn khi gặp các đoạn cảnh phức tạp.
