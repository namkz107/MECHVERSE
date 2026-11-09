# QA — Explorer 3D / F01 demo

Ngày kiểm: 09/11/2026. Phạm vi: bản demo giáo dục trong workspace; chưa phải phát hành nội dung đã kiểm chứng.

**Cấu trúc hiện tại:** frontend đã ở `frontend/`, backend ở `backend/`; hướng dẫn chạy mới trong README gốc và README từng ứng dụng. Các mục đầu dưới đây là lịch sử QA bản demo; cập nhật tách thư mục nằm ở cuối báo cáo.

## Kết quả cuối

| Kiểm tra | Kết quả |
| --- | --- |
| `npm.cmd test` | 9/9 đạt: 7 domain, 2 đọc/kiểm GLB và manifest thực |
| `npm.cmd run build` | TypeScript và Vite production build đạt |
| `npm.cmd run test:e2e` trên production preview | 12/12 đạt, 37.9 giây cho toàn bộ lượt cuối |
| Render và overflow | Đạt trong phạm vi các trạng thái kiểm ở 1440×900, 768×1024, 390×844 |
| Rà soát độc lập | 1 lượt read-only; 3 phát hiện đều được tái hiện bằng test trước sửa và kiểm lại đạt |

Không dùng thời gian chạy test làm chỉ số tốc độ tải, FPS hoặc hiệu quả học tập.

## Môi trường

- Windows, Node 22.21.0; Chromium 156.0.8078.4 cục bộ (revision 1248), Playwright headless, một worker, DPR mặc định 1.
- WebGL chạy qua SwiftShader; `--use-angle=swiftshader --enable-webgl --ignore-gpu-blocklist`.
- Production được build rồi phục vụ bằng Vite preview tại loopback, không throttling mạng. Lượt kiểm trước dùng Vite dev.
- Công cụ trình duyệt CUA lỗi khởi động; dùng Playwright cục bộ để thực sự render, thao tác và chụp ảnh. Các ảnh dưới đã được tạo từ app chạy thật. Đã trực tiếp xem Explorer desktop/mobile, Lesson tablet/mobile và Dashboard desktop/mobile.
- Chưa kiểm điện thoại vật lý, Safari/iOS, screen reader thực, GPU di động, mạng chậm hoặc WebGL context loss giữa phiên. Không tuyên bố đạt toàn bộ WCAG.

## Hành vi được kiểm

1. Click geometry thật cập nhật cây và inspector; chọn từ cây và isolate đồng bộ. GLB có 8 ID; cánh gồm nhiều mesh nhưng cùng một occurrence.
2. Tách cụm từ trạng thái lắp bất biến; reset, pause và tương tác explode/animation; range dùng phím mũi tên. Đặt lại viewer không xóa câu trả lời.
3. F01: quan sát → tìm bộ phận → phản hồi sai/đúng → phân loại → hoàn thành demo. Không vượt bước từ câu sai hoặc chỉ xem trang.
4. Radio đang chọn còn sau đổi chế độ và reload; release cũ/dữ liệu hỏng bị loại; không cấp XP.
5. Storage bị chặn: giữ bài làm trong phiên, hiện chưa lưu ở Lesson và Dashboard; retry sau phục hồi storage hoạt động.
6. GLB tải lỗi: có thông báo, sơ đồ 2D, cây và retry thực. JavaScript viewer tải lỗi: retry có xử lý rejection và đường tải lại ứng dụng; demo đã lưu còn sau reload.
7. WebGL bị vô hiệu hóa: vẫn hoàn thành được F01 qua cây/sơ đồ 2D.
8. Tab/Enter chọn chi tiết, phím mũi tên đổi panel/range; focus vào heading sau chuyển bước; native dialog mở, giữ focus, Escape đóng và trả về trigger.
9. Reduced motion: CSS bỏ transition/animation không cần thiết, camera không damping, không tự quay. Chuyển động minh họa chỉ chạy khi chủ động bật và có dừng.
10. Dashboard mới không có thành tích bịa và không tải GLB/viewer trước khi mở Explorer.
11. Tương phản được kiểm cho footer, nhãn định dạng 3D, trạng thái mô hình và revision: tối thiểu 4.5:1. Đây là kiểm có mục tiêu, không phải audit mọi tổ hợp màu.

## Lỗi quan sát và sửa

- Phần đã ẩn vẫn nhận raycast, làm chọn nhầm sau isolate: tắt hit testing của mesh bị ẩn; regression qua click canvas đạt.
- Câu trả lời đang dở bị mất khi đổi chế độ: lưu draft theo lesson release, restore và reload trên mobile đạt.
- Retry không phục hồi được `React.lazy` đã reject: tạo lazy wrapper mới khi import thành công, catch lỗi và có reload recovery khi import tiếp tục lỗi.
- Mất focus khi nút chuyển bước biến mất: focus heading của bước mới, không cưỡng bức cuộn.
- Dashboard không phản ánh lỗi lưu: nhận trạng thái thực và hiển thị cảnh báo/retry.
- Một số nhãn nhỏ thiếu tương phản: đổi sang text-muted; bốn cặp màu kiểm đạt.
- Ảnh full-page ban đầu có vị trí sticky bị lệch do trang đang cuộn: đưa về đầu trang trước chụp lại. Ảnh cuối không còn sai lệch này.
- Lượt dev mở rộng từng có 2 kỳ chờ khởi tạo viewer vượt 5 giây; cả hai đạt khi chạy lại. Dùng giới hạn chờ 15 giây cho renderer lazy, rồi kiểm lại cả bộ trên production: 12/12 đạt. Không dùng retry tự động để che test lỗi.
- Build đầu từng lỗi CSS import rỗng và type annotation trong test giả lập WebGL; đã sửa, build cuối đạt.

## Ảnh QA cuối

| Màn hình | Desktop | Tablet | Mobile |
| --- | --- | --- | --- |
| Explorer | [1440](qa/explorer-1440.png) | [768](qa/explorer-768.png) | [390](qa/explorer-390.png) |
| Inspector đã chọn cánh | [1440](qa/inspector-1440.png) | [768](qa/inspector-768.png) | [390](qa/inspector-390.png) |
| Lesson F01 | [1440](qa/lesson-1440.png) | [768](qa/lesson-768.png) | [390](qa/lesson-390.png) |
| Dashboard mới | [1440](qa/dashboard-1440.png) | [768](qa/dashboard-768.png) | [390](qa/dashboard-390.png) |

[Hoàn thành F01 trên mobile](qa/lesson-complete-390.png).

## Còn mở / chưa nghiệm thu production

- GLB tự dựng 648,824 byte; hình học giản lược, tỷ lệ và vật liệu kỹ thuật chưa xác minh. Nội dung chưa có người đủ chuyên môn duyệt, vì vậy T04 production chưa đạt dù luồng demo chạy được.
- Viewer được lazy-load; Vite vẫn cảnh báo chunk viewer khoảng 989.11 kB minified / 272.43 kB gzip. Chưa benchmark thiết bị thật hoặc đo ngân sách FPS. Không tắt cảnh báo bằng cách nâng threshold.
- Tiến độ chỉ trên trình duyệt, chưa auth/DB/server assessment; không có XP, AI live, đồng bộ hoặc bảo vệ dữ liệu đa tài khoản. Chưa triển khai T05–T09.
- Hai prompt mâu thuẫn PostgreSQL/Prisma và MongoDB/Mongoose. Chưa thêm DB để tránh tự chốt sai; cần quyết định trước T06. Chi phí quyết định sai là phải thay schema/API và migration.
- Font dùng fallback Segoe UI/system-ui vì chưa có file Be Vietnam Pro hợp lệ để self-host.

Không còn lỗi trọng yếu đã biết trong phạm vi demo sau lượt kiểm cuối. Các giới hạn trên vẫn là backlog thực, không được coi là đã đạt.

## Bổ sung lệnh chạy Yarn

- Thêm script `start` ở `package.json`, dùng cùng Vite frontend với script `dev`.
- Chạy thực tế `yarn start --port 5173 --strictPort` từ thư mục gốc bằng CMD, Yarn 1.22.22; Vite báo sẵn sàng tại `http://127.0.0.1:5173/`.
- PowerShell đang chặn script `.ps1`: dùng `yarn.cmd start`; không đổi execution policy.
- Không thêm backend, Atlas, Mongoose schema hoặc chuyển lockfile trong thay đổi này. README ghi rõ vị trí và trạng thái từng thành phần.
- Kiểm lại: `yarn test` đạt 9/9; frontend HTTP 200 và GLB HTTP 200. Không chạy lại E2E giao diện vì thay đổi chỉ là script khởi động và tài liệu.

## Tách frontend/backend — kiểm tra ngày 09/11/2026

### Cấu trúc và lệnh chạy

- Chuyển nguyên frontend đang có (source, asset, generator, tests, cấu hình và dependencies) sang `frontend/`; không chạy generator tạo app mới. Tài liệu/prompt gốc và ảnh QA ở `docs/`.
- Thêm `backend/` Express/TypeScript với Mongoose. Mỗi bên có `package.json`, `yarn.lock`, `node_modules` và `yarn start` riêng. npm lock ban đầu được bảo quản tại `docs/migrations/package-lock.frontend.before-yarn.json`.
- Khởi động thật bằng `yarn start` trong hai CMD process riêng, cwd lần lượt `frontend/` và `backend/`. Vite mở 5173, backend mở 3001.
- `.vscode/settings.json` chọn CMD làm terminal mặc định Windows cho workspace, tránh PowerShell chặn shim `.ps1`. Chưa tự thao tác menu chuột phải trong IDE; việc xác minh dựa trên cấu hình và lệnh CMD mới thực sự chạy được.
- Xác nhận CMD mới không chỉnh PATH: `where yarn` tìm thấy shim người dùng tại `C:\Users\LOQ\AppData\Roaming\npm`, `yarn --version` trả 1.22.22. Một số tool shell sandbox không đọc được thư mục công cụ người dùng nên không tìm Yarn; lệnh thực đã kiểm với quyền đọc công cụ tương ứng.

### Kết quả

| Kiểm tra | Kết quả |
| --- | --- |
| `frontend/yarn test` | 9/9 đạt |
| `frontend/yarn build` | Đạt; cảnh báo chunk viewer 989.11 kB vẫn còn |
| `backend/yarn test` | 9/9 đạt: health/readiness/CORS/404, config, model validation |
| `backend/yarn build` | TypeScript đạt, tạo `backend/dist/server.js` |
| `frontend/yarn test:e2e` | 12/12 đạt, 48.5 giây; ảnh tiếp tục ghi vào `docs/qa/` |
| Frontend `/` và GLB | HTTP 200, GLB 648,824 byte |
| Backend `/api/health` trực tiếp | HTTP 200, database `not_configured`, connected false |
| Frontend proxy `/api/health` | HTTP 200, cùng payload backend |
| Backend `/api/ready` chưa có URI | HTTP 503, ready false |
| Kết nối MongoDB cục bộ bị từ chối có chủ đích | Process kiểm riêng cổng 3002: health báo database error, readiness 503; log không chứa URI hoặc credentials |
| Review độc lập read-only | Không có Critical/Important; reviewer tự chạy backend 9/9 tests đạt |

Đã xem lại ảnh Explorer desktop và hoàn thành F01 mobile sau di chuyển; không thấy thay đổi bố cục hay mất asset. E2E cũng kiểm lại ba viewport như trước.

### Phạm vi backend và việc còn lại

- Có cấu hình `.env.example`, đọc `backend/.env`, MongoDB connect/disconnect và đóng kết nối khi dừng server. Không có URI thật nên **chưa kết nối hoặc ghi dữ liệu Atlas**.
- Có schema `ProductVariant`, `AssetRevision`, `LessonRevision` trong `backend/src/models/`; đây là cấu trúc nền, chưa phải đầy đủ mô hình dữ liệu blueprint. Tắt tự tạo collection/index lúc kết nối.
- Chưa có CRUD nghiệp vụ, auth/ownership, seed, lưu tiến độ server, đánh giá/XP hoặc AI. Tiến độ frontend vẫn localStorage; việc thêm server không tự biến nó thành dữ liệu Atlas.
- Hướng MongoDB/Mongoose được chọn theo yêu cầu Atlas tiếp theo của người dùng; không còn chờ quyết định PostgreSQL/MongoDB cho nền backend mới. Không có dữ liệu PostgreSQL cũ để migrate.
- Hai server thử được dừng sau QA, để người dùng mở terminal và start mà không trùng cổng.

## Môi trường runtime, mở trình duyệt và lịch sử terminal

- Đã tạo `backend/.env` thật từ mẫu khi file chưa tồn tại; không ghi đè file môi trường đã có. `MONGODB_URI` ban đầu để trống, không tự điền thông tin Atlas. `.env` nằm trong quy tắc ignore.
- `frontend/yarn start` thêm `--open`. Playwright dùng `BROWSER=none` trong server do test tự khởi động để không mở tab thừa khi chạy kiểm tra tự động.
- Sửa nguyên nhân mất lịch sử giữa terminal: CMD không giữ history giữa các phiên như PSReadLine. Workspace hiện dùng **MECHVERSE PowerShell**, history riêng `frontend.txt` / `backend.txt` tại `.cache/terminal-history/`, `SaveIncrementally`, binding ↑/↓. Thêm `yarn start` cuối history khi mở terminal để gọi ngay bằng ↑; giữ các dòng lịch sử đã có.
- Hàm `yarn` của profile chuyển tiếp sang `yarn.cmd`, không chỉnh execution policy toàn máy, không đổi profile PowerShell toàn tài khoản. Terminal cũ phải đóng và mở mới để nhận cấu hình.
- Đã kiểm bằng PowerShell tương tác/PTY thực dùng đúng startup arguments của profile (history QA tách riêng): mở terminal → gửi phím ↑ → hiện `yarn start`; Enter khởi động backend; frontend gọi cùng lệnh và thêm cổng phụ để tránh đụng server đang chạy. Đóng phiên và mở lại, ↑ vẫn gọi `yarn start`.
- PSReadLine 2.0.0 trên máy này từng lỗi khi gọi API `AddToHistory` trước lần nhập đầu tiên; đã thay bằng seed file history trước khi ReadLine khởi tạo và kiểm lại không còn lỗi startup.
- Cổng 3001/5173 đã có server từ trước lượt này, nên QA dùng 3002/5174. Cả hai HTTP 200. Frontend chạy Vite với `--open`; quan sát có cửa sổ Chrome tiêu đề MECHVERSE sau khởi động. Công cụ UI lỗi khởi tạo kernel nên chưa đọc/xác nhận address bar của tab tự mở; không chụp ảnh UI mới trong lượt này.
- `yarn test`: frontend 9/9, backend 9/9 đạt. Không chạy lại bộ E2E giao diện đầy đủ vì không sửa UI/lesson logic.
- Đã dừng các process QA phụ; giữ nguyên server đã có của người dùng. Khi server đang foreground, phím ↑ không phải thao tác gọi history của shell; cần `Ctrl+C` về dấu nhắc trước.
