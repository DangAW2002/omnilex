---
label: "End-to-end test"
aliases:
  - "E2E test"
  - "Kiểm thử đầu cuối"
loanwords:
  - "end-to-end test"
  - "e2e test"
plain_descriptions:
  - "mô phỏng trọn vẹn hành trình của người dùng thật từ đầu đến cuối trên ứng dụng"
  - "kiểm tra toàn bộ hệ thống từ giao diện màn hình đến máy chủ và cơ sở dữ liệu"
summary: "Phương pháp kiểm thử toàn diện mô phỏng luồng thao tác của người dùng từ giao diện đồ họa qua tất cả dịch vụ máy chủ, hạ tầng và cơ sở dữ liệu."
confusable_notes:
  {}
follow_up_questions:
  - "Tại sao kiểm thử đầu cuối thường tốn nhiều thời gian và tài nguyên hơn so với kiểm thử đơn vị?"
  - "Các công cụ như Playwright hay Cypress tự động hóa thao tác trình duyệt trong kiểm thử E2E ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như một buổi tổng duyệt vở kịch với đầy đủ trang phục, ánh sáng sân khấu, ban nhạc và diễn viên diễn trọn vẹn từ mở màn đến hạ màn.

## Chi tiết
Kiểm thử đầu cuối (E2E) bảo đảm toàn bộ hệ thống phối hợp chính xác theo góc nhìn của người dùng cuối. Các công cụ tự động hóa sẽ điều khiển trình duyệt hoặc ứng dụng di động để nhấn nút, điền biểu mẫu và đối chiếu kết quả hiển thị trên màn hình. Do bao phủ tất cả các tầng kỹ thuật, bài kiểm tra này có chi phí chạy cao nhưng phát hiện lỗi hệ thống rất hiệu quả.

## Định nghĩa chuyên ngành
Quy trình thẩm định tổng thể đánh giá tính liên tục và đúng đắn của chu trình nghiệp vụ người dùng trên toàn bộ các tầng hiển thị, nghiệp vụ, mạng và lưu trữ.

## Ví dụ
Kịch bản tự động mở trình duyệt web, đăng nhập tài khoản ngân hàng, thực hiện chuyển tiền liên ngân hàng và kiểm tra xem số dư hiển thị trên màn hình có trừ đúng số tiền chuyển không.
