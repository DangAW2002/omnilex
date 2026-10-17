---
label: Subnet
aliases: []
loanwords:
  - subnet
plain_descriptions:
  - mạng con phân chia từ một dải địa chỉ IP mạng lớn hơn
  - chia nhỏ hệ thống mạng thành các khu vực riêng để tăng cường bảo mật
summary: Phân đoạn mạng logic được chia nhỏ từ một dải địa chỉ IP lớn nhằm cô lập lưu lượng, tăng hiệu quả định tuyến và siết chặt an ninh mạng.
confusable_notes: {}
follow_up_questions:
  - Mặt nạ mạng con (subnet mask) phân tách phần địa chỉ mạng và phần định danh máy trạm ra sao?
  - Sự khác biệt cốt lõi giữa mạng con công khai (public subnet) và mạng con riêng tư (private subnet) là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc chia một tòa nhà văn phòng thành nhiều phòng ban riêng biệt: phòng kinh doanh ở tầng 2, phòng kỹ thuật ở tầng 3 và phòng kế toán ở tầng 4 có cửa quẹt vân tay bảo mật riêng.

## Chi tiết
Kỹ thuật chia mạng con (subnetting) sử dụng mặt nạ mạng (như /24 hay 255.255.255.0) để chia một không gian IP lớn thành các vùng độc lập. Trên đám mây, các subnet thường được gắn liền với một Availability Zone cụ thể và phân loại thành subnet công khai (kết nối trực tiếp ra internet) hoặc subnet riêng (chỉ liên lạc nội bộ và phải qua cổng NAT nếu muốn cập nhật phần mềm ra ngoài).

## Định nghĩa chuyên ngành
Tập hợp con các địa chỉ mạng IP liền kề được xác định bởi mặt nạ mạng con (bitmask), giúp phân định ranh giới định tuyến, hạn chế vùng quảng bá (broadcast domain) và tăng cường kiểm soát an ninh.

## Ví dụ
Quản trị viên mạng cấu hình dải 10.0.1.0/24 làm subnet công khai cho cụm cân bằng tải, và dành riêng dải 10.0.2.0/24 làm subnet nội bộ cho các máy chủ xử lý dữ liệu không cần gán IP công khai.
