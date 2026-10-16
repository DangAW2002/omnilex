---
label: Eval
qualifier: (AI)
aliases:
  - Đánh giá mô hình
loanwords:
  - eval
  - evals
plain_descriptions:
  - quy trình kiểm thử tự động hoặc bán thủ công để chấm điểm câu trả lời của AI
  - việc đo lường xem mô hình ngôn ngữ đáp ứng yêu cầu nghiệp vụ tốt đến đâu
summary: Quy trình đánh giá có hệ thống sử dụng kiểm thử tự động, tiêu chí định lượng hoặc thẩm định chuyên gia để đo lường độ chính xác và an toàn của mô hình ngôn ngữ.
confusable_notes:
  ai-benchmark: Eval là bộ kiểm thử tùy biến gắn liền với sản phẩm thực tế được chạy liên tục khi sửa prompt hay cập nhật mô hình, còn benchmark là kỳ thi chuẩn hóa công khai toàn ngành.
follow_up_questions:
  - Làm thế nào để xây dựng quy trình dùng AI chấm điểm AI (LLM-as-a-judge) một cách khách quan?
  - Vì sao việc đánh giá văn bản tạo sinh mở lại phức tạp hơn nhiều so với chấm điểm các câu hỏi trắc nghiệm?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Eval giống như trạm kiểm định chất lượng xuất xưởng trên dây chuyền lắp ráp ô tô: xe chạy thử qua các bài kiểm tra phanh, đèn và cảm biến trên đường thử thực tế trước khi được phép bàn giao cho khách hàng.

## Chi tiết
Do mô hình tạo sinh sản xuất ra ngôn ngữ tự nhiên mở và có tính xác suất, các bài kiểm thử phần mềm truyền thống không đủ để bao quát chất lượng. Quy trình eval kết hợp giữa các kiểm tra xác định (kiểm tra định dạng JSON, regex, chạy mã code), chấm điểm tự động bằng mô hình mạnh hơn đóng vai trò giám khảo, và kiểm định thủ công từ chuyên gia. Các đội ngũ kỹ sư liên tục đo đạc điểm số eval sau mỗi lần thay đổi prompt để kịp thời ngăn chặn các lỗi thoái lui về độ chính xác hay an toàn.

## Định nghĩa chuyên ngành
Khung đo lường và quy trình chấm điểm thực nghiệm nhằm đánh giá năng lực, độ chuẩn xác và mức độ tuân thủ của đầu ra mô hình ngôn ngữ tạo sinh dựa trên bộ tiêu chí hành vi xác định.

## Ví dụ
Đội ngũ phát triển chatbot chăm sóc khách hàng ngân hàng chạy bộ eval gồm hai trăm tình huống khiếu nại giả định để đảm bảo mô hình không bao giờ bịa đặt chính sách hoàn phí.
