---
label: Latency
qualifier: (Mạng)
aliases:
  - Độ trễ mạng
  - Thời gian phản hồi
  - Độ trễ
loanwords:
  - latency
plain_descriptions:
  - khoảng thời gian chậm trễ từ lúc gửi yêu cầu qua mạng cho đến khi nhận được câu trả lời
  - thời gian người dùng phải chờ để trang web phản hồi sau khi bấm chuột
summary: Khoảng thời gian trễ cần thiết để dữ liệu truyền tải qua mạng từ điểm xuất phát tới đích đến và nhận phản hồi.
confusable_notes:
  throughput: >-
    Latency đo khoảng thời gian cần thiết để một yêu cầu hoàn tất, còn throughput đo tổng lượng dữ liệu hoặc số yêu cầu
    mà hệ thống xử lý được trong một đơn vị thời gian.
follow_up_questions:
  - Vì sao việc đo độ trễ theo các phân vị (như p95 hay p99) lại phản ánh chính xác hơn nhiều so với giá trị trung bình?
  - >-
    Khoảng cách địa lý và tốc độ ánh sáng trong sợi quang áp đặt giới hạn vật lý tối thiểu cho độ trễ internet như thế
    nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như việc gọi điện thoại quốc tế xuyên lục địa: khi bạn nói "A lô", phải mất một thoáng ngập ngừng tín hiệu truyền đi rồi mới nghe thấy giọng đầu dây bên kia trả lời.

## Chi tiết
Độ trễ (latency) bao gồm thời gian truyền tín hiệu qua cáp, độ trễ xử lý tại các bộ định tuyến mạng, thời gian xếp hàng trong bộ đệm và thời gian máy chủ xử lý dữ liệu. Kỹ sư thường theo dõi độ trễ theo các ngưỡng phân vị p50, p95 và p99 để phát hiện các trường hợp bị chậm cá biệt của người dùng.

## Định nghĩa chuyên ngành
Khoảng thời gian trôi qua giữa thời điểm phát một gói tin hoặc yêu cầu mạng và thời điểm nhận được xác nhận hoặc gói tin phản hồi tương ứng.

## Ví dụ
Một cơ sở dữ liệu có độ trễ phân vị p99 là 14 mili-giây, nghĩa là 99% các truy vấn được xử lý hoàn tất chỉ trong vòng chưa tới 14 mili-giây.
