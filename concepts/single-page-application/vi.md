---
label: "Single-page application (SPA)"
aliases:
  - "SPA"
loanwords:
  - "Single-page application (SPA)"
  - "SPA"
autolink:
  aliases:
    SPA: always
plain_descriptions:
  - "trang web đổi nội dung mượt mà mà không bao giờ phải nạp lại toàn bộ trang"
  - "ứng dụng web tải một khung duy nhất và chuyển màn hình bằng JavaScript"
summary: "Kiến trúc ứng dụng web tải một trang HTML duy nhất và cập nhật nội dung linh hoạt mà không tải lại toàn trang."
confusable_notes:
  server-side-rendering: "SPA dựng giao diện ở phía trình duyệt bằng mã JavaScript, trong khi SSR tạo sẵn toàn bộ mã HTML hoàn chỉnh tại máy chủ trước khi gửi về."
follow_up_questions:
  - "Tại sao ứng dụng SPA thuần túy thường gặp bất lợi về SEO và tốc độ tải trang lần đầu?"
  - "Bộ định tuyến phía máy khách (client-side router) hoạt động ra sao để điều hướng URL?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
SPA hoạt động giống như một phần mềm cài trên máy tính: bạn bấm chuyển mục hay xem chi tiết thì nội dung hiện ra ngay tắp lự, màn hình không hề bị chớp trắng để tải lại.

## Chi tiết
Trong mô hình SPA, máy chủ chỉ gửi về một tệp HTML ban đầu cùng gói mã JavaScript và CSS. Khi người dùng bấm sang trang mới, bộ định tuyến phía máy khách (router) bắt sự kiện, gọi ngầm API để lấy dữ liệu JSON và cập nhật thẳng vào giao diện DOM hiện tại. Điều này mang lại trải nghiệm mượt mà nhưng đòi hỏi tối ưu gói mã để trang không bị nặng nề lúc khởi động.

## Định nghĩa chuyên ngành
Ứng dụng web hướng máy khách thực hiện toàn bộ việc định tuyến, quản lý trạng thái và kết xuất giao diện trực tiếp trên trình duyệt qua các luồng dữ liệu API.

## Ví dụ
Giao diện Gmail hoặc mạng xã hội cho phép bạn đọc từng bức thư hay cuộn bảng tin liên tục mà trình duyệt không bao giờ phải tải lại cả trang web.
