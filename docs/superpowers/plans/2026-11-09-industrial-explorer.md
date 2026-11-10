# Industrial Explorer implementation plan

Goal: one convincing original locker first, then an original workbench, with shared Studio/CAD renderer and mechanical interactions; retain EDU-FAN-01 and all learning data.
Spec: docs/MECHVERSE_Industrial_UI_Multi_Product_Explorer_Prompt.md.
Architecture: keep the existing fan route/F01 UI as a compatibility client of the shared Viewer. Asset manifests drive a second industrial workspace and catalog. Offline Three geometry export produces semantic GLBs; the viewer consumes the same manifest, hierarchy and rest transforms. No new packages.

User explicitly requests immediate implementation and continuous V0–V4; execute inline in the supplied dirty workspace, preserve previous changes, no commit/push. Design choice: original engineering illustrations because candidate CAD catalogs do not establish asset-specific redistribution permission or assembly detail. Geometry dimensions/joins are assumptions documented before construction in INDUSTRIAL-ASSEMBLIES.md.

- [x] V0: read full spec/current state; rerun baseline; record official source shortlist and geometry specification.
- [x] V1a: test asset IDs, hierarchy, joint/explode/reset/switch behavior first. Extract fan parts without changing IDs. Add manifest, state and transform functions; build locker with folded panels, actual openings, hinge axes and attached hardware.
- [x] V1b: make Viewer manifest-driven, abort loads, dispose resources, CAD feature edges, Studio materials/light/shadows, camera presets/focus. Add usable locker workspace; render closed/open/exploded/close-up at required sizes and fix observed defects before V2.
- [x] V2: add workbench with hollow welded frame, top mount hardware, detachable top and lower tray. Catalog five groups with three available assets and truthful research statuses; static previews rendered from actual assets.
- [x] V3: finish catalog/search/filter, contextual toolbar/inspector/tree/mobile, industrial shell links and controlled Academy/Home style changes. Preserve F01 controls and storage.
- [x] V4: actual raycast, hinge axis/reset, rapid-switch/abort/error/retry/fallback, keyboard/reduced motion and old learning regressions. Measure triangles/calls/memory/requests, inspect rendered images, update DESIGN-SYSTEM/ASSET-SOURCING/3D-PIPELINE/QA/IMPLEMENTATION-STATE. Fresh code review, one fix pass.

Review focus: late model requests cannot replace new asset; hidden descendants cannot intercept pointer; door hardware follows hinge, explode and open mutually constrained; welded frame stays together; reset never writes progress. Keep server already owned by the user; stop only test-owned servers, do not leave a new server occupying 5173.

Baseline (fresh): frontend 32/32 and browser 38/38. Final unit 38/38, backend 9/9, both builds pass. Production counters recorded in docs/qa/industrial/performance.json; final full browser suite 53/53 after review fixes (6.3 minutes). No dependency installation. Scope/remaining branded-asset research and device limits recorded in docs/QA-REPORT.md.

Rulings: keep branded CAD integration blocked separately from original designs; no external geometry imported. Keep fixed shell/welded frame intact during explode; latch displayed released rather than showing a locked door opening. Preserve paused animation separately from camera state; callout follows occurrence world transform. Keep one Canvas and one studio environment across model switches. Index only within an occurrence/material and retain unindexed GLB backups. Cost/limit: illustrative designs do not establish manufacturing validity, material grades or product certification.

Fresh review: no Critical; two Important findings (paused rotor reset, stale callout) reproduced RED and fixed GREEN. No deferred minor findings reported. Ledger and QA preserve actual evidence; no commit/push/deploy requested or performed.
