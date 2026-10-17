---
label: Transfer learning
aliases:
  - học chuyển giao
loanwords:
  - transfer learning
plain_descriptions:
  - tận dụng một mô hình đã học từ lượng dữ liệu khổng lồ để áp dụng vào một nhiệm vụ mới cụ thể
  - tái sử dụng tri thức và trọng số có sẵn giúp huấn luyện mô hình mới với ít dữ liệu và thời gian hơn
summary: >-
  Phương pháp học máy trong đó các biểu diễn và trọng số đã học từ một bài toán ban đầu được tái sử dụng và tinh chỉnh để giải quyết một bài toán đích mới liên quan.
confusable_notes: {}
follow_up_questions:
  - Kỹ thuật đóng băng các tầng trọng số giúp ngăn ngừa hiện tượng quên thảm khốc như thế nào?
  - Những dấu hiệu nào cho thấy hiện tượng chuyển giao tiêu cực khi miền dữ liệu nguồn và đích quá khác biệt?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một người đã biết đi xe đạp: khi học lái xe máy, người đó không phải học giữ thăng bằng từ đầu mà tận dụng luôn kỹ năng thăng bằng đã có để học lái nhanh hơn.

## Chi tiết
Transfer learning dựa trên thực tế là các tầng nơ-ron cấp thấp (như nhận diện đường nét trong ảnh hay cấu trúc ngữ pháp) có tính chất phổ quát. Thay vì khởi tạo trọng số ngẫu nhiên, mô hình bắt đầu từ một mô hình nền tảng đã huấn luyện sẵn trên lượng dữ liệu khổng lồ. Bằng cách cố định các tầng trích xuất đặc trưng và chỉ huấn luyện tầng phân loại cuối, mô hình đích có thể đạt hiệu năng cao chỉ với ít dữ liệu gán nhãn.

## Định nghĩa chuyên ngành
Khung phương pháp học máy chuyển giao tri thức thống kê từ miền dữ liệu nguồn và bài toán gốc nhằm cải thiện năng lực học tập trên miền dữ liệu đích.

## Ví dụ
Một nhóm kỹ sư tái sử dụng mô hình thị giác đã học trên 14 triệu ảnh tổng hợp, chỉ cần huấn luyện thêm trên 500 ảnh chụp X-quang phổi là có thể phát hiện viêm phổi với độ chính xác 94%.
