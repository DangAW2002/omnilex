---
label: Blockchain
aliases:
  - chuỗi khối
  - công nghệ chuỗi khối
loanwords:
  - blockchain
plain_descriptions:
  - sổ cái điện tử ghi lại các giao dịch được nhóm thành từng khối và xâu chuỗi bằng mật mã học
  - mạng lưới máy tính cùng lưu trữ bản sao dữ liệu giao dịch mà không phụ thuộc vào máy chủ trung tâm
summary: Sổ cái kỹ thuật số phi tập trung lưu trữ các giao dịch theo từng khối dữ liệu được liên kết mật mã và xác thực bởi mạng lưới phân tán.
confusable_notes: {}
follow_up_questions:
  - Cơ chế đồng thuận Proof of Work (bằng chứng công việc) và Proof of Stake (bằng chứng cổ phần) khác nhau thế nào?
  - Khác biệt giữa blockchain công khai (permissionless) và blockchain doanh nghiệp nội bộ (permissioned) là gì?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Blockchain
    accessed: '2026-10-16'
---

## Giải thích dễ hiểu
Hãy tưởng tượng blockchain giống như một cuốn sổ ghi chép chung mà hàng trăm người đều giữ một bản sao y hệt nhau: mỗi khi có một khoản tiền được chuyển đi hợp lệ, tất cả mọi người đều đồng loạt ghi thêm vào sổ của mình, khiến không một cá nhân nào có thể lén lút tẩy xóa hay gian lận số liệu.

## Chi tiết
Blockchain nhóm các dữ liệu giao dịch đã qua kiểm chứng vào các cấu trúc tuần tự gọi là khối (block). Mỗi khối chứa một mã băm mật mã học (cryptographic hash) của khối liền trước, dấu thời gian và một cây Merkle chứa danh sách các giao dịch. Cấu trúc liên kết chuỗi này tạo ra một nhật ký giao dịch bất biến, bởi vì việc sửa đổi bất kỳ dữ liệu quá khứ nào cũng đòi hỏi phải tính toán lại toàn bộ mã băm của tất cả các khối phía sau trên đa số máy tính trong mạng lưới. Các nút mạng (node) duy trì tính đồng bộ dữ liệu và ngăn chặn gian lận chi tiêu kép (double-spending) thông qua các giao thức đồng thuận phân tán. Nhiều mạng blockchain hiện đại còn hỗ trợ thực thi các hợp đồng thông minh (smart contract) tự động.

## Định nghĩa chuyên ngành
Cơ sở dữ liệu phân tán lưu trữ chuỗi dữ liệu chỉ cho phép ghi thêm (append-only), được liên kết an toàn bằng các hàm băm mật mã và đạt được sự thống nhất trạng thái thông qua cơ chế đồng thuận ngang hàng.

## Ví dụ
Mạng lưới Bitcoin duy trì sổ cái ghi nhận mọi giao dịch chuyển tiền điện tử ngang hàng giữa người dùng trên khắp thế giới; cứ khoảng 10 phút, một khối mới chứa hàng nghìn giao dịch lại được tạo ra và liên kết chặt chẽ vào khối trước đó.
