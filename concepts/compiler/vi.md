---
label: "Trình biên dịch"
aliases: []
loanwords:
  - "compiler"
plain_descriptions:
  - "công cụ dịch toàn bộ tệp mã nguồn sang mã máy hoặc mã byte trước khi chương trình được chạy"
  - "chương trình phân tích mã nguồn và chuyển đổi nó thành tệp thực thi độc lập"
summary: "Chương trình máy tính chuyển đổi toàn bộ mã nguồn viết bằng ngôn ngữ bậc cao sang mã máy hoặc dạng trung gian trước khi thực thi."
confusable_notes:
  interpreter: "Trình biên dịch dịch toàn bộ mã nguồn trước khi chạy thành tệp mã máy hoặc bytecode, trong khi trình thông dịch đọc và chạy từng câu lệnh trực tiếp trong lúc chương trình đang vận hành."
follow_up_questions:
  - "Những giai đoạn xử lý cụ thể nào diễn ra từ lúc tách từ vựng (lexing) đến lúc sinh mã trung gian trong trình biên dịch?"
  - "Trình biên dịch tối ưu hóa thực hiện việc loại bỏ mã chết (dead-code elimination) và trải vòng lặp ra sao?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Tr%C3%ACnh_bi%C3%AAn_d%E1%BB%8Bch
    accessed: '2026-10-17'
    note: "Wikipedia tiếng Việt ghi nhận thuật ngữ Trình biên dịch tương đương compiler"
---

## Giải thích dễ hiểu
Hãy tưởng tượng một dịch giả được giao nhiệm vụ dịch toàn bộ một cuốn tiểu thuyết tiếng Anh sang tiếng Việt. Dịch giả làm việc nhiều tháng để in ra một cuốn sách tiếng Việt hoàn chỉnh; độc giả sau đó mua sách về đọc trôi chảy từ đầu đến cuối mà không cần cuốn sách tiếng Anh gốc ở bên cạnh.

## Chi tiết
Trình biên dịch xử lý toàn bộ mã nguồn trước khi chạy qua các giai đoạn bài bản: phân tích từ vựng biến mã thành các token, phân tích cú pháp dựng cây cú pháp trừu tượng (AST), phân tích ngữ nghĩa kiểm tra kiểu dữ liệu, và tối ưu hóa mã trung gian (IR). Cuối cùng, bộ sinh mã tạo ra các chỉ lệnh mã máy phù hợp với kiến trúc vi xử lý đích hoặc dạng bytecode cho máy ảo (như Java bytecode hay .NET CIL). Nhờ được dịch sẵn, tệp chương trình chạy trực tiếp trên phần cứng với tốc độ tối đa mà không tốn công dịch lại từng dòng.

## Định nghĩa chuyên ngành
Hệ thống dịch thuật xử lý toàn diện mã nguồn ngôn ngữ lập trình bậc cao, chuyển đổi cấu trúc cú pháp thông qua phân tích ngữ nghĩa và tối ưu hóa thành mã máy đích hoặc bytecode trung gian.

## Ví dụ
Chạy lệnh `gcc main.c -o app` biên dịch 400 dòng mã C thành một tệp nhị phân thực thi độc lập, sẵn sàng chạy ngay trên hệ điều hành Linux.
