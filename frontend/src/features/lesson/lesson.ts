export const RELEASE = "edu-fan-f01-demo-v1";
export const STORAGE_KEY = "mechverse:demo:f01";
export type Stage = "observe" | "find" | "classify" | "complete";
export type LessonState = {
  release: string;
  stage: Stage;
  found: boolean;
  answer: string;
};
export type LessonAction =
  | { type: "observe" }
  | { type: "identify"; part: string | null }
  | { type: "classify"; answer: string };
export const initialLesson: LessonState = {
  release: RELEASE,
  stage: "observe",
  found: false,
  answer: "",
};
export const advanceLesson = (
  state: LessonState,
  action: LessonAction,
): LessonState => {
  if (state.stage === "observe" && action.type === "observe")
    return { ...state, stage: "find" };
  if (
    state.stage === "find" &&
    action.type === "identify" &&
    action.part === "blade"
  )
    return { ...state, stage: "classify", found: true };
  if (
    state.stage === "classify" &&
    state.found &&
    action.type === "classify" &&
    action.answer === "part"
  )
    return { ...state, stage: "complete", answer: "part" };
  return state;
};
export const restoreLesson = (raw: string | null): LessonState => {
  try {
    const v = JSON.parse(raw ?? "null");
    if (
      !v ||
      v.release !== RELEASE ||
      typeof v.found !== "boolean" ||
      typeof v.answer !== "string"
    )
      return { ...initialLesson };
    if (!["observe", "find", "classify", "complete"].includes(v.stage))
      return { ...initialLesson };
    if (!["", "part", "assembly"].includes(v.answer))
      return { ...initialLesson };
    if ((v.stage === "classify" || v.stage === "complete") && !v.found)
      return { ...initialLesson };
    if (v.stage === "complete" && v.answer !== "part")
      return { ...initialLesson };
    if ((v.stage === "observe" || v.stage === "find") && (v.found || v.answer))
      return { ...initialLesson };
    return {
      release: RELEASE,
      stage: v.stage,
      found: v.found,
      answer: v.answer,
    };
  } catch {
    return { ...initialLesson };
  }
};
export const saveLesson = (
  state: LessonState,
  storage: Pick<Storage, "setItem">,
): boolean => {
  try {
    storage.setItem(STORAGE_KEY, JSON.stringify(state));
    return true;
  } catch {
    return false;
  }
};
