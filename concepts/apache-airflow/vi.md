---
label: Apache Airflow
aliases:
  - Airflow
loanwords:
  - Apache Airflow
  - Airflow
autolink:
  aliases:
    Airflow: always
plain_descriptions:
  - công cụ lập lịch và theo dõi đường ống dữ liệu nhiều bước bằng mã nguồn Python
  - người điều phối tự động giúp chạy các tác vụ trích xuất và xuất báo cáo dữ liệu theo đúng thứ tự
summary: Nền tảng mã nguồn mở dùng để lập trình, lập lịch và giám sát các luồng công việc kỹ thuật dữ liệu phức tạp.
confusable_notes: {}
follow_up_questions:
  - Đồ thị có hướng không chu trình (DAG) trong Airflow ngăn chặn phụ thuộc vòng lặp giữa các tác vụ ra sao?
  - Sự khác nhau trong vận hành giữa CeleryExecutor và KubernetesExecutor trong Airflow là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như trạm điều hành chuyến bay tại sân bay: bảo đảm xe tiếp nhiên liệu, xe chở hành lý và xe dọn vệ sinh hoàn thành đúng thứ tự công việc trước khi cho phép máy bay cất cánh.

## Chi tiết
Airflow mô hình hóa quy trình xử lý dữ liệu dưới dạng các đồ thị có hướng không chu trình (DAG) được viết bằng mã Python. Bộ lập lịch sẽ kiểm tra chu kỳ chạy, xác định thứ tự phụ thuộc giữa các bước và bàn giao việc cho các nút thực thi worker. Giao diện trực quan trên web giúp kỹ sư theo dõi trạng thái, xem nhật ký lỗi và tự động thử lại khi một khâu xử lý trung gian gặp sự cố.

## Định nghĩa chuyên ngành
Nền tảng điều phối luồng công việc theo dạng lập trình, chịu trách nhiệm lập lịch, định hướng và giám sát đồ thị tác vụ nhiều bước được định nghĩa bằng Python DAG.

## Ví dụ
Đội ngũ kỹ sư dữ liệu thiết lập một DAG trong Airflow để kéo dữ liệu quảng cáo lúc 02:00 sáng, chạy lệnh tính toán bằng Spark và cập nhật bảng số liệu báo cáo trước 04:00 sáng.
