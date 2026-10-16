---
label: Biến môi trường
aliases:
  - Env var
  - Environment variable
loanwords:
  - environment variable
  - env var
plain_descriptions:
  - cài đặt dạng khóa - giá trị lưu bên ngoài mã nguồn để điều chỉnh hành vi của phần mềm trên từng máy chủ
  - các biến cấu hình do hệ điều hành cung cấp cho ứng dụng khi khởi động
summary: >-
  Cặp giá trị khóa - giá trị động được lưu trữ trong môi trường hệ điều hành dùng để cấu hình hành vi của chương trình
  mà không cần sửa mã nguồn.
confusable_notes: {}
follow_up_questions:
  - Vì sao phương pháp luận Twelve-Factor App khuyến nghị lưu trữ toàn bộ cấu hình trong biến môi trường?
  - Các hệ thống điều phối container truyền biến môi trường an toàn vào tiến trình ứng dụng bằng cách nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Bi%E1%BA%BFn_m%C3%B4i_tr%C6%B0%E1%BB%9Dng
    accessed: '2026-10-16'
    note: >-
      Trang bách khoa toàn thư tiếng Việt định nghĩa biến môi trường là một giá trị được đặt tên có thể ảnh hưởng đến
      cách tiến trình chạy
---

## Giải thích dễ hiểu
Giống như việc dán một mẩu giấy ghi chú lên bàn làm việc: người quản lý dán nhãn "Khu vực: Tầng 3", nhân viên chỉ cần đọc nhãn đó là biết mình đang ngồi đâu mà không cần sửa đổi sổ tay nhân viên.

## Chi tiết
Biến môi trường giúp tách biệt hoàn toàn phần cấu hình ra khỏi mã nguồn ứng dụng. Lập trình viên thiết lập các biến như `PORT=8080` hay `NODE_ENV=production`. Khi tiến trình con được sinh ra, nó kế thừa các biến từ hệ điều hành, giúp các công cụ CI/CD dễ dàng nạp thông số phù hợp cho từng môi trường máy chủ.

## Định nghĩa chuyên ngành
Bảng ánh xạ chuỗi khóa - giá trị ở cấp tiến trình được duy trì trong bộ nhớ hệ điều hành và được truyền lại cho các tiến trình con nhằm tham số hóa quá trình thực thi.

## Ví dụ
Khai báo `PORT=3000` trước khi khởi động máy chủ web, giúp cùng một tệp chương trình chạy được trên cả máy cá nhân lẫn máy chủ đám mây mà không cần sửa mã nguồn.
