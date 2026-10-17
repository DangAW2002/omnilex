---
label: Consistent hashing
aliases:
  - Băm nhất quán
  - Vòng băm
loanwords:
  - consistent hashing
plain_descriptions:
  - kỹ thuật phân bổ dữ liệu giúp hạn chế tối đa việc xáo trộn vị trí khi thêm bớt máy chủ
  - thuật toán băm xếp máy chủ và dữ liệu lên một vòng tròn để tránh xáo trộn bộ nhớ đệm
summary: Thuật toán băm phân tán trong đó việc tăng giảm số lượng nút lưu trữ chỉ làm chuyển dịch trung bình K/N khóa, bằng cách ánh xạ cả máy chủ và dữ liệu lên một không gian vòng tròn định danh.
confusable_notes: {}
follow_up_questions:
  - Các nút ảo (vnodes) giải quyết vấn đề điểm nóng và sự phân bổ không đều trên vòng băm vật lý như thế nào?
  - Thuật toán băm nhất quán giới hạn tải (bounded-load) ngăn chặn hiệu ứng sụp đổ dây chuyền sang nút lân cận ra sao?
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
---

## Giải thích dễ hiểu
Giống như đặt các hòm thư đánh số xung quanh một đường chạy tròn: khi có lá thư mang số đến, bạn đi xuôi theo chiều kim đồng hồ tới hòm thư gần nhất để thả vào; nếu đặt thêm một hòm thư mới, chỉ những lá thư ở khúc lân cận mới bị chuyển chỗ.

## Chi tiết
Thuật toán băm truyền thống chia lấy dư theo số lượng máy chủ (hash(key) % N). Khi số máy N thay đổi, gần như toàn bộ dữ liệu bị đổi máy chủ quản lý, phá hủy bộ nhớ đệm và làm sập cơ sở dữ liệu. Thuật toán băm nhất quán giải quyết triệt để vấn đề này bằng cách đưa cả máy chủ lẫn khóa dữ liệu lên một vòng tròn định danh (thường từ 0 đến 2^32-1). Khóa sẽ thuộc về máy chủ đầu tiên gặp phải theo chiều kim đồng hồ. Khi một máy thêm hoặc bớt, trung bình chỉ có K/N khóa bị dịch chuyển. Các nút ảo (vnodes) được gán rải rác để phân bổ tải đều.

## Định nghĩa chuyên ngành
Cơ chế phân vùng phân tán ánh xạ dữ liệu và nút phục vụ lên không gian định danh hình khuyên đồng nhất, giới hạn khối lượng chuyển đổi dữ liệu ở mức tối thiểu khi cấu trúc cụm thay đổi.

## Ví dụ
Một cụm 8 máy chủ Memcached dùng thuật toán băm nhất quán, khi lắp thêm máy chủ thứ 9 thì chỉ có khoảng 11% số khóa bộ nhớ đệm bị phân phối lại, bảo toàn nguyên vẹn 89% dữ liệu đang có.
