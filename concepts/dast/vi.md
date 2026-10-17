---
label: Dynamic application security testing (DAST)
aliases:
  - DAST
  - kiểm thử bảo mật ứng dụng động
loanwords:
  - dynamic application security testing (dast)
autolink:
  aliases:
    DAST: always
plain_descriptions:
  - kiểm tra ứng dụng đang chạy thực tế bằng cách gửi các yêu cầu giả lập tấn công từ bên ngoài
  - phương pháp quét bảo mật hộp đen kiểm tra điểm yếu của trang web khi đang hoạt động
summary: Phương pháp kiểm thử hộp đen đánh giá ứng dụng đang vận hành từ bên ngoài bằng cách bơm các tải trọng tấn công thử nghiệm để phát hiện lỗ hổng thời gian chạy.
confusable_notes:
  sast: DAST phân tích ứng dụng đang chạy ở môi trường thực tế từ bên ngoài; SAST kiểm tra cấu trúc mã nguồn và thư viện phụ thuộc từ bên trong mà không cần chạy chương trình.
follow_up_questions:
  - Vì sao việc duy trì phiên đăng nhập cho trình thu thập dữ liệu (crawler) trong DAST lại phức tạp đối với các ứng dụng đơn trang (SPA)?
  - DAST giúp phát hiện các lỗi cấu hình môi trường máy chủ mà các công cụ phân tích tĩnh bỏ sót như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc chuyên gia thử nghiệm an toàn xe hơi lái chiếc xe thật đâm vào rào chắn thử nghiệm: thay vì ngồi đọc bản vẽ kỹ thuật trong xưởng, họ cho xe chạy thực tế trên đường thử để kiểm tra xem túi khí có bung ra và khung xe có bảo vệ được người ngồi bên trong hay không.

## Chi tiết
Kiểm thử bảo mật ứng dụng động (DAST) tiếp cận phần mềm theo phương thức kiểm thử hộp đen, hoàn toàn không cần tiếp cận mã nguồn hay cấu trúc cơ sở dữ liệu nội bộ. Thông qua giao thức HTTP/HTTPS, công cụ DAST tự động duyệt qua các đường dẫn (crawl), liệt kê toàn bộ các biểu mẫu nhập liệu và tham số API, sau đó bơm các chuỗi dữ liệu độc hại thử nghiệm (như các đoạn mã XSS hoặc cú pháp SQL injection). Bằng việc phân tích mã trạng thái phản hồi, độ trễ mạng và thông báo lỗi trả về từ máy chủ, DAST phát hiện các lỗ hổng thời gian chạy, lỗi cấu hình máy chủ web và các sự cố phân quyền chỉ phát sinh khi hệ thống thực sự vận hành.

## Định nghĩa chuyên ngành
Kỹ thuật kiểm thử hộp đen đánh giá phần mềm đang hoạt động bằng cách kích thích các giao diện công khai bằng dữ liệu đầu vào bất thường để xác định các lỗ hổng bảo mật quan sát được trong quá trình thực thi.

## Ví dụ
Đội ngũ an ninh mạng thiết lập công cụ DAST quét tự động trên môi trường staging qua đêm, phát hiện một lỗ hổng phản hồi mã độc XSS trong biểu mẫu khảo sát khách hàng có thể kích hoạt JavaScript trái phép trên trình duyệt.
