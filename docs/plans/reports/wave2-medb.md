# Báo cáo Wave 2: Lô medb - Tiếp thị kỹ thuật số và Truyền thông (24 khái niệm)

Trạng thái: **Hoàn tất biên soạn và vượt qua toàn bộ cổng kiểm tra chất lượng** (2026-10-16). Toàn bộ 24 khái niệm được giữ nguyên ở trạng thái `status: draft`, `provenance.drafted_by: ai` theo đúng quy định phân quyền của OMNILEX.

## Danh sách khái niệm
| id | Nhóm | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|---|
| `seo` | seo | Search Engine Optimization (SEO) | Search Engine Optimization (SEO) | 1 | google-search-central (B) | từ mượn |
| `seo-keyword` | seo | Keyword (SEO) | Từ khóa (SEO) | 1 | google-search-central (B) | wikipedia-vi |
| `backlink` | seo | Backlink | Backlink | 2 | google-search-central (B) | từ mượn |
| `serp` | seo | Search Engine Results Page (SERP) | Search Engine Results Page (SERP) | 1 | google-search-central (B) | từ mượn |
| `organic-traffic` | seo | Organic traffic | Organic traffic | 2 | google-analytics-help (B) | từ mượn |
| `landing-page` | paid-ads | Landing page | Landing page | 1 | google-ads-help (B) | từ mượn |
| `ctr` | metrics-analytics | Click-through rate (CTR) | Click-through rate (CTR) | 2 | google-ads-help (B) | từ mượn |
| `cpc` | paid-ads | Cost per click (CPC) | Cost per click (CPC) | 2 | google-ads-help (B) | từ mượn |
| `cpm` | paid-ads | Cost per mille (CPM) | Cost per mille (CPM) | 2 | google-ads-help (B) | từ mượn |
| `ad-impression` | paid-ads | Impression (Ads) | Lượt hiển thị (Quảng cáo) | 1 | google-ads-help (B) | google-ads-help |
| `retargeting` | paid-ads | Retargeting | Retargeting | 2 | google-ads-help (B) | từ mượn |
| `audience-reach` | social-media | Reach (Marketing) | Reach (Marketing) | 1 | google-ads-help (B) | từ mượn |
| `engagement-rate` | social-media | Engagement rate | Engagement rate | 2 | google-analytics-help (B) | từ mượn |
| `hashtag` | social-media | Hashtag | Hashtag | 1 | youtube-help (B) | từ mượn |
| `influencer-marketing` | social-media | Influencer marketing | Influencer marketing | 2 | ftc-gov (B) | từ mượn |
| `conversion-rate` | metrics-analytics | Conversion rate | Conversion rate | 2 | google-ads-help (B) | từ mượn |
| `bounce-rate` | metrics-analytics | Bounce rate | Bounce rate | 2 | google-analytics-help (B) | từ mượn |
| `utm-parameters` | metrics-analytics | UTM parameters | UTM parameters | 2 | google-analytics-help (B) | từ mượn |
| `marketing-funnel` | metrics-analytics | Marketing funnel | Marketing funnel | 2 | google-analytics-help (B) | từ mượn |
| `call-to-action` | paid-ads | Call to action (CTA) | Call to action (CTA) | 1 | google-ads-help (B) | từ mượn |
| `sales-lead` | metrics-analytics | Lead (Marketing) | Lead (Marketing) | 1 | microsoft-learn (B) | từ mượn |
| `newsletter` | email | Newsletter | Newsletter | 1 | mailchimp-help (B) | từ mượn |
| `email-open-rate` | email | Open rate (Email) | Open rate (Email) | 2 | mailchimp-help (B) | từ mượn |
| `content-marketing` | social-media | Content marketing | Content marketing | 1 | google-search-central (B) | từ mượn |

Mọi khái niệm đều tuân thủ nghiêm ngặt:
- Trạng thái `status: draft`, `provenance.drafted_by: ai` (tuyệt đối không tự phong reviewed hay verified).
- Bản tiếng Anh `translation: native`; bản tiếng Việt dịch từ bản tiếng Anh (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: '2026-10-16'`).
- Mỗi ngôn ngữ đều có đúng 2 `plain_descriptions` độc lập, 1 câu `summary`, 4 đề mục chuẩn (`Easy explanation` / `Giải thích dễ hiểu`, `Details` / `Chi tiết`, `Technical definition` / `Định nghĩa chuyên ngành`, `Examples` / `Ví dụ`) và 1-2 câu hỏi tiếp nối `follow_up_questions`.
- Nội dung viết hoàn toàn bằng lời văn tự nhiên, phản ánh bối cảnh thực tiễn Việt Nam (VND, doanh nghiệp nội địa, thói quen thị trường) và không sao chép nguyên văn từ nguồn.
- Thiết lập quan hệ hai chiều chặt chẽ:
  - `ctr` ↔ `conversion-rate` (`confusable` hai chiều, có `confusable_notes` đầy đủ ở cả en và vi)
  - `cpc` ↔ `cpm` (`confusable` hai chiều, có `confusable_notes` đầy đủ ở cả en và vi)
  - `ad-impression` ↔ `audience-reach` (`confusable` hai chiều, có `confusable_notes` đầy đủ ở cả en và vi)
  - Đồ thị phụ thuộc `prerequisites` hoàn toàn phi chu trình (acyclic).
- Quyết định `autolink`:
  - Từ viết tắt: `SEO`, `SERP`, `CTR`, `CPC`, `CPM`, `CTA` thiết lập `autolink.aliases.<ACR>: always`.
  - Từ ngữ thông dụng / homonym: thiết lập `autolink: { label: never }` đối với `seo-keyword`, `ad-impression`, `audience-reach`, `sales-lead`.

## Các nguồn mới trong `config/sources.yaml`
Tất cả nguồn mới đều tuân thủ nguyên tắc `reuse: paraphrase-only` và được phân loại bậc chính xác:
| ref | Bậc | Loại | Nhà xuất bản | Ghi chú |
|---|---|---|---|---|
| `google-search-central` | B | docs | Google LLC | Tài liệu kỹ thuật chính thức Google Search Central |
| `google-ads-help` | B | docs | Google LLC | Trung tâm trợ giúp chính thức Google Ads (hỗ trợ en, vi) |
| `google-analytics-help` | B | docs | Google LLC | Trung tâm trợ giúp chính thức Google Analytics GA4 (hỗ trợ en, vi) |
| `youtube-help` | B | docs | Google LLC | Trung tâm trợ giúp chính thức YouTube |
| `ftc-gov` | B | docs | Federal Trade Commission | Hướng dẫn pháp lý và minh bạch thương mại từ cơ quan quản lý chính phủ Mỹ |
| `hubspot-knowledge-base` | C | glossary | HubSpot, Inc. | Bảng thuật ngữ tiếp thị (xếp bậc C theo quy tắc phân hạng nguồn) |
| `mailchimp-help` | B | docs | Intuit Inc. | Tài liệu sản phẩm chính thức Mailchimp Help Center |

*Ghi chú cập nhật nguồn sẵn có*: Nguồn bậc B `microsoft-learn` được bổ sung thêm miền `media/digital-marketing/metrics-analytics` để bảo chứng định nghĩa cho khái niệm `sales-lead`.

Mọi URL của các nguồn trên đều đã được kiểm tra trực tiếp qua request thực tế và trả về HTTP 200. Toàn bộ văn bản thuần (plain text) đã được lưu đầy đủ vào thư mục `candidates/.sources/` phục vụ công tác kiểm tra trùng lặp bản quyền.

## Kết quả kiểm tra các cổng chất lượng
| Cổng kiểm tra | Lệnh thực thi | Dòng kết quả cuối cùng |
|---|---|---|
| **Độ toàn vẹn & Schema** | `pnpm tb validate --strict` | `✔ Validation passed successfully!` (55 concepts loaded) |
| **Xây dựng chỉ mục & artifacts** | `pnpm tb build` | `✔ Successfully generated 22 index files and 327 dist artifacts:` |
| **Báo cáo xung đột từ đồng âm** | `pnpm tb report collisions` | `✔ mọi homonym đều có qualifier và confusable hai chiều` |
| **Kiểm tra trùng lặp (ngưỡng 8 từ)** | `pnpm tb check overlap` | `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words` |
| **Kiểm tra trùng lặp (ngưỡng 6 từ)** | `pnpm tb check overlap --size 6` | `✔ Không có đoạn trùng ≥ 6 từ / no copied runs of 6+ words` |

## Tình trạng hoàn thành
- Không có khái niệm nào bị bỏ dở hoặc thiếu sót.
- Toàn bộ 24/24 khái niệm thuộc lô `medb` đã được hoàn thiện đầy đủ mọi trường dữ liệu, cấu trúc thư mục, nguồn trích dẫn, văn bản ngữ cảnh và vượt qua tuyệt đối 100% các cổng kiểm thử tự động.
