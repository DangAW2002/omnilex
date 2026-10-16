---
label: Context engineering
aliases:
  - Kỹ nghệ ngữ cảnh
loanwords:
  - context engineering
plain_descriptions:
  - nghệ thuật thiết kế và chọn lọc mọi thông tin nạp vào cửa sổ ngữ cảnh của AI
  - sắp xếp hướng dẫn, công cụ và tài liệu sao cho mô hình trả lời chuẩn xác nhất với chi phí thấp
summary: Chuyên ngành thiết kế, tổ chức, nén và tối ưu hóa toàn bộ lượng thông tin đưa vào cửa sổ ngữ cảnh nhằm nâng cao chất lượng suy luận và tiết kiệm chi phí.
confusable_notes: {}
follow_up_questions:
  - Kỹ nghệ ngữ cảnh khác biệt thế nào so với kỹ nghệ prompt (prompt engineering) truyền thống?
  - Cơ chế lưu bộ đệm prompt (prompt caching) hỗ trợ gì cho việc nạp ngữ cảnh dung lượng lớn với chi phí thấp?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Nếu kỹ nghệ prompt giống như việc bạn soạn một tờ ghi chú thật gãy gọn gửi cho sếp, thì kỹ nghệ ngữ cảnh chính là việc chuẩn bị trọn vẹn tập hồ sơ trình ký: sắp xếp tài liệu theo thứ tự ưu tiên, tóm tắt phụ lục, lọc bỏ email trùng lặp và đánh dấu số liệu quan trọng để người nhận ra quyết định chính xác mà không bị quá tải.

## Chi tiết
Khi cửa sổ ngữ cảnh mở rộng từ vài nghìn lên hàng triệu token, việc chăm chút từng câu chữ trong prompt đã phát triển thành kỹ nghệ ngữ cảnh tổng thể. Kỷ luật này bao gồm việc sắp xếp bài bản các chỉ dẫn hệ thống, ví dụ mẫu tương thích, lược đồ gọi công cụ, lịch sử đàm thoại và các đoạn tài liệu truy xuất từ cơ sở dữ liệu. Kỹ nghệ ngữ cảnh giúp giải quyết các rủi ro như suy giảm chú ý ở phần giữa văn bản dài, tăng đột biến độ trễ và tiêu tốn ngân sách token thông qua các kỹ thuật nén, tỉa bớt nội dung thừa và dùng định dạng có cấu trúc.

## Định nghĩa chuyên ngành
Kỷ luật kiến trúc hệ thống chuyên về thiết kế, điều phối và tối ưu hóa gói tải trọng dữ liệu token đưa vào mô hình ngôn ngữ nhằm cực đại hóa hiệu quả suy luận đồng thời tối thiểu hóa độ trễ và chi phí.

## Ví dụ
Đội ngũ phát triển phần mềm tổ chức ngữ cảnh cho trợ lý lập trình bằng cấu trúc thẻ XML phân tầng kết hợp lưu cache phần định nghĩa API, giúp tiết kiệm 60% chi phí token mà vẫn tăng tỷ lệ vá lỗi thành công.
