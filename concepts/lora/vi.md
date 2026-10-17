---
label: Low-Rank Adaptation
qualifier: (AI)
aliases:
  - LoRA
loanwords:
  - low-rank adaptation
autolink:
  aliases:
    LoRA: always
plain_descriptions:
  - cách fine-tune rẻ bằng cách chỉ huấn luyện một phần gắn thêm nhỏ
  - những tệp adapter nhỏ dạy mô hình lớn một kỹ năng mới
summary: 'Phương pháp fine-tuning tiết kiệm tham số: giữ nguyên trọng số gốc và chỉ huấn luyện các ma trận hạng thấp nhỏ biểu diễn phần cập nhật trọng số.'
confusable_notes:
  lora-radio: LoRA (AI) là kỹ thuật thích ứng ma trận hạng thấp để tinh chỉnh mô hình ngôn ngữ lớn, trong khi LoRa (IoT) là công nghệ truyền sóng vô tuyến tầm xa cho cảm biến vạn vật.
follow_up_questions:
  - Vì sao adapter LoRA nhỏ hơn mô hình gốc rất nhiều?
  - Nhiều adapter LoRA có dùng chung một mô hình gốc được không?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống gắn thêm một ống kính nhỏ lên máy ảnh thay vì làm lại cả chiếc máy: thân máy giữ nguyên, phần gắn thêm làm thay đổi bức ảnh.

## Chi tiết
LoRA giữ cố định trọng số đã huấn luyện trước và, ở những lớp được chọn, học hai ma trận nhỏ mà tích của chúng thay cho phần trọng số cần thay đổi. Huấn luyện tốn ít bộ nhớ hơn nhiều, kết quả là một tệp adapter nhỏ, và có thể thay qua lại nhiều adapter trên cùng một mô hình gốc. Với nhiều nhiệm vụ, chất lượng gần bằng fine-tune toàn bộ.

## Định nghĩa chuyên ngành
Kỹ thuật fine-tuning gắn các ma trận phân rã hạng thấp có thể huấn luyện vào một mô hình đã huấn luyện trước được giữ cố định, giảm mạnh số tham số cần huấn luyện.

## Ví dụ
Một cộng đồng tạo ảnh chia sẻ các adapter LoRA nặng vài chục megabyte, mỗi cái dạy cùng một mô hình gốc một phong cách vẽ riêng.
