---
label: ACID
qualifier: (Cơ sở dữ liệu)
aliases:
  - tính chất ACID
loanwords:
  - ACID
autolink:
  label: never
plain_descriptions:
  - bốn nguyên tắc an toàn bảo đảm giao dịch cơ sở dữ liệu luôn hoàn thành trọn vẹn và không bị lỗi
  - lời cam kết của hệ thống rằng giao dịch tiền bạc hoặc thành công 100% hoặc không để lại dấu vết
summary: Bộ bốn đặc tính cơ bản (Nguyên tử, Nhất quán, Cô lập, Bền vững) bảo đảm các giao dịch cơ sở dữ liệu được xử lý an toàn và tin cậy.
confusable_notes:
  eventual-consistency: Giao dịch ACID bảo đảm tính nhất quán tức thời và cô lập nghiêm ngặt, trong khi tính nhất quán cuối cùng cho phép các bản sao tạm thời lệch nhau trước khi đồng bộ xong.
follow_up_questions:
  - Nhật ký ghi trước (WAL) bảo đảm tính bền vững khi máy chủ mất điện đột ngột bằng cách nào?
  - Sự đánh đổi về hiệu năng xử lý đồng thời giữa các mức cô lập như read committed và serializable là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như cây ATM nạp tiền: khi bạn nạp 2.000.000 đồng, máy hoặc là nhận tiền, cộng số dư tài khoản và in biên lai, hoặc nếu mất điện giữa chừng máy sẽ trả lại đúng các tờ tiền đó ra ngoài mà không làm mất tiền của bạn.

## Chi tiết
ACID là viết tắt của bốn đặc tính: Tính nguyên tử (mọi lệnh trong giao dịch cùng thành công hoặc cùng bị hủy bỏ hoàn toàn), Tính nhất quán (dữ liệu luôn tuân thủ các quy tắc và ràng buộc nghiệp vụ), Tính cô lập (các giao dịch chạy song song không nhìn thấy trạng thái dở dang của nhau) và Tính bền vững (dữ liệu đã xác nhận thành công sẽ được lưu an toàn xuống ổ đĩa và không bị mất ngay cả khi máy chủ sập nguồn).

## Định nghĩa chuyên ngành
Tập hợp bốn nguyên tắc bảo đảm hình thức (Tính nguyên tử, Tính nhất quán, Tính cô lập, Tính bền vững) chi phối việc xử lý giao dịch cơ sở dữ liệu nhằm bảo đảm các chuyển dịch trạng thái dữ liệu luôn an toàn và chính xác.

## Ví dụ
Một giao dịch ngân hàng chuyển 5.000.000 đồng từ tài khoản A sang tài khoản B trong một khối ACID; nếu mạng đứt sau khi vừa trừ tiền ở tài khoản A, hệ thống sẽ tự động hoàn tác để tài khoản A không bị mất tiền oan.
