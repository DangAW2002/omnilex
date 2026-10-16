---
label: Webhook
aliases:
  - HTTP callback
loanwords:
  - webhook
plain_descriptions:
  - thông báo tự động gửi giữa các máy chủ ngay khi có một sự kiện phát sinh
  - cơ chế máy chủ tự gọi lại báo tin cho ứng dụng khi người dùng hoàn tất thanh toán
summary: Cơ chế gọi ngược HTTP tự động kích hoạt bởi hệ thống nguồn để bắn dữ liệu sự kiện thời gian thực sang máy chủ tiếp nhận.
confusable_notes: {}
follow_up_questions:
  - Làm thế nào để máy chủ kiểm tra tính hợp lệ của chữ ký HMAC trên webhook nhận được?
  - Vì sao chính sách thử lại và khóa bất biến là bắt buộc đối với dịch vụ nhận webhook?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Thay vì cứ 5 phút bạn phải ra mở hộp thư xem có bưu phẩm chưa, người giao hàng bấm chuông cửa ngay khi kiện hàng tới nơi.

## Chi tiết
Webhook đảo ngược mô hình hỏi thăm liên tục (polling). Khi một sự kiện xuất hiện (ví dụ khách thanh toán thành công), hệ thống nguồn tự động gửi một gói tin HTTP kèm dữ liệu JSON tới một URL tiếp nhận đã đăng ký trước.

## Định nghĩa chuyên ngành
Cơ chế gửi thông báo theo kiến trúc hướng sự kiện dựa trên giao thức HTTP, cho phép đồng bộ hóa dữ liệu thời gian thực giữa hai hệ thống độc lập.

## Ví dụ
Cổng thanh toán MoMo gửi tin nhắn HTTP POST sang máy chủ của Tiki ngay khi người mua hoàn tất chuyển tiền.
