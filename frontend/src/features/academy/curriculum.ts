import type { Lesson, Source } from "./types";
import { foundationLessons } from "./content/foundations";
import { advancedLessons } from "./content/advanced";
import { beginnerLessons } from "./content/beginner";

export type Mode = "course" | "cards" | "quiz" | "explore" | "lab";
type Module = {
  id: string;
  title: string;
  titles: string[];
  outcome: string;
  prerequisiteIds: string[];
};
const row = (
  id: string,
  title: string,
  titles: string,
  outcome: string,
  prerequisiteIds: string[],
): Module => ({
  id,
  title,
  titles: titles.split(";"),
  outcome,
  prerequisiteIds,
});
export const modules: Module[] = [
  row(
    "M01",
    "Làm quen nghề",
    "Cơ khí trong đời sống;Sản phẩm–cụm–chi tiết;Chức năng bộ phận;Thiết kế–chế tạo–gia công;Lắp ráp–kiểm tra;Từ ý tưởng tới sản phẩm và các hướng nghề",
    "Phân tích một đồ vật quen thuộc",
    [],
  ),
  row(
    "M02",
    "Hình học và đo",
    "Hệ mét và đổi đơn vị;Dài–rộng–cao–dày;Đường kính và bán kính;Góc và hình 2D;Khối–mặt–X/Y/Z;Thước, thước cặp và giới hạn phép đo",
    "Ghi và kiểm kích thước cơ bản",
    ["M01-L03"],
  ),
  row(
    "M03",
    "Lực và chuyển động",
    "Lực và hướng;Chuyển động thẳng và quay;Mô-men;Ma sát;Cân bằng và tải;Biến dạng–độ bền–độ cứng vững nhập môn",
    "Giải thích tác động, tính ví dụ đơn giản",
    ["M02-L01", "M02-L05"],
  ),
  row(
    "M04",
    "Vật liệu",
    "Kim loại và phi kim;Thép và gang;Inox, nhôm, đồng;ABS, POM, PA, PC;Cơ tính và xử lý nhiệt nhập môn;Chọn vật liệu theo chức năng và dữ liệu",
    "So sánh phương án, nhận ra dữ liệu còn thiếu",
    ["M02-L01", "M03-L01"],
  ),
  row(
    "M05",
    "Đọc bản vẽ",
    "Mục đích và khung tên;Phép chiếu và quy ước bố trí;Hình chiếu đứng, bằng, cạnh;Trục đo;Nét thấy, khuất, tâm;Hình cắt và mặt cắt",
    "Hình dung khối từ bộ hình chiếu",
    ["M02-L03", "M02-L05"],
  ),
  row(
    "M06",
    "Kích thước và lắp ghép",
    "Ghi kích thước theo chức năng;Lỗ, đường kính, bán kính, góc;Ren và ký hiệu;Dung sai kích thước;Khe hở, trung gian, lắp chặt;Nhám và GD&T có chuẩn tham chiếu",
    "Đọc giới hạn, hiểu yêu cầu lắp và mục đích kiểm",
    ["M05-L03", "M02-L06"],
  ),
  row(
    "M07",
    "SOLIDWORKS / Sketch",
    "Part, Assembly, Drawing và quản lý file;Mặt phẳng, Line, Rectangle;Circle, Arc, Polygon;Smart Dimension và Relations;Trim, Offset, Mirror;Sketch Pattern và trạng thái ràng buộc",
    "Biên dạng đúng kích thước, giải thích ràng buộc",
    ["M02-L04", "M02-L05", "M05-L03"],
  ),
  row(
    "M08",
    "Dựng chi tiết",
    "Extrude và Cut;Revolve và Revolved Cut;Hole Wizard, Fillet, Chamfer;Pattern, Mirror, Reference Geometry;Sweep và Loft;Shell, Rib, Draft và thay đổi có chủ đích",
    "Bộ tấm có lỗ, trục bậc, bạc và giá đỡ",
    ["M07-L04", "M07-L06"],
  ),
  row(
    "M09",
    "Chi tiết và mối ghép",
    "Bu lông, vít, đai ốc;Trục;Bạc lót;Ổ lăn, ổ bi và cách gọi;Then, chốt, vòng chặn;Đọc catalogue và thiết kế vị trí lắp",
    "Giải thích chức năng, chọn theo nguồn",
    ["M03-L03", "M04-L06", "M06-L05"],
  ),
  row(
    "M10",
    "Truyền động và cơ cấu",
    "Bánh răng và tỷ số truyền;Puly và dây đai;Xích;Khớp nối và lò xo;Ray, thanh trượt, xi lanh khí nén;Động cơ, hộp giảm tốc và sơ đồ chức năng",
    "Nhận diện và chọn nguyên lý sơ bộ",
    ["M03-L02", "M09-L06"],
  ),
  row(
    "M11",
    "Công nghệ chế tạo",
    "Tiện;Phay;Khoan, doa, mài;Laser, plasma, tấm;Đúc, dập, hàn;Quy trình sơ bộ, tiếp cận dụng cụ và đo kiểm",
    "Liên hệ hình dạng với cách làm và giới hạn",
    ["M04-L06", "M06-L04", "M08-L01"],
  ),
  row(
    "M12",
    "Assembly",
    "Insert Components và cố định;Bậc tự do;Mate cơ bản;Mechanical Mate;Cụm con, Bottom-up và Top-down;Giao thoa, khe hở, chuyển động và khả năng lắp",
    "Cụm số hoạt động theo ý đồ",
    ["M08-L04", "M09-L06", "M10-L06", "M06-L05"],
  ),
  row(
    "M13",
    "Hồ sơ kỹ thuật",
    "Drawing từ 3D;Hình chiếu, cắt, chi tiết phóng;Kích thước và dung sai theo chức năng;Bản vẽ lắp, exploded và BOM;PDF, DXF và kiểm đơn vị;Revision, liên kết và bàn giao file",
    "Hồ sơ đồng nhất với mô hình",
    ["M06-L06", "M12-L06"],
  ),
  row(
    "M14",
    "Tư duy thiết kế",
    "Làm rõ yêu cầu;Chức năng, tải, môi trường;Chọn phương án và tính tay;Chọn vật liệu và chi tiết tiêu chuẩn;DFM, DFA, đo kiểm, bảo trì;Thay đổi, Equations, Configurations, Design Table",
    "Đề xuất có lý do, ghi giả thiết và điểm cần xác minh",
    ["M03-L06", "M11-L06", "M13-L06"],
  ),
  row(
    "M15",
    "CAD / CAM / CNC nhập môn",
    "CAD, CAM, CNC và loại máy;An toàn và quy trình;Phôi, đồ gá, gốc, dao;Toolpath, thô, tinh và mô phỏng;G-code và Post Processor ở mức khái niệm;Kiểm và giới hạn trước máy thật",
    "Hồ sơ mô phỏng học tập; chưa xác nhận quyền vận hành",
    ["M11-L06", "M13-L06", "M14-L06"],
  ),
  row(
    "M16",
    "Dự án tổng hợp",
    "Chốt đề và tiêu chí;Phương án, tính và chọn;Dựng chi tiết;Cụm và kiểm tra;Bản vẽ, BOM, kế hoạch chế tạo;Phản biện, sửa yêu cầu và tổng kết",
    "Hồ sơ để người phụ trách kỹ thuật review",
    ["M14-L06", "M15-L06"],
  ),
];
export const aliases: Record<string, string> = {
  "M01-L02": "C01",
  "M01-L03": "C02",
  "M02-L01": "C03",
  "M02-L03": "C04",
  "M02-L05": "C05",
  "M03-L01": "C06",
  "M03-L03": "C07",
  "M03-L04": "C08",
  "M04-L06": "C09",
  "M11-L06": "C10",
  "M05-L03": "C11",
  "M06-L04": "C12",
};
export const canonicalId = (id: string) => aliases[id] ?? id;
const available = [
  ...foundationLessons,
  ...advancedLessons,
  ...beginnerLessons,
];
export const activityKindFor = (id: string, revision?: number) =>
  available.find(
    (l) =>
      l.id === canonicalId(id) &&
      (revision === undefined || l.revision === revision),
  )?.activity;
export type Slot = {
  id: string;
  moduleId: string;
  title: string;
  objectiveId: string;
  objective: string;
  prerequisiteIds: string[];
  lessonId?: string;
  revision?: number;
  sourceRefs: string[];
  assessmentIds: string[];
  coverage: "authored" | "partial" | "planned";
  availableModes: Mode[];
};
export const slots: Slot[] = modules.flatMap((m) =>
  m.titles.map((title, i) => {
    const id = `${m.id}-L0${i + 1}`,
      l = available.find((l) => l.id === canonicalId(id));
    const coverage = l
      ? m.id === "M01" || m.id === "M02"
        ? "authored"
        : "partial"
      : "planned";
    return {
      id,
      moduleId: m.id,
      title,
      objectiveId: `${id}-O1`,
      objective: l?.objectives.join(" ") ?? m.outcome,
      prerequisiteIds: i === 0 ? m.prerequisiteIds : [`${m.id}-L0${i}`],
      lessonId: l?.id,
      revision: l?.revision,
      sourceRefs: l?.sourceRefs ?? [],
      assessmentIds: l?.questions.map((q) => q.id) ?? [],
      coverage,
      availableModes: l
        ? [
            "course",
            "cards",
            "quiz",
            ...(["C01", "C02"].includes(l.id) ? ["explore" as const] : []),
            ...(l.id.startsWith("C") ? ["lab" as const] : []),
          ]
        : [],
    };
  }),
);
// Fine-grained entry: CAD may start from M02 and basic projection; no whole-module lock.
const overrides: Record<string, string[]> = {
  "M02-L01": ["M01-L03"],
  "M03-L03": ["M03-L01", "M02-L01", "M02-L05"],
  "M03-L04": ["M01-L03", "M03-L01"],
  "M04-L06": ["M01-L03", "M02-L01"],
  "M05-L03": ["M02-L03", "M02-L05"],
  "M06-L04": ["M02-L01", "M02-L03"],
  "M11-L06": ["M01-L02", "M02-L03", "M04-L06"],
};
for (const s of slots) if (overrides[s.id]) s.prerequisiteIds = overrides[s.id];
export type Branch = {
  id: string;
  title: string;
  scope: string;
  prerequisiteIds: string[];
};
export const branches: Branch[] = [
  {
    id: "K01",
    title: "Sheet Metal / Weldments",
    scope:
      "Uốn, trải tấm, dữ liệu công nghệ, kết cấu hàn, danh sách cắt, bản vẽ và dự án khung/vỏ",
    prerequisiteIds: ["M04-L06", "M11-L06", "M12-L06", "M13-L06"],
  },
  {
    id: "K02",
    title: "Surface / khuôn",
    scope:
      "Bề mặt, liên tục hình học, tạo vỏ, thoát khuôn, core/cavity và thiết kế phù hợp công nghệ",
    prerequisiteIds: ["M08-L05", "M08-L06", "M04-L06", "M11-L05"],
  },
  {
    id: "K03",
    title: "Cơ học / tính bền / Simulation",
    scope:
      "Toán/cơ học cần đánh giá riêng; vật liệu, điều kiện biên, lưới/hội tụ, tính tay và giới hạn mô phỏng",
    prerequisiteIds: ["M03-L05", "M03-L06", "M04-L05", "M14-L03"],
  },
  {
    id: "K04",
    title: "Truyền động nâng cao",
    scope:
      "Tải, tuổi thọ, chọn ổ, bánh răng và hộp giảm tốc theo nguồn/tiêu chuẩn, có tính bền",
    prerequisiteIds: ["M09-L06", "M10-L06", "M03-L06"],
  },
  {
    id: "K05",
    title: "CAM / CNC nâng cao",
    scope:
      "Đồ gá, dao, máy/post cụ thể, xác minh chương trình, nhiều setup/trục; cần đào tạo thiết bị và an toàn có người hướng dẫn",
    prerequisiteIds: ["M15-L06"],
  },
];
export const slotFor = (lessonId: string) =>
  slots.find((s) => s.lessonId === canonicalId(lessonId));
export const modesFor = (l: Lesson): Mode[] =>
  slotFor(l.id)?.availableModes ?? ["course", "cards", "quiz"];
export const nextSlot = (lessonId: string) => {
  const index = slots.findIndex((s) => s.lessonId === lessonId);
  return slots[index + 1];
};
export function validateCurriculum(
  items: Slot[],
  paths: Branch[],
  lessons: Lesson[],
  sources: Source[],
): string[] {
  const errors: string[] = [],
    ids = new Set(items.map((s) => s.id)),
    objectiveIds = new Set<string>();
  if (ids.size !== items.length) errors.push("ID lộ trình trùng");
  for (const s of items) {
    if (!s.objective || objectiveIds.has(s.objectiveId))
      errors.push(`Mục tiêu thiếu/trùng: ${s.id}`);
    objectiveIds.add(s.objectiveId);
    for (const id of s.prerequisiteIds)
      if (!ids.has(id)) errors.push(`Tiên quyết thiếu: ${id}`);
    for (const id of s.sourceRefs)
      if (!sources.some((v) => v.id === id)) errors.push(`Nguồn thiếu: ${id}`);
    const l = lessons.find((l) => l.id === s.lessonId);
    if (
      s.coverage !== "planned" &&
      (!l || !s.assessmentIds.length || !s.sourceRefs.length)
    )
      errors.push(`Mục tiêu chưa có bằng chứng: ${s.id}`);
    for (const id of s.assessmentIds)
      if (!l?.questions.some((q) => q.id === id))
        errors.push(`Assessment không kiểm mục tiêu: ${s.id}/${id}`);
    if (l && s.revision !== l.revision) errors.push(`Revision lệch: ${s.id}`);
    if (!l && s.availableModes.length)
      errors.push(`Mode không có nội dung: ${s.id}`);
  }
  const visiting = new Set<string>(),
    done = new Set<string>();
  function visit(id: string) {
    if (visiting.has(id)) {
      errors.push(`Vòng tiên quyết: ${id}`);
      return;
    }
    if (done.has(id)) return;
    visiting.add(id);
    items.find((s) => s.id === id)?.prerequisiteIds.forEach(visit);
    visiting.delete(id);
    done.add(id);
  }
  items.forEach((s) => visit(s.id));
  for (const b of paths)
    if (
      !b.prerequisiteIds.length ||
      b.prerequisiteIds.some((id) => !ids.has(id))
    )
      errors.push(`Nhánh thiếu đường vào: ${b.id}`);
  for (const l of lessons)
    if (!items.some((s) => s.lessonId === l.id))
      errors.push(`Bài chưa ánh xạ: ${l.id}`);
  return errors;
}
