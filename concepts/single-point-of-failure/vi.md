---
label: Single point of failure (SPOF)
aliases:
  - SPOF
  - Điểm lỗi đơn lẻ
loanwords:
  - single point of failure (spof)
  - spof
autolink:
  aliases:
    SPOF: always
plain_descriptions:
  - một điểm yếu duy nhất trong hệ thống mà nếu hỏng sẽ khiến toàn bộ dịch vụ sập theo
  - linh kiện hoặc máy chủ không có bản sao dự phòng dễ gây ngừng trệ toàn bộ
summary: Thành phần hoặc mắt xích đơn lẻ trong một hệ thống mà sự cố của nó sẽ làm toàn bộ hệ thống ngừng hoạt động hoàn toàn do thiếu cơ chế dự phòng thay thế.
confusable_notes: {}
follow_up_questions:
  - Phân tích cây lỗi kiến trúc và các thử nghiệm hỗn loạn (chaos engineering) phát hiện điểm lỗi đơn lẻ tiềm ẩn như thế nào?
  - Vì sao cơ sở dữ liệu dùng chung và máy chủ phân giải tên miền (DNS) thường vô tình biến thành những điểm lỗi đơn lẻ nguy hiểm?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như dây đèn nhấp nháy bóng tròn mắc nối tiếp: chỉ cần một bóng đèn con bị cháy đứt dây tóc là toàn bộ dây 100 bóng đèn đều tắt ngấm ngay lập tức.

## Chi tiết
Điểm lỗi đơn lẻ (SPOF) xuất hiện khi một hệ thống phụ thuộc vào một linh kiện hay phần mềm độc nhất mà không có phương án dự phòng thay thế. Những điểm SPOF điển hình gồm một máy chủ cơ sở dữ liệu duy nhất không có bản sao chép, một bộ cân bằng tải đơn lẻ, hoặc một cổng thanh toán ngoài không có kênh dự phòng. Mục tiêu cốt lõi của kỹ thuật độ tin cậy là rà soát và triệt tiêu các điểm SPOF này bằng thiết kế nhân đôi, định tuyến đa đường và chuyển đổi dự phòng tự động.

## Định nghĩa chuyên ngành
Lỗ hổng cấu trúc trong sơ đồ vận hành nơi sự cố của một nút thành phần độc nhất gây ra tình trạng ngưng trệ không thể khắc phục cho toàn bộ hệ thống bao quanh.

## Ví dụ
Hệ thống chạy 10 máy chủ web dự phòng nhưng toàn bộ mã nguồn đều kết nối vào một máy chủ cơ sở dữ liệu duy nhất không có bản sao lưu nào khác, biến chiếc máy chủ dữ liệu đó thành một điểm lỗi đơn lẻ chí mạng.
