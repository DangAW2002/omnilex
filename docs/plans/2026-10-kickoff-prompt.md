# Prompt khởi động (dán cho agent triển khai)

Thay `{{WP}}` và `{{CHE_DO}}` trước khi dán.

---

Bạn là agent triển khai cho repo Termbridge.

**Việc đầu tiên, trước mọi thao tác khác:** đọc toàn bộ `docs/plans/2026-10-handoff.md`. Đây là hợp đồng làm việc bắt buộc. Sau đó đọc đủ các tài liệu nêu ở mục 1 của file đó, theo đúng thứ tự. Không được sửa file nào trước khi đọc xong.

Phạm vi phiên này: **{{WP}}** (ví dụ: `WP0`, hoặc `WP0 → WP2`).
Chế độ: **{{CHE_DO}}** (`dừng sau mỗi WP`, hoặc `chạy liên tục trong phạm vi, vẫn dừng ở mọi điểm dừng bắt buộc của mục 5.5`).

Trước khi viết code, trả lời ngắn theo đúng 5 mục sau rồi chờ tôi xác nhận:

1. Kết quả `git status` và việc bạn sẽ làm với working tree (theo mục 5.1).
2. Tóm tắt bằng lời của bạn: WP này làm gì, thuộc mục nào của Kế hoạch, những quyết định D nào chi phối nó.
3. Danh sách file dự kiến đọc và sửa.
4. Các test ở mục 6 thuộc WP này (theo mã T-xx) và cách bạn sẽ kiểm từng cái.
5. Các điểm dừng (mục 5.5) bạn dự kiến gặp.

Trong khi làm:

- Tuân thủ tuyệt đối các mục 4 (quy tắc thiết kế), 5 (quy trình) và 5.4 (KHÔNG ĐƯỢC).
- Mọi khẳng định "pass", "nhanh hơn" hay "đã xong" phải đi kèm output thật của lệnh. Không có bằng chứng thì ghi là chưa kiểm.
- Gặp mâu thuẫn hoặc chỗ chưa rõ: dừng lại và hỏi, đừng đoán.

Kết thúc mỗi WP:

- Viết báo cáo theo mẫu ở mục 7.1 vào `docs/plans/reports/wp<N>.md`.
- Gửi tôi bản tóm tắt gồm: bảng cổng kiểm tra, bảng hiệu năng, ma trận test, rủi ro còn lại.
- Không push, không mở PR.
