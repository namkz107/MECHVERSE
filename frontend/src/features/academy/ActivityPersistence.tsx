import {
  createContext,
  useContext,
  useState,
  type ReactNode,
  type Dispatch,
  type SetStateAction,
} from "react";
import { useProgress } from "./ProgressContext";
import { activityValue, saveActivityValue } from "./learning";
import type { Lesson } from "./types";
const Context = createContext<Lesson | null>(null);
export function ActivityPersistence({
  lesson,
  children,
}: {
  lesson: Lesson;
  children: ReactNode;
}) {
  return <Context.Provider value={lesson}>{children}</Context.Provider>;
}
export function useActivityState<T>(
  name: string,
  initial: T,
): [T, Dispatch<SetStateAction<T>>] {
  const lesson = useContext(Context),
    { progress, update } = useProgress();
  const [local, setLocal] = useState<T>(initial);
  if (!lesson) return [local, setLocal];
  return [
    activityValue(progress, lesson, name, initial),
    (value) =>
      update((p) =>
        saveActivityValue(
          p,
          lesson,
          name,
          typeof value === "function"
            ? (value as (old: T) => T)(activityValue(p, lesson, name, initial))
            : value,
        ),
      ),
  ];
}
