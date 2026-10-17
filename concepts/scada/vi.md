---
label: SCADA
aliases: []
loanwords:
  - "scada"
autolink:
  label: always
plain_descriptions:
  - hệ thống điều khiển giám sát và thu thập dữ liệu trung tâm cho nhà máy hoặc lưới điện
  - phần mềm phòng điều hành hiển thị đồ họa toàn cảnh nhà máy và phát lệnh vận hành
summary: Kiến trúc hệ thống điều khiển công nghiệp thu thập dữ liệu thời gian thực từ các bộ điều khiển phân tán, hiển thị đồ họa trực quan và cho phép điều hành từ xa.
confusable_notes:
  hmi: "SCADA là hệ thống giám sát và thu thập dữ liệu diện rộng điều khiển toàn bộ nhà máy hoặc cụm cơ sở từ xa, còn HMI thường là màn hình cảm ứng gắn trực tiếp tại thân máy hoặc tủ điện phân xưởng để công nhân thao tác tại chỗ."
  dcs: "SCADA phục vụ giám sát các hệ thống phân tán địa lý rộng lớn (như lưới điện, đường ống) qua mạng diện rộng, còn DCS được thiết kế cho các nhà máy sản xuất liên tục quy mô lớn trong một khuôn viên (như lọc dầu, hóa chất) với mạng điều khiển nội bộ tốc độ cao và độ dự phòng phần cứng tuyệt đối."
follow_up_questions:
  - Hệ thống SCADA khác biệt gì về phạm vi địa lý và tốc độ điều khiển so với hệ thống điều khiển phân tán DCS?
  - Mô hình phân vùng mạng Purdue bảo vệ hệ thống SCADA trước các nguy cơ tấn công từ mạng văn phòng IT ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-16'
---

## Giải thích dễ hiểu
SCADA giống như trung tâm chỉ huy điều khiển không lưu của nhà máy hay lưới điện: toàn bộ sơ đồ đường ống, van áp suất và nhiệt độ được vẽ sống động trên màn hình lớn, giúp kỹ sư trưởng ngồi trong phòng máy lạnh có thể giám sát toàn bộ nhà máy thủy điện cách xa hàng trăm cây số.

## Chi tiết
Hệ thống SCADA (Supervisory Control and Data Acquisition) kết nối các bộ điều khiển lập trình PLC và trạm đầu cuối từ xa (RTU) với các trạm giao diện người-máy (HMI) và máy chủ lưu trữ dữ liệu lịch sử (Historian). Các giao thức công nghiệp như Modbus, DNP3 và OPC UA được sử dụng để truyền lệnh và thu thập số liệu. Điểm mấu chốt là SCADA thực hiện chức năng giám sát và đặt lệnh tổng thể, trong khi các phản xạ an toàn thời gian thực dưới một giây vẫn do các bộ PLC tại chỗ trực tiếp đảm nhiệm.

## Định nghĩa chuyên ngành
Hệ thống tích hợp phần cứng và phần mềm điều khiển công nghiệp có nhiệm vụ thu thập số liệu đo lường từ xa, cảnh báo sự cố và gửi lệnh điều khiển giám sát đến các thiết bị hiện trường.

## Ví dụ
Trung tâm điều độ hệ thống điện miền Nam sử dụng SCADA để theo dõi công suất truyền tải tại các trạm biến áp 500kV và điều khiển đóng cắt máy cắt từ xa.
