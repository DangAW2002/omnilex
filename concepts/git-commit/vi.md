---
label: "Commit"
autolink:
  label: never
qualifier: "(Git)"
aliases:
  - "Ghi lại thay đổi"
loanwords:
  - "commit"
plain_descriptions:
  - "bản lưu vĩnh viễn ghi lại trạng thái tệp tin kèm theo lời giải thích ngắn gọn"
  - "dấu mốc lịch sử trong kho mã thể hiện ai đã sửa những gì và vào thời điểm nào"
summary: "Ảnh chụp bất biến ghi lại các thay đổi đã xếp hàng (staged) vào lịch sử kho mã Git, đi kèm thông tin tác giả, mốc thời gian, mã commit cha và thông điệp mô tả."
confusable_notes:
  {}
follow_up_questions:
  - "Vì sao việc viết thông điệp commit rõ ràng, chuẩn mực lại mang lại lợi ích lớn cho đội ngũ phát triển?"
  - "Git sử dụng chuỗi mã băm mật mã để đảm bảo tính bất biến của các đối tượng commit như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Bấm lưu điểm mốc (save checkpoint) trong trò chơi điện tử và ghi chú lại thành tích vừa đạt được trước khi bước vào ải tiếp theo.

## Chi tiết
Một commit trong Git lưu lại cấu trúc toàn bộ thư mục và tệp tin tại thời điểm ghi nhận. Đối tượng commit chứa thông tin về tác giả, người nộp mã, thời gian, con trỏ đến các commit cha liền trước và lời nhắn tóm tắt mục đích sửa đổi. Nhờ đồ thị commit liên tục mở rộng, các kỹ sư luôn có thể rà soát lại nguyên nhân và khôi phục mã nguồn về bất kỳ thời điểm nào trong quá khứ.

## Định nghĩa chuyên ngành
Đối tượng bất biến trong cơ sở dữ liệu đối tượng của Git bao hàm con trỏ cây thư mục, liên kết phả hệ cha con, xuất xứ người đóng góp và siêu dữ liệu thay đổi.

## Ví dụ
Chạy lệnh `git commit -m "Sửa lỗi tính sai thuế VAT trên hóa đơn mua hàng"` để lưu lại toàn bộ các sửa đổi trong giỏ hàng vào lịch sử phiên bản.
