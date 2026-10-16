---
label: Rate limiting
aliases:
  - Giới hạn tần suất
  - Hạn chế tốc độ gọi
  - Kiểm soát tốc độ truy cập
loanwords:
  - rate limiting
plain_descriptions:
  - giới hạn số lần một người dùng hoặc ứng dụng có thể gọi đến máy chủ trong một phút để chống quá tải
  - cơ chế chặn các đợt gửi yêu cầu dồn dập giúp máy chủ không bị sập
summary: >-
  Cơ chế kiểm soát mạng phòng ngừa nhằm hạn chế số lượng yêu cầu mà một máy khách có thể gửi tới giao diện lập trình ứng
  dụng (API) trong một khoảng thời gian.
confusable_notes: {}
follow_up_questions:
  - Thuật toán Thùng chứa token (Token Bucket) khác biệt gì so với thuật toán Cửa sổ trượt (Sliding Window)?
  - Vì sao phản hồi khi bị giới hạn tần suất cần trả về mã HTTP 429 kèm theo tiêu đề Retry-After?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như nhân viên soát vé tại khu vui chơi: cứ mỗi năm phút chỉ cho mười người bước vào khu vực xếp hàng để sàn chờ không bao giờ bị chen lấn xô đẩy nguy hiểm.

## Chi tiết
Giới hạn tần suất giúp bảo vệ hệ thống trước các cuộc tấn công từ chối dịch vụ, dò mật khẩu và các công cụ cào dữ liệu trái phép. Các thuật toán phổ biến bao gồm Token Bucket, Leaky Bucket và Sliding Window. Khi người dùng vượt quá số lượt quy định, máy chủ sẽ từ chối xử lý bằng mã phản hồi HTTP 429 (Too Many Requests).

## Định nghĩa chuyên ngành
Chính sách quản lý lưu lượng đo đếm số yêu cầu đầu vào theo danh tính người dùng hoặc địa chỉ IP, áp dụng cơ chế từ chối hoặc xếp hàng khi vượt quá hạn ngạch.

## Ví dụ
Cổng kết nối API giới hạn người dùng gói miễn phí chỉ được gửi tối đa 60 yêu cầu mỗi phút, trả về mã lỗi HTTP 429 khi phát hiện một tài khoản gửi tới 100 yêu cầu trong 10 giây.
