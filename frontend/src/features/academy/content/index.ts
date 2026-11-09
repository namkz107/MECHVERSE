import { foundationLessons } from "./foundations";
import { foundationSources } from "./sources";
import {advancedLessons,advancedSources} from './advanced';
import { validateRegistry } from "../registry";
export const lessons = [...foundationLessons,...advancedLessons];
export const sources = [...foundationSources,...advancedSources];
export const contentErrors = validateRegistry(lessons, sources);
export const findLesson = (slug: string) =>
  lessons.find((l) => l.slug === slug || l.id === slug);
