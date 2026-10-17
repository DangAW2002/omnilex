---
label: Reverse proxy
aliases:
  - Máy chủ ủy nhiệm ngược
loanwords:
  - reverse proxy
plain_descriptions:
  - máy chủ đứng trước che chắn và chia tải cho các máy chủ chứa nội dung thực tế
  - trạm trung gian tiếp nhận yêu cầu từ internet rồi chuyển tiếp tới mạng nội bộ
summary: Máy chủ trung gian đứng trước cụm máy chủ nội bộ nhằm tiếp nhận yêu cầu từ client bên ngoài, thực hiện định tuyến, giải mã TLS và cân bằng lưu lượng.
confusable_notes:
  api-gateway: Reverse proxy xử lý điều hướng mức mạng, giải mã chứng chỉ TLS và lưu đệm nội dung tĩnh, còn API gateway can thiệp sâu vào nghiệp vụ ứng dụng như giải mã token xác thực, tổng hợp kết quả và giới hạn gọi hàm.
follow_up_questions:
  - Reverse proxy khác biệt về mặt bản chất so với forward proxy ở điểm nào?
  - Cấu hình header caching thế nào giúp tối đa hóa khả năng giải tải của reverse proxy?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như nhân viên giao dịch tại quầy ngân hàng: khách hàng chỉ trao đổi với nhân viên ở cửa kính, sau đó nhân viên tự vào kho lấy hồ sơ mang ra chứ không để khách bước thẳng vào kho tiền.

## Chi tiết
Trong khi forward proxy đứng phía máy khách để kiểm soát đường ra internet, thì reverse proxy lại đứng trước cụm máy chủ đích để ngăn chặn truy cập trực tiếp từ công chúng. Người dùng chỉ nhìn thấy địa chỉ IP của reverse proxy. Máy chủ này đảm nhận nhiệm vụ giải mã phiên bảo mật TLS, nén tài nguyên bằng Gzip/Brotli, lưu đệm các phản hồi tĩnh phổ biến và phân phối yêu cầu tới các máy chủ ứng dụng theo thuật toán xoay vòng hoặc ít kết nối nhất.

## Định nghĩa chuyên ngành
Máy chủ trung gian triển khai tại vành đai mạng, đón nhận các kết nối mạng gửi đến và chuyển tiếp trong suốt về các máy chủ nội bộ trong mạng riêng.

## Ví dụ
Một máy chủ Nginx tiếp nhận 25.000 kết nối HTTPS công khai trên cổng 443, xử lý xong chứng chỉ bảo mật rồi chuyển tiếp lưu lượng HTTP thô tới 6 tiến trình ứng dụng Python nội bộ.
