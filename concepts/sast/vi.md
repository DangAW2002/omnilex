---
label: Static application security testing (SAST)
aliases:
  - SAST
  - kiểm thử bảo mật ứng dụng tĩnh
  - phân tích mã nguồn tĩnh
loanwords:
  - static application security testing (sast)
autolink:
  aliases:
    SAST: always
plain_descriptions:
  - quét mã nguồn phần mềm để tìm lỗi bảo mật mà không cần chạy chương trình
  - rà soát mã tự động giúp phát hiện sớm các lỗ hổng ngay trong kho lưu trữ mã nguồn
summary: Phương pháp kiểm thử hộp trắng phân tích mã nguồn hoặc tệp nhị phân ở trạng thái tĩnh nhằm phát hiện các lỗ hổng bảo mật trước khi phần mềm được thực thi.
confusable_notes:
  dast: SAST quét mã nguồn hoặc tệp nhị phân ở trạng thái tĩnh mà không chạy ứng dụng; DAST kiểm thử ứng dụng đang hoạt động từ bên ngoài bằng các yêu cầu mô phỏng tấn công.
follow_up_questions:
  - Các công cụ SAST theo dõi luồng dữ liệu bẩn (taint analysis) từ nguồn đầu vào đến điểm thực thi nguy hiểm ra sao?
  - Kỹ thuật nào giúp giảm thiểu tỷ lệ báo động giả (false positive) khi tích hợp SAST vào đường ống CI/CD?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như một kỹ sư trưởng rà soát bản vẽ thiết kế trên giấy trước khi khởi công công trình: họ dùng thước kẻ và đối chiếu các thông số kết cấu ngay trên bàn làm việc để phát hiện lỗi tính toán trước khi đổ bất kỳ khối bê tông nào.

## Chi tiết
Kiểm thử bảo mật ứng dụng tĩnh (SAST) phân tích mã nguồn, mã bytecode hoặc tệp nhị phân từ bên trong mà không cần chạy chương trình (mô hình kiểm thử hộp trắng). Các bộ công cụ SAST phân tích cú pháp mã nguồn thành cây cú pháp trừu tượng (AST), lập đồ thị luồng điều khiển (CFG) và thực hiện phân tích luồng dữ liệu bẩn (taint analysis) để truy vết dữ liệu đầu vào chưa được làm sạch từ người dùng đến các điểm thực thi nhạy cảm (như lệnh truy vấn SQL hoặc lệnh hệ điều hành). Tích hợp SAST vào quy trình CI/CD giúp đội ngũ phát triển phát hiện và sửa chữa các lỗ hổng (như SQL Injection hay tràn bộ đệm) ngay từ giai đoạn viết mã, hiện thực hóa nguyên tắc chuyển dịch an ninh về phía sớm (shift left).

## Định nghĩa chuyên ngành
Phương pháp phân tích tĩnh kiểm tra các khiếm khuyết an ninh và sự sai lệch quy chuẩn lập trình trực tiếp trên mã nguồn hoặc định dạng nhị phân mà không đòi hỏi thực thi ứng dụng.

## Ví dụ
Đường ống GitHub Actions chạy công cụ quét SAST trên mỗi pull request, cảnh báo ngay lập tức đoạn truy vấn cơ sở dữ liệu nối chuỗi nguy hiểm trong tệp controller trước khi mã được trộn vào nhánh chính.
