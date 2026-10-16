---
label: Infrastructure as code (IaC)
aliases:
  - IaC
  - Hạ tầng dưới dạng mã
  - Hạ tầng hướng mã
loanwords:
  - infrastructure as code
  - IaC
plain_descriptions:
  - khởi tạo máy chủ, mạng và cơ sở dữ liệu bằng tệp mã nguồn thay vì bấm tay trên trang quản trị đám mây
  - quản lý toàn bộ hạ tầng công nghệ thông tin qua các tệp văn bản có lưu lịch sử phiên bản
summary: >-
  Phương pháp quản lý và khởi tạo hạ tầng công nghệ thông tin thông qua các tệp định nghĩa đọc được bằng máy thay vì cấu
  hình thủ công.
confusable_notes: {}
follow_up_questions:
  - Sự khác biệt cốt lõi giữa phương pháp IaC hướng khai báo (declarative) và hướng mệnh lệnh (imperative) là gì?
  - Hiện tượng trôi dạt cấu hình (configuration drift) xảy ra thế nào và các công cụ IaC xử lý ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
autolink:
  aliases:
    IaC: always
---

## Giải thích dễ hiểu
Giống như bản vẽ kỹ thuật số nạp thẳng vào máy in 3D: thay vì thợ xây tự căn gạch bằng tay, chiếc máy đọc bản vẽ và dựng lên đúng ngôi nhà giống hệt nhau mọi lúc.

## Chi tiết
Hạ tầng dưới dạng mã cho phép các nhóm kỹ thuật định nghĩa mạng ảo, bộ cân bằng tải và cơ sở dữ liệu trong các tệp văn bản có cấu trúc (như Terraform hay Bicep). Các tệp này được lưu trên kho mã nguồn Git, giúp theo dõi lịch sử thay đổi, kiểm duyệt chéo và tự động hóa việc tái lập môi trường mới chỉ bằng một lệnh.

## Định nghĩa chuyên ngành
Phương pháp quản trị hệ thống xử lý toàn bộ cấu trúc máy chủ, mạng và lưu trữ như các tệp phần mềm có kiểm soát phiên bản và tự động hóa.

## Ví dụ
Một tệp Terraform khai báo mạng đám mây gồm hai mạng con nội bộ và cơ sở dữ liệu PostgreSQL, chỉ cần chạy lệnh là tạo ra môi trường thử nghiệm hoàn toàn giống thật.
