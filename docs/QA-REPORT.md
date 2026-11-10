# QA — Academy / Explorer sau nâng cấp

## Industrial Studio / nhiều sản phẩm — 10/11/2026

Kiểm mới trên code hiện tại, tách khỏi các snapshot bên dưới. V0 khảo sát xong; V1 locker, V2 thêm workbench, V3 catalog/workspace và V4 regression/đo production đã triển khai trong phạm vi ghi dưới đây. Không thêm dependencies, sửa secrets, chạy Atlas, push hoặc deploy. M03/auth/server progress/AI Tutor/giấy hoàn thành/Knowns tạm hoãn.

| Kiểm tra mới | Kết quả |
| --- | --- |
| Baseline trước sửa | Frontend 32/32; browser 38/38, chạy lại trong lượt Industrial |
| Frontend unit/asset/content | **38/38**, 8 file |
| Backend test/build | **9/9** và build đạt, không dùng Atlas thật |
| Frontend build | Đạt; Viewer **976.975 B**, gzip **270.060 B**; warning 500 kB giữ nguyên |
| Browser sau review | **53/53**, một worker, lượt toàn bộ cuối 6,3 phút; gồm cả hai regression review |
| Production preview 5175 | Catalog + ba mẫu render, **0 pageerror** trong các context đo |
| Format / diff | Prettier các file Industrial đạt, git diff --check không lỗi whitespace |
| Dữ liệu/asset | Hai GLB mới, manifest, builder và spec có sẵn; file/key/release F01 giữ nguyên |

Đã xem render thực ở desktop/mobile, gồm Studio, cửa mở, CAD, close-up và exploded. Ảnh tại [industrial](qa/industrial/): [catalog desktop](qa/industrial/catalog-1440.png), [catalog mobile](qa/industrial/catalog-390.png), [locker](qa/industrial/locker-studio-1440.png), [cửa mở](qa/industrial/locker-open-1440.png), [locker CAD exploded](qa/industrial/locker-exploded-1440.png), [bàn mobile](qa/industrial/workbench-studio-390.png), [liên kết bàn close-up](qa/industrial/workbench-closeup-1440.png), [bàn exploded](qa/industrial/workbench-exploded-1440.png). Ảnh vòng đầu giữ trong `before/`; đây là so sánh vòng chỉnh thiết kế, không phải phép đo pixel/realism sản phẩm hãng. Thumbnail là render asset có sẵn, loại bỏ overlay UI, không phải ảnh hãng.

### Chất lượng hình học và tính trung thực

| Tiêu chí | MV-LK02 locker | MV-WB01 workbench |
| --- | --- | --- |
| Tỷ lệ / spec | Vỏ danh nghĩa 500×450×1800 mm, không tính phần nhô; giả định công khai | 1500×700×900 mm, mặt dày 40 mm; giả định công khai |
| Chiều dày / cạnh | Tấm 1,5 mm, mép hồi, khe cửa và khe thoáng xuyên; ray test qua khe không trúng tấm | Ống rỗng 40×40×2 mm, mép bo, khay gấp, mặt có lỗ xuyên và hốc đầu |
| Liên kết | Hai bản lề/door, chốt, tay nắm/vít và cam đã nhả; tay nắm theo đúng pivot khi mở | Tai đỡ có lỗ, tám cụm fastener ID riêng, chân/đệm; khung hàn là cụm cố định |
| Chuyển động | Mỗi cửa 0–105° quanh trục đứng bên trái; mở/explode loại trừ | Không gắn động cơ; under-view, focus/isolate liên kết và tách mặt/khay |
| Explode | Vỏ cố định, cửa đi cùng phụ kiện, khay/nắp/chốt có offset | Khung hàn giữ nguyên, mặt/khay/fastener/feet có offset |
| Studio / CAD | Material nguyên bản giữ được nhận diện; xám/feature edges không bật wireframe tam giác | Phân biệt gỗ/sơn/kim loại, grain có hướng; CAD đọc lỗ và liên kết |
| Giới hạn | Thiết kế minh họa, chưa chế tạo/duyệt kỹ thuật; không mô phỏng thao tác chìa/khóa | Thiết kế minh họa, chưa tính tải hoặc xác minh độ bền/mối hàn |

Hai mẫu mới **không phải sản phẩm hãng**; EDU-FAN-01 vẫn là demo giản lược. Catalog có ba nhóm mở được (locker/workbench/quạt) và hai nhóm research (vỏ tủ/bồn rửa), không có nút 3D chết. Các nguồn hãng và quyền chưa đủ được ghi riêng tại [ASSET-SOURCING](ASSET-SOURCING.md); không báo mẫu tự thiết kế là đã vượt cổng tích hợp sản phẩm thật.

### Hồi quy và lỗi đã sửa

- Registry và GLB có ID/parent/revision ổn định; test thiếu parent, trùng ID, joint invalid và reset/switch không giữ selection sai asset. Raycast thật chọn mặt bàn ở Top view; các fastener lặp vẫn có node/ID riêng, không dùng instancing.
- Input/camera/Studio–CAD/explode/isolate/reset, từng cửa, panel mobile và phím tắt được kiểm. Tab mobile hỗ trợ Arrow/Home/End, phím tắt không chạy khi đang nhập search, reduced-motion không tự bật quay. Có nhánh fallback/đọc cây khi WebGL lỗi và retry tải asset.
- Request locker bị giữ rồi chuyển bàn: asset cũ không thay scene mới; Canvas được giữ. Chuyển mẫu lặp không thay raw Academy/F01; quay lại lesson còn đáp án. Bộ cũ tiếp tục kiểm F01, mất storage, lỗi chunk, matching/quiz/rationale và reload.
- Review độc lập không tìm Critical, tìm hai Important: paused rotor bị reset khi đổi selection/shading/camera và nhãn đứng ở transform cũ. Đã tái hiện RED (góc 0,895→0, nhãn delta 0), sửa và chạy GREEN cả hai regression. Reset pose có version riêng; callout cập nhật theo occurrence trước bước projection của Html.
- Quan sát render phát hiện close-up tay nắm nhìn sai phía khi cửa mở, góc bu lông bị mặt bàn che và framing mobile cắt mép bàn: đã chỉnh hướng focus và fit theo bán kính mẫu/aspect. Cam locker đặt tư thế đã nhả để chuyển động mở cửa không minh họa khóa còn chặn jamb; unit test xác nhận phần nhô đã được thu vào.
- Một lượt test chuyển mẫu lặp vượt 60 giây khi chạy song song build và software rendering; tách môi trường PMREM dùng chung Canvas, giữ timeout 120 giây riêng cho ca sáu lần tải. Không bỏ assertion hoặc đổi warning limit. Script đo cũng chờ đúng asset mới trước khi đọc counter, tránh ghi trạng thái cũ.

### Đo production và giới hạn hiệu năng

Nguồn: [performance.json](qa/industrial/performance.json), Chrome headless/Windows/SwiftShader, 1440×900, DPR 1, cache HTTP disabled, không throttling, context mới mỗi route. Tổng transfer là Resource Timing resource (có overhead, không gồm navigation). Đo một viewport hiện tại, không xem như toàn bộ asset thư viện hoặc GPU điện thoại thật.

| Route / asset | Transfer resource | Draw calls Studio / CAD | Geometry resident Studio / CAD |
| --- | ---: | ---: | ---: |
| `/products` | 414.229 B | Không Canvas/GLB | — |
| Locker | 1.463.991 B | 46 / 91 | 59 / 104 |
| Workbench | 1.175.371 B | 30 / 59 | 43 / 72 |
| Fan | 1.128.443 B | 115 / 229 | 126 / 240 |

Qua tám lần đổi locker/bàn trong CAD, số geometry lần lượt trở về **104/72**, texture **4**, không tăng dần trong phép đo này. Đây là counter renderer, chưa chứng minh toàn bộ CPU heap hoặc driver không leak. Triangle render gồm ground plane: locker 26.130, bàn 15.142; model lần lượt 26.128/15.140. Chưa có số FPS/GPU vật lý để tuyên bố tốc độ mobile.

Index lại vertex trong chính occurrence giảm locker **2.544.688→984.372 B**, bàn **1.479.480→695.752 B**; giữ nguyên số triangle, ID và binding. Bản trước tối ưu ở [originals](qa/industrial/originals/), không đưa backup vào public. Viewer tăng từ snapshot trước 963.459 lên 976.975 B vì tính năng mới; warning >500 kB còn thật, chưa giải quyết xong. Không thêm decoder/compression/BVH/postprocessing. Instancing/LOD chi tiết chưa cần trong các mẫu nhỏ đã đo, chưa tuyên bố tối ưu cho catalog lớn.

**Chưa kiểm:** điện thoại vật lý/Safari/screen reader/hiệu quả học, thiết kế chịu tải, dung sai, độ bền mối hàn, quá trình chế tạo và xác nhận an toàn/chứng nhận. Không có asset hãng đạt quyền/coverage để tích hợp public. Model/UI sample không thay bản vẽ hoặc review kỹ thuật.

Chạy lại: frontend `yarn test`, `yarn build`, `yarn tsx scripts/build-industrial.ts`, `yarn test:e2e` (đặt đường Chrome qua `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`). Đo production: chạy `yarn preview --port 5175 --strictPort`, rồi `yarn node scripts/qa-industrial.mjs`. Dừng server do QA tạo sau khi xong; giữ `yarn start`/cổng 5173 để người dùng tự chạy. [Pipeline](3D-PIPELINE.md), [design system](DESIGN-SYSTEM.md), [trạng thái](IMPLEMENTATION-STATE.md).

## Lộ trình và learning modes — 09/11/2026

Kết quả cho phần lộ trình mới, sau khi sửa code và chạy ứng dụng bằng `yarn start`. Kiểm bằng Chrome headless trên Windows, một Playwright worker; 3D dùng SwiftShader. Không cần Atlas hoặc AI Tutor.

| Kiểm tra | Kết quả thực tế |
| --- | --- |
| Frontend `yarn test` | **32/32**, 6 file; gồm 9 ca curriculum/progress mới |
| Backend `yarn test` | **9/9**, không dùng Atlas thật |
| `yarn build` frontend/backend | Cả hai đạt; Viewer vẫn có warning >500 kB (963,46 kB minified) |
| Playwright `yarn test:e2e` | **38 ca đã đạt**: lượt toàn bộ 37 đạt, 1 dừng vì lỗi hệ thống khi ghi `practice-1024.png`; `--last-failed` chạy lại ca đó đạt 1/1, không đổi code hoặc bỏ assertion |
| Audit curriculum | **0 lỗi**; 16 module/96 phạm vi core, 5 nhánh; 12 phạm vi nhập môn M01/M02 có bài, 7 bài kế thừa một phần, 77 chưa mở |
| Registry | **19 bài, 64 câu hỏi, 20 nguồn**; bài source-checked/personal-preview, chưa duyệt chuyên môn |
| Bảo toàn yêu cầu | SHA-256 của tệp yêu cầu gốc và `CURRICULUM-LEARNING-MODES.md` giống nhau; giữ nguyên tệp gốc |
| Responsive mới | Roadmap, bài đo và flashcards ở 1440/1024/390 px không tràn ngang trong trạng thái kiểm; có ảnh render thực |

Luồng mới đã kiểm: mở lộ trình → bắt đầu M01-L01 → đọc → làm ba câu và bài viết theo rubric → chuyển thẻ/lật/tự đánh giá → chuyển quiz → reload giữ đáp án → nộp, nhận 3/3 và phản hồi từng câu → reload vẫn còn lần nộp/bài viết → sang M01-L02. Chỉ có một attempt và một review event cho những thao tác tương ứng; thẻ không tạo điểm hoặc hoàn thành thực hành.

Hồi quy dữ liệu: alias M dùng session C cũ; C01/C02 → F01 → quay lại giữ nháp và raw key F01; mini lab lưu input/đơn vị/phản hồi, đổi mode và reload không mất bài; dashboard tiếp tục bài mở gần nhất. Tệp nhập có `C02.answer = null` bị từ chối và dữ liệu hiện tại giữ nguyên; quay lại/reload bài ghép cặp vẫn hoạt động. Old Academy v1 không có `learning` vẫn đọc được. Unit tests kiểm archive/revision, UTC qua ranh giới ngày, lịch ôn/hạn mức lịch sử, nhập sai cấu trúc, nộp lặp và thực hành luôn unreviewed.

Các lỗi đã tái hiện và sửa bằng regression: link lý thuyết trong mini lab mở phần đang ẩn; link ôn quiz khi đang ở flashcards; hash quiz cũ ghi đè mode vừa chọn sau reload; mất vị trí phần học có hướng dẫn khi đổi mode; đáp án ghép cặp nhập sai kiểu gây lỗi render. Review code độc lập phát hiện hai lỗi sau cùng liên quan hash/kiểu dữ liệu; đã bổ sung kiểm tra trước và sau sửa.

Ảnh mới: [roadmap mobile](qa/curriculum/roadmap-390.png), [flashcards desktop](qa/curriculum/cards-1440.png), [bài đo mobile](qa/curriculum/measurement-390.png), [toàn bộ ảnh curriculum](qa/curriculum/). Đã trực tiếp xem ba ảnh trên. Các ảnh Academy/study cũ cũng được làm mới khi chạy hồi quy.

Giới hạn: M03–M16 và K01–K05 chưa hoàn thiện chương trình; mục tiêu hiện gộp theo phạm vi bài, chưa đánh giá độc lập mọi kỹ năng nhỏ. Quiz của bài dùng cùng ngân hàng câu theo revision, biến thể hiện có chủ yếu trong mini lab. Lịch thẻ 1/3/7 ngày là thử nghiệm, không phải FSRS. Chưa có review chuyên gia, server progress/auth/sync, AI Tutor, giấy hoàn thành hoặc xác minh chứng nhận. Chưa kiểm điện thoại vật lý/Safari/screen reader/hiệu quả học thực tế. Chưa đo lại network production trong lượt curriculum; số đo production dưới đây là snapshot trước đó. Không cài Knowns, đổi Yarn hoặc sửa `.env`.

Chạy lại trong `frontend/`: `yarn test`, `yarn build`, `yarn tsx scripts/audit-curriculum.ts`; đặt `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` trỏ Chrome/Chromium đã cài rồi chạy `yarn test:e2e`. Trong `backend/`: `yarn test`, `yarn build`. [Ma trận](CURRICULUM-COVERAGE.md), [trạng thái triển khai](IMPLEMENTATION-STATE.md).

## Snapshot trước lộ trình M — giữ lịch sử QA

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
