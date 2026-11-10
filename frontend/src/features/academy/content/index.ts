import { foundationLessons } from "./foundations";
import { foundationSources } from "./sources";
import { advancedLessons, advancedSources } from "./advanced";
import { validateRegistry } from "../registry";
import { beginnerLessons, beginnerSources } from "./beginner";
import { canonicalId } from "../curriculum";
export const lessons = [
  ...foundationLessons,
  ...advancedLessons,
  ...beginnerLessons,
];
export const sources = [
  ...foundationSources,
  ...advancedSources,
  ...beginnerSources,
];
export const contentErrors = validateRegistry(lessons, sources);
export const findLesson = (slug: string) =>
  lessons.find((l) => l.slug === slug || l.id === canonicalId(slug));
