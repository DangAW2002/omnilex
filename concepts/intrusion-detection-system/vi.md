---
label: Intrusion detection system (IDS)
aliases:
  - IDS
  - hệ thống phát hiện xâm nhập
loanwords:
  - intrusion detection system (ids)
autolink:
  aliases:
    IDS: always
plain_descriptions:
  - hệ thống chuông báo động an ninh mạng chuyên phát hiện hành vi đáng ngờ và phát cảnh báo
  - phần mềm giám sát tự động phát hiện các nỗ lực xâm nhập trái phép vào máy chủ
summary: Thiết bị phần cứng hoặc ứng dụng phần mềm giám sát các hoạt động trên mạng hoặc máy chủ nhằm phát hiện các hành vi độc hại và phát tín hiệu cảnh báo.
confusable_notes: {}
follow_up_questions:
  - Điểm khác biệt về mặt vận hành giữa hệ thống phát hiện xâm nhập (IDS) và hệ thống ngăn chặn xâm nhập chủ động (IPS) là gì?
  - Cơ chế phát hiện dựa trên bất thường (anomaly-based) xây dựng hồ sơ hành vi chuẩn trên các mạng có lưu lượng lớn như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như hệ thống cảm biến chuyển động chống trộm lắp đặt bên trong một nhà kho: nó không tự mình khóa cửa hay xông vào bắt kẻ trộm, nhưng ngay khi phát hiện có chuyển động lạ vào ban đêm, nó sẽ lập tức hụ còi báo động và gửi tin nhắn cảnh báo cho nhân viên bảo vệ.

## Chi tiết
Hệ thống phát hiện xâm nhập (IDS) vận hành theo cơ chế quan sát thụ động. Hệ thống thường được triển khai theo hai mô hình kiến trúc: IDS trên mạng (NIDS), chuyên bắt và soi chiếu các gói tin lưu chuyển qua cổng mirror của bộ chuyển mạch (như Snort hay Suricata); và IDS trên máy chủ (HIDS), chuyên giám sát các lời gọi hàm hệ thống, tính toàn vẹn của tệp cấu hình và nhật ký kernel (như OSSEC hoặc Wazuh). Bộ máy phân tích của IDS kết hợp giữa kỹ thuật so khớp mẫu chữ ký của các cuộc tấn công đã biết với phân tích thống kê hành vi bất thường nhằm phát hiện các đợt quét cổng do thám hoặc nỗ lực leo thang đặc quyền trong mạng nội bộ.

## Định nghĩa chuyên ngành
Hệ thống tự động kiểm tra luồng gói tin mạng hoặc nhật ký kiểm toán hệ điều hành nhằm nhận diện các dấu hiệu xâm nhập độc hại hoặc vi phạm chính sách an ninh, từ đó tạo cảnh báo cho đội ngũ ứng phó sự cố.

## Ví dụ
Hệ thống NIDS đặt trong phân vùng máy chủ dữ liệu phát hiện hàng trăm yêu cầu kết nối giao thức SMB bất thường xuất phát từ máy tính xách tay của một nhân viên, lập tức gửi cảnh báo mức độ cao tới bộ phận trực an ninh thông tin.
