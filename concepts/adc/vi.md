---
label: "Analog-to-digital converter (ADC)"
aliases:
  - "ADC"
  - "Bộ chuyển đổi tương tự sang số"
loanwords:
  - "adc"
autolink:
  aliases:
    ADC: always
plain_descriptions:
  - "mạch điện tử biến đổi điện áp thực tế liên tục thành các con số số hóa"
  - "bộ phận đọc cảm biến chuyển tín hiệu điện áp mượt mà thành số để vi tính tính toán"
summary: "Mạch điện tử thực hiện lấy mẫu tín hiệu điện áp tương tự liên tục theo thời gian và lượng tử hóa thành chuỗi các giá trị số nhị phân để máy tính xử lý."
confusable_notes:
  pwm: "ADC đo điện áp tương tự từ bên ngoài để tạo ra các con số số hóa, trong khi PWM phát các xung bật tắt số siêu nhanh để giả lập mức điện áp tương tự điều khiển thiết bị."
follow_up_questions:
  - "Độ phân giải số bit của bộ ADC quyết định mức chênh lệch điện áp nhỏ nhất đo được như thế nào?"
  - "Điểm khác biệt về tốc độ lấy mẫu và độ chính xác giữa bộ ADC kiểu SAR và kiểu Delta-Sigma là gì?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một cây thước kẻ đo mực nước trong cốc: mực nước dâng lên hay hạ xuống hoàn toàn liên tục và mượt mà, nhưng cây thước sẽ làm tròn chiều cao đó thành từng vạch mi-li-mét cụ thể để bạn ghi chép vào sổ tay.

## Chi tiết
Thế giới tự nhiên xung quanh chúng ta là thế giới tương tự: nhiệt độ, âm thanh và ánh sáng luôn biến thiên liên tục và được các cảm biến biến đổi thành điện áp mượt mà. Tuy nhiên, bộ vi xử lý máy tính chỉ hiểu các con số nhị phân 0 và 1. Bộ chuyển đổi tương tự sang số (ADC) làm nhiệm vụ cầu nối bằng cách đo mức điện áp tại các thời điểm định kỳ và lượng tử hóa nó thành con số tương ứng. Ví dụ, một bộ ADC 10-bit chia dải điện áp từ 0 đến 3.3V thành 1024 nấc số (từ 0 đến 1023), giúp vi xử lý biết chính xác độ mạnh yếu của tín hiệu cảm biến.

## Định nghĩa chuyên ngành
Thiết bị điện tử hoặc khối chức năng mạch tích hợp thực hiện lấy mẫu tín hiệu tương tự liên tục theo thời gian và chuyển đổi biên độ điện áp thành từ mã số nhị phân có độ dài bit xác định.

## Ví dụ
Một trạm quan trắc nước ngầm sử dụng bộ ADC 16-bit để đo sự thay đổi từng mili-vôn điện áp từ cảm biến áp suất đáy giếng, từ đó tính toán chính xác độ sâu mực nước ngầm theo từng giờ.
