---
label: Edge computing
aliases:
  - "Điện toán biên"
loanwords:
  - "edge computing"
plain_descriptions:
  - mô hình xử lý và phân tích dữ liệu ngay tại chỗ thay vì chuyển hết về trung tâm dữ liệu
  - phương pháp tính toán đặt máy chủ xử lý tác vụ sát nguồn phát sinh dữ liệu của thiết bị
summary: Mô hình tính toán phân tán đưa các tác vụ xử lý tính toán và lưu trữ dữ liệu về gần sát vị trí vật lý nơi thông tin được thu thập nhằm tối ưu độ trễ.
confusable_notes: {}
follow_up_questions:
  - Điện toán biên triệt tiêu độ trễ mạng trong các hệ thống thị giác máy tính công nghiệp theo cơ chế nào?
  - Các nền tảng điều phối container như Azure IoT Edge hay K3s đồng bộ hóa mô hình trí tuệ nhân tạo xuống rìa mạng ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Thay vì phải gửi toàn bộ hình ảnh camera qua mạng Internet lên máy chủ ở nước ngoài rồi chờ phản hồi, điện toán biên đặt ngay một con chip thông minh xử lý hình ảnh bên trong chiếc camera để nhận biết kẻ gian ngay tức khắc.

## Chi tiết
Điện toán biên (edge computing) giải quyết bài toán nghẽn băng thông, độ trễ truyền dẫn và nguy cơ mất mạng Internet của mô hình đám mây tập trung. Bằng cách trang bị máy tính biên hoặc gateway hiệu năng cao ngay tại nhà xưởng, dữ liệu cảm biến được lọc và phân tích cục bộ với độ trễ chỉ vài mili giây. Các mô hình máy học hiện đại thường được huấn luyện trên đám mây rồi đóng gói thành container phần mềm đẩy xuống thiết bị biên để suy luận độc lập tại chỗ.

## Định nghĩa chuyên ngành
Kiến trúc công nghệ thông tin phân tán trong đó việc xử lý và phân tích dữ liệu diễn ra tại phần rìa của mạng lưới, gần sát nhất có thể với nguồn sinh ra dữ liệu vật lý.

## Ví dụ
Máy chủ biên đặt tại nhà máy lắp ráp linh kiện điện tử tại Bắc Ninh xử lý luồng camera độ phân giải cao để gạt bỏ bo mạch lỗi khỏi băng chuyền trong vòng 5 mili giây.
