---
label: "Mock"
qualifier: "(Kiểm thử)"
aliases:
  - "Mock object"
  - "Đối tượng giả lập"
loanwords:
  - "mock"
  - "mock object"
autolink:
  label: never
plain_descriptions:
  - "đối tượng giả lập dùng để thay thế dịch vụ thật khi chạy bài kiểm tra mã nguồn"
  - "thành phần đóng thế giúp kiểm tra xem một hàm có được gọi đúng số lần và đúng tham số không"
summary: "Đối tượng giả lập mô phỏng hành vi của thành phần thật một cách có kiểm soát, giúp xác minh các lệnh gọi phương thức và tương tác khi kiểm thử độc lập."
confusable_notes:
  {}
follow_up_questions:
  - "Điểm khác biệt căn bản giữa mock và stub trong phát triển phần mềm là gì?"
  - "Việc lạm dụng mock vào chi tiết bên trong có thể làm bài kiểm thử dễ gãy (brittle) ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống hình nộm dùng trong các cuộc thử nghiệm va chạm ô tô: hình nộm thay thế người thật để đo đạc lực tác động một cách an toàn mà không gây nguy hiểm.

## Chi tiết
Khi viết bài kiểm thử đơn vị, mock được dùng để thay thế các thành phần phức tạp hoặc có tác dụng phụ như cổng thanh toán, dịch vụ gửi email hoặc cơ sở dữ liệu. Lập trình viên thiết lập trước kỳ vọng: mock sẽ được gọi bao nhiêu lần, với tham số nào và trả về kết quả giả định gì để kiểm tra phản ứng của hệ thống.

## Định nghĩa chuyên ngành
Một đối tượng đóng thế (test double) được nạp sẵn các kỳ vọng hành vi nhằm kiểm chứng tính chính xác của các tương tác giữa đơn vị đang kiểm thử và thành phần phụ thuộc.

## Ví dụ
Khi kiểm thử tính năng mua vé xem phim, lập trình viên tạo một mock cổng thanh toán để giả lập việc trừ tiền thành công mà không trừ tiền thật trong tài khoản ngân hàng.
