---
label: "Big O notation"
aliases:
  - "Ký hiệu Big O"
  - "Độ phức tạp Big O"
loanwords:
  - "big o notation"
plain_descriptions:
  - "ký hiệu toán học mô tả thời gian chạy hoặc dung lượng bộ nhớ của thuật toán tăng nhanh cỡ nào khi dữ liệu phình to"
  - "thước đo phân loại hiệu năng thuật toán dựa trên kịch bản xấu nhất mà không phụ thuộc vào tốc độ máy tính"
summary: "Ký hiệu toán học dùng để mô tả tiệm cận trên về thời gian thực thi hoặc bộ nhớ tiêu tốn của thuật toán khi kích thước đầu vào tiến dần tới vô cùng."
confusable_notes: {}
follow_up_questions:
  - "Vì sao việc phân tích tiệm cận theo Big O luôn lược bỏ các hệ số hằng số và các số hạng bậc thấp?"
  - "Big O (chặn trên) khác gì về mặt toán học so với Big Omega (chặn dưới) và Big Theta (chặn chặt hai đầu)?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng việc ước lượng thời gian đi lại. Đi bộ tới cửa hàng gần nhà mất 5 phút cho một con phố và 10 phút cho hai con phố (tăng tuyến tính), nhưng tra một cuốn danh bạ 1.000 trang chỉ mất vài lần giở nếu liên tục lật đôi các trang (tăng theo logarit). Ký hiệu Big O đo lường độ dốc của đường cong này thay vì đo xem bạn chạy nhanh hay chậm.

## Chi tiết
Ký hiệu Big O xác định hành vi giới hạn của một hàm số bằng cách thiết lập chặn trên tiệm cận. Trong công nghệ phần mềm, nó đo lường số bước lệnh (độ phức tạp thời gian) hoặc số ô nhớ RAM phụ trợ (độ phức tạp không gian) tăng lên ra sao theo kích thước đầu vào $n$. Bằng cách bỏ qua các hằng số nhân và số hạng bậc nhỏ, Big O tập trung thuần túy vào khả năng mở rộng khi dữ liệu cực lớn. Các cấp độ thường gặp gồm: hằng số $O(1)$, logarit $O(\log n)$, tuyến tính $O(n)$, tuyến tính-logarit $O(n \log n)$, bậc hai $O(n^2)$ và hàm mũ $O(2^n)$.

## Định nghĩa chuyên ngành
Quy ước toán học lý thuyết biểu thị một hàm số $f(n)$ bị chặn trên bởi một bội số hằng của hàm $g(n)$ với mọi giá trị đầu vào $n$ đủ lớn về sau.

## Ví dụ
Tìm một tên người trong danh bạ chưa sắp xếp gồm 1.000 người đòi hỏi kiểm tra lần lượt từng mục trong tình huống xấu nhất ($O(n)$), trong khi tìm kiếm nhị phân trên danh sách đã xếp thứ tự chỉ mất tối đa 10 phép so sánh ($O(\log n)$).
