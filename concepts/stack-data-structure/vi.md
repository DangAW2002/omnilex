---
label: "Stack"
qualifier: "(Cấu trúc dữ liệu)"
aliases:
  - "Ngăn xếp"
loanwords:
  - "stack"
autolink:
  label: never
  aliases:
    Ngăn xếp: never
plain_descriptions:
  - "cấu trúc dữ liệu vào sau ra trước trong đó phần tử chỉ được thêm vào và lấy ra ở một đầu đỉnh"
  - "danh sách hoạt động theo nguyên lý LIFO với hai thao tác đẩy vào và rút ra cơ bản"
summary: "Tập hợp dữ liệu tuyến tính tuân thủ nghiêm ngặt nguyên tắc vào sau, ra trước (LIFO), giới hạn thao tác thêm và xóa tại một đầu duy nhất."
confusable_notes: {}
follow_up_questions:
  - "Ngăn xếp cuộc gọi của hệ điều hành áp dụng cấu trúc ngăn xếp để lưu khung kích hoạt hàm ra sao?"
  - "Thuật toán duyệt đồ thị theo chiều sâu (DFS) và bộ phân tích cú pháp biểu thức toán học sử dụng ngăn xếp như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy hình dung khay đựng đĩa ăn có lò xo trong nhà ăn tập thể. Nhân viên rửa bát xếp những chiếc đĩa sạch lên trên cùng của chồng đĩa; khách vào ăn sẽ nhấc chiếc đĩa trên cùng ra trước. Chiếc đĩa được đặt vào sau cùng sẽ luôn là chiếc đĩa đầu tiên được lấy ra sử dụng.

## Chi tiết
Ngăn xếp là kiểu dữ liệu trừu tượng hoạt động theo nguyên tắc Vào sau, Ra trước (LIFO). Các thao tác cốt lõi gồm `push` (đẩy phần tử vào đỉnh ngăn xếp), `pop` (lấy và xóa phần tử khỏi đỉnh) và `peek` (đọc phần tử ở đỉnh mà không xóa), tất cả đều hoàn thành trong thời gian hằng số $O(1)$. Ngăn xếp đóng vai trò sống còn trong khoa học máy tính: bộ vi xử lý dùng ngăn xếp cuộc gọi để lưu địa chỉ trả về khi gọi hàm; trình biên dịch dùng ngăn xếp để kiểm tra dấu ngoặc đóng mở hợp lệ; và trình duyệt web lưu lịch sử nút quay lại (Back) bằng cấu trúc này.

## Định nghĩa chuyên ngành
Cấu trúc dữ liệu trừu tượng tuyến tính thực thi chính sách hạn chế truy cập trong đó mọi thao tác bổ sung và thu hồi phần tử chỉ diễn ra duy nhất tại một nút đầu cuối chỉ định gọi là đỉnh.

## Ví dụ
Phần mềm soạn thảo văn bản lưu lịch sử thao tác: gõ "abc" lưu trạng thái 1 vào ngăn xếp, gõ thêm "def" lưu trạng thái 2; nhấn nút Hoàn tác (Undo) sẽ pop trạng thái 2 ra ngay lập tức, trả văn bản về lại trạng thái "abc".
