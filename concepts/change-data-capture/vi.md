---
label: Change data capture (CDC)
aliases:
  - CDC
loanwords:
  - Change data capture (CDC)
  - Change data capture
autolink:
  aliases:
    CDC: never
plain_descriptions:
  - nhận diện và theo dõi các thay đổi dòng trong cơ sở dữ liệu để hệ thống khác tự cập nhật theo
  - theo dõi nhật ký giao dịch của cơ sở dữ liệu để đồng bộ dữ liệu sửa đổi sang bộ nhớ đệm và tìm kiếm
summary: Tập hợp các kỹ thuật và mẫu thiết kế giúp ghi nhận và truyền tải các thao tác sửa đổi dữ liệu cấp dòng ngay khi xảy ra.
confusable_notes: {}
follow_up_questions:
  - Vì sao CDC dựa trên nhật ký ghi trước lại hiệu quả và ít ảnh hưởng hệ thống hơn quét cột thời gian?
  - CDC xử lý việc thay đổi cấu trúc bảng cơ sở dữ liệu như thế nào để không làm gãy luồng xử lý phía dưới?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như cài đặt tính năng thông báo biến động số dư ngân hàng: mỗi khi tiền ra hoặc vào tài khoản, hệ thống lập tức báo ngay cho ứng dụng quản lý chi tiêu cá nhân để cập nhật sổ sách.

## Chi tiết
CDC đọc trực tiếp từ nhật ký giao dịch ghi trước (WAL) của cơ sở dữ liệu thay vì chạy lệnh SELECT quét bảng định kỳ. Cơ chế này trích xuất các thao tác thêm, sửa, xóa thành các gói tin sự kiện chứa giá trị trước và sau khi thay đổi, sau đó chuyển tới bộ nhớ đệm, máy chủ tìm kiếm hoặc kho dữ liệu phân tích mà không gây tải cho máy chủ vận hành chính.

## Định nghĩa chuyên ngành
Kỹ thuật hệ thống theo dõi và thu thập các thao tác biến đổi dữ liệu đã commit trực tiếp từ nhật ký giao dịch của cơ sở dữ liệu để phát đi luồng dữ liệu thay đổi chi tiết.

## Ví dụ
Một hệ thống bán lẻ dùng công cụ Debezium CDC đọc nhật ký của cơ sở dữ liệu PostgreSQL để cập nhật chỉ mục Elasticsearch trong vòng 200 mili giây sau khi nhân viên đổi giá sản phẩm.
