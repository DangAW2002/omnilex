---
label: Runbook
aliases:
  - Sổ tay vận hành
  - Quy trình xử lý sự cố
loanwords:
  - runbook
plain_descriptions:
  - tài liệu hướng dẫn từng bước giúp kỹ sư trực ban khắc phục nhanh khi nhận được cảnh báo lỗi
  - cẩm nang thao tác kỹ thuật ghi sẵn các bước kiểm tra và xử lý sự cố thường gặp trên máy chủ
summary: >-
  Tài liệu hướng dẫn quy trình từng bước được chuẩn hóa giúp kỹ sư vận hành xử lý sự cố khẩn cấp hoặc thực hiện bảo trì hệ thống an toàn.
confusable_notes: {}
follow_up_questions:
  - "Tại sao mỗi thông báo cảnh báo lỗi nên đính kèm đường dẫn trực tiếp tới một trang runbook cập nhật?"
  - "Đội ngũ vận hành có thể tự động hóa các bước thao tác trong runbook thành kịch bản xử lý tự động ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như bảng hướng dẫn thao tác khẩn cấp trong buồng lái máy bay: khi đèn báo động bật sáng, phi công mở đúng trang sách đó và làm theo từng bước để xử lý mà không cần phán đoán mò mẫm.

## Chi tiết
Runbook là tài liệu ghi lại chi tiết các bước kỹ thuật chuẩn mực để xử lý một sự cố cụ thể hoặc thực hiện bảo dưỡng hệ thống. Trong các đội ngũ SRE hiện đại, mỗi cảnh báo sự cố gửi tới điện thoại kỹ sư trực ban đều đính kèm một liên kết tới tài liệu runbook tương ứng. Hướng dẫn này liệt kê các dấu hiệu lỗi, câu lệnh cần gõ để kiểm tra nguyên nhân, cách xử lý nhanh để đưa dịch vụ trở lại bình thường và thông tin liên hệ của các chuyên gia hỗ trợ khi cần thiết. Tài liệu này giúp giảm áp lực cho kỹ sư và đảm bảo các sự cố được giải quyết thống nhất, an toàn.

## Định nghĩa chuyên ngành
Tài liệu hướng dẫn vận hành chuẩn hóa quy định các bước chẩn đoán, chuyển giao và xử lý kỹ thuật cho các tình huống sự cố hoặc nhiệm vụ bảo trì hệ thống.

## Ví dụ
Khi hệ thống gửi cảnh báo bộ nhớ đệm Redis quá tải, runbook hướng dẫn kỹ sư cách kiểm tra những khóa dữ liệu chiếm dung lượng lớn nhất và chạy lệnh xóa an toàn mà không làm sập máy chủ.
