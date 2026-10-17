---
label: "Biểu thức chính quy (regex)"
aliases:
  - "Regex"
  - "regex"
  - "Biểu thức chính quy"
loanwords:
  - "regular expression"
  - "regex"
autolink:
  aliases:
    Regex: always
    regex: always
plain_descriptions:
  - "mẫu ký tự cô đọng dùng để tìm kiếm, khớp và trích xuất các chuỗi văn bản theo quy tắc"
  - "khuôn mẫu định dạng kiểm tra tính hợp lệ của dữ liệu đầu vào như địa chỉ email hay số điện thoại"
summary: "Chuỗi các ký tự định nghĩa mẫu tìm kiếm được các giải thuật xử lý văn bản sử dụng để so khớp, kiểm thực và biến đổi chuỗi."
confusable_notes: {}
follow_up_questions:
  - "Hiện tượng quay lui thảm họa (catastrophic backtracking) trong bộ máy regex gây ra lỗ hổng tấn công từ chối dịch vụ ReDoS ra sao?"
  - "Việc biên dịch trước biểu thức chính quy mang lại lợi thế hiệu năng thế nào so với việc phân tích mẫu lặp đi lặp lại?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Bi%E1%BB%83u_th%E1%BB%A9c_ch%C3%ADnh_quy
    accessed: '2026-10-17'
    note: "Wikipedia tiếng Việt ghi nhận thuật ngữ Biểu thức chính quy tương đương regular expression"
---

## Giải thích dễ hiểu
Hãy tưởng tượng một tấm khuôn kim loại có đục sẵn các lỗ tròn đúng kích cỡ. Khi hàng nghìn đồng xu lăn qua máng trượt, chỉ những đồng tiền có đường kính đúng 24 milimét mới lọt vừa qua lỗ mẫu, trong khi các vật thể hình vuông hoặc sai kích thước sẽ bị gạt lại.

## Chi tiết
Biểu thức chính quy được biên dịch thành một máy trạng thái hữu hạn để so khớp các chuỗi ký tự theo quy tắc ngữ pháp cô đọng. Các ký tự đặc biệt quy định điểm neo (`^`, `$`), lớp ký tự (`\d`, `[a-z]`), lượng từ (`+`, `*`, `{2,5}`), phép chọn lựa (`|`) và nhóm bắt giữ (`(...)`). Ứng dụng phổ biến nhất là xác thực định dạng dữ liệu (như số điện thoại, email), trích xuất thông tin từ tệp nhật ký máy chủ và tìm kiếm thay thế hàng loạt. Nếu viết biểu thức lồng ghép các lượng từ thiếu chặt chẽ, chương trình có thể bị treo do hiện tượng quay lui vô tận.

## Định nghĩa chuyên ngành
Ký hiệu đại số hình thức định nghĩa một ngôn ngữ chính quy được chấp nhận bởi một máy tự động hữu hạn, được ứng dụng trong các hệ thống xử lý chuỗi để nhận dạng mẫu và quét từ vựng.

## Ví dụ
Mẫu `^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$` kiểm tra chuỗi ký tự người dùng nhập vào có đúng chuẩn định dạng email hay không trước khi lưu tài khoản.
