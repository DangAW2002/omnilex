---
label: Service Level Objective (SLO)
aliases:
  - SLO
  - Mục tiêu mức dịch vụ
loanwords:
  - SLO
  - service level objective
plain_descriptions:
  - mục tiêu độ tin cậy nội bộ mà đội kỹ thuật tự đặt ra để giữ dịch vụ luôn chạy tốt
  - ngưỡng mục tiêu về tốc độ hoặc thời gian hoạt động ổn định làm hài lòng người dùng
summary: >-
  Mục tiêu định lượng cụ thể về độ tin cậy do đội ngũ kỹ thuật nội bộ đề ra để làm chuẩn mực đánh giá chất lượng dịch vụ
  trong một khung thời gian.
confusable_notes:
  sla: >-
    SLO là mục tiêu độ tin cậy nội bộ do đội kỹ thuật đặt ra để vận hành, còn SLA là cam kết hợp đồng kinh doanh với
    khách hàng đi kèm điều khoản bồi thường tài chính.
  sli: >-
    SLO là ngưỡng mục tiêu mong muốn đạt được (ví dụ 99,9% yêu cầu thành công), còn SLI là chỉ số định lượng đo lường
    hiệu năng thực tế theo thời gian.
follow_up_questions:
  - >-
    Ngân sách lỗi (error budget) bắt nguồn từ SLO giúp cân bằng giữa tốc độ ra tính năng mới và độ ổn định hệ thống ra
    sao?
  - Vì sao trong thực tế hầu như không bao giờ đặt mục tiêu SLO ở mức 100% sẵn sàng?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
autolink:
  aliases:
    SLO: always
---

## Giải thích dễ hiểu
Giống như hãng hàng không đặt mục tiêu 90% chuyến bay phải hạ cánh đúng giờ: mục tiêu này giúp phi hành đoàn có chuẩn mực phấn đấu mà không phải cam kết bồi thường tiền cho hành khách mỗi khi chậm chuyến do bão.

## Chi tiết
Mục tiêu mức dịch vụ (SLO) chuyển hóa yêu cầu trải nghiệm của người dùng thành các con số kỹ thuật trong một chu kỳ (như 30 ngày). Phần bù của SLO tạo nên ngân sách lỗi (error budget): nếu mục tiêu là 99,9% thì hệ thống được phép có 0,1% yêu cầu lỗi. Khi dùng hết ngân sách lỗi, đội phát triển phải tạm dừng đưa tính năng mới để tập trung vá lỗi hệ thống.

## Định nghĩa chuyên ngành
Mục tiêu độ tin cậy định lượng chính thức được ràng buộc bởi một ngưỡng phần trăm cụ thể, đo lường thông qua các chỉ số SLI trong khoảng thời gian xác định.

## Ví dụ
Dịch vụ đăng nhập đặt mục tiêu SLO là 99,9% số yêu cầu hợp lệ phải hoàn tất trong vòng dưới 200 mili-giây, tính trên chu kỳ 28 ngày liên tục.
