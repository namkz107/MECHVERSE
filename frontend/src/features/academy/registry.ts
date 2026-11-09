import type { Lesson, Source } from "./types";
export function validateRegistry(
  lessons: Lesson[],
  sources: Source[],
): string[] {
  const errors: string[] = [],
    ids = new Set<string>(),
    questionIds = new Set<string>(),
    sourceIds = new Set(sources.map((s) => s.id));
  if(sourceIds.size!==sources.length)errors.push('Source ID bị trùng.');
  const refs = (list: string[], owner: string) => {
    for (const id of list)
      if (!sourceIds.has(id))
        errors.push(`${owner}: nguồn không tồn tại ${id}`);
  };
  for (const source of sources) {
    if (
      !source.locator ||
      !source.checkedAt ||
      !source.usage ||
      !/^(https?:\/\/|\/models\/)/.test(source.url)
    )
      errors.push(`Nguồn thiếu metadata: ${source.id}`);
  }
  for (const l of lessons) {
    if (ids.has(l.id)) errors.push(`Bài trùng: ${l.id}`);
    ids.add(l.id);
    if (
      l.expertReviewStatus !== "none" ||
      l.publicationScope !== "personal-preview"
    )
      errors.push(`Không có record duyệt cho ${l.id}`);
    if (
      !l.objectives.length ||
      !l.blocks.length ||
      !l.questions.length ||
      !l.observation
    )
      errors.push(`Bài thiếu nội dung: ${l.id}`);
    refs(l.sourceRefs, l.id);
    if(l.sourceStatus==='source-checked'&&l.sourceRefs.some(id=>sources.find(s=>s.id===id)?.sourceStatus!=='source-checked'))errors.push(`${l.id}: nguồn chưa đối chiếu không thể đánh dấu source-checked`);
    for (const b of l.blocks) {
      refs(b.sourceRefs, b.id);
      if (!b.body.length) errors.push(`Block rỗng: ${b.id}`);
    }
    for (const q of l.questions) {
      if (questionIds.has(q.id)) errors.push(`Câu hỏi trùng: ${q.id}`);
      questionIds.add(q.id);
      refs(q.sourceRefs, q.id);
      if (!q.rationale) errors.push(`Thiếu lời giải: ${q.id}`);
      if(!q.sourceRefs.length)errors.push(`Thiếu nguồn đáp án: ${q.id}`);
      const options=new Set(q.choices?.map(c=>c.id));
      if(q.kind==='numeric'&&(typeof q.correct!=='number'||!Number.isFinite(q.correct)||!q.unit||!Number.isFinite(q.tolerance??0)||(q.tolerance??0)<0))errors.push(`Đáp án số/đơn vị không hợp lệ: ${q.id}`);
      if(q.kind==='choice'&&(typeof q.correct!=='string'||!options.has(q.correct)))errors.push(`Đáp án lựa chọn không hợp lệ: ${q.id}`);
      if(q.kind==='multi'&&(!Array.isArray(q.correct)||!q.correct.length||q.correct.some(id=>!options.has(id))))errors.push(`Đáp án nhiều lựa chọn không hợp lệ: ${q.id}`);
      if(q.kind==='matching'&&(!q.correct||typeof q.correct!=='object'||Array.isArray(q.correct)||!q.items?.length||q.items.some(item=>!options.has((q.correct as Record<string,string>)[item.id]))))errors.push(`Đáp án ghép không hợp lệ: ${q.id}`);
      if(q.kind==='open'&&!q.rubric?.length)errors.push(`Thiếu rubric: ${q.id}`);
    }
  }
  const visiting = new Set<string>(),
    done = new Set<string>();
  function visit(id: string) {
    if (visiting.has(id)) {
      errors.push(`Vòng tiên quyết: ${id}`);
      return;
    }
    if (done.has(id)) return;
    const l = lessons.find((l) => l.id === id);
    if (!l) {
      errors.push(`Tiên quyết thiếu: ${id}`);
      return;
    }
    visiting.add(id);
    l.prerequisites.forEach(visit);
    visiting.delete(id);
    done.add(id);
  }
  lessons.forEach((l) => visit(l.id));
  return errors;
}
