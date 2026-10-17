---
label: "Trình thông dịch"
qualifier: "(Lập trình)"
aliases: []
loanwords:
  - "interpreter"
plain_descriptions:
  - "chương trình đọc, dịch và thực thi trực tiếp từng câu lệnh mã nguồn mà không cần tạo ra tệp nhị phân"
  - "bộ máy thực thi xử lý mã nguồn từng dòng một trực tiếp trong thời gian chạy"
summary: "Chương trình máy tính trực tiếp thực thi các câu lệnh được viết bằng ngôn ngữ lập trình hoặc kịch bản mà không cần biên dịch trước thành mã máy."
confusable_notes:
  compiler: "Trình thông dịch đọc và chạy từng câu lệnh mã nguồn trực tiếp trong lúc chạy, trong khi trình biên dịch dịch toàn bộ chương trình thành tệp mã máy trước khi chạy."
follow_up_questions:
  - "Trình biên dịch Just-In-Time (JIT) kết hợp giữa thông dịch và sinh mã máy động cho các đoạn mã chạy nhiều lần ra sao?"
  - "Vì sao các ngôn ngữ thông dịch giúp thử nghiệm mã rất nhanh dù tốc độ thực thi thuần túy chậm hơn ngôn ngữ biên dịch?"
translation: translated
translated_from: en
translated_by: ai
translated_at: '2026-10-17'
label_evidence:
  - ref: wikipedia-vi
    locator: https://vi.wikipedia.org/wiki/Tr%C3%ACnh_th%C3%B4ng_d%E1%BB%8Bch
    accessed: '2026-10-17'
    note: "Wikipedia tiếng Việt ghi nhận thuật ngữ Trình thông dịch tương đương interpreter"
---

## Giải thích dễ hiểu
Hãy tưởng tượng một thông dịch viên dịch cabin trực tiếp tại hội nghị thượng đỉnh Liên Hợp Quốc. Khi một đại biểu nói một câu tiếng Tây Ban Nha, thông dịch viên nghe và dịch ngay câu đó sang tiếng Việt qua tai nghe theo thời gian thực mà không cần đợi đại biểu phát biểu xong bài diễn văn kéo dài một tiếng.

## Chi tiết
Trình thông dịch phân tích cú pháp câu lệnh mã nguồn và ước lượng giá trị trực tiếp trong môi trường của nó. Do không cần giai đoạn biên dịch trước kéo dài, lập trình viên có thể sửa mã và chạy thử nghiệm ngay lập tức qua các cửa sổ dòng lệnh tương tác (REPL). Tuy nhiên, việc phải dịch từng câu lệnh trong lúc chạy làm phát sinh chi phí dịch thuật, khiến chương trình chạy chậm hơn so với mã máy thuần túy. Các bộ máy hiện đại khắc phục điểm yếu này bằng cơ chế biên dịch Just-In-Time (JIT), tự động dịch các đoạn mã chạy thường xuyên thành chỉ lệnh máy tối ưu.

## Định nghĩa chuyên ngành
Chương trình máy tính phân tích và thực thi trực tiếp mã nguồn hoặc mã bytecode trung gian tại thời điểm chạy, điều phối các chỉ lệnh mà không sinh ra tệp nhị phân máy độc lập.

## Ví dụ
Bộ máy Python thực thi một tệp kịch bản: nó đọc dòng lệnh `print("hello")`, phân tích cú pháp và lập tức lệnh cho hệ điều hành in chuỗi ký tự ra màn hình mà không cần tạo tệp biên dịch trước.
