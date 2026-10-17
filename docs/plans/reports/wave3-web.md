# Báo cáo Wave 3: Web (28 khái niệm)

Trạng thái: **hoàn thành bản thảo** (2026-10-17). Mọi khái niệm đều ở `status: draft`, `provenance.drafted_by: ai`.

## Danh sách
| id | Nhãn en | Nhãn vi | Level | Nguồn A/B (definition) | Bằng chứng nhãn vi |
|---|---|---|---|---|---|
| `dom` | Document Object Model (DOM) | DOM | 1 | w3c (A) | từ mượn |
| `html` | HyperText Markup Language (HTML) | HTML | 1 | w3c (A) | từ mượn |
| `css` | Cascading Style Sheets (CSS) | CSS | 1 | w3c (A) | từ mượn |
| `javascript` | JavaScript | JavaScript | 1 | ecmascript (A) | từ mượn |
| `typescript` | TypeScript | TypeScript | 2 | typescript-docs (B) | từ mượn |
| `nodejs` | Node.js | Node.js | 2 | nodejs-docs (B) | từ mượn |
| `react` | React | React | 2 | react-docs (B) | từ mượn |
| `bundler` | Bundler | Bundler | 2 | webpack-docs (B) | từ mượn |
| `tree-shaking` | Tree shaking | Tree shaking | 2 | webpack-docs (B) | từ mượn |
| `progressive-web-app` | Progressive Web App (PWA) | Progressive Web App (PWA) | 2 | google-web-dev (B) | từ mượn |
| `server-side-rendering` | Server-Side Rendering (SSR) | Server-Side Rendering (SSR) | 2 | vue-docs (B) | từ mượn |
| `single-page-application` | Single-Page Application (SPA) | Single-Page Application (SPA) | 2 | vue-docs (B) | từ mượn |
| `static-site-generation` | Static Site Generation (SSG) | Static Site Generation (SSG) | 2 | vue-docs (B) | từ mượn |
| `hydration` | Hydration | Hydration | 2 | vue-docs (B) | từ mượn |
| `local-storage` | localStorage | localStorage | 2 | w3c (A) | từ mượn |
| `browser-cache` | Browser cache | Bộ nhớ đệm trình duyệt | 2 | mdn (B) | viblo |
| `service-worker` | Service worker | Service worker | 2 | w3c (A) | từ mượn |
| `web-server` | Web server | Máy chủ web | 1 | mdn (B) | wikipedia-vi |
| `nginx` | NGINX | NGINX | 2 | nginx-docs (B) | từ mượn |
| `responsive-design` | Responsive Web Design (RWD) | Thiết kế web đáp ứng | 1 | w3c (A) | wikipedia-vi |
| `core-web-vitals` | Core Web Vitals | Core Web Vitals | 2 | google-web-dev (B) | từ mượn |
| `web-accessibility` | Web accessibility | Khả năng tiếp cận web | 1 | w3c (A) | w3c |
| `wcag` | Web Content Accessibility Guidelines (WCAG) | Web Content Accessibility Guidelines (WCAG) | 2 | w3c (A) | từ mượn |
| `http` | Hypertext Transfer Protocol (HTTP) | Hypertext Transfer Protocol (HTTP) | 1 | ietf (A) | từ mượn |
| `https` | Hypertext Transfer Protocol Secure (HTTPS) | Hypertext Transfer Protocol Secure (HTTPS) | 1 | ietf (A) | từ mượn |
| `url` | Uniform Resource Locator (URL) | Uniform Resource Locator (URL) | 1 | w3c (A) | từ mượn |
| `code-splitting` | Code splitting | Code splitting | 2 | webpack-docs (B) | từ mượn |
| `lazy-loading` | Lazy loading | Lazy loading | 2 | mdn (B) | từ mượn |

Mọi khái niệm:
- `status: draft`, `provenance.drafted_by: ai`.
- `en` viết từ nguồn (`translation: native`). `vi` dịch từ `en` (`translation: translated`, `translated_from: en`, `translated_by: ai`, `translated_at: 2026-10-17`).
- Mỗi locale có đúng 2 `plain_descriptions` và đủ 4 mục chuẩn (Easy explanation / Giải thích dễ hiểu, Details / Chi tiết, Technical definition / Định nghĩa chuyên ngành, Examples / Ví dụ).
- Quan hệ:
  - `browser-cache` ↔ `local-storage` là `confusable` hai chiều.
  - `http` ↔ `https` là `confusable` hai chiều.
  - `javascript` ↔ `typescript` là `confusable` hai chiều.
  - `server-side-rendering` ↔ `single-page-application` và `server-side-rendering` ↔ `static-site-generation` là `confusable` hai chiều.
  - `code-splitting` ↔ `lazy-loading` là `confusable` hai chiều.
  - `web-server` ↔ `nginx` là `confusable` hai chiều.
  - Đồ thị prerequisites không có chu trình.
- Quyết định `autolink`:
  - `React`: `autolink.label: never` (từ tiếng Anh thông dụng).
  - `Node`: `autolink.aliases.Node: never` (từ tiếng Anh thông dụng, tránh false-positive).
  - `RWD`, `NGINX`: `autolink.aliases: always`.

## Nguồn mới trong `config/sources.yaml`
Tất cả đều là `reuse: paraphrase-only`, verified_license_at: "2026-10-17":
| ref | Bậc | Giấy phép | Ghi chú |
|---|---|---|---|
| `vue-docs` | B | MIT | Tài liệu chính thức Vue.js (SSR, Hydration, SSG) |
| `react-docs` | B | CC BY 4.0 | Tài liệu chính thức React |
| `nodejs-docs` | B | MIT | Tài liệu chính thức Node.js |
| `webpack-docs` | B | CC BY 4.0 | Tài liệu chính thức Webpack (Bundler, Tree shaking, Code splitting) |
| `google-web-dev` | B | CC BY 4.0 | Tài liệu web.dev của Google (PWA, Core Web Vitals) |
| `nginx-docs` | B | 2-clause BSD-like | Tài liệu chính thức NGINX |

Mọi URL nguồn và bằng chứng đều đã kiểm tra bằng HTTP request thật (status code 200). Các trang bằng chứng nhãn tiếng Việt (`wikipedia-vi`, `viblo`, `w3c`) chứa đúng cụm từ nhãn.

## Kết quả kiểm tra cổng chất lượng (Gates)
| Kiểm tra | Lệnh | Kết quả đầu ra |
|---|---|---|
| **Cổng Build** | `pnpm tb build` | `✔ Successfully generated 22 index files and 1389 dist artifacts` |
| **Cổng Validate** | `pnpm tb validate --strict` | `✔ Validation passed successfully!` (353 concepts loaded, 0 errors, 0 warnings) |
| **Cổng Collisions** | `pnpm tb report collisions` | `✔ mọi homonym đều có qualifier và confusable hai chiều` |
| **Cổng Overlap (ngưỡng 8)** | `pnpm tb check overlap` | `✔ Không có đoạn trùng ≥ 8 từ / no copied runs of 8+ words` |
| **Cổng Overlap (ngưỡng 6)** | `pnpm tb check overlap --size 6` | 0 đoạn trùng trong lô web (1 đoạn trùng duy nhất nằm ở khái niệm cũ ngoài lô: `moscow-method`) |

## Khái niệm chưa hoàn thành
Không có. Tất cả 28/28 khái niệm đều hoàn thành đầy đủ, vượt qua mọi cổng kiểm tra chất lượng.
