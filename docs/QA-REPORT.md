# QA — Academy / Explorer sau nâng cấp

Ngày kiểm: **09/11/2026**. Kết quả mới sau tích hợp; lịch sử trước Academy ở [archive](qa/archive/QA-REPORT-pre-academy.md), baseline ở [BASELINE-UPGRADE.md](BASELINE-UPGRADE.md). Phạm vi personal-preview.

## Done

| Kiểm tra cuối | Kết quả |
| --- | --- |
| Frontend unit/asset/content | **23/23**, 5 file |
| Backend API/config/model | **9/9**, không dùng Atlas thật |
| Yarn build frontend/backend | Cả hai đạt; FE còn warning Viewer >500 kB |
| Playwright toàn bộ trên dev local | **29/29**, một worker, lượt cuối 2,1 phút |
| Production preview 5175 | Home/Academy/Explorer render; không pageerror; GLB sẵn sàng |
| Registry | 12 bài, 48 câu, 5 dạng câu, 16 nguồn, validator không lỗi |
| Responsive | Academy 1440×900,1024×768,390×844; Explorer 1440×900,768×1024,390×844; không tràn ngang trong các trạng thái kiểm |

Đã trực tiếp xem ảnh Home production desktop, catalog/lesson mobile, Challenges desktop, Dashboard/mô-men mobile và Explorer mobile. Ảnh từ app đã render, không phải mockup.

Luồng học được kiểm: home → khóa → C01 → lưu nháp/reload → nộp 3/4 → rationale → Practice → tiếp tục F01, raw key F01 không đổi. Tìm kiếm không dấu/back, focus heading sau đổi route, cả 12 bài có readings/questions/sources. Matching, numeric/unit, torque và projection có feedback/retry; hoạt động số đổi đề được. Mô-men kiểm góc 0°/90°, F=0/reset; unit tests kiểm ngoài phạm vi/nonfinite.

Progress kiểm draft/reload, submit/review/retry/revision archive, backup/import hợp lệ, từ chối import lỗi không mất dữ liệu, xuất file và storage denied giữ đáp án trong phiên. Explorer hồi quy mesh/tree/inspector/mapping, hide/isolate/explode/reset/pause, F01 persistence; bàn phím/range/tabs/dialog focus/reduced motion; GLB/chunk lỗi và retry/reload; thiếu WebGL vẫn làm F01 qua tree/2D; mobile qua nhiều panel. Giữ 8 occurrence.

## Lỗi tái hiện và sửa

- C03 chấp nhận 0,007 m cho đề 0,008 m: sửa tolerance theo đơn vị, regression RED → GREEN.
- Ba hình chiếu khác tỉ lệ: browser SVG getBBox tái hiện 105≠70, sửa chiều sâu hình cạnh về 70, ba chiều chung đạt.
- Practice mất câu sai khi bắt đầu retry: giữ lần nộp gần nhất trong nháp mới; test từ 0/4 thất bại → 4/4 còn qua reload.
- URL lesson mã hóa lỗi gây URIError: chuyển sang màn không tìm thấy. Đã kiểm client navigation; Vite có thể trả HTTP lỗi trước app cho URL malformed gõ trực tiếp, chưa xử lý ở server production.
- Chunk lesson lỗi có recovery/reload; link lý thuyết tại Challenges mở đúng bài.
- Một lượt hồi quy có test Explorer bị mojibake sau chỉnh route: UI đúng nhưng assertion sai. Phục hồi snapshot U0 bằng UTF-8, chỉ đổi route/dashboard phù hợp; toàn bộ 29 ca chạy lại đạt, không bỏ/skip.

Review độc lập nội dung/phép tính và progress/router không báo Critical. Các Important trên được xử lý bằng regression; không thay thế chuyên gia cơ khí.

## Hiệu năng

Đối chứng cùng mã app, chỉ đổi loader: Viewer **989.314→963.459 B** (−25.855 B, 2,61%); gzip **272.543→265.089 B**. Tổng generated JS giảm cùng lượng, không chuyển code để giấu warning. Bỏ decoder không dùng cho GLB không nén; giữ controls/mapping. [Audit](VIEWER-PERFORMANCE.md).

Production: context mới từng route, HTTP cache disabled, localhost, không throttling; transfer resource gồm overhead và không gồm navigation:

| Route | Request resource | JS decoded | Transfer resource | Viewer/GLB |
| --- | ---: | ---: | ---: | --- |
| / | 12 | 320.759 B | 310.086 B | Không tải |
| /academy | 10 | 319.925 B | 184.209 B | Không tải |
| /explorer | 14 | 1.240.328 B | 1.086.291 B | Có tải |

[network.json](qa/u5/network.json) là sau build cuối. Không so như cùng điều kiện với phép đo mạng U0 chưa có; baseline artifact giữ riêng. Không lấy thời gian test làm FPS/hiệu quả học.

**Còn thiếu:** Viewer vẫn 963 kB, warning 500 kB giữ nguyên; cải thiện một phần, chưa giải quyết hoàn toàn. Home/Academy đã tách khỏi tải 3D.

## Blocked

**U3 real-product 3D:** chưa có asset quạt bàn đủ quyền phân phối web/GLB và coverage đúng mẫu. Rowenta/Vornado thiếu CAD hợp lệ; CAD Noctua có giới hạn nội thất/quyền public và là quạt máy tính. [Dossier](FAN-DATA-DOSSIER.md). Ảnh Noctua có grant riêng chỉ là case study ngoại hình; EDU-FAN-01 vẫn sandbox giản lược.

## Chưa kiểm chứng / chưa triển khai

- Atlas live, tiến độ MongoDB/auth/XP server/AI; không đọc secrets hoặc dùng DB thật để test.
- Duyệt chuyên gia: 12 bài source-checked, expertReviewStatus none, personal-preview; chưa verified-published.
- Điện thoại vật lý/Safari/iOS/screen reader/mạng chậm/FPS/GPU mobile/context loss giữa phiên; không tuyên bố WCAG toàn bộ. Windows Chromium headless dùng SwiftShader.
- Có tăng đoạn đọc 16→32px và reduced motion; chưa kiểm zoom browser 200% đầy đủ mọi màn.
- Quiz retry cùng bộ câu theo revision, biến thể ở hoạt động số; chưa có biến thể riêng mọi câu sai. Activity riêng chưa lưu qua reload, quiz có lưu.
- Thiếu file ảnh tham chiếu gốc MORVA/STILLFORM/Montarville để so pixel; thiết kế dựa mô tả spec.
- CUA/Node REPL lỗi khởi tạo kernel; dùng Playwright cục bộ render/chụp thật, không coi headless mobile là điện thoại thật.

## Bằng chứng và cách chạy

Ảnh trước/sau: [U0](qa/u0/), [Home/catalog/lesson](qa/u1/), [các màn học](qa/u4/), [production/network](qa/u5/). Explorer/F01 mới ở docs/qa/*-390.png và các kích thước tương ứng.

Trong frontend: yarn test, yarn build, yarn test:e2e; backend: yarn test, yarn build. E2E đặt PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH cho Chromium đã cài. Giữ server người dùng 5173/3001; preview 5175 do QA tạo được dừng sau đo. Không deploy/push, đổi manager hoặc sửa .env.
