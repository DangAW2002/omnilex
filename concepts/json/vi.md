---
label: JSON
aliases:
  - JavaScript Object Notation
loanwords:
  - json
autolink:
  label: always
plain_descriptions:
  - định dạng văn bản thông dụng dùng để truyền tải thông tin giữa máy tính và web
  - cách viết dữ liệu có dạng dấu ngoặc nhọn chứa các cặp tên và giá trị dễ đọc
summary: Định dạng trao đổi dữ liệu dạng văn bản gọn nhẹ dựa trên các cặp khóa-giá trị và danh sách có thứ tự, độc lập với ngôn ngữ lập trình.
confusable_notes: {}
follow_up_questions:
  - Tại sao JSON không hỗ trợ sẵn dữ liệu nhị phân hoặc đối tượng ngày tháng?
  - JSON có ưu và nhược điểm gì khi so sánh với các định dạng nhị phân như Protocol Buffers?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như một tờ phiếu gửi hàng ghi rõ ràng các mục Tên, Địa chỉ, Số tiền mà nhân viên ở bất kỳ bưu cục nào cũng đọc hiểu được ngay.

## Chi tiết
Cấu trúc JSON xoay quanh hai kiểu dữ liệu chính: tập hợp các cặp khóa-giá trị (bao bởi dấu ngoặc nhọn) và mảng danh sách các giá trị (bao bởi dấu ngoặc vuông). Các kiểu dữ liệu cơ bản gồm chuỗi, số, giá trị đúng sai và giá trị rỗng.

## Định nghĩa chuyên ngành
Định dạng tuần tự hóa dữ liệu dạng văn bản không phụ thuộc nền tảng, được chuẩn hóa theo RFC 8259 và dùng phổ biến trong giao tiếp mạng.

## Ví dụ
Gửi gói tin cập nhật trạng thái đơn hàng dạng `{"order_id": "VN102", "status": "delivered"}` qua mạng.
