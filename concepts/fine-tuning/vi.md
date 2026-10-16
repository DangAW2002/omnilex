---
label: Fine-tuning
aliases:
  - fine-tune
loanwords:
  - fine-tuning
plain_descriptions:
  - huấn luyện thêm một AI có sẵn bằng ví dụ của mình
  - dạy một mô hình làm sẵn một việc chuyên biệt
summary: >-
  Việc huấn luyện tiếp một mô hình đã huấn luyện trước trên bộ dữ liệu nhỏ, chuyên cho một nhiệm vụ, để nó làm tốt hơn nhiệm vụ hay văn
  phong đó.
confusable_notes:
  rag: RAG đưa dữ kiện vào prompt khi có câu hỏi và giữ nguyên mô hình; fine-tuning thay đổi chính mô hình bằng huấn luyện.
follow_up_questions:
  - Khi nào fine-tuning đáng làm hơn so với cải thiện prompt?
  - LoRA giúp fine-tuning rẻ hơn như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Giống thuê một đầu bếp giàu kinh nghiệm rồi dành một tuần dạy họ công thức riêng của nhà hàng, thay vì đào tạo một người chưa biết nấu.

## Chi tiết
Trọng số của mô hình được cập nhật bằng các ví dụ có nhãn, có thể là toàn bộ trọng số, hoặc với các phương pháp tiết kiệm tham số như LoRA thì chỉ một phần nhỏ được thêm vào. Cách này hợp với định dạng nhất quán, giọng văn hay kỹ năng hẹp, nhưng không phải cách tốt để nạp dữ kiện hay thay đổi, khi đó RAG rẻ hơn. Nó cần dữ liệu tốt và đánh giá kỹ để mô hình không kém đi ở các khả năng chung.

## Định nghĩa chuyên ngành
Việc huấn luyện bổ sung một mô hình đã huấn luyện trước trên bộ dữ liệu hẹp hơn, điều chỉnh tham số của nó cho một nhiệm vụ hay lĩnh vực cụ thể.

## Ví dụ
Một phòng khám fine-tune mô hình trên 2.000 phiếu khám đã ẩn danh để nó viết bản tóm tắt theo đúng mẫu của phòng khám.
