---
label: "Technical debt"
aliases:
  - "Nợ kỹ thuật"
loanwords:
  - "technical debt"
plain_descriptions:
  - "cái giá phải trả trong tương lai vì chọn cách viết mã tạm bợ để kịp tiến độ"
  - "sự chậm chạp của dự án phần mềm do tích tụ những giải pháp chắp vá trước đó"
summary: "Chi phí tiềm ẩn phát sinh trong tương lai khi đội ngũ lựa chọn giải pháp viết mã nhanh chóng, chắp vá thay vì xây dựng kiến trúc chuẩn mực."
confusable_notes:
  {}
follow_up_questions:
  - "Đội ngũ kỹ thuật làm sao để cân bằng giữa áp lực ra mắt tính năng nhanh và kiểm soát nợ kỹ thuật?"
  - "Dấu hiệu nào cho thấy chi phí trả lãi nợ kỹ thuật đang kìm hãm tốc độ phát triển sản phẩm?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như vay tiền ngân hàng: bạn mượn thời gian để kịp ra mắt sản phẩm sớm, nhưng hàng tháng bạn phải trả tiền lãi là sự chậm chạp và lỗi vặt cho đến khi dành thời gian trả nợ gốc bằng việc sửa lại mã nguồn.

## Chi tiết
Khái niệm do Ward Cunningham khởi xướng để mô tả hậu quả của các giải pháp tình thế. Việc bỏ qua viết kiểm thử, lạm dụng mã cứng hoặc bỏ qua thiết kế module giúp đạt mục tiêu ngắn hạn. Dần dần, mỗi thay đổi mới đều tốn nhiều công sức để gỡ rối, làm chi phí bảo trì và rủi ro lỗi tăng vọt.

## Định nghĩa chuyên ngành
Phần thiếu hụt cấu trúc tiềm tàng trong cơ sở mã bắt nguồn từ các thỏa hiệp kỹ thuật ngắn hạn, gây suy giảm năng suất và gia tăng chi phí vận hành cho đến khi được xử lý triệt để.

## Ví dụ
Nhóm kỹ thuật viết mã cứng các bước thanh toán thẻ để kịp đợt khuyến mãi Tết, khiến việc tích hợp ví điện tử MoMo sau đó mất cả tháng tái cấu trúc thay vì chỉ mất vài ngày.
