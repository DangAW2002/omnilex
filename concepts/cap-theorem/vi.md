---
label: Định lý CAP
aliases:
  - định lý Brewer
  - CAP theorem
loanwords: []
plain_descriptions:
  - nguyên tắc cốt lõi khẳng định hệ thống phân tán chỉ có thể chọn tối đa hai trong ba yếu tố nhất quán, sẵn sàng và chịu lỗi mạng
  - quy luật chỉ ra khi mạng đứt, cơ sở dữ liệu buộc phải chọn giữa việc trả lời đúng số liệu mới nhất hay vẫn tiếp tục phục vụ
summary: Nguyên lý cơ bản của điện toán phân tán khẳng định một kho lưu trữ phân tán chỉ có thể đồng thời đáp ứng tối đa hai trong ba bảo đảm, Nhất quán, Sẵn sàng và Chịu lỗi mạng.
confusable_notes: {}
follow_up_questions:
  - Tại sao khả năng chịu lỗi mạng (Partition tolerance) là yếu tố bắt buộc đối với mọi hệ thống phân tán chạy trên mạng vật lý thực tế?
  - Định lý PACELC mở rộng định lý CAP bằng cách mô hình hóa sự đánh đổi giữa độ trễ và tính nhất quán khi mạng bình thường như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/%C4%90%E1%BB%8Bnh_l%C3%BD_CAP
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng ba người bạn cùng chia sẻ một cuốn lịch hẹn qua điện thoại. Nếu mạng di động bị đứt, họ chỉ có thể chọn một trong hai cách: ngừng nhận lịch mới để tránh bị trùng giờ hẹn (Tính nhất quán), hoặc cứ tiếp tục nhận lịch rồi sau này tự đối chiếu sửa lỗi sau (Tính sẵn sàng).

## Chi tiết
Được phát biểu bởi Eric Brewer, định lý định nghĩa ba đặc tính: Tính nhất quán C (mọi lệnh đọc đều nhận được dữ liệu ghi mới nhất hoặc báo lỗi), Tính sẵn sàng A (mọi nút máy chủ hoạt động đều trả về kết quả hợp lệ), và Khả năng chịu lỗi phân mảnh P (hệ thống vẫn chạy khi đường mạng truyền tin bị đứt đoạn). Vì mạng vật lý luôn có nguy cơ bị đứt, kiến trúc sư buộc phải chọn hệ thống CP (ưu tiên nhất quán) hoặc AP (ưu tiên sẵn sàng).

## Định nghĩa chuyên ngành
Định lý trong điện toán phân tán chứng minh rằng khi xảy ra lỗi phân mảnh đường truyền mạng, hệ thống lưu trữ phân tán bắt buộc phải đánh đổi giữa tính nhất quán tuyến tính hóa và tính sẵn sàng cao.

## Ví dụ
Khi tuyến cáp quang nối hai trung tâm dữ liệu bị đứt, cơ sở dữ liệu kiểu CP sẽ từ chối các lệnh ghi mới để tránh xung đột dữ liệu, trong khi hệ thống kiểu AP vẫn cho phép ghi tại chỗ và chấp nhận đồng bộ dữ liệu bù khi đường truyền được khắc phục.
