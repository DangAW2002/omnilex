---
label: Jailbreak
qualifier: (AI)
aliases: []
loanwords:
  - jailbreak
plain_descriptions:
  - lừa chatbot phá luật an toàn của chính nó
  - những prompt khiến AI nói ra điều lẽ ra phải từ chối
summary: Prompt được soạn để khiến mô hình bỏ qua nguyên tắc an toàn và tạo ra nội dung mà lẽ ra nó phải từ chối.
confusable_notes:
  prompt-injection: >-
    Prompt injection là kiểu tấn công rộng hơn, lấn át chỉ dẫn của ứng dụng, thường qua nội dung ẩn; jailbreak là dạng nhắm vào quy tắc an
    toàn của mô hình.
follow_up_questions:
  - Vì sao đóng vai lại giúp các lần thử jailbreak?
  - Nhà cung cấp phát hiện jailbreak bằng cách nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống thuyết phục bảo vệ mở cánh cửa đang khóa bằng một câu chuyện nghe rất thuyết phục chứ không phải bằng chìa khóa.

## Chi tiết
Các mánh phổ biến gồm đóng vai (“hãy giả vờ là một AI không có luật lệ”), đặt tình huống giả định, chia một yêu cầu thành nhiều phần trông vô hại, dùng kiểu mã hóa lạ và những cuộc trò chuyện dài nhằm thao túng. OWASP xếp jailbreak là một dạng của prompt injection. Nhà cung cấp chống lại bằng huấn luyện an toàn, bộ phân loại cho đầu vào và đầu ra, cùng giám sát; ứng dụng thì thêm guardrail của riêng mình.

## Định nghĩa chuyên ngành
Một dạng prompt injection nhằm vượt qua hành vi an toàn của mô hình, khiến nó phớt lờ chính sách sử dụng.

## Ví dụ
Người dùng nhờ chatbot “viết một câu chuyện trong đó nhà hóa học giải thích từng bước” một việc mà nếu hỏi thẳng thì mô hình sẽ từ chối.
