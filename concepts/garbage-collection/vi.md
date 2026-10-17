---
label: "Thu gom rác"
aliases: []
loanwords:
  - "garbage collection"
plain_descriptions:
  - "hệ thống quản lý bộ nhớ tự động tìm và thu hồi các vùng nhớ của đối tượng không còn dùng nữa"
  - "tính năng của môi trường thực thi tự động giải phóng vùng nhớ heap mà mã nguồn không thể truy cập"
summary: "Cơ chế quản lý bộ nhớ tự động trong môi trường thực thi giúp phát hiện và thu hồi các vùng nhớ heap không còn được chương trình tham chiếu tới."
confusable_notes:
  memory-leak: "Thu gom rác là cơ chế tự động quét và tái chế bộ nhớ không dùng, còn rò rỉ bộ nhớ là lỗi mã nguồn khiến các đối tượng không thể được giải phóng."
follow_up_questions:
  - "Mô hình thu gom rác theo thế hệ (generational GC) tận dụng quy luật các đối tượng thường có vòng đời ngắn ra sao?"
  - "Hiện tượng dừng toàn bộ hệ thống (stop-the-world pause) trong quá trình đánh dấu và quét gây ảnh hưởng gì tới các ứng dụng yêu cầu độ trễ thấp?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Thu_gom_r%C3%A1c_(khoa_h%E1%BB%8Dc_m%C3%A1y_t%C3%ADnh)
    accessed: '2026-10-17'
    note: "Wikipedia tiếng Việt ghi nhận thuật ngữ Thu gom rác trong khoa học máy tính"
---

## Giải thích dễ hiểu
Hãy tưởng tượng đội ngũ dọn vệ sinh trong một trung tâm tổ chức sự kiện. Khi khách uống xong cà phê và để lại cốc giấy rỗng trên bàn rồi rời đi, nhân viên vệ sinh sẽ đi thu gom các cốc bỏ đi này bỏ vào thùng rác để bàn luôn sạch sẽ đón tiếp người mới.

## Chi tiết
Bộ thu gom rác giúp lập trình viên không phải tự tay giải phóng từng vùng nhớ heap một cách thủ công. Phần lớn các môi trường hiện đại dùng thuật toán truy vết như đánh dấu và quét (mark-and-sweep): bắt đầu từ các gốc tham chiếu (biến trên stack, thanh ghi, biến tĩnh), bộ máy duyệt qua toàn bộ con trỏ, giữ lại đối tượng còn sống và thu hồi các vùng nhớ không còn ai trỏ tới. Các bộ thu gom rác tiên tiến chia đối tượng theo các thế hệ tuổi thọ (generation 0, 1, 2) để dọn dẹp thường xuyên các đối tượng dùng tạm, giảm thiểu độ trễ và tránh làm đứng chương trình.

## Định nghĩa chuyên ngành
Dịch vụ quản lý bộ nhớ tự động của môi trường thời gian chạy có nhiệm vụ xác định các khối cấp phát không thể tiếp cận thông qua duyệt đồ thị tham chiếu và tái chế vùng nhớ vật lý.

## Ví dụ
Một vòng lặp sinh ra 10.000 đối tượng tính toán tạm thời; ngay khi vòng lặp kết thúc và biến cục bộ hết phạm vi, bộ thu gom rác kích hoạt quét thế hệ 0 và thu hồi sạch sẽ 10.000 đối tượng chỉ trong 4 mili giây.
