---
label: Postmortem
qualifier: (CNTT)
aliases:
  - Báo cáo phân tích sự cố
  - Kiểm điểm sau sự cố
  - Báo cáo hậu kỳ sự cố
loanwords:
  - postmortem
plain_descriptions:
  - bản báo cáo được viết sau sự cố lớn để tìm hiểu nguyên nhân và tìm cách không bao giờ bị lại
  - tài liệu phân tích không quy trách nhiệm cá nhân nhằm ghi nhận bài học sau sự cố máy chủ
summary: >-
  Bản phân tích tài liệu hóa không quy trách nhiệm cá nhân sau sự cố môi trường thực tế nhằm xác định nguyên nhân cốt
  lõi và đưa ra các biện pháp phòng ngừa.
confusable_notes: {}
follow_up_questions:
  - Vì sao văn hóa không đổ lỗi (blameless) lại mang tính sống còn để tạo ra các bản postmortem trung thực?
  - Làm thế nào để bảo đảm các hành động khắc phục (action items) ghi trong postmortem thực sự được thực hiện?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như cuộc điều tra tai nạn hàng không của cơ quan điều tra: người ta mở hộp đen không phải để trừng phạt phi công mà để cải tiến cần gạt điều khiển giúp không ai mắc lại lỗi đó.

## Chi tiết
Bản postmortem ghi lại mốc thời gian diễn tiến sự cố, mức độ ảnh hưởng tới người dùng (số phút gián đoạn, lượng đơn hàng lỗi), nguyên nhân gốc rễ và việc ứng phó có điểm gì tốt hoặc cần cải thiện. Văn hóa không quy trách nhiệm cá nhân là trọng tâm: sự cố xảy ra là do lỗ hổng công cụ và quy trình chứ không đổ lỗi cho cá nhân.

## Định nghĩa chuyên ngành
Tài liệu điều tra kỹ thuật sau sự cố ghi nhận mốc thời gian viễn trắc, các yếu tố cấu thành mang tính hệ thống và danh sách đầu việc khắc phục được ưu tiên.

## Ví dụ
Sau đợt mất kết nối tìm kiếm kéo dài 45 phút, nhóm xuất bản tài liệu postmortem chỉ ra lỗi thiếu chỉ mục dữ liệu, tạo đầu việc bổ sung bộ quét hiệu năng truy vấn tự động.
