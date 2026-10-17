---
label: "LoRa"
qualifier: "(IoT)"
aliases:
  - "Công nghệ sóng LoRa"
  - "Long Range"
loanwords:
  - "lora"
plain_descriptions:
  - "công nghệ sóng vô tuyến truyền dữ liệu xa hàng chục cây số chỉ tốn rất ít pin"
  - "kỹ thuật phát sóng trải phổ giúp cảm biến phát tín hiệu xuyên qua thành phố về trạm thu"
summary: "Kỹ thuật điều chế sóng vô tuyến tầng vật lý dựa trên công nghệ trải phổ tiếng chim hót (Chirp Spread Spectrum), cho phép truyền dữ liệu khoảng cách xa với công suất tiêu thụ điện cực nhỏ."
confusable_notes:
  lora: "LoRa (IoT) là công nghệ điều chế sóng vô tuyến vật lý cự ly xa công suất thấp, trong khi LoRA (AI) là kỹ thuật Low-Rank Adaptation dùng để tinh chỉnh mô hình học máy hiệu quả."
  lorawan: "LoRa là tầng điều chế sóng vô tuyến vật lý (tầng 1) dựa trên kỹ thuật quét tần số chirp, còn LoRaWAN là tầng giao thức mạng và điều khiển truy cập môi trường (tầng MAC) chạy trên nền sóng LoRa."
follow_up_questions:
  - "Kỹ thuật trải phổ Chirp (CSS) giúp bộ thu LoRa giải mã tín hiệu nằm chìm dưới mức nhiễu nền như thế nào?"
  - "Sự đánh đổi giữa hệ số trải phổ Spreading Factor (từ SF7 đến SF12) với tốc độ truyền và thời lượng pin là gì?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một người huýt một tiếng sáo có cao độ lướt vút dần lên: dù đứng giữa thung lũng lộng gió ồn ào cách xa nhiều cây số, tai người nghe vẫn dễ dàng nhận ra tiếng sáo đặc biệt ấy nổi bật trên nền tạp âm.

## Chi tiết
Được bảo hộ bản quyền bởi Semtech, LoRa (viết tắt của Long Range) là công nghệ điều chế sóng vô tuyến ở tầng vật lý (tầng 1). Công nghệ này sử dụng phương pháp trải phổ Chirp Spread Spectrum (CSS), mã hóa dữ liệu thành các xung sóng có tần số quét tăng dần hoặc giảm dần theo thời gian. Kỹ thuật này giúp tín hiệu chống chịu cực tốt trước hiện tượng phản xạ sóng và nhiễu sóng vô tuyến trong đô thị, cho phép máy thu nhận diện gói tin ngay cả khi cường độ tín hiệu yếu hơn 20 dB so với mức nhiễu nền nhiệt. Tín hiệu LoRa có thể truyền xa từ 5 đến 15 km ở vùng nông thôn mà chỉ tiêu tốn vài chục mili-ampe khi phát sóng.

## Định nghĩa chuyên ngành
Kỹ thuật điều chế vô tuyến tầng vật lý dựa trên phương pháp trải phổ biến đổi tần số tuyến tính (Chirp Spread Spectrum), mang lại độ lợi xử lý cao và khả năng giải mã dưới mức ngưỡng nhiễu cho mạng diện rộng công suất thấp.

## Ví dụ
Một cảm biến đo độ ẩm đất cắm giữa nông trường cà phê sử dụng sóng LoRa ở dải tần 923 MHz để truyền bản tin dữ liệu 20 byte về trạm thu phát cách đó 8 km mà không cần mạng di động 4G.
