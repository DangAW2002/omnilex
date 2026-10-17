---
label: "Đệ quy"
aliases: []
loanwords:
  - "recursion"
plain_descriptions:
  - "phương pháp giải quyết bài toán bằng cách cho hàm tự gọi lại chính nó với kích thước dữ liệu nhỏ hơn"
  - "kỹ thuật lặp trong lập trình sử dụng các lệnh tự gọi hàm cho tới khi gặp điều kiện dừng"
summary: "Kỹ thuật giải quyết bài toán trong đó một hàm tự gọi lại chính nó với các phiên bản thu nhỏ cho đến khi thỏa mãn điều kiện dừng."
confusable_notes: {}
follow_up_questions:
  - "Điều gì giúp thuật toán đệ quy không bị tràn bộ nhớ ngăn xếp dẫn đến sập ứng dụng?"
  - "Cơ chế tối ưu hóa đệ quy đuôi (tail call optimization) chuyển đổi việc gọi đệ quy thành vòng lặp ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/%C4%90%E1%BB%87_quy
    accessed: '2026-10-17'
    note: "Wikipedia tiếng Việt ghi nhận khái niệm Đệ quy trong toán học và khoa học máy tính"
---

## Giải thích dễ hiểu
Hãy hình dung bộ búp bê gỗ Matryoshka của Nga. Khi mở búp bê lớn nhất ra, bên trong lại là một búp bê giống hệt nhưng nhỏ hơn một chút; tiếp tục mở liên tục như vậy cho đến khi chạm tới con búp bê đặc ruột nhỏ nhất ở giữa thì quy trình dừng lại.

## Chi tiết
Hàm đệ quy phân rã một bài toán phức tạp thành các bài toán con cùng loại có quy mô nhỏ hơn. Nó bắt buộc phải có hai thành phần: điểm dừng (base case) để trả về đáp án trực tiếp và bước đệ quy để thu hẹp phạm vi bài toán về phía điểm dừng. Mỗi lần tự gọi, hệ điều hành đẩy một khung kích hoạt mới vào ngăn xếp cuộc gọi để lưu địa chỉ trả về và biến cục bộ. Nếu không chạm được tới điểm dừng, các khung ngăn xếp sẽ bị chất đầy, dẫn đến lỗi tràn ngăn xếp (stack overflow).

## Định nghĩa chuyên ngành
Kỹ thuật giải thuật trong đó một thủ tục gọi lại chính nó trực tiếp hoặc gián tiếp, tạo ra chuỗi các khung kích hoạt trên ngăn xếp và chỉ rút gọn trở về khi một điều kiện dừng mang giá trị chân lý đúng.

## Ví dụ
Tính giai thừa của số 4 được triển khai thành 4 nhân với `factorial(3)`, tiếp tục tự gọi cho đến khi gặp `factorial(1) = 1`, gom kết quả ngược lại để cho ra 24.
