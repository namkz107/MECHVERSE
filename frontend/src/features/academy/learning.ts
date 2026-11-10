import type { ActivityKind, Lesson } from "./types";
import type { Progress } from "./progress";
import { activityKindFor, modesFor, type Mode } from "./curriculum";
export type Rating = "again" | "remembered";
export type Card = {
  id: string;
  revision: number;
  lessonId: string;
  front: string;
  back: string;
  sourceRefs: string[];
};
export type ReviewEvent = {
  cardId: string;
  revision: number;
  localProfileId: "local";
  reviewedAt: string;
  rating: Rating;
  dueAt: string;
};
export type LearningState = {
  version: 1;
  positions: Record<
    string,
    {
      revision: number;
      mode: Mode;
      section: string;
      courseSection?: string;
      cardIndex: number;
      updatedAt: string;
    }
  >;
  reviews: Record<string, ReviewEvent & { streak: number }>;
  events: ReviewEvent[];
  practicals: Record<
    string,
    { revision: number; text: string; status: "unreviewed"; updatedAt: string }
  >;
  practicalArchives: {
    lessonId: string;
    revision: number;
    text: string;
    status: "unreviewed";
    updatedAt: string;
  }[];
  activities?: Record<
    string,
    { revision: number; values: Record<string, unknown> }
  >;
  activityArchives?: {
    lessonId: string;
    revision: number;
    values: Record<string, unknown>;
  }[];
  onboarding?: { goal: string; minutes: number };
};
export const emptyLearning = (): LearningState => ({
  version: 1,
  positions: {},
  reviews: {},
  events: [],
  practicals: {},
  practicalArchives: [],
});
export function cardsFor(l: Lesson): Card[] {
  return l.terms.map((t, i) => ({
    id: `${l.id}-T${i + 1}`,
    revision: l.revision,
    lessonId: l.id,
    front: `Giải thích bằng lời của bạn: ${t.term}`,
    back: t.meaning,
    sourceRefs: l.sourceRefs,
  }));
}
export function setLearningPosition(
  p: Progress,
  l: Lesson,
  mode: Mode,
  section = "theory",
  cardIndex?: number,
): Progress {
  if (
    !modesFor(l).includes(mode) ||
    !["theory", "activity", "quiz", "sources", "practical"].includes(section)
  )
    return p;
  const learning = p.learning ?? emptyLearning(),
    old = learning.positions[l.id],
    current = old?.revision === l.revision ? old : undefined;
  const courseSection =
    mode === "course"
      ? section
      : current?.mode === "course"
        ? current.section
        : (current?.courseSection ?? "theory");
  return {
    ...p,
    learning: {
      ...learning,
      positions: {
        ...learning.positions,
        [l.id]: {
          revision: l.revision,
          mode,
          section,
          courseSection,
          cardIndex: Math.max(
            0,
            Math.min(l.terms.length - 1, cardIndex ?? current?.cardIndex ?? 0),
          ),
          updatedAt: new Date().toISOString(),
        },
      },
    },
  };
}
export interface ReviewScheduler {
  dueAt(rating: Rating, streak: number, reviewedAt: string): string;
}
// Configurable first approximation, elapsed 24h days in UTC, not FSRS or an optimal schedule.
export const simpleScheduler: ReviewScheduler = {
  dueAt: (rating, streak, now) =>
    new Date(
      Date.parse(now) +
        (rating === "again" ? 1 : [1, 3, 7][Math.min(streak, 2)]) * 86400000,
    ).toISOString(),
};
export function rateCard(
  p: Progress,
  card: Card,
  rating: Rating,
  now = new Date().toISOString(),
  scheduler: ReviewScheduler = simpleScheduler,
): Progress {
  if (
    !Number.isFinite(Date.parse(now)) ||
    !["again", "remembered"].includes(rating)
  )
    return p;
  const learning = p.learning ?? emptyLearning(),
    key = `${card.id}-r${card.revision}`,
    old = learning.reviews[key];
  // Same event replay is idempotent; switching modes cannot create an extra review.
  if (old?.reviewedAt === now) return p;
  const streak = rating === "again" ? 0 : (old?.streak ?? 0) + 1;
  const event: ReviewEvent = {
    cardId: card.id,
    revision: card.revision,
    localProfileId: "local",
    reviewedAt: now,
    rating,
    dueAt: scheduler.dueAt(rating, old?.streak ?? 0, now),
  };
  return {
    ...p,
    learning: {
      ...learning,
      reviews: { ...learning.reviews, [key]: { ...event, streak } },
      events: [...learning.events, event].slice(-200),
    },
  };
}
export function dueCards(
  p: Progress,
  lessons: Lesson[],
  now = new Date().toISOString(),
): Card[] {
  return lessons.flatMap(cardsFor).filter((card) => {
    const review = p.learning?.reviews[`${card.id}-r${card.revision}`];
    return !!review && Date.parse(review.dueAt) <= Date.parse(now);
  });
}
export function savePractical(p: Progress, l: Lesson, text: string): Progress {
  if (!l.practicalRubric || text.length > 4000) return p;
  const learning = p.learning ?? emptyLearning(),
    old = learning.practicals[l.id];
  return {
    ...p,
    learning: {
      ...learning,
      practicalArchives:
        old && old.revision !== l.revision
          ? [...learning.practicalArchives, { lessonId: l.id, ...old }]
          : learning.practicalArchives,
      practicals: {
        ...learning.practicals,
        [l.id]: {
          revision: l.revision,
          text,
          status: "unreviewed",
          updatedAt: new Date().toISOString(),
        },
      },
    },
  };
}
export function objectiveState(
  p: Progress,
  l: Lesson,
): "unseen" | "viewed" | "practice" | "demonstrated" | "review" {
  const s = p.sessions[l.id];
  if (!s || s.revision !== l.revision) return "unseen";
  const a = s.attempts.at(-1);
  if (!a) return Object.keys(s.answers).length ? "practice" : "viewed";
  if (a.incorrectIds.length || dueCards(p, [l]).length) return "review";
  // Self-review is not an expert decision and does not waive a practical requirement.
  if (l.practicalRubric || l.questions.some((q) => q.kind === "open"))
    return "practice";
  return "demonstrated";
}
export function activityValue<T>(
  p: Progress,
  l: Lesson,
  name: string,
  fallback: T,
): T {
  const saved = p.learning?.activities?.[l.id];
  const value = saved?.values[name];
  return saved?.revision === l.revision &&
    validLessonActivityValue(value, name, l.activity)
    ? (value as T)
    : fallback;
}
export function saveActivityValue(
  p: Progress,
  l: Lesson,
  name: string,
  value: unknown,
): Progress {
  if (!validLessonActivityValue(value, name, l.activity)) return p;
  const learning = p.learning ?? emptyLearning(),
    old = learning.activities?.[l.id];
  return {
    ...p,
    learning: {
      ...learning,
      activities: {
        ...learning.activities,
        [l.id]: {
          revision: l.revision,
          values: {
            ...(old?.revision === l.revision ? old.values : {}),
            [name]: value,
          },
        },
      },
      activityArchives:
        old && old.revision !== l.revision
          ? [...(learning.activityArchives ?? []), { lessonId: l.id, ...old }]
          : (learning.activityArchives ?? []),
    },
  };
}
const key = (s: string) =>
  /^[A-Za-z0-9_-]{1,80}$/.test(s) &&
  !["__proto__", "constructor", "prototype"].includes(s);
const date = (s: unknown) =>
  typeof s === "string" && Number.isFinite(Date.parse(s));
const record = (
  o: unknown,
  max: number,
  predicate: (v: any, k: string) => boolean,
) =>
  !!o &&
  typeof o === "object" &&
  !Array.isArray(o) &&
  Object.keys(o).length <= max &&
  Object.entries(o).every(([k, v]) => key(k) && predicate(v, k));
const event = (e: any) =>
  !!e &&
  key(e.cardId ?? "") &&
  Number.isInteger(e.revision) &&
  e.revision > 0 &&
  e.localProfileId === "local" &&
  ["again", "remembered"].includes(e.rating) &&
  date(e.reviewedAt) &&
  date(e.dueAt) &&
  Date.parse(e.dueAt) >= Date.parse(e.reviewedAt);
const practical = (v: any) =>
  !!v &&
  Number.isInteger(v.revision) &&
  v.revision > 0 &&
  typeof v.text === "string" &&
  v.text.length <= 4000 &&
  v.status === "unreviewed" &&
  date(v.updatedAt);
function validActivityValue(v: any, name: string): boolean {
  if (name === "variant") return Number.isInteger(v) && v >= 0 && v < 3;
  if (name === "force")
    return typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= 100;
  if (name === "radius")
    return typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= 1;
  if (name === "angle")
    return typeof v === "number" && Number.isFinite(v) && v >= 0 && v <= 180;
  if (name === "result")
    return (
      v === null ||
      (!!v &&
        typeof v.correct === "boolean" &&
        typeof v.feedback === "string" &&
        v.feedback.length <= 4000)
    );
  if (["value", "unit", "prediction"].includes(name))
    return typeof v === "string" && v.length <= 4000;
  if (name === "answer")
    return (
      v === null ||
      (typeof v === "string" && v.length <= 4000) ||
      (Number.isInteger(v) && v >= 0 && v < 20) ||
      record(v, 100, (a) => typeof a === "string" && a.length <= 100)
    );
  return false;
}
function validLessonActivityValue(
  value: unknown,
  name: string,
  kind?: ActivityKind,
): boolean {
  if (!validActivityValue(value, name)) return false;
  if (name !== "answer" || !kind) return true;
  if (kind === "matching")
    return record(value, 100, (a) => typeof a === "string" && a.length <= 100);
  if (kind === "projection") return typeof value === "string";
  return value === null || Number.isInteger(value);
}
const activity = (v: any, lessonId: string) =>
  !!v &&
  Number.isInteger(v.revision) &&
  v.revision > 0 &&
  record(v.values, 20, (a, k) =>
    validLessonActivityValue(a, k, activityKindFor(lessonId, v.revision)),
  );
export function validLearning(v: any): v is LearningState {
  return (
    !!v &&
    v.version === 1 &&
    record(
      v.positions,
      100,
      (a) =>
        !!a &&
        Number.isInteger(a.revision) &&
        a.revision > 0 &&
        ["course", "cards", "quiz", "explore", "lab"].includes(a.mode) &&
        ["theory", "activity", "quiz", "sources", "practical"].includes(
          a.section,
        ) &&
        Number.isInteger(a.cardIndex) &&
        a.cardIndex >= 0 &&
        a.cardIndex < 100 &&
        date(a.updatedAt) &&
        (a.courseSection === undefined ||
          ["theory", "activity", "quiz", "sources", "practical"].includes(
            a.courseSection,
          )),
    ) &&
    record(
      v.reviews,
      4000,
      (a, k) =>
        event(a) &&
        k === `${a.cardId}-r${a.revision}` &&
        Number.isInteger(a.streak) &&
        a.streak >= 0,
    ) &&
    Array.isArray(v.events) &&
    v.events.length <= 200 &&
    v.events.every(event) &&
    record(v.practicals, 100, practical) &&
    Array.isArray(v.practicalArchives) &&
    v.practicalArchives.length <= 1000 &&
    v.practicalArchives.every(
      (a: any) => practical(a) && key(a.lessonId ?? ""),
    ) &&
    (!v.onboarding ||
      (typeof v.onboarding.goal === "string" &&
        v.onboarding.goal.length <= 300 &&
        [10, 20, 30].includes(v.onboarding.minutes))) &&
    (v.activities === undefined || record(v.activities, 100, activity)) &&
    (v.activityArchives === undefined ||
      (Array.isArray(v.activityArchives) &&
        v.activityArchives.length <= 1000 &&
        v.activityArchives.every(
          (a: any) => key(a.lessonId ?? "") && activity(a, a.lessonId),
        )))
  );
}
