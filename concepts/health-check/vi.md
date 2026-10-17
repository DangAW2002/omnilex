---
label: Health check
qualifier: (Phần mềm)
aliases:
  - Kiểm tra sức khỏe dịch vụ
loanwords:
  - health check
plain_descriptions:
  - lệnh kiểm tra định kỳ gửi đến máy chủ để biết dịch vụ còn sống và hoạt động bình thường hay không
  - đường dẫn chuyên dụng trả về mã thành công khi các thành phần cơ sở dữ liệu và bộ nhớ vẫn ổn định
summary: >-
  Yêu cầu chẩn đoán được gửi định kỳ tới một dịch vụ phần mềm nhằm xác nhận trạng thái hoạt động và khả năng xử lý yêu cầu của dịch vụ đó.
confusable_notes: {}
follow_up_questions:
  - "Vì sao các bộ cân bằng tải nên dùng phép kiểm tra nhẹ thay vì kiểm tra sâu khiến làm chậm cơ sở dữ liệu?"
  - "Khi một dịch vụ không vượt qua bài kiểm tra sức khỏe, hệ sinh thái xung quanh sẽ tự động cô lập nó ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như người gác cổng định kỳ gõ nhẹ vào cửa trạm trực mỗi mười phút; nếu bên trong gõ đáp lại thì biết mọi việc vẫn ổn, còn nếu im lặng thì đội ứng cứu lập tức có mặt.

## Chi tiết
Health check là cơ chế kiểm tra tự động do các bộ cân bằng tải hoặc hệ thống điều phối gửi tới máy chủ ứng dụng để thẩm tra trạng thái sẵn sàng làm việc. Phổ biến nhất là việc ứng dụng mở sẵn một đường dẫn HTTP như /healthz để trả về mã 200 khi mọi tiến trình hoạt động tốt. Người ta phân chia thành kiểm tra nông (chỉ kiểm tra xem ứng dụng có phản hồi mạng không) và kiểm tra sâu (kiểm tra thêm kết nối tới cơ sở dữ liệu và bộ nhớ đệm). Nếu máy chủ không trả lời hoặc trả về mã lỗi liên tục, hệ thống sẽ tự động gạt máy chủ đó ra khỏi danh sách phục vụ khách.

## Định nghĩa chuyên ngành
Quy trình chẩn đoán tự động định kỳ gửi qua giao thức mạng nhằm đánh giá tính sẵn sàng và tính toàn vẹn chức năng của một phiên bản phần mềm.

## Ví dụ
Bộ cân bằng tải Nginx gửi yêu cầu kiểm tra tới cổng /healthz của ứng dụng mỗi 5 giây; khi máy chủ trả về mã 500 hai lần liên tiếp, Nginx lập tức chuyển khách hàng sang các máy chủ khác.
