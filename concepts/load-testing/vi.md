---
label: Load testing
aliases:
  - Kiểm thử tải
  - Thử tải
loanwords:
  - load testing
plain_descriptions:
  - kiểm tra phần mềm bằng cách giả lập lượng người dùng truy cập lớn để xem máy chủ chịu được không
  - tạo ra hàng loạt yêu cầu ảo để đo tốc độ phản hồi và giới hạn chịu đựng của hệ thống
summary: Phương pháp kiểm thử phi chức năng bằng cách đặt hệ thống dưới một lượng tải người dùng đồng thời giả lập để đo lường thông lượng, độ trễ và độ ổn định vận hành.
confusable_notes: {}
follow_up_questions:
  - Sự khác biệt về mục tiêu giữa kiểm thử tải đỉnh (load testing), kiểm thử sức ép (stress testing) và thử tải ngâm lâu (soak testing) là gì?
  - Việc chuẩn bị dữ liệu kiểm thử cần tránh hiện tượng trúng bộ nhớ đệm (cache hit) thiếu thực tế như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc thử tải cầu dây văng trước ngày khánh thành: các kỹ sư cho hàng chục xe tải chở cát đá nặng chạy lên mặt cầu để đo độ võng và kiểm tra sức chịu tải của dây cáp.

## Chi tiết
Kiểm thử tải xác minh ứng dụng đáp ứng đúng các tiêu chuẩn hiệu năng khi có lượng người truy cập lớn trong thực tế. Các công cụ kiểm thử (như k6, JMeter, Locust) sẽ sinh ra hàng ngàn yêu cầu ảo mô phỏng hành vi mua sắm đồng thời của người dùng. Kỹ sư đo lường thông lượng yêu cầu mỗi giây, các phân vị độ trễ (p95, p99), tỷ lệ phát sinh lỗi, mức độ chiếm dụng bộ nhớ RAM và độ nghẽn kết nối cơ sở dữ liệu. Thử tải giúp phát hiện sớm hiện tượng rò rỉ bộ nhớ hoặc thiếu chỉ mục dữ liệu trước khi ra mắt công chúng.

## Định nghĩa chuyên ngành
Quy trình kiểm tra phi chức năng đánh giá hành vi, độ trễ và khả năng tiêu thụ tài nguyên của phần mềm dưới các hạn mức khối lượng vận hành giả lập xác định trước.

## Ví dụ
Một sàn thương mại điện tử thực hiện bài kiểm thử tải với 15.000 phiên thanh toán đồng thời trong 30 phút, đảm bảo độ trễ ở phân vị p99 luôn dưới 250 mili giây và không có giao dịch nào bị lỗi máy chủ.
