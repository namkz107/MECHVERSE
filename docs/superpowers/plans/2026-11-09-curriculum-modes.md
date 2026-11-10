# Curriculum and learning modes implementation

Goal: give a beginner a working guided path, six real M01 lessons, M02 foundations and shared local evidence across modes.

Spec: docs/CURRICULUM-LEARNING-MODES.md (preserves the full supplied requirements).

Architecture: keep existing C/F IDs and storage keys; map stable Mxx-Lxx catalog entries to canonical lessons. Add optional versioned learning state to Academy v1, validate imports, archive revision changes. All modes use one session and question bank. Self-rated cards never grant practical mastery or XP.

Constraints: frontend/backend/docs, Yarn and yarn start unchanged; no Knowns, Atlas/auth/AI dependency, fabricated source review or mass placeholder lesson pages. Implement inline in the supplied workspace so the IDE and running app see the changes; no git integration requested.

- [x] Preserve requirements; inventory C/F mapping and all 96 planned scopes, core/advanced prerequisites and coverage gaps.
- [x] Tests first: catalog integrity, alias history, beginner resume, card scheduling/revision, practical evidence and idempotent submission.
- [x] Implement roadmap/onboarding and canonical M01/M02 links; authored lessons include worked examples, common errors, assessments, sources and practical rubric.
- [x] Add course/cards/quiz/3D navigation with persisted position, shared drafts, bounded review schedule and due review/error journal.
- [x] Run unit/build/backend checks, browser journey/reload/mode/F01 regression and responsive render. Review diff and update QA/implementation state with actual results.

Review focus: old local progress must survive; flashcards cannot complete practical work; changed revisions must not reuse mastery; storage failures keep in-session work; planned lessons cannot open blank pages.

Implemented scope: 19 canonical lessons / 64 questions / 20 sources. M01 and M02 each have six available introductory lessons, including seven newly authored lessons and five reused C lessons. Seven later C lessons provide partial coverage; 77 remaining slots and five advanced branches are outlines. Coverage generation validates IDs, sources, assessment ownership and prerequisite paths. Learning evidence currently aggregates outcomes by lesson; independent assessment of every smaller competency is future work.

Review corrections with regression coverage: latest-lesson resume; lab input/feedback persistence; theory links from lab mode; quiz anchors opening from cards; explicit mode choices superseding stale URL anchors; guided section retained across modes; imported activity answers checked against the current lesson activity type, with safe restoration defaults. Older activity revisions remain archived rather than treated as current evidence.

Verification: frontend 32/32; backend 9/9; both builds pass; coverage validator has zero errors. All 38 browser cases passed (full run 37 pass / one screenshot-file write error; targeted rerun 1/1 pass unchanged). See docs/QA-REPORT.md for commands, actual screenshots and limits. No deployment, commit or dependency installation.
