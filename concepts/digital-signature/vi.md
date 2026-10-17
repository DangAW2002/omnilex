---
label: Chữ ký số
aliases:
  - Digital signature
loanwords:
  - digital signature
plain_descriptions:
  - con dấu toán học chứng minh người tạo ra tệp tin và bảo đảm nội dung không bị sửa đổi
  - con dấu điện tử chứng thực tác giả và giữ nguyên vẹn tài liệu khi gửi qua mạng
summary: Cơ chế toán học gắn kết danh tính với dữ liệu số bằng mật mã bất đối xứng nhằm bảo đảm tính xác thực, tính toàn vẹn và chống chối bỏ.
confusable_notes: {}
follow_up_questions:
  - Vì sao thuật toán tạo chữ ký số luôn băm văn bản trước khi áp dụng khóa riêng tư để ký?
  - Chữ ký số mang lại giá trị pháp lý về tính chống chối bỏ trong các giao dịch điện tử như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Ch%E1%BB%AF_k%C3%BD_s%E1%BB%91
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như con dấu niêm phong bằng sáp nóng của nhà vua đóng trên chiếu chỉ: chỉ duy nhất nhà vua mới nắm giữ chiếc nhẫn khắc gia huy để ấn dấu lên sáp, và bất kỳ ai khi đọc chiếu chỉ cũng nhận ra con dấu còn nguyên vẹn, chứng minh văn bản không hề bị giả mạo.

## Chi tiết
Để tạo chữ ký số, bên gửi tính toán mã băm mật mã của tài liệu rồi mã hóa giá trị băm này bằng khóa riêng tư của mình. Chuỗi kết quả chính là chữ ký số được đính kèm cùng văn bản. Khi nhận tài liệu, bên nhận dùng khóa công khai của người gửi để giải mã chữ ký nhằm thu lại giá trị băm ban đầu, đồng thời tự tính toán lại mã băm từ tài liệu nhận được. Nếu hai giá trị băm này trùng khớp tuyệt đối, bên nhận hoàn toàn yên tâm rằng tài liệu thực sự do chính chủ nhân khóa riêng tư ký phát và không hề bị sửa đổi dù chỉ một ký tự trên đường truyền.

## Định nghĩa chuyên ngành
Phép biến đổi mật mã bất đối xứng trên một khối dữ liệu nhằm cung cấp cho bên nhận bằng chứng xác thực về nguồn gốc, tính toàn vẹn của dữ liệu và khả năng chống chối bỏ trách nhiệm của bên ký.

## Ví dụ
Doanh nghiệp phát hành hóa đơn điện tử có đính kèm chữ ký số từ token USB chuyên dụng; cơ quan thuế đối chiếu chữ ký số này để xác nhận hóa đơn là hợp lệ và chưa từng bị can thiệp số tiền.
