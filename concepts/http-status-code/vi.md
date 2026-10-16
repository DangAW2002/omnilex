---
label: HTTP status code
aliases:
  - mã trạng thái HTTP
  - mã phản hồi HTTP
  - status code
loanwords:
  - http status code
  - status code
plain_descriptions:
  - các con số ba chữ số báo hiệu yêu cầu duyệt web thành công hay bị lỗi gì
  - ký hiệu kết quả từ máy chủ như 200 thành công hay 404 không tìm thấy trang
summary: Mã số tiêu chuẩn gồm ba chữ số do máy chủ trả về nhằm phản ánh kết quả xử lý của một yêu cầu HTTP.
confusable_notes: {}
follow_up_questions:
  - Mã lỗi 401 Unauthorized khác gì so với mã lỗi 403 Forbidden?
  - Tại sao máy chủ nên trả về mã 503 thay vì 500 khi đang bảo trì hệ thống?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như các tín hiệu đèn giao thông báo hiệu cho tài xế biết đoạn đường phía trước đang thông suốt, phải dừng lại hay gặp sự cố.

## Chi tiết
Các mã trạng thái được phân loại theo chữ số đầu tiên: nhóm 1xx là thông tin sơ bộ, nhóm 2xx thể hiện xử lý thành công, nhóm 3xx chỉ dẫn chuyển hướng, nhóm 4xx chỉ lỗi từ phía người dùng (như nhập sai địa chỉ), và nhóm 5xx cảnh báo sự cố từ máy chủ.

## Định nghĩa chuyên ngành
Mã phản hồi dạng số nguyên ba chữ số được quy định trong chuẩn giao thức HTTP để thông báo tình trạng thực thi yêu cầu mạng của máy khách.

## Ví dụ
Trình duyệt nhận mã `404 Not Found` khi truy cập đường link bài viết đã bị xóa, hoặc nhận mã `200 OK` khi tải trang thành công.
