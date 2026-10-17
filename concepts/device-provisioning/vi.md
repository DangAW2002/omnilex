---
label: Device provisioning
aliases:
  - "Khởi tạo thiết bị"
loanwords:
  - "device provisioning"
plain_descriptions:
  - quy trình tự động đăng ký cấp phát chứng thư số và thiết lập cấu hình ban đầu cho thiết bị
  - bước gia nhập và xác thực danh tính của máy móc mới vào hệ thống quản lý tập trung
summary: Quy trình khởi tạo tự động nhằm xác thực danh tính, đăng ký và thiết lập cấu hình vận hành ban đầu cho thiết bị phần cứng mới kết nối vào nền tảng đám mây.
confusable_notes: {}
follow_up_questions:
  - Chip bảo mật phần cứng TPM và chứng chỉ số X.509 hỗ trợ quy trình khởi tạo không chạm (zero-touch) như thế nào?
  - Dịch vụ cấp phát phân luồng thiết bị về cụm máy chủ đám mây gần nhất theo vị trí địa lý ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
Khởi tạo thiết bị giống như thủ tục làm thẻ nhân viên ngày đầu đi làm: khi một chiếc cảm biến vừa bóc hộp được cắm điện lần đầu, nó tự trình thẻ căn cước số của mình lên máy chủ, nhận chìa khóa bảo mật và cấu hình làm việc mà không cần ai phải cài đặt thủ công.

## Chi tiết
Quy trình này giúp các nhà sản xuất tránh rủi ro bảo mật khi phải nạp sẵn mật khẩu tĩnh cố định vào phần cứng tại nhà máy. Khi thiết bị bật nguồn tại công trình, nó tự kết nối tới dịch vụ cấp phát tập trung (như Azure Device Provisioning Service). Dựa trên chứng thực phần cứng từ chip TPM hoặc chứng chỉ X.509, hệ thống sẽ xác minh tính hợp lệ, gán thiết bị vào đúng tài khoản khách hàng, nạp cấu hình ban đầu và cấp quyền truyền dữ liệu an toàn.

## Định nghĩa chuyên ngành
Quy trình hành chính và kỹ thuật tự động hóa nhằm thiết lập mối quan hệ tin cậy mật mã, gán định danh duy nhất và phân bổ cấu hình hoạt động cho thiết bị phần cứng mới gia nhập mạng lưới.

## Ví dụ
Một nghìn chiếc camera an ninh thông minh sau khi treo lên cột tự động kết nối máy chủ dịch vụ cấp phát, xuất trình chứng chỉ bảo mật và nhận cấu hình luồng truyền video mà kỹ thuật viên không cần cấu hình tay.
