---
label: Supply chain attack
qualifier: (Phần mềm)
aliases:
  - tấn công chuỗi cung ứng
loanwords:
  - supply chain attack
plain_descriptions:
  - tấn công vào nhà cung cấp phần mềm bên ngoài hoặc thư viện mở để lây nhiễm cho khách hàng
  - cài cắm mã độc vào các bản cập nhật phần mềm hoặc kho gói phụ thuộc đáng tin cậy
summary: Cuộc tấn công mạng nhắm vào các nhà cung cấp bên thứ ba, thư viện mã nguồn hoặc quy trình đóng gói nhằm xâm nhập vào hệ thống của tổ chức đích.
confusable_notes: {}
follow_up_questions:
  - Danh mục thành phần phần mềm (SBOM) hỗ trợ đội ngũ kỹ thuật kiểm soát rủi ro chuỗi cung ứng ra sao?
  - Giải pháp nào giúp bảo vệ môi trường chạy CI/CD trước các cuộc tấn công chiếm quyền gói phụ thuộc (dependency hijacking)?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như việc kẻ xấu đầu độc nước ngay tại nhà máy nước trung tâm của thành phố: thay vì phải lẻn vào từng căn nhà để bỏ thuốc độc vào từng cốc nước, kẻ phá hoại làm ô nhiễm nguồn cấp nước chung khiến nước bẩn tự động chảy đến từng hộ gia đình.

## Chi tiết
Trong cuộc tấn công chuỗi cung ứng phần mềm, kẻ tấn công xâm nhập vào một mắt xích đầu nguồn trong vòng đời phát triển phần mềm thay vì đánh trực diện vào mục tiêu chính. Các hình thức phổ biến bao gồm chiếm đoạt tài khoản duy trì các thư viện nguồn mở (trên npm, PyPI), cài cắm mã độc vào máy chủ biên dịch CI/CD, đánh cắp khóa ký số hoặc chèn cửa hậu vào bản cập nhật chính thức của nhà cung cấp (như vụ tấn công SolarWinds nổi tiếng). Do doanh nghiệp luôn đặt trọn niềm tin vào các bản cập nhật có chữ ký số của đối tác quen thuộc, mã độc dễ dàng vượt qua tường lửa và hệ thống phòng ngự. Biện pháp phòng chống gồm kiểm tra băm mã gói phụ thuộc, xây dựng môi trường biên dịch khép kín (hermetic build), khóa cố định phiên bản thư viện và lập bảng kê thành phần phần mềm (SBOM).

## Định nghĩa chuyên ngành
Phương thức tấn công xâm nhập vào hệ thống của tổ chức thông qua việc khai thác các lỗ hổng hoặc mã độc được cài cắm vào các nhà cung ứng bên ngoài, các thành phần phụ thuộc hoặc quy trình phân phối của bên thứ ba.

## Ví dụ
Kẻ tấn công chèn một đoạn mã độc đánh cắp khóa bảo mật vào phiên bản mới của thư viện tiện ích JavaScript thông dụng, khiến hàng nghìn ứng dụng ngân hàng và thương mại điện tử tích hợp thư viện này vô tình gửi dữ liệu mật về máy chủ ngoại tuyến.
