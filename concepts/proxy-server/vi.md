---
label: Máy chủ proxy
aliases: []
loanwords:
  - proxy server
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/M%C3%A1y_ch%E1%BB%A7_proxy
    accessed: '2026-10-17'

plain_descriptions:
  - máy chủ trung gian đứng ra gửi và nhận dữ liệu thay cho máy tính khác
  - thiết bị trung chuyển lọc nội dung web hoặc lưu bộ nhớ đệm cho người dùng
summary: Máy chủ trung gian đóng vai trò đại diện tiếp nhận yêu cầu từ máy trạm và chuyển tiếp tới các máy chủ đích khác trên mạng.
confusable_notes: {}
follow_up_questions:
  - Điểm khác biệt cốt lõi về mặt kiến trúc giữa forward proxy và reverse proxy là gì?
  - Máy chủ proxy hỗ trợ lưu trữ tạm (caching) và tăng tốc độ truy cập mạng cho doanh nghiệp ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc nhờ một người trợ lý đi chợ mua sắm giúp bạn: người bán hàng ở chợ chỉ gặp và giao dịch trực tiếp với người trợ lý mà không biết bạn là người thực sự mua món hàng đó.

## Chi tiết
Máy chủ forward proxy đóng vai trò cầu nối tiếp nhận luồng yêu cầu từ các máy trạm trong mạng nội bộ, lọc bỏ các địa chỉ web nguy hiểm, lưu bộ nhớ đệm các trang thường xuyên truy cập và gửi yêu cầu ra internet thay cho người dùng. Ngược lại, reverse proxy đứng phía trước cụm máy chủ dịch vụ để phân tải lưu lượng, giải mã chứng chỉ HTTPS và bảo vệ hệ thống backend.

## Định nghĩa chuyên ngành
Thực thể mạng hoạt động ở tầng ứng dụng hoặc tầng giao vận có chức năng chặn bắt các yêu cầu từ máy trạm, áp dụng các chính sách kiểm duyệt, tải dữ liệu từ máy chủ gốc và chuyển kết quả phản hồi đã làm sạch về cho client.

## Ví dụ
Một doanh nghiệp định tuyến toàn bộ lưu lượng duyệt web của nhân viên qua một máy chủ proxy để chặn các trang web lừa đảo độc hại và lưu đệm các tệp cập nhật phần mềm nhằm tiết kiệm băng thông mạng.
