---
label: Embedding
aliases:
  - embedding vector
  - vector embedding
loanwords:
  - embedding
plain_descriptions:
  - biến chữ thành một dãy số để máy so sánh được ý nghĩa
  - những con số đặt các ý giống nhau nằm gần nhau
summary: Dãy số do mô hình học ra để biểu diễn một đối tượng như từ hay tài liệu, sao cho các đối tượng giống nhau nằm gần nhau.
confusable_notes: {}
follow_up_questions:
  - Độ giống nhau của hai embedding được đo bằng cách nào?
  - Vì sao tìm kiếm bằng embedding lại thấy được từ không hề có trong câu tìm?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Hãy hình dung tọa độ trên một tấm bản đồ ý nghĩa: “con mèo” và “mèo con” nằm sát nhau, cách rất xa “hóa đơn”.

## Chi tiết
Mô hình embedding ánh xạ văn bản, hình ảnh hoặc dữ liệu khác thành vector có hàng trăm đến hàng nghìn chiều. Khoảng cách hay độ tương đồng cosine giữa các vector phản ánh gần đúng độ giống nhau về nghĩa, làm nền cho tìm kiếm ngữ nghĩa, gợi ý, gom nhóm và bước truy xuất của RAG. Từng chiều riêng lẻ hiếm khi mang một ý nghĩa mà con người gọi tên được.

## Định nghĩa chuyên ngành
Vector đặc gồm các số thực, được học trong quá trình huấn luyện, biểu diễn đầu vào trong một không gian mà độ gần về hình học phản ánh độ tương đồng.

## Ví dụ
Tìm “máy tính xách tay” vẫn ra những tài liệu chỉ ghi “laptop”, vì embedding của chúng nằm gần nhau.
