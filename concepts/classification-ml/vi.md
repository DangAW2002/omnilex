---
label: Phân loại
qualifier: (Học máy)
aliases: []
loanwords:
  - classification
autolink:
  label: never
plain_descriptions:
  - xếp các mục dữ liệu vào các nhóm riêng biệt như xác định email là thư rác hay thư thường
  - bài toán máy học trong đó kết quả đầu ra cần dự đoán là các nhãn danh mục rời rạc
summary: >-
  Bài toán học máy có giám sát trong đó thuật toán dự đoán nhãn danh mục rời rạc hoặc xếp các mẫu dữ liệu đầu vào vào các lớp định tính xác định.
confusable_notes:
  regression-ml: Phân loại dự đoán các nhãn danh mục rời rạc; hồi quy dự đoán các giá trị số liên tục.
follow_up_questions:
  - Hiện tượng mất cân bằng dữ liệu giữa các lớp ảnh hưởng thế nào đến việc chọn chỉ số đánh giá phân loại?
  - Ranh giới quyết định phân biệt bài toán phân loại nhị phân và đa lớp như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Ph%C3%A2n_lo%E1%BA%A1i_th%E1%BB%91ng_k%C3%AA
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như máy phân loại thư tự động tại bưu điện đọc địa chỉ trên từng phong bì rồi thả thư vào đúng thùng chứa thư của từng tỉnh thành tương ứng.

## Chi tiết
Thuật toán phân loại thiết lập các ranh giới quyết định trong không gian đặc trưng để gán dữ liệu vào các nhóm định trước. Bài toán có thể là phân loại nhị phân (hai lớp đối lập), phân loại đa lớp (chọn một trong nhiều lớp) hoặc phân loại đa nhãn (gán cùng lúc nhiều nhãn). Các mô hình phổ biến gồm hồi quy logistic, máy véc-tơ hỗ trợ (SVM), rừng ngẫu nhiên và mạng nơ-ron sâu dùng tầng softmax.

## Định nghĩa chuyên ngành
Ánh xạ hàm có giám sát chiếu véc-tơ đặc trưng đầu vào vào một tập hữu hạn các nhãn danh mục thông qua việc ước tính phân phối xác suất hậu nghiệm.

## Ví dụ
Hệ thống phòng chống gian lận ngân hàng phân tích 100.000 giao dịch thẻ, phân loại 99.850 giao dịch hợp lệ và 150 giao dịch đáng ngờ để kiểm toán viên xác minh.
