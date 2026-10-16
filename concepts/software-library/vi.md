---
label: "Library"
qualifier: "(Phần mềm)"
aliases:
  - "Thư viện"
  - "Thư viện phần mềm"
loanwords:
  - "library"
  - "software library"
autolink:
  label: never
  aliases:
    Thư viện: never
plain_descriptions:
  - "tập hợp các hàm viết sẵn để lập trình viên gọi ra dùng mỗi khi cần"
  - "gói mã nguồn tiện ích giúp giải quyết các tác vụ cụ thể mà không cần tự viết lại"
summary: "Tập hợp các hàm, lớp và đoạn mã viết sẵn được đóng gói để lập trình viên nhập vào và chủ động gọi thực thi khi cần xử lý các tác vụ chuyên biệt."
confusable_notes:
  software-framework: "Thư viện cung cấp các hàm để mã của bạn chủ động gọi; framework nắm quyền điều khiển luồng ứng dụng và gọi lại mã của bạn (đảo ngược điều khiển - IoC)."
follow_up_questions:
  - "Khái niệm đảo ngược điều khiển (IoC) phân biệt thư viện với framework ra sao?"
  - "Lợi thế của việc chia nhỏ dự án thành các thư viện tiện ích độc lập là gì?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như mượn một chiếc cờ lê trong hộp đồ nghề: bạn chỉ lấy nó ra khi cần vặn một chiếc ốc cụ thể, sử dụng xong thì cất đi, và bạn là người hoàn toàn làm chủ tiến độ công việc.

## Chi tiết
Thư viện cung cấp các tính năng tiện ích hoặc logic xử lý mà không can thiệp vào kiến trúc tổng thể hay luồng điều khiển của ứng dụng. Mã nguồn của bạn giữ quyền kiểm soát chính, tự quyết định thời điểm và cách thức gọi hàm trong thư viện để tính toán hoặc biến đổi dữ liệu.

## Định nghĩa chuyên ngành
Tập hợp mã nguồn có thể tái sử dụng gồm các thủ tục, kiểu dữ liệu và phương thức độc lập được mã của chương trình chủ gọi thực thi một cách tường minh.

## Ví dụ
Lập trình viên nhập thư viện lodash vào dự án web để gọi hàm sắp xếp mảng dữ liệu mà không cần tự lập trình thuật toán sắp xếp từ đầu.
