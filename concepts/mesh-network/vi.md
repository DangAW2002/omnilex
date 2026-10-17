---
label: Mesh network
aliases:
  - "Mạng lưới"
  - "Mạng mesh"
loanwords:
  - "mesh network"
  - "mạng mesh"
plain_descriptions:
  - cấu trúc mạng mà các thiết bị tự bắt sóng và truyền tiếp dữ liệu vòng qua nhau
  - mô hình mạng không dây phân tán nơi mỗi nút vừa là điểm nhận vừa là trạm chuyển tiếp
summary: Cấu trúc mạng phân tán trong đó các thiết bị liên kết đa hướng với nhau để tự động chuyển tiếp dữ liệu qua nhiều chặng mà không lệ thuộc vào một trạm phát trung tâm duy nhất.
confusable_notes:
  poe: "Mesh network là cấu trúc định tuyến không dây chuyển tiếp gói tin giữa các trạm sóng, còn PoE là phương thức cấp nguồn điện vật lý trực tiếp qua dây cáp mạng đồng Ethernet."
  lpwan: "Mesh network chuyển tiếp gói tin qua nhiều nút trung gian liền kề theo cấu trúc phi tập trung, trong khi LPWAN kết nối trực tiếp thiết bị đầu cuối tới trạm thu phát hoặc gateway cách xa nhiều km theo cấu trúc sao."
follow_up_questions:
  - Thuật toán định tuyến tự chữa lành định lại lộ trình gói tin như thế nào khi một nút chuyển tiếp bị mất tín hiệu?
  - Tại sao độ trễ tích lũy và phụ phí gói tin lại tăng cao khi mạng mesh có quá nhiều chặng nhảy?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Mạng mesh giống như một hàng người chuyền xô nước dập lửa: thay vì từng người phải tự chạy về bờ sông để múc nước, mọi người đứng thành chuỗi và chuyền xô cho nhau, ai mệt rời hàng thì người bên cạnh lập tức chuyền cho người khác mà dòng chảy không bị tắc.

## Chi tiết
Trong cấu trúc mạng lưới (mesh), mỗi nút vừa đóng vai trò thiết bị thu phát vừa có khả năng định tuyến chuyển tiếp gói tin cho các thiết bị lân cận. Các chuẩn mesh thông dụng gồm Thread, Bluetooth Mesh, Zigbee và RPL (RFC 6550). Mạng lưới giúp mở rộng phạm vi phủ sóng qua các vật cản mà không cần tăng công suất ăng-ten. Điểm cần lưu ý là các nút làm nhiệm vụ chuyển tiếp phải luôn bật thu phát sóng nên tiêu thụ điện nhiều hơn, và việc nhảy qua nhiều trạm trung gian sẽ làm tăng độ trễ gói tin.

## Định nghĩa chuyên ngành
Cấu trúc mạng không có nút trung tâm, trong đó mỗi nút kết nối với nhiều nút lân cận và chuyển tiếp dữ liệu giúp chúng, nhờ vậy dữ liệu có thể đi qua nhiều chặng và tự đổi đường khi một nút hỏng.

## Ví dụ
Hệ thống đèn đường thông minh trong khu đô thị tự bắt sóng với nhau tạo thành mạng mesh, chuyền tiếp dữ liệu báo cháy từ đèn này sang đèn khác về trạm điều khiển trung tâm.
