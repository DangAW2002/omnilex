---
label: Liveness probe
aliases:
  - Đầu dò hoạt động
loanwords:
  - liveness probe
plain_descriptions:
  - cơ chế tự động khởi động lại container khi ứng dụng bên trong bị treo cứng hoặc rơi vào vòng lặp chết
  - thiết lập giám sát trong Kubernetes giúp phát hiện tiến trình bị tê liệt để dọn dẹp và bật lại bản mới
summary: >-
  Bộ kiểm tra định kỳ trong hệ thống điều phối container nhằm phát hiện trạng thái treo hoặc chết của tiến trình để kích hoạt cơ chế khởi động lại kịp thời.
confusable_notes:
  readiness-probe: >-
    Liveness probe kiểm tra xem container còn sống không và sẽ khởi động lại nếu thất bại, còn readiness probe kiểm tra xem container đã sẵn sàng nhận tải mạng chưa mà không khởi động lại tiến trình.
follow_up_questions:
  - "Vì sao việc cấu hình liveness probe quá nhạy có thể gây ra vòng lặp khởi động lại liên tục khi máy chủ bị nghẽn tải?"
  - "Sự khác nhau giữa kiểm tra bằng lệnh HTTP, kiểm tra cổng mạng TCP và chạy lệnh trực tiếp trong container là gì?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như máy đo nhịp tim của phi hành gia: nếu máy phát hiện tim đã ngừng đập hoàn toàn, hệ thống sốc điện khẩn cấp sẽ tự động kích hoạt ngay để cứu sống.

## Chi tiết
Trong Kubernetes, liveness probe là công cụ giám sát do tiến trình kubelet thực hiện định kỳ để xác định xem ứng dụng trong container còn sống hay đã chết. Đôi khi ứng dụng vẫn duy trì tiến trình chạy nhưng bên trong bị khóa chết luồng dữ liệu hoặc rò rỉ bộ nhớ nghiêm trọng khiến không thể tiếp tục phục vụ. Bằng cách gửi yêu cầu HTTP, kiểm tra cổng kết nối TCP hoặc thực thi một lệnh kiểm tra, hệ thống biết được tiến trình có phản hồi hay không. Nếu kiểm tra thất bại quá số lần quy định, Kubernetes sẽ ra lệnh tiêu hủy và khởi động lại container.

## Định nghĩa chuyên ngành
Bộ kiểm tra vòng đời container do hệ thống điều phối quản lý nhằm kích hoạt việc hủy bỏ và khởi động lại tiến trình khi phát hiện trạng thái tê liệt.

## Ví dụ
Một container bị tràn bộ nhớ khiến ứng dụng không còn phản hồi; sau 3 lần kiểm tra liveness probe thất bại trong vòng 30 giây, Kubernetes tự động tắt tiến trình và mở một phiên bản mới.
