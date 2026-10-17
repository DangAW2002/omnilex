---
label: Security patch
aliases:
  - bản vá bảo mật
  - cập nhật bảo mật
loanwords:
  - security patch
plain_descriptions:
  - bản cập nhật phần mềm được tạo riêng để vá các lỗ hổng bảo mật và chống tin tặc
  - gói sửa lỗi nhanh do nhà sản xuất phát hành để bít các điểm yếu nguy hiểm
summary: Bản cập nhật phần mềm được phát triển chuyên biệt nhằm khắc phục các lỗ hổng bảo mật đã xác định và ngăn ngừa nguy cơ bị tin tặc khai thác.
confusable_notes: {}
follow_up_questions:
  - Rủi ro an ninh nào phát sinh khi doanh nghiệp trì hoãn việc cài đặt bản vá do lo ngại xung đột phần mềm cũ?
  - Hệ thống quản lý bản vá tự động kiểm thử và triển khai các bản cập nhật tầng nhân (kernel) mà không làm gián đoạn dịch vụ như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như người thợ may vá lại một đường chỉ bị rách trên chiếc áo giáp: thay vì phải vứt bỏ cả chiếc áo để mua áo mới, người thợ may đắp một miếng vá kiên cố ngay tại chỗ thủng để ngăn các vật nhọn đâm xuyên qua.

## Chi tiết
Bản vá bảo mật cung cấp các tệp nhị phân sửa đổi, kịch bản cấu hình hoặc các gói phần mềm đã biên dịch nhằm loại bỏ các khiếm khuyết an ninh (thường được gắn mã định danh CVE). Các hãng công nghệ phân phối bản vá theo chu kỳ định kỳ hàng tháng hoặc phát hành khẩn cấp ngoài lịch khi phát hiện lỗ hổng đang bị khai thác ồ ạt trong thực tế. Quy trình quản lý bản vá trong doanh nghiệp bao gồm việc quét kiểm kê các máy chủ bị ảnh hưởng, kiểm thử độ tương thích trên môi trường thử nghiệm (staging), triển khai cập nhật theo từng đợt và quét xác nhận lại tính toàn vẹn. Việc chậm trễ áp dụng các bản vá bảo mật là nguyên nhân hàng đầu dẫn đến các vụ rò rỉ dữ liệu và xâm nhập mạng quy mô lớn.

## Định nghĩa chuyên ngành
Bản cập nhật được thiết kế để sửa đổi, khắc phục hoặc giảm thiểu các lỗ hổng an ninh trong một bản phát hành phần mềm hoặc phần mềm nhúng (firmware), đưa hệ thống trở lại trạng thái an toàn tiêu chuẩn.

## Ví dụ
Hãng phát triển hệ điều hành máy chủ phát hành bản vá bảo mật khẩn cấp khắc phục lỗi tràn bộ nhớ trong giao thức mạng, yêu cầu quản trị viên khởi động lại máy chủ ngay trong đêm để ngăn chặn nguy cơ bị chiếm quyền điều khiển.
