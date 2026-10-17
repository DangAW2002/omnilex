---
label: "Lập trình hướng đối tượng (OOP)"
aliases:
  - "OOP"
  - "Lập trình hướng đối tượng"
loanwords:
  - "object-oriented programming"
  - "oop"
autolink:
  aliases:
    OOP: always
plain_descriptions:
  - "phương pháp lập trình tổ chức mã nguồn xoay quanh các đối tượng chứa dữ liệu và hành động"
  - "triết lý thiết kế phần mềm mô phỏng các thực thể đời thực giao tiếp và tương tác với nhau"
summary: "Mô hình lập trình tổ chức hệ thống thành các đối tượng độc lập có khả năng đóng gói trạng thái và hành vi để phối hợp xử lý."
confusable_notes:
  functional-programming: "Lập trình hướng đối tượng tổ chức hệ thống thành các đối tượng có trạng thái giao tiếp qua phương thức, trong khi lập trình hàm tập trung vào việc tính toán qua các hàm thuần khiết không trạng thái."
follow_up_questions:
  - "Tính đa hình (polymorphism) hỗ trợ việc mở rộng kiến trúc dạng plugin như thế nào?"
  - "Vì sao việc lạm dụng kế thừa phân tầng quá sâu lại dẫn đến hiện tượng lớp cơ sở mong manh (fragile base class)?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/L%E1%BA%ADp_tr%C3%ACnh_h%C6%B0%E1%BB%9Bng_%C4%91%E1%BB%91i_t%C6%B0%E1%BB%A3ng
    accessed: '2026-10-17'
    note: "Bách khoa toàn thư tiếng Việt định nghĩa lập trình hướng đối tượng là phương pháp lập trình dựa trên khái niệm các đối tượng"
---

## Giải thích dễ hiểu
Hãy hình dung một nhà ga sân bay quốc tế. Thay vì một người duy nhất phải trực tiếp kiểm tra vé, bốc vác hành lý và nạp nhiên liệu, sân bay phân quyền cho các thực thể độc lập: quầy thủ tục xuất vé, băng chuyền chuyển hàng và phi hành đoàn điều khiển máy bay.

## Chi tiết
Lập trình hướng đối tượng được xây dựng trên bốn trụ cột căn bản: tính trừu tượng, tính đóng gói, tính kế thừa và tính đa hình. Tính trừu tượng ẩn đi những chi tiết cơ học phức tạp sau các giao diện rõ ràng. Tính đóng gói bảo vệ dữ liệu nội bộ khỏi sự can thiệp trái phép từ bên ngoài. Tính kế thừa giúp các lớp chuyên biệt tái sử dụng năng lực của lớp nền tảng. Tính đa hình cho phép các kiểu đối tượng khác nhau phản hồi linh hoạt với cùng một lời gọi phương thức.

## Định nghĩa chuyên ngành
Mô hình lập trình tổ chức phần mềm xoay quanh các đối tượng mô-đun đóng gói biến trạng thái và phương thức tác vụ, đặc trưng bởi cơ chế điều phối động, kiểu con và che giấu dữ liệu.

## Ví dụ
Phần mềm mô phỏng tạo lớp cơ sở `Vehicle`; hai đối tượng thuộc lớp con `Truck` và `Sedan` cùng nhận lệnh `steer()` để bẻ lái nhưng mang tải trọng riêng biệt là 5.000 kg và 400 kg.
