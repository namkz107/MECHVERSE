# U0 upgrade baseline

Fresh checks run on 2026-11-09, approximately 11:51–11:52 Asia/Bangkok, before product source changes. This report records new executions; the earlier reported 9/9 and 12/12 results were not reused.

## Environment and commands

Windows PowerShell, Node v22.21.0, Yarn Classic 1.22.22. Installed frontend versions: TypeScript 5.9.3, Vite 7.3.7, Vitest 3.2.7, Playwright 1.65.0, Three 0.181.2. No dependency installation or lockfile changes.

The user-owned frontend at `http://127.0.0.1:5173` and backend health at `http://127.0.0.1:3001/api/health` both returned HTTP 200 before the browser run. Existing servers were reused, never stopped or reconfigured. No `.env` contents were read or copied. Yarn required the installed executable outside the workspace sandbox, so the five Yarn invocations used the approved escalated execution path.

Exact verification commands newly run, with the indicated working directories:

```powershell
# D:/Winter2026/MECHVERSE/frontend
yarn test 2>&1 | Tee-Object -FilePath ../.cache/u0-baseline/frontend-test.log; exit $LASTEXITCODE
yarn build 2>&1 | Tee-Object -FilePath ../.cache/u0-baseline/frontend-build.log; exit $LASTEXITCODE

# D:/Winter2026/MECHVERSE/backend
yarn test 2>&1 | Tee-Object -FilePath ../.cache/u0-baseline/backend-test.log; exit $LASTEXITCODE
yarn build 2>&1 | Tee-Object -FilePath ../.cache/u0-baseline/backend-build.log; exit $LASTEXITCODE

# D:/Winter2026/MECHVERSE/frontend
$frontStatus = (Invoke-WebRequest -Uri http://127.0.0.1:5173 -UseBasicParsing).StatusCode; $apiStatus = (Invoke-WebRequest -Uri http://127.0.0.1:3001/api/health -UseBasicParsing).StatusCode; Write-Output "Frontend HTTP $frontStatus; backend health HTTP $apiStatus"; $env:PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH='C:/Users/LOQ/AppData/Local/ms-playwright/chromium-1248/chrome-win64/chrome.exe'; yarn test:e2e 2>&1 | Tee-Object -FilePath ../.cache/u0-baseline/frontend-e2e.log; exit $LASTEXITCODE
```

| Check | Fresh result | Evidence |
| --- | --- | --- |
| Frontend unit/domain/asset tests | Pass: 9/9, 2 files; 535 ms Vitest duration | `.cache/u0-baseline/frontend-test.log` |
| Frontend build | Pass: exit 0; 2,149 transformed modules; Vite build 15.29 s | `.cache/u0-baseline/frontend-build.log` |
| Backend tests | Pass: 9/9; zero failures/skips; 1,135.8 ms runner duration | `.cache/u0-baseline/backend-test.log` |
| Backend TypeScript build | Pass: exit 0; Yarn duration 2.83 s | `.cache/u0-baseline/backend-build.log` |
| Browser E2E | Pass: 12/12; 38.1 s; one worker | `.cache/u0-baseline/frontend-e2e.log` |

No test failures. Vite still warns about minified chunks over 500 kB. PowerShell also formats native stderr as `NativeCommandError` records, and Playwright reports `NO_COLOR` ignored because `FORCE_COLOR` is set; both processes finish successfully with exit 0.

## Fresh production output

Sizes below are filesystem bytes from the new build; gzip values are Vite's rounded kB output.

| Emitted file | Bytes | Gzip kB |
| --- | ---: | ---: |
| `frontend/dist/index.html` | 634 | 0.43 |
| `frontend/dist/assets/index-CEse4kIG.css` | 27,648 | 6.48 |
| `frontend/dist/assets/index-2kWm71ls.js` | 262,595 | 81.91 |
| `frontend/dist/assets/Viewer-BIcIuznz.js` | 989,114 | 272.43 |
| `frontend/dist/models/fan-edu-v1.glb` | 648,824 | not reported |
| `frontend/dist/models/fan-edu-v1.manifest.json` | 2,022 | not reported |

The viewer is already dynamically imported from `App.tsx`, but its own chunk remains above the warning threshold. No threshold was raised. Full frontend and backend emitted file byte manifests are saved in `.cache/u0-baseline/frontend-dist-manifest.json` and `backend-dist-manifest.json`.

## Existing navigation and persistence to preserve

- `frontend/src/App.tsx` currently initializes to Explorer at `/`; `/?view=dashboard` initializes Dashboard. Navigation between dashboard, explorer, and guided lesson uses React component state, without a route library or URL updates. Learning mode is state within Explorer.
- F01 localStorage key: `mechverse:demo:f01`; release/version marker: `edu-fan-f01-demo-v1`.
- Saved payload fields: `release`, `stage`, `found`, `answer`. Stages: `observe`, `find`, `classify`, `complete`; answers: empty string, `part`, or `assembly`.
- `restoreLesson` validates release, fields, stage/answer combinations, and resets invalid or mismatched data to the initial lesson. `saveLesson` handles storage errors. A future migration must preserve valid in-progress/completed F01 data and provide backup/rollback before introducing a new schema.
- Existing Explorer state is in-memory Zustand state; existing lesson state is persisted through the F01 key. No server progress/auth claim is established by this baseline.

## Browser coverage and preserved evidence

The existing 12 tests cover contrast, canvas/tree mapping, selection/isolation/reset, F01 gates and reload persistence, honest new-learner Dashboard, no viewer load from Dashboard, three viewport renders, model failure/retry, keyboard/dialog focus, reduced motion, storage failure/retry, viewer module recovery, WebGL fallback, and mobile lesson continuation.

Viewport render coverage in this unchanged suite is **1440×900, 768×1024, 390×844**. The upgrade requirement's **1024×768** landscape viewport is not covered by the existing suite and remains to be added during upgrade QA. Headless Chromium with SwiftShader flags is browser regression coverage, not a physical-phone performance benchmark. Atlas live connectivity, real-device performance, and new Academy behavior were not tested here.

Before running E2E, all 13 existing QA PNGs were preserved under `docs/qa/u0/preexisting/`. The 13 newly generated baseline PNGs were then copied to `docs/qa/u0/fresh/`; the suite continues writing its usual `docs/qa/*.png` paths. A byte manifest is saved at `.cache/u0-baseline/screenshot-manifest.json`.

Copies of `App.tsx`, `styles.css`, frontend `package.json`, Vite/Playwright configuration, and browser tests were saved under `.cache/u0-baseline/frontend/` before checks. SHA-256 comparison after checks confirms those source/configuration/test files are unchanged. Only baseline documentation, preserved screenshots/logs/manifests, normal build outputs, and test artifacts were written by this task. No product fixes were attempted.
