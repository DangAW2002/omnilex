---
label: "Bảng băm"
aliases:
  - "Hash map"
  - "Hash table"
loanwords:
  - "hash table"
plain_descriptions:
  - "cấu trúc dữ liệu ghép đôi khóa với giá trị để tìm kiếm thông tin cực nhanh"
  - "cách tổ chức lưu trữ dạng từ điển dùng hàm băm để truy xuất dữ liệu trong thời gian hằng số"
summary: "Cấu trúc dữ liệu ánh xạ các khóa thành giá trị bằng thuật toán băm, cho phép tìm kiếm và cập nhật dữ liệu với tốc độ trung bình hằng số."
confusable_notes:
  array: "Bảng băm ánh xạ các khóa tùy ý thành giá trị nhờ hàm băm, trong khi mảng lưu trữ dữ liệu liên tục theo các chỉ số số nguyên cố định."
follow_up_questions:
  - "Phương pháp nối chuỗi (chaining) và định địa chỉ mở (open addressing) giải quyết xung đột khi hai khóa cùng ra một ô băm ra sao?"
  - "Hệ số tải (load factor) tăng cao buộc bảng băm phải cấp phát lại kích thước mảng đệm như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/B%E1%BA%A3ng_b%C4%83m
    accessed: '2026-10-17'
    note: "Wikipedia tiếng Việt định nghĩa Bảng băm là cấu trúc dữ liệu liên kết khóa với giá trị"
---

## Giải thích dễ hiểu
Hãy tưởng tượng quầy gửi áo khoác ở nhà hát. Khi gửi áo, nhân viên đưa cho bạn một thẻ số bằng đồng; lúc ra về, chỉ cần đưa thẻ số đó ra là nhân viên lấy đúng chiếc áo treo ở móc tương ứng ngay lập tức mà không cần đi tìm qua 500 chiếc áo khác.

## Chi tiết
Bảng băm lưu trữ các cặp khóa - giá trị trong một mảng các ngăn chứa (bucket). Khi thêm hoặc tra cứu một khóa, hàm băm sẽ chuyển đổi khóa đó thành một mã số nguyên, sau đó lấy phần dư chia cho kích thước mảng để tìm vị trí ô lưu. Ở điều kiện lý tưởng, các thao tác tìm kiếm, thêm mới và xóa diễn ra với thời gian hằng số trung bình $O(1)$. Khi hai khóa khác nhau cùng tạo ra một vị trí ô nhớ, các chiến lược xử lý xung đột (như danh sách liên kết hoặc dò tìm tuyến tính) sẽ giải quyết va chạm. Nếu số lượng phần tử vượt quá tỷ lệ sức chứa (hệ số tải), bảng băm sẽ tự động nhân đôi kích thước mảng và băm lại toàn bộ dữ liệu.

## Định nghĩa chuyên ngành
Cấu trúc dữ liệu liên kết tính toán chỉ số mảng thông qua giải thuật băm khóa, cung cấp khả năng truy xuất trực tiếp các bản ghi giá trị với thời gian kỳ vọng là hằng số.

## Ví dụ
Một hệ thống lưu bộ nhớ đệm phiên làm việc: tra cứu khóa chuỗi `"sess_982"` tính ra vị trí ô nhớ 42, trả về đối tượng thông tin người dùng chỉ trong 0,05 mili giây.
