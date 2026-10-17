---
label: Command Query Responsibility Segregation (CQRS)
aliases:
  - CQRS
loanwords:
  - command query responsibility segregation (cqrs)
  - cqrs
autolink:
  aliases:
    CQRS: always
plain_descriptions:
  - tách biệt hoàn toàn nhánh ghi dữ liệu và nhánh đọc dữ liệu thành hai mô hình riêng
  - mẫu kiến trúc dùng các luồng khác nhau để thay đổi và tra cứu thông tin
summary: Mẫu kiến trúc phân chia rạch ròi các thao tác cập nhật trạng thái dữ liệu (lệnh ghi) và các thao tác tra cứu dữ liệu (truy vấn) thành hai mô hình xử lý độc lập.
confusable_notes:
  event-sourcing: CQRS phân tách hai mô hình đọc và ghi riêng biệt và hoàn toàn có thể chạy trên cơ sở dữ liệu quan hệ thông thường, trong khi Event Sourcing nói về cách lưu trữ lịch sử biến động bằng luồng sự kiện bất biến.
follow_up_questions:
  - Cơ chế đồng bộ nào đảm bảo tính nhất quán cuối cùng (eventual consistency) giữa cơ sở dữ liệu ghi và các bảng chiếu đọc?
  - Trong những kịch bản nghiệp vụ nào thì sự phức tạp của CQRS mang lại lợi ích thực tế xứng đáng?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như trong nhà hàng: phiếu đặt món do bồi bàn ghi được gửi thẳng vào bếp để đầu bếp xào nấu, còn quyển thực đơn in tranh đẹp ngoài sảnh chỉ dùng riêng để khách xem và chọn món cho nhanh.

## Chi tiết
Trong phần mềm truyền thống, một mô hình dữ liệu duy nhất vừa phải gánh việc ghi nhận cập nhật vừa phải phục vụ các truy vấn tìm kiếm phức tạp, gây nghẽn bảng và cạnh tranh khóa dữ liệu. Mẫu CQRS chia đôi hệ thống: Nhánh Lệnh (Command) chịu trách nhiệm kiểm tra nghiệp vụ và ghi nhận dữ liệu vào kho lưu trữ nguồn; Nhánh Truy vấn (Query) đọc từ các kho dữ liệu đã được làm phẳng và tối ưu riêng (như Redis hay Elasticsearch). Dữ liệu giữa hai bên được đồng bộ bất đồng bộ, giúp hệ thống chịu tải đọc cực lớn một cách độc lập.

## Định nghĩa chuyên ngành
Mẫu thiết kế kiến trúc phân tách các thao tác thay đổi trạng thái (Lệnh) khỏi các thao tác đọc dữ liệu (Truy vấn), sử dụng các cấu trúc lược đồ và đường truyền chuyên biệt cho từng bên.

## Ví dụ
Hệ thống đặt vé máy bay ghi nhận đặt chỗ vào cơ sở dữ liệu giao dịch khóa chặt chẽ, đồng thời đồng bộ trạng thái ghế sang bộ nhớ đệm phục vụ 20.000 lượt tìm kiếm chuyến bay mỗi giây của hành khách.
