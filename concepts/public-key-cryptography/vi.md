---
label: Mật mã hóa khóa công khai
aliases:
  - mật mã bất đối xứng
  - Public-key cryptography
loanwords:
  - public-key cryptography
plain_descriptions:
  - hệ thống mã hóa dùng hai chìa khóa khác nhau để người lạ có thể khóa nhưng chỉ chủ nhân mới mở được
  - cơ chế bảo mật cho phép trao đổi thư mật an toàn mà không cần gửi chìa khóa bí mật từ trước
summary: Hệ thống mật mã sử dụng các cặp khóa liên kết toán học gồm khóa công khai để mã hóa hoặc kiểm tra chữ ký và khóa riêng tư để giải mã hoặc ký số.
confusable_notes: {}
follow_up_questions:
  - Vì sao thuật toán mã hóa bất đối xứng tiêu tốn nhiều năng lực tính toán hơn so với mã hóa đối xứng như AES?
  - Hệ thống mật mã lai (hybrid cryptosystem) kết hợp ưu điểm của mã hóa khóa công khai và mã hóa đối xứng như thế nào?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/M%E1%BA%ADt_m%C3%A3_h%C3%B3a_kh%C3%B3a_c%C3%B4ng_khai
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một hòm thư có khe thả thư: bất kỳ ai đi qua đường cũng có thể bỏ bức thư vào khe hở, nhưng chỉ có chủ nhà cầm chiếc chìa khóa kim loại riêng mới mở được nắp hòm để lấy thư ra đọc.

## Chi tiết
Mật mã hóa khóa công khai giải quyết triệt để bài toán khó nhất của mật mã học cổ điển: làm thế nào để hai bên phân phối khóa bí mật qua một đường truyền không an toàn. Thay vì bắt buộc phải dùng chung một chiếc chìa khóa duy nhất, mỗi bên tự tạo ra một cặp khóa bất đối xứng. Khóa công khai được công bố tự do cho mọi người biết, còn khóa riêng tư được giữ kín tuyệt đối. Dữ liệu khi đã bị khóa bằng khóa công khai chỉ có thể giải mã được bằng chính khóa riêng tư tương ứng. Ngược lại, thông tin được ký bằng khóa riêng tư có thể được bất kỳ ai kiểm tra tính toàn vẹn bằng khóa công khai, tạo cơ sở cho chữ ký số. Các thuật toán hiện đại dựa trên bài toán phân tích thừa số nguyên tố lớn (RSA) hoặc đường cong elliptic (ECDSA, Ed25519).

## Định nghĩa chuyên ngành
Mô hình mật mã học sử dụng các thuật toán hàm một chiều có cửa sập toán học, trong đó các phép biến đổi thực hiện bằng khóa công khai chỉ có thể đảo ngược hoặc xác thực thông qua khóa riêng tư tương ứng.

## Ví dụ
Khi thiết lập kết nối an toàn qua giao thức SSH, ứng dụng máy khách mã hóa thông điệp bắt tay bằng khóa công khai của máy chủ, đảm bảo chỉ máy chủ nắm giữ khóa riêng tư mới giải mã được để mở phiên làm việc.
