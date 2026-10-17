---
label: Clean architecture
aliases:
  - Kiến trúc sạch
loanwords:
  - clean architecture
plain_descriptions:
  - xếp tầng mã nguồn sao cho nghiệp vụ cốt lõi không bị trói buộc vào cơ sở dữ liệu hay thư viện
  - cách tổ chức code với các lớp phụ thuộc hướng vào trong để dễ dàng thay đổi công nghệ bên ngoài
summary: Mô hình kiến trúc phần mềm tổ chức thành các vòng tròn đồng tâm với nguyên tắc phụ thuộc nghiêm ngặt hướng vào trong, giúp lõi nghiệp vụ hoàn toàn độc lập với khung phát triển và giao diện ngoài.
confusable_notes: {}
follow_up_questions:
  - Nguyên lý đảo ngược phụ thuộc (DIP) giúp áp đặt quy tắc hướng vào trong của Clean Architecture như thế nào?
  - Khi nào chi phí chuyển đổi mô hình dữ liệu qua lại giữa các tầng bắt đầu làm giảm năng suất phát triển?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như củ hành tây có nhiều lớp vỏ bọc bảo vệ: phần nhân trong cùng là ý tưởng kinh doanh thuần túy, còn các lớp vỏ ngoài là công cụ nấu nướng gia vị có thể thay đổi tùy ý mà không làm đổi chất của nhân.

## Chi tiết
Được đề xướng bởi Robert C. Martin, Kiến trúc sạch tổ chức mã nguồn theo các vòng tròn đồng tâm: Thực thể (Entity) ở trung tâm, bao quanh bởi Ca sử dụng (Use Case), Bộ chuyển đổi giao diện (Adapters) và ngoài cùng là Khung phát triển cùng Cơ sở dữ liệu. Quy tắc phụ thuộc cốt lõi quy định mã nguồn chỉ được phép trỏ hướng vào trong về phía chính sách nghiệp vụ. Lõi nghiệp vụ không được phụ thuộc vào thư viện giao diện hay cơ sở dữ liệu ngoài, mà các tầng ngoài phải cài đặt các giao diện trừu tượng do tầng trong định nghĩa.

## Định nghĩa chuyên ngành
Mô hình kiến trúc lấy miền nghiệp vụ làm trung tâm, áp đặt dòng phụ thuộc nghiêm ngặt hướng vào trong, đảm bảo logic nghiệp vụ hoàn toàn độc lập với cơ chế lưu trữ và phương thức phân phối.

## Ví dụ
Một ứng dụng ngân hàng đặt toàn bộ công thức tính lãi vay trong tầng thực thể lõi, cho phép các kỹ sư thay thế cơ sở dữ liệu từ PostgreSQL sang MongoDB mà không phải sửa một dòng mã tính lãi nào.
