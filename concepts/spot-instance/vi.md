---
label: Spot instance
aliases: []
loanwords:
  - spot instance
plain_descriptions:
  - máy chủ ảo đám mây giảm giá sâu nhưng có thể bị thu hồi bất ngờ với cảnh báo ngắn
  - tài nguyên tính toán nhàn rỗi được thuê với giá rẻ cho các tác vụ xử lý hàng loạt
summary: Máy chủ ảo tận dụng năng lực tính toán dư thừa của nhà cung cấp đám mây với mức giảm giá lớn, nhưng có thể bị thu hồi khi nhà cung cấp cần tài nguyên.
confusable_notes:
  cloud-instance: Spot instance tận dụng máy chủ nhàn rỗi với giá giảm tới 80-90% nhưng có thể bị ngắt bất kỳ lúc nào, trong khi cloud instance tiêu chuẩn bảo đảm máy chạy liên tục không bị gián đoạn.
follow_up_questions:
  - Các hệ thống tự động xử lý thông báo thu hồi trước 2 phút của spot instance như thế nào để không mất mát dữ liệu?
  - Tại sao các cụm máy chủ phi trạng thái (stateless) và huấn luyện mô hình AI lại rất phù hợp với spot instance?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như mua vé máy bay giờ chót dạng chờ chuyến (standby): bạn mua được vé thương gia với giá giảm 80%, nhưng nếu có khách trả đủ tiền xuất hiện trước giờ bay, bạn phải nhường ghế và chờ chuyến kế tiếp.

## Chi tiết
Để tránh lãng phí các cụm máy chủ phần cứng đang để trống trong trung tâm dữ liệu, các hãng đám mây bán các máy ảo này dưới dạng spot instance với giá rẻ hơn từ 70% đến 90%. Đổi lại, khi khách hàng thông thường có nhu cầu thuê máy, nhà cung cấp sẽ phát tín hiệu cảnh báo trước 2 phút và thu hồi lại máy chủ. Do đó, mô hình này chỉ dành cho các hệ thống có khả năng chịu lỗi cao hoặc xử lý tác vụ theo lô.

## Định nghĩa chuyên ngành
Tài nguyên máy tính ảo tạm thời được trích xuất từ phần dung lượng dư thừa của hạ tầng đám mây với mức giá chiết khấu biến động, chịu sự can thiệp thu hồi tự động khi thị trường thiếu hụt năng lực tính toán.

## Ví dụ
Một viện nghiên cứu y sinh chạy các tác vụ giải mã gen trên 100 máy chủ spot instance, tiết kiệm được 75% chi phí hạ tầng máy tính vì nếu một máy bị thu hồi, công việc sẽ tự động chuyển sang máy khác chạy tiếp từ điểm lưu trữ tạm thời.
