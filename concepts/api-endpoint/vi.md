---
label: Endpoint
qualifier: (API)
aliases:
  - điểm cuối API
  - API endpoint
loanwords:
  - endpoint
plain_descriptions:
  - địa chỉ mạng cụ thể mà ứng dụng gọi vào để lấy hoặc gửi dữ liệu
  - cổng tiếp nhận yêu cầu từ các phần mềm bên ngoài đến hệ thống máy chủ
summary: Địa chỉ URL cụ thể do hệ thống API mở ra để tiếp nhận các yêu cầu xử lý tài nguyên hoặc dịch vụ nghiệp vụ.
confusable_notes: {}
follow_up_questions:
  - Nên quản lý phiên bản cho các endpoint như thế nào để không làm gián đoạn ứng dụng người dùng?
  - Điểm khác biệt giữa endpoint hướng tài nguyên và endpoint theo kiểu hàm hành động RPC là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như các phòng ban trong một tòa nhà: bạn đến phòng 101 để nhận hỗ trợ khách hàng và đến phòng 202 để nộp hóa đơn.

## Chi tiết
Một endpoint bao gồm tên miền, đường dẫn URL và phương thức HTTP tương ứng. Khi nhận được yêu cầu gửi đến đường dẫn này, máy chủ kích hoạt hàm xử lý tương ứng trong mã nguồn để tạo kết quả trả về.

## Định nghĩa chuyên ngành
Điểm giao tiếp mạng xác định bằng một định danh URI trên máy chủ, đóng vai trò tiếp nhận và xử lý các lệnh gọi từ xa.

## Ví dụ
Đường dẫn `https://api.vnpay.vn/v2/payment/create` dùng phương thức POST để tạo giao dịch thanh toán trực tuyến.
