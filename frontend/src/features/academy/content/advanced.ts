import type { Lesson, Source } from "../types";

const checkedAt = "2026-11-09";
const openStaxUsage =
  "Bản web đã đọc ghi CC BY-NC-SA 4.0: ghi công, phi thương mại và cùng giấy phép khi tái sử dụng/phái sinh. Footer yêu cầu văn bản cho phép trước khi đưa sách vào mô hình ngôn ngữ hoặc dịch vụ AI sinh; sử dụng thương mại cần xin phép. Chỉ đối chiếu quan hệ vật lý; lời giải, dữ kiện, câu hỏi và sơ đồ được tự soạn. Không sao chép sách, hình, câu hỏi hoặc lưu thành corpus/RAG. Xem Preface/Customization và footer Citation/Attribution; không suy ra quyền phát hành thương mại từ nhãn preview.";
const source = (entry: Omit<Source, "checkedAt" | "sourceStatus">): Source => ({
  ...entry,
  checkedAt,
  sourceStatus: "source-checked",
});
const os = (
  id: string,
  section: string,
  page: string,
  locator: string,
  scope: string,
): Source =>
  source({
    id,
    title: `University Physics Volume 1 — ${section}`,
    publisher: "OpenStax / Rice University",
    author: "William Moebs, Samuel J. Ling, Jeff Sanny",
    url: `https://openstax.org/books/university-physics-volume-1/pages/${page}`,
    version: "Xuất bản 19-09-2016; bản web đọc 09-11-2026",
    locator,
    scope,
    usage: openStaxUsage,
  });

export const advancedSources: Source[] = [
  os(
    "os-force",
    "5.3 Newton’s Second Law",
    "5-3-newtons-second-law",
    "§5.3, Force and Acceleration; định luật II",
    "Hợp lực ngoài, khối lượng và gia tốc trong mô hình Newton; không phải thông số sản phẩm.",
  ),
  os(
    "os-torque",
    "10.6 Torque",
    "10-6-torque",
    "§10.6, Defining Torque; Torque; phương trình 10.22–10.23",
    "Độ lớn mô-men, góc giữa r và F, khoảng cách vuông góc và đơn vị N·m.",
  ),
  os(
    "os-friction",
    "6.2 Friction",
    "6-2-friction",
    "§6.2, Static and Kinetic Friction; phương trình 6.1–6.2",
    "Ma sát nghỉ/trượt và phạm vi mô hình thực nghiệm đơn giản.",
  ),
  os(
    "os-elastic-modulus",
    "12.3 Stress, Strain, and Elastic Modulus",
    "12-3-stress-strain-and-elastic-modulus",
    "§12.3, đoạn mở đầu; phương trình 12.33–12.36",
    "Biến dạng, ứng suất, mô-đun đàn hồi trong miền tuyến tính; không dùng bảng để gán mác vật liệu sản phẩm.",
  ),
  os(
    "os-elasticity",
    "12.4 Elasticity and Plasticity",
    "12-4-elasticity-and-plasticity",
    "§12.4, định nghĩa elasticity, elastic limit và plastic behavior; footer Citation/Attribution",
    "Biến dạng hồi phục và biến dạng dư; điều kiện sử dụng hiện tại của sách.",
  ),
  source({
    id: "skf-bearing-basics",
    title: "Bearing basics — Module 1: Functions and parts",
    publisher: "SKF",
    author: "SKF",
    url: "https://www.skf.com/skf/campaign/aptitudearchive/training/brgbasics_v2/presentation_content/external_files/Bbasics_transcript.pdf",
    version:
      "Transcript brgbasics_v2; PDF không ghi năm ấn bản rõ trong phần đã kiểm",
    locator:
      "Trang in 1–3: Why bearings?, Friction, Loads, Bearing parts, Selection factors",
    scope:
      "Chức năng chung ổ đỡ, ổ trượt/ổ lăn và tải hướng kính/dọc trục. Không chứng minh loại ổ trong quạt bàn bất kỳ.",
    usage:
      "Không thấy giấy phép mở trong PDF đã đọc; trang terms thử mở không trả nội dung. Quyền tái sử dụng chưa xác minh: chỉ liên kết tham khảo và mô tả khái niệm tự viết; không sao chép transcript, hình hoặc bảng, không gán CC0.",
  }),
  source({
    id: "delft-manufacturing",
    title: "2.3.5 Main Takeaways on Metal Manufacturing",
    publisher: "TU Delft OpenCourseWare",
    author: "TU Delft OpenCourseWare",
    url: "https://ocw.tudelft.nl/course-readings/2-3-5-main-takeaways-on-metal-manufacturing/",
    version:
      "Introduction to Aerospace Structures and Materials, Module 2; bản web đọc 09-11-2026",
    locator:
      "Ba mục Casting, Machining, Forming và đoạn về tolerances/finishing",
    scope:
      "Phân loại chế tạo kim loại nhập môn, khả năng kết hợp công đoạn; không hướng dẫn vận hành máy.",
    usage:
      "Trang khóa ghi CC BY-NC-SA 4.0: tái sử dụng/phái sinh phải ghi công, phi thương mại và cùng giấy phép. Chỉ liên kết và diễn giải phân loại thực tế bằng nội dung tự soạn, không sao chép hình. Trang thông báo nền tảng thay cuối 2026; cần kiểm lại URL khi phát hành.",
  }),
  source({
    id: "sw-intro-views",
    title: "Introducing SOLIDWORKS — Drawings",
    publisher: "Dassault Systèmes SolidWorks Corporation",
    author: "Dassault Systèmes SolidWorks Corporation",
    url: "https://files.solidworks.com/pdf/introsw.pdf",
    version:
      "SOLIDWORKS 2015, nhận diện tại Legal Notices trang in 6; ©1995–2014",
    locator:
      "Trang in 72–75: Standard 3 Views, Projected Views, View Display and Alignment; Legal Notices trang 6",
    scope:
      "Nguyên lý hình chiếu và bố trí góc chiếu thứ ba. Không dùng tài liệu 2015 để xác nhận thao tác giao diện phiên bản 2025.",
    usage:
      "PDF bảo lưu mọi quyền; Legal Notices trang 6 không cho tái bản/truyền tài liệu khi chưa có chấp thuận bằng văn bản. Terms https://www.solidworks.com/terms-use (sửa 13-02-2026) chỉ cho xem/tải cá nhân, thông tin, phi thương mại với thông báo quyền. Chỉ liên kết, không phân phối PDF/ảnh nguồn; hình học và bài tập tự dựng. Help 2025 mở thật chỉ trả vỏ 2027 nên không dùng làm nguồn đã kiểm.",
  }),
  source({
    id: "keyence-tolerance",
    title: "Measurement Fundamentals — What is Tolerance?",
    publisher: "KEYENCE Canada / KEYENCE Corporation",
    author: "KEYENCE Corporation",
    url: "https://www.keyence.ca/ss/products/measure-sys/measurement-selection/basic/tolerance.jsp",
    version: "Bản web đọc 09-11-2026; footer ©2026",
    locator: "Ba đoạn dưới tiêu đề What is Tolerance?",
    scope:
      "Giới hạn kích thước, độ rộng khoảng dung sai và yêu cầu chức năng; không áp dụng mã dung sai ISO.",
    usage:
      "Footer All Rights Reserved; không thấy giấy phép mở. Chỉ liên kết, diễn giải quy tắc số học với dữ kiện tự soạn; không sao chép ví dụ hoặc sơ đồ hãng.",
  }),
  source({
    id: "keyence-fit",
    title: "Measurement Fundamentals — What is Fit?",
    publisher: "KEYENCE Canada / KEYENCE Corporation",
    author: "KEYENCE Corporation",
    url: "https://www.keyence.ca/ss/products/measure-sys/measurement-selection/basic/fit.jsp",
    version: "Bản web đọc 09-11-2026; footer ©2026",
    locator: "Hai đoạn dưới tiêu đề What is Fit?",
    scope:
      "Quan hệ kích thước lỗ và trục; bài tập chỉ tính khe hở đường kính trong mô hình lý tưởng.",
    usage:
      "Footer All Rights Reserved; không thấy giấy phép mở. Chỉ liên kết, không sao chép hình hoặc bài ví dụ. Bài học không xác nhận độ bền, kiểu lắp chuẩn hoặc chất lượng cụm thật.",
  }),
];

type LessonDraft = Omit<
  Lesson,
  "revision" | "sourceStatus" | "expertReviewStatus" | "publicationScope"
>;
const lesson = (draft: LessonDraft): Lesson => ({
  ...draft,
  revision: 1,
  sourceStatus: "source-checked",
  expertReviewStatus: "none",
  publicationScope: "personal-preview",
});

export const advancedLessons: Lesson[] = [
  lesson({
    id: "C06",
    slug: "luc-va-chuyen-dong",
    title: "Lực và chuyển động nhập môn",
    deck: "Khoanh vật đang xét, cộng lực có hướng và đọc sự đổi vận tốc.",
    minutes: 12,
    group: "mechanics",
    prerequisites: ["C03", "C05"],
    conceptIds: ["force", "net-force", "acceleration"],
    objectives: [
      "Xác định vật đang xét và lực ngoài lên vật.",
      "Cộng hai lực thẳng hàng có hướng.",
      "Phân biệt hướng vận tốc với hướng gia tốc.",
    ],
    terms: [
      {
        term: "Lực",
        meaning: "Tác động có độ lớn và hướng, đơn vị N trong bài.",
      },
      { term: "Hợp lực", meaning: "Tổng có hướng của các lực đang xét." },
      {
        term: "Khối lượng",
        meaning: "Đại lượng m dùng trong quan hệ ΣF = ma, đơn vị kg.",
      },
      {
        term: "Vận tốc",
        meaning: "Mô tả mức độ và hướng thay đổi vị trí theo thời gian.",
      },
      {
        term: "Gia tốc",
        meaning: "Mức độ thay đổi vận tốc theo thời gian, đơn vị m/s².",
      },
    ],
    blocks: [
      {
        id: "C06-system",
        title: "Bắt đầu bằng vật đang xét",
        body: [
          "Trước khi vẽ lực, hãy khoanh vật hoặc hệ đang xét. Nếu xét chiếc xe, lực từ bàn tay người đẩy là lực ngoài lên xe. Nếu mở rộng hệ, cách phân loại trong/ngoài cũng thay đổi.",
          "Mũi tên cần nêu tác nhân, vật nhận tác động và hướng. Không cộng một tác động bên trong hệ thêm lần nữa như lực ngoài.",
        ],
        sourceRefs: ["os-force"],
        kind: "theory",
        diagram: "forces",
      },
      {
        id: "C06-net",
        title: "Cộng lực cùng một trục",
        body: [
          "Chọn chiều phải là dương. Lực 7 N sang phải và 3 N sang trái có tổng 7 − 3 = 4 N sang phải. Hai lực ngược chiều không cộng độ lớn như hai lực cùng chiều.",
          "Bài chỉ xét chuyển động thẳng và khối lượng không đổi. Quan hệ Newton là ΣF = ma: gia tốc cùng hướng hợp lực ngoài.",
        ],
        sourceRefs: ["os-force"],
        kind: "technical",
      },
      {
        id: "C06-velocity",
        title: "Gia tốc không phải vận tốc",
        body: [
          "Vật đang đi phải có thể chịu gia tốc trái; tại thời điểm đó nó đang chậm lại. Hợp lực không tự cho biết vật hiện đang đi theo hướng nào.",
          "Hợp lực bằng không cho gia tốc bằng không. Vật có thể đứng yên hoặc tiếp tục đi thẳng đều trong mô hình đang học. Ngộ nhận cần tránh: cứ có chuyển động là phải có hợp lực cùng chiều chuyển động.",
        ],
        sourceRefs: ["os-force"],
        kind: "theory",
      },
      {
        id: "C06-example",
        title: "Ví dụ tự soạn: xe nhỏ",
        body: [
          "Giả định giáo dục: xe 2 kg nhận lực kéo 7 N sang phải và lực cản 3 N sang trái; các lực đứng cân bằng. ΣFx = 7 − 3 = 4 N; ax = 4 / 2 = 2 m/s² sang phải.",
          "Kết quả là gia tốc, chưa phải vận tốc của xe. Muốn biết vận tốc sau một khoảng thời gian còn cần dữ kiện ban đầu và thời gian.",
        ],
        sourceRefs: ["os-force"],
        kind: "example",
      },
      {
        id: "C06-design",
        title: "Liên hệ thiết kế và cách kiểm",
        body: [
          "Một sơ đồ lực hữu ích vì làm rõ giả thiết trước phép tính. Hoạt cảnh đang chạy trên màn hình không tự chứng minh đã tính đúng lực hay tải sản phẩm.",
          "Trong hoạt động, dự đoán hướng hợp lực rồi mới kiểm. Khi sai, thử vẽ riêng từng mũi tên và quay lại C05 nếu nhầm chiều.",
        ],
        sourceRefs: ["os-force"],
        kind: "design",
      },
    ],
    activity: "forces",
    observation:
      "Quan sát một quyển sách đóng nằm yên trên bàn. Ghi vật đang xét và hai tác động: trọng trường, lực đỡ của bàn. Không suy ra giá trị lực chỉ từ ảnh. Ôn C05 nếu nhầm hướng; tiếp C07.",
    sourceRefs: ["os-force"],
    questions: [
      {
        id: "C06-Q1",
        kind: "choice",
        prompt: "Giả định xe nhận 9 N sang phải và 4 N sang trái. Hợp lực là?",
        choices: [
          { id: "right5", label: "5 N sang phải" },
          { id: "right13", label: "13 N sang phải" },
          { id: "left5", label: "5 N sang trái" },
        ],
        correct: "right5",
        rationale:
          "Chọn phải dương: 9 − 4 = 5 N. Hai lực ngược chiều phải trừ độ lớn.",
        sourceRefs: ["os-force"],
      },
      {
        id: "C06-Q2",
        kind: "numeric",
        prompt:
          "Giả định vật 3 kg chịu hợp lực 6 N. Nhập độ lớn gia tốc và đơn vị.",
        correct: 2,
        unit: "m/s²",
        tolerance: 0.01,
        rationale:
          "a = F/m = 6/3 = 2 m/s². m/s là đơn vị vận tốc, không phải gia tốc.",
        sourceRefs: ["os-force"],
      },
      {
        id: "C06-Q3",
        kind: "choice",
        prompt:
          "Một xe đang đi sang phải, gia tốc hướng trái. Kết luận đúng tại thời điểm đó?",
        choices: [
          { id: "slowing", label: "Xe đang chậm lại" },
          { id: "stopped", label: "Xe đã đứng yên" },
          { id: "left", label: "Xe chắc chắn đang đi trái" },
        ],
        correct: "slowing",
        rationale:
          "Gia tốc ngược vận tốc làm giảm độ lớn vận tốc tại thời điểm đã nêu; chưa thể nói xe đã đổi chiều.",
        sourceRefs: ["os-force"],
      },
      {
        id: "C06-Q4",
        kind: "choice",
        prompt:
          "Trong mô hình Newton, hợp lực ngoài bằng không. Vật có thể ở trạng thái nào?",
        choices: [
          { id: "rest", label: "Chỉ có thể đứng yên" },
          { id: "both", label: "Đứng yên hoặc đi thẳng đều" },
          { id: "speeding", label: "Bắt buộc tăng tốc" },
        ],
        correct: "both",
        rationale:
          "Hợp lực bằng không cho gia tốc bằng không; vận tốc có thể bằng không hoặc không đổi khác không.",
        sourceRefs: ["os-force"],
      },
    ],
  }),
  lesson({
    id: "C07",
    slug: "mo-men-va-canh-tay-don",
    title: "Mô-men qua cửa và cờ lê",
    deck: "Thử lực, khoảng cách và góc trong mô hình phẳng có giả thiết rõ.",
    minutes: 14,
    group: "mechanics",
    prerequisites: ["C03", "C05", "C06"],
    conceptIds: ["torque", "lever-arm", "force-angle"],
    objectives: [
      "Tính độ lớn mô-men với r tính bằng m.",
      "Xác định góc giữa r và F.",
      "Giải thích kết quả ở góc 0° và 90°.",
    ],
    terms: [
      {
        term: "Mô-men",
        meaning:
          "Đại lượng mô tả tác dụng làm quay của lực quanh điểm/trục đã nêu.",
      },
      {
        term: "Trục quay",
        meaning: "Trục tham chiếu để xét chuyển động quay.",
      },
      {
        term: "Vectơ r",
        meaning: "Nối từ điểm trên trục trong mặt phẳng bài tới điểm đặt lực.",
      },
      {
        term: "Cánh tay đòn",
        meaning: "Khoảng cách vuông góc từ trục tới đường tác dụng lực.",
      },
      { term: "Góc θ", meaning: "Góc giữa vectơ r và vectơ lực F." },
    ],
    blocks: [
      {
        id: "C07-pivot",
        title: "Nêu trục trước khi so sánh",
        body: [
          "Với cánh cửa, chọn trục qua bản lề. Vectơ r đi từ trục tới điểm tay tác dụng lực. Cùng một lực có thể tạo tác dụng làm quay khác nhau khi đổi điểm đặt.",
          "Góc θ trong bài đo giữa r và F; không mặc định là góc với sàn hay với phương ngang.",
        ],
        sourceRefs: ["os-torque"],
        kind: "theory",
        diagram: "torque",
      },
      {
        id: "C07-formula",
        title: "Công thức và đơn vị",
        body: [
          "Mô hình phẳng tính độ lớn: τ = rF sinθ = Fd, với d = r sinθ là cánh tay đòn vuông góc. Dùng r theo m, F theo N để được τ theo N·m.",
          "Bài không dùng số âm để biểu diễn chiều quay. Đổi mm sang m trước khi tính; cánh tay đòn d chỉ bằng r khi góc là 90°.",
        ],
        sourceRefs: ["os-torque"],
        kind: "technical",
      },
      {
        id: "C07-angle",
        title: "Hai góc cần tự kiểm",
        body: [
          "Giữ r và F dương không đổi: θ = 0° cho sinθ = 0 nên τ = 0. Với θ = 90°, sinθ = 1 nên độ lớn đạt rF, lớn nhất trong phép so sánh này.",
          "Ngộ nhận: áp dụng rF cho mọi góc. Mô-men và năng lượng là hai đại lượng khác nhau dù cùng thứ nguyên; trong bài mô-men được ghi N·m.",
        ],
        sourceRefs: ["os-torque"],
        kind: "theory",
      },
      {
        id: "C07-example",
        title: "Ví dụ tự soạn: tay đòn nghiêng",
        body: [
          "Giả định giáo dục: r = 250 mm = 0,25 m; F = 12 N; θ = 30°. τ = 0,25 × 12 × 0,5 = 1,5 N·m.",
          "Giữ nguyên lực và r, đổi góc thành 90° được 3 N·m. Đó là so sánh mô hình, không phải lực siết được khuyến cáo cho dụng cụ hay mối ghép thật.",
        ],
        sourceRefs: ["os-torque"],
        kind: "example",
      },
      {
        id: "C07-try",
        title: "Dự đoán rồi mới kiểm",
        body: [
          "Trong phòng thử, thay từng đại lượng trong khi giữ hai đại lượng kia. Hãy dự đoán mô-men tăng hay giảm rồi kiểm lại, đặc biệt tại 0° và 90°.",
          "Liên hệ thiết kế: tăng chiều dài tay đòn có thể tăng mô-men khi lực và góc giữ nguyên. Muốn đánh giá dụng cụ thật còn cần dữ liệu độ bền và điều kiện sử dụng.",
        ],
        sourceRefs: ["os-torque"],
        kind: "design",
      },
    ],
    activity: "torque",
    observation:
      "Quan sát một cánh cửa thường đang mở, tìm trục bản lề và điểm đặt tay bằng mắt. Vẽ r và hướng lực dự định trên giấy; không tháo, kéo quá mức hoặc chặn cửa. Ôn C03 khi sai đơn vị; tiếp C08.",
    sourceRefs: ["os-torque"],
    questions: [
      {
        id: "C07-Q1",
        kind: "numeric",
        prompt: "Giả định r = 200 mm, F = 15 N, θ = 90°. Nhập độ lớn mô-men.",
        correct: 3,
        unit: "N·m",
        tolerance: 0.01,
        rationale: "200 mm = 0,2 m. τ = 0,2 × 15 × sin90° = 3 N·m.",
        sourceRefs: ["os-torque"],
      },
      {
        id: "C07-Q2",
        kind: "choice",
        prompt: "Với r > 0 và F > 0 cố định, θ = 0° cho mô-men bằng?",
        choices: [
          { id: "zero", label: "0" },
          { id: "rF", label: "rF" },
          { id: "maximum", label: "Giá trị lớn nhất" },
        ],
        correct: "zero",
        rationale:
          "sin0° = 0. Trong mô hình phẳng này, đường tác dụng lực đi qua trục nên cánh tay đòn bằng không.",
        sourceRefs: ["os-torque"],
      },
      {
        id: "C07-Q3",
        kind: "choice",
        prompt:
          "Cùng lực và góc 90°, đổi r từ 0,1 m thành 0,3 m. Mô-men thay đổi thế nào?",
        choices: [
          { id: "three", label: "Gấp 3" },
          { id: "nine", label: "Gấp 9" },
          { id: "same", label: "Không đổi" },
        ],
        correct: "three",
        rationale: "Khi F và θ giữ nguyên, τ tỉ lệ với r; 0,3/0,1 = 3.",
        sourceRefs: ["os-torque"],
      },
      {
        id: "C07-Q4",
        kind: "choice",
        prompt:
          "Trong τ = rF sinθ của bài này, θ được đo giữa những hướng nào?",
        choices: [
          { id: "rF", label: "Vectơ r và vectơ F" },
          { id: "horizontal", label: "F và phương ngang trong mọi trường hợp" },
          { id: "axis", label: "r và trục quay" },
        ],
        correct: "rF",
        rationale:
          "Công thức định nghĩa θ là góc giữa r và F; phải kiểm đúng định nghĩa góc trên sơ đồ.",
        sourceRefs: ["os-torque"],
      },
    ],
  }),
  lesson({
    id: "C08",
    slug: "ma-sat-va-o-do",
    title: "Ma sát và chức năng ổ đỡ",
    deck: "Phân biệt khái niệm chung với loại ổ thực sự có bằng chứng.",
    minutes: 12,
    group: "mechanics",
    prerequisites: ["C02", "C06"],
    conceptIds: ["friction", "bearings", "evidence"],
    objectives: [
      "Phân biệt tiếp xúc đang trượt và chưa trượt.",
      "Nêu chức năng đỡ tải và dẫn hướng của ổ đỡ.",
      "Nhận ra khi chưa đủ bằng chứng xác định loại ổ.",
    ],
    terms: [
      {
        term: "Ma sát nghỉ",
        meaning: "Ma sát khi hai bề mặt chưa trượt tương đối; có giới hạn.",
      },
      {
        term: "Ma sát trượt",
        meaning: "Ma sát khi hai bề mặt đang trượt tương đối.",
      },
      {
        term: "Ổ trượt",
        meaning: "Ổ có chuyển động trượt giữa các bề mặt làm việc.",
      },
      {
        term: "Ổ lăn",
        meaning: "Ổ dùng phần tử lăn giữa các bề mặt làm việc.",
      },
      { term: "Tải hướng kính", meaning: "Thành phần tải vuông góc với trục." },
    ],
    blocks: [
      {
        id: "C08-contact",
        title: "Ma sát xét tại tiếp xúc",
        body: [
          "Ma sát tiếp xúc chống lại sự trượt tương đối hoặc xu hướng trượt của hai bề mặt. Nếu hộp chưa trượt, ta xét ma sát nghỉ; khi hai mặt đang trượt, xét ma sát trượt.",
          "Ma sát có ích trong việc bám khi đi lại. Vì vậy “giảm mọi ma sát” không phải mục tiêu đúng cho mọi chức năng.",
        ],
        sourceRefs: ["os-friction"],
        kind: "theory",
      },
      {
        id: "C08-limit",
        title: "Ma sát nghỉ không luôn đạt cực đại",
        body: [
          "Trong mô hình thực nghiệm đơn giản, fs ≤ μsN. Ma sát nghỉ đáp ứng lực đang tác dụng cho tới giới hạn; dấu ≤ có ý nghĩa, không thể luôn thay bằng dấu =.",
          "Giả định chỉ có hai lực ngang đối nhau và hộp đứng yên: lực ma sát ngang cân bằng lực đẩy. Những hệ tiếp xúc phức tạp có thể cần mô hình khác.",
        ],
        sourceRefs: ["os-friction"],
        kind: "technical",
      },
      {
        id: "C08-bearing",
        title: "Ổ đỡ làm gì?",
        body: [
          "Ổ đỡ truyền tải giữa các phần chuyển động tương đối và giúp định vị hoặc dẫn hướng chúng. Giảm ma sát là một phần chức năng; ổ lăn không có nghĩa là hoàn toàn không ma sát.",
          "Ổ trượt dùng chuyển động trượt; ổ lăn có phần tử lăn. Hình dạng vỏ động cơ không đủ xác định loại ổ ở bên trong. Cần tài liệu đúng mẫu hoặc quan sát cấu tạo phù hợp.",
        ],
        sourceRefs: ["skf-bearing-basics"],
        kind: "theory",
        diagram: "bearings",
      },
      {
        id: "C08-example",
        title: "Ví dụ tự soạn: chưa tới giới hạn",
        body: [
          "Giả định giáo dục: giới hạn ma sát nghỉ của hộp là 8 N. Lực đẩy ngang 3 N, hộp đứng yên và không có lực ngang nào khác. Ma sát nghỉ là 3 N ngược chiều đẩy, chưa phải 8 N.",
          "Nếu một sơ đồ giáo dục khai báo hai vòng và các viên bi lăn giữa chúng, có căn cứ gọi đó là ổ lăn. Kết luận này chỉ áp dụng cấu tạo đã cho.",
        ],
        sourceRefs: ["os-friction", "skf-bearing-basics"],
        kind: "example",
      },
      {
        id: "C08-evidence",
        title: "Giữ ranh giới bằng chứng",
        body: [
          "Ngộ nhận thường gặp: thấy một trục quay liền kết luận có ổ bi. Loại ổ còn phụ thuộc thiết kế, tải, tốc độ và điều kiện khác; không suy từ một sản phẩm sang mọi sản phẩm.",
          "Trong hoạt động, ghép “đỡ tải và dẫn hướng trục” với ổ đỡ trong sơ đồ giả định. Sau đó ghi một điều cần tài liệu mới xác nhận được.",
        ],
        sourceRefs: ["skf-bearing-basics"],
        kind: "design",
      },
    ],
    activity: "bearings",
    observation:
      "Quan sát bánh xe đồ chơi còn nguyên. Ghi riêng phần nhìn thấy và điều chưa biết về chỗ đỡ trục; không tháo thiết bị điện. Ôn C02 về chức năng; tiếp C09.",
    sourceRefs: ["os-friction", "skf-bearing-basics"],
    questions: [
      {
        id: "C08-Q1",
        kind: "choice",
        prompt:
          "Giả định hộp đứng yên, chỉ có lực đẩy ngang 4 N và ma sát ngang. Giới hạn nghỉ 10 N. Độ lớn ma sát hiện tại?",
        choices: [
          { id: "four", label: "4 N" },
          { id: "ten", label: "10 N" },
          { id: "zero", label: "0 N" },
        ],
        correct: "four",
        rationale:
          "Cân bằng ngang đòi hỏi ma sát 4 N ngược lực đẩy; giới hạn 10 N chưa đạt.",
        sourceRefs: ["os-friction"],
      },
      {
        id: "C08-Q2",
        kind: "choice",
        prompt: "Chức năng phù hợp của ổ đỡ trong mô tả chung là?",
        choices: [
          { id: "support", label: "Đỡ tải và dẫn hướng bộ phận chuyển động" },
          { id: "electricity", label: "Luôn tạo ra điện" },
          { id: "lock", label: "Luôn khóa cứng trục" },
        ],
        correct: "support",
        rationale:
          "Ổ đỡ truyền tải, định vị hoặc dẫn hướng các phần chuyển động tương đối; không luôn khóa trục.",
        sourceRefs: ["skf-bearing-basics"],
      },
      {
        id: "C08-Q3",
        kind: "choice",
        prompt: "Ảnh vỏ động cơ không thấy ổ. Kết luận nào có cơ sở?",
        choices: [
          { id: "unknown", label: "Chưa xác định được loại ổ bên trong" },
          { id: "ball", label: "Chắc chắn có ổ bi" },
          { id: "none", label: "Chắc chắn không có ổ đỡ" },
        ],
        correct: "unknown",
        rationale:
          "Phần bị che chưa có bằng chứng. Cần hồ sơ đúng mẫu hoặc quan sát cấu tạo thích hợp.",
        sourceRefs: ["skf-bearing-basics"],
      },
      {
        id: "C08-Q4",
        kind: "multi",
        prompt:
          "Chọn TẤT CẢ nhận định đúng trong phạm vi bài học; phải chọn đủ và không chọn thừa.",
        choices: [
          { id: "rolling", label: "Ổ lăn có phần tử lăn" },
          { id: "support", label: "Ổ đỡ có thể truyền tải và dẫn hướng" },
          { id: "zero", label: "Ổ lăn bảo đảm ma sát bằng không" },
          { id: "allfans", label: "Mọi quạt đều dùng cùng một loại ổ" },
        ],
        correct: ["rolling", "support"],
        rationale:
          "Hai nhận định đầu là mô tả chung có căn cứ. Không có bảo đảm ma sát bằng không và không có bằng chứng mọi quạt dùng cùng loại ổ.",
        sourceRefs: ["skf-bearing-basics"],
      },
    ],
  }),
  lesson({
    id: "C09",
    slug: "vat-lieu-va-yeu-cau",
    title: "Vật liệu và yêu cầu chức năng",
    deck: "So sánh từ dữ liệu và điều kiện thử, giữ điều chưa biết.",
    minutes: 12,
    group: "design",
    prerequisites: ["C02", "C03"],
    conceptIds: ["requirements", "deformation", "materials"],
    objectives: [
      "Viết một yêu cầu kiểm được và có điều kiện.",
      "So sánh hai ứng viên từ bảng dữ liệu giả định.",
      "Phân biệt hồi phục đàn hồi với biến dạng dư.",
    ],
    terms: [
      {
        term: "Yêu cầu chức năng",
        meaning: "Điều chi tiết cần đạt trong điều kiện đã nêu.",
      },
      {
        term: "Biến dạng",
        meaning: "Sự thay đổi hình dạng hoặc kích thước do tác động.",
      },
      {
        term: "Độ cứng vững",
        meaning:
          "Khả năng chống biến dạng của chi tiết hoặc kết cấu trong điều kiện xét.",
      },
      {
        term: "Đàn hồi",
        meaning:
          "Hồi về hình dạng/kích thước ban đầu khi bỏ tải trong phạm vi thích hợp.",
      },
      {
        term: "Biến dạng dư",
        meaning: "Phần biến dạng còn lại sau khi bỏ tải.",
      },
    ],
    blocks: [
      {
        id: "C09-requirement",
        title: "Bắt đầu từ yêu cầu",
        body: [
          "Hãy hỏi chi tiết cần làm gì, chịu tác động nào và ở điều kiện nào trước khi chọn tên vật liệu. “Võng không quá 1 mm dưới tải thử được mô tả” rõ hơn “vật liệu tốt”.",
          "Trong bài, các ứng viên A/B chỉ là dữ liệu giáo dục giả định. Chúng không đại diện một mác vật liệu thương mại hoặc bộ phận quạt.",
        ],
        sourceRefs: ["os-elastic-modulus"],
        kind: "design",
      },
      {
        id: "C09-deform",
        title: "Tải và sự đổi hình",
        body: [
          "Tải có thể làm vật thay đổi hình hoặc kích thước. Trong miền đàn hồi thích hợp, bỏ tải thì vật hồi phục; nếu vượt giới hạn, có thể còn biến dạng dư.",
          "Hồi phục sau bỏ tải khác với chưa từng biến dạng. Một mẫu nhìn vẫn nguyên vẹn cũng chưa đủ chứng minh không có thay đổi kích thước.",
        ],
        sourceRefs: ["os-elasticity"],
        kind: "theory",
      },
      {
        id: "C09-stiffness",
        title: "Phân biệt vật liệu và chi tiết",
        body: [
          "Trong miền tuyến tính, cùng ứng suất thì mô-đun đàn hồi lớn cho biến dạng tương đối nhỏ hơn. Độ cứng vững của cả chi tiết còn phụ thuộc hình dạng, kích thước và cách giữ.",
          "Không thể chỉ đổi tên vật liệu trong CAD rồi coi là đã chứng minh mọi yêu cầu. Ngộ nhận: mẫu nặng hơn luôn cứng vững hơn ở mọi hình dạng, hoặc có thể đoán mác vật liệu từ màu.",
        ],
        sourceRefs: ["os-elastic-modulus", "os-elasticity"],
        kind: "technical",
        diagram: "materials",
      },
      {
        id: "C09-example",
        title: "Ví dụ tự soạn: hai tiêu chí",
        body: [
          "Giả định giáo dục: mẫu có cùng hình dạng, cách giữ và tải thử. Yêu cầu khối lượng ≤100 g, độ võng ≤1 mm. A: 80 g, võng 1,4 mm. B: 95 g, võng 0,8 mm.",
          "B đạt cả hai tiêu chí đã cho vì 95 ≤100 và 0,8 ≤1. A nhẹ hơn nhưng vượt giới hạn võng. Chưa có dữ liệu để kết luận chịu nhiệt hay tuổi thọ của B.",
        ],
        sourceRefs: ["os-elastic-modulus"],
        kind: "example",
      },
      {
        id: "C09-record",
        title: "Ghi cả dữ kiện còn thiếu",
        body: [
          "Khi chọn ứng viên, chỉ chấm tiêu chí có dữ liệu. Với điều chưa có hồ sơ đúng chi tiết hoặc thử phù hợp, ghi “chưa biết” và nêu dữ liệu cần bổ sung.",
          "Trong hoạt động, chọn mẫu đạt bảng giả định rồi viết một câu giới hạn kết luận. Ôn C02 nếu chưa nêu được chức năng; có thể tiếp C10 mà không cần tính bền nâng cao.",
        ],
        sourceRefs: ["os-elastic-modulus", "os-elasticity"],
        kind: "design",
      },
    ],
    activity: "materials",
    observation:
      "Chọn hai đồ gia dụng nguyên vẹn. Viết một yêu cầu có điều kiện kiểm cho mỗi đồ; ghi “chưa biết” cho mác vật liệu chưa có hồ sơ. Không tự tạo thí nghiệm tải nguy hiểm.",
    sourceRefs: ["os-elastic-modulus", "os-elasticity"],
    questions: [
      {
        id: "C09-Q1",
        kind: "choice",
        prompt:
          "Giả định yêu cầu ≤100 g và võng ≤1 mm. A: 80 g, 1,4 mm; B: 95 g, 0,8 mm. Mẫu nào đạt cả hai?",
        choices: [
          { id: "a", label: "A" },
          { id: "b", label: "B" },
          { id: "both", label: "Cả hai" },
        ],
        correct: "b",
        rationale:
          "B đạt 95 ≤100 g và 0,8 ≤1 mm. A vượt giới hạn võng dù nhẹ hơn. Dữ kiện là giả định giáo dục.",
        sourceRefs: ["os-elastic-modulus"],
      },
      {
        id: "C09-Q2",
        kind: "choice",
        prompt:
          "Chỉ biết B đạt hai tiêu chí trong bảng giả định. Có thể kết luận B chịu mọi nhiệt độ không?",
        choices: [
          { id: "yes", label: "Có" },
          { id: "no", label: "Không" },
        ],
        correct: "no",
        rationale:
          "Bảng không cung cấp nhiệt độ hoặc dữ liệu thử nhiệt. Không mở rộng kết luận vượt dữ kiện.",
        sourceRefs: ["os-elastic-modulus"],
      },
      {
        id: "C09-Q3",
        kind: "choice",
        prompt:
          "Trong điều kiện thử đã nêu, mẫu hồi về kích thước ban đầu khi bỏ tải. Mô tả phù hợp?",
        choices: [
          { id: "elastic", label: "Hồi phục đàn hồi" },
          { id: "permanent", label: "Chắc chắn có biến dạng dư" },
          { id: "never", label: "Mẫu chưa từng biến dạng" },
        ],
        correct: "elastic",
        rationale:
          "Đàn hồi là hồi phục khi bỏ tải; không có nghĩa mẫu chưa từng đổi hình trong khi chịu tải.",
        sourceRefs: ["os-elasticity"],
      },
      {
        id: "C09-Q4",
        kind: "open",
        prompt:
          "Một chi tiết nhìn màu bạc. Hãy giải thích vì sao chưa thể chọn đúng mác vật liệu và nêu một loại bằng chứng cần tìm. Tự đối chiếu theo tiêu chí sau nộp.",
        correct: "",
        rubric: [
          "Nêu màu/ảnh bên ngoài chưa định danh được mác vật liệu.",
          "Đề xuất hồ sơ đúng chi tiết, chứng chỉ vật liệu hoặc phép kiểm vật liệu phù hợp.",
          "Giữ kết luận ở mức chưa xác định khi chưa có dữ liệu; không đoán một mác cụ thể.",
        ],
        rationale:
          "Câu mở dùng tự đối chiếu, không chấm chuyên gia tự động. Một câu hợp lý phải phân biệt quan sát bên ngoài với bằng chứng xác định vật liệu đúng mẫu.",
        sourceRefs: ["os-elastic-modulus", "os-elasticity"],
      },
    ],
  }),
  lesson({
    id: "C10",
    slug: "phuong-phap-che-tao",
    title: "Phương pháp chế tạo cơ bản",
    deck: "Phân nhóm theo cơ chế và giải thích phương án có điều kiện.",
    minutes: 12,
    group: "design",
    prerequisites: ["C01", "C04", "C09"],
    conceptIds: ["manufacturing", "casting", "machining", "forming"],
    objectives: [
      "Ghép mô tả với đúc, cắt gọt và tạo hình.",
      "Giải thích vì sao có thể phối hợp công đoạn.",
      "Phân biệt dựng hình CAD với hồ sơ chế tạo.",
    ],
    terms: [
      {
        term: "Đúc",
        meaning: "Cho kim loại lỏng vào khuôn rồi để đông đặc theo hình khuôn.",
      },
      {
        term: "Cắt gọt",
        meaning: "Lấy bớt vật liệu khỏi phôi để tạo hình/bề mặt.",
      },
      {
        term: "Tạo hình",
        meaning: "Làm đổi hình bằng biến dạng, ví dụ uốn, cán, rèn.",
      },
      {
        term: "Phôi",
        meaning: "Vật liệu hoặc hình dạng ban đầu cho công đoạn đang xét.",
      },
      {
        term: "Hoàn thiện",
        meaning: "Công đoạn tiếp để đạt yêu cầu bề mặt/kích thước đã nêu.",
      },
    ],
    blocks: [
      {
        id: "C10-groups",
        title: "Ba nhóm mở đầu",
        body: [
          "Đúc: kim loại ở trạng thái lỏng đi vào khuôn rồi đông đặc. Cắt gọt: lấy bớt vật liệu khỏi phôi. Tạo hình: dùng biến dạng để đổi hình, như uốn tấm hoặc cán.",
          "Đây là ba nhóm chế tạo kim loại nhập môn, không phải danh mục mọi công nghệ. Cần đọc mô tả quá trình trước khi ghép tên.",
        ],
        sourceRefs: ["delft-manufacturing"],
        kind: "theory",
        diagram: "manufacturing",
      },
      {
        id: "C10-conditions",
        title: "Hình dạng gợi ý, chưa xác nhận",
        body: [
          "Một lỗ tròn trên ảnh chưa chứng minh nó được khoan; nhiều phương án có thể tạo ra ngoại hình tương tự. Phương án phù hợp còn cần vật liệu, yêu cầu và điều kiện sản xuất.",
          "Khi đề không khai báo phương pháp thực, hãy nói “một phương án có thể” và nêu điều kiện. Không đổi giả thuyết thành lịch sử chế tạo đã xác minh.",
        ],
        sourceRefs: ["delft-manufacturing"],
        kind: "design",
      },
      {
        id: "C10-sequence",
        title: "Một chi tiết, nhiều công đoạn",
        body: [
          "Có thể đúc phôi rồi gia công mặt lắp. Hình ban đầu và bề mặt yêu cầu chính xác có thể cần các công đoạn khác nhau; dung sai và hoàn thiện phải được xét.",
          "Bản vẽ exploded chỉ cho quan hệ vị trí các phần trong cách trình bày đó, chưa tự là quy trình chế tạo hoặc thứ tự tháo an toàn.",
        ],
        sourceRefs: ["delft-manufacturing"],
        kind: "technical",
      },
      {
        id: "C10-example",
        title: "Ví dụ tự soạn: giá chữ L",
        body: [
          "Giả định giáo dục: đã có phôi tấm phù hợp, bản thiết kế cho phép uốn và yêu cầu hai lỗ. Uốn là một phương án tạo góc L có lý do vì vật liệu đầu vào đã được khai báo dạng tấm.",
          "Đề không đủ để chốt thứ tự tạo lỗ, cắt và uốn trong xưởng. Kế hoạch thật còn phụ thuộc thiết kế công nghệ và dụng cụ. Đây không phải hướng dẫn vận hành máy.",
        ],
        sourceRefs: ["delft-manufacturing"],
        kind: "example",
      },
      {
        id: "C10-cad",
        title: "CAD mô tả hình học",
        body: [
          "Lệnh Extrude trong phần mềm tạo hình học từ biên dạng. Nó không tự chứng minh vật thật được ép đùn. Tương tự, một hình lỗ trong model không phải bằng chứng đã khoan.",
          "Trong hoạt động, phân loại các mô tả có dữ kiện rồi viết một lý do. Khi chỉ có ảnh, nêu điều cần tìm thêm thay vì đoán duy nhất một phương pháp.",
        ],
        sourceRefs: ["delft-manufacturing"],
        kind: "design",
      },
    ],
    activity: "manufacturing",
    observation:
      "Quan sát một chiếc thìa hoặc giá đỡ nguyên vẹn. Nêu hai phương án chế tạo có thể và ghi rõ chưa biết phương án thực. Không dùng ảnh để khẳng định công nghệ. Ôn C09; tiếp C11 hoặc C12.",
    sourceRefs: ["delft-manufacturing"],
    questions: [
      {
        id: "C10-Q1",
        kind: "matching",
        prompt:
          "Ghép từng mô tả được khai báo với nhóm chế tạo. Mỗi mô tả có một đáp án.",
        items: [
          { id: "liquid", label: "Kim loại lỏng vào khuôn rồi đông đặc" },
          { id: "chips", label: "Cắt bỏ vật liệu thành phoi" },
          { id: "bend", label: "Uốn một tấm để đổi hình" },
        ],
        choices: [
          { id: "cast", label: "Đúc" },
          { id: "machine", label: "Cắt gọt" },
          { id: "form", label: "Tạo hình" },
        ],
        correct: { liquid: "cast", chips: "machine", bend: "form" },
        rationale:
          "Phân nhóm theo cơ chế đã mô tả: điền khuôn bằng kim loại lỏng, loại bớt vật liệu, hoặc làm biến dạng.",
        sourceRefs: ["delft-manufacturing"],
      },
      {
        id: "C10-Q2",
        kind: "choice",
        prompt:
          "Đề khai báo một chi tiết dùng phôi đúc rồi gia công mặt lắp. Hai công đoạn này có mâu thuẫn không?",
        choices: [
          {
            id: "yes",
            label: "Có, mỗi chi tiết chỉ được dùng một phương pháp",
          },
          { id: "no", label: "Không, có thể phối hợp công đoạn" },
        ],
        correct: "no",
        rationale:
          "Tạo phôi và hoàn thiện có thể dùng các công đoạn khác nhau để đáp ứng yêu cầu; không có quy tắc chỉ một công đoạn.",
        sourceRefs: ["delft-manufacturing"],
      },
      {
        id: "C10-Q3",
        kind: "choice",
        prompt:
          "Model dùng lệnh Extrude chứng minh vật thật được ép đùn. Đúng hay sai?",
        choices: [
          { id: "true", label: "Đúng" },
          { id: "false", label: "Sai" },
        ],
        correct: "false",
        rationale:
          "Lịch sử dựng hình CAD mô tả cách tạo hình học; hồ sơ công nghệ mới cung cấp bằng chứng cách chế tạo vật thật.",
        sourceRefs: ["delft-manufacturing"],
      },
      {
        id: "C10-Q4",
        kind: "choice",
        prompt: "Chỉ có ảnh mặt ngoài một lỗ tròn. Kết luận nào phù hợp?",
        choices: [
          { id: "drill", label: "Chắc chắn khoan" },
          {
            id: "unknown",
            label: "Có thể nêu giả thuyết, chưa xác nhận cách tạo lỗ",
          },
          { id: "cast", label: "Chắc chắn đúc" },
        ],
        correct: "unknown",
        rationale:
          "Ngoại hình tương tự có thể đến từ các phương án khác nhau. Cần dữ kiện về quá trình hoặc tài liệu đúng chi tiết.",
        sourceRefs: ["delft-manufacturing"],
      },
    ],
  }),
  lesson({
    id: "C11",
    slug: "vat-the-va-hinh-chieu",
    title: "Từ vật thể sang hình chiếu",
    deck: "Giữ hướng nhìn nhất quán và đọc đúng quy ước góc chiếu thứ ba.",
    minutes: 13,
    group: "design",
    prerequisites: ["C04", "C05"],
    conceptIds: ["orthographic", "projection", "third-angle"],
    objectives: [
      "Nhận ra hai chiều xuất hiện theo một hướng nhìn.",
      "Ghép hình đứng, bằng và cạnh phải của khối hộp.",
      "Nêu rõ quy ước bố trí hình chiếu đang dùng.",
    ],
    terms: [
      {
        term: "Hình chiếu trực giao",
        meaning: "Biểu diễn theo hướng nhìn vuông góc với mặt phẳng chiếu.",
      },
      { term: "Hình đứng", meaning: "Hình theo hướng trước đã chọn." },
      {
        term: "Hình bằng",
        meaning: "Hình nhìn từ trên theo hướng đã quy định.",
      },
      {
        term: "Hình cạnh phải",
        meaning: "Hình nhìn từ phía phải của vật theo quy định.",
      },
      {
        term: "Góc chiếu thứ ba",
        meaning:
          "Quy ước trong bài: hình bằng ở trên, cạnh phải ở phải hình đứng.",
      },
    ],
    blocks: [
      {
        id: "C11-view",
        title: "Hướng nhìn là dữ kiện",
        body: [
          "Một hình chiếu biểu diễn hai chiều theo hướng nhìn đã chọn. Để ghép đúng, giữ nhất quán phía trước, bên phải và phía trên của vật giữa các hình.",
          "Không quay riêng vật trong từng đáp án để làm nó giống hình mẫu. Nếu đổi hướng trước thì phải khai báo lại hướng của cả bộ hình.",
        ],
        sourceRefs: ["sw-intro-views"],
        kind: "theory",
        diagram: "projection",
      },
      {
        id: "C11-convention",
        title: "Bài dùng góc chiếu thứ ba",
        body: [
          "Trong quy ước của bài, hình bằng nằm trên hình đứng và hình cạnh phải nằm bên phải hình đứng. Hãy đọc nhãn quy ước trước khi ghép.",
          "Không áp dụng vị trí này cho mọi bản vẽ vì còn quy ước khác. Tài liệu đối chiếu là Introducing SOLIDWORKS 2015; bài chỉ học nguyên lý hình chiếu, không xác nhận giao diện 2025.",
        ],
        sourceRefs: ["sw-intro-views"],
        kind: "technical",
      },
      {
        id: "C11-dimensions",
        title: "Theo dõi chiều chung",
        body: [
          "Giả định khối có chiều rộng X, sâu Y và cao Z. Nhìn trước theo chiều sâu thì thấy X và Z; nhìn trên thì thấy X và Y; nhìn phải thì thấy Y và Z.",
          "Các hình của hoạt động dùng cùng tỉ lệ. Dùng chiều chung để kiểm lại: hình đứng và bằng cùng chứa X; hình đứng và cạnh cùng chứa Z.",
        ],
        sourceRefs: ["sw-intro-views"],
        kind: "theory",
      },
      {
        id: "C11-example",
        title: "Ví dụ tự soạn: khối hộp đặc",
        body: [
          "Giả định giáo dục: hộp đặc, không lỗ, X = 60 mm, Y = 40 mm, Z = 20 mm. Hình đứng là chữ nhật 60×20; hình bằng 60×40; hình cạnh phải 40×20.",
          "Các kích thước là dữ liệu đề, không phải phép đo từ mesh. Một hình chữ nhật duy nhất chưa đủ phân biệt mọi vật thể 3D có thể tạo ra nó.",
        ],
        sourceRefs: ["sw-intro-views"],
        kind: "example",
      },
      {
        id: "C11-check",
        title: "Kiểm trước khi kết luận",
        body: [
          "Ngộ nhận: dùng phối cảnh để thay đổi kích thước của một hình chiếu, hoặc đảo vị trí hình nhưng không kiểm quy ước. Hình trục đo giúp hình dung, song không thay mọi hướng cần để mô tả.",
          "Trong hoạt động, ghép ba hướng bằng nút chọn và đọc lời giải. Khi sai, quay lại trục X/Y/Z ở C05 rồi kiểm cặp chiều tương ứng.",
        ],
        sourceRefs: ["sw-intro-views"],
        kind: "design",
      },
    ],
    activity: "projection",
    observation:
      "Chọn một hộp chữ nhật nguyên vẹn. Đánh dấu hướng trước trên giấy rồi phác ba hình theo góc chiếu thứ ba, ghi tên hướng. Không suy đoán cấu tạo bị che. Ôn C05; tiếp C12.",
    sourceRefs: ["sw-intro-views"],
    questions: [
      {
        id: "C11-Q1",
        kind: "matching",
        prompt:
          "Giả định hộp X=60, Y=40, Z=20 mm; nhìn trước theo chiều sâu Y. Ghép ba hướng với kích thước hình.",
        items: [
          { id: "front", label: "Hình đứng" },
          { id: "top", label: "Hình bằng" },
          { id: "right", label: "Hình cạnh phải" },
        ],
        choices: [
          { id: "xz", label: "60×20 mm" },
          { id: "xy", label: "60×40 mm" },
          { id: "yz", label: "40×20 mm" },
        ],
        correct: { front: "xz", top: "xy", right: "yz" },
        rationale:
          "Hình đứng chứa X/Z, hình bằng X/Y, hình cạnh phải Y/Z theo hướng đã khai báo.",
        sourceRefs: ["sw-intro-views"],
      },
      {
        id: "C11-Q2",
        kind: "choice",
        prompt:
          "Theo góc chiếu thứ ba được quy định trong bài, hình bằng ở đâu so với hình đứng?",
        choices: [
          { id: "above", label: "Phía trên" },
          { id: "below", label: "Phía dưới" },
          { id: "left", label: "Luôn bên trái" },
        ],
        correct: "above",
        rationale:
          "Góc chiếu thứ ba bố trí hình bằng trên hình đứng. Phải nêu quy ước vì bản vẽ khác có thể dùng cách khác.",
        sourceRefs: ["sw-intro-views"],
      },
      {
        id: "C11-Q3",
        kind: "choice",
        prompt:
          "Với hộp X=60, Y=40, Z=20 mm như ví dụ, hình đứng và hình bằng cùng chứa chiều nào?",
        choices: [
          { id: "x", label: "Chiều rộng X = 60 mm" },
          { id: "y", label: "Chiều sâu Y = 40 mm" },
          { id: "z", label: "Chiều cao Z = 20 mm" },
        ],
        correct: "x",
        rationale:
          "Hình đứng X/Z và hình bằng X/Y cùng chứa X; đây là cách kiểm chiều chung trong bài.",
        sourceRefs: ["sw-intro-views"],
      },
      {
        id: "C11-Q4",
        kind: "choice",
        prompt:
          "Một hình chiếu chữ nhật duy nhất đủ xác định mọi vật thể 3D. Đúng hay sai?",
        choices: [
          { id: "true", label: "Đúng" },
          { id: "false", label: "Sai" },
        ],
        correct: "false",
        rationale:
          "Nhiều vật thể có thể cho cùng một hình chiếu; cần thêm hướng hoặc dữ kiện phù hợp để xác định.",
        sourceRefs: ["sw-intro-views"],
      },
    ],
  }),
  lesson({
    id: "C12",
    slug: "dung-sai-va-tu-duy-lap",
    title: "Dung sai nhập môn và tư duy lắp",
    deck: "Đọc khoảng kích thước và tính trường hợp khe hở nhỏ nhất.",
    minutes: 14,
    group: "design",
    prerequisites: ["C03", "C04"],
    conceptIds: ["tolerance", "limits", "clearance"],
    objectives: [
      "Đổi một kích thước ± thành hai giới hạn.",
      "Phân biệt sai lệch một phía với độ rộng cả khoảng.",
      "Tính khe hở đường kính biên trong mô hình giả định.",
    ],
    terms: [
      {
        term: "Kích thước danh nghĩa",
        meaning: "Giá trị tham chiếu để ghi kích thước và sai lệch.",
      },
      {
        term: "Sai lệch",
        meaning: "Lượng chênh so với giá trị tham chiếu đã nêu.",
      },
      {
        term: "Giới hạn dưới",
        meaning: "Kích thước nhỏ nhất của khoảng được cho.",
      },
      {
        term: "Giới hạn trên",
        meaning: "Kích thước lớn nhất của khoảng được cho.",
      },
      {
        term: "Khe hở đường kính",
        meaning: "Trong bài, đường kính lỗ trừ đường kính trục.",
      },
    ],
    blocks: [
      {
        id: "C12-range",
        title: "Đọc thành một khoảng",
        body: [
          "Khi đề ghi 20 ±0,1 mm, lấy 20−0,1 = 19,9 mm và 20+0,1 = 20,1 mm để được khoảng. Không yêu cầu mọi số đo đều đúng tuyệt đối 20 mm.",
          "Độ rộng khoảng là 20,1−19,9 = 0,2 mm. Đừng nhầm độ rộng cả khoảng với sai lệch một phía 0,1 mm.",
        ],
        sourceRefs: ["keyence-tolerance"],
        kind: "theory",
        diagram: "tolerance",
      },
      {
        id: "C12-function",
        title: "Giới hạn gắn với chức năng",
        body: [
          "Dung sai cần phù hợp chức năng cần đạt. Một khoảng kích thước chưa tự là toàn bộ yêu cầu hình học, bề mặt hoặc điều kiện sử dụng của chi tiết.",
          "Bài không gán mã lắp ghép ISO hay cấp chính xác chưa đối chiếu. Các số dưới đây là giả định giáo dục để học cách đọc khoảng.",
        ],
        sourceRefs: ["keyence-tolerance", "keyence-fit"],
        kind: "design",
      },
      {
        id: "C12-clearance",
        title: "Ghép hai trường hợp biên",
        body: [
          "Giả định lỗ và trục trụ lý tưởng, cùng điều kiện nhiệt, không xét sai số hình học: khe hở đường kính nhỏ nhất = lỗ nhỏ nhất − trục lớn nhất.",
          "Khe hở lớn nhất = lỗ lớn nhất − trục nhỏ nhất. Trường hợp chặt nhất không nhất thiết xảy ra ở các kích thước danh nghĩa.",
        ],
        sourceRefs: ["keyence-fit"],
        kind: "technical",
      },
      {
        id: "C12-example",
        title: "Ví dụ tự soạn: hai khoảng",
        body: [
          "Giả định giáo dục: lỗ 10,10–10,20 mm; trục 10,00–10,05 mm. Khe hở nhỏ nhất = 10,10−10,05 = 0,05 mm; lớn nhất = 10,20−10,00 = 0,20 mm.",
          "Trong mô hình này khe hở đường kính luôn dương. Chưa thể kết luận cụm thật lắp dễ, bền hoặc quay tốt vì chưa xét những yêu cầu khác.",
        ],
        sourceRefs: ["keyence-tolerance", "keyence-fit"],
        kind: "example",
      },
      {
        id: "C12-grading",
        title: "Phân biệt dung sai và độ lệch chấm số",
        body: [
          "Dung sai chế tạo ở trong đề; độ lệch cho phép khi nhập đáp án chỉ là quy tắc bộ chấm. Chấp nhận đáp án gần 0,05 mm không làm thay đổi giới hạn chi tiết.",
          "Phép tính bài dùng dữ liệu lý tưởng, chưa áp dụng quyết định đo có độ không đảm bảo. Khi quan sát đồ thật, không dùng bài này để chứng nhận sản phẩm đạt dung sai.",
        ],
        sourceRefs: ["keyence-tolerance", "keyence-fit"],
        kind: "technical",
      },
    ],
    activity: "tolerance",
    observation:
      "Tìm một số đo có ký hiệu ± trên tài liệu đồ vật sẵn có. Ghi nguồn, đơn vị và hai giới hạn. Nếu không có tài liệu thì dùng lại dữ liệu giả định; không tự đo để chứng nhận đạt dung sai. Ôn C03/C04, sau đó luyện câu sai.",
    sourceRefs: ["keyence-tolerance", "keyence-fit"],
    questions: [
      {
        id: "C12-Q1",
        kind: "numeric",
        prompt: "Giả định kích thước 25 ±0,2 mm. Nhập giới hạn dưới.",
        correct: 24.8,
        unit: "mm",
        tolerance: 0.001,
        rationale:
          "Giới hạn dưới = 25−0,2 = 24,8 mm. ±0,001 mm ở bộ chấm chỉ là độ lệch nhập đáp án, không thêm vào dung sai chế tạo.",
        sourceRefs: ["keyence-tolerance"],
      },
      {
        id: "C12-Q2",
        kind: "choice",
        prompt:
          "Với kích thước giả định 25 ±0,2 mm, độ rộng cả khoảng bằng bao nhiêu?",
        choices: [
          { id: "point2", label: "0,2 mm" },
          { id: "point4", label: "0,4 mm" },
          { id: "25", label: "25 mm" },
        ],
        correct: "point4",
        rationale: "Giới hạn là 24,8 và 25,2 mm; độ rộng = 25,2−24,8 = 0,4 mm.",
        sourceRefs: ["keyence-tolerance"],
      },
      {
        id: "C12-Q3",
        kind: "numeric",
        prompt:
          "Giả định trụ lý tưởng: lỗ 10,10–10,20 mm, trục 10,00–10,05 mm. Nhập khe hở đường kính nhỏ nhất.",
        correct: 0.05,
        unit: "mm",
        tolerance: 0.001,
        rationale:
          "Ghép lỗ nhỏ nhất và trục lớn nhất: 10,10−10,05 = 0,05 mm. Không lấy hai giá trị danh nghĩa để thay trường hợp biên.",
        sourceRefs: ["keyence-fit"],
      },
      {
        id: "C12-Q4",
        kind: "choice",
        prompt:
          "Hai khoảng kích thước giả định cho khe hở dương. Điều đó đã chứng minh cụm thật chạy tốt ở mọi điều kiện chưa?",
        choices: [
          { id: "yes", label: "Đã chứng minh" },
          { id: "no", label: "Chưa chứng minh" },
        ],
        correct: "no",
        rationale:
          "Bài chỉ xét đường kính lý tưởng; còn hình học, nhiệt, tải, bề mặt và điều kiện sử dụng chưa được xét.",
        sourceRefs: ["keyence-tolerance", "keyence-fit"],
      },
    ],
  }),
];
