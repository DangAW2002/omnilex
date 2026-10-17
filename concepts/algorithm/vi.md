---
label: "Thuật toán"
aliases: []
loanwords:
  - "algorithm"
plain_descriptions:
  - "tập hợp các bước chỉ dẫn rõ ràng, tuần tự được thiết kế để giải quyết một bài toán cụ thể"
  - "công thức tính toán tiếp nhận dữ liệu đầu vào và cho ra kết quả mong muốn một cách xác định"
summary: "Dãy hữu hạn các chỉ dẫn rõ ràng, có thứ tự được thiết kế nhằm thực hiện một phép tính hoặc giải quyết một bài toán cụ thể."
confusable_notes: {}
follow_up_questions:
  - "Các kỹ sư đánh giá sự đánh đổi giữa độ phức tạp thời gian và lượng bộ nhớ tiêu thụ của thuật toán ra sao?"
  - "Điều gì phân biệt thuật toán tiền định (deterministic) với thuật toán ngẫu nhiên trong các hệ thống phân tán?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Thu%E1%BA%ADt_to%C3%A1n
    accessed: '2026-10-17'
    note: "Wikipedia tiếng Việt định nghĩa Thuật toán là một tập hợp hữu hạn các hướng dẫn chặt chẽ"
---

## Giải thích dễ hiểu
Hãy tưởng tượng một công thức làm bánh mì chi tiết. Công thức ghi rõ định lượng nguyên liệu và các bước tuần tự (trộn bột, nhào 10 phút, ủ trong 1 giờ, nướng ở 200 độ C), đảm bảo bất kỳ ai làm đúng theo hướng dẫn cũng sẽ cho ra lò một ổ bánh mì thơm ngon.

## Chi tiết
Thuật toán là một quy trình trừu tượng, độc lập với ngôn ngữ lập trình dùng để biến đổi dữ liệu đầu vào thành kết quả mong muốn. Thuật toán phải đáp ứng các tính chất cốt lõi: tính hữu hạn (phải dừng sau một số bước nhất định), tính xác định (mọi câu lệnh đều rõ ràng, không thể hiểu nước đôi), tính đúng đắn và tính khả thi. Kỹ sư phân tích thuật toán dựa trên độ phức tạp thời gian (thời gian chạy tương ứng với lượng dữ liệu) và độ phức tạp không gian (bộ nhớ RAM cần cấp phát), thường được lượng hóa qua ký hiệu Big O.

## Định nghĩa chuyên ngành
Dãy hữu hạn các quy tắc tính toán tiền định và được sắp thứ tự chặt chẽ, ánh xạ một miền dữ liệu đầu vào thành miền kết quả đầu ra xác định.

## Ví dụ
Thuật toán Euclid tìm ước số chung lớn nhất của 252 và 105 bằng cách liên tục lấy số lớn chia cho số nhỏ và giữ lại phần dư, đưa ra đáp số 21 sau đúng bốn bước tính.
