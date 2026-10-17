---
label: Virtual Private Cloud (VPC)
aliases:
  - VPC
autolink:
  aliases:
    VPC: always
loanwords:
  - virtual private cloud (vpc)
plain_descriptions:
  - mạng ảo riêng biệt và biệt lập bên trong đám mây công cộng
  - vùng mạng an toàn bảo vệ máy chủ đám mây khỏi truy cập internet tự do
summary: Mạng ảo cách ly logic dành riêng cho tài khoản đám mây, cho phép toàn quyền kiểm soát dải địa chỉ IP, mạng con và bảng định tuyến.
confusable_notes:
  vpn: VPC là không gian mạng ảo cô lập trên đám mây, còn VPN là đường hầm mã hóa để kết nối máy tính bên ngoài vào không gian mạng đó.
follow_up_questions:
  - Bảng định tuyến (route table) và cổng internet (internet gateway) điều phối luồng truy cập vào VPC như thế nào?
  - Những mô hình kết nối VPC peering nào giúp liên kết mạng an toàn giữa các tài khoản khác nhau?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một khuôn viên biệt thự có tường rào bao quanh nằm trong một khu đô thị mở: chỉ người có thẻ cư dân hoặc đi qua cổng gác bảo vệ mới được bước vào bên trong.

## Chi tiết
VPC cho phép kỹ sư mạng tự chọn dải địa chỉ IP nội bộ (CIDR), chia nhỏ thành các subnet công khai hoặc bảo mật, gắn bảng định tuyến và thiết lập danh sách kiểm soát truy cập mạng (NACL). Các máy chủ cơ sở dữ liệu đặt trong VPC hoàn toàn không có địa chỉ IP công khai, giúp triệt tiêu nguy cơ bị tấn công dò quét từ internet.

## Định nghĩa chuyên ngành
Môi trường mạng ảo hóa được cô lập về mặt logic trên nền tảng hạ tầng đám mây dùng chung, cung cấp khả năng tự cấu hình topology mạng tương đương mạng cục bộ doanh nghiệp truyền thống.

## Ví dụ
Đội ngũ hạ tầng khởi tạo một VPC với dải IP 10.0.0.0/16, đặt máy chủ web ở mạng con công khai để đón khách truy cập, và giấu máy chủ cơ sở dữ liệu ở mạng con riêng chỉ cho phép máy chủ web kết nối tới.
