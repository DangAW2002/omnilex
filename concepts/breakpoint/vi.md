---
label: "Breakpoint"
qualifier: "(Gỡ lỗi)"
aliases:
  - "Điểm dừng"
loanwords:
  - "breakpoint"
plain_descriptions:
  - "điểm đánh dấu cố ý trong mã nguồn tạm dừng chương trình để lập trình viên kiểm tra dữ liệu"
  - "vị trí chỉ định trên một dòng mã nơi công cụ gỡ lỗi sẽ chặn luồng thực thi lại"
summary: "Vị trí dừng có chủ đích được thiết lập trong mã nguồn hoặc địa chỉ lệnh nơi công cụ gỡ lỗi tạm hoãn thực thi để kiểm tra trạng thái bộ nhớ."
confusable_notes:
  debugging: "Điểm dừng (breakpoint) là một vị trí tạm dừng cụ thể được kích hoạt trên dòng lệnh, trong khi gỡ lỗi (debugging) là toàn bộ quá trình tìm kiếm và xử lý sự cố."
follow_up_questions:
  - "Điểm dừng phần cứng được hỗ trợ bởi thanh ghi vi xử lý khác gì so với điểm dừng phần mềm bằng ngắt lệnh?"
  - "Khi nào nên sử dụng điểm dừng có điều kiện (conditional breakpoint) để tối ưu thời gian kiểm tra các vòng lặp lớn?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một đạo diễn hô "Đứng hình!" trên phim trường. Mọi diễn viên lập tức giữ nguyên tư thế và động tác, giúp đội quay phim và ánh sáng đo đạc lại góc máy và trang phục trước khi cho cảnh quay tiếp tục diễn ra.

## Chi tiết
Điểm dừng yêu cầu môi trường thực thi hoặc vi xử lý dừng chương trình ngay trước khi câu lệnh được chỉ định bắt đầu chạy. Các công cụ gỡ lỗi hiện đại triển khai điểm dừng phần mềm bằng cách tạm thời ghi đè mã ngắt (như lệnh `INT 3` trên chip x86) vào địa chỉ lệnh đích. Khi chạm tới điểm này, hệ thống chụp lại toàn bộ thanh ghi vi xử lý, khung ngăn xếp và giá trị các biến cục bộ, cho phép kỹ sư kiểm tra dữ liệu, chạy từng bước (`step over`, `step into`) hoặc cài đặt điều kiện tạm dừng (như chỉ dừng khi `userId === 104`).

## Định nghĩa chuyên ngành
Một bẫy lệnh có thể cấu hình được chèn vào mã thực thi hoặc thanh ghi gỡ lỗi của CPU, làm cho bộ máy thực thi tạm đình chỉ luồng lệnh và chuyển quyền điều khiển cho trình giám sát chẩn đoán.

## Ví dụ
Lập trình viên đặt điểm dừng tại dòng 54 tệp `orderProcessor.js`; khi bấm thanh toán thử, chương trình đứng lại ở dòng đó, giúp phát hiện biến `shippingAddress` đang nhận giá trị null.
