---
label: "Secure boot"
aliases:
  - "Khởi động an toàn"
  - "Quy trình khởi động bảo mật"
loanwords:
  - "secure boot"
plain_descriptions:
  - "quy trình bảo mật đảm bảo thiết bị chỉ khởi động phần mềm chính hãng đã được ký duyệt"
  - "cơ chế kiểm tra chữ ký điện tử ngăn chặn mã độc can thiệp vào quá trình mở máy"
summary: "Tiêu chuẩn bảo mật phần cứng đảm bảo thiết bị điện tử chỉ khởi động bằng các đoạn mã và phần mềm firmware đã được nhà sản xuất chứng thực và ký số mật mã."
confusable_notes: {}
follow_up_questions:
  - "Gốc tin cậy phần cứng (Root of Trust) được ghi vĩnh viễn vào cầu chì điện tử eFuse giúp tạo chuỗi tin cậy ra sao?"
  - "Cơ chế chống hạ cấp phiên bản (anti-rollback) ngăn chặn tin tặc nạp lại các bản firmware cũ có lỗ hổng như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một người bảo vệ tòa nhà vô cùng nghiêm khắc: mỗi người muốn bước qua cửa đều phải trình thẻ nhân viên có tem chống giả chính hãng; chỉ cần thẻ bị sửa chữa hoặc nghi là giả mạo, cửa sẽ khóa chặt ngay lập tức.

## Chi tiết
Khởi động an toàn (Secure Boot) thiết lập một chuỗi tin cậy mật mã (Chain of Trust) bắt nguồn từ phần cứng ngay khi thiết bị được cấp nguồn. Quá trình bắt đầu từ một đoạn mã nạp bất biến nằm trong bộ nhớ ROM chỉ đọc được nhà sản xuất khóa chết trên chip. Trước khi cho phép nạp hệ điều hành, con chip sẽ dùng khóa công khai lưu trong cầu chì điện tử eFuse để kiểm tra chữ ký số mật mã của bản firmware trong bộ nhớ flash. Nếu chữ ký hợp lệ và chưa từng bị chỉnh sửa, máy sẽ cho phép khởi động tiếp; nếu phát hiện bị can thiệp trái phép, máy sẽ lập tức ngừng hoạt động để bảo vệ an toàn dữ liệu.

## Định nghĩa chuyên ngành
Cơ chế kiểm tra tính toàn vẹn và xác thực của chuỗi phần mềm khởi động dựa trên gốc tin cậy phần cứng bất biến, đảm bảo chỉ có các tệp nhị phân chứa chữ ký số hợp lệ mới được trao quyền thực thi.

## Ví dụ
Một công tơ điện tử thông minh dùng khóa phần cứng để kiểm tra chữ ký số của bản cập nhật phần mềm mới qua mạng, từ chối cài đặt ngay nếu phát hiện gói cập nhật không xuất phát từ máy chủ chính hãng của nhà máy.
