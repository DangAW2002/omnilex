---
label: Token
qualifier: (AI)
aliases: [mẩu từ AI]
loanwords: [token]
plain_descriptions:
  - đơn vị AI dùng để đếm chữ
  - lý do AI tính tiền theo độ dài văn bản
summary: Mẩu văn bản nhỏ, thường là một phần của từ, mà mô hình AI đọc và viết.
confusable_notes:
  token-auth: Token xác thực là chuỗi mã chứng minh bạn đã đăng nhập hoặc được cấp quyền hệ thống.
  token-crypto: Token tiền mã hóa là tài sản số hoặc đơn vị giá trị phát hành trên blockchain.
follow_up_questions:
  - Một token trong tiếng Việt thường tương đương bao nhiêu ký tự hoặc từ?
  - Tokenizer của mô hình ngôn ngữ tách chữ tiếng Việt theo cơ chế nào?
translation: native
---

## Giải thích dễ hiểu
AI không đọc nguyên cả từ như con người, mà chia chữ thành các mảnh ghép lego nhỏ gọi là token để ghép vần và tính toán xác suất.

## Chi tiết
Mỗi token tương đương khoảng 4 ký tự hoặc 0.75 từ tiếng Anh. Với tiếng Việt có dấu, số lượng token thường nhiều hơn do thuật toán tách từ phụ thuộc vào bộ mã hóa (BPE / WordPiece).

## Định nghĩa chuyên ngành
Đơn vị cơ bản của chuỗi văn bản đầu vào và đầu ra sau khi qua khâu tokenization của mô hình ngôn ngữ lớn (LLM).

## Ví dụ
Câu "Xin chào thế giới" có thể được chia thành 4 đến 5 token tùy theo tokenizer của GPT hoặc Claude.
