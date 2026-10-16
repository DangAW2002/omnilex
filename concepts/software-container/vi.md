---
label: Container
qualifier: (Phần mềm)
aliases:
  - Hộp chứa phần mềm
loanwords:
  - container
plain_descriptions:
  - môi trường đóng gói gọn nhẹ chứa sẵn ứng dụng và thư viện để chạy ổn định ở mọi nơi
  - không gian cô lập giúp chạy phần mềm mà không cần cài đặt lại môi trường hệ thống
summary: >-
  Đơn vị phần mềm tiêu chuẩn đóng gói mã nguồn và toàn bộ phụ thuộc thực thi để chạy cách ly an toàn trên nhân hệ điều
  hành dùng chung.
confusable_notes:
  virtual-machine: >-
    Container chia sẻ nhân hệ điều hành của máy chủ và cô lập ứng dụng ở không gian người dùng, trong khi máy ảo đóng
    gói một hệ điều hành khách hoàn chỉnh chạy trên phần mềm ảo hóa (hypervisor).
  container-image: >-
    Container là một thực thể đang chạy với trạng thái thực thi tạm thời, còn container image là gói tệp chỉ đọc tĩnh
    dùng làm khuôn mẫu để khởi tạo container.
follow_up_questions:
  - Tính năng namespaces và cgroups trong nhân Linux hỗ trợ cô lập container như thế nào?
  - Vì sao container khởi động nhanh hơn nhiều so với máy ảo truyền thống?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
autolink:
  label: never
---

## Giải thích dễ hiểu
Tương tự như thùng container chở hàng: mỗi thùng chứa đầy đủ hàng hóa độc lập, xếp vừa vặn lên bất kỳ chuyến tàu nào mà không cần sửa đổi boong tàu.

## Chi tiết
Container phần mềm đạt được khả năng cô lập tiến trình nhẹ nhàng bằng cách tận dụng các tính năng sẵn có của hệ điều hành máy chủ thay vì giả lập phần cứng. Trên Linux, namespaces giúp tách biệt mã nhận diện tiến trình, cổng mạng và ổ đĩa, còn cgroups kiểm soát và giới hạn tài nguyên CPU cũng như RAM.

## Định nghĩa chuyên ngành
Cơ chế ảo hóa cấp hệ điều hành đóng gói môi trường thực thi, các lớp tệp tin và cây tiến trình độc lập dựa trên nhân máy chủ dùng chung.

## Ví dụ
Một dịch vụ web viết bằng Python Flask đi kèm các thư viện tương thích, chạy bên trong một container nhỏ gọn chiếm chưa tới 40 MB bộ nhớ RAM.
