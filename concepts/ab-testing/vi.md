---
label: "A/B testing"
aliases:
  - "Thử nghiệm A/B"
  - "Split testing"
loanwords:
  - "a/b testing"
plain_descriptions:
  - "phương pháp thử nghiệm so sánh hai phiên bản giao diện để xem phiên bản nào đạt hiệu quả cao hơn"
  - "thí nghiệm chia ngẫu nhiên người dùng để đo lường xem thay đổi nào giúp tăng tỷ lệ chuyển đổi"
summary: "Phương pháp thử nghiệm ngẫu nhiên có đối chứng, trong đó hai biến thể giao diện được hiển thị đồng thời cho các nhóm người dùng khác nhau để tìm ra phương án tối ưu."
confusable_notes: {}
follow_up_questions:
  - "Vì sao một bài thử nghiệm A/B phải chạy đủ thời gian và đạt ngưỡng ý nghĩa thống kê (statistical significance) mới được chốt kết quả?"
  - "Thử nghiệm đa biến (multivariate testing) khác gì so với thử nghiệm phân tách A/B cơ bản?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Hãy hình dung thử nghiệm A/B giống như một tiệm bánh mời khách ăn thử hai công thức bánh quy khác nhau: người khách chẵn thử loại A, người khách lẻ thử loại B; sau một ngày, loại nào được khách mua nhiều hơn thì tiệm sẽ sản xuất hàng loạt loại đó.

## Chi tiết
Trong tối ưu hóa sản phẩm số, hệ thống sẽ phân bổ ngẫu nhiên lượng truy cập thành hai luồng: phiên bản A (bản gốc hiện tại) và phiên bản B (bản có chỉnh sửa một yếu tố cụ thể như đổi màu nút bấm hoặc viết lại tiêu đề). Dữ liệu hành vi như tỷ lệ nhấn chuột, tỷ lệ điền biểu mẫu hoặc doanh thu được ghi nhận độc lập trên hai nhóm. Bằng cách áp dụng các công thức kiểm định thống kê, nhóm sản phẩm xác định được sự gia tăng hiệu quả là do thay đổi thực tế mang lại hay chỉ do ngẫu nhiên.

## Định nghĩa chuyên ngành
Phương pháp thực nghiệm có đối chứng ngẫu nhiên trong đó hai hoặc nhiều biến thể của giao diện hoặc thuật toán được người dùng trải nghiệm song song nhằm chứng minh ưu thế vượt trội về mặt thống kê.

## Ví dụ
Một sàn thương mại điện tử thử nghiệm rút gọn quy trình thanh toán từ 3 bước xuống 1 bước (Biến thể B), ghi nhận tỷ lệ chốt đơn thành công tăng 5,8% với độ tin cậy thống kê đạt 99%.
