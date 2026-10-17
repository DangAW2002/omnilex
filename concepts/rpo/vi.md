---
label: Recovery Point Objective (RPO)
aliases:
  - RPO
  - Điểm phục hồi mục tiêu
loanwords:
  - recovery point objective (rpo)
  - rpo
autolink:
  aliases:
    RPO: always
plain_descriptions:
  - lượng dữ liệu tối đa tính theo thời gian mà doanh nghiệp chấp nhận bị mất khi có sự cố
  - khoảng lùi thời gian của bản sao lưu gần nhất cần khôi phục khi cơ sở dữ liệu hỏng
summary: Khoảng thời gian tối đa mà dữ liệu giao dịch có thể bị mất mát tính từ thời điểm xảy ra sự cố lùi về trước mà doanh nghiệp vẫn có thể chấp nhận được.
confusable_notes:
  rto: RPO đo lường lượng dữ liệu tối đa chấp nhận bị mất tính theo thời gian sao lưu, còn RTO đo lường thời gian cần thiết để dựng lại hệ thống và bắt đầu phục vụ người dùng.
follow_up_questions:
  - Cơ chế sao chép cơ sở dữ liệu đồng bộ (synchronous replication) đạt mục tiêu RPO bằng không như thế nào so với việc sao lưu ảnh định kỳ?
  - Giới hạn độ trễ mạng gây cản trở việc sao chép dữ liệu RPO bằng không giữa các vùng địa lý cách xa nhau ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như tính năng tự động lưu bài khi bạn đang viết tiểu thuyết: nếu máy tính hết pin sập nguồn, một mốc RPO là 10 phút nghĩa là bạn chỉ bị mất tối đa những câu chữ đã gõ trong 10 phút vừa qua.

## Chi tiết
Điểm phục hồi mục tiêu (RPO) đo lường lượng dữ liệu tối đa tính theo thời gian mà hệ thống có thể bị mất mát giữa thời điểm xảy ra sự cố và bản sao lưu dữ liệu hợp lệ gần nhất. Nếu cơ sở dữ liệu chỉ sao lưu định kỳ mỗi 4 tiếng một lần, chỉ số RPO sẽ là 4 tiếng, đồng nghĩa mọi đơn hàng phát sinh trong khoảng thời gian đó sẽ bị mất sạch nếu đĩa cứng hỏng. Để đạt RPO bằng không hoặc vài giây, hệ thống bắt buộc phải dùng kỹ thuật ghi nhật ký giao dịch liên tục và sao chép đồng bộ qua mạng.

## Định nghĩa chuyên ngành
Thông số kỹ thuật phục hồi thảm họa quy định độ tuổi tối đa cho phép của trạng thái dữ liệu có thể khôi phục từ bộ nhớ thứ cấp sau một thảm họa hệ thống.

## Ví dụ
Một công ty môi giới chứng khoán đặt mục tiêu RPO là 5 giây, sử dụng cơ chế sao chép nhật ký liên tục để khi máy chủ chính gặp sự cố, tối đa chỉ có 5 giây dữ liệu lệnh khớp mới nhất có nguy cơ phải xử lý lại.
