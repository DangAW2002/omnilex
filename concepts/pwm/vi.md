---
label: "Pulse-width modulation (PWM)"
aliases:
  - "PWM"
  - "Điều chế độ rộng xung"
loanwords:
  - "pwm"
autolink:
  aliases:
    PWM: always
plain_descriptions:
  - "bật tắt dòng điện siêu nhanh để chỉnh độ sáng đèn hoặc tốc độ quay của quạt"
  - "kỹ thuật băm xung điện tử giúp điều khiển công suất động cơ mượt mà mà không sinh nhiệt"
summary: "Phương pháp điều chế công suất điện cung cấp cho tải bằng cách thay đổi tỷ lệ thời gian đóng và ngắt (chu kỳ nhiệm vụ) của chuỗi xung vuông ở tần số cao."
confusable_notes:
  adc: "PWM tạo ra công suất tương đương tương tự bằng cách thay đổi độ rộng xung số bật tắt, trong khi ADC đo điện áp tương tự có sẵn để chuyển thành giá trị số nhị phân."
follow_up_questions:
  - "Tần số băm xung PWM cần đạt tối thiểu bao nhiêu để loại bỏ hiện tượng nhấp nháy đèn và tiếng rít khó chịu ở cuộn dây động cơ?"
  - "Mạch cầu H phối hợp tín hiệu PWM và các chân đảo chiều logic để điều khiển động cơ quay xuôi quay ngược ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/%C4%90i%E1%BB%81u_ch%E1%BA%BF_%C4%91%E1%BB%99_r%E1%BB%99ng_xung
    accessed: '2026-10-17'
    note: "Thuật ngữ tiêu chuẩn trong kỹ thuật điện tử và điều khiển"
---

## Giải thích dễ hiểu
Hãy tưởng tượng bạn bật tắt công tắc bóng đèn hàng trăm lần mỗi giây: do mắt người có hiện tượng lưu ảnh, bạn sẽ thấy bóng đèn mờ đi chứ không hề thấy đèn bị chớp tắt.

## Chi tiết
Các vi điều khiển chỉ có thể xuất ra hai mức điện áp cố định là bật (5V hoặc 3.3V) và tắt (0V), không thể xuất ra mức điện áp lửng lơ như 1.5V. Kỹ thuật điều chế độ rộng xung (PWM) khắc phục điều này bằng cách bật tắt chân tín hiệu cực nhanh theo chu kỳ cố định. Bằng việc thay đổi chu kỳ làm việc (duty cycle)—tức tỷ lệ phần trăm thời gian bật mức cao so với tổng thời gian một chu kỳ—mức công suất trung bình truyền tới thiết bị sẽ thay đổi tương ứng. Chẳng hạn chu kỳ 25% cho công suất trung bình bằng một phần tư, trong khi 75% cho ba phần tư công suất, vừa tiết kiệm điện vừa hầu như không tỏa nhiệt lãng phí.

## Định nghĩa chuyên ngành
Phương pháp điều chế tín hiệu bằng cách biến đổi độ rộng của các xung trong một chuỗi xung vuông có tần số không đổi, nhằm điều chỉnh điện áp và công suất trung bình đặt lên phụ tải.

## Ví dụ
Bộ điều khiển máy in 3D phát tín hiệu PWM tần số 20 kHz với chu kỳ làm việc 40% tới quạt tản nhiệt đầu phun để quạt quay êm ái ở mức tốc độ vừa phải.
