---
label: Prompt caching
aliases: []
loanwords:
  - prompt caching
plain_descriptions:
  - lưu sẵn phần đầu không đổi của prompt để các lần gọi sau rẻ và nhanh hơn
  - không phải trả đủ tiền mỗi lần gửi lại cùng một đoạn chỉ dẫn dài
summary: Tính năng của nhà cung cấp giữ lại phần mở đầu đã xử lý của prompt, nhờ đó các yêu cầu sau bắt đầu giống hệt sẽ rẻ và nhanh hơn.
confusable_notes: {}
follow_up_questions:
  - Vì sao phần ổn định của prompt nên đặt lên đầu?
  - Một phần prompt đã cache thường được giữ trong bao lâu?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống một bếp ăn nấu sẵn phần nền mà món nào cũng dùng, khách gọi món thì chỉ cần làm thêm phần topping.

## Chi tiết
System prompt dài, tài liệu và định nghĩa công cụ thường giữ nguyên qua nhiều lần gọi. Khi bật cache, nhà cung cấp giữ trạng thái đã xử lý của phần mở đầu đó trong một khoảng thời gian; yêu cầu sau mở đầu y hệt sẽ dùng lại và được tính giá thấp hơn. Chỉ cần thay đổi một chút trong phần đã cache là phải xử lý lại từ đầu, nên phần ổn định luôn đặt trước.

## Định nghĩa chuyên ngành
Việc dùng lại trạng thái mô hình đã tính cho cùng một phần mở đầu của prompt qua nhiều yêu cầu, giúp giảm độ trễ và chi phí token đầu vào.

## Ví dụ
Chatbot hỗ trợ gửi kèm bản hướng dẫn sử dụng 50 trang với mỗi câu hỏi; có cache thì lần gọi đầu ghi tài liệu vào cache, các lần gọi sau trong thời gian cache còn hiệu lực đọc lại với giá thấp hơn nhiều.
