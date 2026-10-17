---
label: "Hydration"
qualifier: "(Web)"
aliases:
  - "bù nước"
  - "client-side hydration"
loanwords:
  - "Hydration"
  - "client-side hydration"
autolink:
  label: auto
plain_descriptions:
  - "gắn các tính năng tương tác và bấm nút vào trang web tĩnh đã tạo sẵn"
  - "quá trình dùng JavaScript kích hoạt sức sống cho khung HTML máy chủ gửi về"
summary: "Quá trình phía trình duyệt kích hoạt mã JavaScript để gắn các sự kiện tương tác vào trang HTML tĩnh do máy chủ gửi về."
confusable_notes: {}
follow_up_questions:
  - "Hiện tượng lệch cấu trúc hydration (mismatch error) giữa máy chủ và trình duyệt bắt nguồn từ đâu?"
  - "Kiến trúc ốc đảo (Islands Architecture) giải quyết gánh nặng thời gian hydration ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng bạn nhận được một chú robot đồ chơi bằng sáp đã có sẵn hình dạng: bạn cần gắn pin và nối dây điện (nạp JavaScript) vào thì các khớp mới cử động và phản hồi khi bấm nút.

## Chi tiết
Khi tài liệu HTML do máy chủ tạo ra tải về, người dùng đã thấy chữ và hình ảnh nhưng các nút bấm chưa thể hoạt động. Khi tệp mã JavaScript của framework tải xong, nó sẽ quét qua cây DOM, đối chiếu các nút, gắn bộ lắng nghe sự kiện (click, hover) và khởi tạo trạng thái ứng dụng. Quá trình này hoàn tất thì trang web chuyển thành một ứng dụng tương tác đầy đủ.

## Định nghĩa chuyên ngành
Giai đoạn đồng bộ hóa và kết nối logic phía client nhằm gắn kết bộ xử lý sự kiện và cây DOM ảo vào các phần tử HTML đã được máy chủ kết xuất sẵn.

## Ví dụ
Nút bấm "Thêm vào giỏ hàng" hiển thị ngay khi nạp trang; sau khi quá trình hydration chạy xong sau 180 mili giây, người dùng bấm vào sẽ mở ra bảng chọn số lượng sản phẩm.
