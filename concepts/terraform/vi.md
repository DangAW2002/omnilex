---
label: Terraform
aliases: []
loanwords:
  - terraform
plain_descriptions:
  - công cụ khởi tạo và quản lý máy chủ đám mây bằng các tệp mã nguồn
  - phần mềm hạ tầng dạng mã nguồn giúp tạo tài nguyên tự động trên nhiều hãng đám mây
summary: Công cụ hạ tầng dạng mã nguồn (IaC) cho phép khởi tạo, thay đổi và quản lý phiên bản các tài nguyên đám mây một cách an toàn và nhất quán bằng ngôn ngữ khai báo.
confusable_notes:
  ansible: Terraform tập trung vào việc khởi tạo hạ tầng (tạo máy ảo, mạng, ổ đĩa), trong khi Ansible chuyên về quản lý cấu hình và cài đặt phần mềm bên trong các máy tính đã dựng sẵn.
follow_up_questions:
  - Tệp trạng thái (Terraform state file) theo dõi tài nguyên thực tế và phát hiện độ lệch cấu hình (drift) như thế nào?
  - Quy trình lập kế hoạch (`terraform plan`) và áp dụng (`terraform apply`) bảo đảm tính an toàn khi thay đổi hạ tầng ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như bản vẽ kiến trúc kỹ thuật số nạp vào máy in 3D: chỉ cần đưa bản vẽ chuẩn vào máy, cỗ máy tự động xây dựng nên ngôi nhà chính xác từng viên gạch mà không cần công nhân xây thủ công.

## Chi tiết
Terraform sử dụng ngôn ngữ cấu hình HCL để khai báo trạng thái mong muốn của hệ thống. Khi kỹ sư chạy lệnh `terraform plan`, hệ thống sẽ đối chiếu mã nguồn với tệp trạng thái (state file) của hạ tầng thực tế, vạch ra các bước cần thêm mới, cập nhật hoặc xóa bỏ. Nhờ hệ thống plugin phong phú, Terraform có thể quản lý đồng thời tài nguyên trên AWS, Google Cloud hay Kubernetes.

## Định nghĩa chuyên ngành
Bộ công cụ hạ tầng dưới dạng mã nguồn (IaC) khai báo, thực hiện hòa giải trạng thái mong muốn với trạng thái thực tế của tài nguyên hạ tầng thông qua đồ thị phụ thuộc và giao tiếp API đa đám mây.

## Ví dụ
Một kỹ sư DevOps viết tệp mã nguồn `main.tf` khai báo mạng VPC, hai dải mạng con và cụm máy chủ web; khi chạy lệnh `terraform apply`, toàn bộ hạ tầng mạng đám mây được khởi tạo tự động chỉ trong vòng 3 phút.
