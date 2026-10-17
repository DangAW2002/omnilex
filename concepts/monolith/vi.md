---
label: Monolithic architecture
aliases:
  - Monolith
  - Kiến trúc nguyên khối
loanwords:
  - monolithic architecture
  - monolith
autolink:
  aliases:
    Monolith: auto
plain_descriptions:
  - ứng dụng toàn bộ chạy trong một khối mã nguồn duy nhất
  - phần mềm gom mọi tính năng vào một tiến trình và cơ sở dữ liệu chung
summary: Mô hình kiến trúc trong đó toàn bộ tính năng nghiệp vụ, giao diện và logic truy cập dữ liệu được đóng gói và vận hành dưới dạng một hệ thống duy nhất.
confusable_notes: {}
follow_up_questions:
  - Vì sao khởi đầu bằng monolith thường được khuyến nghị trước khi tách nhỏ microservices?
  - Mô hình modular monolith giúp hạn chế sự phân rã kiến trúc mà không gây phức tạp hệ thống phân tán ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy hình dung chiếc dao đa năng Thụy Sĩ gồm kéo, dao và mở nắp chai gắn liền một khối: rất tiện lợi để mang theo một chỗ, nhưng nếu muốn thay đổi một lưỡi dao thì phải đụng đến cả thân dao.

## Chi tiết
Trong kiến trúc monolith, tầng giao diện, các quy tắc nghiệp vụ và lớp truy xuất dữ liệu được đóng gói chung thành một bản dựng duy nhất, chẳng hạn tệp thực thi nhị phân hay tệp WAR. Các thành phần tương tác trực tiếp qua bộ nhớ tiến trình thay vì gọi mạng từ xa. Cách tổ chức này triệt tiêu độ trễ mạng, đơn giản hóa giao dịch với khóa cục bộ của cơ sở dữ liệu và giúp việc gỡ lỗi toàn trình thuận tiện. Tuy vậy, khi đội ngũ mở rộng, việc mở rộng tải đòi hỏi phải nhân bản toàn bộ ứng dụng lên nhiều máy chủ, và lỗi nghiêm trọng ở một góc có thể làm ngưng trệ toàn bộ tiến trình.

## Định nghĩa chuyên ngành
Kiểu thiết kế phần mềm trong đó các thành phần tính năng được kết nối chặt chẽ thành một khối thực thi duy nhất, chia sẻ chung không gian bộ nhớ, vòng đời và kho lưu trữ dữ liệu.

## Ví dụ
Một ứng dụng bán hàng trực tuyến giai đoạn đầu gom toàn bộ giao diện bán hàng, thanh toán, quản lý kho và báo cáo kế toán chạy chung trong một cụm 4 máy chủ chia sẻ một cơ sở dữ liệu quan hệ.
