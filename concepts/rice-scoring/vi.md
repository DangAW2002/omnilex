---
label: "RICE scoring"
aliases:
  - "RICE"
  - "Phương pháp chấm điểm RICE"
loanwords:
  - "rice scoring"
  - "rice"
autolink:
  aliases:
    RICE: always
plain_descriptions:
  - "công thức xếp hạng tính năng bằng cách nhân độ tiếp cận, tác động, độ tự tin rồi chia cho nỗ lực"
  - "mô hình tính điểm giúp người làm sản phẩm chọn ra những dự án đem lại giá trị cao nhất so với công sức bỏ ra"
summary: "Mô hình ưu tiên định lượng chấm điểm các sáng kiến bằng cách nhân độ tiếp cận (Reach), tác động (Impact), mức độ tự tin (Confidence) rồi chia cho nỗ lực (Effort)."
confusable_notes:
  moscow-method: "RICE tính toán điểm số cụ thể bằng công thức toán học, còn MoSCoW phân loại các yêu cầu thành 4 nhóm thứ bậc định tính."
follow_up_questions:
  - "Hệ số tự tin (Confidence) giúp hạn chế thiên kiến chủ quan của người đề xuất ý tưởng như thế nào?"
  - "Các nhóm công nghệ thường sử dụng đơn vị nào để đo lường nỗ lực (Effort) trong mẫu số của RICE?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Hãy tưởng tượng mô hình RICE giống như việc bạn quyết định sửa sang khu vực nào trong nhà trước: bạn tính xem có bao nhiêu người dùng căn phòng đó (Reach), độ tiện nghi tăng lên nhiều hay ít (Impact), bạn chắc chắn đến đâu về thiết kế (Confidence) và chia cho số ngày công thợ cần bỏ ra (Effort).

## Chi tiết
Mô hình RICE do công ty công nghệ Intercom phát triển nhằm loại bỏ sự cảm tính khi lựa chọn tính năng. Bốn thành tố gồm:
- Tiếp cận (Reach): Số lượng khách hàng được hưởng lợi trong một khoảng thời gian cụ thể (ví dụ số người dùng mỗi quý).
- Tác động (Impact): Mức độ thay đổi trải nghiệm của mỗi người, thường chấm theo thang điểm (3: rất lớn, 2: cao, 1: trung bình, 0.5: thấp, 0.25: rất nhỏ).
- Độ tự tin (Confidence): Tỷ lệ phần trăm thể hiện độ tin cậy của dữ liệu phân tích (100%: có số liệu rõ ràng, 80%: có khảo sát, 50%: suy đoán).
- Nỗ lực (Effort): Tổng thời gian công sức (thường tính bằng người-tháng) của cả đội kỹ thuật và thiết kế.
Điểm RICE = (Reach × Impact × Confidence) / Effort.

## Định nghĩa chuyên ngành
Thuật toán ra quyết định định lượng trong quản trị sản phẩm xếp hạng các sáng kiến thông qua tỷ số giữa tích của độ tiếp cận, tác động, độ tự tin với tổng nỗ lực thực thi.

## Ví dụ
Tính năng tiếp cận 1.500 khách hàng với tác động lớn (2), độ tin cậy 80% và mất 1 người-tháng nỗ lực sẽ đạt điểm (1500 × 2 × 0.8) / 1 = 2.400 điểm, vượt trội so với các đề xuất có điểm số thấp hơn.
