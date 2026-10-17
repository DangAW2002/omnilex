---
label: Elasticsearch
aliases: []
loanwords:
  - Elasticsearch
plain_descriptions:
  - công cụ tìm kiếm và phân tích siêu tốc có thể rà soát hàng triệu tài liệu chỉ trong vài giây
  - phần mềm chuyên tìm kiếm bài viết theo từ khóa, lọc sản phẩm và theo dõi lỗi máy chủ
summary: Công cụ tìm kiếm và phân tích phân tán dựa trên định dạng JSON được xây dựng trên Apache Lucene, tối ưu cho tìm kiếm thời gian thực.
confusable_notes: {}
follow_up_questions:
  - Cấu trúc chỉ mục đảo (inverted index) giúp Elasticsearch tìm kiếm từ khóa trong các kho văn bản nhanh như thế nào?
  - Sự khác nhau giữa trường kiểu text (được phân tích để tìm kiếm toàn văn) và trường kiểu keyword (khớp chính xác) là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như phần mục lục tra cứu ở trang cuối cuốn bách khoa toàn thư: thay vì phải lật đọc 2.000 trang để tìm từ "khủng long", bạn chỉ cần tra từ này ở trang cuối để biết ngay nó xuất hiện ở những trang nào.

## Chi tiết
Elasticsearch được xây dựng trên nền tảng thư viện tìm kiếm Apache Lucene. Hệ thống lưu trữ dữ liệu dưới dạng tài liệu JSON và tự động xây dựng chỉ mục đảo (inverted index) ánh xạ từng từ khóa tới danh sách các tài liệu có chứa từ đó. Nhờ cơ chế phân mảnh và nhân bản phân tán, hệ thống cung cấp khả năng tìm kiếm từ khóa mờ (chấp nhận lỗi chính tả), xếp hạng độ liên quan (BM25) và tính toán số liệu thống kê trên hàng tỷ dòng nhật ký.

## Định nghĩa chuyên ngành
Hệ thống quản trị cơ sở dữ liệu phân tích và tìm kiếm toàn văn phân tán dựa trên Apache Lucene, cung cấp giao diện lập trình RESTful, lưu trữ JSON không cần lược đồ cứng và lập chỉ mục đảo.

## Ví dụ
Một ứng dụng mua sắm tìm kiếm trong 2 triệu mặt hàng bằng Elasticsearch, trả về kết quả giày thể thao phù hợp chỉ trong 30 mili giây ngay cả khi người dùng gõ sai chính tả.
