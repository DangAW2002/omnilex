---
label: Domain-driven design (DDD)
aliases:
  - DDD
  - Thiết kế hướng miền
loanwords:
  - domain-driven design (ddd)
  - ddd
autolink:
  aliases:
    DDD: always
plain_descriptions:
  - phương pháp thiết kế phần mềm lấy mô hình nghiệp vụ thực tế làm trung tâm
  - xây dựng mã nguồn xoay quanh ngôn ngữ chung giữa chuyên gia nghiệp vụ và kỹ sư
summary: Phương pháp phát triển phần mềm đặt trọng tâm kiến trúc và mã nguồn vào việc mô hình hóa chính xác nghiệp vụ thực tế, sử dụng ngôn ngữ chung và phân tách các ngữ cảnh giới hạn.
confusable_notes: {}
follow_up_questions:
  - Khái niệm ngữ cảnh giới hạn (bounded context) giúp định rõ ranh giới giữa các miền logic ra sao?
  - Thực thể gốc tập hợp (aggregate root) đóng vai trò gì trong việc bảo toàn tính nhất quán nghiệp vụ?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như khi xây dựng phần mềm bệnh viện: bác sĩ, điều dưỡng và kỹ sư phần mềm phải dùng chung một bộ thuật ngữ y khoa chính xác, đảm bảo tất cả đều hiểu đúng nghĩa của từ ca nội trú hay đơn thuốc.

## Chi tiết
Thiết kế hướng miền (DDD) giải quyết sự phức tạp của phần mềm bằng cách gắn chặt mã nguồn vào mô hình nghiệp vụ thực tế. Phương pháp này đề ra các công cụ chiến lược như Ngôn ngữ chung (Ubiquitous Language) được cả chuyên gia nghiệp vụ lẫn lập trình viên cùng dùng, và Ngữ cảnh giới hạn (Bounded Context) phân định ranh giới ngữ nghĩa trong hệ thống lớn. Về mặt chiến thuật, mã được tổ chức thành Thực thể (Entity), Đối tượng giá trị (Value Object), Cụm tập hợp (Aggregate) và Kho lưu trữ (Repository).

## Định nghĩa chuyên ngành
Phương pháp luận kiến trúc phần mềm ưu tiên việc mô hình hóa sâu nghiệp vụ thực tế thông qua các ranh giới ngữ cảnh tường minh, từ vựng đồng nhất và các cụm giao dịch tập hợp.

## Ví dụ
Một nền tảng vận tải chia hệ thống thành hai Ngữ cảnh giới hạn riêng biệt là QuanLyDoiXe và TinhCuocVanChuyen, giúp từ Xe tải mang các thuộc tính kỹ thuật khác nhau ở khâu bảo trì so với khâu tính khấu hao.
