---
label: Readiness probe
aliases:
  - Đầu dò sẵn sàng
loanwords:
  - readiness probe
plain_descriptions:
  - cơ chế báo cho bộ cân bằng tải biết ứng dụng đã khởi động xong và sẵn sàng tiếp nhận yêu cầu từ người dùng
  - bước kiểm tra tạm thời chặn khách truy cập vào máy chủ trong khi dịch vụ đang nạp bộ nhớ đệm hoặc tải dữ liệu
summary: >-
  Bộ kiểm tra xác định xem container ứng dụng đã hoàn tất quá trình khởi tạo và sẵn sàng nhận lưu lượng truy cập mạng từ bộ cân bằng tải hay chưa.
confusable_notes:
  liveness-probe: >-
    Readiness probe báo hiệu xem container đã sẵn sàng nhận kết nối từ người dùng chưa mà không khởi động lại máy, còn liveness probe sẽ buộc khởi động lại container khi gặp lỗi.
follow_up_questions:
  - "Readiness probe giúp đảm bảo quy trình cập nhật ứng dụng không làm gián đoạn người dùng (zero-downtime) như thế nào?"
  - "Trong trường hợp nào một dịch vụ đang chạy nên tự ngắt trạng thái sẵn sàng mà không cần khởi động lại?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như nhân viên lễ tân đứng trước cửa nhà hàng: kiểm tra xem đầu bếp đã chuẩn bị đồ ăn xong chưa trước khi mời khách vào bàn; nếu bếp đang bận chuẩn bị thì khách đợi ở sảnh thay vì ngồi bàn trống.

## Chi tiết
Readiness probe là cơ chế kiểm tra trong hệ thống điều phối container để biết ứng dụng đã sẵn sàng nhận kết nối mạng hay chưa. Khi vừa bật máy chủ, ứng dụng thường mất vài giây tới vài chục giây để nạp cấu hình, kết nối cơ sở dữ liệu và tải bộ nhớ đệm. Chừng nào bài kiểm tra này chưa thành công, Kubernetes sẽ không đưa địa chỉ của container vào danh sách định tuyến của bộ cân bằng tải. Điểm khác biệt quan trọng là việc kiểm tra thất bại sẽ không làm máy chủ bị khởi động lại, mà chỉ đơn thuần tạm dừng đưa khách hàng vào đó.

## Định nghĩa chuyên ngành
Bộ kiểm tra vòng đời container xác định việc đưa một phiên bản ứng dụng vào hoặc rút khỏi bảng định tuyến của dịch vụ mạng mà không làm gián đoạn tiến trình.

## Ví dụ
Một ứng dụng phân tích dữ liệu cần 15 giây để nạp mô hình vào RAM; trong suốt 15 giây đó, readiness probe trả về trạng thái chưa sẵn sàng để đảm bảo không người dùng nào nhận thông báo lỗi.
