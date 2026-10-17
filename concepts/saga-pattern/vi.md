---
label: Saga pattern
aliases:
  - Mẫu Saga
  - Giao dịch phân tán Saga
loanwords:
  - saga pattern
plain_descriptions:
  - xử lý giao dịch qua nhiều dịch vụ bằng chuỗi các bước cục bộ nối tiếp nhau
  - quy trình thanh toán nhiều bước tự chạy hành động bù trừ để hoàn tác khi lỗi
summary: Mẫu thiết kế quản lý các giao dịch phân tán trải dài trên nhiều dịch vụ độc lập thông qua chuỗi giao dịch cục bộ kèm theo các hành động bù trừ để phục hồi trạng thái khi gặp sự cố.
confusable_notes: {}
follow_up_questions:
  - Những điểm đánh đổi chính giữa mẫu Saga tự phối hợp (choreography) và Saga có bộ điều phối (orchestration) là gì?
  - Các giao dịch bù trừ xử lý những tác vụ ngoài không thể hoàn tác như gửi email thông báo khách hàng ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như đặt tour du lịch: bạn đặt vé máy bay, đặt phòng khách sạn rồi thuê ô tô; nếu bước cuối xe hết chỗ thuê, bạn phải hủy phòng khách sạn và hủy vé máy bay để nhận lại tiền.

## Chi tiết
Trong hệ thống vi dịch vụ phân tán, việc dùng cơ chế khóa hai pha (2PC) truyền thống sẽ gây nghẽn mạng và khóa cứng cơ sở dữ liệu. Mẫu Saga giải quyết bài toán này bằng cách chia giao dịch lớn thành chuỗi các giao dịch cục bộ diễn ra tuần tự tại từng dịch vụ. Mỗi bước hoàn thành sẽ cập nhật dữ liệu của riêng mình rồi phát thông điệp kích hoạt bước tiếp theo. Nếu bất kỳ khâu nào thất bại, hệ thống sẽ tự động kích hoạt các giao dịch bù trừ (compensating transaction) theo thứ tự ngược lại để hoàn trả trạng thái ban đầu.

## Định nghĩa chuyên ngành
Mẫu thiết kế kiến trúc duy trì tính nhất quán cuối cùng giữa các dịch vụ phân tán bằng chuỗi giao dịch cơ sở dữ liệu cục bộ kết hợp các hành động hoàn tác bù trừ rõ ràng.

## Ví dụ
Một chu trình đặt hàng thực hiện trừ tiền thẻ, giữ hàng trong kho và tạo vận đơn; khi khâu kho báo hết hàng, một giao dịch bù trừ lập tức kích hoạt hoàn trả lại toàn bộ tiền vào thẻ ngân hàng của khách.
