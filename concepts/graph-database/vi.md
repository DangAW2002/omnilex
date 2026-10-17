---
label: Graph database
aliases:
  - cơ sở dữ liệu đồ thị
loanwords:
  - Graph database
plain_descriptions:
  - cơ sở dữ liệu chuyên dụng lưu trữ mối quan hệ và sự kết nối giữa các đối tượng một cách trực tiếp
  - hệ thống được xây dựng để tìm kiếm đường đi và mối liên kết giữa con người, tuyến đường hay mạng lưới lừa đảo
summary: Cơ sở dữ liệu sử dụng cấu trúc đồ thị gồm các đỉnh, cạnh và thuộc tính để biểu diễn và lưu trữ dữ liệu có tính liên kết chặt chẽ.
confusable_notes: {}
follow_up_questions:
  - Cơ chế kề cận không cần chỉ mục (index-free adjacency) giúp việc duyệt đồ thị đạt thời gian không đổi bất kể kích thước mạng lưới ra sao?
  - Trong trường hợp nào ngôn ngữ truy vấn đồ thị như Cypher vượt trội hơn các biểu thức đệ quy trong SQL?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một sơ đồ phả hệ vẽ trên bảng trắng: mỗi người là một vòng tròn (đỉnh) và các đường kẻ nối giữa các vòng tròn thể hiện quan hệ bạn bè hoặc gia đình (cạnh), giúp nhìn ngay ra ai quen ai mà không phải tra cứu bảng biểu.

## Chi tiết
Trong cơ sở dữ liệu đồ thị, các thực thể được lưu dưới dạng các đỉnh (node), và mối liên hệ giữa chúng được lưu trực tiếp dưới dạng các cạnh (edge) có hướng và thuộc tính kèm theo. Khác với cơ sở dữ liệu quan hệ vốn phải tốn nhiều tài nguyên ghép bảng khi truy vấn nhiều tầng, cơ sở dữ liệu đồ thị dùng con trỏ bộ nhớ trỏ thẳng tới các đỉnh liền kề, cho phép duyệt qua các mạng lưới quan hệ phức tạp với tốc độ cực nhanh.

## Định nghĩa chuyên ngành
Hệ thống cơ sở dữ liệu NoSQL ứng dụng lý thuyết đồ thị toán học gồm các đỉnh, cạnh và thuộc tính để lưu trữ bền bỉ và thực hiện các phép duyệt trên các thực thể có mối quan hệ liên kết dày đặc.

## Ví dụ
Một mạng xã hội dùng cơ sở dữ liệu đồ thị để xây dựng tính năng "Những người bạn có thể biết", quét các mối quan hệ bạn của bạn qua ba bước kết nối chỉ trong vòng chưa đầy 15 mili giây.
