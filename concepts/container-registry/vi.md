---
label: Container registry
aliases: []
loanwords:
  - container registry
plain_descriptions:
  - kho lưu trữ tập trung để xuất bản, chia sẻ và tải về các ảnh container
  - thư viện trực tuyến lưu trữ các bản dựng Docker image để máy chủ tải về triển khai
summary: Hệ thống kho lưu trữ và phân phối tập trung dùng để quản lý, lập chỉ mục và phân phối các ảnh container phục vụ quá trình phát triển và vận hành hệ thống.
confusable_notes: {}
follow_up_questions:
  - Cơ chế tái sử dụng các lớp ảnh (layer deduplication) giúp tiết kiệm dung lượng lưu trữ trên registry ra sao?
  - Các tính năng quét lỗ hổng bảo mật tự động trên registry bảo vệ quy trình xuất bản phần mềm như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một kho lưu trữ phim ảnh gốc trung tâm: các đạo diễn gửi bản phim hoàn chỉnh đã duyệt vào kho, sau đó các rạp chiếu phim trên toàn quốc chỉ việc tải bản sao về chiếu lên màn hình.

## Chi tiết
Container registry tuân thủ theo tiêu chuẩn OCI (Open Container Initiative), cho phép quản lý các image được gắn nhãn phiên bản (tag). Khi nhà phát triển đẩy (push) image lên, registry lưu trữ các lớp nhị phân tách biệt để tối ưu dung lượng. Ngoài việc phân phối ảnh, các registry hiện đại còn tích hợp quét mã độc, kiểm tra lỗ hổng bảo mật trong các thư viện phụ thuộc và ký số bảo đảm nguồn gốc mã nguồn.

## Định nghĩa chuyên ngành
Dịch vụ lưu trữ và phân phối chuẩn OCI cung cấp các endpoint HTTP xử lý giao dịch đẩy (push) và kéo (pull) ảnh container, hỗ trợ xác thực phân quyền dựa trên token và quản lý siêu dữ liệu manifest.

## Ví dụ
Quy trình CI/CD đóng gói ứng dụng thành một ảnh Docker mang nhãn `v1.4.2` rồi chạy lệnh `docker push registry.mycompany.vn/backend:v1.4.2` để cụm Kubernetes ở trung tâm dữ liệu tự động tải về cập nhật hệ thống.
