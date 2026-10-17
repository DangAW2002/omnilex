---
label: UTM parameters
aliases:
  - Tham số UTM
  - Mã UTM
  - Thẻ UTM
loanwords:
  - utm parameters
  - utm
plain_descriptions:
  - các đoạn mã ngắn gắn vào đuôi đường link web để theo dõi người xem bấm vào từ đâu
  - thông tin bổ sung trên đường link giúp biết chính xác chiến dịch hay bài đăng nào mang lại khách hàng
summary: Năm tham số truy vấn chuẩn hóa được nối vào sau đường dẫn URL giúp các công cụ phân tích theo dõi chính xác nguồn gốc, phương tiện và chiến dịch tiếp thị mang lại lưu lượng truy cập.
confusable_notes: {}
follow_up_questions:
  - Điểm khác biệt giữa utm_source, utm_medium và utm_campaign trong theo dõi chuyển đổi là gì?
  - Tại sao việc thống nhất quy tắc viết hoa - viết thường trong mã UTM lại mang tính sống còn đối với dữ liệu báo cáo?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Tưởng tượng một phong bì thư hồi đáp có in sẵn một ký hiệu mã màu nhỏ ở góc dưới để nhân viên bưu điện biết bức thư này được gửi lại từ mẩu quảng cáo trên báo giấy, tờ rơi ngoài phố hay cuốn tạp chí tháng.

## Chi tiết
Bắt nguồn từ tên gọi Urchin Tracking Module (hệ thống phân tích web được Google mua lại vào năm 2005 để phát triển thành Google Analytics), các tham số UTM là các cặp khóa-giá trị được nối sau dấu hỏi chấm (`?`) trong đường dẫn trang web. Năm trường dữ liệu tiêu chuẩn bao gồm: `utm_source` (xác định nền tảng nguồn như facebook, google hay newsletter), `utm_medium` (kênh tiếp thị như cpc, email hay organic-social), `utm_campaign` (tên chiến dịch cụ thể), `utm_term` (từ khóa quảng cáo) và `utm_content` (phân biệt các vị trí đặt nút bấm hoặc hình ảnh khác nhau trong cùng một mẫu quảng cáo). Khi người dùng nhấp vào liên kết, mã đo lường trên trang web sẽ tự động trích xuất các tham số này để ghi nhận doanh số và phiên truy cập cho đúng chiến dịch.

## Định nghĩa chuyên ngành
Chuỗi tham số truy vấn chuẩn hóa dạng cặp khóa-giá trị trong chuỗi URI được các hệ thống đo lường viễn thám web phân tích cú pháp để gán nhãn thuộc tính kênh phân phối chiến dịch khi xử lý yêu cầu HTTP.

## Ví dụ
Một chuỗi cửa hàng bán lẻ đồ công nghệ tại Việt Nam chạy chiến dịch khuyến mãi tựu trường chia sẻ đường link `https://cuahang.vn/laptop?utm_source=tiktok&utm_medium=short-video&utm_campaign=tuu-truong-2026`, giúp bộ phận dữ liệu đo lường chính xác doanh số bán máy tính bắt nguồn từ kênh TikTok.
