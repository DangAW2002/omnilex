---
label: Recovery Time Objective (RTO)
aliases:
  - RTO
  - Thời gian phục hồi mục tiêu
loanwords:
  - recovery time objective (rto)
  - rto
autolink:
  aliases:
    RTO: always
plain_descriptions:
  - khoảng thời gian tối đa doanh nghiệp chấp nhận để hệ thống sập trước khi bật lại được
  - hạn mức thời gian phải đưa dịch vụ trở lại trạng thái phục vụ khách hàng sau thảm họa
summary: Khoảng thời gian gián đoạn tối đa mà một hệ thống hoặc quy trình nghiệp vụ được phép ngừng hoạt động sau sự cố trước khi gây ra thiệt hại không thể chấp nhận cho doanh nghiệp.
confusable_notes:
  rpo: RTO đo lường độ dài thời gian ngừng hoạt động cho phép trước khi hệ thống phục hồi lại, trong khi RPO đo lường lượng dữ liệu giao dịch tối đa được phép bị mất tính theo mốc thời gian trước sự cố.
follow_up_questions:
  - Mục tiêu đạt RTO gần bằng không đòi hỏi kiến trúc hệ thống đa vùng đồng vận hành (active-active) ra sao?
  - Các bước phân tích tác động kinh doanh (BIA) xác định cấp độ RTO cho từng nhóm dịch vụ như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như đồng hồ đếm ngược của tủ đông nhà hàng: khi mất điện, bếp trưởng chỉ có tối đa 2 tiếng để bật máy phát điện lại trước khi toàn bộ thực phẩm đông lạnh bị hỏng phải đổ bỏ.

## Chi tiết
Thời gian phục hồi mục tiêu (RTO) là độ dài thời gian tối đa tính từ thời điểm sự cố xảy ra cho đến khi hệ thống được dựng lại hoàn tất để tiếp tục phục vụ người dùng. Chỉ số RTO được xác định qua bước phân tích tác động nghiệp vụ để định hình kiến trúc hạ tầng: nếu RTO là 24 giờ thì chỉ cần phục hồi bản sao lưu hàng ngày, nhưng nếu RTO dưới 60 giây thì bắt buộc phải có máy chủ dự phòng nóng trực sẵn. Vượt quá RTO sẽ khiến tổ chức đối mặt với các khoản phạt hợp đồng và tổn hại uy tín.

## Định nghĩa chuyên ngành
Chỉ số đo lường hiệu năng vận hành xác định khoảng thời gian cho phép trôi qua giữa lúc dịch vụ ngừng hoạt động và thời điểm khôi phục thành công tính khả dụng.

## Ví dụ
Một nền tảng thanh toán đặt mục tiêu RTO nghiêm ngặt là 15 phút, yêu cầu hệ thống tự động phát hiện sự cố và chuyển giao luồng quét thẻ sang cụm máy chủ dự phòng trong vòng một phần tư giờ.
