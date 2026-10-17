---
label: Distributed denial-of-service (DDoS)
aliases:
  - DDoS
  - từ chối dịch vụ phân tán
loanwords:
  - distributed denial-of-service (ddos)
autolink:
  aliases:
    DDoS: always
plain_descriptions:
  - làm sập một trang web bằng cách dồn lượng truy cập ảo khổng lồ từ hàng nghìn máy tính cùng lúc
  - làm nghẽn đường truyền máy chủ khiến người dùng thật không thể truy cập dịch vụ
summary: Cuộc tấn công mạng sử dụng nhiều máy tính phân tán để làm tràn ngập lưu lượng vào máy chủ hoặc mạng đích, khiến người dùng hợp pháp không thể truy cập.
confusable_notes: {}
follow_up_questions:
  - Tấn công DDoS làm cạn kiệt băng thông (volumetric) khác gì so với tấn công làm cạn kiệt tài nguyên tầng ứng dụng (Layer 7)?
  - Mạng phân phối nội dung (CDN) ứng dụng định tuyến Anycast để lọc sạch lưu lượng tấn công phân tán như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một cửa hàng bánh mì nhỏ bỗng nhiên bị hàng nghìn người kéo đến đứng chật cứng trước cửa ra vào, tranh nhau bấm chuông và hỏi chuyện vô nghĩa khiến những khách hàng thực sự muốn mua bánh không thể chen chân vào được.

## Chi tiết
Trong một cuộc tấn công DDoS, kẻ xấu điều khiển một mạng máy tính ma (botnet) gồm hàng nghìn hoặc hàng triệu thiết bị IoT, bộ định tuyến gia đình hoặc máy chủ bị chiếm quyền. Kẻ tấn công đồng loạt ra lệnh cho các thiết bị này xả một lượng lưu lượng khổng lồ vào địa chỉ IP của mục tiêu. Các cuộc tấn công phân chia thành ba nhóm chính: tấn công thể tích (làm nghẽn băng thông kết nối internet bằng UDP/ICMP flood), tấn công giao thức (làm tê liệt bảng trạng thái của tường lửa và cân bằng tải bằng SYN flood), và tấn công tầng ứng dụng (gửi dồn dập HTTP GET/POST để bắt máy chủ thực hiện các truy vấn cơ sở dữ liệu đắt đỏ). Biện pháp phòng chống dựa vào công nghệ định tuyến Anycast, trung tâm làm sạch lưu lượng đám mây và cơ chế giới hạn tần suất thích ứng.

## Định nghĩa chuyên ngành
Hành vi cố ý làm gián đoạn tính sẵn sàng của máy chủ, dịch vụ hoặc hạ tầng mạng mục tiêu bằng cách điều phối nhiều nguồn phát phân tán để áp đảo dung lượng xử lý hoặc băng thông truyền dẫn.

## Ví dụ
Cổng thanh toán thương mại điện tử bị tấn công bởi đợt lưu lượng giả mạo lên tới 1,2 Tbps xuất phát từ 80.000 camera giám sát bị nhiễm mã độc, buộc hệ thống phòng thủ CDN phải chuyển hướng lưu lượng qua trung tâm thanh lọc.
