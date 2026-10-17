---
label: "Lập trình hàm"
aliases:
  - "Lập trình chức năng"
loanwords:
  - "functional programming"
plain_descriptions:
  - "phương pháp lập trình tập trung vào việc áp dụng các hàm toán học mà không làm đổi dữ liệu dùng chung"
  - "mô hình ưu tiên sử dụng hàm thuần khiết, giá trị bất biến và các phép chuyển đổi dữ liệu khai báo"
summary: "Mô hình lập trình khai báo xem việc tính toán là sự ước lượng các hàm toán học thuần khiết và tránh làm thay đổi trạng thái dữ liệu."
confusable_notes:
  object-oriented-programming: "Lập trình hàm chú trọng vào việc biến đổi dữ liệu bất biến bằng các hàm toán học thuần khiết, trong khi lập trình hướng đối tượng liên kết trạng thái có thể biến đổi với hành vi bên trong đối tượng."
follow_up_questions:
  - "Tính minh bạch tham chiếu (referential transparency) giúp việc kiểm thử và chạy đa luồng an toàn ra sao?"
  - "Những ưu điểm lớn nhất của các hàm bậc cao như map, filter và reduce so với vòng lặp truyền thống là gì?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/L%E1%BA%ADp_tr%C3%ACnh_h%C3%A0m
    accessed: '2026-10-17'
    note: "Wikipedia tiếng Việt ghi nhận thuật ngữ Lập trình hàm tương đương Functional programming"
---

## Giải thích dễ hiểu
Hãy tưởng tượng một chiếc máy tính bỏ túi giải các phương thức toán. Nhập 7 cộng 5 sẽ luôn ra 12; phép tính này không làm biến đổi bất kỳ con số nào lưu ở các ô nhớ khác, và bấm phím bằng mười lần cũng cho đúng một đáp số duy nhất mà không gây xáo trộn gì.

## Chi tiết
Lập trình hàm xem phần mềm là một chuỗi các phép biến đổi toán học. Trọng tâm của nó là hàm thuần khiết (pure function): khi nhận đối số giống nhau, hàm luôn trả về cùng một kết quả mà không gây ra tác dụng phụ lên biến toàn cục hay bộ nhớ ngoài. Dữ liệu trong trường phái này là bất biến, mọi thao tác chỉnh sửa đều tạo ra một bản sao mới thay vì ghi đè lên bộ đệm cũ. Các kỹ thuật như hợp thành hàm, khớp mẫu và đệ quy thay thế hoàn toàn cho các vòng lặp biến đổi chỉ số cổ điển, giúp chương trình chạy đa luồng mà không lo xung đột bộ nhớ.

## Định nghĩa chuyên ngành
Mô hình lập trình khai báo trong đó quá trình tính toán dựa trên việc áp dụng và kết hợp các hàm toán học, đảm bảo tính minh bạch tham chiếu và triệt tiêu các tác dụng phụ làm biến đổi trạng thái.

## Ví dụ
Lọc danh sách giá `[10, 25, 40]` để giữ lại các phần tử lớn hơn 20 rồi nhân đôi sẽ tạo ra mảng mới `[50, 80]`, trong khi mảng ban đầu vẫn giữ nguyên giá trị.
