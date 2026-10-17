---
label: GitHub Actions
aliases:
  - Quy trình tự động hóa GitHub
loanwords:
  - github actions
plain_descriptions:
  - công cụ tự động chạy kiểm thử và xuất bản phần mềm gắn liền với từng kho chứa GitHub
  - nền tảng thực thi chuỗi tác vụ trên máy ảo mỗi khi lập trình viên đẩy mã nguồn mới lên GitHub
summary: >-
  Nền tảng tích hợp và phân phối liên tục tích hợp sẵn trong GitHub cho phép tự động hóa quy trình xây dựng, kiểm thử và phát hành mã nguồn.
confusable_notes:
  jenkins: >-
    GitHub Actions là dịch vụ luồng công việc được quản lý trực tiếp trên GitHub, trong khi Jenkins là máy chủ tự động hóa mã nguồn mở tự lưu trữ trên hạ tầng riêng.
follow_up_questions:
  - "Khi nào doanh nghiệp nên tự vận hành máy chủ runner thay vì dùng máy ảo có sẵn của GitHub?"
  - "Cách tổ chức các action tái sử dụng giúp chuẩn hóa quy trình CI/CD giữa các dự án như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một dây chuyền kiểm tra tự động đặt cạnh giá để hồ sơ: mỗi khi có ai nộp tập tài liệu mới, hệ thống tự động kiểm tra lỗi chính tả rồi đóng dấu gửi đi.

## Chi tiết
GitHub Actions cho phép đội ngũ kỹ sư định nghĩa các luồng công việc bằng tệp YAML đặt trong thư mục .github/workflows của dự án. Quy trình được kích hoạt bởi các sự kiện như tạo pull request, đẩy nhánh mới hoặc lịch hẹn giờ. Mỗi quy trình bao gồm nhiều công việc chạy song song hoặc nối tiếp trên máy ảo Linux, Windows hoặc macOS do GitHub quản lý hoặc tự dựng. Kỹ sư có thể gọi các hành động có sẵn trên Marketplace để kiểm tra chất lượng mã nguồn, quét lỗ hổng bảo mật và tải gói thành phẩm lên máy chủ.

## Định nghĩa chuyên ngành
Nền tảng tự động hóa quy trình và CI/CD hướng sự kiện được nhúng trong GitHub, hỗ trợ thực thi tác vụ trên các máy chủ runner ảo hóa theo vòng đời kho mã nguồn.

## Ví dụ
Một nhóm lập trình thiết lập GitHub Actions để mỗi khi mở pull request, hệ thống sẽ tự động chạy 120 bài kiểm thử đơn vị và báo lỗi ngay trên giao diện nếu mã nguồn không đạt.
