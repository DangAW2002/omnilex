---
label: Cold start
aliases: []
qualifier: (Serverless)
loanwords:
  - cold start
plain_descriptions:
  - độ trễ khi hàm serverless phải khởi động lại từ đầu sau thời gian không có lượt gọi
  - khoảng chờ ban đầu để nhà cung cấp đám mây dựng container mới chạy mã nguồn
summary: Độ trễ trong lần gọi đầu tiên của điện toán serverless khi nền tảng phải cấp phát môi trường, tải mã nguồn và khởi động hệ thống thực thi.
confusable_notes: {}
follow_up_questions:
  - Cơ chế giữ ấm tài nguyên (provisioned concurrency) giúp triệt tiêu độ trễ khởi động nguội ra sao?
  - Lựa chọn ngôn ngữ lập trình (như Rust, Go so với Java/JVM) ảnh hưởng thế nào đến thời gian khởi động môi trường thực thi?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như khởi động xe máy vào một buổi sáng mùa đông giá rét: bạn phải nhấn đề và chờ máy nổ sưởi ấm vài chục giây trước khi tăng ga chạy êm, trong khi xe vừa mới chạy xong thì đề phát nổ ngay.

## Chi tiết
Trong mô hình serverless (như AWS Lambda), các hàm tính toán tự động co về 0 khi không có người dùng để tiết kiệm chi phí. Khi có yêu cầu mới xuất hiện mà chưa có sẵn môi trường nào đang chờ, hệ thống đám mây phải tạo máy ảo siêu nhẹ, tải gói mã nguồn về, nạp môi trường thực thi ngôn ngữ và chạy các đoạn mã khởi tạo trước khi chuyển yêu cầu cho hàm xử lý.

## Định nghĩa chuyên ngành
Giai đoạn khởi tạo môi trường thực thi theo nhu cầu trong kiến trúc điện toán không máy chủ, bao gồm việc cấp phát container, tải gói chương trình, nạp runtime và thiết lập kết nối cơ sở dữ liệu trước khi thực thi hàm sự kiện.

## Ví dụ
Một hàm API serverless viết bằng Python mất 800 mili giây để phản hồi lượt khách đầu tiên trong ngày do phải trải qua giai đoạn khởi động nguội, trong khi các lượt gọi kế tiếp chỉ mất chưa tới 15 mili giây.
