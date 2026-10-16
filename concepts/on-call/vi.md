---
label: On-call
aliases:
  - Trực sự cố
  - Ca trực hệ thống
  - Trực vận hành
loanwords:
  - on-call
plain_descriptions:
  - nhiệm vụ túc trực ngoài giờ để xử lý ngay lập tức khi hệ thống máy chủ gặp sự cố
  - ca trực của kỹ sư chịu trách nhiệm nhận chuông cảnh báo và khắc phục lỗi khẩn cấp
summary: >-
  Chế độ phân công ca trực luân phiên trong đó kỹ sư được chỉ định luôn sẵn sàng tiếp nhận cảnh báo và xử lý sự cố môi
  trường thực tế.
confusable_notes: {}
follow_up_questions:
  - Làm thế nào để xây dựng lịch trực on-call bền vững và khống chế số lượng chuông báo tránh kiệt sức cho kỹ sư?
  - Quy trình chuyển tiếp cảnh báo (escalation) hoạt động ra sao nếu kỹ sư trực chính không phản hồi kịp?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như bác sĩ trực cấp cứu hoặc lính cứu hỏa trong ca trực đêm: có thể đang nghỉ ngơi, nhưng hễ còi báo động vang lên là lập tức vào vị trí làm nhiệm vụ.

## Chi tiết
Các tổ chức công nghệ thiết lập lịch trực on-call luân phiên để bảo đảm hệ thống vận hành liên tục 24/7. Các công cụ cảnh báo tự động gọi điện hoặc gửi tin nhắn khẩn cấp tới kỹ sư trực ca. Theo chuẩn SRE, mỗi cảnh báo phải có hướng dẫn xử lý cụ thể (runbook), có chế độ nghỉ bù thỏa đáng và có kỹ sư trực dự phòng hỗ trợ.

## Định nghĩa chuyên ngành
Quy trình vận hành thường trực theo lịch phân công chịu trách nhiệm phân loại ban đầu, leo thang xử lý và khắc phục kỹ thuật các cảnh báo tự động của hệ thống.

## Ví dụ
Một kỹ sư SRE nhận cuộc gọi cảnh báo tự động lúc 2 giờ sáng do độ trễ đồng bộ cơ sở dữ liệu vượt quá 60 giây, nhanh chóng giải phóng tiến trình bị nghẽn trong 10 phút.
