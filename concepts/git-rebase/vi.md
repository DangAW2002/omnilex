---
label: "Rebase"
aliases:
  - "Tái tạo nhánh"
loanwords:
  - "rebase"
plain_descriptions:
  - "chuyển các commit của nhánh mình lên đỉnh mới nhất của nhánh nguồn khác"
  - "viết lại lịch sử kho Git để các mốc thay đổi xếp thành một đường thẳng gọn gàng"
summary: "Lệnh trong Git cho phép chuyển dời hoặc áp dụng lại một chuỗi commit từ nhánh hiện tại lên trên một commit đỉnh mới, tạo nên một lịch sử commit tuyến tính."
confusable_notes:
  {}
follow_up_questions:
  - "Nguy cơ nào sẽ phát sinh nếu lập trình viên thực hiện rebase trên các commit đã đẩy lên kho chung và có người khác đang dùng?"
  - "Tính năng rebase tương tác (`git rebase -i`) giúp dọn dẹp và gộp các commit vụn vặt trước khi tạo pull request ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Gỡ tập giấy ghi chú dán ở trang sách cũ rồi chuyển sang dán nối tiếp vào trang sách mới nhất để các ghi chép liền mạch theo thứ tự thời gian.

## Chi tiết
Rebase hoạt động bằng cách tạm thời bóc tách các commit riêng trên nhánh của bạn, kéo nhánh của bạn tiến lên bằng với nhánh đích (thường là main), sau đó dán lần lượt từng commit đã lưu lên trên đỉnh mới. Quá trình này giúp đồ thị Git luôn thẳng hàng, không sinh ra các commit gộp rác (merge commit), nhưng vì nó sinh ra mã băm mới nên chỉ nên dùng cho các nhánh làm việc cục bộ.

## Định nghĩa chuyên ngành
Thao tác áp dụng lại một chuỗi bản vá commit lên trên một điểm mốc tham chiếu gốc mới cập nhật, thay đổi cấu trúc phả hệ đồ thị nhằm duy trì tính tuyến tính.

## Ví dụ
Lập trình viên đang làm việc trên nhánh `feature/tim-kiem` chạy lệnh `git rebase main` để đưa toàn bộ mã mới nhất của nhánh chính vào dưới các commit của mình.
