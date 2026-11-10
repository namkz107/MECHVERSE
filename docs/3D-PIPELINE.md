# Current product-study update

`MV-FN02/r2` now uses `fan-study-r2.glb` (19 occurrences; illustrative units, not validated metres). F01 uses the independent legacy EDU asset. `yarn asset:industrial` regenerates all study assemblies. [Visual correction and limits](REALISM-REVIEW.md). The baseline tables below describe the previous Industrial snapshot.

# Pipeline 3D hiện tại

## Industrial multi-asset — 10/11/2026

Viewer dùng chung cho quạt cũ và workspace mới. `assetTypes.ts`, `assets.ts`, `workbench.ts` định nghĩa manifest/revision, part definition, occurrence/parent, rest position, offset local, joint axis/limits, camera và capabilities. `fanParts.ts` giữ nguyên tám ID/transform F01; `state.ts` là entry tương thích của `sceneState.ts`. Không đổi key/release hay migrate bài học sang asset mới.

Trong `frontend/`, chạy `yarn tsx scripts/build-industrial.ts` để tái tạo hai GLB và manifest JSON. `industrial-geometry.ts` tạo tấm có độ dày/lỗ xuyên, hộp bo, ống rỗng và phần cứng; `workbench-geometry.ts` dựng bàn. Spec trước khi dựng ở [INDUSTRIAL-ASSEMBLIES](INDUSTRIAL-ASSEMBLIES.md). Mỗi occurrence tương ứng một node GLB; nhiều mesh/material được phép. Chỉ merge theo material trong chính occurrence rồi index lại vertex (tolerance 1e-6 m); không flatten cây hoặc gộp ốc khác ID.

| Asset | Xuất xứ | Occurrence / mesh / triangle | GLB sau index |
| --- | --- | --- | ---: |
| MV-LK02/r1 | Thiết kế minh họa MECHVERSE, locker hai ngăn | 30 / 45 / 26.128 | 984.372 B |
| MV-WB01/r1 | Thiết kế minh họa MECHVERSE, workbench | 16 / 29 / 15.140 | 695.752 B |
| EDU-FAN-01/r1 | Demo giáo dục, giữ file cũ | 8 occurrence; geometry cũ giữ nguyên | 648.824 B |

Bản V1 trước index được giữ ở `docs/qa/industrial/originals/`: locker 2.544.688 B, bàn 1.479.480 B. Số triangle và semantic binding không thay đổi; sau đó cam locker được chỉnh riêng sang tư thế đã nhả để phù hợp thao tác mở cửa. Vì vậy backup là lịch sử biên soạn, không phải đối chiếu pixel tuyệt đối với bản cuối. Unit test kiểm occurrence/envelope, ray qua khe thoáng thật và vị trí tay nắm sau quay cửa. Không dùng compression/decoder/BVH mới hoặc thay warning limit. Các kích thước là giả định của thiết kế, không phải đo trên sản phẩm thương mại.

`modelLoader.ts` fetch một URL được whitelist trong manifest, dùng AbortController, parse GLB rồi giải phóng geometry/material/texture khi scene bị thay hoặc request đã lỗi thời. Không có cache GLB toàn thư viện. Persistent Canvas giữ camera/light/PMREM studio environment khi đổi sản phẩm; chỉ scene của asset đang chọn được thay. Reset xử lý state quan sát, không sở hữu localStorage. Retry lỗi vẫn có boundary và đường đọc 2D/cây.

Transform theo thứ tự: rest translation + explode offset local → joint rotation quanh origin đã đặt tại trục bản lề → child rest transform. Cửa có trục Y âm, giới hạn 0–105°; explode đóng cửa, mở cửa đưa explode về 0. Khung hàn bàn và vỏ cố định không bị tách thành các thanh. Rest geometry không bị sửa tích lũy. Shader Studio và CAD, visibility/selection, assembly/joint và rotation time là các phần state riêng.

Scene tạo material riêng theo mesh cho highlight cục bộ; CAD dùng EdgesGeometry threshold 30°, loại đường đồng phẳng/tam giác. Môi trường RoomEnvironment/PMREM tạo local, không tải HDRI ngoài. ACESFilmic, exposure 0,9; shadow map 1024, DPR giới hạn 1–1,5, frameloop demand. Vân gỗ CanvasTexture gốc có hướng/scale; không tương ứng cấp vật liệu. Animation dừng khi ngoài màn hình/tab ẩn; model tĩnh không yêu cầu render liên tục. Không tạo vi ren/LOD/BVH khi chưa có đo đạc chứng minh cần.

Hiệu năng đo có điều kiện trong `docs/qa/industrial/performance.json`; chạy production preview rồi `yarn node scripts/qa-industrial.mjs` với `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH`. Script không sở hữu hoặc dừng server; ảnh preview xuất vào thư mục QA, chỉ copy vào public sau khi kiểm. Không lấy SwiftShader làm số đo GPU điện thoại hoặc thời gian test làm FPS.

## Snapshot pipeline quạt trước nâng cấp

Ngày đối chiếu mã nguồn: 09/11/2026. Asset đang chạy là **EDU-FAN-01 / revision 1**, mô hình giáo dục tự dựng bằng `frontend/scripts/build-fan.ts`. Đây không phải CAD của quạt hãng và không có nội thất đã kiểm chứng.

## Tạo và nạp asset

Trong `frontend/`, `yarn asset:build` tạo `public/models/fan-edu-v1.glb` và `fan-edu-v1.manifest.json`. GLB hiện có 648.824 byte, 112 mesh/122 node; `extensionsUsed` và `extensionsRequired` đều rỗng. Scene Y-up, mặt trước +Z; đơn vị minh họa chưa đối chiếu kích thước thực.

Viewer được lazy-load khi vào Explorer. React Three Fiber dùng `useLoader(GLTFLoader, ASSET_URL)` với loader Three-stdlib đã có trong dependency graph; `clearModel()` xóa cache bằng đúng loader/URL khi retry. GLB hiện không dùng Draco/Meshopt nên không nạp tích hợp decoder mặc định của `useGLTF`. Asset nén mới phải cấu hình decoder phù hợp và kiểm lại retry trước khi sử dụng.

Mỗi lượt nạp clone scene, clone vật liệu cho nhận diện/selection; khi tháo component giải phóng vật liệu clone. Hình học dùng chung từ loader cache. Không merge mesh làm mất định danh nghiệp vụ.

## Mapping ngữ nghĩa cần bảo toàn

Manifest và `features/explorer/state.ts` dùng 8 occurrence ổn định:

| ID | Nhãn |
| --- | --- |
| `front-guard` | Lồng trước |
| `cap` | Núm giữ cánh |
| `blade` | Cánh quạt |
| `rear-guard` | Lồng sau |
| `shaft` | Trục minh họa |
| `motor` | Vỏ động cơ |
| `stand` | Trụ đỡ |
| `base` | Đế quạt |

Viewer kiểm đủ ID trong con trực tiếp của scene. Click mesh đi ngược chuỗi parent đến `userData.occurrenceId`; nhiều mesh có thể cùng một occurrence. Cây/inspector dùng cùng ID; tên mesh hoặc thứ tự export không thay thế khóa này. Mesh ẩn được vô hiệu raycast để không còn chọn xuyên cảnh.

Vị trí assembled và offset explode lấy từ dữ liệu, không cộng dồn. Reset đưa selection/ẩn/isolate/explode/animation về trạng thái gốc và đặt lại camera. Focus tính theo occurrence đang chọn, chuyển camera mượt hoặc tức thời theo reduced motion; thao tác orbit hủy chuyển focus đang chạy. OrbitControls giữ zoom giới hạn 3–13 và damping khi phù hợp.

`Canvas` dùng `frameloop="demand"`, DPR `[1, 1.75]`; tương tác và animation gọi invalidate. Hoạt cảnh chỉ quay cánh/trục quanh Z với bước thời gian được chặn, có pause. Đây không phải mô phỏng điện, khí động học hay tốc độ quay thật. Grid hiện vẫn được vẽ trong scene; chưa có toggle grid riêng.

## Độ trung thực và điều kiện thay thế

Model chỉ phù hợp nhận diện hình dạng và ranh giới theo quy ước của bài. Không có nội thất motor/điện, dây, vít, ren hoặc cơ cấu đảo gió. Màu và hiệu ứng selection không xác nhận cấp vật liệu. Không đo kích thước chế tạo, dung sai hoặc suy quy trình tháo từ explode.

**U3 Blocked:** chưa tích hợp geometry sản phẩm thật có đủ kiểm file, coverage và quyền phân phối web. Shortlist Rowenta/Vornado/Noctua và từng giới hạn nằm tại [FAN-DATA-DOSSIER.md](FAN-DATA-DOSSIER.md). Ảnh Noctua ở home chỉ là case study quạt máy tính riêng, không phải cặp ảnh–3D của EDU-FAN-01 và không hoàn thành milestone geometry thật.

Trước khi thay asset: xác nhận hãng/mẫu/variant và quyền host file; ghi nguồn/checksum/license, coverage từng occurrence (`exterior documented`, `interior documented`, `simplified`, `absent`, `material unknown`); tạo revision, giữ mapping ổn định; kiểm geometry, selection/ẩn/isolate/reset/focus, camera, lỗi/retry và tác động đến F01/progress. Có quyền xem CAD hoặc dùng ảnh không tự cho phép host CAD/GLB dẫn xuất.

## Hiệu năng và QA

Đo đối chứng cùng ứng dụng: Viewer 989.314 → 963.459 byte, giảm 25.855 byte (2,61%); gzip 272.543 → 265.089 byte. Tổng JavaScript giảm cùng số byte, không chỉ chuyển code sang chunk khác. Cảnh báo Vite trên 500 kB vẫn còn; không tăng ngưỡng. Three core/WebGL và R3F là chi phí lớn còn lại. Xem phương pháp, số đo và giới hạn tại [VIEWER-PERFORMANCE.md](VIEWER-PERFORMANCE.md).

Build đã đo và kiểm hồi quy tích hợp mới đạt 29/29 browser, gồm mapping/reset/F01/recovery/keyboard. Trạng thái và môi trường xem [QA-REPORT.md](QA-REPORT.md), không dùng số U0/U1 như bằng chứng mới cho thay đổi Viewer. Chưa benchmark điện thoại thật hoặc tuyên bố tăng FPS/retention.
