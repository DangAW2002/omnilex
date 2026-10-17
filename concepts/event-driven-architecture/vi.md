---
label: Event-driven architecture
aliases:
  - Kiến trúc hướng sự kiện
  - EDA
loanwords:
  - event-driven architecture
  - eda
autolink:
  aliases:
    EDA: always
plain_descriptions:
  - kiến trúc phần mềm mà các thành phần trao đổi qua việc phát và bắt sự kiện
  - mô hình lập trình phản ứng với các thay đổi trạng thái thay vì chờ nhau hoàn thành
summary: Mô hình kiến trúc phần mềm trong đó các thành phần tách rời giao tiếp bất đồng bộ thông qua việc phát sinh, truyền tải và xử lý các sự kiện ghi nhận thay đổi trạng thái.
confusable_notes: {}
follow_up_questions:
  - Mô hình phối hợp tự phát (choreography) và điều phối trung tâm (orchestration) khác nhau ra sao trong luồng sự kiện?
  - Tính bất biến (idempotency) bảo vệ thành phần nhận tin nhắn khỏi sự cố nhận trùng lặp như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như đài phát thanh: trạm phát sóng liên tục bản tin thời tiết và âm nhạc vào không gian; chiếc radio nào mở đúng tần số thì nghe và hưởng ứng, người dẫn chương trình không cần biết có ai đang nghe.

## Chi tiết
Trong kiến trúc hướng yêu cầu truyền thống, máy khách gọi trực tiếp các điểm cuối HTTP hoặc RPC và phải chờ phản hồi, tạo nên sự ràng buộc chặt chẽ về thời gian và địa chỉ. Với kiến trúc hướng sự kiện (EDA), bên phát sinh chỉ cần đẩy bản tin sự kiện bất biến (như DonHangDaDat hay NhietDoVuotNguong) vào trung gian phân phối như Kafka. Các dịch vụ tiêu thụ tự đăng ký lắng nghe chủ đề quan tâm. Bên phát không cần biết bên nhận là ai hay xử lý nhanh hay chậm, giúp tăng thông lượng và dễ dàng gắn thêm dịch vụ mới.

## Định nghĩa chuyên ngành
Mô hình kiến trúc bất đồng bộ trong đó các thông báo thay đổi trạng thái được ghi lại dưới dạng bản ghi có cấu trúc tách rời và được tiêu thụ bởi các dịch vụ tự quản qua bộ định tuyến tin nhắn.

## Ví dụ
Hệ thống thương mại điện tử phát đi sự kiện OrderCreated, lập tức được 3 vi dịch vụ thanh toán, đóng gói kho và gửi email thông báo cùng lúc tiếp nhận và xử lý song song.
