---
label: Deadlock
aliases:
  - khóa chết
  - bế tắc
loanwords:
  - Deadlock
plain_descriptions:
  - tình trạng tê liệt khi hai chương trình mải chờ tài nguyên của nhau mà không chịu nhường
  - cảnh ùn tắc giao thông trong bộ nhớ khi các giao dịch giữ khóa chặn nhau không thể tiếp tục
summary: Tình trạng bế tắc vĩnh viễn khi hai hoặc nhiều tiến trình đồng thời cùng giữ một tài nguyên và chờ đợi tài nguyên do tiến trình kia nắm giữ.
confusable_notes: {}
follow_up_questions:
  - Thuật toán phát hiện deadlock trong cơ sở dữ liệu dùng đồ thị chờ (wait-for graph) và tìm chu trình ra sao?
  - Quy ước lập trình nào, như việc sắp xếp thứ tự xin khóa nhất quán, giúp chủ động phòng tránh deadlock?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như hai chiếc xe đi vào một cây cầu hẹp chỉ vừa một làn từ hai hướng ngược nhau: không tài xế nào chịu lùi xe nhường đường, kết quả là cả hai xe đều bị kẹt cứng mãi mãi trên cầu.

## Chi tiết
Trong cơ sở dữ liệu, deadlock xảy ra khi giao dịch T1 đang giữ khóa L1 và chờ xin khóa L2, trong khi giao dịch T2 đang giữ khóa L2 và chờ xin khóa L1. Do không bên nào có thể tiếp tục hoặc nhả khóa khi chưa xong việc, hệ quản trị cơ sở dữ liệu phải chạy tiến trình phát hiện deadlock định kỳ, phân tích đồ thị chờ đợi, phát hiện chu trình phụ thuộc và chủ động hủy bỏ (rollback) một giao dịch để giải phóng tài nguyên cho giao dịch còn lại.

## Định nghĩa chuyên ngành
Tình trạng chặn lẫn nhau vĩnh viễn trong thực thi đồng thời, trong đó hai hay nhiều luồng hoặc giao dịch bị mắc kẹt trong chu trình phụ thuộc vòng quanh các tài nguyên khóa không thể chia sẻ.

## Ví dụ
Giao dịch A cập nhật bản ghi 1 rồi chờ khóa bản ghi 2, trong khi giao dịch B cập nhật bản ghi 2 rồi chờ khóa bản ghi 1; máy chủ SQL phát hiện vòng lặp và tự động hủy giao dịch B với mã lỗi báo deadlock.
