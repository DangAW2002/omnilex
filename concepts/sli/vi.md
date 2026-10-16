---
label: Service Level Indicator (SLI)
aliases:
  - SLI
  - Chỉ số mức dịch vụ
loanwords:
  - SLI
  - service level indicator
plain_descriptions:
  - con số đo lường chính xác xem dịch vụ đang hoạt động thực tế tốt đến mức nào
  - thước đo kỹ thuật dùng để kiểm tra xem hệ thống có đang đạt chỉ tiêu cam kết hay không
summary: >-
  Chỉ số đo lường định lượng được chọn lọc cẩn thận để đánh giá mức độ phục vụ thực tế mà hệ thống cung cấp cho người
  dùng theo thời gian.
confusable_notes:
  slo: SLI là chỉ số đo lường hiệu năng thực tế đang diễn ra, còn SLO là mức mục tiêu mà đội ngũ kỹ thuật cam kết đạt tới.
  sla: >-
    SLI là thước đo kỹ thuật về hoạt động của hệ thống, còn SLA là hợp đồng pháp lý hoặc thương mại với khách hàng nếu
    dịch vụ suy giảm chất lượng.
follow_up_questions:
  - Vì sao các chỉ số dạng tỷ lệ (yêu cầu tốt chia cho tổng số yêu cầu hợp lệ) lại được ưa chuộng làm SLI?
  - Làm thế nào để SLI loại bỏ các lỗi phía máy khách (như mã phản hồi HTTP 4xx) để phản ánh đúng sức khỏe máy chủ?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
autolink:
  aliases:
    SLI: always
---

## Giải thích dễ hiểu
Giống như số đo trên nhiệt kế khi bạn bị ốm: nhiệt kế hiển thị con số đo thực tế là 38,5°C (chính là SLI), bạn so sánh con số này với nhiệt độ chuẩn 37°C (chính là SLO).

## Chi tiết
Chỉ số mức dịch vụ (SLI) đánh giá trực tiếp trải nghiệm của người dùng bằng cách tính tỷ lệ giữa các thao tác thành công trên tổng số thao tác hợp lệ. Các dạng SLI phổ biến nhất là tính sẵn sàng (số yêu cầu HTTP thành công chia cho tổng yêu cầu) và tốc độ đáp ứng (tỷ lệ yêu cầu hoàn tất dưới ngưỡng thời gian quy định).

## Định nghĩa chuyên ngành
Tỷ lệ định lượng chính thức thể hiện hiệu năng vận hành thực tế tại chỗ hoặc theo lịch sử đối chiếu với các tiêu chí chất lượng xác định trước.

## Ví dụ
Đo lường tỷ lệ yêu cầu thành công qua công thức `số yêu cầu tốt / tổng số yêu cầu = 99,94%` tính trên chu kỳ 7 ngày vừa qua.
