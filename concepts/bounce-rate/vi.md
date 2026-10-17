---
label: Bounce rate
aliases:
  - Tỷ lệ thoát
  - Tỷ lệ bỏ trang
loanwords:
  - bounce rate
plain_descriptions:
  - tỷ lệ phần trăm người truy cập rời khỏi website ngay sau khi chỉ xem một trang duy nhất
  - tần suất người xem thoát ra ngay lập tức mà không bấm xem thêm nội dung nào khác
summary: Chỉ số phân tích kỹ thuật số đo lường tỷ lệ phần trăm các phiên truy cập trang web không có tương tác, trong đó người dùng rời đi mà không thực hiện hành động ý nghĩa nào.
confusable_notes: {}
follow_up_questions:
  - Định nghĩa tỷ lệ thoát đã thay đổi như thế nào từ Universal Analytics sang Google Analytics 4?
  - Vì sao tỷ lệ thoát cao không hẳn là tiêu cực đối với các bài viết blog cung cấp thông tin tra cứu nhanh?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Tưởng tượng một người mở cửa bước vào hiệu sách, chỉ liếc nhìn quầy lễ tân đúng vài giây rồi quay lưng bước thẳng ra đường mà không hề bước vào bên trong xem cuốn sách nào.

## Chi tiết
Trước đây trong hệ thống phân tích cũ, tỷ lệ thoát được tính là tỷ lệ phiên truy cập mà người dùng chỉ xem một trang duy nhất rồi rời đi. Tuy nhiên trong phiên bản Google Analytics 4 (GA4), tỷ lệ thoát được định nghĩa lại chính xác là phần bù nghịch đảo của tỷ lệ tương tác (engagement rate): tức là tỷ lệ phần trăm các phiên không đạt chuẩn tương tác (kéo dài dưới 10 giây, xem dưới 2 trang và không phát sinh sự kiện chuyển đổi nào). Tỷ lệ thoát cao trên các trang đích bán hàng hay quy trình thanh toán là dấu hiệu cảnh báo nghiêm trọng về trải nghiệm người dùng, thông điệp quảng cáo gây hiểu lầm hoặc tốc độ tải trang quá chậm. Ngược lại, với các trang tin tức hoặc tra cứu số điện thoại hỗ trợ, người dùng thoát nhanh có thể vì họ đã tìm thấy ngay đáp án mình cần.

## Định nghĩa chuyên ngành
Tỷ lệ các phiên truy cập trang web được hệ thống phân tích xếp vào nhóm không phát sinh tương tác, được tính trong đo lường hiện đại bằng một trăm phần trăm trừ đi tỷ lệ tương tác đo được.

## Ví dụ
Một công ty dịch vụ sửa chữa điện lạnh tại TP.HCM chạy quảng cáo Google Ads; trong số 1.000 lượt khách nhấp vào trang đích, có 350 người bấm nút quay lại ngay sau 3 giây mà không cuộn trang hay bấm gọi điện, tạo ra tỷ lệ thoát là 35%.
