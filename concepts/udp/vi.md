---
label: User Datagram Protocol (UDP)
aliases:
  - UDP
autolink:
  aliases:
    UDP: always
loanwords:
  - user datagram protocol (udp)
plain_descriptions:
  - giao thức mạng tốc độ cao gửi dữ liệu tức thì không cần xác nhận đã nhận được
  - bộ quy tắc truyền gói tin không kết nối dùng cho game online, livestream và DNS
summary: Giao thức truyền vận không kết nối chuyển tải các gói dữ liệu mà không cần bắt tay hay đảm bảo biên nhận, ưu tiên tốc độ tối đa thay vì độ tin cậy.
confusable_notes:
  tcp: UDP gửi dữ liệu ngay với độ trễ tối thiểu và không gửi lại khi rơi gói, trong khi TCP bắt buộc bắt tay đồng bộ và đảm bảo không mất gói nào.
follow_up_questions:
  - Tại sao các ứng dụng đàm thoại trực tiếp (VoIP) và trò chơi nhiều người chơi lại chọn UDP thay vì TCP?
  - Giao thức QUIC thế hệ mới đã xây dựng cơ chế truyền tải tin cậy trên nền tảng UDP như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như phát thanh trên sóng radio hoặc gửi bưu thiếp thường: người nói cứ truyền tải thông tin liên tục mà không cần biết thính giả có bật đài nghe đúng lúc hay không.

## Chi tiết
UDP sở hữu phần tiêu đề gói tin siêu nhẹ chỉ 8 byte, gồm cổng nguồn, cổng đích, độ dài và mã kiểm tra tính toàn vẹn (checksum). Do không tốn thời gian bắt tay hay chờ đợi phản hồi xác nhận, UDP không tạo độ trễ chờ đợi. Nếu gói tin bị thất lạc, hệ thống bỏ qua luôn vì trong các tác vụ phát hình trực tiếp, việc đợi nhận lại hình ảnh của 2 giây trước không còn ý nghĩa.

## Định nghĩa chuyên ngành
Giao thức tầng giao vận theo chuẩn RFC 768 cung cấp dịch vụ gửi các datagram độc lập với chi phí xử lý tối thiểu, không duy trì trạng thái phiên, không sắp xếp thứ tự và không quản lý tắc nghẽn mạng.

## Ví dụ
Một ứng dụng họp trực tuyến truyền giọng nói theo thời gian thực qua giao thức UDP; nếu đường truyền wifi chập chờn làm rơi mất vài gói tin, người nghe chỉ thấy âm thanh hơi khựng một tích tắc chứ hình ảnh không bị đứng hình chờ tải lại.
