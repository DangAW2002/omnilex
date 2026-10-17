---
label: Time-series database
aliases:
  - cơ sở dữ liệu chuỗi thời gian
  - TSDB
autolink:
  aliases:
    TSDB: always
loanwords:
  - Time-series database
plain_descriptions:
  - cơ sở dữ liệu chuyên biệt để theo dõi các chỉ số đo đạc biến đổi theo từng giây, từng giờ và từng ngày
  - phần mềm tối ưu cho các tín hiệu cảm biến liên tục, biểu đồ giá chứng khoán và đồ thị máy chủ
summary: Cơ sở dữ liệu được tối ưu hóa để lưu trữ, truy vấn và phân tích các chuỗi điểm dữ liệu được đánh chỉ mục theo thứ tự thời gian.
confusable_notes: {}
follow_up_questions:
  - Thuật toán nén chuyên dụng như Gorilla nén độ lệch của độ lệch (delta-of-delta) giúp giảm kích thước mốc thời gian thế nào?
  - Chính sách lưu giữ dữ liệu và kỹ thuật giảm tần suất lấy mẫu (downsampling) hoạt động ra sao trong lưu trữ chỉ số dài hạn?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như cuộn giấy ghi biểu đồ nhịp tim trong bệnh viện hay máy đo địa chấn: liên tục vẽ các đường đo đạc mới theo từng giây trôi qua trên một dải giấy chạy theo thời gian.

## Chi tiết
Cơ sở dữ liệu chuỗi thời gian (TSDB) được tối ưu cho các hệ thống có tần suất ghi liên tục, lập chỉ mục theo mốc thời gian và thường xuyên truy vấn tổng hợp theo các khoảng thời gian nhất định. Hệ thống sử dụng các thuật toán nén chuyên biệt (như nén delta-of-delta cho thời gian và nén XOR cho số thực) cùng cơ chế tự động giảm độ phân giải dữ liệu cũ để tiết kiệm dung lượng ổ đĩa.

## Định nghĩa chuyên ngành
Hệ thống cơ sở dữ liệu được tối ưu hóa cho việc tiếp nhận tần suất cao, lưu trữ phân vùng theo thời gian, nén giảm mẫu và tính toán tổng hợp theo cửa sổ trượt trên dữ liệu đo lường gắn mốc thời gian.

## Ví dụ
Một công ty năng lượng mặt trời dùng cơ sở dữ liệu chuỗi thời gian để thu nhận điện áp và nhiệt độ từ 200.000 tấm pin mặt trời mỗi 5 giây một lần, cho phép vẽ biểu đồ sản lượng tức thời.
