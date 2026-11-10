import { writeFile } from "node:fs/promises";
import {
  slots,
  branches,
  modules,
  validateCurriculum,
} from "../src/features/academy/curriculum";
import {
  lessons,
  sources,
  contentErrors,
} from "../src/features/academy/content";
const errors = [
  ...contentErrors,
  ...validateCurriculum(slots, branches, lessons, sources),
];
if (errors.length) {
  console.error(errors.join("\n"));
  process.exit(1);
}
const counts = {
  planned: slots.length,
  authored: slots.filter((s) => s.coverage === "authored").length,
  partial: slots.filter((s) => s.coverage === "partial").length,
  lessons: lessons.length,
  questions: lessons.reduce((n, l) => n + l.questions.length, 0),
  sources: sources.length,
};
const clean = (s: string) => s.replace(/\|/g, "/").replace(/\n/g, " ");
let doc = `# Ma trận độ phủ chương trình\n\nCập nhật 09/11/2026 từ registry bằng lệnh yarn tsx scripts/audit-curriculum.ts trong frontend. Đặc tả: [CURRICULUM-LEARNING-MODES](CURRICULUM-LEARNING-MODES.md), §3–6/13.\n\n${counts.planned} phạm vi bài dự kiến; ${counts.authored} bài đủ phạm vi nhập môn M01/M02; ${counts.partial} bài kế thừa một phần; ${counts.planned - counts.lessons} phạm vi chưa có bài. Registry có ${counts.lessons} lesson revision, ${counts.questions} câu hỏi, ${counts.sources} nguồn. Đây là thống kê cấu trúc, không là chứng nhận chuyên môn. Mỗi competency dưới đây là đầu ra gộp của phạm vi bài; không tuyên bố từng kỹ năng nghề đã được đánh giá độc lập.\n\nGiữ ID C01–C12 và key F01; M là alias, không seed thêm bản sao. F01 là hoạt động nhận diện hỗ trợ M01-L02/L03: nguồn edu-manifest, release edu-fan-f01-demo-v1, bằng chứng demo giữ riêng; không tự hoàn thành C/M. C06 hỗ trợ thêm chuyển động M03-L02; C08 hỗ trợ ổ đỡ M09-L03/L04; các liên hệ này chưa đủ mở cả bài tương ứng.\n\nNguồn: source-checked, expertReviewStatus none, personal-preview. “Đủ phạm vi nhập môn” nghĩa có lý thuyết, ví dụ, minh họa, tự kiểm, lời giải và nguồn; chưa có review chuyên gia. Câu mở và thực hành giữ unreviewed. Mode quiz dùng chung câu hỏi với course; cards là tự đánh giá.\n\n| competencyId | Nguồn yêu cầu / tầng | Objective / phạm vi | Prerequisite | LessonId / revision | SourceEvidence IDs | Hoạt động / modes | Assessment IDs | Rubric | Trạng thái / điểm thiếu |\n| --- | --- | --- | --- | --- | --- | --- | --- | --- | --- |\n`;
for (const s of slots) {
  const l = lessons.find((l) => l.id === s.lessonId);
  const gap =
    s.coverage === "planned"
      ? "Chưa mở: cần biên soạn, đọc nguồn, hoạt động và đánh giá"
      : s.coverage === "partial"
        ? "Có bài kế thừa một phần; cần mở rộng theo tên/phạm vi M, chưa hoàn thiện module"
        : "Có thể học thử; cần duyệt chuyên môn và vận dụng/review";
  doc += `| ${s.objectiveId} | §3/${s.moduleId}; core | ${clean(s.title + ": " + s.objective)} | ${s.prerequisiteIds.join(", ") || "Không"} | ${l ? `${l.id}/r${l.revision}` : "—"} | ${s.sourceRefs.join(", ") || "Chưa đọc nguồn cho phạm vi này"} | ${s.availableModes.join(", ") || "Chưa có"} | ${s.assessmentIds.join(", ") || "Chưa có"} | ${
    clean(
      l?.practicalRubric?.join("; ") ??
        l?.questions
          .filter((q) => q.rubric)
          .flatMap((q) => q.rubric!)
          .join("; ") ??
        "",
    ) || "Chưa có rubric thực hành"
  } | ${gap} |\n`;
}
doc +=
  "\n## Nhánh sau core\n\n| competencyId | Nguồn / tầng | Objective / độ sâu | Prerequisite | Lesson/revision, nguồn, hoạt động, assessment, rubric | Trạng thái / điểm thiếu |\n| --- | --- | --- | --- | --- | --- |\n";
for (const b of branches)
  doc += `| ${b.id}-O1 | §4; chuyên sâu, có thể học sau | ${b.scope} | ${b.prerequisiteIds.join(", ")} | Chưa có nội dung/nguồn/bài đánh giá riêng | Outline, chưa mở; cần đánh giá đầu vào phù hợp |\n`;
doc +=
  "\n## Yêu cầu xuyên suốt và phần tiếp theo\n\n| competencyId | Nguồn / tầng | Mục tiêu, tiên quyết và vị trí | Hoạt động / đánh giá / trạng thái / điểm thiếu |\n| --- | --- | --- | --- |\n";
const cross = [
  [
    "SUP-MATH",
    "§4/7; bổ trợ",
    "Toán ứng dụng tại bài M02/M03, sâu hơn trước K03",
    "M02 có đổi đơn vị/hình học; toán cơ học sâu và đánh giá riêng chưa biên soạn",
  ],
  [
    "SUP-LANG",
    "§4; bổ trợ",
    "Tiếng Anh kỹ thuật ở thuật ngữ từng lesson; mở rộng cùng CAD",
    "Có thuật ngữ part/assembly/sketch; chưa có chương trình ngôn ngữ riêng",
  ],
  [
    "SUP-QUALITY",
    "§4; bổ trợ",
    "Đo lường/chất lượng: M02-L06 → M06 → M13",
    "M02-L06 có câu hỏi/rubric; yêu cầu tiêu chuẩn/phiên bản sâu hơn chưa biên soạn",
  ],
  [
    "SUP-SPREADSHEET",
    "§4; bổ trợ",
    "Bảng tính, giá thành: đi cùng M14/M16",
    "Chưa có bài, nguồn và đánh giá",
  ],
  [
    "SUP-REVISION",
    "§4/10; bổ trợ",
    "Quản lý phiên bản/tiêu chuẩn ở M13/M14 và kho nội dung",
    "App giữ lesson/card revision, archive; chưa biên soạn tiêu chuẩn kỹ thuật sâu, không gán ISO tùy ý",
  ],
  [
    "MODE-SHARED",
    "§2/10/13; core",
    "Một session canonical cho course/quiz/cards/3D/lab",
    "Nháp/attempt dùng chung; F01 giữ riêng; không XP. Mini lab trong bài có persistence; challenges độc lập là sandbox",
  ],
  [
    "RECALL",
    "§7/10/13; bổ trợ",
    "Tự nhớ → lật thẻ → tự đánh giá → ôn đến hạn tại /practice",
    "Scheduler UTC 1/3/7 ngày thử nghiệm, 200 review events gần nhất; không gọi FSRS hoặc mastery thiết kế",
  ],
  [
    "ASSESSMENT",
    "§5/8; core",
    "Tự kiểm theo câu/revision; bài mở và practical có rubric",
    "Auto grading theo quy tắc; rubric unreviewed; chưa có review server hoặc completion record nghề",
  ],
  [
    "ONBOARDING",
    "§6; core",
    "/academy/roadmap → M01-L01; mục tiêu/thời gian tùy chọn",
    "Có đường số 0, không cần bài đầu vào. Placement test tùy chọn chưa biên soạn",
  ],
  [
    "CERTIFICATE",
    "§9/13.6; có thể học sau",
    "Giấy hoàn thành nội bộ cần đủ mục tiêu và project/review",
    "Deferred; chưa cấp giấy cá nhân hay QR giả. Server verification cần ID, ownership, thu hồi, privacy",
  ],
  [
    "KNOWNS",
    "§12/13.7; optional dev-only",
    "Pilot riêng nếu chủ dự án chọn, không là runtime/LMS",
    "Chưa cài hoặc thay cấu hình; giữ toàn bộ đánh giá trong đặc tả gốc",
  ],
];
for (const r of cross) doc += `| ${r.map(clean).join(" | ")} |\n`;
doc +=
  "\n## Kiểm cấu trúc\n\nvalidateCurriculum kiểm mapping canonical, ID/mục tiêu thiếu hoặc trùng, prerequisite thiếu/vòng, nguồn thiếu, assessment không thuộc bài của mục tiêu, revision lệch, mode không có nội dung và nhánh thiếu đường vào. validateRegistry kiểm nguồn, câu hỏi/lời giải/rubric và kiểu đáp án. Các kiểm tra này không chứng minh khoa học/sư phạm hoặc nguồn còn truy cập ở tương lai; cần review nội dung đúng phạm vi.\n\nCần làm tiếp theo thứ tự: mở rộng M03 theo khoảng thiếu; bài biến thể và sổ lỗi sâu hơn theo objective; rubric CAD/project có review; sau đó giấy hoàn thành cá nhân và server verification khi được giao. Không nhân bản outline thành trang lesson rỗng.\n";
await writeFile(
  new URL("../../docs/CURRICULUM-COVERAGE.md", import.meta.url),
  doc,
  "utf8",
);
console.log(
  JSON.stringify({
    ...counts,
    modules: modules.length,
    branches: branches.length,
    validationErrors: errors.length,
  }),
);
