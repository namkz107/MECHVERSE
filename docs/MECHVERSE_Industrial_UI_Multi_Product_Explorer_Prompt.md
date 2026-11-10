MECHVERSE — Nâng cấp giao diện công nghiệp và Explorer nhiều sản phẩm
Ngày: 09/11/2026. Đây là yêu cầu triển khai tiếp trên code hiện có, cập nhật ưu tiên của các prompt trước.
1. Phạm vi lượt này
Tạm hoãn phát triển M03, mở rộng giáo trình, pilot học tập, auth/server progress, giấy hoàn thành, AI Tutor và Knowns. Không xóa hoặc làm hỏng phần học hiện có. Tập trung sửa frontend, UI/UX, chất lượng hình ảnh và trải nghiệm khám phá 3D nhiều sản phẩm cơ khí.

Hãy thực sự sửa code, chạy app, xem giao diện render, kiểm tra và sửa lỗi; không chỉ trả về kế hoạch. Không khởi tạo lại dự án.

Giữ cấu trúc frontend/, backend/, docs/, Yarn và yarn.lock riêng, cách yarn start, terminal profile và localStorage đang dùng. Kiểm hiện trạng trước sửa, giữ thay đổi người dùng. Không tự đổi framework/package manager, sửa .env, dùng Atlas làm DB test, push hoặc deploy.

Theo báo cáo hiện có, app đã có roadmap, M01/M02, nhiều learning modes và Explorer quạt giáo dục. Các số test đã báo cáo không phải kết quả bạn vừa chạy. Đọc docs/IMPLEMENTATION-STATE.md và QA-REPORT.md để lấy baseline thực tế rồi kiểm lại phạm vi liên quan.
2. Mục tiêu thị giác và nghĩa của ảnh tham chiếu
Ảnh người dùng gửi là hình tách cụm kiểu CAD kỹ thuật: bề mặt trung tính, đường cạnh rõ, nhiều chi tiết có chức năng, bố cục giúp đọc quan hệ bộ phận. Ảnh không tự là bằng chứng cấu tạo thật của một mẫu quạt hoặc quyền dùng asset. Không copy watermark/ảnh đó vào sản phẩm như asset đã được cấp quyền.

MECHVERSE cần cảm giác một studio khám phá sản phẩm công nghiệp: hiện đại, chính xác về trình bày, giàu chi tiết và có nét nghệ thuật. Tạo chiều sâu bằng hình học, tỷ lệ, vật liệu, ánh sáng và bố cục; không phụ thuộc vào neon, hạt bay, hiệu ứng hologram hoặc các khối màu bóng giống đồ chơi.

Chia thành hai trải nghiệm thống nhất:
- Trang giới thiệu/thư viện: editorial, ảnh/render lớn, typography mạnh, nhịp sáng–tối và animation có mục đích.
- Không gian Explorer: rộng, tập trung vào vật thể, điều khiển rõ, panel thu gọn được, thông tin đọc dễ.
Giữ Be Vietnam Pro có tiếng Việt chuẩn. Màu bề mặt graphite/slate, trắng ấm và kim loại trung tính; teal/copper dùng tiết chế cho hành động/selection. Kiểm tương phản và các trạng thái thực tế. Không phủ mọi sản phẩm bằng màu thương hiệu.
3. Explorer phải vượt ra khỏi một chiếc quạt
Thiết kế catalog cho năm nhóm, không chỉ tạo năm bản sao của quạt:
Nhóm	Những chi tiết/quan hệ đáng quan sát	Tương tác phù hợp
Quạt	Lồng, cánh, vỏ, thân và nội thất nào có dữ liệu phù hợp	Lắp/tách theo kịch bản, quan sát bộ phận quay, pause
Vỏ tủ điện/tủ kỹ thuật	Panel, cửa, bản lề, khóa, mounting plate, vị trí lắp hoặc cable entry có căn cứ	Mở cửa đúng bản lề, tháo panel được thiết kế tháo, cô lập cụm
Locker	Cánh, ngăn, thành, bản lề, khóa, khe thoáng và liên kết	Mở từng cửa, xem ngăn, tách cụm theo kết cấu
Bàn cơ khí/workbench	Mặt, khung, giằng, chân, pad/chân tăng chỉnh hoặc liên kết	Xem dưới mặt bàn, chọn mối nối, tách phần tháo được
Bồn rửa	Chậu, vành, bộ thoát, rổ lọc, gioăng, kẹp hoặc giá đỡ có trong mẫu	Xem dưới chậu, cô lập bộ thoát, tách các chi tiết lắp


Các mục trong bảng là phạm vi nghiên cứu, không là BOM chung cho mọi sản phẩm. Chỉ đưa vào model cụ thể khi có dữ liệu hoặc thiết kế mẫu có mô tả. Đồ vật tĩnh như bàn/locker vẫn có nội dung cơ khí; không gắn động cơ giả để làm chúng có vẻ phức tạp.

Mục tiêu lượt triển khai đầu: ít nhất ba nhóm thực sự tương tác được, gồm tối thiểu hai nhóm mới ngoài quạt. Ưu tiên locker và workbench nếu dữ liệu phù hợp; vỏ tủ/bồn rửa triển khai tiếp khi chất lượng đủ. Catalog có thể có đủ năm nhóm nhưng phải ghi đúng available/research/blocked; không dùng card “xem 3D” cho asset chưa tồn tại.

Chất lượng một model ưu tiên hơn số lượng. Nếu chưa đạt ba nhóm, báo rõ phần thiếu thay vì dùng các khối hộp sơ sài để đủ số.
4. Xuất xứ, độ trung thực và quyền sử dụng
Phân biệt rõ trong manifest và UI:
1. Sản phẩm hãng cụ thể: có brand/model/revision, dữ liệu nguồn, quyền sử dụng và phạm vi geometry được đối chiếu.
2. Mẫu kỹ thuật do dự án thiết kế: hình học và kết cấu được biên soạn có chủ đích; ghi rõ là thiết kế minh họa, chưa xác nhận là sản phẩm thương mại/đã chế tạo.
3. Demo giản lược: giữ EDU-FAN-01 trong sandbox hoặc mục demo; không đổi nhãn thành sản phẩm thật chỉ vì tăng độ bóng.
Không tự gắn thương hiệu, cấp vật liệu, dung sai, tải cho phép, IP rating hoặc chứng nhận cho geometry tự tạo. Material render và cấp vật liệu kỹ thuật là hai trường khác nhau.

Nguồn chính thức đã tìm được để nghiên cứu:
- Rittal CAD data: https://www.rittal.com/com-en/Software/CAD-Daten
- Rittal catalog: https://rittal.partcommunity.com/3d-cad-models/enclosure-systems-rittal?info=rittal%2Fschaltschranksys
- Franke Commercial resources/BIM: https://www.franke.com/us/en/water-solutions/support/resources.html
- Herman Miller product models: https://www.hermanmiller.com/resources/3d-models-and-planning-tools/product-models/
- Noctua CAD và giới hạn: https://www.noctua.at/en/3d-cad-models
Đây là nơi có dữ liệu/nguồn ứng viên, chưa phải danh sách file đã kiểm và được phép phân phối. Đọc điều kiện của từng asset, định dạng và cấp detail thực tế. Model BIM có thể chỉ đủ bề ngoài, không có cây chi tiết hoặc nội thất. CAD một khối không tự trở thành assembly có thể tháo.

Lập docs/ASSET-SOURCING.md: ứng viên, đúng nhóm/model nào, URL, ngày kiểm, format, geometry coverage, chất lượng, license/điều kiện web distribution và kết luận. Không mua, vượt login/paywall hoặc dùng credential người dùng chưa cung cấp.

Nếu asset bên thứ ba bị chặn quyền hoặc thiếu cấu tạo, có thể làm mẫu kỹ thuật tự thiết kế với thông số giả định công khai và geometry đủ tốt. Đây là phương án giúp triển khai kỹ thuật tiếp tục, không được báo như đã đạt mục tiêu tích hợp sản phẩm hãng thật. Tách hai kết quả đó trong QA.
5. Tiêu chí hình học: chi tiết có ý nghĩa
Với mẫu kỹ thuật tự tạo, trước khi dựng cần có assembly sketch/spec nhỏ, kích thước danh nghĩa giả định và danh sách bộ phận. Dùng đơn vị/hệ tọa độ thống nhất. Tránh cấu tạo vô lý hoặc chi tiết xuyên nhau.
- Tấm có độ dày thực trong model, cạnh gấp/bo phù hợp giả thiết; không dùng một mặt phẳng vô hạn mỏng thay cánh tủ.
- Cửa có khe hở nhìn thấy và pivot bản lề đúng; tay nắm/khóa không nổi lơ lửng.
- Lỗ, khe thoáng, fastener, flange, support và gân đặt theo chức năng. Không rải ốc tùy ý để tăng độ chi tiết.
- Phân biệt mối hàn với liên kết tháo được. Không tách tung khung hàn thành “hướng dẫn tháo lắp” không có thật.
- Workbench có mặt và khung/giằng/tựa hợp lý, không là bốn hộp xuyên một mặt phẳng.
- Sink có lòng chậu, thành, vành và lỗ thoát hợp lý. Không dùng ảnh normal map để giả rằng có nội thất có thể chọn.
- Không dựng hệ thống điện hoạt động hoặc thông số an toàn điện giả trong tủ. Lượt này tập trung vỏ/kết cấu và liên kết cơ khí; nội thất điện chỉ thêm khi có đúng dữ liệu và được giao rõ.
- Không mô hình hóa mọi vòng ren/vi chi tiết nếu chỉ làm nặng. Dùng level of detail theo khoảng cách; khi zoom đủ gần mới tải phần cần quan sát.
Thư viện model có thể được tạo offline bằng CAD/Blender khi công cụ có sẵn và có quy trình tái lập; hoặc procedural geometry có spec và độ hoàn thiện phù hợp. Không coi cài một thư viện React là tự tạo được CAD cơ khí chính xác.
6. Ba chế độ nhìn dùng chung một model
Studio
Vật liệu tự nhiên, ánh sáng mềm có tương phản, phản xạ có kiểm soát, contact shadow và nền trung tính. Chọn exposure/tone mapping theo Three version đã cài. Model đủ lớn trong viewport, góc máy không làm méo hoặc trông tí hon.

Roughness/metalness/normal được chọn phù hợp material minh họa; bề mặt brushed stainless, sơn tĩnh điện, nhựa và gỗ không dùng cùng một shader preset. Texture có scale và hướng hợp lý. Không gán độ bóng cực cao cho mọi vật.
CAD — shaded with edges
Giống tinh thần ảnh tham chiếu: bề mặt trắng/xám dịu, đường cạnh và silhouette đọc được, nền sáng sạch. Phân biệt cạnh hình dạng với đường triangulation. Không bật wireframe toàn bộ làm hình rối hoặc kiểu low-poly. Dùng threshold/line settings và kiểm hiệu năng cho từng model.
Exploded assembly
Tách theo các cụm có ý nghĩa và hệ trục phù hợp; có slider, reset và preset. Khoảng cách đủ để hiểu quan hệ, không làm phần nhỏ bay mất. Có nhãn và đường dẫn callout ở mức zoom phù hợp, tránh chồng chữ.

Giữ rõ exploded view là trình bày cấu tạo. Chỉ gọi là thứ tự tháo/lắp khi đã có sequence và ràng buộc được biên soạn. Có thể dùng Studio hoặc CAD shading trong trạng thái explode; mode hiển thị và trạng thái assembly không bị trộn thành dữ liệu geometry gốc.

Không cần thêm X-ray/section trước khi ba chế độ trên ổn. Nếu có section, UI mô tả đúng clipping; nó không tạo mặt cắt kín hoặc nội thất còn thiếu.
7. UX catalog và workspace
Catalog có filter nhóm sản phẩm, trạng thái dữ liệu, tìm kiếm và preview đúng asset. Card cho biết mẫu gì, loại nguồn, khả năng tương tác và mức coverage; số lượng là dữ liệu thật. Không cho website mở tất cả Canvas/GLB cùng lúc để tạo thumbnail.

Workspace:
- Cây assembly có search, cụm con và selection state.
- Viewport chiếm phần chính, panel thu gọn được; preset Front/Side/Top/Isometric và Fit view.
- Thanh hành động theo nhóm: góc nhìn, quan sát, trạng thái lắp và chuyển động. Nhãn rõ, phím tắt có thể xem và không xung đột nhập văn bản.
- Inspector: tên, vai trò, cụm cha, phần liên quan, provenance và điều chưa biết. Dữ liệu dài mở theo lớp.
- Component selection dùng outline/tint nhỏ; giữ nhận diện chất liệu, không phủ màu cam toàn vật thể.
- Tính năng tùy capability: tủ có open/close door, quạt có rotation, bàn có view joints. Không hiện nút quay động cơ cho bồn rửa hoặc nút explode không có metadata.
- Chuyển sản phẩm reset state theo asset mới và hủy request cũ; không giữ selection ID của quạt sang locker.
- Link chia sẻ/view state chỉ encode dữ liệu công khai đã validate; không secret hoặc raw asset URL riêng tư.
Mobile: thao tác orbit và scroll trang không xung đột vô lý, panel thành tab/drawer, vùng chạm đủ, toolbar không che sản phẩm. Có lựa chọn từ cây và nội dung 2D khi WebGL lỗi; fallback phải được gắn nhãn đúng.
8. Hệ thống scene/asset dùng lại được
Không viết một Viewer riêng hard-code cho mỗi model. Tổ chức AssetCatalog, AssetManifest/Revision, PartDefinition, ComponentOccurrence, geometry bindings, material profiles, camera presets và capabilities.

Occurrence có ID ổn định, parent, rest transform, explode offset theo local space và optional joint definition. Hinge cần pivot, axis, rest angle và limits trong spec; không animate theo bounding-box center nếu sai trục. Nhiều mesh có thể thuộc một chi tiết; nhiều ốc cùng loại là các occurrence khác nhau.

Scene state tách material mode, selection/visibility, assembly mode, joint state và animation time. Rest transform bất biến. Xác định thứ tự transform và hành vi khi explode/open door cùng hoạt động; có thể khóa tổ hợp chưa hỗ trợ với giải thích ngắn.

Reset khôi phục camera, vị trí/hướng/tỷ lệ, visibility, joint và animation. Không xóa bài làm/progress cũ. Asset revision thay đổi phải có mapping/migration nếu F01 phụ thuộc; giữ quạt cũ cho F01 nếu chưa tương thích.

Không flatten/join mất semantic binding khi tối ưu. Nếu instancing fastener thì raycast instanceId vẫn ánh xạ occurrence chính xác. Highlight không làm đổi material mọi instance ngoài ý muốn.
9. Công cụ đề xuất, chỉ thêm khi có tác vụ cụ thể
Giữ Three/R3F/Drei hiện có nếu tương thích. Đọc phiên bản và peer dependencies trước cài bằng Yarn; không dùng prerelease hoặc --force để vượt lỗi.
Công cụ	Dùng khi nào	Nguồn
Drei Environment/Stage	Thiết lập môi trường studio; cấu hình riêng theo model	https://drei.docs.pmnd.rs/staging/environment
Drei Edges/Outlines	Cạnh CAD hoặc highlight có mục đích; không áp toàn scene vô điều kiện	https://drei.docs.pmnd.rs/abstractions/edges ; https://drei.docs.pmnd.rs/abstractions/outlines
Motion	Chuyển panel, route và microinteraction; dùng engine UI đang có nếu đủ	https://github.com/motiondivision/motion
shadcn/ui hoặc primitives đang có	Dialog, tabs, command/search, slider; tùy biến thành hệ thiết kế riêng	https://github.com/shadcn-ui/ui
glTF Transform	Inspect/validate/tối ưu offline, kiểm semantic sau xử lý	https://gltf-transform.dev/cli
three-mesh-bvh / Drei Bvh	Chỉ khi đo thấy raycast mesh phức tạp gây chậm; kiểm dynamic geometry/instance	https://drei.docs.pmnd.rs/performances/bvh
Poly Haven assets	HDRI/texture có quyền phù hợp, lưu file cục bộ được phép	https://polyhaven.com/license


Không cài tất cả chỉ để có tên thư viện. Ưu tiên CSS cho hiệu ứng đơn giản, Motion cho UI; không thêm GSAP/Lenis song song nếu chưa có yêu cầu cần chúng. Postprocessing là tùy chọn sau khi geometry/material/light tốt; không dùng bloom/DOF để che model yếu.

glTF compression giảm dữ liệu truyền chưa tự giảm draw calls/GPU cost. Dùng inspect để biết nút thắt; không mặc định thêm decoder vào app cho mọi asset, nhất là bundle đang có cảnh báo.
10. Animation và khả năng tiếp cận
Microinteraction khoảng 120–200 ms, panel 180–300 ms, camera 300–600 ms là điểm bắt đầu thiết kế, không quy chuẩn. Có cancel/interrupt khi thao tác. Không hover làm card hoặc nội dung học nhảy layout.
- Native scroll trong Academy/lesson; không autoplay video lớn ở màn học.
- Pause motion, reduced-motion và offscreen/hidden-tab handling.
- Keyboard tree, slider, tabs và focus visible; dialog đóng trả focus về trigger.
- CTA và text đủ tương phản, tiếng Việt không cắt; không dùng màu làm tín hiệu duy nhất.
- Hạn chế tooltip như đường duy nhất đọc thông tin trên touch.
Giữ các bài học đang có dễ truy cập, UI đẹp hơn nhưng không làm navigation ẩn hoặc nhét font quá nhỏ quanh viewport.
11. Hiệu năng và kiểm thử
Chạy baseline và đo theo điều kiện rõ. Không lấy số test cũ làm kết quả mới; không gọi SwiftShader là GPU điện thoại thật.
- Lazy-load route/viewer/asset đang mở; ảnh preview responsive, không tải cả thư viện.
- DPR/texture quality phù hợp thiết bị, render on demand khi không chuyển động, dispose và kiểm memory sau nhiều lần đổi model.
- Kiểm draw calls, geometry, texture và request size để chọn tối ưu; không chỉ nhìn warning 500 kB.
- Không đổi warning limit để báo giải quyết; không tách file tùy ý để giấu cùng lượng tải cần thiết.
- Tối ưu offline có original backup, ảnh đối chiếu và mapping diff; giữ độ dày/cạnh quan trọng cho việc quan sát.
Tests cần có: chọn qua tree/viewport; repeated explode/reset; mở/đóng cửa theo pivot; isolate và restore; chuyển asset nhanh/abort; tránh stale selection; lỗi tải/retry; instance selection; WebGL fallback; giữ F01 và localStorage/migration; không mất lesson state khi chuyển theme/route.

QA render: 1440×900, 1024×768, 390×844; bàn phím, touch giả lập, reduced-motion. Chụp trước/sau cùng góc camera và scene state, gồm một close-up và exploded cho mỗi model đã triển khai. Nếu chưa có browser công cụ, báo phần chưa kiểm trực quan.

Đánh giá realism bằng checklist: tỷ lệ, cấu tạo nhìn được, khe hở/độ dày, cạnh/bo, liên kết, vật liệu/ánh sáng, readability ở CAD mode và nguồn/giới hạn. Không dùng kết luận “trông premium” làm tiêu chí duy nhất.
12. Milestone thực hiện
V0 — Khảo sát
Kiểm repo/baseline, ảnh tham chiếu và asset hiện có; ghi ngắn quyết định hướng CAD/studio, shortlist nguồn và phần không được sửa. Không dành cả lượt chỉ viết tài liệu.
V1 — Một mẫu mới đạt chất lượng
Chọn locker/workbench hoặc vỏ tủ có dữ liệu phù hợp. Làm một model đủ chi tiết, hai shading Studio/CAD và tương tác có ý nghĩa. Tích hợp vào viewer chung, QA close-up và reset trước khi nhân rộng.
V2 — Catalog đa sản phẩm
Thêm ít nhất một nhóm mới nữa, mục tiêu tổng ba nhóm tương tác được tính cả quạt. Mỗi nhóm có manifest, capabilities và provenance. Không sao chép cùng geometry rồi đổi tên hoặc có menu nhưng không có model.
V3 — Redesign UI/UX
Hoàn thiện catalog, inspector, toolbar, panel/mobile và app shell theo hướng công nghiệp/nghệ thuật. Áp dụng có kiểm soát sang Home/Dashboard/Academy hiện có; không biên soạn thêm M03 hoặc chuyển sang backend ngoài phạm vi.
V4 — QA và tối ưu
Regression, đo performance, ảnh trước/sau và sửa lỗi đã quan sát. Cập nhật DESIGN-SYSTEM, ASSET-SOURCING, 3D-PIPELINE, QA-REPORT và IMPLEMENTATION-STATE theo thực tế. Những asset sản phẩm hãng chưa đủ quyền/dữ liệu báo Blocked riêng; không coi mẫu thiết kế tự tạo là đã vượt cổng đó.

Sau mỗi milestone, báo ngắn Done/In progress/Blocked và tiếp tục phần độc lập. Không yêu cầu xác nhận cho từng component hoặc dependency thông thường. Không tự push/deploy hoặc mua asset.
13. Định nghĩa hoàn thành
- UI có hướng công nghiệp nhất quán, không chỉ thêm hiệu ứng vào layout cũ.
- Có catalog và tối thiểu ba nhóm tương tác đạt chất lượng, hoặc báo minh bạch số nhóm chưa đạt cùng lý do.
- Có Studio, CAD edges và exploded phối hợp đúng trên model có khả năng tương ứng.
- Chi tiết và chuyển động mang ý nghĩa cơ khí; chức năng không được fake bằng ảnh hoặc nút chết.
- Nhãn source/thiết kế minh họa/demo đúng, không tự tuyên bố hàng thật/đã sản xuất/chuyên gia duyệt.
- Giữ tính năng học, dữ liệu, Yarn và startup đang dùng; phần hoãn không bị triển khai lan man.
- QA/test và hiệu năng có bằng chứng thực; không tăng warning limit, bịa FPS hoặc dùng lại báo cáo cũ làm kết quả mới.
14. Bắt đầu
Đọc tài liệu hiện trạng và prompt này, khảo sát ngắn rồi code V0/V1. Hãy hoàn thiện một sản phẩm mới đủ chi tiết và viewer CAD/studio thật trước, sau đó mở rộng V2–V4. Không chỉ làm landing page đẹp, không quay lại mở rộng giáo trình hoặc auth/AI Tutor trong lượt này.