---
label: Lượng tử hóa
qualifier: (AI)
aliases: []
loanwords:
  - quantization
plain_descriptions:
  - kỹ thuật nén mô hình AI bằng cách giảm số bit dùng để lưu mỗi trọng số
  - đổi độ chính xác số học từ 16-bit xuống 8-bit hoặc 4-bit để tiết kiệm bộ nhớ
summary: Kỹ thuật nén mô hình chuyển đổi các trọng số từ định dạng dấu phẩy động độ chính xác cao sang số nguyên ít bit hơn nhằm giảm tiêu thụ bộ nhớ và tăng tốc suy luận.
confusable_notes: {}
follow_up_questions:
  - Khác biệt căn bản giữa lượng tử hóa sau huấn luyện (PTQ) và huấn luyện có ý thức lượng tử hóa (QAT) là gì?
  - Khi nén mô hình ngôn ngữ lớn từ 16-bit xuống 4-bit thì độ chính xác suy luận suy giảm ở mức độ nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/L%C6%B0%E1%BB%A3ng_t%E1%BB%AD_h%C3%B3a
    accessed: '2026-10-16'
---

## Giải thích dễ hiểu
Thay vì ghi chép kích thước đồ vật chi tiết đến tám chữ số thập phân trên những tấm bảng cồng kềnh, bạn làm tròn đến nửa centimet trên các tấm thẻ nhỏ, giúp nhét vừa túi áo gấp bốn lần thông tin mà độ chuẩn xác thực tế hầu như không đổi.

## Chi tiết
Mô hình học sâu tiêu chuẩn thường lưu trữ các trọng số ở định dạng số thực 32-bit (FP32) hoặc 16-bit (FP16/BF16). Kỹ thuật lượng tử hóa ánh xạ các mảng trọng số này xuống định dạng số nguyên ít bit hơn như INT8, INT4 hoặc các định dạng mới như FP8. Việc giảm số bit giúp cắt giảm băng thông bộ nhớ, tiết kiệm dung lượng VRAM và tận dụng được các đơn vị xử lý số nguyên chuyên dụng trên phần cứng để tăng tốc độ phản hồi. Hai hướng tiếp cận chính là lượng tử hóa sau huấn luyện và huấn luyện có ý thức lượng tử hóa.

## Định nghĩa chuyên ngành
Phép biến đổi toán học ánh xạ các ten-sơ tham số có độ rộng bit cao sang các biểu diễn rời rạc ít bit thông qua hệ số tỷ lệ và điểm cân bằng không.

## Ví dụ
Nén một mô hình ngôn ngữ 70 tỷ tham số từ dung lượng 140 GB ở định dạng 16-bit xuống dưới 40 GB nhờ lượng tử hóa 4-bit để có thể chạy mượt mà trên một máy trạm đơn lẻ.
