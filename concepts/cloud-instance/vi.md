---
label: Instance
aliases: []
qualifier: (Đám mây)
autolink:
  label: never
loanwords:
  - instance
plain_descriptions:
  - máy chủ ảo chạy trên đám mây được cấp phát dung lượng CPU và bộ nhớ RAM cụ thể
  - máy tính ảo thuê trên đám mây có thể bật tắt hoặc thay đổi cấu hình linh hoạt
summary: Môi trường máy tính ảo được cấp phát trên hạ tầng đám mây với dung lượng CPU ảo, bộ nhớ RAM và băng thông mạng xác định.
confusable_notes:
  spot-instance: Instance theo nhu cầu thông thường chạy liên tục cho đến khi người dùng chủ động tắt, còn spot instance là máy chủ tận dụng tài nguyên dư thừa với giá rẻ nhưng nhà cung cấp có thể thu hồi bất kỳ lúc nào.
follow_up_questions:
  - Các dòng instance (đa dụng, tối ưu tính toán, tối ưu bộ nhớ) phù hợp với những bài toán ứng dụng nào?
  - Sự khác nhau giữa mô hình tính tiền theo giờ (on-demand) và cam kết sử dụng dài hạn (reserved instances) là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như thuê một chiếc xe tự lái từ công ty cho thuê: bạn chọn loại xe phù hợp (xe 4 chỗ, 7 chỗ hay xe tải), trả tiền theo số ngày thuê và trả xe khi không còn nhu cầu.

## Chi tiết
Cloud instance trừu tượng hóa các máy chủ vật lý thành các máy ảo thông qua phần mềm giám sát ảo hóa (hypervisor). Người dùng có thể lựa chọn cấu hình máy tính phù hợp từ số lượng nhân CPU, dung lượng RAM đến băng thông mạng. Mỗi instance vận hành một hệ điều hành hoàn chỉnh (như Linux hoặc Windows) và có thể được nhân bản, nâng cấp cấu hình hoặc xóa bỏ trong vài phút.

## Định nghĩa chuyên ngành
Thực thể máy chủ ảo được khởi tạo từ một ảnh đĩa mẫu trên hạ tầng máy chủ chia sẻ của nhà cung cấp đám mây, được bảo đảm tài nguyên tính toán (vCPU), bộ nhớ (RAM) và giao diện mạng riêng biệt.

## Ví dụ
Nhóm kỹ sư hệ thống khởi tạo một instance cấu hình 4 nhân vCPU và 16 GB RAM để chạy hệ thống ứng dụng chính của công ty phía sau bộ cân bằng tải mạng.
