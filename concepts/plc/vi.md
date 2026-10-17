---
label: Programmable Logic Controller (PLC)
aliases:
  - "PLC"
  - "Bộ điều khiển logic khả trình"
loanwords:
  - "programmable logic controller"
  - "plc"
autolink:
  aliases:
    PLC: always
plain_descriptions:
  - máy tính công nghiệp chuyên dụng điều khiển dây chuyền máy móc tự động trong nhà máy
  - bộ điều khiển phần cứng kháng bụi rung chịu nhiệt thi hành các lệnh đóng ngắt tự động
summary: Máy tính kỹ thuật số công nghiệp chuyên dụng được thiết kế bền bỉ để thực thi các lệnh điều khiển logic tiền định thời gian thực cho dây chuyền sản xuất.
confusable_notes: {}
follow_up_questions:
  - Ngôn ngữ hình thang Ladder Logic và ngôn ngữ văn bản Structured Text theo chuẩn IEC 61131-3 khác nhau ra sao?
  - Những thiết kế phần cứng đặc thù nào giúp PLC chịu được sốc điện, bụi bẩn và nhiệt độ cao trong nhà xưởng?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
PLC là một chiếc máy tính công nghiệp nồi đồng cối đá được bọc trong vỏ bảo vệ kiên cố: nếu mang máy tính văn phòng vào nhà máy bụi bặm và rung lắc thì máy sẽ hỏng ngay, còn PLC có thể chạy liên tục hàng chục năm không ngừng nghỉ để điều khiển dây chuyền đóng chai hay cánh tay robot.

## Chi tiết
Nguyên lý hoạt động của PLC dựa trên chu kỳ quét tuần hoàn khép kín: đọc tín hiệu đầu vào từ cảm biến, thi hành chương trình điều khiển logic được nạp sẵn, và xuất lệnh ra các cơ cấu chấp hành với chu kỳ cực ngắn (từ 1 đến 10 mili giây). Chuẩn quốc tế IEC 61131-3 quy định các ngôn ngữ lập trình cho PLC gồm sơ đồ bậc thang (Ladder Diagram), khối chức năng (FBD) và văn bản có cấu trúc (Structured Text). Các dòng PLC hiện đại ngày nay đều hỗ trợ kết nối mạng công nghiệp như Profinet, Modbus TCP và giao thức OPC UA.

## Định nghĩa chuyên ngành
Hệ thống máy tính điều khiển công nghiệp thể rắn sử dụng bộ nhớ khả trình để lưu trữ các chỉ thị logic, tuần tự, định thời và đếm nhằm điều khiển các máy móc tự động hóa.

## Ví dụ
Bộ điều khiển PLC Mitsubishi điều hành quy trình tự động phân loại, đóng nắp chai và dán nhãn bao bì tại nhà máy sản xuất nước giải khát ở Bình Dương.
