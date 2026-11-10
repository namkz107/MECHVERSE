# Industrial Explorer — geometry and rendering correction

Date: 2026-11-10. Base: `0f8a402` on `main`. Scope: frontend product explorer, not a manufacturer CAD integration.

## Verified cause

The new main contains locker/workbench but still routes the fan to `fan-edu-v1.glb`: eight educational occurrences, flat extruded blades and no motor interior. The shared Scene already preserves per-mesh source materials; the earlier diagnosis of color overwriting applies to the older Viewer, not this main. Passing interaction tests did not assess realism.

## Implemented

- Product explorer fan now uses a separate MV-FN02/r2 study assembly: 19 occurrences, curved pitched blade surfaces, two ventilated shell pieces, rotor, stator, winding illustration, bearing supports, illustrative gearbox, fasteners and cord. Slots are actual geometric openings, tested by raycasting.
- Source is original MECHVERSE study geometry. Internal design, electrical topology, gear teeth, dimensions, material grades, manufacturing tolerances and assembly safety are unverified. It is not a digital twin or manufacturer product. No external product identity is claimed.
- CAD is shaded with selective edges, retaining copper appearance. Thin grille/winding edges are excluded from general CAD edge overlays to avoid facet clutter. Selection still highlights them.
- Shared neutral backgrounds, lighting/environment adjustment, lower shadow opacity and no grille shadow casting address the strongly striped stand and visual noise across all three products.
- Fan explode preset uses a spread layout at 100%. Camera fitting measures transformed bounds and accounts for viewport aspect ratio; it runs after assembly transforms. Existing fixed-frame and door hierarchy are preserved.
- Catalog preview PNGs regenerated from each running model. Locker/workbench geometry and their manifests are unchanged.
- F01 explicitly renders the separate original EDU-FAN-01 asset. Its IDs, source data, release and storage key remain unchanged. This means the classroom demo still has the older simplified geometry; only the product-study fan is replaced.
- No runtime dependencies added, no backend/Atlas/environment changes, no push/deploy.

## Validation

- Frontend: **40/40 unit/geometry/content tests pass**, TypeScript check and Vite production build pass.
- Browser: full suite **53 pass / 2 fail**, then both corrected assertions pass on a focused rerun (**2/2**). One new assertion omitted the revision text in the h1 accessible name; one existing assertion still required the old demo disclosure after intentionally switching the product study to original-design. Neither test was skipped. Total 55 distinct cases have passed across these runs; this is not a fresh single-run 55/55 claim.
- Existing F01 gating/reload/fallback, Academy progress, product switches, hinge/callout, paused rotor, keyboard and responsive cases passed.
- Render checks: three products at desktop 1600×1000 and mobile viewport 390×844, no pageerror or horizontal overflow in captured states. Directly inspected fan studio/exploded/mobile, locker studio, workbench studio. `render-check.json` records counters, not FPS.
- Environment: Linux, Chromium Headless Shell 141, SwiftShader. Ordinary Chromium cannot launch in this runtime; official Playwright headless shell was used. These are not physical-phone or Safari results.

## Cost and limits

Fan GLB: **3,913,356 bytes, 90,540 triangles, 64 meshes**. It is larger than the original simplified asset. Viewer JS remains **977.99 kB minified / 270.40 kB gzip**, and its >500 kB warning remains. No physical-device GPU/network benchmark, learning-effectiveness test or expert mechanical review was performed. Headless screenshots demonstrate a CAD-style illustrative improvement; they do not establish photorealism or a verified real product.

## Reproduce

In `frontend/`: `yarn test`, `yarn build`, `yarn test:e2e`. Set `PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH` if using an existing browser executable. `yarn asset:industrial` rebuilds study GLBs; `yarn asset:build` remains the legacy teaching fan generator. `node scripts/qa-realism.mjs` owns a temporary dev server on port 5175, writes these screenshots and regenerates catalog previews; it requires that port to be free and closes only its own server.

- [Fan exploded CAD](qa/realism/fan-cad-exploded.png)
- [Fan studio](qa/realism/fan-studio.png)
- [Fan mobile](qa/realism/fan-mobile.png)
- [Locker studio](qa/realism/locker-studio.png)
- [Workbench studio](qa/realism/workbench-studio.png)
- [Render counters](qa/realism/render-check.json)
