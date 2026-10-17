---
label: gRPC
aliases:
  - Khung RPC của Google
loanwords:
  - grpc
plain_descriptions:
  - nền tảng gọi hàm từ xa tốc độ cao sử dụng định dạng nhị phân Protocol Buffers
  - giao thức gọi dịch vụ truyền dữ liệu nhị phân qua HTTP/2 cho hệ thống vi dịch vụ
summary: Khung gọi thủ tục từ xa (RPC) mã nguồn mở hiệu năng cao, sử dụng định dạng Protocol Buffers để đóng gói nhị phân và chạy trên nền tảng HTTP/2 để truyền thông đa kênh tối ưu.
confusable_notes: {}
follow_up_questions:
  - Cơ chế tuần tự hóa nhị phân của Protocol Buffers vượt trội hơn định dạng JSON ở những điểm nào?
  - Những trở ngại nào xuất hiện khi muốn gọi trực tiếp dịch vụ gRPC từ trình duyệt web?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như bấm nút trên điều khiển từ xa: bạn bấm gọi một lệnh ngay trước mặt, nhưng thao tác thực tế lập tức diễn ra trên chiếc máy chủ ở căn phòng khác hoặc cách xa nửa vòng trái đất.

## Chi tiết
Được Google khởi xướng, gRPC cho phép ứng dụng máy khách gọi trực tiếp các phương thức trên máy chủ từ xa giống hệt như đang gọi hàm nội bộ trong bộ nhớ. Hợp đồng dịch vụ được định nghĩa bằng tệp Protocol Buffers (.proto) giúp tự động sinh mã nguồn chặt chẽ cho nhiều ngôn ngữ lập trình. Chạy mặc định trên nền HTTP/2, gRPC hỗ trợ truyền luồng dữ liệu hai chiều, nén tiêu đề và ghép nhiều luồng trên một kết nối TCP duy nhất, giảm mạnh chi phí xử lý so với chuẩn REST dùng JSON.

## Định nghĩa chuyên ngành
Khung gọi thủ tục từ xa đa ngôn ngữ dựa trên lược đồ Protocol Buffers định kiểu chặt và giao thức truyền tải ghép kênh đa luồng HTTP/2.

## Ví dụ
Một vi dịch vụ thanh toán gọi sang dịch vụ quy đổi tỷ giá qua gRPC, xử lý 10.000 gói tin nhị phân mỗi giây với độ trễ truyền dẫn chỉ vỏn vẹn 3 mili giây.
