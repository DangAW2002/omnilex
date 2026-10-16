---
label: "Breaking change"
aliases:
  - "Thay đổi gây phá vỡ"
  - "Thay đổi không tương thích"
loanwords:
  - "breaking change"
plain_descriptions:
  - "sự thay đổi trong phần mềm hoặc API làm hỏng các chương trình đang kết nối với nó"
  - "bản cập nhật buộc các lập trình viên khác phải viết lại mã nguồn mới có thể tiếp tục sử dụng"
summary: "Sự thay đổi trong giao diện phần mềm, thư viện hoặc hệ thống làm mất tính tương thích ngược và đòi hỏi các ứng dụng phụ thuộc phải sửa đổi mã nguồn."
confusable_notes:
  deprecation: "Thay đổi gây phá vỡ lập tức làm hỏng tính tương thích và buộc người dùng phải sửa đổi mã; deprecation là giai đoạn cảnh báo trước giúp lập trình viên chuẩn bị chuyển đổi."
follow_up_questions:
  - "Những chiến lược thiết kế nào giúp các nhóm nền tảng ra mắt tính năng mới mà không tạo ra thay đổi gây phá vỡ?"
  - "Quy chuẩn Semantic Versioning kiểm soát việc đưa các thay đổi gây phá vỡ vào chu kỳ phát hành như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Đổi hình dạng ổ cắm trên tường từ chân dẹt sang chân tròn, khiến mọi phích cắm hiện có trong nhà đều không cắm vừa trừ khi phải đi mua đầu chuyển mới.

## Chi tiết
Thay đổi gây phá vỡ xuất hiện khi một hàm bị đổi tên, tham số bắt buộc bị thêm vào, cấu trúc phản hồi JSON bị thay đổi hoặc hành vi logic cũ bị đảo ngược. Khi một gói thư viện phát hành bản cập nhật phá vỡ tính tương thích, mã nguồn cũ không thể biên dịch hoặc sẽ gặp lỗi nghiêm trọng khi chạy. Theo quy ước SemVer, các thay đổi này bắt buộc phải tăng chữ số MAJOR.

## Định nghĩa chuyên ngành
Sự biến đổi trong hợp đồng giao diện hoặc ngữ nghĩa vận hành làm mất hiệu lực các giả định tích hợp trước đó của bên tiêu thụ, dẫn đến lỗi biên dịch hoặc sự cố khi chạy.

## Ví dụ
Một cổng thanh toán trực tuyến bất ngờ đổi tên trường `customer_id` thành `client_uuid` trong phản hồi API khiến tất cả ứng dụng đối tác bị lỗi không đọc được mã khách hàng.
