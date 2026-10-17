---
label: "localStorage"
aliases:
  - "Web Storage"
  - "bộ nhớ cục bộ"
loanwords:
  - "localStorage"
autolink:
  label: auto
plain_descriptions:
  - "ngăn chứa trong trình duyệt nơi trang web ghi nhớ sở thích của bạn vĩnh viễn"
  - "bộ nhớ lưu trữ dữ liệu dạng khóa - giá trị không bị mất đi khi đóng tab"
summary: "Giao diện lưu trữ dữ liệu phía trình duyệt cho phép lưu các cặp khóa - giá trị lâu dài theo từng tên miền mà không có thời hạn hết hạn."
confusable_notes:
  browser-cache: "localStorage lưu chuỗi dữ liệu do mã JavaScript chủ động ghi, còn bộ nhớ đệm trình duyệt lưu các tệp tài nguyên mạng dựa theo tiêu đề phản hồi HTTP."
follow_up_questions:
  - "localStorage khác gì so với sessionStorage và Cookie về giới hạn dung lượng và thời gian tồn tại?"
  - "Tại sao không nên lưu trữ các mã token bảo mật quan trọng vào localStorage?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
localStorage giống như một ngăn kéo nhỏ của trang web dành riêng cho bạn trong trình duyệt: bạn cất vào đó tùy chọn giao diện tối hay giỏ hàng tạm thì lần sau mở máy ra mọi thứ vẫn nằm nguyên ở đó.

## Chi tiết
Là một phần của tiêu chuẩn Web Storage, localStorage cung cấp bộ lưu trữ khóa - giá trị đồng bộ được phân lập theo từng nguồn gốc (origin: giao thức, tên miền và cổng). Dữ liệu trong localStorage tồn tại vô thời hạn, không bị xóa khi tắt trình duyệt hay khởi động lại máy, trừ khi người dùng chủ động xóa lịch sử. Dung lượng thông thường khoảng 5MB cho mỗi trang web.

## Định nghĩa chuyên ngành
Cơ chế lưu trữ cặp khóa - giá trị đồng bộ bền vững phía máy khách, gắn liền với phạm vi nguồn gốc web (same-origin policy).

## Ví dụ
Đoạn mã localStorage.setItem("preferred_lang", "vi") giúp trang web nhớ rằng người dùng luôn muốn hiển thị giao diện tiếng Việt trong những lần sau.
