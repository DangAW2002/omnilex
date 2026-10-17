---
label: Event sourcing
aliases:
  - Lưu vết sự kiện
loanwords:
  - event sourcing
plain_descriptions:
  - lưu toàn bộ lịch sử thay đổi dưới dạng danh sách sự kiện chỉ thêm mà không xóa sửa
  - lưu vết biến động như sổ kế toán thay vì chỉ ghi đè giá trị hiện tại
summary: Mẫu thiết kế lưu trữ dữ liệu trong đó mọi thay đổi trạng thái được ghi nhận thành chuỗi các sự kiện bất biến nối tiếp nhau, thay vì ghi đè lên trạng thái hiện thời của bản ghi.
confusable_notes:
  cqrs: Event sourcing là cơ chế lưu trữ bền vững ghi lại từng biến động trạng thái thành chuỗi sự kiện, trong khi CQRS là kiến trúc phân tách rạch ròi giữa mô hình ghi và mô hình đọc thường dùng chuỗi sự kiện đó để dựng view truy vấn.
follow_up_questions:
  - Ảnh chụp nhanh (snapshot) giúp khắc phục tình trạng chậm khi tái dựng thực thể có lịch sử sự kiện quá dài như thế nào?
  - Việc nâng cấp cấu trúc lược đồ (schema) của các sự kiện cũ trong quá khứ cần được quản lý ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như tài khoản ngân hàng: ngân hàng không chỉ lưu mỗi số dư hiện tại của bạn; họ ghi chép từng giao dịch nạp tiền, rút tiền và trừ phí, số dư được tính bằng cách cộng trừ toàn bộ bảng kê giao dịch.

## Chi tiết
Các ứng dụng CRUD thông thường cập nhật trực tiếp lên các dòng trong bảng, xóa sạch dấu vết và bối cảnh của dữ liệu trước đó. Ngược lại, mẫu Event Sourcing mô hình hóa mọi biến động thành một sự kiện quá khứ bất biến (AccountCreated, MoneyDeposited, AddressUpdated) được thêm nối đuôi vào kho sự kiện. Trạng thái hiện tại của một đối tượng được tái tạo bằng cách phát lại toàn bộ chuỗi sự kiện từ đầu hoặc từ bản chụp nhanh định kỳ. Cách này mang lại nhật ký kiểm toán hoàn hảo và cho phép truy vấn ngược dòng thời gian.

## Định nghĩa chuyên ngành
Mẫu kiến trúc lưu trữ đảm bảo tính toàn vẹn trạng thái bằng cách ghi nhận mọi diễn tiến nghiệp vụ dưới dạng một chuỗi tuần tự tuyến tính các sự kiện miền bất biến.

## Ví dụ
Hệ thống vận chuyển hàng hóa lưu 50 sự kiện quét mã trạm cho một bưu kiện, cho phép quản trị viên tua lại toàn bộ hành trình và tái dựng vị trí gói hàng tại bất kỳ phút nào trong quá khứ.
