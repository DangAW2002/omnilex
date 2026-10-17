---
label: "Giao diện người máy"
qualifier: "(HMI)"
aliases:
  - "HMI"
  - "Màn hình HMI"
  - "Human-Machine Interface"
loanwords:
  - "hmi"
autolink:
  aliases:
    HMI: always
plain_descriptions:
  - "màn hình cảm biến hoặc bảng điều khiển giúp công nhân vận hành theo dõi và chỉnh máy móc"
  - "giao diện đồ họa hiển thị thông số và các nút bấm điều khiển máy móc công nghiệp"
summary: "Giao diện phần cứng và phần mềm đồ họa giúp người vận hành theo dõi các thông số kỹ thuật, nhận cảnh báo sự cố và tương tác điều khiển máy móc tự động hóa."
confusable_notes:
  scada: "HMI thường là màn hình cảm ứng gắn trực tiếp tại thân máy hoặc tủ điện phân xưởng để công nhân thao tác tại chỗ, còn SCADA là hệ thống giám sát và thu thập dữ liệu diện rộng điều khiển toàn bộ nhà máy hoặc cụm cơ sở từ xa."
follow_up_questions:
  - "Tiêu chuẩn thiết kế giao diện ISA-101 giúp công nhân tránh quá tải thông tin khi có quá nhiều chuông báo động dồn dập ra sao?"
  - "Các bộ điều khiển HMI giao tiếp với PLC qua những giao thức công nghiệp nào trên cổng mạng Ethernet và cổng nối tiếp?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Giao_di%E1%BB%87n_ng%C6%B0%E1%BB%9Di_m%C3%A1y
    accessed: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như bảng đồng hồ và màn hình cảm ứng trên ô tô: hiển thị rõ cho tài xế biết tốc độ xe chạy, lượng xăng còn lại, cảnh báo áp suất lốp và cung cấp các nút bấm để điều chỉnh máy lạnh hay bật đèn pha.

## Chi tiết
Màn hình HMI đóng vai trò cầu nối tương tác giữa người công nhân và bộ điều khiển tự động hóa như PLC. Màn hình HMI thường được thiết kế dạng máy tính cảm ứng công nghiệp chống nước, chống bụi gắn trên tủ điện. Phần mềm HMI liên tục đọc thanh ghi dữ liệu qua mạng công nghiệp (Modbus, Profinet, Ethernet/IP) để vẽ đồ thị nhiệt độ, hiển thị mức chất lỏng trong bồn chứa và phát tín hiệu cảnh báo màu đỏ khi có sự cố. Khi công nhân bấm nút trên màn hình, lệnh sẽ được dịch tức thời thành giá trị thanh ghi gửi đến vi điều khiển máy móc.

## Định nghĩa chuyên ngành
Tổ hợp thiết bị phần cứng và phần mềm hiển thị đồ họa phục vụ việc trực quan hóa thông tin vận hành và truyền nhận thao tác can thiệp trực tiếp giữa người vận hành và hệ thống điều khiển tự động.

## Ví dụ
Kỹ sư vận hành dây chuyền chiết rót nước giải khát theo dõi màn hình HMI cảm ứng mười lăm inch gắn tại tủ điều khiển để kiểm tra tốc độ đóng nắp chai và nhấn nút tạm dừng khi phát hiện kẹt băng tải.
