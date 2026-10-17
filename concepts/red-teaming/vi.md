---
label: Red teaming
qualifier: (AI)
aliases: []
loanwords:
  - red teaming
plain_descriptions:
  - hoạt động kiểm thử an toàn trong đó các chuyên gia cố tình thử thách để tìm ra điểm yếu và lỗi của AI
  - thử nghiệm tấn công thử bằng các câu lệnh lắt léo để phát hiện nguy cơ bảo mật trước khi phát hành AI
summary: >-
  Quy trình kiểm thử đối kháng có hệ thống trong đó các chuyên gia hoặc công cụ tự động giả lập các hành vi tấn công và gợi ý độc hại để phát hiện các lỗ hổng an toàn và sai lệch của mô hình AI.
confusable_notes: {}
follow_up_questions:
  - Các công cụ red teaming tự động hỗ trợ mở rộng quy mô tìm kiếm lỗ hổng jailbreak như thế nào so với kiểm thử thủ công?
  - Tiêu chí nào xác định một đợt tấn công trích xuất prompt hệ thống được coi là thành công?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc bạn thuê một thợ khóa giỏi đến thử cậy phá mọi ổ khóa trong nhà mới của bạn; nếu phát hiện ổ khóa nào lỏng lẻo thì sẽ thay mới ngay trước khi dọn vào ở.

## Chi tiết
Kế thừa từ lĩnh vực an ninh mạng, red teaming trong AI là quá trình chủ động tìm kiếm các điểm mù của mô hình trước khi triển khai thực tế. Các chuyên gia sẽ nhập những câu hỏi hóc búa, các kỹ thuật bẻ khóa (jailbreak) hoặc tiêm prompt nhằm vượt qua màng lọc an toàn, kích thích mô hình sinh nội dung độc hại hoặc tiết lộ bí mật hệ thống. Kết quả thu được dùng để gia cố prompt hệ thống và huấn luyện thêm rào chắn an toàn.

## Định nghĩa chuyên ngành
Phương pháp đánh giá thực nghiệm có hệ thống đối với hệ thống trí tuệ nhân tạo thông qua việc thăm dò đối kháng nhằm phát hiện các sai sót an toàn và lỗ hổng căn chỉnh.

## Ví dụ
Đội ngũ kiểm thử an toàn thực hiện chiến dịch red teaming kéo dài hai tuần với 1.200 câu lệnh bẻ khóa, tìm ra 14 trường hợp mô hình vượt rào thành công và lập tức vá lỗi trước ngày ra mắt.
