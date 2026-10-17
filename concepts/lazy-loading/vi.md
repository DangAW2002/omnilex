---
label: "Lazy loading"
aliases:
  - "tải chậm"
  - "tải lười"
  - "tải theo yêu cầu"
loanwords:
  - "Lazy loading"
autolink:
  label: auto
plain_descriptions:
  - "chờ người dùng cuộn chuột tới nơi mới bắt đầu tải hình ảnh và nội dung về"
  - "trì hoãn việc nạp dữ liệu để tiết kiệm mạng và giúp trang web mở nhanh hơn"
summary: "Mô hình tối ưu hóa hiệu năng bằng cách trì hoãn tải các tài nguyên chưa cần thiết cho đến khi người dùng tương tác tới."
confusable_notes:
  code-splitting: "Code splitting là phân chia mã nguồn thành các gói độc lập, còn lazy loading là cơ chế chờ đến lúc cần mới kích hoạt lệnh tải gói mã hoặc hình ảnh."
follow_up_questions:
  - "API Intersection Observer giúp theo dõi vị trí phần tử trên màn hình để tải chậm ra sao?"
  - "Tại sao hình ảnh biểu ngữ ở đầu trang (above-the-fold) tuyệt đối không nên cài đặt lazy loading?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Lazy loading giống như việc nhà hàng phục vụ món tráng miệng: người ta không mang chè hay kem ra ngay lúc bạn mới ngồi vào bàn, mà đợi bạn ăn xong món chính rồi mới chuẩn bị mang ra.

## Chi tiết
Lazy loading giúp tiết kiệm băng thông và bộ nhớ bằng cách không tải những thứ người dùng chưa nhìn thấy. Với hình ảnh, thuộc tính loading="lazy" của HTML báo cho trình duyệt chỉ tải ảnh khi người dùng cuộn chuột tới gần khu vực đó. Với mã kịch bản, các phần mềm trì hoãn việc nạp mã nguồn của các trang phụ cho tới khi người dùng bấm vào thanh menu tương ứng.

## Định nghĩa chuyên ngành
Mô hình thiết kế trì hoãn yêu cầu mạng và việc khởi tạo tài nguyên cho tới thời điểm phần tử xuất hiện trong vùng nhìn thấy (viewport).

## Ví dụ
Trang thương mại điện tử có 100 sản phẩm nhưng chỉ tải trước 8 ảnh đầu tiên; 92 ảnh còn lại được nạp dần khi khách cuộn màn hình xuống dưới.
