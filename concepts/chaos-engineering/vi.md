---
label: Chaos engineering
aliases:
  - Kỹ thuật hỗn loạn
loanwords:
  - chaos engineering
plain_descriptions:
  - chủ động gây lỗi giả định trên hệ thống đang chạy để kiểm tra khả năng tự phục hồi
  - thí nghiệm ngắt kết nối mạng hoặc tắt máy chủ bất ngờ nhằm phát hiện điểm yếu tiềm ẩn
summary: >-
  Phương pháp thực nghiệm có kiểm soát trên hệ thống phân tán nhằm xây dựng niềm tin vào khả năng chịu đựng các sự cố bất ngờ trong môi trường thực tế.
confusable_notes: {}
follow_up_questions:
  - "Làm thế nào để giới hạn phạm vi ảnh hưởng (blast radius) khi tiến hành thử nghiệm hỗn loạn trên môi trường thực tế?"
  - "Chỉ số trạng thái ổn định (steady state) đóng vai trò gì trong việc đánh giá kết quả thử nghiệm?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như buổi diễn tập phòng cháy chữa cháy trong tòa nhà: thay vì chờ hỏa hoạn xảy ra mới biết cửa thoát hiểm có mở được không, ban quản lý chủ động diễn tập định kỳ để xử lý sự cố.

## Chi tiết
Chaos engineering là phương pháp chủ động đưa các sự cố giả định vào hệ thống đang hoạt động nhằm kiểm chứng khả năng tự khắc phục lỗi. Kỹ sư bắt đầu bằng việc xác định trạng thái bình thường của dịch vụ qua các chỉ số như số đơn hàng thành công mỗi phút. Sau đó, họ đưa ra giả thuyết và kích hoạt các lỗi như làm chậm đường truyền mạng, ngắt máy chủ cơ sở dữ liệu hoặc làm đầy dung lượng ổ đĩa. Thí nghiệm luôn có cơ chế ngắt khẩn cấp để đảm bảo không gây gián đoạn lớn cho người dùng, từ đó giúp phát hiện các điểm nghẽn tiềm ẩn trước khi chúng gây ra sự cố thực.

## Định nghĩa chuyên ngành
Phương pháp thực nghiệm có kiểm soát đưa các lỗi giả lập vào hệ thống phân tán nhằm kiểm tra khả năng chịu lỗi và tính bền bỉ của kiến trúc phần mềm.

## Ví dụ
Một sàn thương mại điện tử định kỳ ngắt ngẫu nhiên 20% các tiến trình dịch vụ thanh toán để kiểm tra xem hệ thống có tự động định tuyến lại lưu lượng mà không làm khách hàng bị lỗi hay không.
