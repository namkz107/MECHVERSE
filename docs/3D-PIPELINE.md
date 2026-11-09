# Pipeline 3D hiện tại

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
