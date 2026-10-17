---
label: Cổng thanh toán
aliases:
  - Payment gateway
loanwords:
  - payment gateway
plain_descriptions:
  - dịch vụ trực tuyến kết nối website với ngân hàng để trừ tiền thẻ
  - cầu nối thanh toán điện tử tiếp nhận và xử lý giao dịch mua hàng qua mạng
summary: Dịch vụ công nghệ trung gian tiếp nhận, mã hóa và truyền tải thông tin giao dịch giữa website bán lẻ với ngân hàng và mạng lưới thẻ.
confusable_notes: {}
follow_up_questions:
  - Cơ chế mã hóa tokenization giúp cổng thanh toán đáp ứng tiêu chuẩn PCI-DSS như thế nào?
  - Cổng thanh toán khác gì so với tài khoản định danh người nhận tiền tại ngân hàng?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Thanh_to%C3%A1n_%C4%91i%E1%BB%87n_t%E1%BB%AD
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Cổng thanh toán giống như một nhân viên thu ngân trực tuyến đáng tin cậy. Khi bạn nhập thông tin thẻ để mua đồ trên trang web, cổng thanh toán sẽ mã hóa dữ liệu, hỏi ngân hàng xem bạn có đủ tiền không và thông báo kết quả cho cửa hàng.

## Chi tiết
Cổng thanh toán đóng vai trò cầu nối bảo mật giữa giỏ hàng thương mại điện tử và các tổ chức tài chính thanh toán. Khi người mua xác nhận giao dịch, cổng kiểm tra tính hợp lệ của số thẻ, quét rủi ro gian lận, gửi mã xác thực 3D Secure và chuyển yêu cầu tới tổ chức phát hành thẻ. Để giảm thiểu rủi ro bảo mật cho website bán hàng, cổng thanh toán sử dụng chuỗi mã hóa tokenization để máy chủ bán hàng không phải lưu giữ thông tin thẻ nhạy cảm của khách.

## Định nghĩa chuyên ngành
Giải pháp dịch vụ phần mềm trung gian chịu trách nhiệm thu thập, mã hóa và định tuyến dữ liệu giao dịch tài chính từ kênh bán hàng số sang mạng lưới ngân hàng xử lý thanh toán bù trừ.

## Ví dụ
Một trang web bán vé xem phim tích hợp cổng thanh toán để khách hàng có thể quét mã QR từ ứng dụng ngân hàng di động hoặc thanh toán bằng thẻ tín dụng quốc tế an toàn.
