import { describe, it, expect } from "vitest";
import { lessons, sources, findLesson } from "../src/features/academy/content";
import {
  initialProgress,
  setDraft,
  submitSession,
  ensureSession,
  parseProgress,
  LocalProgressRepository,
} from "../src/features/academy/progress";

// Regressions: duplicate seeding, orphan objectives, lost drafts on mode/revision
// changes, self-rating mistaken for practical proof, and timezone-dependent due dates.
const catalog = () =>
  import("../src/features/academy/curriculum").catch(() => null);
const learning = () =>
  import("../src/features/academy/learning").catch(() => null);
describe("curriculum paths preserve canonical history", () => {
  it("resolves M aliases to existing C lessons without duplicating the registry", async () => {
    const c = await catalog();
    expect(c).not.toBeNull();
    if (!c) return;
    expect(c.slots).toHaveLength(96);
    expect(findLesson("M01-L02")?.id).toBe("C01");
    expect(findLesson("M02-L01")?.id).toBe("C03");
    expect(findLesson("M16-L06")).toBeUndefined();
    expect(new Set(lessons.map((l) => l.id)).size).toBe(lessons.length);
    for (const moduleId of ["M01", "M02"]) {
      const available = c.slots.filter((s) => s.moduleId === moduleId);
      expect(available).toHaveLength(6);
      for (const s of available)
        expect(findLesson(s.id)?.blocks.length).toBeGreaterThanOrEqual(3);
    }
    expect(c.validateCurriculum(c.slots, c.branches, lessons, sources)).toEqual(
      [],
    );
  });
  it("rejects missing/cyclic prerequisites, orphan assessment/objective, broken source and branch entry", async () => {
    const c = await catalog();
    expect(c).not.toBeNull();
    if (!c) return;
    const bad = c.slots.map((s, i) =>
      i === 0
        ? {
            ...s,
            prerequisiteIds: ["missing"],
            sourceRefs: ["gone"],
            assessmentIds: ["unknown"],
          }
        : s,
    );
    expect(
      c.validateCurriculum(bad, c.branches, lessons, sources).length,
    ).toBeGreaterThanOrEqual(3);
    const cycle = c.slots.map((s, i) =>
      i === 0 ? { ...s, prerequisiteIds: ["M01-L02"] } : s,
    );
    expect(
      c
        .validateCurriculum(cycle, c.branches, lessons, sources)
        .some((e) => e.includes("Vòng")),
    ).toBe(true);
    expect(
      c.validateCurriculum(
        c.slots,
        [{ ...c.branches[0], prerequisiteIds: [] }],
        lessons,
        sources,
      ).length,
    ).toBeGreaterThan(0);
  });
});
describe("shared local learning evidence", () => {
  it("rejects imported answers incompatible with the lesson activity and restores a safe fallback", async () => {
    const m = await learning();
    expect(m).not.toBeNull();
    if (!m) return;
    const l = findLesson("C02")!;
    const valid = m.saveActivityValue(initialProgress(), l, "answer", {
      shaft: "rotation",
    });
    expect(parseProgress(JSON.stringify(valid))).not.toBeNull();
    const invalid = {
      ...valid,
      learning: {
        ...valid.learning!,
        activities: { C02: { revision: l.revision, values: { answer: null } } },
      },
    };
    expect(parseProgress(JSON.stringify(invalid))).toBeNull();
    expect(m.activityValue(invalid, l, "answer", {})).toEqual({});
    expect(m.saveActivityValue(valid, l, "answer", null)).toBe(valid);
  });
  it("persists mini-lab input/feedback, rejects malformed state and separates revisions", async () => {
    const m = await learning();
    expect(m).not.toBeNull();
    if (!m) return;
    const l = findLesson("C03")!;
    let p = m.saveActivityValue(initialProgress(), l, "value", "0,125");
    p = m.saveActivityValue(p, l, "variant", 1);
    p = m.saveActivityValue(p, l, "result", {
      correct: false,
      feedback: "Kiểm đơn vị",
    });
    const loaded = parseProgress(JSON.stringify(p))!;
    expect(loaded.learning?.activities?.C03.values.value).toBe("0,125");
    expect(m.activityValue(loaded, { ...l, revision: 2 }, "value", "")).toBe(
      "",
    );
    const changed = m.saveActivityValue(
      loaded,
      { ...l, revision: 2 },
      "value",
      "5",
    );
    expect(changed.learning?.activityArchives?.[0].values.value).toBe("0,125");
    expect(
      parseProgress(
        JSON.stringify({
          ...p,
          learning: {
            ...p.learning,
            activities: {
              C03: {
                revision: 1,
                values: { value: { nested: { too: "deep" } } },
              },
            },
          },
        }),
      ),
    ).toBeNull();
  });
  it("retains a C01 draft across canonical modes and roundtrip through the repository", async () => {
    const m = await learning();
    expect(m).not.toBeNull();
    if (!m) return;
    const l = findLesson("C01")!;
    let p = setDraft(initialProgress(), l, "C01-Q1", "1");
    p = m.setLearningPosition(p, l, "cards", "theory");
    p = m.setLearningPosition(p, l, "quiz", "quiz");
    const map = new Map<string, string>();
    const repo = new LocalProgressRepository({
      getItem: (k) => map.get(k) ?? null,
      setItem: (k, v) => {
        map.set(k, v);
      },
    });
    expect(repo.save(p)).toBe(true);
    p = repo.load().progress;
    expect(p.sessions.C01.answers["C01-Q1"]).toBe("1");
    expect(p.learning?.positions.C01.mode).toBe("quiz");
    p = submitSession(p, l);
    p = m.setLearningPosition(p, l, "course", "theory");
    p = submitSession(p, l);
    expect(p.sessions.C01.attempts).toHaveLength(1);
  });
  it("keeps the guided-course section when switching through another mode", async () => {
    const m = await learning();
    expect(m).not.toBeNull();
    if (!m) return;
    const l = findLesson("C01")!;
    let p = m.setLearningPosition(initialProgress(), l, "course", "quiz");
    p = m.setLearningPosition(p, l, "cards", "theory");
    expect(p.learning?.positions.C01.courseSection).toBe("quiz");
    expect(
      parseProgress(JSON.stringify(p))?.learning?.positions.C01.courseSection,
    ).toBe("quiz");
  });
  it("schedules recall in UTC by elapsed days, bounds history and keeps card revisions separate", async () => {
    const m = await learning();
    expect(m).not.toBeNull();
    if (!m) return;
    const l = findLesson("C01")!,
      card = m.cardsFor(l)[0];
    let p = m.rateCard(
      initialProgress(),
      card,
      "remembered",
      "2026-11-09T17:30:00.000Z",
    );
    expect(m.dueCards(p, [l], "2026-11-10T17:29:59.000Z")).toHaveLength(0);
    expect(m.dueCards(p, [l], "2026-11-10T17:30:00.000Z")).toHaveLength(1);
    expect(m.objectiveState(p, l)).not.toBe("demonstrated");
    p = m.rateCard(
      p,
      { ...card, revision: 2 },
      "again",
      "2026-11-10T00:00:00.000Z",
    );
    expect(Object.keys(p.learning!.reviews)).toHaveLength(2);
    for (let i = 0; i < 220; i++)
      p = m.rateCard(
        p,
        card,
        "again",
        new Date(Date.UTC(2026, 10, 10, 0, i)).toISOString(),
      );
    expect(p.learning!.events.length).toBeLessThanOrEqual(200);
    expect(() => m.rateCard(p, card, "again", "bad date")).not.toThrow();
    expect(m.rateCard(p, card, "again", "bad date")).toBe(p);
    expect(parseProgress(JSON.stringify(p))).not.toBeNull();
  });
  it("requires real submitted answers; practical self-review never becomes reviewed mastery", async () => {
    const m = await learning();
    expect(m).not.toBeNull();
    if (!m) return;
    const l = findLesson("M01-L06")!;
    let p = initialProgress();
    for (const q of l.questions.filter((q) => q.kind !== "open"))
      p = setDraft(p, l, q.id, q.correct as string);
    p = submitSession(p, l);
    expect(m.objectiveState(p, l)).toBe("practice");
    p = m.savePractical(
      p,
      l,
      "Bút gồm thân, ruột và nắp. Nắp che đầu bút; cách ghép chưa rõ.",
    );
    expect(p.learning!.practicals[l.id].status).toBe("unreviewed");
    expect(m.objectiveState(p, l)).toBe("practice");
    const changed = ensureSession(p, { ...l, revision: 2 });
    expect(changed.archives).toHaveLength(1);
    expect(m.objectiveState(changed, { ...l, revision: 2 })).toBe("viewed");
  });
  it("reads old v1 unchanged and rejects malformed new state without dropping existing data", async () => {
    const m = await learning();
    expect(m).not.toBeNull();
    if (!m) return;
    const old = setDraft(initialProgress(), findLesson("C01")!, "C01-Q1", "0");
    expect(
      parseProgress(JSON.stringify(old))?.sessions.C01.answers["C01-Q1"],
    ).toBe("0");
    const p = m.setLearningPosition(
      old,
      findLesson("C01")!,
      "course",
      "theory",
    );
    const invalid = {
      ...p,
      learning: { ...p.learning, events: [{ reviewedAt: "bad" }] },
    };
    expect(parseProgress(JSON.stringify(invalid))).toBeNull();
    expect(old.sessions.C01.answers["C01-Q1"]).toBe("0");
  });
});
