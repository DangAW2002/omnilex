---
label: System prompt
aliases: []
loanwords:
  - system prompt
plain_descriptions:
  - lời dặn ngầm ứng dụng đưa cho AI trước khi mình bắt đầu chat
  - bộ quy tắc đặt vai trò và giọng điệu cho trợ lý
summary: Phần chỉ dẫn đặt trước cuộc hội thoại, quy định vai trò, quy tắc và giọng văn của mô hình cho mọi tin nhắn sau đó.
confusable_notes: {}
follow_up_questions:
  - Người dùng có thể vượt qua system prompt không?
  - Nội dung nào nên để trong system prompt thay vì tin nhắn của người dùng?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống buổi dặn dò cho một lễ tân mới trước khi vị khách đầu tiên đến: đại diện cho công ty nào, được hứa những gì và nói chuyện trang trọng tới mức nào.

## Chi tiết
Các API chat tách tin nhắn system ra khỏi lượt của người dùng và của trợ lý. Nhà phát triển dùng nó để đặt vai trò, giới hạn, giọng điệu và thông tin nền. Mô hình thường coi trọng phần này hơn văn bản người dùng gõ, nhưng nó không phải là hàng rào bảo mật: người dùng vẫn có thể tìm cách vượt qua bằng prompt injection.

## Định nghĩa chuyên ngành
Khối chỉ dẫn đưa cho mô hình chat bên ngoài các lượt của người dùng, xác định vai trò, hành vi và bối cảnh cho cả cuộc hội thoại.

## Ví dụ
Chatbot của một ngân hàng số được dặn trong system prompt chỉ trả lời về các loại thẻ của ngân hàng, bằng tiếng Việt, và chuyển câu hỏi về tài khoản cho nhân viên.
