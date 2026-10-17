---
label: Reinforcement learning from human feedback (RLHF)
aliases:
  - RLHF
  - học tăng cường từ phản hồi con người
loanwords:
  - reinforcement learning from human feedback
  - RLHF
autolink:
  aliases:
    RLHF: always
plain_descriptions:
  - tinh chỉnh mô hình ngôn ngữ dựa trên đánh giá của con người để câu trả lời hữu ích và an toàn hơn
  - phương pháp dùng điểm thưởng từ bảng xếp hạng của người đánh giá để hoàn thiện hành vi AI
summary: >-
  Kỹ thuật tinh chỉnh mô hình ngôn ngữ lớn bằng cách huấn luyện mô hình phần thưởng từ các so sánh đánh giá của con người, sau đó dùng học tăng cường để định hướng câu trả lời của mô hình.
confusable_notes: {}
follow_up_questions:
  - Mô hình phần thưởng học cách chấm điểm các câu trả lời ứng viên từ dữ liệu so sánh cặp như thế nào?
  - Vì sao thành phần phạt phân kỳ KL lại cần thiết trong bước tối ưu hóa chính sách của RLHF?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một nhà văn viết ra hai bản nháp khác nhau; các biên tập viên chọn bản nháp mạch lạc và thân thiện hơn, sau đó người hướng dẫn sẽ khen thưởng nhà văn khi viết theo phong cách được chọn.

## Chi tiết
RLHF khắc phục nhược điểm của mục tiêu dự đoán từ tiếp theo vốn không đảm bảo tính an toàn và hữu ích. Quy trình gồm 3 bước: tinh chỉnh có giám sát trên tập dữ liệu mẫu chuẩn, huấn luyện mô hình phần thưởng từ các cặp câu trả lời được con người xếp hạng, và cập nhật chính sách mô hình bằng thuật toán PPO. Hệ số phạt phân kỳ KL được thêm vào để mô hình không bị suy biến quá xa so với trạng thái ban đầu.

## Định nghĩa chuyên ngành
Khung tinh chỉnh bằng học tăng cường trong đó mô hình chính sách được tối ưu hóa dựa trên mô hình phần thưởng thực nghiệm học từ các tập dữ liệu ưu tiên so sánh của con người.

## Ví dụ
Nhóm chuyên gia đánh giá 10.000 cặp câu trả lời của chatbot, ưu tiên cách hành văn súc tích, giúp quá trình huấn luyện RLHF giảm 25% độ dài câu trả lời thừa mà vẫn giữ trọn vẹn thông tin.
