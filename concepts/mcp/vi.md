---
label: Model Context Protocol
aliases:
  - MCP
loanwords:
  - model context protocol
autolink:
  aliases:
    MCP: always
plain_descriptions:
  - phích cắm chuẩn để ứng dụng AI nối với công cụ và dữ liệu
  - một cách chung để chatbot nói chuyện với phần mềm khác
summary: Giao thức mở chuẩn hóa cách ứng dụng AI kết nối với công cụ, nguồn dữ liệu và quy trình bên ngoài thông qua các MCP server.
confusable_notes: {}
follow_up_questions:
  - MCP host, client và server khác nhau thế nào?
  - Vì sao nên viết một MCP server thay vì plugin riêng cho từng ứng dụng?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống ổ cắm điện tiêu chuẩn: thiết bị nào có phích khớp thì cắm được ở mọi nhà, nên một công cụ viết một lần là dùng được với mọi trợ lý tương thích.

## Chi tiết
MCP định nghĩa host (ứng dụng AI), các client do host chạy, và server cung cấp công cụ, tài nguyên và mẫu prompt. Một server viết một lần là chạy được với mọi host hỗ trợ giao thức, thay vì phải làm tích hợp riêng cho từng ứng dụng. Thông điệp dùng JSON-RPC 2.0, truyền qua stdin/stdout tới một tiến trình server trên máy, hoặc qua HTTP tới server từ xa.

## Định nghĩa chuyên ngành
Giao thức mở qua đó ứng dụng AI làm việc với hệ thống bên ngoài: server cung cấp công cụ, tài nguyên và mẫu prompt, còn ứng dụng client dùng chúng theo một cách thống nhất.

## Ví dụ
Một nhóm cài MCP server cho hệ thống quản lý ticket; trợ lý lập trình của họ liền tìm và cập nhật ticket được mà không cần plugin viết riêng.
