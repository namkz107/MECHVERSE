import { describe, it, expect } from "vitest";
import {
  lessons,
  sources,
  contentErrors,
} from "../src/features/academy/content";
import { gradeAnswer } from "../src/features/academy/quiz";
import { validateRegistry } from "../src/features/academy/registry";
import {
  parseProgress,
  initialProgress,
  ensureSession,
} from "../src/features/academy/progress";
describe("published personal-preview learning package", () => {
  it("contains twelve teachable lessons with resolving evidence and forty meaningful questions", () => {
    expect(lessons.map((l) => l.id)).toEqual([
      "C01",
      "C02",
      "C03",
      "C04",
      "C05",
      "C06",
      "C07",
      "C08",
      "C09",
      "C10",
      "C11",
      "C12",
    ]);
    expect(
      lessons.reduce((sum, l) => sum + l.questions.length, 0),
    ).toBeGreaterThanOrEqual(40);
    expect(contentErrors).toEqual([]);
    for (const l of lessons) {
      expect(l.blocks.length).toBeGreaterThanOrEqual(3);
      expect(l.sourceRefs.length).toBeGreaterThan(0);
      expect(l.expertReviewStatus).toBe("none");
      expect(l.publicationScope).toBe("personal-preview");
    }
  });
  it("grades independent mm/radius/torque/acceleration fixtures and exact conversion limits", () => {
    const get = (id: string) =>
      lessons.flatMap((l) => l.questions).find((q) => q.id === id)!;
    expect(
      gradeAnswer(get("C03-Q2"), { value: "0.007", unit: "m" }).correct,
    ).toBe(false);
    expect(
      gradeAnswer(get("C04-Q2"), { value: "21", unit: "mm" }).correct,
    ).toBe(true);
    expect(
      gradeAnswer(get("C07-Q1"), { value: "3000", unit: "N·mm" }).correct,
    ).toBe(true);
    expect(
      gradeAnswer(get("C06-Q2"), { value: "2", unit: "m/s²" }).correct,
    ).toBe(true);
  });
  it("rejects invalid answer shape, tolerance and evidence claiming unreviewed sources are checked", () => {
    const l = lessons[0],
      q = l.questions[0];
    expect(
      validateRegistry(
        [
          {
            ...l,
            questions: [
              {
                ...q,
                kind: "numeric",
                correct: NaN,
                unit: "mm",
                tolerance: -1,
              },
            ],
          },
        ],
        sources,
      ).length,
    ).toBeGreaterThan(0);
    expect(
      validateRegistry(
        [l],
        sources.map((s) => ({ ...s, sourceStatus: "needs-recheck" })),
      ).length,
    ).toBeGreaterThan(0);
    const p = ensureSession(initialProgress(), l);
    p.sessions.C01.answers[q.id] = {
      value: { nested: "no" } as unknown as string,
      unit: "mm",
    };
    expect(parseProgress(JSON.stringify(p))).toBeNull();
  });
});
