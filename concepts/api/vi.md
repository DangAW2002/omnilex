---
label: "Application Programming Interface (API)"
aliases:
  - "API"
  - "Giao diện lập trình ứng dụng"
loanwords:
  - "API"
  - "application programming interface"
autolink:
  aliases:
    API: always
plain_descriptions:
  - "cầu nối giúp hai phần mềm trao đổi dữ liệu với nhau"
  - "người phục vụ nhận yêu cầu từ ứng dụng này gửi sang ứng dụng khác"
summary: "Tập hợp các quy tắc, giao thức và cổng kết nối cho phép các hệ thống phần mềm giao tiếp và chia sẻ dữ liệu với nhau."
confusable_notes:
  sdk: "API là giao diện hoặc giao thức định nghĩa các endpoint và định dạng dữ liệu trao đổi; SDK là bộ công cụ phát triển phần mềm đóng gói sẵn thư viện, tài liệu và mã mẫu để gọi API thuận tiện hơn."
follow_up_questions:
  - "REST API khác gì so với giao diện RPC hay GraphQL?"
  - "Vì sao tính tương thích ngược lại sống còn khi quản lý phiên bản API công khai?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như nhân viên phục vụ trong nhà hàng: bạn đọc thực đơn rồi gọi món, phục vụ chuyển yêu cầu vào bếp và mang thức ăn ra mà bạn không cần phải tự vào bếp nấu.

## Chi tiết
API cung cấp các điểm cuối định sẵn nhận yêu cầu theo các giao thức mạng chuẩn như HTTP, gRPC hoặc WebSocket. Nó che giấu toàn bộ mã nguồn nội bộ, cơ sở dữ liệu và xử lý phức tạp bên dưới, đồng thời áp đặt các cơ chế xác thực, giới hạn tần suất gọi và kiểm soát an toàn dữ liệu.

## Định nghĩa chuyên ngành
Hợp đồng giao diện được đặc tả hình thức, xác lập cấu trúc dữ liệu, định dạng thông điệp và quy tắc giao thức để các thực thể phần mềm độc lập tương tác qua mã lệnh.

## Ví dụ
Ứng dụng đặt xe công nghệ gửi tọa độ GPS qua giao thức HTTP REST đến dịch vụ bản đồ để hiển thị tuyến đường di chuyển.
