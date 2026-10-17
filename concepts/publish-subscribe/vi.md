---
label: Publish-subscribe (pub/sub)
aliases:
  - pub/sub
  - pub-sub
  - xuất bản - đăng ký
loanwords:
  - Publish-subscribe (pub/sub)
  - pub/sub
autolink:
  aliases:
    pub/sub: always
plain_descriptions:
  - cách truyền tin mà bên gửi phát thông báo mà không cần biết ai sẽ là người nhận cụ thể
  - thiết kế liên lạc nơi các ứng dụng tự đăng ký chủ đề để tự động nhận thông báo khi có tin mới
summary: Mẫu kiến trúc truyền tin bất đồng bộ nơi bên gửi phân loại tin phát mà không gửi trực tiếp đến từng người nhận riêng lẻ.
confusable_notes: {}
follow_up_questions:
  - Việc tách rời giữa bên phát và bên nhận trong pub/sub giúp hệ thống chống chịu sự cố thế nào?
  - Sự khác biệt về kiến trúc giữa mô hình phát tán pub/sub và hàng đợi điểm-tới-điểm là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc đặt mua một tờ tạp chí định kỳ: tòa soạn xuất bản ấn phẩm theo chủ đề mà không cần biết đích danh ai đọc, còn độc giả nhận báo vì đã chủ động đăng ký theo dõi chuyên mục đó.

## Chi tiết
Trong mô hình pub/sub, bên gửi tạo bản tin gắn nhãn chủ đề rồi gửi tới một máy chủ trung gian. Bên nhận đăng ký các chủ đề hoặc bộ lọc quan tâm. Máy chủ trung gian tự nhân bản và định tuyến tin đến mọi bên đăng ký hợp lệ, giúp tách rời hoàn toàn thời gian hoạt động, vị trí mạng và giao thức giữa các dịch vụ.

## Định nghĩa chuyên ngành
Mẫu truyền tin bất đồng bộ trong đó bên sản xuất tin không gửi trực tiếp tới bên tiêu thụ; việc phân phối tin nhắn được quyết định dựa trên chủ đề logic hoặc các điều kiện lọc nội dung.

## Ví dụ
Cổng thanh toán phát sự kiện hoàn tất giao dịch một lần duy nhất, thông tin này lập tức được gửi đồng thời tới bộ phận chuẩn bị hàng, dịch vụ gửi hóa đơn điện tử và chương trình tích điểm.
