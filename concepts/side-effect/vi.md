---
label: "Side effect"
qualifier: "(Lập trình)"
aliases:
  - "Tác dụng phụ"
loanwords:
  - "side effect"
plain_descriptions:
  - "bất kỳ sự thay đổi trạng thái nào mà một hàm gây ra ngoài việc trả về giá trị tính toán"
  - "việc ghi tệp, cập nhật cơ sở dữ liệu hoặc đổi biến toàn cục khi thực thi một đoạn mã"
summary: "Bất kỳ sự thay đổi trạng thái nào của hệ thống hoặc tương tác với môi trường bên ngoài do một hàm gây ra ngoài việc trả về giá trị tính toán chính."
confusable_notes:
  {}
follow_up_questions:
  - "Vì sao trường phái lập trình hàm (functional programming) luôn ưu tiên các hàm thuần khiết không có tác dụng phụ?"
  - "Tác dụng phụ làm cho các ứng dụng chạy đa luồng dễ phát sinh lỗi tương tranh (race condition) ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Nhờ một chiếc máy tính cầm tay cộng hai con số, nhưng trong lúc tính toán, chiếc máy tự động gửi một email và đổi luôn mật khẩu điện thoại của bạn mà bạn không hề hay biết.

## Chi tiết
Trong lập trình, một hàm bị coi là có tác dụng phụ (side effect) nếu nó làm thay đổi biến toàn cục, chỉnh sửa trực tiếp mảng đối số truyền vào, ghi dữ liệu xuống đĩa cứng hoặc thực hiện cuộc gọi mạng. Ngược lại, hàm thuần khiết (pure function) không tạo ra bất kỳ tác dụng phụ nào: cùng đầu vào sẽ luôn cho cùng đầu ra, giúp mã nguồn cực kỳ dễ kiểm thử và an toàn khi chạy song song.

## Định nghĩa chuyên ngành
Sự biến đổi trạng thái bộ nhớ hoặc hành vi nhập/xuất (I/O) phát sinh trong quá trình ước lượng biểu thức, làm biến đổi môi trường thời gian chạy vượt ra ngoài giá trị trả về của hàm.

## Ví dụ
Hàm `tinhTongTien()` nhưng bên trong lại lén gửi yêu cầu trừ tiền đến API ngân hàng thì hành động gọi API đó chính là một tác dụng phụ.
