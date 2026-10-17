---
label: Vertical scaling
aliases:
  - Scale up
  - Mở rộng theo chiều dọc
loanwords:
  - vertical scaling
  - scale up
plain_descriptions:
  - nâng cấp phần cứng mạnh hơn như tăng CPU và RAM cho một máy chủ sẵn có
  - nâng dung lượng máy bằng cách chuyển sang gói máy chủ lớn hơn
summary: Biện pháp gia tăng năng lực xử lý của hệ thống bằng cách bổ sung thêm tài nguyên tính toán như bộ xử lý, bộ nhớ RAM hoặc dung lượng ổ đĩa vào một máy chủ duy nhất.
confusable_notes:
  horizontal-scaling: Mở rộng theo chiều dọc (scale up) tập trung gia tăng sức mạnh cho một máy chủ sẵn có, còn mở rộng theo chiều ngang (scale out) lại gom nhiều máy chủ khác nhau để cùng chia sẻ khối lượng công việc.
follow_up_questions:
  - Những giới hạn vật lý và đồ thị chi phí nào khiến việc nâng cấp theo chiều dọc không thể kéo dài ở quy mô cực lớn?
  - Vì sao mở rộng theo chiều dọc thường yêu cầu gián đoạn dịch vụ để khởi động lại máy hơn so với mở rộng theo chiều ngang?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc nâng cấp động cơ xe ô tô: thay động cơ 4 xi-lanh nhỏ bằng động cơ V8 mạnh mẽ để kéo hàng nặng hơn mà không cần phải mua thêm chiếc xe thứ hai.

## Chi tiết
Mở rộng theo chiều dọc (scale up) nâng cao sức mạnh của hệ thống bằng cách chuyển máy chủ lên gói cấu hình phần cứng lớn hơn (ví dụ từ máy 4 nhân, 16 GB RAM lên máy 16 nhân, 64 GB RAM). Phương pháp này không đòi hỏi lập trình viên phải sửa mã nguồn hay tổ chức cụm phân tán phức tạp, rất phù hợp cho cơ sở dữ liệu quan hệ nguyên khối. Dẫu vậy, phần cứng luôn có ngưỡng giới hạn vật lý, chi phí thuê máy cấu hình cao tăng vọt theo hàm số mũ và việc thay đổi gói máy chủ thường buộc phải khởi động lại máy.

## Định nghĩa chuyên ngành
Phương thức nâng cao năng lực của một nút xử lý đơn lẻ thông qua việc bổ sung thêm tài nguyên vi xử lý, bộ nhớ truy xuất ngẫu nhiên và thông lượng vào ra dữ liệu.

## Ví dụ
Quản trị viên cơ sở dữ liệu nâng cấp máy chủ báo cáo từ 8 nhân CPU và 32 GB RAM lên 32 nhân CPU và 128 GB RAM để chạy đối soát số liệu kế toán cuối tháng.
