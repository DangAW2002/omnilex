---
label: "Rò rỉ bộ nhớ"
aliases: []
loanwords:
  - "memory leak"
plain_descriptions:
  - "lỗi phần mềm khi bộ nhớ đã cấp phát không còn dùng nữa nhưng không bao giờ được giải phóng cho hệ thống"
  - "sự tiêu hao bộ nhớ RAM tăng dần theo thời gian do các tham chiếu bị bỏ quên ngăn cản việc dọn dẹp"
summary: "Lỗi phần mềm xảy ra khi chương trình không giải phóng các vùng nhớ đã cấp phát nhưng không còn dùng tới, làm suy giảm hiệu năng hệ thống."
confusable_notes:
  garbage-collection: "Thu gom rác (garbage collection) là cơ chế tự động thu hồi bộ nhớ không dùng, trong khi rò rỉ bộ nhớ (memory leak) là lỗi chương trình giữ lại tham chiếu khiến việc thu hồi không thể diễn ra."
follow_up_questions:
  - "Các công cụ phân tích heap profiler xác định các vùng nhớ bị giữ lại ngoài ý muốn như thế nào?"
  - "Vì sao việc quên hủy đăng ký bộ lắng nghe sự kiện (event listener) lại là nguyên nhân hàng đầu gây rò rỉ bộ nhớ?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/R%C3%B2_r%E1%BB%89_b%E1%BB%99_nh%E1%BB%9B
    accessed: '2026-10-17'
    note: "Wikipedia tiếng Việt ghi nhận thuật ngữ Rò rỉ bộ nhớ tương đương memory leak"
---

## Giải thích dễ hiểu
Hãy tưởng tượng việc mượn sách thư viện về phòng đọc nhưng không bao giờ mang trả lại. Qua nhiều tháng, bàn học chất đầy những cuốn sách cũ không còn đọc tới, chiếm hết chỗ trống khiến không còn mặt bàn để làm việc.

## Chi tiết
Trong các ngôn ngữ quản lý bộ nhớ thủ công (như C hay C++), rò rỉ bộ nhớ xảy ra khi vùng nhớ heap được cấp phát qua `malloc` bị mất con trỏ mà không được gọi hàm `free` để thu hồi. Trong các môi trường có bộ thu gom rác tự động (như Java, C# hay JavaScript), lỗi này xuất hiện khi các đối tượng cũ vẫn vô tình bị giữ lại tham chiếu qua các bộ lắng nghe sự kiện, bộ nhớ đệm không giới hạn hoặc các biến tĩnh (static). Khi lượng RAM chiếm dụng tăng dần, máy tính sẽ chạy chậm do phải hoán đổi dữ liệu lên đĩa và cuối cùng tiến trình sẽ bị sập vì cạn kiệt bộ nhớ.

## Định nghĩa chuyên ngành
Tình trạng các khối bộ nhớ được cấp phát động vẫn bị chiếm giữ trong không gian địa chỉ do các tham chiếu còn tồn tại ngăn cản việc thu hồi tự động hoặc thủ công, dẫn tới cạn kiệt tài nguyên.

## Ví dụ
Một dịch vụ máy chủ quên xóa token của các phiên đăng nhập đã đóng; lượng RAM sử dụng tăng đều đặn 50 MB mỗi giờ cho đến khi ứng dụng chạm ngưỡng giới hạn 4 GB và bị sập.
