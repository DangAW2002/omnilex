---
label: Image
qualifier: (Container)
aliases:
  - Container image
  - Docker image
  - Ảnh vùng chứa
loanwords:
  - image
  - container image
plain_descriptions:
  - bản khuôn mẫu đóng băng dùng để tạo ra các container đang chạy
  - gói tệp chỉ đọc chứa sẵn mã nguồn, thư viện hệ thống và lệnh khởi động
summary: >-
  Gói tệp chỉ đọc bất biến chứa mã nhị phân, thư viện phụ thuộc, cấu hình và siêu dữ liệu cần thiết để khởi chạy một
  container.
confusable_notes:
  software-container: >-
    Container image là bản lưu trữ tĩnh bất biến chứa mã nguồn và môi trường thực thi, còn container là tiến trình đang
    chạy được khởi tạo từ image đó.
follow_up_questions:
  - Kiến trúc hệ thống tệp phân tầng giúp tiết kiệm dung lượng ổ đĩa và băng thông mạng ra sao?
  - Vì sao việc dùng image gốc tối giản lại là thực hành chuẩn trong môi trường sản xuất?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
autolink:
  label: never
---

## Giải thích dễ hiểu
Giống như một công thức làm bánh trong sách dạy nấu ăn: công thức nằm yên bất biến trên trang giấy, nhưng bạn có thể dùng nó để nướng ra hàng trăm chiếc bánh y hệt nhau.

## Chi tiết
Container image được tạo thành từ các lớp tệp tin xếp chồng lên nhau tương ứng với từng chỉ lệnh xây dựng. Mỗi tầng ghi lại những tệp tin được thêm mới hoặc chỉnh sửa. Do các tầng được định danh theo mã băm nội dung và dùng chung giữa các image trên ổ cứng, việc tải image mới chỉ cần kéo về những tầng có sự thay đổi.

## Định nghĩa chuyên ngành
Gói dữ liệu hệ thống tệp chuẩn hóa kết hợp các lớp chỉ đọc với tệp cấu hình JSON khai báo điểm khởi chạy và các biến môi trường mặc định.

## Ví dụ
Một container image có nhãn `node:20-alpine` chứa hệ điều hành Linux siêu nhỏ cùng môi trường Node.js với tổng dung lượng chỉ khoảng 50 MB.
