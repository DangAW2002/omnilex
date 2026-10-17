---
label: "Service worker"
aliases:
  - "tiến trình dịch vụ ngầm"
loanwords:
  - "Service worker"
autolink:
  label: auto
plain_descriptions:
  - "tệp mã chạy ngầm hoạt động như người gác cổng trung gian giữa trình duyệt và mạng internet"
  - "công nghệ chạy nền giúp trang web hoạt động ngoại tuyến và nhận tin nhắn thông báo"
summary: "Kịch bản chạy nền điều khiển sự kiện, đóng vai trò trạm đại diện (proxy) đánh chặn các yêu cầu mạng và quản lý bộ nhớ đệm."
confusable_notes: {}
follow_up_questions:
  - "Vòng đời của một service worker gồm những giai đoạn nào từ lúc cài đặt đến khi kích hoạt?"
  - "Chiến lược ưu tiên bộ nhớ đệm (Cache-First) khác chiến lược ưu tiên mạng (Network-First) ở điểm nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Service worker giống như một người quản gia túc trực giữa trình duyệt và thế giới internet: mỗi khi bạn cần tải một bức ảnh, người quản gia sẽ xem trong tủ đồ nhà bạn trước, nếu có sẵn thì lấy ra dùng ngay mà không cần đi chợ.

## Chi tiết
Service worker là một dạng Web Worker chạy trên một luồng riêng biệt, không chạm trực tiếp vào cây DOM của giao diện. Nó đóng vai trò như một proxy lập trình được ngay trên trình duyệt, có quyền bắt giữ mọi yêu cầu mạng (fetch event). Lập trình viên có thể dùng API Cache Storage để trả về tài nguyên có sẵn khi mất mạng, cũng như nhận thông báo đẩy khi người dùng đã đóng trang web.

## Định nghĩa chuyên ngành
Tiến trình nền hướng sự kiện tách biệt khỏi luồng chính của trang web, cung cấp khả năng can thiệp lưu lượng mạng và hỗ trợ các tính năng ngoại tuyến.

## Ví dụ
Khi người dùng đang đi tàu ngầm mất sóng, service worker bắt lấy yêu cầu tải trang báo và lấy phiên bản lưu tạm trong bộ nhớ máy để hiển thị bài đọc không bị ngắt quãng.
