---
label: Nhận dạng ký tự quang học (OCR)
aliases:
  - OCR
loanwords:
  - optical character recognition
autolink:
  aliases:
    OCR: always
plain_descriptions:
  - phần mềm trích xuất văn bản có thể chỉnh sửa từ ảnh chụp tài liệu, hóa đơn hoặc văn bản in
  - công nghệ quét chữ quang học biến hình ảnh tài liệu giấy thành chữ số hóa
summary: >-
  Công nghệ thị giác máy tính dùng để phát hiện và chuyển đổi chữ viết tay hoặc chữ in trong các hình ảnh quét thành văn bản kỹ thuật số có thể tìm kiếm và chỉnh sửa.
confusable_notes: {}
follow_up_questions:
  - Thuật toán phát hiện văn bản tách các dòng chữ bị nghiêng hoặc dính nhau trên tài liệu cũ như thế nào?
  - Những phương pháp hậu xử lý nào giúp sửa lỗi nhận dạng giữa các ký tự có hình dạng tương đồng?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Nh%E1%BA%ADn_d%E1%BA%A1ng_k%C3%BD_t%E1%BB%B1_quang_h%E1%BB%8Dc
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc bạn chụp lại một hóa đơn ăn uống bằng điện thoại, và ứng dụng tự động nhận diện các dòng chữ để bạn có thể sao chép món ăn và số tiền vào bảng tính.

## Chi tiết
Nhận dạng ký tự quang học gồm hai công đoạn chính: phát hiện vùng chữ và nhận dạng ký tự. Đầu tiên, mô hình mạng nơ-ron xác định tọa độ các hộp chứa từng dòng chữ. Sau đó, bộ giải mã chuỗi kết hợp tích chập và transformer sẽ phân tích hình dạng ký tự để dịch thành mã văn bản chuẩn, xử lý tốt cả trường hợp giấy bị nhàu, font chữ đặc thù hay góc nghiêng khi chụp ảnh.

## Định nghĩa chuyên ngành
Quá trình thuật toán định vị không gian và dịch mã các mẫu ký tự quang học từ tệp ảnh điểm sang các định dạng mã hóa ký tự tiêu chuẩn.

## Ví dụ
Phần mềm kế toán quét ảnh hóa đơn giấy, tự động bóc tách 35 dòng sản phẩm và ghi nhận chính xác tổng số tiền thanh toán 4.250.000 đồng chỉ trong 200 mili giây.
