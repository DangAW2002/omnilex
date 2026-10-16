---
label: "Semantic versioning"
aliases:
  - "SemVer"
  - "Đánh số phiên bản theo ngữ nghĩa"
loanwords:
  - "semantic versioning"
  - "SemVer"
plain_descriptions:
  - "hệ thống đánh số phiên bản gồm 3 phần cho biết bản cập nhật sửa lỗi, thêm tính năng hay làm thay đổi hệ thống"
  - "quy chuẩn đặt số phiên bản dạng MAJOR.MINOR.PATCH để thông báo tính tương thích của phần mềm"
summary: "Quy chuẩn đánh số phiên bản phần mềm theo định dạng ba chữ số (MAJOR.MINOR.PATCH) nhằm truyền tải mức độ ảnh hưởng và tính tương thích của bản phát hành."
confusable_notes:
  {}
follow_up_questions:
  - "Các trình quản lý gói như npm hoặc Cargo diễn giải ký hiệu mũ (^) và dấu ngã (~) dựa trên SemVer ra sao?"
  - "Vì sao SemVer coi các phiên bản bắt đầu bằng 0.y.z là giai đoạn khởi tạo ban đầu và không cam kết tính ổn định?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Đánh số đời xe máy: thay đổi toàn bộ khung sườn động cơ là phiên bản lớn (MAJOR), bổ sung thêm phanh ABS là phiên bản phụ (MINOR), và chỉnh lại ốc vít lỏng là bản vá lỗi nhỏ (PATCH).

## Chi tiết
Semantic Versioning (SemVer) chia số phiên bản thành dạng X.Y.Z: số đầu (MAJOR) tăng khi có thay đổi gây phá vỡ tính tương thích cũ, số giữa (MINOR) tăng khi thêm tính năng mới tương thích ngược, và số cuối (PATCH) tăng khi sửa lỗi vặt. Quy ước này giúp các công cụ quản lý thư viện tự động nâng cấp an toàn mà không làm sập ứng dụng.

## Định nghĩa chuyên ngành
Quy chuẩn hình thức về định danh bản phát hành phần mềm mã hóa cam kết tương thích giao diện thành bộ ba số nguyên tuân theo quy tắc ưu tiên định sẵn.

## Ví dụ
Một thư viện giao diện người dùng tăng số phiên bản từ 1.8.2 lên 2.0.0 để báo hiệu rằng các thẻ hiển thị cũ đã bị xóa bỏ và lập trình viên phải sửa lại mã lệnh.
