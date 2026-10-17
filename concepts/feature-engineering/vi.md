---
label: Feature engineering
aliases:
  - kỹ thuật đặc trưng
loanwords:
  - feature engineering
plain_descriptions:
  - biến đổi dữ liệu thô thu thập được thành các biến số đầu vào hữu ích cho mô hình học máy
  - kỹ thuật tạo ra các đặc trưng tính toán mới giúp tăng độ chính xác của thuật toán dự đoán
summary: >-
  Quy trình chọn lọc, xử lý và chuyển đổi các trường dữ liệu thô thành các biến đặc trưng đầu vào tối ưu giúp nâng cao hiệu năng của thuật toán học máy.
confusable_notes: {}
follow_up_questions:
  - Kỹ thuật mã hóa mục tiêu có thể gây rò rỉ dữ liệu trong quá trình kiểm định chéo như thế nào?
  - Các công cụ tự động tạo đặc trưng hỗ trợ tối ưu hóa quy trình tiền xử lý bảng dữ liệu ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc sơ chế nguyên liệu trước khi nấu ăn: thay vì để cả củ quả dính đất, bạn rửa sạch, gọt vỏ và thái hạt lựu theo định lượng sẵn để đầu bếp nấu món ăn ngon và nhanh nhất.

## Chi tiết
Feature engineering kết hợp kiến thức chuyên môn ngành với các phép biến đổi toán học để làm nổi bật quy luật của dữ liệu. Các kỹ thuật phổ biến gồm xử lý giá trị khuyết thiếu, mã hóa biến danh mục bằng one-hot, biến đổi logarit để chuẩn hóa dữ liệu lệch, tạo đặc trưng tích hợp và bóc tách mốc thời gian thành thứ trong tuần hoặc khung giờ cao điểm. Các đặc trưng tốt giúp mô hình học nhanh hơn và giảm thiểu sai số.

## Định nghĩa chuyên ngành
Quá trình thuật toán biến đổi có định hướng các quan sát đo đạc thô thành các véc-tơ đầu vào có cấu trúc nhằm tối đa hóa lượng thông tin tương hỗ với biến mục tiêu.

## Ví dụ
Mô hình dự báo giá vé máy bay tạo thêm hai đặc trưng mới từ ngày bay: số ngày còn lại đến lúc khởi hành và cờ đánh dấu kỳ nghỉ lễ, giúp cải thiện độ chính xác dự báo thêm 12%.
