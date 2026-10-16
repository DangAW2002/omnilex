---
label: "Deprecation"
qualifier: "(Phần mềm)"
aliases:
  - "Khai tử tính năng"
  - "Lỗi thời hóa"
loanwords:
  - "deprecation"
plain_descriptions:
  - "thông báo chính thức rằng một tính năng sắp bị xóa bỏ trong các bản cập nhật tương lai"
  - "đánh dấu đoạn mã cũ không nên dùng nữa nhưng vẫn tạm thời để nó hoạt động"
summary: "Thông báo chính thức về việc ngừng hỗ trợ và khuyến cáo không tiếp tục sử dụng một tính năng hoặc API trước khi loại bỏ hoàn toàn trong tương lai."
confusable_notes:
  breaking-change: "Deprecation cảnh báo tính năng sắp bị khai tử nhưng vẫn giữ cho nó hoạt động tạm thời; thay đổi gây phá vỡ là sự thay đổi hoặc loại bỏ dứt điểm buộc mã phía người dùng phải sửa đổi để chạy được."
follow_up_questions:
  - "Cảnh báo của trình biên dịch và tiêu đề HTTP Sunset giúp lập trình viên chuẩn bị chuyển đổi ra sao?"
  - "Khái niệm tính năng bị deprecate khác gì so với tính năng đã bị xóa bỏ hoàn toàn (obsolete)?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Biển báo cắm trước một cây cầu gỗ cũ thông báo cầu sẽ đóng cửa vào năm sau, giúp người đi đường có đủ thời gian chuyển sang đi đường cao tốc mới trước khi cây cầu bị tháo dỡ.

## Chi tiết
Deprecation cung cấp cho người dùng thư viện một khoảng thời gian chuyển tiếp để cập nhật mã nguồn trước khi tính năng bị xóa hẳn. Trong giai đoạn này, tính năng cũ vẫn chạy được để giữ tính tương thích ngược, nhưng trình biên dịch, linter hoặc API header sẽ đưa ra cảnh báo kèm liên kết hướng dẫn cách chuyển sang dùng tính năng mới.

## Định nghĩa chuyên ngành
Quy định vòng đời phần mềm chính thức chỉ định một giao diện lập trình sắp bị chấm dứt sử dụng, duy trì khả năng tương thích ngược trong giai đoạn chuyển đổi trước khi loại bỏ.

## Ví dụ
Đánh dấu chú thích @deprecated lên hàm đăng nhập bằng mật khẩu văn bản thuần để cảnh báo lập trình viên chuyển sang hàm đăng nhập dùng token bảo mật OAuth2.
