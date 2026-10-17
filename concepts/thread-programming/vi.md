---
label: "Thread"
qualifier: "(Lập trình)"
aliases:
  - "Luồng"
  - "Luồng thực thi"
loanwords:
  - "thread"
autolink:
  label: never
  aliases:
    Luồng: never
    Luồng thực thi: never
plain_descriptions:
  - "đơn vị thực thi nhỏ nhất của một tập lệnh mà bộ điều phối hệ điều hành có thể quản lý độc lập"
  - "nhánh chạy lệnh gọn nhẹ bên trong một tiến trình dùng chung bộ nhớ với các luồng anh em"
summary: "Đơn vị thực thi nhỏ nhất bên trong một tiến trình hệ điều hành, chia sẻ không gian bộ nhớ và tài nguyên của tiến trình cha với các luồng khác."
confusable_notes:
  thread-iot: "Thread (Lập trình) là một luồng thực thi bên trong tiến trình, còn Thread (IoT) là giao thức mạng lưới không dây IPv6 cho thiết bị tiết kiệm năng lượng."
  os-process: "Tiến trình sở hữu không gian bộ nhớ độc lập và tài nguyên hệ thống riêng biệt, trong khi luồng nằm bên trong tiến trình và dùng chung không gian địa chỉ với các luồng khác."
follow_up_questions:
  - "Khóa mutex và semaphore ngăn chặn xung đột tương tranh (race condition) giữa các luồng dùng chung bộ nhớ ra sao?"
  - "Chi phí chuyển đổi ngữ cảnh (context switch) giữa các luồng ở tầng nhân hệ điều hành ảnh hưởng thế nào đến hiệu năng?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy hình dung nhiều đầu bếp cùng làm việc trong một gian bếp nhà hàng. Mỗi đầu bếp phụ trách một món ăn riêng, nhưng tất cả đều dùng chung kho gia vị, tủ lạnh và xoong chảo để cùng nấu bữa tiệc một cách nhanh chóng.

## Chi tiết
Luồng đại diện cho một luồng lệnh độc lập đang thực thi trong phạm vi của một tiến trình. Mọi luồng trong cùng một tiến trình đều dùng chung vùng nhớ heap, tập tin mở và trạng thái toàn cục, nhưng mỗi luồng sở hữu riêng một ngăn xếp gọi lệnh, con trỏ lệnh và các thanh ghi vi xử lý. Mô hình dùng chung bộ nhớ này giúp trao đổi dữ liệu cực nhanh mà không tốn chi phí giao tiếp liên tiến trình. Tuy nhiên, nếu nhiều luồng cùng ghi vào một vùng nhớ mà không đồng bộ, xung đột dữ liệu và khóa chết (deadlock) sẽ rất dễ phát sinh.

## Định nghĩa chuyên ngành
Đơn vị thực thi có thể điều phối được quản lý bởi bộ lập lịch của hệ điều hành, bao gồm ngăn xếp, trạng thái thanh ghi và con trỏ chương trình nằm trong không gian địa chỉ ảo của tiến trình bao bọc.

## Ví dụ
Phần mềm chỉnh sửa ảnh dùng một luồng để phản hồi các cú bấm chuột trên giao diện, đồng thời chạy hai luồng nền để xử lý bộ lọc màu trên tệp ảnh 50 megapixel.
