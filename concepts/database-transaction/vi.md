---
label: Transaction
qualifier: (Cơ sở dữ liệu)
aliases:
  - giao dịch cơ sở dữ liệu
  - giao dịch DB
loanwords:
  - transaction
autolink:
  label: never
plain_descriptions:
  - chuỗi thao tác dữ liệu theo nguyên tắc được ăn cả ngã về không, hoặc thành công hết hoặc hủy bỏ hoàn toàn
  - cơ chế bảo đảm chuyển tiền an toàn giữa hai tài khoản mà không sợ bị mất tiền giữa chừng
summary: Một chuỗi các thao tác cơ sở dữ liệu được thực hiện như một khối công việc nguyên tử duy nhất, tuân thủ các đặc tính ACID.
confusable_notes: {}
follow_up_questions:
  - Những hiện tượng bất thường khi đọc dữ liệu xuất hiện ở mức cô lập read committed so với serializable là gì?
  - Giao thức commit hai pha (2PC) bảo đảm tính nguyên tử cho các giao dịch phân tán giữa các vi dịch vụ ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống như việc trao đổi hàng tận tay: bạn đưa tiền cùng lúc người bán trao hàng, nếu một bên đổi ý thì cả hai bên đều giữ nguyên đồ của mình mà không ai thiệt hại.

## Chi tiết
Giao dịch bảo đảm tính chất ACID: Tính nguyên tử (làm hết hoặc không làm gì), Tính nhất quán (giữ đúng ràng buộc toàn vẹn), Tính cô lập (các giao dịch đồng thời không dẫm chân lên nhau), và Tính bền vững (dữ liệu đã commit sẽ không mất dù sập nguồn).

## Định nghĩa chuyên ngành
Đơn vị công việc logic bao gồm một hoặc nhiều lệnh thao tác cơ sở dữ liệu được đối xử như một khối thống nhất không thể chia tách.

## Ví dụ
Chuyển 1.000.000 VNĐ giữa hai tài khoản ngân hàng bằng cách bọc lệnh trừ tiền tài khoản A và cộng tiền tài khoản B vào cùng một khối transaction.
