---
label: Mạng nơ-ron hồi quy (RNN)
aliases:
  - RNN
loanwords:
  - recurrent neural network
autolink:
  aliases:
    RNN: always
plain_descriptions:
  - mạng nơ-ron có bộ nhớ tạm để xử lý dữ liệu dạng chuỗi tuần tự như câu chữ hay chuỗi thời gian
  - kiến trúc học sâu truyền thông tin từ các bước tính toán trước đó vào bước xử lý hiện tại
summary: >-
  Lớp mạng nơ-ron nhân tạo có các kết nối dạng chu trình khép kín giúp lưu trữ trạng thái ẩn, chuyên dùng để xử lý dữ liệu chuỗi tuần tự theo thời gian.
confusable_notes:
  cnn: RNN xử lý chuỗi tuần tự bằng cách duy trì trạng thái qua từng bước thời gian; CNN quét bộ lọc qua các vùng không gian lân cận.
follow_up_questions:
  - Cơ chế cổng trong các biến thể LSTM và GRU khắc phục hiện tượng biến mất gradient như thế nào?
  - Bản chất tính toán tuần tự từng bước cản trở việc huấn luyện song song trên GPU của RNN ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/M%E1%BA%A1ng_n%C6%A1-ron_h%E1%BB%93i_quy
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc bạn đọc một cuốn sách: khi đọc đến chữ thứ mười trong câu, não bộ bạn vẫn nhớ rõ chín chữ trước đó để hiểu được ý nghĩa liền mạch của cả câu văn.

## Chi tiết
Khác với mạng truyền thẳng giả định các mẫu dữ liệu độc lập, RNN xử lý từng phần tử trong chuỗi theo trình tự thời gian. Tại mỗi bước, mạng cập nhật véc-tơ trạng thái ẩn dựa trên dữ liệu đầu vào hiện tại và trạng thái ẩn liền trước. Nhằm khắc phục tình trạng biến mất đạo hàm khi chuỗi quá dài, các kiến trúc nâng cao như LSTM và GRU đã đưa vào các cổng đóng mở luồng thông tin.

## Định nghĩa chuyên ngành
Họ mô hình mạng nơ-ron có đồ thị tính toán chứa chu trình có hướng, cập nhật trạng thái tiềm ẩn hồi quy qua các bước thời gian tuần tự.

## Ví dụ
Mạng hồi quy LSTM phân tích chuỗi dữ liệu giao dịch cổ phiếu trong 30 giờ liên tiếp, dự báo lượng giao dịch của giờ thứ 31 với độ lệch chỉ 3%.
