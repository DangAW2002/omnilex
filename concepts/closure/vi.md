---
label: "Closure"
qualifier: "(Lập trình)"
aliases:
  - "Bao đóng"
loanwords:
  - "closure"
plain_descriptions:
  - "hàm đi kèm với các biến thuộc phạm vi bên ngoài nơi nó được sinh ra"
  - "hàm con vẫn ghi nhớ và truy cập được biến của hàm cha ngay cả khi hàm cha đã chạy xong"
summary: "Hàm được đóng gói cùng môi trường từ vựng xung quanh, cho phép nó truy cập các biến của phạm vi bao bọc bên ngoài ngay cả khi hàm ngoài đã kết thúc."
confusable_notes: {}
follow_up_questions:
  - "Closure giúp che giấu dữ liệu nội bộ và tạo biến riêng tư (private variable) như thế nào?"
  - "Những trường hợp nào việc giữ tham chiếu qua closure có thể dẫn đến rò rỉ bộ nhớ ngoài ý muốn?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một sinh viên xa nhà đi học đại học mang theo cuốn sổ tay ghi chép công thức nấu ăn của gia đình. Dù sinh viên đó đã chuyển đến một thành phố khác và sống độc lập, mỗi khi giở sổ ra vẫn xem và dùng được toàn bộ kinh nghiệm nấu ăn từ người thân ở quê nhà.

## Chi tiết
Trong các ngôn ngữ hỗ trợ hàm hạng nhất, khi một hàm được định nghĩa bên trong một hàm khác, một closure sẽ được tạo ra. Closure giữ lại tham chiếu đến các biến cục bộ và tham số của hàm cha, giúp chúng không bị hệ thống dọn dẹp khi hàm cha hoàn tất thực thi. Cơ chế này là nền tảng cho các kỹ thuật lập trình phổ biến như tạo hàm theo mẫu (function factory), bảo vệ trạng thái riêng tư và xử lý các hàm gọi lại bất đồng bộ. Các biến được giữ lại sẽ tồn tại trên vùng nhớ cho tới khi hàm con không còn được tham chiếu nữa.

## Định nghĩa chuyên ngành
Cặp thực thể bao gồm một đối tượng hàm và bản ghi môi trường từ vựng chứa các liên kết cho mọi biến tự do được bắt giữ trong thời điểm hàm đó được khởi tạo.

## Ví dụ
Một hàm tạo bộ đếm khởi tạo giá trị mốc là 10; mỗi lần gọi hàm con được trả về, giá trị ẩn bên trong lần lượt tăng lên 11 rồi 12 một cách độc lập.
