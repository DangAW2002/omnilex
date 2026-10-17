---
label: Học tăng cường
aliases:
  - RL
loanwords:
  - reinforcement learning
autolink:
  aliases:
    RL: always
plain_descriptions:
  - huấn luyện AI ra quyết định thông qua thử sai dựa trên hệ thống điểm thưởng và điểm phạt
  - phương pháp máy học trong đó thuật toán tự tìm chiến lược tối ưu qua tương tác với môi trường
summary: >-
  Phương pháp máy học trong đó một tác tử tự động học cách lựa chọn chuỗi hành động trong môi trường để tối đa hóa tổng điểm thưởng tích lũy theo thời gian.
confusable_notes: {}
follow_up_questions:
  - Thuật toán học tăng cường cân bằng giữa việc khám phá hành động mới và khai thác hành động đã biết như thế nào?
  - Tại sao việc thiết kế hàm phần thưởng lại mang tính quyết định trong môi trường có phản hồi trễ?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/H%E1%BB%8Dc_t%C4%83ng_c%C6%B0%E1%BB%9Dng
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc huấn luyện một chú cún con: làm đúng lệnh thì được thưởng mẩu bánh quy, làm sai thì không nhận được gì, dần dần chú cún sẽ biết chính xác hành động nào mang lại nhiều bánh nhất.

## Chi tiết
Học tăng cường mô hình hóa quá trình ra quyết định theo Quy trình Quyết định Markov (MDP), bao gồm không gian trạng thái, không gian hành động và hàm phần thưởng. Tác tử không nhận được nhãn kết quả tức thì mà phải đối mặt với phản hồi trễ, liên tục cân nhắc giữa việc khám phá (thử hành động lạ) và khai thác (chọn hành động mang lại điểm cao đã biết). Các giải thuật nổi tiếng gồm Q-learning, Policy Gradient và PPO.

## Định nghĩa chuyên ngành
Khung thuật toán tối ưu hóa chính sách ánh xạ từ trạng thái môi trường sang phân phối hành động nhằm tối đa hóa kỳ vọng tổng phần thưởng chiết khấu tích lũy.

## Ví dụ
Hệ thống điều khiển quạt gió trong phòng máy chủ thử nghiệm thay đổi nhẹ mỗi phút, sau 30 ngày tự học được cách giảm 15% điện năng tiêu thụ mà vẫn duy trì nhiệt độ chuẩn 22°C.
