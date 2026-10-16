---
label: Function calling
aliases:
  - tool use
  - tool calling
loanwords:
  - function calling
plain_descriptions:
  - cho AI bấm nút trong các ứng dụng khác
  - AI nhờ code của mình lấy dữ liệu hoặc thực hiện một thao tác
summary: Khả năng của mô hình trả về một yêu cầu có cấu trúc để gọi công cụ do nhà phát triển định nghĩa; ứng dụng chạy nó rồi gửi lại kết quả.
confusable_notes: {}
follow_up_questions:
  - Ai mới thực sự chạy hàm mà mô hình yêu cầu?
  - Model Context Protocol liên quan thế nào tới function calling?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống một quản lý không biết dùng phần mềm kho nhưng biết điền phiếu yêu cầu; nhân viên kho làm theo phiếu rồi báo lại kết quả.

## Chi tiết
Nhà phát triển mô tả từng công cụ gồm tên, mục đích và một JSON schema cho dữ liệu đầu vào. Khi cần đến công cụ, mô hình trả lời bằng tên công cụ kèm tham số thay vì văn bản thường. Ứng dụng thực hiện lời gọi, gửi kết quả lại, và mô hình dùng kết quả đó ở lượt kế tiếp. Bản thân mô hình không bao giờ tự chạy code.

## Định nghĩa chuyên ngành
Giao diện trong đó mô hình ngôn ngữ phát ra các lời gọi có cấu trúc tới những hàm định nghĩa bên ngoài; ứng dụng phía client thực thi và trả kết quả về cho mô hình.

## Ví dụ
Được hỏi “Mai Đà Nẵng có mưa không?”, mô hình gọi get_weather với tên thành phố và ngày, rồi trả lời dựa trên dự báo mà ứng dụng gửi lại.
