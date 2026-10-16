---
label: Transformer
qualifier: (AI)
aliases: []
loanwords:
  - transformer
plain_descriptions:
  - kiến trúc mạng nơ-ron cốt lõi tạo nên các mô hình ngôn ngữ lớn hiện đại
  - mô hình kết nối các từ trong câu cùng lúc nhờ cơ chế tự chú ý
summary: Kiến trúc mạng nơ-ron dựa trên cơ chế tự chú ý giúp xử lý đồng thời mọi phần tử trong chuỗi dữ liệu mà không cần vòng lặp tuần tự.
confusable_notes: {}
follow_up_questions:
  - Vì sao khả năng xử lý chuỗi song song giúp Transformer mở rộng quy mô tốt hơn mạng hồi quy?
  - Điểm khác biệt giữa các biến thể chỉ dùng bộ giải mã và biến thể mã hóa-giải mã là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Các công cụ dịch đời cũ đọc từng từ một từ trái qua phải như người dùng ngón tay dò chữ; còn Transformer nhìn lướt toàn bộ câu trong tích tắc, hiểu ngay từ đứng đầu liên quan thế nào tới từ đứng cuối.

## Chi tiết
Ra đời vào năm 2017, Transformer thay thế các kết nối tuần tự bằng các khối tự chú ý xếp chồng cùng các tầng mạng truyền xuôi. Mã hóa vị trí giúp mô hình nhận biết thứ tự các phần tử trong câu. Cơ chế chú ý đa đầu chiếu đầu vào vào nhiều không gian con khác nhau, tính toán trọng số tương quan giữa toàn bộ các token cùng lúc. Nhờ tính song song hóa cao, mô hình có thể huấn luyện trên hàng nghìn tỷ token bằng các cụm GPU lớn, tạo nền tảng cho LLM và AI đa phương thức.

## Định nghĩa chuyên ngành
Kiến trúc biến đổi chuỗi truyền xuôi dựa trên cơ chế tự chú ý đa đầu và mã hóa vị trí, loại bỏ hoàn toàn các liên kết hồi quy hoặc phép tích chập thời gian.

## Ví dụ
Một mô hình ngôn ngữ họ Transformer phân tích câu hỏi người dùng và dự đoán chính xác từng từ tiếp theo để soạn thảo hợp đồng dịch vụ hoàn chỉnh.
