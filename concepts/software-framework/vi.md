---
label: "Framework"
qualifier: "(Phần mềm)"
aliases:
  - "Khung phần mềm"
  - "Software framework"
loanwords:
  - "framework"
  - "software framework"
autolink:
  label: never
plain_descriptions:
  - "bộ khung sườn quy định cấu trúc và cách vận hành tổng thể của một phần mềm"
  - "nền tảng nắm quyền điều khiển ứng dụng và gọi đến các đoạn mã do bạn viết"
summary: "Khung kiến trúc hoàn chỉnh định hình quy tắc tổ chức, quản lý vòng đời ứng dụng và tự động điều phối việc gọi thực thi các đoạn mã tùy biến của lập trình viên."
confusable_notes:
  software-library: "Framework điều khiển luồng thực thi và chủ động gọi mã do người dùng viết, trong khi thư viện là tập hợp các hàm tiện ích được mã người dùng chủ động gọi khi cần."
follow_up_questions:
  - "Nguyên lý Hollywood (\"Đừng gọi chúng tôi, chúng tôi sẽ gọi bạn\") thể hiện trong thiết kế framework như thế nào?"
  - "Các framework định hướng chặt chẽ (opinionated) giúp chuẩn hóa kiến trúc dự án ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như bộ khung bê tông cốt thép của một tòa nhà: bộ khung đã định sẵn vị trí phòng, cửa ra vào và hành lang, việc của bạn là bố trí nội thất và trang trí theo ý muốn.

## Chi tiết
Framework áp dụng nguyên lý đảo ngược điều khiển (Inversion of Control). Thay vì lập trình viên tự viết vòng lặp chính của phần mềm, framework sẽ quản lý việc tiếp nhận yêu cầu mạng, điều hướng sự kiện và tự động gọi đến các hàm xử lý của bạn khi có sự kiện thích hợp xảy ra.

## Định nghĩa chuyên ngành
Môi trường phần mềm bán hoàn chỉnh xác lập kiến trúc cốt lõi và điều khiển luồng thực thi, chủ động kích hoạt các thành phần tùy biến thông qua cơ chế móc nối (hooks).

## Ví dụ
Xây dựng ứng dụng web bằng NestJS hoặc Ruby on Rails, nơi framework tự động lắng nghe cổng mạng, xử lý middleware và gọi hàm controller tương ứng khi có khách truy cập.
