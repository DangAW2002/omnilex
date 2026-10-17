---
label: "Static site generation (SSG)"
aliases:
  - "SSG"
loanwords:
  - "Static site generation (SSG)"
  - "SSG"
autolink:
  aliases:
    SSG: always
plain_descriptions:
  - "tạo sẵn toàn bộ các tệp trang web từ trước để phát cho người đọc ngay lập tức"
  - "biên dịch bài viết thành các tệp HTML cố định giúp tải trang siêu nhanh qua mạng CDN"
summary: "Quy trình tạo sẵn các tệp HTML tĩnh từ lúc biên dịch dự án thay vì chờ người dùng truy cập mới tạo nội dung."
confusable_notes:
  server-side-rendering: "SSG tạo sẵn các trang HTML từ lúc build và lưu trên máy chủ, còn SSR phải tính toán và tạo trang cho từng yêu cầu của người dùng."
follow_up_questions:
  - "Kỹ thuật biên dịch gia tăng (incremental build) giúp giải quyết vấn đề gì khi trang web có hàng chục nghìn bài viết?"
  - "Tại sao kiến trúc SSG lại an toàn hơn và tiết kiệm chi phí máy chủ hơn so với web động?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
SSG giống như việc in báo giấy hàng loạt vào ban đêm: sáng ra độc giả chỉ việc lấy báo đọc ngay mà không cần chờ nhà in chạy máy từng tờ một.

## Chi tiết
Trong giai đoạn build, công cụ SSG sẽ đọc toàn bộ tệp nội dung (như Markdown hoặc API từ CMS) và tạo ra sẵn các tệp HTML, CSS độc lập cho từng bài viết. Các tệp này được đưa thẳng lên mạng phân phối nội dung (CDN). Khi có người vào đọc, CDN chỉ việc trả về tệp có sẵn với tốc độ cực nhanh mà không cần chạy máy chủ ứng dụng hay truy vấn cơ sở dữ liệu.

## Định nghĩa chuyên ngành
Chiến lược tạo trang web tĩnh lúc biên dịch, chuyển đổi dữ liệu nguồn thành các tệp HTML hoàn chỉnh sẵn sàng phục vụ từ bộ nhớ đệm biên.

## Ví dụ
Trang tài liệu kỹ thuật biên dịch 300 bài viết hướng dẫn thành các tệp HTML tĩnh trong 20 giây và phân phối qua mạng máy chủ CDN toàn cầu.
