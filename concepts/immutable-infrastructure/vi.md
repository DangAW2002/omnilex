---
label: Immutable infrastructure
aliases:
  - Hạ tầng bất biến
loanwords:
  - immutable infrastructure
plain_descriptions:
  - nguyên tắc không bao giờ chỉnh sửa trực tiếp trên máy chủ đang chạy mà luôn thay thế bằng một máy chủ mới hoàn toàn
  - cách vận hành coi máy tính như các linh kiện dùng một lần được đóng gói sẵn và thay mới mỗi khi cập nhật phần mềm
summary: >-
  Mô hình quản lý hạ tầng trong đó các máy chủ hoặc vùng chứa không bao giờ bị chỉnh sửa trực tiếp sau khi khởi chạy, mà luôn được thay thế bằng hình ảnh máy mới khi có thay đổi.
confusable_notes:
  configuration-management: >-
    Hạ tầng bất biến hủy bỏ và thay thế phiên bản máy chủ mới mỗi khi có bản cập nhật, trong khi quản lý cấu hình truyền thống áp dụng thay đổi trực tiếp lên máy đang chạy.
follow_up_questions:
  - "Hình ảnh so sánh máy chủ như gia súc thay vì thú cưng (cattle vs pets) thể hiện tư duy hạ tầng bất biến ra sao?"
  - "Việc đóng gói sẵn hình ảnh máy mẫu (golden image) giúp tăng tốc độ tự động mở rộng cụm máy chủ như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc dùng ly giấy dùng một lần thay vì dùng cốc sứ: mỗi lần cần uống nước bạn lấy một chiếc ly mới tinh y hệt, dùng xong bỏ đi chứ không tốn công chùi rửa và sửa sang lại.

## Chi tiết
Hạ tầng bất biến là nguyên tắc thiết kế hệ thống trong đó các máy chủ hay container sau khi đã khởi chạy sẽ được coi là bất khả xâm phạm và không được phép chỉnh sửa trực tiếp. Khi cần vá lỗi bảo mật hoặc cập nhật phiên bản ứng dụng, đội ngũ kỹ sư sẽ tạo ra một hình ảnh máy chủ mới hoàn chỉnh từ mã nguồn, khởi chạy các máy chủ mới này song song, chuyển toàn bộ người dùng sang rồi tắt bỏ các máy chủ cũ. Cách làm này triệt tiêu hoàn toàn nguy cơ sai lệch cấu hình giữa các môi trường và giúp việc quay lại phiên bản cũ trở nên cực kỳ an toàn.

## Định nghĩa chuyên ngành
Mô hình kiến trúc hạ tầng trong đó các phiên bản tài nguyên điện toán không bao giờ bị thay đổi trạng thái sau khi triển khai mà được thay thế hoàn toàn bằng phiên bản mới.

## Ví dụ
Khi phát hành phiên bản mới, hệ thống tự động khởi tạo cụm 10 máy ảo mới từ bản mẫu đã đóng gói sẵn, kiểm tra thông mạng rồi xóa sạch 10 máy ảo cũ mà không cần can thiệp trực tiếp.
