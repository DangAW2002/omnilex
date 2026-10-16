---
label: Load balancer
aliases:
  - Bộ cân bằng tải
  - Thiết bị cân bằng tải
loanwords:
  - load balancer
plain_descriptions:
  - người điều phối giao thông chia đều lượng người truy cập vào nhiều máy chủ phía sau
  - thiết bị mạng giúp các máy chủ không bị quá tải bằng cách chia nhỏ lượng truy cập
summary: Thành phần mạng phân phối lưu lượng truy cập của ứng dụng hoặc mạng tới một nhóm máy chủ đích ở phía sau.
confusable_notes: {}
follow_up_questions:
  - Sự khác biệt về hiệu năng và tính năng giữa cân bằng tải Tầng 4 (TCP/UDP) và Tầng 7 (HTTP/HTTPS) là gì?
  - Thuật toán băm nhất quán (consistent hashing) hỗ trợ duy trì phiên làm việc của người dùng ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như nhân viên điều phối tại sảnh ngân hàng: thay vì để khách dồn vào một quầy, nhân viên hướng dẫn từng người đến quầy giao dịch đang trống tiếp theo.

## Chi tiết
Bộ cân bằng tải hoạt động ở Tầng 4 (tầng giao vận, định tuyến theo IP và cổng) hoặc Tầng 7 (tầng ứng dụng, định tuyến theo đường dẫn URL, tiêu đề HTTP hoặc cookie). Thiết bị liên tục kiểm tra sức khỏe các máy chủ phía sau để tự động loại bỏ máy chủ bị treo. Các thuật toán phổ biến gồm xoay vòng (round-robin) và ít kết nối nhất (least connections).

## Định nghĩa chuyên ngành
Thành phần mạng (ở tầng 7 thường là một proxy ngược) phân bổ các yêu cầu kết nối của máy khách tới nhiều nút máy chủ dự phòng, duy trì tính sẵn sàng thông qua kiểm tra hoạt động.

## Ví dụ
Bộ cân bằng tải AWS tiếp nhận 50.000 yêu cầu HTTP mỗi giây và chia đều lưu lượng qua ba mươi máy chủ ứng dụng theo thuật toán xoay vòng.
