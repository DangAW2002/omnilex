---
label: Mạng nơ-ron
aliases:
  - Mạng thần kinh nhân tạo
loanwords:
  - neural network
plain_descriptions:
  - cấu trúc tính toán AI lấy cảm hứng từ mạng lưới tế bào não bộ
  - các tầng nút tính toán truyền tín hiệu qua nhau để nhận diện quy luật
summary: Kiến trúc tính toán gồm các lớp nút nhân tạo liên kết với nhau, truyền tín hiệu có trọng số qua các hàm kích hoạt phi tuyến.
confusable_notes: {}
follow_up_questions:
  - Vì sao các hàm kích hoạt phi tuyến lại bắt buộc phải có trong mạng nơ-ron nhiều tầng?
  - Điểm khác biệt mấu chốt giữa mạng truyền xuôi và mạng có cơ chế chú ý là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/M%E1%BA%A1ng_n%C6%A1-ron_nh%C3%A2n_t%E1%BA%A1o
    accessed: '2026-10-16'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một dây chuyền phân loại: hàng nhân viên đầu tiên nhìn ra các đường nét cơ bản, hàng tiếp theo ghép các nét thành hình khối cụ thể, và nhóm cuối cùng đối chiếu tổng thể để xác định món đồ.

## Chi tiết
Mạng nơ-ron nhân tạo tổ chức các đơn vị tính toán theo lớp đầu vào, các lớp ẩn và lớp đầu ra. Mỗi nơ-ron tính tổng có trọng số của các tín hiệu đến, cộng thêm độ lệch và truyền qua hàm kích hoạt phi tuyến như ReLU hoặc GELU. Việc xếp chồng nhiều tầng cho phép mạng học biểu diễn đặc trưng theo cấp bậc, từ các chi tiết thô đến những khái niệm trừu tượng. Toàn bộ trọng số được tối ưu thông qua giải thuật lan truyền ngược.

## Định nghĩa chuyên ngành
Đồ thị tính toán có hướng gồm các đơn vị xử lý xếp lớp, thực hiện các biến đổi afin có tham số kết hợp hàm kích hoạt phi tuyến để xấp xỉ các hàm đa biến phức tạp.

## Ví dụ
Mạng nơ-ron tích chập tiếp nhận ma trận điểm ảnh từ hóa đơn viết tay rồi lần lượt bóc tách nét chữ để nhận dạng chính xác từng con số tiền gửi ngân hàng.
