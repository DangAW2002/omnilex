---
label: Ransomware
aliases:
  - mã độc tống tiền
loanwords:
  - ransomware
plain_descriptions:
  - phần mềm độc hại tự ý khóa mã hóa toàn bộ dữ liệu máy tính rồi đòi tiền chuộc
  - chương trình tống tiền điện tử làm tê liệt hệ thống máy chủ cho đến khi nộp tiền
summary: Loại phần mềm độc hại mã hóa dữ liệu của nạn nhân hoặc khóa quyền truy cập hệ thống nhằm đòi tiền chuộc để đổi lấy khóa giải mã.
confusable_notes: {}
follow_up_questions:
  - Kịch bản tống tiền kép (double extortion) và tống tiền ba tầng gây sức ép lên tổ chức nạn nhân như thế nào?
  - Những giải pháp kiến trúc nào giúp hệ thống sao lưu bất biến (immutable backup) không bị mã độc tống tiền xâm phạm?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như kẻ trộm đột nhập vào phòng làm việc của bạn vào ban đêm, dùng dây xích và ổ khóa khóa chặt toàn bộ các ngăn tủ tài liệu, rồi để lại mảnh giấy đòi tiền chuộc mới chịu chỉ chỗ cất chìa khóa.

## Chi tiết
Mã độc tống tiền thường xâm nhập vào hệ thống qua các bức thư điện tử lừa đảo, cổng kết nối điều khiển máy tính từ xa (RDP) để hở, hoặc các lỗ hổng phần mềm chưa được vá. Khi vào được mạng nội bộ, mã độc thiết lập chỗ đứng, quét các ổ đĩa chia sẻ, tìm xóa các bản sao lưu ẩn (volume shadow copies) và vô hiệu hóa các dịch vụ bảo vệ. Kẻ tấn công thường sao chép trộm dữ liệu nhạy cảm ra ngoài trước (chiến thuật tống tiền kép) rồi mới kích hoạt thuật toán mã hóa hàng loạt ổ cứng với tốc độ cao. Nạn nhân nhận được thông báo đòi tiền chuộc bằng tiền mã hóa ẩn danh. Biện pháp phòng chống cốt lõi gồm cách ly thiết bị đầu cuối tự động, phân vùng mạng nghiêm ngặt và duy trì các bản sao lưu ngoại tuyến tách biệt hoàn toàn.

## Định nghĩa chuyên ngành
Chủng loại phần mềm độc hại được thiết kế để tước đoạt quyền truy cập tài nguyên tính toán hoặc mã hóa tài sản dữ liệu, đặt điều kiện phục hồi hệ thống dựa trên việc đáp ứng yêu cầu tiền chuộc.

## Ví dụ
Hệ thống máy chủ của một bệnh viện đa khoa bị nhiễm ransomware làm mã hóa toàn bộ cơ sở dữ liệu bệnh án điện tử và lịch phẫu thuật, buộc các y bác sĩ phải tạm thời chuyển sang ghi chép hồ sơ giấy.
