---
label: "Immutability"
aliases:
  - "Tính bất biến"
loanwords:
  - "immutability"
plain_descriptions:
  - "đặc tính của một đối tượng hay dữ liệu mà giá trị không thể bị thay đổi sau khi khởi tạo"
  - "nguyên tắc lập trình quy định mọi sự sửa đổi dữ liệu đều tạo ra bản sao mới thay vì ghi đè lên bộ nhớ cũ"
summary: "Đặc tính của đối tượng hoặc cấu trúc dữ liệu không cho phép trạng thái bên trong bị biến đổi sau khi đã được tạo ra trong bộ nhớ."
confusable_notes: {}
follow_up_questions:
  - "Cơ chế chia sẻ cấu trúc (structural sharing) giúp giảm thiểu chi phí nhân bản bộ nhớ khi dùng dữ liệu bất biến ra sao?"
  - "Vì sao tính bất biến loại bỏ hoàn toàn nguy cơ tranh chấp dữ liệu (data race) trong các hệ thống đa luồng?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một tờ giấy khai sinh đã được đóng dấu đỏ. Sau khi cấp phát, thông tin trên giấy không được tẩy xóa hay viết đè; nếu sau này công dân đổi tên, cơ quan quản lý sẽ cấp một giấy chứng nhận hoàn toàn mới chứ không sửa trực tiếp lên tờ giấy gốc ban đầu.

## Chi tiết
Một đối tượng bất biến giữ nguyên toàn bộ giá trị các trường dữ liệu trong suốt vòng đời của nó. Bất kỳ thao tác nào muốn sửa đổi thông tin đều phải tạo ra một đối tượng bản sao mới mang dữ liệu cập nhật, giữ nguyên vẹn đối tượng ban đầu. Tính bất biến giúp loại bỏ nhiều lỗi phần mềm nguy hiểm: đảm bảo an toàn tuyệt đối khi chạy đa luồng mà không cần dùng khóa khóa dữ liệu (lock), tránh tình trạng dữ liệu bị hàm khác vô tình chỉnh sửa, và giúp việc theo dõi lịch sử trạng thái trở nên cực kỳ đơn giản.

## Định nghĩa chuyên ngành
Sự bảo đảm kiến trúc rằng trạng thái biểu diễn nội bộ và bộ đệm bộ nhớ của một cấu trúc dữ liệu không thể trải qua bất kỳ biến đổi nào sau khi hoàn tất quá trình khởi tạo.

## Ví dụ
Chuỗi ký tự trong Java, C# hay Python là bất biến: khi chạy `text = "hello"; text.toUpperCase();`, hệ thống sinh ra một chuỗi mới tinh là `"HELLO"`, trong khi chuỗi gốc `"hello"` vẫn giữ nguyên vẹn trong RAM.
