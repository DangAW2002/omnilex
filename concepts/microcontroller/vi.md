---
label: Vi điều khiển
aliases:
  - "MCU"
loanwords:
  - "microcontroller"
autolink:
  aliases:
    MCU: always
plain_descriptions:
  - con chip nhỏ tích hợp vi xử lý bộ nhớ và chân giao tiếp để điều khiển thiết bị
  - vi mạch máy tính thu nhỏ chuyên dùng cho các tác vụ nhúng chuyên biệt
summary: Vi mạch tích hợp chứa lõi vi xử lý, bộ nhớ và các cổng ngoại vi lập trình được, chuyên dùng để điều khiển các ứng dụng nhúng chuyên biệt.
confusable_notes: {}
follow_up_questions:
  - Điểm khác nhau cơ bản giữa vi điều khiển và vi xử lý đa năng là gì?
  - Tại sao các chế độ ngủ sâu lại có vai trò quyết định đối với vi điều khiển chạy pin?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Vi_%C4%91i%E1%BB%81u_khi%E1%BB%83n
    accessed: '2026-10-16'
---

## Giải thích dễ hiểu
Vi điều khiển giống như một chiếc máy tính mini thu nhỏ hoàn chỉnh trên một con chip đơn: nó không dùng để lướt web hay gõ văn bản, mà được lập trình để quản lý ổn định một thiết bị nhất định như nồi cơm điện, lò vi sóng hay công tắc đèn.

## Chi tiết
Vi điều khiển tích hợp bộ xử lý trung tâm (CPU), bộ nhớ RAM tĩnh, bộ nhớ flash lưu trữ mã chương trình, cùng các khối ngoại vi như bộ định thời (timer), bộ chuyển đổi tín hiệu (ADC) và các chuẩn giao tiếp nối tiếp (UART, SPI, I2C). Nhờ kiến trúc tất cả trong một, vi điều khiển tiêu thụ rất ít năng lượng, thời gian khởi động tức thì và có khả năng phản hồi tín hiệu theo thời gian thực với chi phí sản xuất thấp.

## Định nghĩa chuyên ngành
Vi mạch bán dẫn đơn khối tích hợp bộ xử lý trung tâm, bộ nhớ chương trình, bộ nhớ dữ liệu và các cổng giao tiếp ngoại vi chuyên dụng cho việc thực thi firmware điều khiển hệ thống nhúng.

## Ví dụ
Vi điều khiển ESP32 hai nhân thu thập dữ liệu bụi mịn từ cảm biến, mã hóa thông tin và truyền tải qua sóng Wi-Fi về máy chủ giám sát chất lượng không khí gia đình.
