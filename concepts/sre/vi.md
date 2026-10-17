---
label: Site reliability engineering (SRE)
aliases:
  - SRE
  - Kỹ thuật độ tin cậy hệ thống
loanwords:
  - site reliability engineering
  - sre
autolink:
  aliases:
    SRE: always
plain_descriptions:
  - việc vận dụng kỹ năng lập trình phần mềm để giải quyết các bài toán vận hành và giữ cho hệ thống luôn hoạt động ổn định
  - ngành chuyên môn tập trung tự động hóa các thao tác thủ công nhằm đảm bảo dịch vụ trực tuyến không bị gián đoạn
summary: >-
  Chuyên ngành kỹ thuật ứng dụng các nguyên lý phát triển phần mềm để tự động hóa hoạt động vận hành và duy trì độ tin cậy cho các hệ thống quy mô lớn.
confusable_notes:
  devops: >-
    SRE ứng dụng các nguyên tắc kỹ thuật phần mềm vào vận hành qua các cơ chế định lượng như error budget và SLA, còn DevOps mô tả tư duy và văn hóa tổ chức rộng lớn hơn.
follow_up_questions:
  - "Tại sao mô hình SRE quy định chặt chẽ việc kỹ sư không được dành quá 50% thời gian cho các công việc thủ công (toil)?"
  - "Văn hóa viết báo cáo sự cố không quy kết trách nhiệm (blameless postmortem) mang lại lợi ích gì cho tổ chức?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc nhờ các kỹ sư phần mềm thiết kế hệ thống lái tự động cho toàn bộ máy bay, thay vì thuê thật nhiều phi công ngồi gạt cần lái thủ công qua từng cơn bão.

## Chi tiết
Khởi xướng bởi Google, Site Reliability Engineering (SRE) là phương pháp giải quyết các bài toán quản trị hệ thống bằng tư duy lập trình phần mềm. Thay vì thực hiện các thao tác vận hành thủ công, kỹ sư SRE viết mã để xây dựng các công cụ tự động hóa giám sát, mở rộng tài nguyên và khắc phục lỗi. SRE định lượng độ tin cậy qua các chỉ số đo lường (SLI) và mục tiêu chất lượng dịch vụ (SLO), từ đó tạo ra ngân sách lỗi (error budget) để cân bằng giữa tốc độ ra mắt tính năng mới và độ ổn định. Quy tắc bất di bất dịch của SRE là dành ít nhất 50% thời gian để viết phần mềm tự động hóa.

## Định nghĩa chuyên ngành
Chuyên ngành kỹ thuật áp dụng các nguyên lý phát triển phần mềm vào hạ tầng và vận hành nhằm xây dựng các hệ thống có khả năng mở rộng cao và độ tin cậy vượt trội.

## Ví dụ
Đội ngũ SRE xây dựng công cụ tự động phát hiện tình trạng nghẽn cổ chai và tự động chuyển hướng truy vấn sang cụm máy chủ dự phòng mà không cần kỹ sư trực ban phải thao tác bằng tay.
