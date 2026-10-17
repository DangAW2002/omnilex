---
label: Phân cụm
qualifier: (Học máy)
aliases: []
loanwords:
  - clustering
plain_descriptions:
  - gom các điểm dữ liệu có đặc điểm tương đồng lại với nhau mà không cần nhãn gắn sẵn
  - thuật toán tự động nhóm các đối tượng có khoảng cách gần nhau trong không gian đặc trưng
summary: >-
  Bài toán học máy không giám sát nhằm phân chia các quan sát thành các nhóm sao cho các phần tử trong cùng nhóm có độ tương đồng cao hơn các phần tử thuộc nhóm khác.
confusable_notes: {}
follow_up_questions:
  - Vị trí khởi tạo các tâm cụm ban đầu ảnh hưởng như thế nào đến kết quả hội tụ của thuật toán k-means?
  - Tại sao phương pháp phân cụm dựa trên mật độ lại phát hiện tốt các cụm có hình dạng bất kỳ so với k-means?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Ph%C3%A2n_c%E1%BB%A5m
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc bạn nhìn lên bầu trời đêm và nhận thấy một số vì sao tự nhiên tập hợp thành từng chòm sao riêng biệt dù không có ai vẽ ranh giới ngăn cách giữa chúng.

## Chi tiết
Thuật toán phân cụm chia nhỏ dữ liệu dựa trên các thước đo khoảng cách như khoảng cách Euclid, độ tương đồng cosine hoặc mật độ kết nối. Các họ thuật toán chính bao gồm phân cụm dựa trên tâm điểm (như k-means tối thiểu hóa phương sai nội cụm), phân cụm phân cấp (tạo biểu đồ cây dendrogram) và phân cụm dựa trên mật độ (như DBSCAN giúp nhận diện nhiễu và các cụm có hình dạng phức tạp).

## Định nghĩa chuyên ngành
Phân hoạch thuật toán không giám sát trên không gian đặc trưng thành các tập con sao cho tối thiểu hóa khoảng cách nội cụm và tối đa hóa khoảng cách liên cụm.

## Ví dụ
Ứng dụng nghe nhạc phân tích 10.000 bài hát, tự động gom thành 6 cụm phong cách âm nhạc dựa trên nhịp độ và âm sắc mà không cần nhập thể loại thủ công.
