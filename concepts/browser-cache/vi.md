---
label: "Bộ nhớ đệm trình duyệt"
aliases:
  - "browser cache"
  - "web cache"
loanwords:
  - "browser cache"
plain_descriptions:
  - "ngăn lưu tạm nơi trình duyệt giữ lại hình ảnh và tệp để mở lại trang nhanh hơn"
  - "bộ nhớ tạm lưu các tài nguyên web đã tải giúp tránh việc phải tải lại nhiều lần"
summary: "Cơ chế lưu trữ tạm thời trong trình duyệt web giúp giữ lại các tài nguyên HTTP đã tải về để tái sử dụng trong các lần truy cập tiếp theo."
confusable_notes:
  local-storage: "Bộ nhớ đệm trình duyệt lưu các tệp mạng (ảnh, script) theo chỉ thị của máy chủ, còn localStorage lưu các chuỗi dữ liệu ứng dụng do mã JavaScript quản lý."
follow_up_questions:
  - "Các chỉ thị trong tiêu đề Cache-Control như \"max-age\" và \"no-cache\" quyết định việc lưu đệm ra sao?"
  - "Cơ chế mã ETag kết hợp mã trạng thái 304 Not Modified giúp tiết kiệm băng thông thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: viblo
    locator: https://viblo.asia/p/tong-quan-ve-web-cache-va-caching-chien-luoc-caching-hieu-qua-92G6xyZgV4n
    accessed: "2026-10-17"
---

## Giải thích dễ hiểu
Bộ nhớ đệm giống như việc bạn lưu sẵn tờ thực đơn của quán quen vào ngăn kéo bàn: lần sau muốn gọi món chỉ cần mở ngăn kéo ra xem mà không phải đi bộ tới quán để xin lại.

## Chi tiết
Mỗi khi tải một trang web, trình duyệt sẽ lưu lại các tệp hình ảnh, CSS và JavaScript vào ổ đĩa dựa trên các thông số trong tiêu đề Cache-Control. Ở những lần mở trang sau, trình duyệt kiểm tra xem tệp còn mới không. Nếu còn hạn dùng, nó lấy thẳng từ bộ nhớ máy tính mà không cần kết nối internet. Nếu đã cũ, nó gửi yêu cầu có kèm ETag để hỏi máy chủ xem có gì mới không, nếu không đổi máy chủ chỉ gửi về mã 304 rất nhẹ.

## Định nghĩa chuyên ngành
Hệ thống lưu trữ tạm phía máy khách tuân thủ đặc tả giao thức HTTP nhằm giảm tải băng thông và giảm thiểu độ trễ kết xuất trang web.

## Ví dụ
Tệp logo công ty được gán chỉ thị lưu đệm 1 năm giúp các lần chuyển trang tiếp theo chỉ mất 3 mili giây để nạp lại ảnh từ bộ nhớ máy tính.
