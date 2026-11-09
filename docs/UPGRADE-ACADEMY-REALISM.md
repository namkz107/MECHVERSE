MECHVERSE — Prompt nâng cấp Academy, sản phẩm thật và giao diện
Ngày nghiên cứu: 09/11/2026. Đây là yêu cầu triển khai tiếp trên project đang có, không phải yêu cầu khởi tạo lại.
1. Nhiệm vụ và thứ tự ưu tiên mới
Hãy nâng cấp MECHVERSE thành website thực sự học được cơ khí: có nơi học lý thuyết, lộ trình, bài tập, quiz, trò chơi kiến thức và nguồn để nghiên cứu; đồng thời nâng chất lượng hình ảnh sản phẩm và giao diện theo các ảnh tham chiếu người dùng gửi.

Thứ tự ưu tiên của lượt này:
1. Academy và bài học có nội dung thật, nguồn cụ thể, kiểm tra và ôn tập.
2. Sản phẩm thật: ảnh thật, CAD/3D có xuất xứ và phạm vi đã xác minh.
3. Thiết kế giao diện theo tinh thần editorial, hình ảnh lớn và chuyển động tinh tế.
4. Tối ưu hiệu năng, giữ các tương tác đang chạy và kiểm hồi quy.
Không dùng việc làm hero đẹp để thay phần học. Không dùng đổi màu và ánh sáng làm bằng chứng đã thay được model giản lược bằng cấu tạo thực. Không báo hoàn thành sản phẩm thật khi chỉ có ảnh thật đặt cạnh model demo.

Đọc AGENTS.md, tài liệu triển khai, FRONTEND-QUALITY.md và code hiện tại. Prompt này cập nhật ưu tiên và hướng thị giác cũ, nhưng giữ nguyên các nguyên tắc về bằng chứng, quyền sử dụng và an toàn. Nếu tài liệu cũ yêu cầu scaffold/pnpm/apps/web, hãy theo hiện trạng mới bên dưới; không tự chuyển cấu trúc hoặc package manager.
2. Hiện trạng phải bảo toàn
Thông tin do chủ dự án báo cáo, cần xác minh trong repo trước khi kết luận:
- Ba thư mục frontend/, backend/, docs/; frontend và backend có package.json, dependencies và yarn.lock riêng.
- Cách chạy hiện tại: mở terminal tại mỗi thư mục, yarn start. Giữ hành vi tự mở browser và terminal profile/lịch sử đang được dùng.
- Explorer đang dùng GLB giáo dục 8 bộ phận; orbit/zoom, tree selection, inspector, hide/show, isolate, explode, focus, reset và hoạt cảnh có pause.
- F01 có chuỗi quan sát → tìm cánh → phân biệt chi tiết/cụm → phản hồi; localStorage lưu bài đang dở và tiến độ.
- Dashboard lấy dữ liệu demo thật.
- Backend Express/TypeScript, MongoDB config, health/readiness và ba model ProductVariant, AssetRevision, LessonRevision.
- Chủ dự án báo frontend 9/9, backend 9/9, E2E 12/12. Đây là baseline được báo cáo, không phải kết quả bạn vừa chạy.
- Atlas live chưa xác minh; URI lúc tạo env còn trống. Chưa có auth, CRUD đầy đủ, tiến độ server, XP server hoặc AI Tutor.
- Viewer bundle còn cảnh báo; chưa benchmark điện thoại thật.
Giữ thay đổi người dùng, route hữu ích, asset cũ, selection/reset và dữ liệu localStorage. Kiểm version/key cũ, viết migration không phá dữ liệu và đường rollback cho schema mới. Chưa có backend/auth không được chặn phần học local-first của lượt này.

Không thay framework, tạo lại repo, xóa yarn.lock hoặc cài cả hai animation engine chỉ vì thấy thư viện mới. Không mở secret ra log/chat, không dùng Atlas làm database test, không tự deploy/push/mua asset/nâng gói.
3. Diễn giải ảnh tham chiếu thành thiết kế riêng
Nhận diện ảnh theo nội dung, không lệ thuộc số thứ tự vì ảnh có thể được gửi lại theo thứ tự khác.
Nhóm ảnh	Tinh thần cần áp dụng	Áp dụng cho MECHVERSE
MORVA: hero tối trên ảnh thật, nav dạng pill	Tương phản, typography lớn, ảnh có chiều sâu	Trang chủ giới thiệu việc học qua đồ vật thật, CTA bắt đầu học
MORVA: before/after	So sánh trực quan bằng thao tác	Cặp ảnh cùng sản phẩm: bên ngoài và cấu tạo có bằng chứng; không ghép hai mẫu khác nhau
STILLFORM: bố cục sáng ấm với vật liệu thật	Khoảng trắng, bề mặt và chất liệu tự nhiên	Khối giới thiệu sản phẩm/bộ môn, ảnh sản phẩm cơ khí thật
STILLFORM: ảnh quanh tiêu đề trên nền xanh tối	Nhịp thị giác và bố cục editorial	Mục các hướng khám phá, liên kết thật tới nội dung; dùng tiết chế
Montarville: card dự án nổi trên ảnh	Layering, card lớn, carousel có điều khiển	Bộ sưu tập bài học và đồ vật, không autoplay gây khó đọc
Montarville: footer lớn, card lệch nhịp	Phân cấp mạnh và chuyển cảnh sáng/tối	Branding và navigation trang giới thiệu; không đưa footer khổng lồ vào lesson workspace
MECHVERSE hiện tại	Luồng 3D rõ nhưng nội dung quá hẹp, hình ảnh giản lược	Giữ chức năng, mở rộng Academy và thay visual assets có kiểm chứng


Ảnh chụp tĩnh không đủ suy ra chính xác animation của website gốc. Tự biên soạn chuyển động phù hợp, không tuyên bố đã tái tạo hành vi chưa quan sát. Không sao chép logo, ảnh nội thất, code hoặc thương hiệu của website tham chiếu.

Hai trải nghiệm có cùng hệ thống thiết kế:
- Trang giới thiệu/catalog: ấn tượng, hình thật, typography lớn, chuyển cảnh sáng–tối và chuyển động có mục đích.
- Khu vực học: ổn định, đọc dễ, điều khiển rõ, không bị scroll hijacking, parallax hoặc video nền làm phân tâm.
Chọn palette khởi đầu: nền ivory #F3F0E7, chữ charcoal #18211D, dark forest #19251F, accent sage #C5D59C và copper #A85F37 dùng có kiểm soát. Kiểm tương phản cho từng cặp thực dùng; các mã này chưa tự chứng nhận accessibility. Be Vietnam Pro dùng xuyên suốt nội dung; serif tiếng Việt chỉ thêm cho heading nếu thực sự cần, kiểm đủ dấu và font load. Không thêm font chỉ để bắt chước ảnh.
4. Điều hướng học tập phải nhìn thấy ngay
Đưa “Học cơ khí” và “Bắt đầu từ số 0” thành đường đi chính, hiển thị ngay trên desktop/mobile. Explorer là công cụ gắn với bài học, không là toàn bộ website.
Khu vực/route gợi ý	Nội dung và hành vi
/	Hero có ảnh thật được phép dùng, bắt đầu học, tiếp tục bài, hướng học và sản phẩm nổi bật
/academy	Lộ trình, khóa/module, trình độ, tiên quyết, tìm kiếm/lọc và trạng thái nội dung
/academy/foundations	Trang khóa nhập môn với mục tiêu và các bài thực sự có nội dung
/learn/:lessonSlug	Mục tiêu, lý thuyết, hình/sơ đồ, tương tác, câu hỏi, bài tập, nguồn và ôn tập
/practice	Luyện theo chủ đề, loại lỗi, độ khó; tiếp tục bài đang làm
/challenges	Trò chơi cơ khí có mục tiêu và giải thích
/knowledge	Thuật ngữ, concept, công thức, nguồn, mối liên hệ
/explorer	Sản phẩm với xuất xứ, phạm vi geometry và nội dung liên quan
/explorer/:slug	Xem thật/3D và liên kết tới bài phù hợp
/dashboard	Tiến độ local thật, phần cần ôn, bằng chứng và bước tiếp


Nếu route cũ khác, giữ tương thích hoặc redirect có chủ đích. Không để CTA dẫn tới trang trống, không tạo menu đầy đủ nhưng chỉ có “coming soon”. Các khóa nâng cao có thể ghi đề cương/chưa mở; khóa nền tảng phải học được trong lượt này.
5. Gói học cơ khí đầu tiên phải có nội dung
Triển khai mục tiêu 12 bài nhỏ, phù hợp người mới. Có thể chia thành milestone, nhưng không kết thúc ở danh sách tiêu đề hoặc các đoạn AI chung chung. Từng bài phải có nội dung gốc được biên soạn và nguồn đã đọc để đối chiếu. Không copy nguyên sách hoặc đáp án được cấp quyền hạn chế.
ID	Nội dung	Đầu ra quan sát được
C01	Sản phẩm, cụm và chi tiết	Phân biệt theo cấu tạo được mô tả, không theo kích thước vật
C02	Chức năng và liên kết bộ phận	Giải thích một bộ phận đóng góp gì
C03	Đơn vị mm/m và ghi số đo	Đổi đơn vị đúng, luôn nêu đơn vị
C04	Chiều dài, độ dày, bán kính, đường kính	Nhận diện và tính bài đơn giản
C05	Mặt, trục tọa độ và hình khối	Chọn hướng/mặt và mô tả khối
C06	Lực và chuyển động nhập môn	Nhận biết tác động và hướng trong ví dụ
C07	Mô-men qua cánh cửa/cờ lê	Thay đổi lực/khoảng cách/góc và giải thích
C08	Ma sát và chức năng ổ đỡ	Phân biệt khái niệm chung với loại ổ trong sản phẩm
C09	Vật liệu và yêu cầu chức năng	So sánh theo dữ liệu, không đoán cấp từ ảnh
C10	Phương pháp chế tạo cơ bản	Nối hình dạng với phương pháp có lý do và điều kiện
C11	Từ vật thể sang hình chiếu	Ghép đúng hình theo quy ước được nêu rõ
C12	Dung sai nhập môn và tư duy lắp	Đọc khoảng kích thước từ dữ liệu bài tập


C01–C05 là gói đầu phải hoàn thiện sớm, tiếp theo C06–C08 rồi C09–C12. Tiên quyết được mô tả trong dữ liệu, không ép học một đường thẳng nếu hai chủ đề độc lập. Liên kết F01 đang có vào C01/C02, giữ bài làm cũ; không xóa F01 để làm lại cùng nội dung dưới tên mới.

Một bài đầy đủ gồm: mục tiêu, tiên quyết, 3–5 thuật ngữ mới tối đa khi phù hợp, lý thuyết vừa sức, ví dụ đời sống, sơ đồ/ảnh, một hoạt động, câu hỏi kiểm tra, giải thích đáp án, bài tự quan sát, nguồn theo mục và bài tiếp/ôn. Thời lượng hiển thị là ước tính, không là tiêu chí đạt.

Thông tin theo lớp: hiểu ngay → giải thích kỹ thuật → liên hệ thiết kế/SolidWorks/chế tạo. Học bài trục chưa cần đưa tính bền nâng cao vào lớp đầu. Sơ đồ/công thức phải được dựng bằng SVG/HTML/KaTeX hoặc công cụ chính xác; không dùng ảnh AI để tạo số đo/ký hiệu kỹ thuật cần đúng.

Không kết luận một vật là chi tiết liền chỉ từ vẻ ngoài của ảnh. Khi câu hỏi phụ thuộc cách chế tạo/lắp, cung cấp cấu tạo hoặc giả thiết rõ trong đề. Không mặc định mọi quạt có tụ, hộp đảo gió, ổ bi hoặc cùng loại động cơ.
6. Nguồn đáng tin, kiểm chứng và quyền sử dụng
Điểm bắt đầu đã nghiên cứu:
- OpenStax University Physics Volume 1: chương chuyển động quay/mô-men, ví dụ cụ thể https://openstax.org/books/university-physics-volume-1/pages/10-6-torque
- MIT OCW 1.050 Solid Mechanics: https://ocw.mit.edu/courses/1-050-solid-mechanics-fall-2004/ — có nội dung đại học và bài tập, cần chọn/diễn giải theo tiên quyết; không bê nguyên mức học vào bài nhập môn.
- SOLIDWORKS Help đúng phiên bản: https://help.solidworks.com/
- SKF catalogue/learning resources tại website chính thức: https://www.skf.com/ — dùng cho đúng loại chi tiết, không là chứng cứ linh kiện nằm trong quạt bất kỳ.
- Dữ liệu hãng của đúng sản phẩm khi nói cấu tạo, vật liệu hoặc thông số cụ thể.
Đọc nguồn thật, không chỉ search snippet. Ghi author/publisher, title, URL, phiên bản, locator/section, ngày thực sự kiểm, phạm vi áp dụng và điều kiện sử dụng. Kiểm điều khoản từng nguồn/ấn bản; không mặc định mọi textbook mở có cùng license hoặc mọi mục đích thương mại được phép.

Mỗi khẳng định kỹ thuật trọng yếu và đáp án cần truy được tới source/section hoặc phép suy luận được trình bày. Dữ liệu bài tập có nhãn giả định. Không bịa số trang, mã ISO, vật liệu, hình cắt, cấp chính xác, nguồn hoặc thông số. Khi nguồn mâu thuẫn, xét phạm vi/phiên bản và giữ điểm chưa giải quyết.

Phân biệt ba chiều trạng thái độc lập:
1. sourceStatus: chưa đối chiếu / đã đối chiếu tài liệu / cần kiểm lại.
2. expertReviewStatus: chưa có / đã duyệt trong phạm vi cụ thể, có actor thật.
3. publicationScope: personal-preview / demo / verified-published.
Bạn có thể biên soạn và đối chiếu bài để người dùng học thử ở personal-preview với nguồn và nhãn rõ; không tự gắn danh chuyên gia hoặc verified-published. Một URL hợp lệ chưa chứng minh toàn bài đúng; review bao gồm nội dung, sư phạm, đáp án và hình minh họa.

Tạo content registry/validator. Không biến cả Academy thành danh sách draft rỗng chỉ vì chưa có reviewer; cung cấp gói học preview có nội dung và thể hiện đúng trạng thái. Phần nào không đủ cơ sở để giải thích thì thu hẹp, ghi thiếu và tiếp tục các chủ đề có nguồn.
7. Quiz, trò chơi và ôn tập phải hoạt động
Mục tiêu gói đầu: tối thiểu 40 câu hỏi có lời giải phân bố theo bài, không chỉ 40 biến thể thay số; triển khai ít nhất bốn hoạt động tương tác bên dưới. Nếu chia lượt, hoàn thành nhóm bài đầu cùng câu hỏi tương ứng trước khi đánh dấu milestone xong.
1. Nhận diện chi tiết: click ảnh/3D hoặc chọn qua danh sách, đổi góc nhìn khi kiểm lại.
2. Ghép bộ phận–chức năng: drag/drop có phương án bàn phím/click thay thế.
3. Thử thách đơn vị/đường kính: số liệu bài tập, kiểm dung sai số và đơn vị, phản hồi lỗi cụ thể.
4. Phòng thử mô-men: slider F, r, góc; dùng tau=rFsin(theta) cho mô hình phẳng đơn giản, góc quy định rõ, dữ liệu giả định và đơn vị N·m. Cho thấy góc 0 và 90 độ; không nói N·m của mô-men là cùng đại lượng với năng lượng chỉ vì cùng thứ nguyên.
5. Ghép hình chiếu: quy ước phép chiếu được nêu rõ, sơ đồ gốc tự dựng chính xác.
6. Sắp xếp quy trình minh họa: chỉ cho quy trình có giả thiết/nguồn; không biến exploded view thành trình tự tháo thật.
Mỗi trò chơi có mục tiêu học, hướng dẫn, điều kiện đúng, lời giải, retry và liên kết về lý thuyết. Không có countdown gây áp lực mặc định hoặc điểm chỉ từ click.

Quiz: single-choice, multi-choice nếu có quy tắc rõ, numeric-with-unit, matching và câu trả lời mở theo rubric. Quiz session có trạng thái đang làm, submit, review; câu sai đưa vào ôn và có biến thể kiểm lại. Feedback chỉ rõ sai khái niệm, đơn vị hay suy luận. Không đặt đáp án đúng cạnh đề trước khi nộp.

Local-first dùng adapter tiến độ có version, resume và xuất/nhập dữ liệu cá nhân nếu phù hợp. Hiển thị “Lưu trên thiết bị này”. Không tự gọi local score là chấm bài an toàn phía server; không phát XP tài khoản hoặc mastery verified giả. Khi thêm server sau, có migration/dedup chứ không ghi đè mất lịch sử.
8. Sản phẩm thật: phân biệt ba mức
Mức	Có thể khẳng định	Không được suy ra
Ảnh thật của mẫu cụ thể	Ngoại hình được ghi nhận của mẫu đó	Toàn bộ nội thất, dung sai hoặc vật liệu từ màu
CAD/scan/render có nguồn	Phạm vi hình học đã được nguồn và pipeline xác nhận	Model tự động là đầy đủ/đúng mọi chi tiết
Cấu tạo kỹ thuật có bằng chứng	Bộ phận và nguyên lý trong phạm vi tài liệu đúng mẫu	Có thể chế tạo/vận hành an toàn từ một hình 3D


“Đồ thật” là yêu cầu xuất xứ và độ trung thực, không bắt buộc scan. CAD có chứng cứ và render tốt có thể phù hợp; photogrammetry thường ghi nhận bề ngoài, không tự cung cấp nội thất bị che.
Nguồn CAD thực đã tìm được
Noctua có trang tải STEP của NF-A12x25r PWM:
https://www.noctua.at/en/products/nf-a12x25r-pwm/downloads

Giới hạn chính thức:
https://www.noctua.at/en/3d-cad-models

Hãng cho biết model phục vụ thiết kế/visualization, một số geometry bị chỉnh và nội thất không hoàn toàn đại diện sản phẩm. Đây là ứng viên nghiên cứu, chưa phải asset quạt bàn đủ cấu tạo hoặc kết luận được quyền phân phối file gốc/GLB trên website. Không tự chuyển sản phẩm chính thành quạt máy tính chỉ vì dễ tải CAD; có thể thêm như một case study riêng, ghi rõ.
Công việc phải làm
- Lập shortlist tối đa ba ứng viên: ưu tiên đúng mẫu quạt bàn, tài liệu hãng/CAD có cấu trúc; ghi nguồn, loại file, nội thất, license, quyền phân phối web và giới hạn.
- Không hứa rằng marketplace có đủ CAD nội thất đúng mẫu; ảnh preview chỉ là ứng viên cho tới khi kiểm file.
- Chọn một ứng viên có đủ điều kiện, tải nguồn hợp lệ, kiểm geometry và chuyển GLB offline khi công cụ hỗ trợ. Không mua asset hoặc vượt truy cập tài khoản.
- Lập coverage theo từng bộ phận: exterior documented, interior documented, simplified, absent, material unknown.
- Nếu quyền dùng chưa rõ, chưa đưa file lên public; có thể lưu hồ sơ/link và tiếp tục phần Academy. Không tự gán CC0 cho tài sản hãng.
- Nếu chưa có asset đạt yêu cầu, giữ model cũ trong sandbox, ghi rõ milestone real asset còn Blocked; không đổi nhãn thành quạt thật. Có thể hoàn thiện bố cục ảnh thật được phép dùng và trình xem ảnh, nhưng báo riêng với viewer 3D.
Không thay toàn bộ hình ảnh bằng ảnh AI. Nếu dùng ảnh AI cho phần trang trí phải phân biệt; nó không là bằng chứng kỹ thuật/sản phẩm thật.
9. Nâng chất lượng render mà giữ cấu trúc
Sau khi có geometry phù hợp, xử lý tỷ lệ, normal, bevel, độ dày, texture và material PBR tương ứng; chỉ gán cấp vật liệu kỹ thuật khi có nguồn. Dùng ánh sáng studio và môi trường HDRI có quyền phù hợp. Poly Haven công bố asset CC0: https://polyhaven.com/license ; tải bản phù hợp và lưu quyền, không cần gọi API live chỉ để lấy HDRI.
- Studio background trung tính, contact shadow vừa phải, tone/exposure kiểm theo phiên bản Three đang cài.
- Mặc định vật liệu tự nhiên; selection dùng outline hoặc tint nhỏ, không phủ toàn chi tiết bằng cam/teal làm sản phẩm trông như nhựa màu.
- Grid kỹ thuật là toggle, không bắt buộc chiếm nền mọi cảnh.
- Preset assembled / exploded / chi tiết; giới hạn zoom và camera tránh góc méo làm vật nhỏ như đồ chơi.
- Kiểm người học đọc được hình dạng, không dùng depth of field che bộ phận cần học.
- Giữ stable occurrence IDs, tree và inspector, hide/isolate/reset. Một chi tiết có thể nhiều mesh; tên node/index export không là khóa nghiệp vụ bền vững.
- Tối ưu không merge mất selection. Compare trước/sau về node binding, kích thước tham chiếu và reset, không chỉ file size.
- Không đo kích thước chế tạo từ mesh giản lược. Không gọi hoạt cảnh là mô phỏng lực/khí động học.
10. Thư viện: lựa chọn có mục đích
Danh sách nghiên cứu ngày 09/11/2026. Stars là số làm tròn hiển thị từ GitHub, thay đổi theo thời gian; không là chứng nhận phù hợp hoặc accessibility của app.
Repo	Stars xấp xỉ	Vai trò đề xuất
https://github.com/shadcn-ui/ui	128k	Component có thể tùy biến; không bê nguyên dashboard template
https://github.com/motiondivision/motion	35k	Microinteraction, reveal và chuyển panel; một engine UI chính
https://github.com/clauderic/dnd-kit	17.8k	Matching/sorting có tương tác; giữ phương án keyboard/click
https://github.com/davidjerleke/embla-carousel	8.5k	Carousel bài/sản phẩm khi thực sự cần; không giấu hết navigation trong carousel
https://github.com/pmndrs/drei	Không chốt số trong đặc tả	Helpers R3F cho controls/environment; chọn phần cần dùng
https://github.com/donmccurdy/glTF-Transform	Không chốt số trong đặc tả	Pipeline tối ưu GLB offline, kiểm semantic mapping sau xử lý


Các repo trên là lựa chọn công cụ, không yêu cầu cài tất cả. Giữ thư viện sẵn có nếu đáp ứng. Với shadcn, kiểm primitives và React/Tailwind major đang dùng trước khi thêm; không bắt chuyển cả hệ component.

Mặc định dùng CSS cho hiệu ứng đơn giản và Motion cho chuyển động UI. Không thêm GSAP/Lenis/song song nhiều engine nếu chưa có tính năng chứng minh cần; không scroll hijack trong khu học. Kiểm version, license, maintenance và peer dependencies từ repo/tài liệu chính thức trước khi cài bằng Yarn. Ghi lý do và bundle impact; không dùng --force để che lỗi.
11. Motion specification
- Hover/focus: khoảng 120–180 ms, thay đổi nhỏ và không làm layout nhảy.
- Panel/tab: khoảng 180–280 ms, giữ focus và thông báo trạng thái phù hợp.
- Reveal trang giới thiệu: khoảng 300–500 ms, không giấu nội dung khi JS/observer lỗi.
- Camera 3D: chuyển có kiểm soát, cancel được khi tương tác; reduced motion rút ngắn/tắt dịch chuyển.
- Carousel không tự chạy mặc định; drag, nút và bàn phím rõ.
- Ảnh so sánh có slider keyboard/touch và nhãn đúng nội dung; không tạo cặp before/after gian dối bằng hai sản phẩm khác nhau.
- Không chạy marquee, parallax, video và Canvas liên tục cùng lúc trên mobile. Pause khi offscreen/ẩn tab khi phù hợp.
Các khoảng thời gian là điểm bắt đầu thiết kế, không là chuẩn bắt buộc. Tôn trọng prefers-reduced-motion; Motion có API hỗ trợ theo tài liệu chính thức: https://motion.dev/docs/react-use-reduced-motion . Không tắt mọi tín hiệu phản hồi thiết yếu khi giảm chuyển động.
12. Cấu trúc code và dữ liệu cần bổ sung
Giữ frontend/backend/docs và yarn.lock riêng. Đề xuất mở module trong cấu trúc hiện có cho academy, knowledge, quiz, challenges, progress và assets. Không tự đổi thành monorepo mới.

Dữ liệu lesson có schema: id, revision, objectives, prerequisites, conceptIds, structuredBlocks, sourceRefs, activities, questions, reviewStatus và scope. Questions có answer/rationale riêng, mục tiêu kiểm tra, đơn vị và giới hạn số nếu cần. Phân biệt public question và đáp án; với local preview thừa nhận dữ liệu có thể nằm ở client, không giả chống gian lận như server.

Tạo ProgressRepository interface với LocalProgressRepository hiện chạy; có đường thêm ServerProgressRepository sau. Không tạo server adapter trả success giả. Các cập nhật backend cần thiết nên nhỏ, đúng model/reference/revision; không làm auth/AI thành dependency bắt buộc của Academy.

Data localStorage phải có version, namespace và migration; test từ dữ liệu F01 cũ. Quiz session và progress không bị reset do thay route/đóng panel. Nguồn bị sửa hoặc bài đổi revision phải có chính sách giữ lịch sử và yêu cầu ôn khi cần.

Chưa có AI thì bài học/quiz/games vẫn hoạt động bằng dữ liệu biên soạn. Không sinh toàn bộ bài live mỗi lần render. AI sau này chỉ hỗ trợ trên kho phù hợp với trạng thái duyệt và quyền sử dụng.
13. Kiểm thử và hiệu năng
Trước sửa, chạy baseline phù hợp để xác minh báo cáo cũ. Không sao chép 9/9, 12/12 sang báo cáo mới như vừa chạy.
- Regression: selection/tree, focus, ẩn/cô lập, explode/reset, animation pause và resume F01.
- Academy: mở khóa từ trang chính, tìm/lọc có kết quả thật; mở bài từ catalog; mục tiêu/nguồn hiển thị.
- Quiz: đáp án, rationale, multi-choice rule, numeric/unit tolerance; retry không nhân điểm vô hạn; resume sau reload.
- Minigame mô-men: góc 0/90, đổi đơn vị, số âm/phạm vi, không NaN; dùng rubric khoa học đúng giả thiết.
- Nguồn: mọi sourceRef/claimRef resolve, locator không giả, trạng thái expert review không tự nâng, nội dung revoked không đi vào verified mới.
- Migration: dữ liệu local cũ còn đọc được hoặc migrate có backup, không mất câu đang làm.
- Asset: mapping và geometry tồn tại đúng loại; ảnh thật và model demo không bị đánh đồng trong UI.
- Keyboard/touch, dialog focus return, reduced motion, zoom chữ và lỗi WebGL.
Kiểm render 1440×900, 1024×768, 390×844; thêm màn lớn nếu screenshot hiện tại rộng. Giữ font tiếng Việt, không tràn ngang, panel không che CTA. Không mô phỏng mobile trong headless rồi gọi đó là benchmark điện thoại thật.

Code-split route/viewer, tải ảnh có srcset/size, lazy-load ngoài màn hình, hạn chế DPR và texture; tách thư viện quiz khỏi bundle đầu nếu phù hợp. Đo build chunk trước/sau và số liệu trong điều kiện ghi rõ. Giải quyết nguyên nhân cảnh báo viewer, không chỉ tăng chunk warning limit. Postprocessing chỉ thêm khi lợi ích nhìn thấy đáng đổi chi phí.

Không hứa retention tăng từ redesign. Ghi cách kiểm: người mới tìm được nơi bắt đầu, hoàn thành bài, giải thích lại, quay lại ôn và điểm vướng. Analytics tùy chọn không mặc định gửi câu trả lời/PII ra dịch vụ ngoài.
14. Thứ tự thực hiện
U0 — Kiểm hiện trạng và nguồn
Đọc repo/docs, chạy baseline, lập docs/UPGRADE-PLAN.md và source/asset shortlist ngắn. Kiểm dependencies trước khi cài. Sau đó code ngay, không dành cả lượt chỉ tạo tài liệu.
U1 — Mở nơi học cơ khí
Làm Academy/catalog, navigation và C01–C05 có nội dung nguồn, quiz và progress local. Liên kết F01; hoàn thành ít nhất một hành trình học mới từ trang chính tới phản hồi/ôn. Có thể dùng hệ giao diện mới từ bước này.
U2 — Tăng nội dung và tương tác
Hoàn thiện C06–C12, tổng mục tiêu 40 câu hỏi, ít nhất bốn hoạt động có lời giải. Ghi trạng thái nguồn/review thật. Không đợi live Atlas/AI để làm phần này.
U3 — Asset thật và render
Chọn ứng viên hợp lệ, kiểm file/quyền/coverage, tích hợp nếu đủ điều kiện; hoàn thiện đối chiếu ảnh–3D và render. Nếu blocked, nêu asset nào, vướng gì và công việc đã hoàn thành; không đánh dấu real-product milestone đạt. Tiếp tục U4/U5 độc lập.
U4 — Hoàn thiện thiết kế toàn luồng
Trang chủ editorial có ảnh hợp lệ, collection, navigation; Academy/lesson/workspace thống nhất và dễ đọc. Motion có mục đích. Không chỉ bàn giao landing page mới.
U5 — QA, hiệu năng và bàn giao
Chạy test phù hợp, kiểm browser thực, screenshot trước/sau nếu công cụ có, kiểm regression và migration. Cập nhật README, DESIGN-SYSTEM, CURRICULUM, CONTENT-STANDARDS, FAN-DATA-DOSSIER, 3D-PIPELINE, QA-REPORT và IMPLEMENTATION-STATE theo code thực.

Sau mỗi milestone, báo ngắn đã làm/đã kiểm/đang thiếu rồi tiếp tục phần được phép làm. Không hỏi lại cho từng component, không redesign nhiều vòng không có phát hiện cụ thể. Không tự push/deploy.
15. Definition of Done
- Có nơi “Học cơ khí” dễ tìm và khóa nền tảng với bài thực, không chỉ F01 hoặc tiêu đề khóa.
- Người học đọc lý thuyết, tương tác, nộp bài, xem lời giải, ôn và tiếp tục sau reload.
- Nguồn theo nội dung cụ thể; trạng thái source-checked/expert-reviewed tách rõ; không tự nâng mọi bài thành verified.
- Các mục tiêu bài/câu hỏi/trò chơi đã thực hiện được thống kê thực tế; phần chưa đủ không được giấu bằng card placeholder.
- Sản phẩm thật có xuất xứ/giới hạn và quyền phù hợp. Nếu chưa tích hợp được, báo Blocked riêng thay vì đổi màu demo rồi tuyên bố đã đạt.
- Giao diện thể hiện rõ tinh thần ảnh tham chiếu nhưng là sản phẩm riêng, nội dung cơ khí và chức năng học là trung tâm.
- Các tính năng Explorer cũ và dữ liệu người dùng được bảo toàn; yarn start vẫn dùng được.
- Cảnh báo bundle được phân tích và xử lý có số liệu, những giới hạn thiết bị thật còn thiếu được nêu.
- Tests/QA ghi đúng Pass/Fail/Blocked/Not run, không tái sử dụng kết quả cũ như kết quả mới.
16. Bắt đầu ngay
Hãy kiểm tra hiện trạng, chốt kế hoạch ngắn và thực hiện U0 rồi U1. Ưu tiên đem phần học thật lên website và kiểm được một hành trình xuyên suốt, đồng thời nghiên cứu asset thật. Không chỉ phản hồi bằng đề xuất hoặc tạo trang showcase đẹp mà không có bài học.  