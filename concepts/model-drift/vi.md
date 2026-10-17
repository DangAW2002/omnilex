---
label: Model drift
aliases:
  - trôi mô hình
loanwords:
  - model drift
plain_descriptions:
  - sự suy giảm độ chính xác của mô hình AI khi môi trường thực tế thay đổi theo thời gian
  - khi hành vi khách hàng thay đổi khiến mô hình máy học cũ không còn đưa ra dự đoán đúng
summary: >-
  Hiện tượng hiệu năng và độ chính xác của mô hình học máy bị suy giảm dần theo thời gian trong môi trường thực tế do sự thay đổi của phân phối dữ liệu đầu vào hoặc quan hệ mục tiêu.
confusable_notes: {}
follow_up_questions:
  - Hệ thống giám sát phân biệt trôi khái niệm (concept drift) và trôi dữ liệu (data drift) như thế nào?
  - Các kiểm định thống kê nào thường dùng để tự động kích hoạt quy trình huấn luyện lại mô hình?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc bạn dùng một tấm bản đồ thành phố in từ mười năm trước: khi có thêm nhiều cây cầu mới và đường một chiều, tấm bản đồ sẽ dần dẫn bạn đi lạc dù bản thân nét in trên giấy không hề thay đổi.

## Chi tiết
Trôi mô hình gồm hai dạng chính: trôi dữ liệu (sự thay đổi của phân phối biến đầu vào P(X)) và trôi khái niệm (sự thay đổi trong mối quan hệ giữa biến đầu vào và nhãn mục tiêu P(Y|X)). Các kỹ sư vận hành MLOps sử dụng các chỉ số như Chỉ số Ổn định Dân số (PSI) hay khoảng cách Wasserstein để phát hiện sớm sự suy giảm chất lượng và tự động kích hoạt tái huấn luyện trên dữ liệu mới.

## Định nghĩa chuyên ngành
Sự phân kỳ thống kê giữa phân phối dữ liệu thực nghiệm tại thời điểm huấn luyện và phân phối dữ liệu thực tế tại thời điểm suy luận, gây suy giảm năng lực tổng quát hóa.

## Ví dụ
Mô hình dự báo nhu cầu hàng hóa sau biến động chuỗi cung ứng bị tăng sai số tuyệt đối từ mức 5% lên tới 22%, buộc hệ thống phải bật cảnh báo và nạp dữ liệu mới để huấn luyện lại.
