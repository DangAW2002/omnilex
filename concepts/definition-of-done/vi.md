---
label: "Definition of Done (DoD)"
aliases:
  - "DoD"
  - "Định nghĩa hoàn thành"
loanwords:
  - "definition of done"
  - "dod"
autolink:
  aliases:
    DoD: always
plain_descriptions:
  - "bộ tiêu chuẩn chất lượng chung mà mọi tính năng phải đạt trước khi được tính là hoàn tất"
  - "thỏa thuận chung về các bước rà soát mã nguồn, kiểm thử tự động và hoàn thiện tài liệu"
summary: "Cam kết chính thức quy định các tiêu chuẩn kỹ thuật và chất lượng mà một phần tăng trưởng sản phẩm phải đạt được để sẵn sàng phát hành."
confusable_notes:
  acceptance-criteria: "Definition of Done là tiêu chuẩn chung áp dụng cho mọi hạng mục công việc trong dự án, còn acceptance criteria chỉ dành riêng cho từng user story cụ thể."
follow_up_questions:
  - "Các đầu việc chưa đạt Definition of Done vào cuối sprint sẽ được giải quyết ra sao?"
  - "Việc nâng cấp dần Definition of Done giúp cải thiện chất lượng kỹ thuật của hệ thống như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Hãy xem Definition of Done giống như quy trình kiểm định xuất xưởng của nhà máy sản xuất ô tô: mọi chiếc xe bất kể mẫu mã nào đều phải vượt qua bài kiểm tra phanh, thử nghiệm khí thải và kiểm tra nước sơn trước khi được lăn bánh ra thị trường.

## Chi tiết
Định nghĩa hoàn thành tạo ra sự minh bạch tuyệt đối, ngăn ngừa tình trạng lập trình viên báo cáo xong nhưng phần mềm vẫn còn lỗi hoặc chưa kiểm thử. Một bộ DoD chuẩn thường bao gồm: mã nguồn được đồng nghiệp duyệt, tỷ lệ bao phủ kiểm thử tự động đạt ngưỡng quy định, quét lỗ hổng bảo mật sạch sẽ, cập nhật tài liệu kỹ thuật và chạy thử nghiệm thành công trên môi trường kiểm thử (staging). Hạng mục nào chưa đạt đủ DoD sẽ bị dời sang kỳ sau.

## Định nghĩa chuyên ngành
Cam kết chính thức mô tả trạng thái chất lượng kỹ thuật bắt buộc mà một phần tăng trưởng sản phẩm phải thỏa mãn để đủ điều kiện đưa vào sử dụng thực tế.

## Ví dụ
Bộ DoD của một nhóm ngân hàng quy định: mã nguồn phải có ít nhất 2 lập trình viên duyệt, độ bao phủ kiểm thử đạt 85%, không có cảnh báo bảo mật nghiêm trọng và vượt qua kiểm thử tích hợp tự động.
