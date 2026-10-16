---
label: Image classification
aliases:
  - Phân loại hình ảnh
  - Phân loại ảnh
loanwords:
  - image classification
plain_descriptions:
  - tác vụ AI nhìn toàn bộ bức ảnh và gán cho nó một nhãn danh mục chung
  - việc xác định chủ thể hoặc đối tượng chính xuất hiện trong tấm ảnh
summary: Tác vụ thị giác máy tính trong đó thuật toán phân tích toàn bộ bức ảnh để gán cho nó một hoặc nhiều nhãn danh mục từ một tập phân loại xác định.
confusable_notes:
  object-detection: Image classification chỉ gán nhãn danh mục cho toàn bộ bức ảnh mà không định vị vị trí, trong khi object detection vừa nhận diện vừa vẽ khung xác định tọa độ từng vật thể.
follow_up_questions:
  - Mạng tích chập CNN và mô hình Vision Transformer khác nhau ra sao trong cách tiếp cận bài toán phân loại ảnh?
  - Phân loại đơn nhãn đa lớp khác gì so với phân loại đa nhãn trong xử lý ảnh y tế?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Phân loại ảnh giống như việc phân chia ảnh vào các hộp dán nhãn: bạn nhìn vào bức ảnh chụp chú chó đang chạy trên bãi cỏ, kết luận chủ đề bức ảnh là "chó", rồi thả vào hộp nhãn "chó" mà không cần bận tâm chân hay tai chú chó nằm ở vị trí nào.

## Chi tiết
Trong bài toán phân loại hình ảnh, thuật toán tiếp nhận ma trận điểm ảnh của toàn bộ bức ảnh và tính toán xác suất ứng với từng lớp nhãn định sẵn. Các phương pháp kinh điển dựa trên mạng nơ-ron tích chập (CNN) gồm các lớp tích chập, gộp và kết nối đầy đủ; các mô hình tiên tiến ngày nay thường ứng dụng Vision Transformer (ViT) chia ảnh thành các mẩu nhỏ để xử lý như chuỗi token. Đầu ra mô hình xuất qua hàm softmax nếu các nhãn bài trừ lẫn nhau hoặc hàm sigmoid cho bài toán đa nhãn.

## Định nghĩa chuyên ngành
Ánh xạ thị giác máy tính đánh giá ten-sơ đầu vào gồm các giá trị điểm ảnh nhằm ước lượng phân phối xác suất có điều kiện trên một tập hữu hạn các lớp phân loại rời rạc.

## Ví dụ
Dây chuyền tự động hóa nông nghiệp tại Đà Lạt chụp ảnh nông sản trên băng chuyền để phân loại cà chua vào các nhóm "loại 1", "loại 2" hoặc "hàng dập lỗi".
