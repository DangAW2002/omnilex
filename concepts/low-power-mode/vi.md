---
label: "Sleep mode"
qualifier: "(Embedded)"
aliases:
  - "Chế độ ngủ"
  - "Deep sleep"
  - "Chế độ tiết kiệm pin"
loanwords:
  - "sleep mode"
  - "deep sleep"
autolink:
  aliases:
    Deep sleep: always
plain_descriptions:
  - "trạng thái ngủ tiết kiệm điện giúp vi điều khiển chạy pin được nhiều năm liền"
  - "chế độ tạm ngừng của chip vi mạch ngắt bớt bộ phận không dùng để giảm tiêu thụ điện"
summary: "Trạng thái vận hành tiết kiệm năng lượng của vi điều khiển, trong đó các nhân xử lý, bộ dao động xung nhịp và mạch ngoại vi được tạm ngắt cho đến khi nhận được tín hiệu đánh thức."
confusable_notes: {}
follow_up_questions:
  - "Chế độ ngủ sâu (Deep Sleep) khác chế độ ngủ nhẹ (Light Sleep) thế nào về khả năng lưu giữ dữ liệu trong bộ nhớ RAM?"
  - "Những nguồn kích hoạt nào như bộ đếm giờ RTC hay chân ngắt ngoài có thể đánh thức vi điều khiển dậy làm việc?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một chú gấu ngủ đông trong hang: thay vì đi lại đốt năng lượng liên tục, chú gấu hạ nhịp thở và nhịp tim xuống mức cực thấp, chỉ thức giấc khi mùa xuân đến hoặc khi nghe thấy tiếng động lớn ở cửa hang.

## Chi tiết
Các thiết bị cảm biến IoT dùng pin không thể để chip chạy hết công suất 24/7 vì pin sẽ cạn kiệt chỉ sau vài ngày. Các vi điều khiển hiện đại giải quyết vấn đề này bằng nhiều cấp độ ngủ khác nhau, phổ biến nhất là chế độ ngủ nhẹ (Light Sleep) và ngủ sâu (Deep Sleep). Ở chế độ ngủ sâu, toàn bộ nhân CPU và mạch dao động tần số cao đều bị ngắt điện, kéo dòng tiêu thụ từ 50 mili-ampe xuống chỉ còn dưới 10 micro-ampe. Chỉ có một khối đồng hồ thời gian thực (RTC) cực nhỏ tiếp tục chạy để đếm giờ và đánh thức toàn bộ con chip hoạt động trở lại đúng hẹn.

## Định nghĩa chuyên ngành
Trạng thái làm việc suy giảm công suất được quản lý bằng phần cứng, trong đó mạng lưới phân phối xung nhịp và các khối mạch xử lý chính tạm thời bị khóa nhằm giảm thiểu dòng rò tĩnh cho đến khi nhận được tín hiệu ngắt kích hoạt phục hồi.

## Ví dụ
Một cảm biến đo độ ẩm đất trong nông nghiệp kích hoạt chế độ Deep Sleep trong 59 phút mỗi giờ chỉ tiêu thụ 5 micro-ampe, sau đó thức dậy 10 giây để đo đạc và phát sóng vô tuyến báo cáo kết quả.
