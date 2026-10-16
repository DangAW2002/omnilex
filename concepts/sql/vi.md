---
label: SQL
aliases:
  - Structured Query Language
loanwords:
  - sql
autolink:
  label: always
plain_descriptions:
  - ngôn ngữ tiêu chuẩn dùng để tra cứu và chỉnh sửa thông tin trong các cơ sở dữ liệu quan hệ
  - các câu lệnh dùng để tìm kiếm, lọc và thêm dữ liệu vào các bảng MySQL hay PostgreSQL
summary: Ngôn ngữ lập trình khai báo chuẩn hóa được sử dụng để quản lý, truy vấn và thao tác trên dữ liệu trong các hệ quản trị cơ sở dữ liệu quan hệ.
confusable_notes: {}
follow_up_questions:
  - Bộ lập kế hoạch truy vấn SQL quyết định quét chỉ mục hay quét toàn bảng dựa trên các tiêu chí nào?
  - Điểm khác biệt trong việc tuân thủ chuẩn ANSI SQL giữa PostgreSQL và Microsoft SQL Server là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như bạn đưa ra một yêu cầu rõ ràng cho thủ thư: "Hãy tìm cho tôi tất cả sách của tác giả Nam Cao xuất bản trước năm 1945 và xếp theo bảng chữ cái."

## Chi tiết
SQL là ngôn ngữ khai báo: người dùng chỉ cần chỉ định dữ liệu mình muốn lấy là gì, máy chủ sẽ tự tính toán cách truy xuất tối ưu nhất. Các nhóm lệnh gồm truy vấn (SELECT), thao tác dữ liệu (INSERT, UPDATE, DELETE) và định nghĩa bảng (CREATE, ALTER).

## Định nghĩa chuyên ngành
Ngôn ngữ chuyên biệt được chuẩn hóa quốc tế theo chuẩn ANSI/ISO dùng để quản lý và truy xuất dữ liệu trong các mô hình cơ sở dữ liệu dạng bảng.

## Ví dụ
Chạy câu lệnh `SELECT ho_ten, so_dien_thoai FROM khach_hang WHERE thanh_pho = 'Ha Noi';` để lấy danh sách khách hàng tại Hà Nội.
