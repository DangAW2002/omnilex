---
label: Benchmark
qualifier: (AI)
aliases: []
loanwords:
  - benchmark
plain_descriptions:
  - bộ bài thi chuẩn hóa dùng để đo lường độ chính xác và tốc độ phần cứng AI
  - thang đo chung cho phép so sánh khách quan năng lực giữa các hệ thống AI khác nhau
summary: Bộ kiểm thử và quy trình đo lường chuẩn hóa dùng để đánh giá và so sánh độ chính xác, thông lượng, độ trễ hoặc hiệu suất năng lượng của mô hình và phần cứng.
confusable_notes:
  llm-eval: Benchmark là các bộ bài thi chuẩn mực công khai toàn ngành (như MLPerf hay MMLU), còn eval là quy trình kiểm tra cụ thể mà một đội ngũ tự thiết kế để thẩm định chất lượng mô hình nội bộ.
follow_up_questions:
  - Hiện tượng rò rỉ đề thi vào tập huấn luyện làm sai lệch kết quả benchmark như thế nào?
  - Điểm khác nhau giữa benchmark đo lường thông lượng phần cứng và benchmark đo năng lực nhận thức là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như kỳ thi chuẩn hóa IELTS hay SAT dùng chung một đề thi và barem điểm để đánh giá học sinh từ nhiều trường khác nhau, benchmark trong AI đưa ra cùng một bộ bài kiểm tra nghiêm ngặt để so sánh công bằng giữa các hệ thống.

## Chi tiết
Benchmark thiết lập các mốc tham chiếu có thể tái lập trên nhiều nền tảng phần cứng và thuật toán. Về mặt kỹ thuật hệ thống, các bộ benchmark như MLPerf đo lường độ trễ suy luận, số lượng token sinh ra mỗi giây và mức tiêu thụ điện năng theo các thỏa thuận mức dịch vụ khắt khe. Về mặt năng lực mô hình, các bộ đề thi tiêu chuẩn đánh giá khả năng giải toán, viết code, hiểu văn bản đa ngôn ngữ hoặc phân tích hình ảnh dựa trên các tập dữ liệu đóng cố định.

## Định nghĩa chuyên ngành
Khối lượng công việc mẫu chuẩn hóa kết hợp tập dữ liệu kiểm thử và phương pháp đo lường có kiểm soát nhằm định lượng và đối sánh năng lực thuật toán hoặc hiệu năng hệ thống tính toán.

## Ví dụ
Đội ngũ hạ tầng AI chạy bộ kiểm chuẩn MLPerf Inference trên hai dòng chip máy chủ khác nhau để so sánh chi phí trên mỗi triệu token phục vụ người dùng.
