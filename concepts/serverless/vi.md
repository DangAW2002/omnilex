---
label: Serverless
aliases:
  - Điện toán không máy chủ
  - Kiến trúc không máy chủ
loanwords:
  - serverless
plain_descriptions:
  - chạy mã nguồn trên đám mây mà không cần thuê, cài đặt hay lo quản lý máy chủ
  - mô hình tính toán đám mây chỉ tính tiền chính xác theo số phần nghìn giây chương trình thực sự chạy
summary: >-
  Mô hình điện toán đám mây trong đó nhà cung cấp tự động quản lý hạ tầng máy chủ và chỉ tính phí theo lượng tài nguyên
  thực tế tiêu thụ khi mã chạy.
confusable_notes: {}
follow_up_questions:
  - Nguyên nhân gây ra hiện tượng khởi động nguội (cold start) trong serverless là gì và khắc phục ra sao?
  - Vì sao kiến trúc không trạng thái (stateless) là điều kiện bắt buộc để hàm serverless mở rộng quy mô?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như việc đi taxi thay vì mua ô tô riêng: bạn không phải lo rửa xe, thay dầu hay tìm chỗ đỗ xe; bạn chỉ việc lên xe đi đúng quãng đường mình cần rồi trả tiền theo đồng hồ.

## Chi tiết
Dù mang tên "không máy chủ", hệ thống vẫn chạy trên máy chủ thật nhưng nhà cung cấp đám mây lo toàn bộ việc vá lỗi bảo mật, cài đặt và dự trù phần cứng. Các hàm được kích hoạt theo sự kiện (như có người tải ảnh lên hoặc gửi yêu cầu API), tự động nhân bản từ 0 lên hàng ngàn tiến trình và tự hạ về 0 khi không có việc.

## Định nghĩa chuyên ngành
Kiến trúc điện toán đám mây hướng sự kiện trừu tượng hóa toàn bộ việc cấp phát hạ tầng, có khả năng co giãn tự động theo từng yêu cầu và tính cước theo mức tiêu thụ.

## Ví dụ
Một hàm thu nhỏ kích thước ảnh trên AWS Lambda tự động chạy mỗi khi có người tải ảnh đại diện lên, chỉ tốn vài đồng cho mỗi lần kích hoạt.
