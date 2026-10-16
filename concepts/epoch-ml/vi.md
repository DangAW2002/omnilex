---
label: Epoch
qualifier: (AI)
aliases: []
loanwords:
  - epoch
plain_descriptions:
  - một lượt học trọn vẹn toàn bộ tập dữ liệu huấn luyện của AI
  - chu kỳ huấn luyện hoàn tất khi mô hình đã xem qua mọi mẫu dữ liệu đúng một lần
summary: Một chu kỳ huấn luyện hoàn chỉnh mà trong đó thuật toán học máy đã duyệt qua toàn bộ các mẫu trong tập dữ liệu đúng một lần.
confusable_notes: {}
follow_up_questions:
  - Kỹ sư dựa vào cơ sở nào để quyết định tổng số epoch cần chạy cho một mô hình?
  - Dấu hiệu nào cho thấy mô hình đã trải qua quá nhiều epoch và bắt đầu bị học vẹt?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Một epoch giống như bạn đọc hết một lượt từ trang đầu đến trang cuối của một cuốn sách; nếu đọc ôn luyện trong 5 epoch, nghĩa là bạn đã đọc đi đọc lại toàn bộ cuốn sách đó đúng 5 lần.

## Chi tiết
Do tập dữ liệu thường được chia thành các lô nhỏ, một epoch sẽ bao gồm nhiều bước lặp cập nhật trọng số cho đến khi mọi lô dữ liệu đều được duyệt qua. Các mô hình học sâu thường được huấn luyện qua hàng chục hoặc hàng trăm epoch. Chạy quá ít epoch khiến mô hình chưa kịp học hết quy luật (chưa khớp), trong khi chạy quá nhiều epoch dễ dẫn đến hiện tượng học vẹt (quá khớp). Sai số trên tập kiểm định sau mỗi epoch là căn cứ để quyết định dừng sớm.

## Định nghĩa chuyên ngành
Giai đoạn huấn luyện rời rạc tương ứng với một vòng duyệt toàn phần qua tất cả các lô dữ liệu con cấu thành tập huấn luyện thực nghiệm.

## Ví dụ
Hệ thống huấn luyện mô hình nhận dạng giọng nói hoàn thành 30 epoch trên kho dữ liệu một triệu câu thoại, ghi nhận điểm số mất mát giảm dần sau từng vòng duyệt toàn diện.
