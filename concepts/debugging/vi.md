---
label: "Debugging"
aliases:
  - "Gỡ lỗi"
loanwords:
  - "debugging"
plain_descriptions:
  - "quá trình chẩn đoán, tái hiện và sửa chữa các lỗi phát sinh trong phần mềm"
  - "quy trình kỹ thuật điều tra nguyên nhân gây sai lệch dữ liệu bằng nhật ký và công cụ theo dõi"
summary: "Quy trình kỹ thuật bài bản nhằm phát hiện, cô lập và khắc phục các lỗi logic hoặc sự cố bất thường trong phần mềm."
confusable_notes:
  breakpoint: "Gỡ lỗi (debugging) là toàn bộ quy trình điều tra và khắc phục lỗi, trong khi điểm dừng (breakpoint) là công cụ đánh dấu vị trí tạm dừng lệnh được đặt trong phiên gỡ lỗi."
follow_up_questions:
  - "Sự khác nhau giữa việc dùng công cụ gỡ lỗi tương tác từng bước và việc phân tích nhật ký telemetry trên hệ thống lớn là gì?"
  - "Những chiến lược nào giúp cô lập nguyên nhân gốc rễ giữa lỗi suy thoái mã nguồn và lỗi rò rỉ vùng nhớ?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một người thợ sửa xe ô tô chẩn đoán tiếng động lạ phát ra từ động cơ khi xe tăng tốc. Thợ cắm thiết bị đo tín hiệu vào xe, lắng nghe tiếng pít-tông, đo điện áp bugi và thay thế cuộn dây đánh lửa bị mòn cho đến khi xe chạy êm trở lại.

## Chi tiết
Gỡ lỗi bắt đầu khi hành vi thực tế của phần mềm sai lệch so với yêu cầu thiết kế. Quy trình này bao gồm việc tạo bài kiểm tra tái hiện lỗi, theo dõi trạng thái hoạt động của bộ nhớ qua các công cụ gỡ lỗi (debugger), đọc nhật ký ghi lỗi và cô lập nguyên nhân cốt lõi. Kỹ sư sử dụng các thao tác chạy từng dòng lệnh, đặt điểm theo dõi giá trị biến và kiểm tra cây gọi hàm. Khi đã làm rõ nguyên nhân, lập trình viên tiến hành sửa mã nguồn và chạy các bài kiểm thử hồi quy để đảm bảo lỗi đã được triệt tiêu hoàn toàn.

## Định nghĩa chuyên ngành
Quy trình kỹ thuật nhiều giai đoạn bao gồm việc quan sát, chẩn đoán và khắc phục có hệ thống các khiếm khuyết tiềm ẩn, lỗi suy luận logic hoặc điểm nghẽn tài nguyên trong hệ thống phần mềm.

## Ví dụ
Một kỹ sư truy tìm lỗi tính sai tiền giỏ hàng: dùng công cụ gỡ lỗi chạy qua hàm `applyDiscount()`, kỹ sư phát hiện điều kiện biên sai đã khiến phiếu giảm giá 20% bị trừ hai lần cho đơn hàng trên 100 đô la.
