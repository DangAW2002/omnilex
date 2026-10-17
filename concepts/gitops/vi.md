---
label: GitOps
aliases:
  - Vận hành qua Git
loanwords:
  - gitops
plain_descriptions:
  - dùng kho chứa Git làm nơi lưu cấu hình chuẩn duy nhất để triển khai hệ thống máy chủ
  - công cụ tự động đồng bộ trạng thái thực tế của cụm máy chủ theo mã nguồn trên Git
summary: >-
  Mô hình vận hành dùng kho lưu trữ Git làm nguồn chân lý duy nhất để quản lý hạ tầng khai báo và đồng bộ triển khai ứng dụng tự động.
confusable_notes: {}
follow_up_questions:
  - "Mô hình GitOps dạng kéo (pull-based) khác gì so với quy trình CI/CD dạng đẩy (push-based) truyền thống?"
  - "Vì sao việc đối soát cấu hình từ kho Git lại giúp việc kiểm toán và khôi phục hệ thống trở nên dễ dàng hơn?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Hãy hình dung bạn gửi danh sách đồ đạc nội thất vào một cuốn sổ; một trợ lý trong phòng sẽ liên tục kiểm tra căn phòng và sắp xếp mọi thứ sao cho đúng hệt như từng dòng trong sổ.

## Chi tiết
Trong mô hình GitOps, mọi thiết lập của hạ tầng và phần mềm đều được viết dưới dạng tệp khai báo và lưu trong kho Git. Một tiến trình tự động chạy bên trong cụm máy chủ định kỳ kiểm tra kho lưu trữ này, đối chiếu giữa cấu hình mong muốn với trạng thái máy chủ thực tế và tự sửa chữa các sai lệch. Kỹ sư phát hành phiên bản mới bằng cách tạo pull request, duyệt mã và hợp nhất nhánh thay vì gõ lệnh triển khai thủ công. Mọi biến động ngoài ý muốn trên máy chủ sẽ bị ghi đè trở lại theo đúng phiên bản trong Git.

## Định nghĩa chuyên ngành
Mô hình vận hành hạ tầng đám mây sử dụng hệ thống quản lý phiên bản làm nguồn dữ liệu chuẩn mực và dùng các tác nhân điều hòa tự động để đồng bộ trạng thái tài nguyên.

## Ví dụ
Đội ngũ kỹ thuật chỉnh sửa tệp cấu hình nâng số lượng máy chủ từ 2 lên 4 trên kho Git; công cụ Argo CD lập tức nhận diện thay đổi và tự khởi tạo thêm 2 máy chủ mới trong vòng nửa phút.
