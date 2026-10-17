---
label: Web application firewall (WAF)
aliases:
  - WAF
  - tường lửa ứng dụng web
loanwords:
  - web application firewall (waf)
autolink:
  aliases:
    WAF: always
plain_descriptions:
  - tấm lá chắn bảo vệ lọc bỏ các yêu cầu web độc hại trước khi chúng chạm tới máy chủ
  - tường lửa tầng ứng dụng chuyên chặn các cuộc tấn công SQL injection và mã độc XSS
summary: Thiết bị hoặc dịch vụ an ninh chuyên dụng giám sát, kiểm tra và ngăn chặn các luồng lưu lượng HTTP/HTTPS độc hại nhắm vào ứng dụng web.
confusable_notes: {}
follow_up_questions:
  - Mô hình bảo mật tích cực (cho phép) khác gì so với mô hình bảo mật tiêu cực (chặn theo danh sách đen) trong cấu hình luật WAF?
  - Vì sao đội ngũ vận hành cần liên tục tinh chỉnh luật WAF để tránh chặn nhầm người dùng hợp pháp (false positive)?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như nhân viên an ninh kiểm tra hành lý của khách ngay tại cửa ra vào của một sự kiện: họ soi chiếu từng chiếc túi để thu giữ vật dụng nguy hiểm hoặc thẻ vào cửa giả trước khi cho phép khách bước vào hội trường, bảo đảm trật tự cho toàn bộ bên trong.

## Chi tiết
Khác với các tường lửa mạng truyền thống chỉ làm việc ở Tầng 3 và 4 (chỉ kiểm tra địa chỉ IP và số hiệu cổng kết nối), Tường lửa ứng dụng web (WAF) hoạt động trực tiếp ở Tầng 7 (Tầng ứng dụng). WAF bóc tách và kiểm tra toàn bộ gói tin HTTP/HTTPS, bao gồm tiêu đề, cookie, tham số URL và nội dung thân yêu cầu gửi lên. Hệ thống đối chiếu các yêu cầu này với bộ quy tắc phòng thủ—như bộ luật OWASP Core Rule Set—để phát hiện và ngăn chặn tức thì các mẫu tấn công quen thuộc như SQL Injection, chèn mã độc liên trang (XSS), thực thi mã từ xa và can thiệp tham số. Các giải pháp WAF đám mây hiện đại còn kết hợp thuật toán học máy phân tích hành vi để ngăn chặn bot cào dữ liệu và tấn công vét cạn tài khoản.

## Định nghĩa chuyên ngành
Cơ chế hoặc thiết bị trung gian tầng ứng dụng kiểm tra luồng lưu lượng HTTP/HTTPS hai chiều dựa trên tập chính sách nhằm bảo vệ ứng dụng web khỏi các hành vi khai thác lỗ hổng và truy cập trái phép.

## Ví dụ
Hệ thống WAF đám mây đặt trước trang web thương mại điện tử chặn đứng yêu cầu gửi từ một địa chỉ IP lạ chứa các ký tự nối lệnh SQL trong ô tìm kiếm sản phẩm, lập tức trả về mã lỗi HTTP 403 trước khi yêu cầu kịp chạm đến máy chủ cơ sở dữ liệu.
