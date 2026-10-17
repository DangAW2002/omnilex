---
label: Disaster recovery (DR)
aliases:
  - DR
  - Khắc phục thảm họa
loanwords:
  - disaster recovery (dr)
  - dr
autolink:
  aliases:
    DR: always
plain_descriptions:
  - kế hoạch và quy trình khôi phục hệ thống khi xảy ra sự cố nghiêm trọng phá hủy hạ tầng
  - các bước cứu vãn dữ liệu và máy chủ sau thảm họa thiên tai hoặc mất điện toàn vùng
summary: Tập hợp các chính sách, công cụ và quy trình kỹ thuật nhằm khôi phục và duy trì các hạ tầng công nghệ thiết yếu sau một thảm họa diện rộng gây gián đoạn hoàn toàn.
confusable_notes:
  high-availability: Khắc phục thảm họa (DR) tập trung vào quy trình cứu vãn và đưa hệ thống hoạt động trở lại sau các biến cố phá hủy toàn diện vùng dữ liệu, trong khi tính sẵn sàng cao (HA) duy trì dịch vụ liên tục trước các hỏng hóc linh kiện thường nhật.
follow_up_questions:
  - Các chiến lược phục hồi sau thảm họa đa vùng cân đối chi phí và tốc độ khôi phục giữa các mô hình sao lưu, đèn dẫn lối (pilot light) và đồng vận hành (active-active) ra sao?
  - Vì sao việc diễn tập định kỳ tình huống thảm họa là bắt buộc dù đã cài đặt sẵn cơ chế sao chép tự động?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như bạn có một ngôi nhà thứ hai đầy đủ đồ đạc và giấy tờ ở một thành phố khác, sẵn sàng dọn đến ở ngay nếu chẳng may một trận lũ lụt lớn làm ngập hoàn toàn ngôi nhà chính.

## Chi tiết
Trong khi tính sẵn sàng cao bảo vệ hệ thống trước sự cố hỏng ổ cứng hay máy chủ cục bộ trong một tòa nhà, thì Khắc phục thảm họa (DR) chuẩn bị cho những thảm họa diện rộng như động đất, mất điện toàn vùng hay tấn công phá hoại mã độc tống tiền. Kế hoạch DR quy định chi tiết phân công nhân sự, lịch trình sao chép dữ liệu và phương án phục hồi. Các doanh nghiệp có thể chọn giải pháp từ sao lưu định kỳ giá rẻ đến duy trì cụm máy chủ chờ (pilot light) hoặc cụm đa vùng cùng chạy, tùy theo ngân sách và mức độ thiệt hại cho phép.

## Định nghĩa chuyên ngành
Quy trình vận hành bao gồm kiến trúc nhân bản dữ liệu phân tán và các kịch bản hành động được diễn tập nhằm tái thiết lập dịch vụ sau những thảm họa gây tê liệt diện rộng.

## Ví dụ
Một tổ chức tài chính duy trì cụm máy chủ dự phòng chờ tại trung tâm dữ liệu cách xa 800 km, có khả năng kích hoạt toàn bộ hệ thống phục vụ người dùng trong vòng 30 phút khi vùng chính bị ngập lụt.
