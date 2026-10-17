---
label: Artifact
qualifier: (Build)
aliases:
  - Tạo phẩm đóng gói
  - Thành phẩm build
loanwords:
  - artifact
autolink:
  label: never
plain_descriptions:
  - tệp tin nhị phân hoặc gói phần mềm hoàn chỉnh được tạo ra sau khi biên dịch mã nguồn
  - sản phẩm đầu ra của quy trình build sẵn sàng để kiểm thử hoặc cài đặt lên máy chủ
summary: >-
  Tệp hoặc tập hợp các tệp được sinh ra từ quá trình xây dựng mã nguồn nhằm phục vụ lưu trữ, kiểm thử hoặc triển khai vào môi trường vận hành.
confusable_notes: {}
follow_up_questions:
  - "Tại sao tạo phẩm đóng gói cần phải có tính bất biến và được gắn mã phiên bản rõ ràng?"
  - "Kho lưu trữ artifact chuyên dụng có vai trò gì khác biệt so với kho lưu trữ mã nguồn Git?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như ổ bánh mì đã nướng chín và dán nhãn hạn sử dụng: bột và công thức là mã nguồn, nhưng chính ổ bánh hoàn chỉnh mới là thứ được chuyển tới tay người mua.

## Chi tiết
Trong kỹ thuật phần mềm, artifact là sản phẩm đầu ra hoàn chỉnh sinh ra từ quá trình biên dịch, tối ưu hóa và đóng gói mã nguồn. Các dạng phổ biến bao gồm tệp nén JAR trong Java, tệp nhị phân chạy trực tiếp của Go, gói Debian hoặc tệp cài đặt di động APK. Quy trình CI/CD tạo ra các gói này, chạy kiểm thử xác nhận chất lượng rồi tải lên kho quản lý tạo phẩm chuyên dụng như Nexus hay Artifactory. Việc lưu trữ tạo phẩm cố định đảm bảo tệp phần mềm đã kiểm thử ở môi trường thử nghiệm chính là tệp được triển khai trên máy chủ thực tế mà không cần biên dịch lại.

## Định nghĩa chuyên ngành
Tập tin nhị phân hoặc gói ứng dụng có phiên bản cụ thể được tạo ra từ chuỗi tích hợp liên tục nhằm phục vụ triển khai và lưu trữ lâu dài.

## Ví dụ
Dây chuyền CI đóng gói ứng dụng web thành tệp nén chứa mã nhị phân và tệp tĩnh, đánh số phiên bản 1.5.0 rồi lưu vào kho nội bộ để chuyển sang bước triển khai.
