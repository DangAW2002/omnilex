---
label: Bộ xử lý đồ họa (GPU)
aliases:
  - GPU
loanwords:
  - Graphics Processing Unit
  - GPU
autolink:
  aliases:
    GPU: always
plain_descriptions:
  - dòng chip phần cứng chuyên dụng chạy hàng nghìn phép toán song song cho AI
  - bộ xử lý máy tính tốc độ cao dùng để tăng tốc huấn luyện và chạy mô hình nơ-ron
summary: Bộ vi xử lý điện tử chuyên dụng được tối ưu hóa để thực thi song song khối lượng lớn các phép tính ma trận phục vụ học sâu.
confusable_notes: {}
follow_up_questions:
  - Vì sao băng thông bộ nhớ thường là điểm nghẽn lớn hơn cả tốc độ tính toán khi chạy suy luận LLM?
  - Các nhân Tensor chuyên dụng bên trong GPU hiện đại giúp tăng tốc phép nhân ma trận ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/B%E1%BB%99_x%E1%BB%AD_l%C3%BD_%C4%91%E1%BB%93_h%E1%BB%8Da
    accessed: '2026-10-16'
---

## Giải thích dễ hiểu
Một CPU thông thường giống như một đầu bếp bậc thầy có thể nấu mọi món ăn phức tạp nhưng chỉ làm từng món một; còn GPU giống như một đội ngũ hai nghìn phụ bếp cùng lúc nhặt rau và xào nấu hàng loạt món ăn song song.

## Chi tiết
Trong khi CPU truyền thống được tối ưu hóa cho các tác vụ tuần tự phức tạp với một số ít nhân tính toán mạnh mẽ, GPU lại sở hữu hàng nghìn nhân xử lý nhỏ hơn chạy song song trên dữ liệu lớn. Bản chất của việc huấn luyện và chạy mạng nơ-ron là các phép nhân ma trận và cộng ten-sơ khổng lồ, vốn rất phù hợp với kiến trúc tính toán song song của GPU. Các dòng GPU chuyên dụng cho trung tâm dữ liệu ngày nay tích hợp thêm các nhân Tensor đặc thù, bộ nhớ băng thông cao (HBM) và cầu nối truyền dữ liệu tốc độ cực cao để ghép cụm hàng nghìn chip lại với nhau.

## Định nghĩa chuyên ngành
Kiến trúc vi xử lý song song khối lượng lớn có băng thông bộ nhớ cao cùng hàng nghìn đơn vị số học luận lý được thiết kế chuyên biệt cho đại số ma trận và ten-sơ hiệu năng cao.

## Ví dụ
Một trung tâm dữ liệu tại Hà Nội vận hành cụm máy chủ chứa sáu mươi bốn card đồ họa GPU liên kết mạng tốc độ cao để huấn luyện mô hình nhận dạng tiếng Việt cho trợ lý ảo.
