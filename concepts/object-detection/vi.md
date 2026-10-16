---
label: Object detection
aliases:
  - Phát hiện đối tượng
  - Nhận diện vật thể
loanwords:
  - object detection
plain_descriptions:
  - tác vụ AI tìm kiếm nhiều vật thể trong ảnh và vẽ khung định vị từng vật
  - việc xác định vị trí và phân loại từng đồ vật riêng biệt xuất hiện trong khung hình
summary: Kỹ thuật thị giác máy tính vừa nhận diện nhãn danh mục vừa xác định tọa độ khung bao của từng đối tượng riêng biệt xuất hiện trong một bức ảnh.
confusable_notes:
  image-classification: Image classification chỉ gán một nhãn chung cho cả khung hình, còn object detection định vị và vẽ khung hình chữ nhật quanh từng vật thể cụ thể.
follow_up_questions:
  - Sự đánh đổi giữa các mô hình hai giai đoạn (như Faster R-CNN) và mô hình một giai đoạn (như YOLO) là gì?
  - Thuật toán Non-Maximum Suppression (NMS) loại bỏ các khung bao trùng lặp như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Nếu phân loại ảnh chỉ nói "khung cảnh này có đường phố và người", thì object detection sẽ vẽ các khung đỏ quanh từng người đi bộ và vẽ khung xanh quanh từng chiếc ô tô, chỉ rõ vị trí chính xác của từng đối tượng trên mặt đường.

## Chi tiết
Phát hiện đối tượng kết hợp giữa bài toán phân loại danh mục và bài toán định vị không gian. Với mỗi vật thể được nhận dạng, mô hình sẽ xuất ra nhãn lớp, điểm số tin cậy và bộ tọa độ khung bao (thường gồm x, y, chiều rộng và chiều cao). Các kiến trúc chia làm hai dòng: mô hình hai giai đoạn (như Faster R-CNN) ưu tiên độ chính xác cao, và mô hình một giai đoạn (như họ YOLO hoặc SSD) tối ưu cho xử lý video thời gian thực. Các kiến trúc mới còn ứng dụng Transformer (DETR) để dự đoán trực tiếp tập hợp đối tượng.

## Định nghĩa chuyên ngành
Tác vụ thị giác máy tính dự đoán tập hợp các bộ tọa độ khung bao và vector phân phối xác suất phân loại tương ứng cho các thực thể đối tượng rời rạc trong một không gian ảnh.

## Ví dụ
Hệ thống camera giám sát giao thông thông minh tự động vẽ khung bao quanh các xe máy vượt đèn đỏ và biển số xe để phục vụ phạt nguội theo thời gian thực.
