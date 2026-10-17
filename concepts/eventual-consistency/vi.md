---
label: Eventual consistency
aliases:
  - tính nhất quán cuối cùng
loanwords:
  - Eventual consistency
plain_descriptions:
  - lời cam kết rằng tất cả máy chủ bản sao rồi sẽ có dữ liệu giống nhau nếu không có sửa đổi mới
  - cơ chế cho phép bạn bè nhìn thấy bài đăng của bạn trễ hơn vài giây sau khi bạn bấm đăng
summary: Mô hình nhất quán trong điện toán phân tán bảo đảm rằng mọi bản sao dữ liệu cuối cùng sẽ hội tụ về cùng một giá trị nếu có đủ thời gian và không có thêm cập nhật mới.
confusable_notes:
  acid: Tính nhất quán cuối cùng đánh đổi tính nhất quán đọc tức thời của ACID để đạt được tính sẵn sàng cao và độ trễ ghi cực thấp trên cụm máy chủ phân tán.
follow_up_questions:
  - Cấu trúc dữ liệu nhân bản không xung đột (CRDT) xử lý các thao tác cập nhật đồng thời trong mô hình nhất quán cuối cùng ra sao?
  - Tại sao tính nhất quán cuối cùng hoàn toàn chấp nhận được cho số lượt thích bài viết nhưng không thể dùng cho số dư tài khoản ngân hàng?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như tin tức lan truyền trong một ngôi làng: không phải ai cũng nghe tin cùng một lúc, nhưng sau vài tiếng đồng hồ truyền tai nhau, tất cả mọi người trong làng cuối cùng đều nắm được đúng một thông tin như nhau.

## Chi tiết
Tính nhất quán cuối cùng là mô hình nhất quán nới lỏng được dùng phổ biến trong các cơ sở dữ liệu phân tán kiểu AP (như DynamoDB hay Cassandra). Khi một máy chủ nhận lệnh cập nhật, nó sẽ gửi dữ liệu bất đồng bộ sang các máy chủ khác ở chế độ chạy ngầm. Dù có sự chênh lệch nhỏ về số liệu trong vài giây giữa các máy chủ, toàn bộ cụm sẽ hội tụ về trạng thái đồng nhất ngay khi tiến trình sao chép hoàn tất.

## Định nghĩa chuyên ngành
Mô hình nhất quán lý thuyết bảo đảm rằng, nếu không phát sinh thêm các thao tác ghi mới, mọi nút bản sao phân tán cuối cùng sẽ đồng bộ và trả về giá trị mới nhất đã được commit.

## Ví dụ
Một website xem video trực tuyến cập nhật số lượt xem theo mô hình nhất quán cuối cùng; người xem ở các quốc gia khác nhau có thể thấy số lượt xem chênh lệch nhau vài chục đơn vị trong hai giây trước khi các máy chủ đồng bộ xong.
