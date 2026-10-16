---
label: "Regression testing"
aliases:
  - "Kiểm thử hồi quy"
loanwords:
  - "regression testing"
plain_descriptions:
  - "chạy lại các bài kiểm tra cũ để chắc chắn tính năng mới không làm hỏng tính năng cũ"
  - "kiểm tra xem việc sửa một lỗi phần mềm có vô tình gây ra lỗi ở chỗ khác hay không"
summary: "Quy trình chạy lại các bộ kiểm thử tự động nhằm đảm bảo những thay đổi mã nguồn hoặc bản vá lỗi mới không làm ảnh hưởng đến các chức năng vốn đang hoạt động bình thường."
confusable_notes:
  {}
follow_up_questions:
  - "Quy trình CI/CD hỗ trợ tự động hóa kiểm thử hồi quy trên từng pull request như thế nào?"
  - "Tiêu chí nào giúp phân loại bộ kiểm thử hồi quy nhanh (smoke test) với bộ kiểm thử đầy đủ chạy qua đêm?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Đi kiểm tra lại toàn bộ căn nhà sau khi sửa chữa để chắc chắn rằng thợ sửa ống nước trong phòng tắm không vô tình làm mất nước ở bồn rửa bát nhà bếp.

## Chi tiết
Mỗi khi mã nguồn được thêm tính năng, tái cấu trúc hoặc cập nhật thư viện, nguy cơ phát sinh lỗi ngoài ý muốn (gọi là regression) luôn tồn tại. Kiểm thử hồi quy sử dụng lại tập hợp các ca kiểm thử đã viết từ trước để chạy lại tự động. Nếu tất cả bài test cũ đều vượt qua, đội ngũ phát triển có thể tự tin triển khai phiên bản mới lên môi trường thực tế.

## Định nghĩa chuyên ngành
Quy trình thẩm định lặp lại nhằm xác minh rằng các thay đổi bổ sung hoặc điều chỉnh kiến trúc không phá vỡ tính toàn vẹn của các chức năng phần mềm đã được nghiệm thu trước đó.

## Ví dụ
Sau khi sửa lỗi hiển thị mã giảm giá trên trang giỏ hàng, nhóm phát triển chạy lại toàn bộ bài kiểm thử đặt hàng để xác nhận khách hàng vẫn thanh toán và nhận email hóa đơn bình thường.
