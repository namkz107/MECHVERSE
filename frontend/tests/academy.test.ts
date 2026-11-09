import { describe, expect, it } from "vitest";
import { gradeAnswer, torque } from "../src/features/academy/quiz";
import { validateRegistry } from "../src/features/academy/registry";
import {
  LocalProgressRepository,
  PROGRESS_KEY,
  initialProgress,
  ensureSession,
  setDraft,
  submitSession,
  retrySession,
} from "../src/features/academy/progress";
import { STORAGE_KEY as F01_KEY } from "../src/features/lesson/lesson";
import type { Lesson, Question } from "../src/features/academy/types";

const choice: Question = {
  id: "C01-Q1",
  kind: "choice",
  prompt: "Test",
  choices: [
    { id: "part", label: "Chi tiết" },
    { id: "assembly", label: "Cụm" },
  ],
  correct: "part",
  rationale: "Giải thích.",
  sourceRefs: ["src"],
};
const lesson: Lesson = {
  id: "C01",
  slug: "test",
  revision: 1,
  title: "Test",
  deck: "Test",
  minutes: 5,
  group: "foundation",
  objectives: ["Phân biệt"],
  prerequisites: [],
  conceptIds: ["part"],
  terms: [],
  blocks: [
    {
      id: "b1",
      title: "Nội dung",
      body: ["Nội dung biên soạn."],
      sourceRefs: ["src"],
    },
  ],
  activity: "identify",
  questions: [choice],
  observation: "Quan sát.",
  sourceRefs: ["src"],
  sourceStatus: "source-checked",
  expertReviewStatus: "none",
  publicationScope: "personal-preview",
};

describe("Quiz correctness, feedback and physical assumptions", () => {
  it("distinguishes missing and incorrect choices and requires exact multi-choice sets", () => {
    expect(gradeAnswer(choice, "").errorType).toBe("incomplete");
    expect(gradeAnswer(choice, "assembly").correct).toBe(false);
    expect(gradeAnswer(choice, "part").correct).toBe(true);
    const q: Question = {
      ...choice,
      kind: "multi",
      correct: ["part", "assembly"],
    };
    expect(gradeAnswer(q, ["part"]).correct).toBe(false);
    expect(gradeAnswer(q, ["assembly", "part"]).correct).toBe(true);
    expect(gradeAnswer(q, ["part", "assembly", "other"]).correct).toBe(false);
  });
  it("numeric grading handles decimal commas, compatible unit conversion and invalid numbers", () => {
    const q: Question = {
      ...choice,
      kind: "numeric",
      correct: 1250,
      unit: "mm",
      tolerance: 0.1,
    };
    expect(gradeAnswer(q, { value: "1,25", unit: "m" }).correct).toBe(true);
    expect(gradeAnswer(q, { value: "1250", unit: "kg" }).errorType).toBe(
      "unit",
    );
    for (const value of ["", "Infinity", "NaN", "12abc"])
      expect(gradeAnswer(q, { value, unit: "mm" }).correct).toBe(false);
    expect(gradeAnswer(q, { value: "1250.2", unit: "mm" }).correct).toBe(false);
  });
  it("matching checks every mapping and open answers only receive self-review", () => {
    const q: Question = {
      ...choice,
      kind: "matching",
      correct: { blade: "air", base: "support" },
    };
    expect(gradeAnswer(q, { blade: "air" }).correct).toBe(false);
    expect(gradeAnswer(q, { blade: "support", base: "air" }).correct).toBe(
      false,
    );
    expect(gradeAnswer(q, { blade: "air", base: "support" }).correct).toBe(
      true,
    );
    expect(
      gradeAnswer(
        { ...choice, kind: "open", correct: "" },
        "Câu trả lời của tôi",
      ).errorType,
    ).toBe("self-review");
  });
  it("torque uses the angle between r and F, rejects nonphysical ranges and never returns NaN", () => {
    expect(torque(20, 0.3, 0)).toBe(0);
    expect(torque(20, 0.3, 90)).toBeCloseTo(6);
    expect(torque(20, 0.3, 180)).toBeCloseTo(0);
    expect(torque(-1, 0.3, 90)).toBeNull();
    expect(torque(20, NaN, 90)).toBeNull();
    expect(torque(20, 0.3, 181)).toBeNull();
  });
});

describe("versioned local progress and F01 compatibility", () => {
  const storage = () => {
    const map = new Map<string, string>();
    return {
      getItem: (k: string) => map.get(k) ?? null,
      setItem: (k: string, v: string) => {
        map.set(k, v);
      },
    };
  };
  it("reads legacy F01 without changing its key or granting Academy completion", () => {
    const s = storage();
    const raw = JSON.stringify({
      release: "edu-fan-f01-demo-v1",
      stage: "classify",
      found: true,
      answer: "assembly",
    });
    s.setItem(F01_KEY, raw);
    const repo = new LocalProgressRepository(s);
    const loaded = repo.load();
    expect(loaded.progress.legacyF01?.stage).toBe("classify");
    expect(loaded.progress.sessions).toEqual({});
    expect(repo.save(loaded.progress)).toBe(true);
    expect(s.getItem(F01_KEY)).toBe(raw);
  });
  it("resumes draft, makes submit idempotent and preserves attempts across retry/revision", () => {
    let p = ensureSession(initialProgress(), lesson);
    p = setDraft(p, lesson, choice.id, "assembly");
    const s = storage(),
      repo = new LocalProgressRepository(s);
    repo.save(p);
    expect(repo.load().progress.sessions.C01.answers[choice.id]).toBe(
      "assembly",
    );
    p = submitSession(p, lesson);
    expect(p.sessions.C01.attempts).toHaveLength(1);
    expect(p.sessions.C01.phase).toBe("review");
    p = submitSession(p, lesson);
    expect(p.sessions.C01.attempts).toHaveLength(1);
    p = retrySession(p, lesson);
    p = setDraft(p, lesson, choice.id, "part");
    p = submitSession(p, lesson);
    expect(p.sessions.C01.attempts).toHaveLength(2);
    const changed = ensureSession(p, { ...lesson, revision: 2 });
    expect(changed.sessions.C01.phase).toBe("working");
    expect(changed.archives[0].attempts).toHaveLength(2);
  });
  it("rejects invalid import, makes a backup before valid import and reports quota errors", () => {
    const s = storage(),
      repo = new LocalProgressRepository(s);
    repo.save(initialProgress());
    const original = s.getItem(PROGRESS_KEY);
    expect(repo.importData("{bad")).toBe(false);
    expect(s.getItem(PROGRESS_KEY)).toBe(original);
    const p = setDraft(
      ensureSession(initialProgress(), lesson),
      lesson,
      choice.id,
      "part",
    );
    expect(repo.importData(JSON.stringify(p))).toBe(true);
    expect(s.getItem(PROGRESS_KEY + ":backup")).toBe(original);
    expect(repo.load().progress.sessions.C01.answers[choice.id]).toBe("part");
    const failed = new LocalProgressRepository({
      getItem: () => null,
      setItem: () => {
        throw new Error("quota");
      },
    });
    expect(failed.save(p)).toBe(false);
  });
});

describe("content registry integrity", () => {
  it("rejects unresolved evidence, duplicate question IDs, circular prerequisites and fabricated expert status", () => {
    const source = {
      id: "src",
      title: "Source",
      publisher: "Publisher",
      author: "Author",
      url: "https://example.org/source",
      locator: "§1",
      version: "1",
      checkedAt: "2026-11-09",
      scope: "General",
      usage: "Link only",
      sourceStatus: "source-checked" as const,
    };
    expect(validateRegistry([lesson], [source])).toEqual([]);
    expect(
      validateRegistry([{ ...lesson, sourceRefs: ["missing"] }], [source])
        .length,
    ).toBeGreaterThan(0);
    expect(
      validateRegistry([{ ...lesson, questions: [choice, choice] }], [source])
        .length,
    ).toBeGreaterThan(0);
    expect(
      validateRegistry([{ ...lesson, prerequisites: ["C01"] }], [source])
        .length,
    ).toBeGreaterThan(0);
    expect(
      validateRegistry(
        [{ ...lesson, expertReviewStatus: "reviewed" } as unknown as Lesson],
        [source],
      ).length,
    ).toBeGreaterThan(0);
  });
});
