---
label: High availability (HA)
aliases:
  - HA
  - Tính sẵn sàng cao
loanwords:
  - high availability (ha)
  - ha
autolink:
  aliases:
    HA: always
plain_descriptions:
  - khả năng hệ thống duy trì hoạt động liên tục gần như không có thời gian chết
  - thiết kế máy chủ có phương án dự phòng để luôn sẵn sàng phục vụ người dùng
summary: Đặc tính thiết kế hệ thống đảm bảo ứng dụng vận hành liên tục và ổn định trong thời gian dài bằng cách giảm thiểu tối đa thời gian gián đoạn thông qua các thành phần dự phòng.
confusable_notes:
  disaster-recovery: Tính sẵn sàng cao (HA) tập trung triệt tiêu điểm lỗi đơn lẻ để ứng phó sự cố cục bộ tức thời trong hạ tầng, còn khắc phục thảm họa (DR) tập trung vào quy trình cứu vãn và phục hồi hệ thống khi cả một trung tâm dữ liệu hoặc vùng bị tàn phá.
follow_up_questions:
  - Mục tiêu độ sẵn sàng đạt "bốn số chín" (99,99%) tương đương với thời gian ngừng hoạt động tối đa bao lâu trong một năm?
  - Mô hình triển khai song song hai nhánh (active-active) khác biệt gì so với nhánh chờ dự phòng (active-passive)?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như máy bay hai động cơ phản lực: nếu chẳng may một động cơ gặp sự cố giữa trời, động cơ còn lại vẫn gánh toàn bộ trọng trách đưa máy bay hạ cánh an toàn.

## Chi tiết
Tính sẵn sàng cao (HA) đo lường tỷ lệ phần trăm thời gian hệ thống duy trì trạng thái phục vụ ổn định và tiếp nhận người dùng bình thường. Để đạt được HA, kỹ sư phải loại bỏ mọi điểm lỗi đơn lẻ trong kiến trúc, phân tán các bản sao ứng dụng qua nhiều vùng khả dụng độc lập, cài đặt bộ theo dõi sức khỏe và tự động chuyển giao tải khi có nút hỏng. Độ sẵn sàng thường được tính theo số chín: mức 99,9% cho phép ngừng hoạt động tối đa 8,76 giờ mỗi năm, trong khi mức 99,99% chỉ cho phép tối đa 52,6 phút.

## Định nghĩa chuyên ngành
Thuộc tính kiến trúc đảm bảo hệ thống vận hành liên tục thông qua sơ đồ dự phòng phần cứng, phân vùng cách ly lỗi và cơ chế tự động chuyển đổi dự phòng nhanh chóng.

## Ví dụ
Cổng thanh toán ngân hàng số đặt máy chủ trải đều trên 3 vùng trung tâm dữ liệu độc lập với cơ chế đồng bộ dữ liệu song hành, đạt độ sẵn sàng 99,99% suốt cả năm.
