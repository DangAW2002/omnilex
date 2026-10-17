---
label: "Accelerometer"
aliases:
  - "Gia tốc kế"
  - "Cảm biến gia tốc"
loanwords:
  - "accelerometer"
plain_descriptions:
  - "cảm biến nhận biết rung lắc, chuyển động và lực hút trọng lực của Trái Đất"
  - "con chip đo lực gia tốc giúp điện thoại tự xoay ngang màn hình khi bạn nghiêng máy"
summary: "Cảm biến cơ điện vi mô đo gia tốc riêng của vật thể—tốc độ thay đổi vận tốc tuyến tính trên các trục tọa độ bao gồm cả trọng lực Trái Đất."
confusable_notes:
  imu: "Gia tốc kế chỉ đo lực quán tính tịnh tiến và vectơ trọng trường, trong khi IMU là khối tích hợp đầy đủ gồm cả gia tốc kế và con quay hồi chuyển đo tốc độ xoay góc."
follow_up_questions:
  - "Cấu trúc vi cơ điện tử dạng khối lượng treo và tụ điện biến thiên bên trong chip cảm biến gia tốc hoạt động ra sao?"
  - "Làm thế nào để cảm biến phân biệt được trọng lực tĩnh của Trái Đất với các cú va chạm rung lắc bất ngờ?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy tưởng tượng một hòn bi nhỏ được treo lơ lửng bằng các lò xo bên trong một chiếc hộp: khi bạn giật chiếc hộp về phía trước hoặc nghiêng hộp sang một bên, hòn bi sẽ bị quán tính kéo lệch đi, làm căng các lò xo và báo cho bạn biết hộp đang chuyển động.

## Chi tiết
Cảm biến gia tốc vi cơ điện tử (MEMS) đo gia tốc tuyến tính trên một, hai hoặc ba trục tọa độ X, Y, Z. Bên trong chip silicon có một khối lượng chuyển động cực nhỏ gắn với các lò xo vi thể nằm kẹp giữa các bản cực tụ điện cố định. Khi có lực tác động làm dịch chuyển khối lượng này, khoảng cách giữa các bản cực thay đổi khiến điện dung biến đổi theo. Mạch xử lý tích hợp sẽ đổi độ lệch điện dung này thành tín hiệu số tương ứng với gia tốc theo đơn vị g (1g ≈ 9.81 m/s²), phục vụ tính năng xoay màn hình điện thoại, nổ túi khí ô tô và đếm bước chân.

## Định nghĩa chuyên ngành
Bộ chuyển đổi cơ điện vi hệ thống thực hiện đo gia tốc thực của vật thể theo các trục thẳng trực giao so với hệ quy chiếu rơi tự do, dựa trên sự biến dạng cơ học của phần tử vi mô dưới tác dụng của lực quán tính.

## Ví dụ
Đồng hồ thông minh đeo tay sử dụng cảm biến gia tốc 3 trục để nhận diện dao động bước chân lên xuống của người chạy bộ, từ đó đếm chính xác số bước đi trong ngày.
