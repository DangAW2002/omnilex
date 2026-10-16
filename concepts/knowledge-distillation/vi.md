---
label: Distillation
qualifier: (AI)
aliases:
  - Chưng cất tri thức
  - Knowledge distillation
loanwords:
  - distillation
plain_descriptions:
  - kỹ thuật dạy mô hình AI nhỏ bắt chước tri thức của một mô hình khổng lồ
  - truyền thụ kinh nghiệm từ mô hình thầy giáo lớn sang mô hình học sinh nhỏ gọn
summary: Kỹ thuật nén mô hình trong đó một mạng nơ-ron học sinh nhỏ gọn được huấn luyện dựa trên phân phối xác suất đầu ra của một mô hình thầy giáo cỡ lớn.
confusable_notes: {}
follow_up_questions:
  - Vì sao các phân phối xác suất mềm từ mô hình thầy lại chứa nhiều thông tin hữu ích hơn nhãn đúng sai cứng?
  - Những lợi ích về độ trễ và chi phí nào khiến mô hình chưng cất trở thành lựa chọn hàng đầu cho thiết bị biên?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như một giáo sư đầu ngành kèm cặp cho một học việc: thay vì bắt học việc tự đọc hết hàng nghìn cuốn sách trong thư viện, vị giáo sư tóm tắt các điểm trọng yếu và chỉ dẫn cách lập luận thực chiến, giúp người học việc nắm bắt bản chất vấn đề nhanh gấp nhiều lần.

## Chi tiết
Trong kỹ thuật chưng cất tri thức, mô hình "thầy" có quy mô lớn và độ chính xác cao sẽ sinh kết quả dự đoán trên kho ngữ liệu huấn luyện. Thay vì chỉ bắt mô hình "trò" học theo các nhãn đúng sai rời rạc, mô hình trò sẽ được tối ưu để mô phỏng phân phối xác suất mềm của mô hình thầy thông qua hàm mất mát làm mềm nhiệt độ. Phân phối mềm này chứa đựng tri thức ngầm về mối tương quan giữa các nhãn phụ, giúp mô hình nhỏ giữ được phần lớn năng lực của mô hình lớn nhưng tiêu tốn ít bộ nhớ và chạy nhanh hơn đáng kể.

## Định nghĩa chuyên ngành
Khung tối ưu hóa giảm quy mô mô hình trong đó mạng nơ-ron học sinh bị hạn chế tham số cực tiểu hóa độ phân kỳ giữa phân phối dự đoán của nó và phân phối logit làm mềm của mạng thầy đã huấn luyện.

## Ví dụ
Chưng cất tri thức từ mô hình ngôn ngữ lớn 70 tỷ tham số sang một mô hình học sinh 8 tỷ tham số để triển khai xử lý hồ sơ tự động trực tiếp trên máy chủ nội bộ doanh nghiệp.
