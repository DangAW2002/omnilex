---
label: Error budget
aliases:
  - Ngân sách lỗi
loanwords:
  - error budget
plain_descriptions:
  - hạn mức sự cố hoặc thời gian chết cho phép của dịch vụ trước khi buộc phải dừng ra mắt tính năng mới
  - khoảng đệm rủi ro được chấp nhận giữa mức độ hoàn hảo tuyệt đối và cam kết độ tin cậy thực tế
summary: >-
  Mức độ gián đoạn hoặc tỷ lệ lỗi tối đa được phép xảy ra trong một khoảng thời gian xác định căn cứ theo mục tiêu mức dịch vụ đã thỏa thuận.
confusable_notes: {}
follow_up_questions:
  - "Đội ngũ phát triển sản phẩm cần làm gì khi ngân sách lỗi trong tháng của hệ thống bị cạn kiệt?"
  - "Tại sao việc theo đuổi mục tiêu 100% không có lỗi lại gây tốn kém chi phí vô ích so với việc áp dụng ngân sách lỗi?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như tiền tiêu vặt được cấp mỗi tháng: bạn được phép tiêu một khoản nhất định; nếu đầu tháng tiêu hết sạch thì từ đó đến cuối tháng phải thắt lưng buộc bụng, không được mua sắm gì mới.

## Chi tiết
Trong mô hình SRE, error budget là phần chênh lệch giữa 100% và mục tiêu mức dịch vụ (SLO) trong một chu kỳ tính toán (thường là 30 ngày). Chẳng hạn, nếu mục tiêu hoạt động ổn định là 99.9% thì ngân sách lỗi cho phép là 0.1%, tương đương khoảng 43 phút hệ thống có thể bị gián đoạn mỗi tháng. Đây là công cụ trung gian giải quyết mâu thuẫn giữa việc muốn ra mắt tính năng nhanh của nhóm sản phẩm và việc muốn giữ hệ thống ổn định của nhóm vận hành. Khi ngân sách còn nhiều, nhóm có thể tự do phát hành; khi ngân sách cạn kiệt, mọi người phải dừng việc mới để tập trung vá lỗi.

## Định nghĩa chuyên ngành
Hạn mức gián đoạn hoặc tỷ lệ lỗi có thể lượng hóa được tính bằng hiệu số giữa một trăm phần trăm và mục tiêu chất lượng dịch vụ trong một khung thời gian định kỳ.

## Ví dụ
Với cam kết hệ thống hoạt động 99.9% mỗi tháng, nhóm kỹ thuật còn lại 15 phút gián đoạn cho phép; họ quyết định hoãn bản cập nhật lớn sang tuần sau để không làm vỡ ngân sách lỗi.
