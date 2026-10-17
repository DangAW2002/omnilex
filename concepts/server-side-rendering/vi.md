---
label: "Server-side rendering (SSR)"
aliases:
  - "SSR"
loanwords:
  - "Server-side rendering (SSR)"
  - "SSR"
autolink:
  aliases:
    SSR: always
plain_descriptions:
  - "tạo sẵn toàn bộ trang HTML tại máy chủ rồi mới gửi về cho trình duyệt"
  - "kết xuất trang web tại máy chủ giúp nội dung hiển thị nhanh và tối ưu SEO"
summary: "Kỹ thuật kết xuất giao diện thành mã HTML hoàn chỉnh trên máy chủ theo từng yêu cầu của người dùng trước khi gửi về trình duyệt."
confusable_notes:
  single-page-application: "SSR tạo sẵn mã HTML trên máy chủ cho từng lượt truy cập, còn SPA để trình duyệt tự chạy mã JavaScript để dựng giao diện."
  static-site-generation: "SSR tạo trang động ngay khi có yêu cầu gửi tới, còn SSG tạo sẵn các tệp HTML cố định từ lúc build dự án."
follow_up_questions:
  - "Thời gian phản hồi máy chủ (TTFB) ảnh hưởng thế nào đến trải nghiệm người dùng trong mô hình SSR?"
  - "Quá trình hydration gắn sự kiện vào mã HTML do máy chủ tạo ra diễn ra như thế nào?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
SSR giống như việc bạn gọi một tô phở nấu chín sẵn ở tiệm: bưng ra bàn là ăn được ngay lập tức, không cần tự nhóm bếp nấu nướng gì thêm.

## Chi tiết
Khi người dùng truy cập vào một địa chỉ, máy chủ sẽ thực thi mã nguồn để lấy dữ liệu từ cơ sở dữ liệu, ghép vào khung giao diện và tạo thành chuỗi HTML hoàn chỉnh. Trình duyệt nhận được trang web là hiển thị chữ và hình ảnh được ngay, giúp bot tìm kiếm dễ dàng đọc nội dung và cải thiện chỉ số hiển thị ban đầu. Sau đó, mã JavaScript sẽ tải về để bổ sung các tính năng tương tác.

## Định nghĩa chuyên ngành
Phương pháp kết xuất phía máy chủ chuyển đổi cây thành phần giao diện thành tài liệu HTML tĩnh cho mỗi yêu cầu HTTP nhận được.

## Ví dụ
Trang chi tiết sản phẩm thương mại điện tử được máy chủ truy vấn giá và mô tả, lắp ghép vào mẫu HTML rồi gửi về trình duyệt người dùng trong vòng 150 mili giây.
