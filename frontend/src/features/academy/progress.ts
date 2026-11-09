import type { Answer, Lesson } from "./types";
import type { LessonState } from "../lesson/lesson";
import { restoreLesson, STORAGE_KEY as F01_KEY } from "../lesson/lesson";
import { gradeAnswer } from "./quiz";
export const PROGRESS_KEY = "mechverse:academy:progress";
export type Attempt = {
  id: string;
  submittedAt: string;
  answers: Record<string, Answer>;
  correctIds: string[];
  incorrectIds: string[];
};
export type Session = {
  lessonId: string;
  revision: number;
  phase: "working" | "review";
  answers: Record<string, Answer>;
  attempts: Attempt[];
};
export type Progress = {
  version: 1;
  sessions: Record<string, Session>;
  archives: Session[];
  legacyF01?: LessonState;
};
export function initialProgress(): Progress {
  return { version: 1, sessions: {}, archives: [] };
}
export function ensureSession(p: Progress, l: Lesson): Progress {
  const previous = p.sessions[l.id];
  if (previous?.revision === l.revision) return p;
  return {
    ...p,
    archives: previous ? [...p.archives, previous] : p.archives,
    sessions: {
      ...p.sessions,
      [l.id]: {
        lessonId: l.id,
        revision: l.revision,
        phase: "working",
        answers: {},
        attempts: [],
      },
    },
  };
}
export function setDraft(
  p: Progress,
  l: Lesson,
  q: string,
  a: Answer,
): Progress {
  p = ensureSession(p, l);
  const session = p.sessions[l.id];
  if (session.phase === "review" || !l.questions.some((item) => item.id === q))
    return p;
  return {
    ...p,
    sessions: {
      ...p.sessions,
      [l.id]: { ...session, answers: { ...session.answers, [q]: a } },
    },
  };
}
export function submitSession(p: Progress, l: Lesson): Progress {
  p = ensureSession(p, l);
  const s = p.sessions[l.id];
  if (s.phase === "review") return p;
  const correctIds = l.questions
    .filter((q) => gradeAnswer(q, s.answers[q.id]).correct)
    .map((q) => q.id);
  const incorrectIds = l.questions
    .filter((q) => !correctIds.includes(q.id) && q.kind !== "open")
    .map((q) => q.id);
  const attempt: Attempt = {
    id: `${l.id}-r${l.revision}-${s.attempts.length + 1}`,
    submittedAt: new Date().toISOString(),
    answers: { ...s.answers },
    correctIds,
    incorrectIds,
  };
  return {
    ...p,
    sessions: {
      ...p.sessions,
      [l.id]: { ...s, phase: "review", attempts: [...s.attempts, attempt] },
    },
  };
}
export function retrySession(p: Progress, l: Lesson): Progress {
  p = ensureSession(p, l);
  const s = p.sessions[l.id];
  return {
    ...p,
    sessions: {
      ...p.sessions,
      [l.id]: { ...s, phase: "working", answers: {} },
    },
  };
}
const safeKey = (key: string) =>
  /^[A-Za-z0-9_-]{1,80}$/.test(key) &&
  !["__proto__", "constructor", "prototype"].includes(key);
function validAnswer(a: unknown): boolean {
  if (typeof a === "string") return a.length <= 4000;
  if (Array.isArray(a))
    return (
      a.length <= 100 && a.every((v) => typeof v === "string" && v.length <= 80)
    );
  return (
    !!a &&
    typeof a === "object" &&
    Object.keys(a).length <= 100 &&
    Object.entries(a).every(
      ([key, value]) =>
        safeKey(key) && typeof value === "string" && value.length <= 4000,
    )
  );
}
function validAnswers(a: unknown): boolean {
  return (
    !!a &&
    typeof a === "object" &&
    !Array.isArray(a) &&
    Object.keys(a).length <= 1000 &&
    Object.entries(a).every(
      ([key, value]) => safeKey(key) && validAnswer(value),
    )
  );
}
function validSession(s: unknown): s is Session {
  if (!s || typeof s !== "object") return false;
  const v = s as Session;
  return (
    typeof v.lessonId === "string" &&
    safeKey(v.lessonId) &&
    Number.isInteger(v.revision) &&
    v.revision > 0 &&
    ["working", "review"].includes(v.phase) &&
    validAnswers(v.answers) &&
    Array.isArray(v.attempts) &&
    v.attempts.length < 1000 &&
    (v.phase !== "review" || v.attempts.length > 0) &&
    v.attempts.every(
      (a) =>
        typeof a.id === "string" &&
        safeKey(a.id) &&
        typeof a.submittedAt === "string" &&
        Number.isFinite(Date.parse(a.submittedAt)) &&
        Array.isArray(a.correctIds) &&
        a.correctIds.length <= 1000 &&
        a.correctIds.every((id) => typeof id === "string" && safeKey(id)) &&
        Array.isArray(a.incorrectIds) &&
        a.incorrectIds.length <= 1000 &&
        a.incorrectIds.every((id) => typeof id === "string" && safeKey(id)) &&
        validAnswers(a.answers),
    )
  );
}
export function parseProgress(raw: string): Progress | null {
  try {
    if (raw.length > 2_000_000) return null;
    const p = JSON.parse(raw);
    if (
      p.version !== 1 ||
      !p.sessions ||
      typeof p.sessions !== "object" ||
      Array.isArray(p.sessions) ||
      !Array.isArray(p.archives) ||
      p.archives.length > 1000
    )
      return null;
    if (
      Object.keys(p.sessions).length > 100 ||
      !Object.entries(p.sessions).every(
        ([id, s]) =>
          safeKey(id) && validSession(s) && (s as Session).lessonId === id,
      ) ||
      !p.archives.every(validSession)
    )
      return null;
    if (p.legacyF01) p.legacyF01 = restoreLesson(JSON.stringify(p.legacyF01));
    return p;
  } catch {
    return null;
  }
}
export interface ProgressRepository {
  load(): { progress: Progress; status: string };
  save(progress: Progress): boolean;
  importData(raw: string): boolean;
  exportData(progress: Progress): string;
}
export class LocalProgressRepository implements ProgressRepository {
  constructor(private storage: Pick<Storage, "getItem" | "setItem">) {}
  load() {
    try {
      const raw = this.storage.getItem(PROGRESS_KEY);
      let p = raw ? parseProgress(raw) : initialProgress();
      const status = raw ? (p ? "loaded" : "invalid") : "empty";
      if (!p) p = initialProgress();
      const legacy = this.storage.getItem(F01_KEY);
      if (legacy) p = { ...p, legacyF01: restoreLesson(legacy) };
      return { progress: p, status };
    } catch {
      return { progress: initialProgress(), status: "unavailable" };
    }
  }
  save(p: Progress) {
    try {
      if (!parseProgress(JSON.stringify(p))) return false;
      const previous = this.storage.getItem(PROGRESS_KEY);
      if (previous && !parseProgress(previous))
        this.storage.setItem(PROGRESS_KEY + ":backup", previous);
      this.storage.setItem(PROGRESS_KEY, JSON.stringify(p));
      return true;
    } catch {
      return false;
    }
  }
  importData(raw: string) {
    const p = parseProgress(raw);
    if (!p) return false;
    try {
      const previous = this.storage.getItem(PROGRESS_KEY);
      if (previous) this.storage.setItem(PROGRESS_KEY + ":backup", previous);
      return this.save(p);
    } catch {
      return false;
    }
  }
  exportData(p: Progress) {
    return JSON.stringify(p, null, 2);
  }
}
