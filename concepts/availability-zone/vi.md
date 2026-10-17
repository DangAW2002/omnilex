---
label: Availability zone (AZ)
aliases:
  - AZ
autolink:
  aliases:
    AZ: always
loanwords:
  - availability zone (az)
plain_descriptions:
  - trung tâm dữ liệu độc lập về nguồn điện và mạng trong một khu vực đám mây
  - vùng sẵn sàng chịu lỗi giúp hệ thống vẫn chạy khi một cơ sở gặp sự cố
summary: Một hoặc nhiều trung tâm dữ liệu vật lý riêng biệt trong một region, có nguồn điện, hệ thống làm mát và kết nối mạng độc lập.
confusable_notes:
  cloud-region: Availability Zone là một cụm trung tâm dữ liệu cụ thể bên trong region, còn region là phạm vi địa lý rộng lớn bao bọc các zone đó.
follow_up_questions:
  - Cơ chế nhân bản cơ sở dữ liệu đồng bộ qua nhiều AZ giúp duy trì mục tiêu không mất dữ liệu (RPO=0) ra sao?
  - Những chi phí truyền tải mạng phát sinh khi lưu lượng trao đổi qua lại giữa các AZ trong cùng một region?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như hai trạm phát điện dự phòng đặt ở hai tòa nhà cách xa nhau trong bệnh viện: nếu tòa nhà A mất điện do sự cố chập mạch, tòa nhà B lập tức cấp điện thay thế.

## Chi tiết
Mỗi vùng sẵn sàng (AZ) được xây dựng cách nhau một khoảng cách địa lý đủ an toàn (vài km đến vài chục km) để tránh cùng gặp rủi ro thiên tai hay sự cố điện lưới, nhưng vẫn đủ gần để duy trì độ trễ truyền dẫn dưới một phần nghìn giây. Triển khai ứng dụng qua nhiều AZ là tiêu chuẩn vàng để hệ thống tự động chuyển đổi dự phòng khi một trung tâm dữ liệu gặp sự cố.

## Định nghĩa chuyên ngành
Đơn vị hạ tầng vật lý cô lập trong một region đám mây, sở hữu lưới điện, hệ thống máy lạnh và hạ tầng chuyển mạch mạng tách biệt hoàn toàn, liên kết với các zone khác bằng mạng cáp quang ngầm tốc độ cao.

## Ví dụ
Một sàn thương mại điện tử phân bổ máy chủ ứng dụng chạy song song ở hai AZ khác nhau là us-east-1a và us-east-1b; khi trạm biến áp của zone 1a gặp sự cố sét đánh, zone 1b tiếp nhận toàn bộ đơn hàng mà người mua không hề nhận ra.
