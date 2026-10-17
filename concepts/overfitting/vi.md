---
label: Quá khớp
aliases: []
loanwords:
  - overfitting
plain_descriptions:
  - hiện tượng AI học vẹt dữ liệu mẫu khiến nó đoán sai khi gặp trường hợp mới
  - mô hình đạt điểm số tuyệt đối khi luyện tập nhưng thất bại trong thực tế
summary: Hiện tượng mô hình học máy ghi nhớ máy móc các biến thiên ngẫu nhiên và nhiễu của dữ liệu huấn luyện, làm suy giảm nghiêm trọng khả năng tổng quát hóa.
confusable_notes:
  underfitting: Quá khớp là mô hình ghi nhớ cả nhiễu và kém tổng quát hóa; dưới khớp là mô hình quá đơn giản đến mức không học được quy luật ngay trên tập huấn luyện.
follow_up_questions:
  - Những kỹ thuật điều chuẩn nào giúp ngăn chặn tình trạng quá khớp hiệu quả nhất?
  - Biểu đồ hàm mất mát trên tập kiểm định báo hiệu thời điểm xảy ra quá khớp như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Qu%C3%A1_kh%E1%BB%9Bp
    accessed: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như một học sinh học vẹt lòng từng dấu chấm dấu phẩy trong đề ôn thi; đến lúc vào phòng thi gặp bài toán tương tự nhưng chỉ đổi số liệu thì hoàn toàn bế tắc không làm được.

## Chi tiết
Quá khớp xuất hiện khi độ phức tạp của mô hình vượt quá lượng thông tin thực tế trong dữ liệu, hoặc khi quá trình huấn luyện kéo dài quá mức cần thiết. Thay vì học các quy luật khái quát, mô hình lại ghi nhớ cả những sai số ngẫu nhiên của tập mẫu. Dấu hiệu điển hình là sai số trên tập huấn luyện giảm về gần 0 nhưng sai số trên tập kiểm định lại tăng vọt. Các phương pháp khắc phục gồm có dropout, điều chuẩn trọng số, tăng cường dữ liệu và dừng sớm.

## Định nghĩa chuyên ngành
Trạng thái phương sai cao của bộ ước lượng thống kê khi mô hình tối ưu hóa quá mức trên dữ liệu mẫu, dẫn đến sai số thực nghiệm thấp nhưng kỳ vọng rủi ro thực tế cao.

## Ví dụ
Mô hình định giá bất động sản học vẹt số điện thoại của từng chủ nhà thay vì quy luật về vị trí và diện tích, dẫn tới định giá hoàn toàn sai lệch khi gặp căn hộ mới đăng bán.
