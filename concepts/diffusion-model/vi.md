---
label: Diffusion model
aliases:
  - mô hình khuếch tán
loanwords:
  - diffusion model
plain_descriptions:
  - AI tạo sinh tạo ra tranh ảnh sắc nét bằng cách lọc dần nhiễu ngẫu nhiên qua từng bước
  - mô hình máy học học cách đảo ngược quá trình làm mờ nhiễu để tái tạo hình ảnh sống động
summary: >-
  Lớp mô hình tạo sinh trong học sâu tạo ra dữ liệu chất lượng cao, đặc biệt là hình ảnh, bằng cách học cách đảo ngược từng bước quá trình làm nhiễu ngẫu nhiên dữ liệu gốc.
confusable_notes: {}
follow_up_questions:
  - Việc thực hiện khử nhiễu trong không gian tiềm ẩn giúp tăng tốc độ lấy mẫu như thế nào?
  - Vì sao kỹ thuật định hướng không cần bộ phân loại lại giúp ảnh sinh ra bám sát câu lệnh mô tả hơn?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc bạn nhìn vào một bức tranh bị phủ kín bởi lớp hạt nhiễu xám trên tivi: từng bước một, họa sĩ cẩn thận tẩy sạch lớp nhiễu đó cho đến khi bức tranh rõ nét xuất hiện.

## Chi tiết
Mô hình khuếch tán vận hành dựa trên cơ chế hai pha mượn từ nhiệt động lực học. Quá trình thuận liên tục thêm nhiễu Gauss vào dữ liệu mẫu cho tới khi biến thành nhiễu trắng hoàn toàn. Mạng nơ-ron (thường là U-Net hoặc transformer) được huấn luyện để thực hiện quá trình ngược, học cách dự đoán và trừ dần lớp nhiễu theo từng bước dưới sự hướng dẫn của câu lệnh văn bản. Để tối ưu tốc độ, các mô hình hiện đại thực hiện việc khử nhiễu ngay trong không gian tiềm ẩn nén.

## Định nghĩa chuyên ngành
Mô hình xác suất tạo sinh ước lượng các hàm số bước chuyển đảo chiều của chuỗi Markov, biến đổi một phân phối dữ liệu phức tạp về dạng phân phối tiên nghiệm Gauss.

## Ví dụ
Nhà thiết kế nhập câu lệnh mô tả dài 10 từ, mô hình khuếch tán thực hiện 30 bước khử nhiễu liên tiếp để sinh ra một bức ảnh minh họa độ phân giải 1024x1024 trong vòng 2 giây.
