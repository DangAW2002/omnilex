---
label: Transmission Control Protocol (TCP)
aliases:
  - TCP
autolink:
  aliases:
    TCP: always
loanwords:
  - transmission control protocol (tcp)
plain_descriptions:
  - giao thức mạng tin cậy đảm bảo dữ liệu truyền đi đầy đủ và đúng thứ tự
  - bộ quy tắc truyền dữ liệu có kiểm tra lỗi và gửi lại nếu bị rơi mất gói tin
summary: Giao thức truyền vận hướng kết nối đảm bảo việc truyền tải luồng dữ liệu một cách tin cậy, đúng thứ tự và có kiểm tra phát hiện lỗi.
confusable_notes:
  udp: TCP thiết lập kết nối chặt chẽ và đảm bảo gói tin đến nơi đầy đủ không bị mất, trong khi UDP gửi dữ liệu tức thì mà không cần bắt tay hay truyền lại khi mất gói.
follow_up_questions:
  - Quy trình bắt tay 3 bước (SYN, SYN-ACK, ACK) thiết lập phiên liên lạc TCP diễn ra như thế nào?
  - Các thuật toán kiểm soát tắc nghẽn của TCP điều tiết tốc độ truyền dữ liệu ra sao khi đường truyền bị nghẽn?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như dịch vụ chuyển phát nhanh có biên lai xác nhận: người gửi chỉ yên tâm khi người nhận ký tên vào biên nhận chuyển về; nếu bưu phẩm bị thất lạc dọc đường, đơn vị gửi sẽ gửi lại gói mới.

## Chi tiết
TCP hoạt động ở tầng giao vận (Transport Layer). Trước khi gửi dữ liệu, hai máy tính tiến hành bắt tay ba bước để thống nhất số thứ tự gói tin. Trong quá trình truyền, bên nhận liên tục gửi tín hiệu xác nhận (ACK). Nếu một gói tin bị rơi rớt, bên gửi sẽ tự động truyền lại gói đó, đồng thời sắp xếp các gói tin về đúng trình tự ban đầu trước khi bàn giao cho tầng ứng dụng.

## Định nghĩa chuyên ngành
Giao thức truyền vận cốt lõi theo tiêu chuẩn RFC 793 cung cấp kết nối hai chiều có trạng thái, truyền dữ liệu dạng luồng liên tục với cơ chế phát hiện lỗi, điều khiển lưu lượng và truyền lại thích ứng.

## Ví dụ
Khi người dùng tải tệp cài đặt phần mềm dung lượng 50 MB qua trình duyệt, giao thức TCP kiểm tra từng khối dữ liệu và tự động yêu cầu gửi lại nếu có gói tin bị nghẽn mạng rơi mất, đảm bảo tệp tải về nguyên vẹn 100%.
