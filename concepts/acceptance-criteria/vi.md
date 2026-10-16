---
label: "Acceptance criteria"
aliases:
  - "AC"
  - "Tiêu chí chấp nhận"
loanwords:
  - "acceptance criteria"
  - "ac"
autolink:
  aliases:
    AC: always
plain_descriptions:
  - "danh sách các điều kiện cụ thể mà một tính năng phải vượt qua để được tính là hoàn thành"
  - "quy tắc kiểm tra rõ ràng giúp lập trình viên và kiểm thử viên biết tính năng phải chạy đúng như thế nào"
summary: "Tập hợp các điều kiện và hành vi bắt buộc mà một user story cụ thể phải thỏa mãn để được Product Owner chấp thuận nghiệm thu."
confusable_notes:
  definition-of-done: "Acceptance criteria là tiêu chí nghiệp vụ riêng cho từng user story cụ thể, còn Definition of Done là bộ chuẩn mực kỹ thuật chung cho toàn bộ dự án."
follow_up_questions:
  - "Cấu trúc Given-When-Then hỗ trợ việc viết kịch bản kiểm thử tự động ra sao?"
  - "Những ai trực tiếp tham gia kiểm chứng tiêu chí chấp nhận trong suốt sprint?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Hãy coi tiêu chí chấp nhận như biên bản kiểm tra bàn giao nhà: khóa cửa chính phải mở trơn tru, vòi nước nóng phải chảy sau năm giây và cửa sổ phải cài chặt; nếu thiếu một mục thì bên mua sẽ chưa nhận bàn giao.

## Chi tiết
Acceptance criteria giúp loại bỏ những suy diễn mơ hồ bằng cách vạch rõ ranh giới việc gì cần làm và việc gì không nằm trong phạm vi của một tính năng. Tiêu chí này được Product Owner, lập trình viên và kiểm thử viên thảo luận kỹ trước khi bắt tay viết mã nguồn. Các nhóm thường áp dụng cấu trúc kịch bản "Given [tiền đề], When [hành động], Then [kết quả mong đợi]" để chuẩn hóa luồng xử lý và làm nền tảng viết mã kiểm thử tự động.

## Định nghĩa chuyên ngành
Các điều kiện tiên quyết và thông số hành vi xác định mà một thành phẩm phần mềm phải đáp ứng đầy đủ để được Product Owner chính thức nghiệm thu.

## Ví dụ
Với tính năng đặt lại mật khẩu: "Given email đã đăng ký, When người dùng bấm quên mật khẩu, Then hệ thống gửi đường dẫn xác thực một lần có hiệu lực trong 15 phút."
