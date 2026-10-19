# Prompt khởi động (dán nguyên văn cho agent triển khai)

---

Bạn là agent triển khai cho repo OMNILEX (`D:\Users\Dang\OMNILEX`).

**Việc đầu tiên, trước mọi thao tác khác:** đọc toàn bộ `docs/plans/2026-10-handoff.md`. Đây là hợp đồng làm việc bắt buộc. Sau đó đọc đủ các tài liệu nêu ở mục 1 của file đó, theo đúng thứ tự. Không được sửa file nào trước khi đọc xong.

**Bối cảnh git:**
- Mốc ban đầu đã được commit trên nhánh `chore/baseline-and-plans` (dùng HEAD của nhánh này), và working tree đang sạch.
- Repo chưa có remote.
- Tách mọi nhánh WP từ `chore/baseline-and-plans`. Mỗi WP xong thì WP sau tách từ nhánh của WP trước.

**Phạm vi phiên này:** WP0 → WP4, theo đúng thứ tự WP0, WP1, WP2, WP3, WP4. Không làm WP5 trở đi.

**Chế độ:** chạy liên tục trong phạm vi trên, nhưng vẫn **dừng ở mọi điểm dừng bắt buộc của mục 5.5**. Cụ thể:
- dừng ở việc mở O-2 trước khi chạy `git add --renormalize .`;
- dừng sau ghi chú thiết kế của WP2;
- dừng khi định thêm dependency mới;
- dừng khi định đặt `reuse: adapt` cho bất kỳ nguồn nào;
- dừng khi cổng kiểm tra fail 2 lần.

Ở mỗi điểm dừng, chỉ hỏi đúng điều cần quyết, kèm đề xuất của bạn.

**Trong WP0, phải giải quyết các việc mở O-1, O-2, O-3 ở mục 2.1 của bàn giao**, rồi cập nhật kết quả vào chính file bàn giao.

Trước khi viết code, trả lời ngắn theo đúng 5 mục sau rồi chờ tôi xác nhận:

1. Kết quả `git status`, nhánh hiện tại, và nhánh bạn sẽ tạo cho WP0.
2. Tóm tắt bằng lời của bạn: mỗi WP từ WP0 đến WP4 làm gì, thuộc mục nào của Kế hoạch, những quyết định D nào chi phối nó.
3. Danh sách file dự kiến đọc và sửa cho WP0.
4. Các test ở mục 6 thuộc WP0–WP4 (theo mã T-xx) và cách bạn sẽ kiểm từng cái.
5. Các điểm dừng (mục 5.5) bạn dự kiến gặp trong phạm vi này.

Trong khi làm:

- Tuân thủ tuyệt đối các mục 4 (quy tắc thiết kế), 5 (quy trình) và 5.4 (KHÔNG ĐƯỢC) của bàn giao.
- Trước mỗi WP, chạy toàn bộ cổng kiểm tra ở mục 5.3 ngay trên máy và ghi lại kết quả làm mốc.
- Mọi khẳng định "pass", "nhanh hơn" hay "đã xong" phải đi kèm output thật của lệnh. Không có bằng chứng thì ghi là chưa kiểm.
- Gặp mâu thuẫn hoặc chỗ chưa rõ: dừng lại và hỏi, đừng đoán.
- Nếu giao việc cho agent phụ, bạn vẫn tự đọc diff và chạy lại cổng kiểm tra (mục 5.6).

Kết thúc mỗi WP:

- Viết báo cáo theo mẫu ở mục 7.1 vào `docs/plans/reports/wp<N>.md`.
- Commit theo Conventional Commits.
- Gửi tôi bản tóm tắt gồm: bảng cổng kiểm tra, bảng hiệu năng (trước/sau), ma trận test T-xx, rủi ro còn lại.
- Không push, không mở PR, không merge vào `master`.

Kết thúc phiên (sau WP4, hoặc khi phải dừng):

- Gửi tôi tổng kết: các WP đã xong, nhánh và commit tương ứng, số đo hiệu năng ở 1.000 và 10.000 khái niệm, việc còn mở, và đề xuất phạm vi cho phiên tiếp theo (WP5–WP8).
