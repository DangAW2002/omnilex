---
label: Kho dữ liệu
aliases:
  - Data warehouse
loanwords:
  - data warehouse
plain_descriptions:
  - cơ sở dữ liệu tập trung lưu trữ toàn bộ lịch sử kinh doanh đã làm sạch để làm báo cáo phân tích
  - kho lưu trữ thông tin có tổ chức giúp các nhà quản lý đưa ra quyết định kinh doanh
summary: Hệ thống cơ sở dữ liệu tập trung lưu trữ dữ liệu lịch sử có cấu trúc từ nhiều nguồn nhằm phục vụ công tác phân tích và báo cáo kinh doanh.
confusable_notes:
  data-lake: Data warehouse lưu dữ liệu đã qua xử lý và có cấu trúc chặt chẽ để phục vụ báo cáo, còn data lake lưu dữ liệu thô ở nhiều định dạng cho phân tích linh hoạt.
follow_up_questions:
  - Mô hình hình sao (star schema) khác gì so with mô hình bông tuyết (snowflake schema) trong kho dữ liệu?
  - Vì sao việc lưu trữ theo định dạng cột lại giúp tăng tốc độ xử lý các phép toán tổng hợp trên tập dữ liệu lớn?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Kho_d%E1%BB%AF_li%E1%BB%87u
    accessed: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như một kho hàng tổng của chuỗi siêu thị: hàng hóa được phân loại cẩn thận, dán mã vạch và xếp ngay ngắn trên kệ để thủ kho kiểm kê tức thì.

## Chi tiết
Khác với cơ sở dữ liệu giao dịch hàng ngày (OLTP), kho dữ liệu (OLAP) tổ chức dữ liệu theo cột và chuẩn hóa mô hình ngôi sao để chạy các câu truy vấn thống kê lớn trên hàng trăm triệu bản ghi mà không làm chậm các giao dịch thực tế.

## Định nghĩa chuyên ngành
Hệ thống lưu trữ dữ liệu tích hợp, theo chủ đề, có gắn nhãn thời gian và bất biến, được thiết kế chuyên biệt phục vụ phân tích nghiệp vụ và ra quyết định.

## Ví dụ
Ban điều hành tập đoàn truy vấn doanh thu của toàn bộ các chuỗi bán lẻ trong 5 năm qua bằng dịch vụ Snowflake hoặc Google BigQuery.
