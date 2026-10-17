---
label: Role-based access control (RBAC)
aliases:
  - RBAC
  - kiểm soát truy cập dựa trên vai trò
loanwords:
  - role-based access control (rbac)
autolink:
  aliases:
    RBAC: always
plain_descriptions:
  - gán quyền hạn hệ thống theo vị trí công việc thay vì cấp riêng cho từng nhân viên
  - quản lý quyền truy cập của người dùng qua các nhóm vai trò định sẵn
summary: Mô hình kiểm soát truy cập trong đó các quyền hạn được gom nhóm thành các vai trò và gán cho người dùng dựa trên nhiệm vụ của họ.
confusable_notes: {}
follow_up_questions:
  - Hiện tượng bùng nổ vai trò (role explosion) trong các tổ chức lớn xảy ra như thế nào và cách khắc phục?
  - Khi nào đội ngũ kỹ thuật nên chuyển từ RBAC sang mô hình kiểm soát truy cập dựa trên thuộc tính (ABAC)?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như bảng phân công tại một bệnh viện: thay vì phải lập danh sách chìa khóa phòng bệnh và quyền xem hồ sơ bệnh án riêng cho từng bác sĩ hay điều dưỡng mới vào, bệnh viện lập sẵn hồ sơ quyền cho chức danh "Bác sĩ" và "Điều dưỡng"; người mới đến chỉ cần được gán chức danh là có ngay các quyền tương ứng.

## Chi tiết
Trong mô hình RBAC, người quản trị gán các quyền thao tác trên tài nguyên cụ thể vào các vai trò trừu tượng thay vì gán trực tiếp vào từng tài khoản người dùng. Người dùng sau đó được thêm vào một hoặc nhiều vai trò thích hợp. Khi một nhân sự chuyển nhóm hoặc nghỉ việc, quản trị viên chỉ cần điều chỉnh tư cách thành viên vai trò thay vì phải chỉnh sửa hàng trăm quy tắc phân quyền riêng lẻ trên nhiều hệ thống khác nhau. RBAC giúp tinh gọn việc kiểm toán, duy trì tính nhất quán và là nền tảng của quản trị định danh doanh nghiệp.

## Định nghĩa chuyên ngành
Cơ chế kiểm soát truy cập trong đó các quyền hạn hệ thống được cấp phát dựa trên tư cách thành viên của chủ thể trong các vai trò nghiệp vụ được định nghĩa trước.

## Ví dụ
Cơ sở dữ liệu đám mây của doanh nghiệp cấp quyền đọc và ghi dữ liệu cho vai trò "Backend-Engineer", trong khi vai trò "Data-Analyst" chỉ được cấp quyền đọc để chạy báo cáo.
