import type { Answer, Grade, Question } from "./types";
const units: Record<string, { dimension: string; factor: number }> = {
  mm: { dimension: "length", factor: 0.001 },
  cm: { dimension: "length", factor: 0.01 },
  m: { dimension: "length", factor: 1 },
  N: { dimension: "force", factor: 1 },
  "N·m": { dimension: "torque", factor: 1 },
  "N·mm": { dimension: "torque", factor: 0.001 },
  "m/s²": { dimension: "acceleration", factor: 1 },
  "mm/s²": { dimension: "acceleration", factor: 0.001 },
  "°": { dimension: "angle", factor: 1 },
};
export function gradeAnswer(q: Question, answer: Answer | undefined): Grade {
  const fail = (errorType: Grade["errorType"], feedback: string): Grade => ({
    correct: false,
    errorType,
    feedback,
  });
  if (
    answer === undefined ||
    answer === "" ||
    (Array.isArray(answer) && answer.length === 0)
  )
    return fail(
      "incomplete",
      "Bạn chưa trả lời. Hãy thử trước khi xem lời giải.",
    );
  if (q.kind === "open")
    return fail(
      "self-review",
      "Đối chiếu câu trả lời với rubric bên dưới. Đây là tự kiểm, chưa được chấm bởi chuyên gia hoặc máy chủ.",
    );
  let correct = false;
  if (q.kind === "numeric") {
    if (
      typeof answer !== "object" ||
      Array.isArray(answer) ||
      !("value" in answer) ||
      !("unit" in answer)
    )
      return fail("incomplete", "Nhập số và đơn vị.");
    const raw = String(answer.value).trim().replace(",", ".");
    if (!/^[+-]?(?:\d+(?:\.\d*)?|\.\d+)$/.test(raw))
      return fail(
        "value",
        "Cần một số hữu hạn; không nhập ký tự hoặc để trống.",
      );
    const value = Number(raw),
      from = units[String(answer.unit)],
      to = units[q.unit ?? ""];
    if (!from || !to || from.dimension !== to.dimension)
      return fail(
        "unit",
        `Kiểm tra đơn vị của đại lượng. Bài này dùng ${q.unit}.`,
      );
    const converted = (value * from.factor) / to.factor;
    if (!Number.isFinite(converted))
      return fail("value", "Số vượt phạm vi xử lý.");
    correct =
      Math.abs(converted - Number(q.correct)) <=
      (q.tolerance ?? 0.00001) + 1e-10;
    if (!correct)
      return fail(
        "value",
        "Giá trị chưa đúng sau khi đổi về cùng đơn vị. Xem lại phép tính và hệ số đổi.",
      );
  } else if (q.kind === "multi") {
    if (!Array.isArray(answer) || !Array.isArray(q.correct))
      return fail("incomplete", "Chọn tất cả phương án phù hợp.");
    const actual = new Set(answer),
      expected = new Set(q.correct);
    correct =
      actual.size === expected.size &&
      [...expected].every((a) => actual.has(a));
  } else if (q.kind === "matching") {
    if (
      typeof answer !== "object" ||
      Array.isArray(answer) ||
      typeof q.correct !== "object" ||
      Array.isArray(q.correct)
    )
      return fail("incomplete", "Ghép từng mục bằng các hộp chọn.");
    const mapped = answer as Record<string, string>;
    correct =
      Object.entries(q.correct).every(
        ([key, value]) => mapped[key] === value,
      ) && Object.keys(answer).length === Object.keys(q.correct).length;
  } else correct = typeof answer === "string" && answer === q.correct;
  return correct
    ? {
        correct: true,
        errorType: "none",
        feedback:
          "Bạn đã trả lời đúng nhiệm vụ này. Đọc lời giải để kiểm tra cách suy luận.",
      }
    : fail(
        "concept",
        "Lựa chọn chưa phù hợp với cấu tạo hoặc giả thiết của đề. Đối chiếu lời giải rồi thử một cách giải khác.",
      );
}
export function torque(
  force: number,
  radius: number,
  angle: number,
): number | null {
  if (
    ![force, radius, angle].every(Number.isFinite) ||
    force < 0 ||
    radius < 0 ||
    angle < 0 ||
    angle > 180
  )
    return null;
  const value = force * radius * Math.sin((angle * Math.PI) / 180);
  return Number.isFinite(value) ? (Math.abs(value) < 1e-12 ? 0 : value) : null;
}
