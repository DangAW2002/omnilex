---
label: Zero-day vulnerability
aliases:
  - lỗ hổng zero-day
  - 0-day
loanwords:
  - zero-day vulnerability
autolink:
  aliases:
    0-day: always
plain_descriptions:
  - lỗi phần mềm mới bị phát hiện mà nhà sản xuất chưa kịp có bản vá sửa chữa
  - lỗ hổng bảo mật bí mật bị tin tặc khai thác trước khi lập trình viên kịp biết đến
summary: Lỗ hổng phần mềm chưa được công bố hoặc chưa có bản sửa lỗi từ nhà sản xuất, khiến người dùng không có thời gian chuẩn bị để phòng vệ.
confusable_notes: {}
follow_up_questions:
  - Quy trình công bố có trách nhiệm (responsible disclosure) giữa chuyên gia bảo mật và nhà phát triển phần mềm diễn ra ra sao?
  - Giải pháp vá ảo (virtual patching) trên tường lửa giúp ngăn chặn khai thác lỗ hổng zero-day khi chưa có bản vá chính thức như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một lối đi bí mật mới bị phát hiện dẫn thẳng vào bên dưới bức tường thành kiên cố: chỉ có những kẻ trộm biết về sự tồn tại của nó, còn lính canh thành hoàn toàn chưa có một ngày nào để kịp chuẩn bị gạch đá trám bít lỗ hổng trước khi bị đột nhập.

## Chi tiết
Thuật ngữ "zero-day" (ngày số không) ám chỉ số ngày mà nhà phát triển phần mềm đã biết về lỗi này để phát hành bản sửa chữa: đúng không ngày. Lỗ hổng zero-day là mối hiểm họa an ninh mạng cấp độ cao nhất do các phần mềm diệt virus so sánh chữ ký và tường lửa thông thường chưa có thông tin nhận dạng để chặn đứng mã khai thác. Các nhóm tin tặc tinh vi và thị trường mua bán lỗ hổng sẵn sàng trả hàng triệu đô la cho các mã khai thác zero-day phục vụ hoạt động do thám. Biện pháp ứng phó khẩn cấp dựa trên việc phát hiện hành vi bất thường, cô lập thiết bị bị ảnh hưởng và áp dụng vá ảo (virtual patching) qua tường lửa WAF trong khi chờ nhà sản xuất khẩn trương phát hành bản vá phần mềm chính thức.

## Định nghĩa chuyên ngành
Khiếm khuyết an ninh trong hệ thống thông tin hoặc phần mềm mà nhà phát triển chưa được biết đến, chưa tồn tại bản cập nhật giảm thiểu rủi ro hoặc bản vá chính thức nào được công bố.

## Ví dụ
Các chuyên gia an ninh phát hiện một nhóm tin tặc đang tích cực khai thác lỗ hổng zero-day thực thi mã từ xa trong trình duyệt web thông dụng, buộc hãng công nghệ phải phát hành khẩn cấp bản cập nhật phần mềm ngoài lịch định kỳ.
