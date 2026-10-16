---
label: Canary release
aliases:
  - Triển khai chim hoàng yến
  - Phát hành thử nghiệm từng phần
loanwords:
  - canary release
plain_descriptions:
  - cho một lượng nhỏ người dùng thật dùng thử phiên bản mới trước khi phát hành cho tất cả mọi người
  - cách cập nhật phần mềm từng bước để phát hiện lỗi sớm mà không làm ảnh hưởng toàn bộ người dùng
summary: >-
  Kỹ thuật triển khai mở phiên bản phần mềm mới cho một tỷ lệ nhỏ lưu lượng thực tế nhằm đánh giá độ ổn định trước khi
  phát hành rộng rãi.
confusable_notes:
  blue-green-deployment: >-
    Canary release thử nghiệm phiên bản mới bằng cách chuyển dần từng phần nhỏ lưu lượng thực tế để theo dõi lỗi, còn
    blue-green deployment chuẩn bị sẵn một môi trường đầy đủ và hoán đổi toàn bộ lưu lượng cùng lúc.
follow_up_questions:
  - Hệ thống giám sát tự động căn cứ vào những chỉ số nào để quyết định tiếp tục hay hủy bỏ một bản canary?
  - Các kỹ thuật phân luồng mạng nào giúp điều hướng nhân viên nội bộ sang dùng phiên bản canary trước?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như việc thợ mỏ ngày xưa mang theo chim hoàng yến xuống hầm than: nếu có khí độc rò rỉ, chim sẽ báo động sớm để thợ mỏ kịp thoát ra ngoài an toàn.

## Chi tiết
Phương pháp canary release điều phối một phần nhỏ yêu cầu (như 2% hoặc 5%) tới cụm máy chủ chạy phiên bản mới. Hệ thống giám sát đối chiếu tỷ lệ lỗi, độ trễ và mức tiêu hao tài nguyên giữa phiên bản mới và phiên bản hiện hành. Nếu mọi chỉ số bình thường, tỷ lệ người dùng sẽ được nâng dần lên 25%, 50% rồi 100%.

## Định nghĩa chuyên ngành
Mô hình phân luồng giao thông mạng tiến bộ điều hướng tỷ lệ phần trăm lưu lượng thực tế xác định sang nhóm máy chủ chạy phiên bản thử nghiệm.

## Ví dụ
Một nền tảng xem phim trực tuyến chuyển 1% lượng người xem sang bộ giải mã video mới trong 20 phút, xác nhận không có hiện tượng đứng hình trước khi mở rộng.
