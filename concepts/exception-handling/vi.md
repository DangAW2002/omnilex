---
label: "Exception"
qualifier: "(Lập trình)"
aliases:
  - "Ngoại lệ"
loanwords:
  - "exception"
autolink:
  label: never
  aliases:
    Ngoại lệ: never
plain_descriptions:
  - "sự kiện bất thường hoặc lỗi thời gian chạy làm gián đoạn luồng thực thi câu lệnh"
  - "cơ chế báo lỗi đẩy thông tin ngược lên ngăn xếp cuộc gọi để tìm khối xử lý phục hồi"
summary: "Tình trạng bất thường hoặc lỗi phát sinh trong thời gian chạy làm gián đoạn luồng lệnh thông thường và kích hoạt logic xử lý phục hồi chuyên biệt."
confusable_notes: {}
follow_up_questions:
  - "Hệ thống thu hồi các khung kích hoạt trên ngăn xếp (stack unwinding) ra sao khi tìm kiếm khối catch phù hợp?"
  - "Vì sao các phần mềm thương mại cần tránh lạm dụng ngoại lệ để làm luồng điều kiện rẽ nhánh thông thường?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng phanh khẩn cấp trên một đoàn tàu chở khách. Nếu có chướng ngại vật bất ngờ xuất hiện trên đường ray, việc giật phanh sẽ lập tức dừng đoàn tàu và báo động cho trưởng tàu để kích hoạt quy trình an toàn bảo vệ hành khách.

## Chi tiết
Khi chương trình gặp phải trạng thái không hợp lệ (như chia cho số 0, đọc tệp tin không tồn tại hoặc truy cập con trỏ rỗng), nó sẽ tạo và ném ra một đối tượng ngoại lệ. Môi trường thực thi chặn sự kiện này lại và bắt đầu tháo dỡ ngăn xếp cuộc gọi theo thứ tự ngược lại để tìm kiếm khối xử lý tương ứng (`catch`). Nếu tìm thấy khối bắt lỗi, chương trình sẽ phục hồi an toàn; nếu toàn bộ ngăn xếp được duyệt hết mà không có nơi xử lý, tiến trình sẽ lập tức bị buộc dừng và hiển thị lỗi.

## Định nghĩa chuyên ngành
Đối tượng thời gian chạy đóng gói dữ liệu đo lường lỗi, được bộ máy thực thi hoặc mã nguồn ném ra nhằm chuyển hướng luồng điều khiển khỏi đường chạy mặc định tới các thủ tục phục hồi có cấu trúc.

## Ví dụ
Một ứng dụng đọc tệp `config.json`: nếu tệp bị xóa khỏi ổ đĩa, hệ thống phát sinh lỗi `FileNotFoundException`, khối lệnh `try...catch` sẽ chặn lại để tải các cấu hình mặc định thay thế.
