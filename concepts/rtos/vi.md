---
label: Hệ điều hành thời gian thực
aliases:
  - "RTOS"
loanwords:
  - "rtos"
autolink:
  aliases:
    RTOS: always
plain_descriptions:
  - hệ điều hành đảm bảo xử lý tác vụ trong khung thời gian chính xác tới từng phần nghìn giây
  - phần mềm nền tảng lập lịch định thời chuẩn xác cho các hệ thống nhúng quan trọng
summary: Hệ điều hành được thiết kế chuyên biệt để xử lý các tác vụ với cam kết tính tiền định về mặt thời gian và độ trễ tối thiểu.
confusable_notes: {}
follow_up_questions:
  - Ranh giới phân biệt giữa hệ thống thời gian thực ngặt nghèo và thời gian thực mềm là gì?
  - Thuật toán lập lịch chiếm quyền ưu tiên trong FreeRTOS và Zephyr hoạt động theo nguyên lý nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/H%E1%BB%87_%C4%91i%E1%BB%81u_h%C3%A0nh_th%E1%BB%9Di_gian_th%E1%BB%B1c
    accessed: '2026-10-16'
---

## Giải thích dễ hiểu
Khác với điện thoại hay máy tính đôi khi có thể bị đơ vài giây khi mở ứng dụng nặng, hệ điều hành thời gian thực cam kết các tác vụ tối quan trọng phải được hoàn thành đúng hạn tuyệt đối tới từng mili giây, không bao giờ trễ hẹn.

## Chi tiết
RTOS nổi bật với bộ lập lịch có tính tiền định cao, độ trễ xử lý ngắt phần cứng cực ngắn và cơ chế đồng bộ luồng bằng hàng đợi và cờ hiệu. Hệ thống thời gian thực ngặt nghèo (hard real-time) xem việc trễ hạn như một sự cố thảm khốc (ví dụ như phanh ABS hay kích nổ túi khí ô tô), trong khi hệ thống thời gian thực mềm (soft real-time) chấp nhận suy giảm chất lượng nếu trễ một vài khung thời gian xử lý.

## Định nghĩa chuyên ngành
Hệ điều hành bảo đảm hoàn tất các tác vụ và đáp ứng các ngắt phần cứng trong các giới hạn thời gian xác định và bất biến được định trước.

## Ví dụ
Hệ điều hành FreeRTOS điều phối đồng thời tác vụ bơm thuốc định lượng chính xác, đo lưu lượng và truyền tin cảnh báo trên thiết bị tiêm truyền y tế tự động.
