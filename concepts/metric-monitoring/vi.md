---
label: Metric
qualifier: (Giám sát)
aliases:
  - Chỉ số giám sát
  - Số đo hiệu năng
loanwords:
  - metric
plain_descriptions:
  - con số đo lường theo thời gian thể hiện tình trạng hoạt động và tải của hệ thống máy chủ
  - các thống kê định lượng định kỳ như mức sử dụng CPU, dung lượng RAM hay số yêu cầu mỗi giây
summary: >-
  Phép đo số học định lượng có thể tổng hợp được, ghi nhận định kỳ theo các khoảng thời gian nhằm đánh giá hiệu năng và
  sức khỏe hệ thống.
confusable_notes: {}
follow_up_questions:
  - 'Sự khác nhau cơ bản giữa các dạng metric: bộ đếm (counter), thước đo (gauge) và biểu đồ phân bổ (histogram) là gì?'
  - Cơ chế tổng hợp metric giúp tiết kiệm dung lượng lưu trữ dài hạn như thế nào so với việc lưu trữ toàn bộ log?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
autolink:
  label: never
---

## Giải thích dễ hiểu
Giống như kim chỉ tốc độ và đồng hồ đo xăng trên xe máy: các con số nhảy liên tục để bạn biết ngay mình đang đi nhanh chừng nào và xe còn bao nhiêu nhiên liệu.

## Chi tiết
Chỉ số đo lường (metric) tóm gọn hoạt động của hệ thống thành chuỗi dữ liệu thời gian dạng số. Các loại metric thông dụng gồm counter (chỉ số chỉ tăng dần như tổng số lượt truy cập), gauge (giá trị tức thời có thể tăng giảm như lượng RAM đang chiếm) và histogram (nhóm thống kê dùng để tính toán thời gian phản hồi hệ thống).

## Định nghĩa chuyên ngành
Tín hiệu viễn trắc số học dạng chuỗi thời gian ghi nhận các thuộc tính định lượng được tổng hợp của hệ thống máy tính kèm theo các nhãn phân loại.

## Ví dụ
Hệ thống đo chỉ số `http_requests_total` mỗi 15 giây một lần, cho thấy tốc độ xử lý ổn định ở mức 4.200 yêu cầu thành công mỗi phút.
