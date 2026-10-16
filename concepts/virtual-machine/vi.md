---
label: Máy ảo
aliases:
  - VM
  - Virtual machine
loanwords:
  - virtual machine
  - VM
plain_descriptions:
  - chiếc máy tính giả lập bằng phần mềm có đầy đủ hệ điều hành và ổ đĩa như máy tính thật
  - máy tính ảo hoạt động độc lập bên trong một máy chủ vật lý lớn hơn
summary: >-
  Hệ thống giả lập bằng phần mềm của một máy tính vật lý, thực thi các ứng dụng bên trong một hệ điều hành khách riêng
  biệt dưới sự quản lý của phần mềm ảo hóa.
confusable_notes:
  software-container: >-
    Máy ảo giả lập toàn bộ phần cứng và khởi động hệ điều hành riêng rẽ, còn container đóng gói thư viện ứng dụng và
    chia sẻ chung nhân hệ điều hành với máy chủ.
follow_up_questions:
  - >-
    Phần mềm ảo hóa Loại 1 (chạy trực tiếp trên phần cứng) khác gì về hiệu năng so với Loại 2 (chạy trên hệ điều hành
    khác)?
  - Vì sao máy ảo mang lại ranh giới bảo mật cách ly mạnh mẽ hơn so với container?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/M%C3%A1y_%E1%BA%A3o
    accessed: '2026-10-16'
    note: Trang bách khoa toàn thư tiếng Việt định nghĩa máy ảo là sự giả lập của một hệ thống máy tính
autolink:
  aliases:
    VM: always
---

## Giải thích dễ hiểu
Tưởng tượng như một tòa chung cư lớn: cả tòa nhà là máy chủ vật lý, nhưng mỗi căn hộ là một gia đình độc lập có cửa khóa riêng, bếp riêng và hệ thống điện nước riêng rẽ hoàn toàn.

## Chi tiết
Máy ảo hoạt động nhờ phần mềm ảo hóa (hypervisor như KVM hay VMware) phân chia phần cứng CPU, RAM, ổ cứng và card mạng thành các phần riêng. Do mỗi máy ảo khởi động một nhân hệ điều hành độc lập, nó mang lại độ an toàn và cô lập tuyệt đối, cho phép chạy phần mềm cũ đòi hỏi hệ điều hành đặc thù, dù tốn tài nguyên và khởi động lâu hơn container.

## Định nghĩa chuyên ngành
Cơ chế ảo hóa cấp phần cứng giả lập kiến trúc máy tính độc lập vận hành một hệ điều hành khách hoàn chỉnh.

## Ví dụ
Một máy ảo cài hệ điều hành Ubuntu 24.04 được cấp phát 4 CPU ảo và 16 GB bộ nhớ RAM chạy độc lập trên máy chủ đám mây.
