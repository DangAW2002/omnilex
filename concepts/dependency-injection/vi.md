---
label: Dependency injection
aliases:
  - DI
  - Tiêm phụ thuộc
loanwords:
  - dependency injection
  - di
autolink:
  aliases:
    DI: always
plain_descriptions:
  - truyền đối tượng cần thiết từ bên ngoài vào thay vì để lớp tự khởi tạo bên trong
  - đưa các dịch vụ phụ thuộc vào hàm dựng giúp dễ dàng viết mã kiểm thử
summary: Mẫu thiết kế phần mềm trong đó một đối tượng nhận các thành phần phụ thuộc của nó từ một bộ cấu hình bên ngoài thay vì tự khởi tạo bên trong, hiện thực hóa nguyên lý đảo ngược điều khiển.
confusable_notes: {}
follow_up_questions:
  - Vì sao phương pháp tiêm qua hàm dựng (constructor injection) lại được ưa chuộng hơn tiêm qua trường hay setter?
  - Các khung chứa DI (container) quản lý vòng đời đối tượng như transient, scoped và singleton ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc cắm phích đèn bàn vào ổ cắm trên tường: chiếc đèn không cần tự chế tạo máy phát điện hay quan tâm nguồn điện đến từ nhà máy nào, nó chỉ cần nguồn cấp từ bên ngoài để sáng.

## Chi tiết
Khi một lớp tự khởi tạo đối tượng phụ thuộc bên trong bằng từ khóa new (như new DatabaseConnection()), nó bị trói chặt vào cài đặt cụ thể và không thể cô lập khi viết kiểm thử đơn vị. Tiêm phụ thuộc (DI) đảo ngược quyền điều khiển này: các thành phần phụ thuộc được khai báo dưới dạng giao diện (interface) và được truyền từ ngoài vào qua hàm dựng (constructor). Một khung chứa DI sẽ tự động giải quyết cây phụ thuộc và liên kết các thành phần lại với nhau.

## Định nghĩa chuyên ngành
Mẫu thiết kế tạo dựng thực hiện nguyên lý đảo ngược điều khiển bằng cách truyền các thực thể phụ thuộc vào đối tượng qua tham số hàm dựng, hàm gán setter hoặc giao diện.

## Ví dụ
Lớp OrderService nhận giao diện IPaymentGateway qua hàm dựng, cho phép hệ thống thật nạp cổng thanh toán trực tuyến trong khi mã kiểm thử đơn vị chỉ cần nạp một đối tượng giả lập trong bộ nhớ.
