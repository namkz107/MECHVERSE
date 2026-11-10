MECHVERSE — Lộ trình từ số 0, nhiều cách học và đánh giá Knowns
Ngày: 09/11/2026. Tài liệu yêu cầu triển khai tiếp, sử dụng cùng UPGRADE-ACADEMY-REALISM.md. Ưu tiên mới nhất của người dùng và code thực tế được giữ làm căn cứ.
1. Đích đến và giới hạn phạm vi
Hãy xây nền tảng giúp người chưa biết cơ khí bắt đầu được: không mặc định họ biết trục, ren, lực, đơn vị, hình chiếu hay Sketch. Đi từ hiểu đồ vật, đo và đọc bản vẽ tới mô hình chi tiết/cụm, hồ sơ thiết kế, nhận biết chế tạo và CAM/CNC nhập môn.

Đích cốt lõi là xử lý nhiệm vụ chi tiết/cụm đơn giản dưới hướng dẫn kỹ thuật, với bài làm chứng minh. Không hứa một khóa web thay bằng kỹ sư, kinh nghiệm xưởng hoặc đào tạo vận hành thiết bị.

“Đầy đủ” phải được định nghĩa bằng phạm vi và ma trận năng lực, không hứa bao phủ mọi chuyên ngành cơ khí. Phân tầng: bắt buộc, bổ trợ, chuyên sâu và có thể học sau. Mỗi mục trong yêu cầu gốc phải có vị trí trong core hoặc nhánh chuyên sâu, tiên quyết, độ sâu và trạng thái biên soạn.

Đây là khung 96 bài đề xuất, không phải 96 bài đã được viết và duyệt. Không tự tạo hàng loạt nội dung chưa đọc nguồn rồi đánh dấu hoàn tất.
2. Một nền kiến thức, nhiều hình thức học
LearningPath → Course → Module → Lesson → LearningObjective là cấu trúc chương trình. Concept, SourceEvidence, AssessmentItem, PracticalTask và AssetOccurrence liên kết theo ID/revision, không chép thành nhiều kho rời.

Modes là cách tiếp cận nội dung, không là những định nghĩa mâu thuẫn của cùng một khái niệm. Không gán người dùng thành kiểu học cố định chỉ qua một câu onboarding.
Cách học	Người dùng làm gì	Phạm vi đánh giá
Khóa có hướng dẫn	Học theo module, ví dụ, bài kiểm tra và dự án	Đi theo mục tiêu/tiên quyết, xem tiến độ
Flashcards	Tự nhớ câu trả lời rồi lật thẻ, ôn lại theo lịch	Nhớ thuật ngữ, ký hiệu, điều kiện và quan hệ; chưa xác nhận kỹ năng thiết kế
Luyện quiz	Chọn chủ đề, dạng bài, xem lý do sai và làm biến thể	Kiểm kiến thức theo mục tiêu và chất lượng câu hỏi
Khám phá 3D	Chọn bộ phận, xem cấu tạo, trả lời nhiệm vụ	Nhận diện và giải thích; cần dữ liệu đúng mẫu
Mini lab/trò chơi	Điều chỉnh biến, nối chức năng, ghép hình chiếu	Vận dụng trong giả thiết được nêu rõ
Dự án/CAD	Làm chi tiết, bản vẽ, cụm và hồ sơ	Cần bài nộp/rubric và review phù hợp
Ôn cá nhân	Ôn những mục còn yếu hoặc đến hạn	Dựa trên bài làm, không dựa chỉ vào thời gian xem


Người dùng có thể đổi mode trong cùng bài hoặc học kết hợp. Giữ vị trí, bài làm, nguồn và revision; không cộng điểm trùng khi đổi mode. Mode không có nghĩa tự miễn bài đánh giá thực hành của khóa.

Mặc định cho người mới: “Bắt đầu từ số 0” và đường học có hướng dẫn. Các mode khác nằm ở lựa chọn dễ tìm, không bắt họ tự thiết kế giáo trình trước khi học. Bài tự kiểm đầu vào là tùy chọn; không làm được thì bắt đầu nền tảng, không gắn nhãn kém năng lực.
3. Bản đồ chương trình cốt lõi — 16 module × 6 bài
ID bài là Mxx-L01 đến Mxx-L06. Mỗi ô sáu bài là tên và phạm vi bài; khi biên soạn có thể chia thành micro-session nhưng vẫn giữ mapping/ID và thông báo thay đổi revision.
Module	Sáu bài theo thứ tự	Tiên quyết chính	Đầu ra
M01 — Làm quen nghề	Cơ khí trong đời sống; sản phẩm–cụm–chi tiết; chức năng bộ phận; thiết kế–chế tạo–gia công; lắp ráp–kiểm tra; từ ý tưởng tới sản phẩm và các hướng nghề	Không	Phân tích một đồ vật quen thuộc
M02 — Hình học và đo	Hệ mét/đổi đơn vị; dài–rộng–cao–dày; đường kính/bán kính; góc và hình 2D; khối–mặt–X/Y/Z; đo bằng thước/thước cặp và giới hạn phép đo	M01	Ghi và kiểm kích thước cơ bản
M03 — Lực và chuyển động	Lực và hướng; chuyển động thẳng/quay; mô-men; ma sát; cân bằng/tải; biến dạng–độ bền–độ cứng vững nhập môn	M02; toán bổ sung tại chỗ	Giải thích tác động và tính ví dụ đơn giản
M04 — Vật liệu	Kim loại/phi kim; thép/gang; inox/nhôm/đồng; ABS/POM/PA/PC; cơ tính và xử lý nhiệt nhập môn; chọn vật liệu theo chức năng và dữ liệu	M02–M03 ở mức liên quan	So sánh phương án, nhận ra dữ liệu còn thiếu
M05 — Đọc bản vẽ	Mục đích/khung tên; phép chiếu và quy ước bố trí; hình chiếu đứng/bằng/cạnh; trục đo; nét thấy/khuất/tâm; hình cắt/mặt cắt	M02	Hình dung khối từ bộ hình chiếu
M06 — Kích thước và lắp ghép	Ghi kích thước theo chức năng; lỗ/đường kính/bán kính/góc; ren và ký hiệu; dung sai kích thước; khe hở/trung gian/lắp chặt; nhám và GD&T nhập môn có chuẩn tham chiếu	M05; M02	Đọc giới hạn, hiểu yêu cầu lắp và mục đích kiểm
M07 — SOLIDWORKS/Sketch	Giao diện, Part/Assembly/Drawing và quản lý file; mặt phẳng và Line/Rectangle; Circle/Arc/Polygon; Smart Dimension/Relations; Trim/Offset/Mirror; Sketch Pattern và đủ/thiếu/thừa ràng buộc	M02, M05 cơ bản	Biên dạng đúng kích thước, giải thích ràng buộc
M08 — Dựng chi tiết	Extrude/Cut; Revolve/Revolved Cut; Hole Wizard/Fillet/Chamfer; Feature Pattern/Mirror/Reference Geometry; Sweep/Loft; Shell/Rib/Draft và thay đổi có chủ đích	M07	Bộ tấm có lỗ, trục bậc, bạc và giá đỡ
M09 — Chi tiết và mối ghép	Bu lông/vít/đai ốc; trục; bạc lót; ổ lăn/ổ bi và cách gọi; then/chốt/vòng chặn; đọc catalogue và thiết kế vị trí lắp	M03–M06; M08 cho phần CAD	Giải thích chức năng, không chọn thông số từ trí nhớ
M10 — Truyền động/cơ cấu	Bánh răng và tỷ số truyền; puly/dây đai; xích; khớp nối/lò xo; ray/thanh trượt/xi lanh khí nén; động cơ/hộp giảm tốc và sơ đồ chức năng	M03, M09	Nhận diện và chọn nguyên lý sơ bộ
M11 — Công nghệ chế tạo	Tiện; phay; khoan/doa/mài; laser/plasma/tấm; đúc/dập/hàn; lập quy trình sơ bộ và khả năng tiếp cận dụng cụ/đo kiểm	M04–M06; hình dạng M08	Liên hệ hình dạng với cách làm và giới hạn
M12 — Assembly	Insert Components và cố định; bậc tự do; Mate cơ bản; Mechanical Mate; cụm con/Bottom-up và nhập môn Top-down; giao thoa/khe hở/chuyển động và khả năng lắp	M08–M10, yêu cầu lắp M06	Cụm số hoạt động theo ý đồ, không ràng buộc thừa
M13 — Hồ sơ kỹ thuật	Drawing từ 3D; hình chiếu/cắt/chi tiết phóng; kích thước/dung sai theo chức năng; bản vẽ lắp/exploded/BOM; PDF/DXF và kiểm đơn vị; revision, liên kết và bàn giao file	M06, M12	Hồ sơ đồng nhất với mô hình
M14 — Tư duy thiết kế	Làm rõ yêu cầu; chức năng/tải/môi trường; chọn phương án và tính tay phù hợp; chọn vật liệu/chi tiết tiêu chuẩn; DFM/DFA/đo kiểm/bảo trì; thay đổi thiết kế, Equations/Configurations và giới thiệu Design Table	M03–M13 theo mục tiêu	Đề xuất có lý do, ghi giả thiết và điểm phải xác minh
M15 — CAD/CAM/CNC nhập môn	CAD/CAM/CNC và loại máy; an toàn/quy trình; phôi–đồ gá–gốc–dao; toolpath/thô/tinh và mô phỏng; đọc G-code/Post Processor ở mức khái niệm; kiểm và giới hạn trước máy thật	M11, M13, M14	Hồ sơ mô phỏng học tập; chưa xác nhận quyền vận hành máy
M16 — Dự án tổng hợp	Chốt đề/tiêu chí; phương án/tính/chọn; dựng chi tiết; cụm/kiểm tra; bản vẽ/BOM/kế hoạch chế tạo; phản biện, sửa yêu cầu mới và tổng kết	Các mục tiêu core liên quan đã đạt	Bộ hồ sơ có thể được người phụ trách kỹ thuật review


M07 có thể bắt đầu sau M02 và phần hình chiếu cơ bản của M05, không buộc học hết mọi lý thuyết mới được mở CAD. M04/vật liệu và M11/chế tạo được giới thiệu sớm, quay lại sâu hơn khi có bài thiết kế. Prerequisites trong dữ liệu phải ở cấp objective/bài khi cần, không khóa cứng cả module bằng quan hệ quá rộng.

Những bài nặng như dung sai, mô hình CAD và tính toán phải được chia phiên nhỏ; sáu bài/module là khung tổ chức, không lời hứa mỗi chủ đề chỉ cần một phiên ngắn để thành thạo.
4. Nhánh chuyên sâu sau core
Nhánh	Phần học	Điều kiện mở
K01 — Sheet Metal/Weldments	Uốn và trải tấm; dữ liệu công nghệ; kết cấu hàn; danh sách cắt; bản vẽ; dự án khung/vỏ	Vật liệu, chế tạo, part/cụm và hồ sơ
K02 — Surface/khuôn	Bề mặt; liên tục hình học; tạo vỏ; thoát khuôn; nguyên lý core/cavity; thiết kế sản phẩm phù hợp công nghệ	M08 nâng, vật liệu và công nghệ tương ứng
K03 — Cơ học/tính bền/Simulation	Tĩnh học/sức bền sâu hơn; mô hình vật liệu; điều kiện biên; lưới/hội tụ; kiểm chứng tính tay; giới hạn mô phỏng	Toán/cơ học/sức bền đủ và đánh giá riêng
K04 — Truyền động nâng cao	Tải, tuổi thọ, chọn ổ, bánh răng và hộp giảm tốc theo nguồn/tiêu chuẩn	M09–M10 và tính bền cần thiết
K05 — CAM/CNC nâng cao	Đồ gá, dao, máy/post cụ thể; xác minh chương trình; nhiều setup/trục	M15, đào tạo thiết bị và an toàn có người hướng dẫn


Bổ trợ xuyên suốt: toán ứng dụng, tiếng Anh kỹ thuật, đo lường/chất lượng, bảng tính, giá thành, quản lý phiên bản và tiêu chuẩn. Khi dùng tiêu chuẩn phải chỉ mã/hệ/phiên bản đã kiểm, phân biệt yêu cầu tiêu chuẩn với ví dụ bài tập.
5. Ma trận độ phủ: cách tránh thiếu nền tảng
Tạo docs/CURRICULUM-COVERAGE.md hoặc dữ liệu tương đương với các cột: competencyId, nguồn yêu cầu, core/optional, objective, prerequisite, lessonId/revision, source evidence, hoạt động, assessment, rubric, trạng thái và điểm còn thiếu.

Truy mọi nhóm kiến thức trong tệp yêu cầu gốc vào ma trận. Không coi tên bài là nội dung đã hoàn thành. Validator bắt orphan objective, tiên quyết thiếu/vòng, assessment không kiểm mục tiêu, source reference hỏng và nhánh không có đường vào.

Mỗi lesson có cùng cấu trúc: cần biết trước → mục tiêu → thuật ngữ → giải thích → ví dụ → ứng dụng → liên hệ 3D/CAD/chế tạo → lỗi thường gặp → tự làm → phản hồi → ôn/bài tiếp → nguồn và giới hạn.

Không ép đủ mọi mode cho mọi bài. Một khái niệm không có model phù hợp vẫn có thể học bằng hình chính xác; gắn availableModes theo nội dung đã biên soạn. Không tạo video trống hoặc nút flashcard không có thẻ.
6. Hành trình đầu tiên cho người hoàn toàn mới
1. Onboarding hỏi mục tiêu và thời gian có thể học; cho phép bỏ qua kiểm đầu vào.
2. Chọn mặc định “Tôi chưa biết gì” → M01-L01; chỉ ba đến năm thuật ngữ mới khi vừa sức.
3. Bài đầu quan sát vật quen thuộc, định nghĩa trước, minh họa và câu hỏi ngắn.
4. Người học tự trả lời, nhận lỗi cụ thể, có ví dụ khác và làm biến thể.
5. Sau bài hiện: đã học gì; đã chứng minh gì; còn thiếu bằng chứng gì; cần ôn; bài tiếp; ứng dụng.
6. Có nút chuyển sang flashcards/quiz/3D nếu bài có dữ liệu, không mất vị trí.
7. Màn hình lần sau ưu tiên tiếp tục và ôn đến hạn, không yêu cầu tự tìm lại giữa thư viện lớn.
Liên kết dữ liệu đang có: F01 và C01/C02 về cấu tạo vào M01; C03–C05 vào M02; C06–C08 vào M03 và mục ổ đỡ thích hợp; C09 vào M04; C10 vào M11; C11 vào M05; C12 vào M06. Tạo alias/mapping và giữ lịch sử, không xóa rồi seed trùng các bài cũ.
7. Tip học nhanh nhưng phải kiểm được hiểu
Tổng quan nghiên cứu Dunlosky và cộng sự (2013) đánh giá practice testing và distributed practice có ích trên nhiều điều kiện học. Dùng làm định hướng, không hứa tiết kiệm thời gian theo tỷ lệ hoặc bảo đảm hiệu quả cho mọi kỹ năng CAD.

Áp dụng vào sản phẩm:
- Tự trả lời trước khi mở lời giải. Không coi nhận ra đáp án sau khi lật thẻ là đã nhớ độc lập.
- Ôn cách quãng và điều chỉnh theo lịch sử. Các mốc như 1/3/7 ngày chỉ là cấu hình khởi đầu để thử, không là lịch tối ưu phổ quát.
- Giải thích “vì sao” bằng lời và chỉ ra trên hình/vật thể.
- Học một ví dụ có lời giải → bài thiếu một bước → bài tự làm → biến thể mới.
- So sánh dễ nhầm: bán kính/đường kính, chi tiết/cụm, độ bền/độ cứng vững, bạc lót/ổ lăn, animation/mô phỏng.
- Với CAD: sửa kích thước có chủ đích, kiểm mô hình và giải thích quan hệ thay vì chỉ chép chuỗi click.
- Ghi sổ lỗi theo concept, ôn nguyên nhân; không chỉ lưu đáp án.
Tips thao tác theo phiên bản SOLIDWORKS là tài liệu có nguồn riêng. Không dùng mẹo khoanh đáp án hoặc ghi nhớ phím tắt làm thay kiến thức nền.
8. Bài làm và điều kiện hoàn thành
Trạng thái theo objective: chưa học, đã xem, đang luyện, đã chứng minh ở bài này, cần ôn/vận dụng lại. Tự đánh giá flashcard và bài làm chấm theo rubric lưu riêng. Không gán mastery chỉ từ XP, số click, phần trăm video hoặc thời lượng.

Điều kiện môn/khóa được công bố trước: mục tiêu bắt buộc, kiểm kiến thức và bài thực hành tương ứng. Nếu đặt ngưỡng điểm, ghi đây là quy tắc khóa do MECHVERSE thiết kế, có thể hiệu chỉnh, không là chuẩn nghề nghiệp hay ISO.

Người dùng có thể khám phá bài nâng cao trước; ghi rõ tiên quyết. Muốn hoàn thành khóa vẫn phải có bằng chứng mục tiêu bắt buộc, dù họ chọn mode nào. Không chặn chỉ vì họ không xem video nếu có thể chứng minh năng lực bằng bài tương đương.

Chấm câu hỏi xác định bằng quy tắc; câu trả lời mở có rubric, phản hồi và trạng thái chưa review khi cần. Không lấy sự tự tin của AI làm quyết định duy nhất cho bài thiết kế hoặc an toàn.
9. Giấy hoàn thành khóa
Có thể thiết kế trải nghiệm giống một khóa trực tuyến có module, kiểm tra và giấy hoàn thành. Chỉ gọi là giấy hoàn thành nội bộ MECHVERSE, không dùng logo/tuyên bố được Coursera, trường hay tổ chức nghề nghiệp công nhận khi không có quan hệ thực tế.
- Nội dung: người học, khóa/phiên bản, mục tiêu đã đánh giá, ngày, phương thức và giới hạn đánh giá.
- Điều kiện: các mục tiêu bắt buộc và project đã đạt theo quy tắc được công bố; có review thực tế khi loại bài yêu cầu.
- Nếu chỉ lưu localStorage, mọi bản xuất là bản cá nhân/sample và không được quảng cáo đã xác minh danh tính hay chống sửa.
- Chứng nhận có trang kiểm tra công khai/QR cần hệ thống server cấp ID, record, ownership, chính sách thu hồi và quyền riêng tư. Chưa có backend tương ứng thì deferred, không làm QR trỏ trang giả.
- Badge ôn thẻ, XP và giấy hoàn thành là ba đối tượng khác nhau.
10. Dữ liệu và triển khai nhiều mode
Giữ frontend/backend/docs và Yarn theo hiện trạng. Không đổi package manager, phá script yarn start hoặc xóa dữ liệu cũ.

Các thực thể cần tổ chức: LearningPath, Module, LessonRevision, LearningObjective, Concept, PrerequisiteEdge, SourceEvidence, FlashcardRevision, AssessmentRevision, PracticalTask, LearningEvidence, ReviewEvent, ReviewSchedule và CompletionRecord.

Embed những phần nhỏ thuộc revision; không nhét toàn bộ lịch sử ôn vào một document user. Mode đọc cùng objective/content; flashcard/question có ID/revision riêng khi diễn đạt thay đổi. Giao diện source/review status đồng nhất giữa các mode.

Tạo scheduler interface đơn giản, có thể thay thuật toán sau. Lưu cardId/revision, user/localProfileId, reviewedAt, rating, dueAt và lịch sử có giới hạn theo chính sách. Không gắn nhãn FSRS hoặc thuật toán cụ thể nếu chưa thực thi và kiểm đúng. Đổi múi giờ/ngày phải được xử lý nhất quán; không mất lịch ôn khi đổi mode.

Progress local-first tiếp tục dùng khi Atlas/auth chưa có. Phân biệt sync pending/lưu trên máy/server; khi thêm server, có migration, ID ổn định và chống duplicate. Không cho một lần hoàn thành ở ba mode cộng ba lần cùng phần thưởng.
11. Yêu cầu nguồn và biên soạn
Tiếp tục chính sách trong UPGRADE-ACADEMY-REALISM: nguồn đúng phạm vi, locator/phiên bản, dữ liệu bài tập có nhãn, source-checked khác expert-reviewed. Không biến mọi tài liệu tham khảo thành nội dung được phép sao chép/phân phối.

Tạo lesson gốc dựa trên các nguồn đã đọc. Không tự import toàn bộ Coursera/Quizlet, không copy khóa trả phí hay bộ đề của người khác. Tham khảo mô hình trải nghiệm không đồng nghĩa tích hợp API hoặc được phép dùng thương hiệu/nội dung.

Bản đồ 96 bài có thể được dựng đầy đủ trong catalog, nhưng từng bài chưa biên soạn phải hiện chưa mở; không tạo số liệu khóa đã hoàn thiện giả. Gói đầu cần nội dung có thể học thật ngay, không để toàn Academy chỉ là roadmap.
12. Knowns: vai trò, lợi ích và chi phí
Thông tin đã kiểm tra
Trang ui.knowns.dev không truy cập đọc được trong lượt này; một lần tải trả 403. Đánh giá dưới đây dựa trên repository knowns-dev/knowns và tài liệu chính thức knowns.sh, không phải bài test giao diện hosted đó.

Theo mô tả chính thức, Knowns tổ chức task, tài liệu, quyết định và ngữ cảnh cho người phát triển/AI coding agent. CLI, local Web UI và MCP dùng chung trạng thái dự án. Đây là công cụ hỗ trợ quá trình phát triển, không là chức năng LMS mặc định.
Dùng ở đâu cho MECHVERSE?
Nhu cầu	Cách dùng đề xuất
AI quên quyết định sau phiên mới	Tìm lại yêu cầu về Yarn, scope demo/verified và các quyết định dữ liệu
Nhiều prompt/tài liệu có cập nhật	Theo dõi bản quyết định đang hiệu lực và task liên quan
Chia việc Academy	Task cho prerequisite engine, flashcards, review schedule, migration và QA
Kiểm việc có làm xong không	Acceptance criteria gắn đúng task và bằng chứng test
Nguồn cơ khí/bài học học viên	Vẫn cần registry nội dung của MECHVERSE và quy trình duyệt riêng
Chấm bài, cấp giấy, cá nhân hóa học	Vẫn do hệ thống MECHVERSE thực thi


Không import Knowns CLI vào production frontend, không thay MongoDB bằng .knowns, không dùng bảng task của Knowns làm tiến độ học viên. Nếu muốn dùng nó như công cụ nội bộ biên soạn, phải thiết kế xuất bản rõ ràng; không biến trạng thái task Done thành bài đã duyệt chuyên môn.

Rủi ro chi phí là thời gian thiết lập/cập nhật và hai nơi chứa quyết định bị lệch nhau. Semantic search, MCP, model/provider hoặc tích hợp tự động có thêm cấu hình cần kiểm; không giả định phải bật mọi phần để quản lý task/doc.
Kết luận tư vấn
[có khả năng cao] Knowns hữu ích hơn khi đã có nhiều phiên AI, quyết định bị quên hoặc task/docs khó truy. Nếu AGENTS.md + docs/IMPLEMENTATION-STATE.md + task board hiện tại đã đủ thì lợi ích bổ sung có thể nhỏ. Chưa có đo đạc để hứa tiết kiệm token hoặc tăng chất lượng theo tỷ lệ.

Khuyến nghị: cho phép pilot dev-only, tách khỏi milestone Academy. Không tích hợp vào runtime MECHVERSE. Không cài hoặc đổi cấu hình công cụ chỉ vì đọc tài liệu này; mục đích hiện tại là đánh giá và lập kế hoạch.
Pilot nếu chủ dự án quyết định dùng
- Thử trên nhánh riêng, giữ nguyên source và đường dẫn tài liệu hiện tại.
- Chọn ba task thật: prerequisite engine, flashcard/review và một luồng quiz–progress.
- Chỉ đưa vài quyết định đang hiệu lực, task và link tới docs gốc; không copy toàn giáo trình, secret, .env, file CAD hoặc chat học viên.
- Quy định source of truth theo loại: code là triển khai; docs phiên bản là đặc tả; Knowns là task/context và trỏ tới đúng revision. Tránh hai bản kiến trúc sửa độc lập.
- Đối chiếu phiên bản/--help trước mọi lệnh. Không chép lệnh init/setup từ nguồn khác mà chưa xem chúng ghi AGENTS.md, cấu hình Git, MCP hoặc hook gì. Giữ nội dung AGENTS.md hiện tại.
- Bắt đầu keyword/task/doc nếu đáp ứng; chưa bật embedding provider, cloud sync hoặc global hooks chỉ để thử khả năng hữu ích.
- So sánh với cách hiện tại: số lần phải giải thích lại, task tìm đúng nguồn hay không, thay đổi trái quyết định, thời gian hoàn thành và overhead cập nhật. Đo tổng công việc, không chỉ độ dài một câu trả lời.
- Nếu qua vài phiên không giảm việc lặp hoặc gây tài liệu lệch, ngừng pilot và quay lại workflow cũ; code/Academy không được phụ thuộc để chạy.
13. Milestone nâng cấp lộ trình
1. Rà nội dung hiện có, lập mapping C/F → M, coverage matrix và dữ liệu prerequisites. Có 96 bài trong bản đồ nhưng báo rõ số bài thực sự đã viết.
2. Hoàn thiện M01 và phần M02 phù hợp: đường bắt đầu, nội dung, nguồn, nhiệm vụ và bài làm; chuyển tiếp được từ F01 cũ.
3. Hoàn thiện ít nhất một mục tiêu bằng course/flashcard/quiz/3D sẵn có, đổi mode giữ state; những mode chưa có asset không giả nút hoạt động.
4. Thêm ôn đến hạn và sổ lỗi; chống duplicate progress/XP; kiểm migration, thời gian và revision.
5. Mở dần M03 trở đi theo dữ liệu có nguồn. Nhánh advanced giữ outline đúng độ sâu; không viết hàng trăm bài chất lượng thấp để lấp catalog.
6. Hoàn thành UI giấy hoàn thành cá nhân/sample đúng nhãn; server verification chỉ làm khi dependency đã có và được giao trong milestone tương ứng.
7. Knowns là pilot riêng nếu được chọn, không là điều kiện chặn bước 1–6.
Các kiểm tra quan trọng: prerequisite missing/cycle; đổi mode không mất bài; self-rating không tự thành thực hành đã đạt; source status đồng nhất; version card/bài thay đổi; lịch ôn và timezone; migration local; không cấp giấy từ điểm demo; thiếu nguồn không tự publish; không mất F01.
14. Nguồn đối chiếu và giới hạn kết luận
- Knowns repository: https://github.com/knowns-dev/knowns
- Knowns User Guide: https://knowns.sh/vi/docs/user-guide
- Knowns Web UI: https://knowns.sh/docs/web-ui
- Knowns MCP: https://knowns.sh/docs/mcp-integration
- Knowns installation: https://github.com/knowns-dev/knowns/blob/main/docs/en/getting-started/installation.md
- Tổng quan nghiên cứu học tập: Dunlosky et al., 2013, Improving Students' Learning With Effective Learning Techniques, https://www.psychologicalscience.org/publications/journals/pspi/learning-techniques.html ; DOI 10.1177/1529100612453266.
Các thiết kế chương trình, mode, milestone và pilot là đề xuất cho MECHVERSE, chưa là kết quả thử nghiệm hiệu quả sản phẩm. Tài liệu này không phải bộ bài giảng đã được chuyên gia duyệt.
15. Chỉ dẫn bắt đầu cho coding agent
Đọc tài liệu này cùng UPGRADE-ACADEMY-REALISM.md và trạng thái repo. Giữ Yarn/cấu trúc/dữ liệu cũ, sau đó triển khai milestone 1–2 để có đường học cho người mới và nội dung thật. Tiếp tục milestone 3–4 khi phần trước đạt. Không chỉ tạo catalog đẹp hoặc tài liệu kế hoạch. Không cài Knowns trong lượt này nếu người dùng mới yêu cầu đánh giá tính khả thi.