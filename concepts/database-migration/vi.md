---
label: Migration
qualifier: (Cơ sở dữ liệu)
aliases:
  - di chuyển lược đồ
  - nâng cấp cấu trúc dữ liệu
loanwords:
  - migration
autolink:
  label: never
plain_descriptions:
  - các tệp mã nguồn quản lý phiên bản giúp nâng cấp cấu trúc bảng dữ liệu an toàn mà không làm mất thông tin cũ
  - tập lệnh thêm cột hoặc tạo bảng mới cho cơ sở dữ liệu đang chạy
summary: Tập hợp các đoạn mã được quản lý phiên bản nhằm biến đổi và nâng cấp cấu trúc cơ sở dữ liệu an toàn theo thời gian mà không làm mất dữ liệu hiện có.
confusable_notes: {}
follow_up_questions:
  - Đội ngũ kỹ thuật có thể thực hiện di chuyển cấu trúc dữ liệu không gián đoạn (zero-downtime) bằng cách nào?
  - Những nguy cơ nào xuất hiện khi gom các tác vụ di chuyển dữ liệu lớn vào trong một giao dịch duy nhất?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như bản vẽ cải tạo nhà ghi rõ bức tường nào cần phá, đường ống nào cần lắp thêm, giúp thợ thi công đúng trình tự mà không làm sập nhà.

## Chi tiết
Migration được lưu thành các tệp mã nguồn gắn liền với dự án trong Git. Mỗi file migration định nghĩa lệnh "up" để thực hiện thay đổi (thêm bảng, sửa cột) và lệnh "down" để hoàn tác khôi phục trạng thái cũ nếu việc triển khai gặp sự cố.

## Định nghĩa chuyên ngành
Quy trình áp dụng các thay đổi cấu trúc gia tăng, có thể đảo ngược và được đánh số phiên bản cho lược đồ cơ sở dữ liệu trên các môi trường triển khai.

## Ví dụ
Chạy lệnh migration khi cập nhật ứng dụng để bổ sung cột `ma_so_thue` vào bảng thông tin khách hàng trên máy chủ thực tế.
