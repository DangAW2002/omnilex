---
label: "Feature flag"
aliases:
  - "Cờ tính năng"
  - "Feature toggle"
loanwords:
  - "feature flag"
  - "feature toggle"
plain_descriptions:
  - "công tắc phần mềm bật hoặc tắt một tính năng mà không cần triển khai lại mã nguồn"
  - "cờ cấu hình cho phép mở dần tính năng mới cho từng nhóm người dùng nhất định"
summary: "Kỹ thuật phát triển phần mềm cho phép bật hoặc tắt các chức năng ngay trong thời gian chạy thông qua cấu hình mà không cần biên dịch hay triển khai lại mã nguồn."
confusable_notes:
  {}
follow_up_questions:
  - "Quy trình quản trị nào giúp ngăn ngừa các cờ tính năng tạm thời trở thành nợ kỹ thuật tồn đọng trong mã nguồn?"
  - "Cờ phát hành (release toggle) khác biệt như thế nào so với cờ thử nghiệm (experiment toggle) và cờ phân quyền?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Công tắc đèn trên tường: đường dây điện và bóng đèn đã lắp đặt sẵn, bạn chỉ việc bấm công tắc để bật hoặc tắt ánh sáng bất cứ khi nào cần mà không phải gọi thợ đến lắp lại.

## Chi tiết
Cờ tính năng tách biệt việc triển khai mã nguồn (deployment) khỏi việc kích hoạt tính năng cho người dùng (release). Lập trình viên có thể đưa mã vào nhánh chính ẩn sau một điều kiện kiểm tra cờ, hỗ trợ triển khai thăm dò (canary release), thử nghiệm A/B hoặc làm công tắc ngắt khẩn cấp khi hệ thống quá tải. Quản trị viên có thể đổi trạng thái cờ qua giao diện điều khiển trong vài giây.

## Định nghĩa chuyên ngành
Cơ chế điều khiển động trong kiến trúc phần mềm thực thi các rẽ nhánh điều kiện dựa trên ngữ cảnh thời gian chạy để điều chỉnh năng lực hệ thống mà không cần tái phân phối tệp nhị phân.

## Ví dụ
Một sàn thương mại điện tử bật giao diện giỏ hàng mới cho 10% khách hàng tại Hà Nội dùng thử để theo dõi độ mượt trước khi áp dụng cho toàn quốc.
