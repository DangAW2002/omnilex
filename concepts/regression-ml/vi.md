---
label: Hồi quy
aliases: []
loanwords:
  - regression
autolink:
  label: never
plain_descriptions:
  - dự đoán các giá trị số liên tục như giá nhà đất, thời gian di chuyển hoặc doanh thu bán hàng
  - phương pháp máy học dùng để ước lượng một con số cụ thể từ nhiều biến số đầu vào
summary: >-
  Dạng bài toán học máy có giám sát nhằm ước tính các giá trị số thực liên tục dựa trên các mối quan hệ thống kê giữa những đặc trưng đầu vào.
confusable_notes:
  classification-ml: Hồi quy ước lượng các đại lượng số thực liên tục; phân loại xếp dữ liệu vào các nhóm định tính rời rạc.
follow_up_questions:
  - Hiện tượng đa cộng tuyến giữa các biến giải thích làm sai lệch hệ số hồi quy như thế nào?
  - Khi nào nên ưu tiên sai số tuyệt đối trung bình (MAE) thay cho sai số toàn phương trung bình (MSE)?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/H%E1%BB%93i_quy_tuy%E1%BA%BFn_t%C3%ADnh
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc định giá một chiếc xe đạp cũ dựa trên thương hiệu, số năm đã sử dụng và tình trạng khung xe để đưa ra một con số tiền cụ thể.

## Chi tiết
Thuật toán hồi quy ước lượng hàm quan hệ giữa các biến độc lập và một biến phụ thuộc nhận giá trị liên tục. Thay vì gán nhãn rời rạc, mô hình hồi quy tính toán một giá trị trên mặt cong toán học. Các phương pháp phổ biến bao gồm hồi quy tuyến tính bình phương tối thiểu, hồi quy đa thức, điều chuẩn ridge/lasso, SVR và cây quyết định tăng cường gradient.

## Định nghĩa chuyên ngành
Phương pháp thống kê mô hình hóa kỳ vọng có điều kiện của một biến mục tiêu dạng số liên tục dựa trên véc-tơ đặc trưng quan sát được.

## Ví dụ
Hệ thống vận tải ước tính thời gian giao nhận cho 500 kiện hàng, dự báo thời gian di chuyển bình quân là 42,5 phút dựa trên quãng đường 18 km và mật độ giao thông.
