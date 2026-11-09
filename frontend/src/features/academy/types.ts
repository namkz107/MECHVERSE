export type Source = {
  id: string;
  title: string;
  publisher: string;
  author: string;
  url: string;
  locator: string;
  version: string;
  checkedAt: string;
  scope: string;
  usage: string;
  sourceStatus: "source-checked" | "needs-recheck";
};
export type Answer =
  string | string[] | { value: string; unit: string } | Record<string, string>;
export type Question = {
  id: string;
  kind: "choice" | "multi" | "numeric" | "matching" | "open";
  prompt: string;
  choices?: { id: string; label: string }[];
  items?: { id: string; label: string }[];
  correct: string | string[] | number | Record<string, string>;
  unit?: string;
  tolerance?: number;
  rationale: string;
  sourceRefs: string[];
  rubric?: string[];
};
export type ActivityKind =
  | "identify"
  | "matching"
  | "units"
  | "geometry"
  | "coordinates"
  | "forces"
  | "torque"
  | "bearings"
  | "materials"
  | "manufacturing"
  | "projection"
  | "tolerance";
export type Lesson = {
  id: string;
  slug: string;
  revision: number;
  title: string;
  deck: string;
  minutes: number;
  group: "foundation" | "mechanics" | "design";
  objectives: string[];
  prerequisites: string[];
  conceptIds: string[];
  terms: { term: string; meaning: string }[];
  blocks: {
    id: string;
    title: string;
    body: string[];
    sourceRefs: string[];
    kind?: "theory" | "example" | "technical" | "design";
    diagram?: ActivityKind;
  }[];
  activity: ActivityKind;
  questions: Question[];
  observation: string;
  sourceRefs: string[];
  sourceStatus: "source-checked" | "needs-recheck";
  expertReviewStatus: "none";
  publicationScope: "personal-preview";
};
export type Grade = {
  correct: boolean;
  feedback: string;
  errorType:
    "none" | "incomplete" | "concept" | "unit" | "value" | "self-review";
};
