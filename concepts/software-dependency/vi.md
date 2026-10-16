---
label: "Dependency"
qualifier: "(Phần mềm)"
aliases:
  - "Phụ thuộc phần mềm"
  - "Software dependency"
loanwords:
  - "dependency"
  - "software dependency"
autolink:
  label: never
plain_descriptions:
  - "gói phần mềm hoặc thư viện bên ngoài mà ứng dụng cần có để chạy được"
  - "mã nguồn của bên thứ ba được đưa vào dự án để sử dụng lại tính năng"
summary: "Gói mã nguồn, thư viện hoặc dịch vụ bên ngoài mà một chương trình phần mềm cần dựa vào để có thể biên dịch, vận hành hoặc hoàn thành chức năng."
confusable_notes:
  {}
follow_up_questions:
  - "Các phụ thuộc gián tiếp (transitive dependencies) làm gia tăng rủi ro bảo mật cho dự án ra sao?"
  - "File khóa phiên bản (lockfile) đóng vai trò gì trong việc cố định môi trường cài đặt giữa các máy tính?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như các linh kiện mua ngoài khi lắp ráp ô tô: nhà máy sản xuất xe không tự đúc lốp hay làm kính chắn gió từ đầu mà mua sẵn từ các nhà cung ứng chuyên biệt.

## Chi tiết
Lập trình hiện đại tận dụng các trình quản lý gói như npm, Maven hay NuGet để tự động tải về các thư viện phụ thuộc được khai báo trong tệp cấu hình. Phụ thuộc có thể là trực tiếp hoặc gián tiếp. Việc quản lý phụ thuộc đòi hỏi kiểm soát chặt chẽ các rủi ro về lỗ hổng bảo mật, xung đột phiên bản và giấy phép sử dụng mã nguồn mở.

## Định nghĩa chuyên ngành
Mối quan hệ liên kết cấu trúc trong đó một thành phần phần mềm yêu cầu sự hiện diện và giao diện của các module hoặc gói nhị phân ngoại vi để thực thi.

## Ví dụ
Ứng dụng thương mại điện tử khai báo thư viện xử lý ngày tháng date-fns và thư viện mã hóa bcrypt làm các dependency trong tệp package.json.
