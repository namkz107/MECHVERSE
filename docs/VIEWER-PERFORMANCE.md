# Viewer performance — U5 bounded change

Measured on 2026-11-09 at approximately 14:06–14:09 Asia/Bangkok, Windows, Node 22.21.0, Yarn 1.22.22, Vite 7.3.7, Three 0.181.2, Drei 10.7.9, Three-stdlib 2.36.1. This is production bundle measurement, not a physical-device benchmark.

## Finding and change

The existing viewer dynamically loads behind Explorer, but `useGLTF` enables Draco and Meshopt loader integrations by default. Inspection of the current `fan-edu-v1.glb` JSON chunk found `extensionsUsed: []` and `extensionsRequired: []`; its 112 meshes / 122 nodes do not need either decoder. The model's binary buffer remains 531,008 bytes; the GLB file remains 648,824 bytes.

`Viewer.tsx` now calls React Three Fiber's `useLoader(GLTFLoader, ASSET_URL)` directly, using the **same Three-stdlib loader class** used by the previous Drei wrapper. `clearModel()` calls the matching `useLoader.clear(GLTFLoader, ASSET_URL)`. OrbitControls is imported from Drei's `core/OrbitControls` module, preserving its existing implementation, props, frame update, event handling, and damping behavior.

No dependencies were installed or changed. Three-stdlib is already installed through Drei and was already part of the viewer; this change does not add a renderer or animation engine. `vite.config.ts` is unchanged. No manual chunk redistribution or warning-threshold adjustment was made.

## Measurements

Fresh `yarn build` executions from `frontend/` passed before and after the change, including `tsc -b`. Before: 2,166 transformed modules, Vite build 15.60 s. After: 1,912 transformed modules, Vite build 14.01 s. Build-time observations are single runs and do not establish a stable speedup.

Because other application work was being integrated concurrently, a second comparable audit rebuilt both loader versions **in memory** against the current application source. Its `before` pass temporarily transformed only the viewer's imports, loader call, and clear call back to their former form, without writing application files or `dist`. Its `after` pass used the current source. All non-viewer generated JavaScript chunks have identical byte counts across the two audit passes.

| Comparable audit | Before | After | Reduction |
| --- | ---: | ---: | ---: |
| Viewer generated JavaScript bytes | 989,314 | 963,459 | 25,855 (2.61%) |
| Viewer gzip bytes | 272,543 | 265,089 | 7,454 (2.73%) |
| All generated JavaScript bytes | 1,394,902 | 1,369,047 | 25,855 (1.85%) |
| Sum of separately gzipped JavaScript chunks | 403,492 | 396,038 | 7,454 (1.85%) |
| Draco/Meshopt modules in viewer | Both present | Neither present | Removed |

The production file `dist/assets/Viewer-DtD4DKEp.js` was also measured on disk at **963,459 bytes**, matching the audit. The pre-upgrade U0 viewer was 989,114 bytes; the controlled before/after audit above is the comparison used for the reduction claim, since the application shell changed between U0 and U5.

The audit measures final generated chunk code in Rollup's `generateBundle` hook, using `Buffer.byteLength(chunk.code)` and `gzipSync(chunk.code).byteLength`. Vite may subsequently add preload references to other chunks, so the audit's all-JavaScript total is a comparable generated-code measurement rather than an exact sum of every post-plugin file on disk. The viewer chunk itself matches the actual emitted file bytes.

## Retained contracts and verification limits

The viewer's public exports remain `ASSET_URL`, `clearModel()`, and default `Viewer({onReady, reduced})`. The model cloning, eight occurrence ID checks, selection/tree bindings, invisible-mesh raycast suppression, hide/isolate, explode/reset, focus interpolation and cancellation, animation pause, `frameloop="demand"`, DPR cap `[1, 1.75]`, and reduced-motion control settings were left intact. Model materials, light setup, and educational geometry were not changed or relabeled as a real product.

Production TypeScript/build validation passed. The coordinated integrated run after this change passed **23/23 frontend tests, 9/9 backend tests and 29/29 browser tests**, including Explorer mapping/reset/F01/recovery/keyboard. A separate final production-preview smoke check rendered Home/Academy/Explorer and confirmed the GLB ready. These are fresh U5 results; U0/U1 results were not reused. See [QA-REPORT.md](QA-REPORT.md) for environment, screenshots, network data and unverified limits.

This is a **partial performance improvement**: the viewer still exceeds Vite's 500 kB warning threshold. A module audit shows the largest remaining rendered source contributions are Three core / WebGL renderer and React Three Fiber, which are necessary for the current implementation. The default warning remains visible. No claim of mobile frame-rate improvement or completed warning resolution is made.

Future compressed model revisions must explicitly configure the appropriate decoder before `useLoader` loads them and verify retry/cache clearing again. The current decoder omission is valid only for the inspected uncompressed educational asset. Any future renderer rewrite or alternate lightweight geometry must preserve occurrence mapping and be assessed separately.

## Reproducing the comparable audit

From `frontend/`, run `yarn build` for the normal production check. The byte comparison was obtained by passing the following JavaScript to `node --input-type=module` (PowerShell here-string piped to Node):

```js
import { build } from 'vite';
import { gzipSync } from 'node:zlib';
for (const mode of ['before', 'after']) {
  let report;
  await build({ logLevel: 'silent', build: { write: false }, plugins: [{
    name: 'comparable-viewer-audit', enforce: 'pre',
    transform(code, id) {
      if (mode !== 'before' || !id.replaceAll('\\', '/').endsWith('/src/features/explorer/Viewer.tsx')) return;
      return code.replace('  useLoader,\n', '')
        .replace('import { OrbitControls } from "@react-three/drei/core/OrbitControls";\nimport { GLTFLoader } from "three-stdlib";', 'import { OrbitControls, useGLTF } from "@react-three/drei";')
        .replace('useLoader(GLTFLoader, ASSET_URL)', 'useGLTF(ASSET_URL)')
        .replace('useLoader.clear(GLTFLoader, ASSET_URL)', 'useGLTF.clear(ASSET_URL)');
    },
    generateBundle(_, bundle) {
      const chunks = Object.values(bundle).filter(item => item.type === 'chunk');
      const viewer = chunks.find(item => item.fileName.includes('Viewer-'));
      report = {
        mode,
        viewer: { file: viewer.fileName, bytes: Buffer.byteLength(viewer.code), gzip: gzipSync(viewer.code).byteLength },
        totalJsBytes: chunks.reduce((sum, chunk) => sum + Buffer.byteLength(chunk.code), 0),
        totalJsGzip: chunks.reduce((sum, chunk) => sum + gzipSync(chunk.code).byteLength, 0),
        decoderModules: Object.keys(viewer.modules).filter(id => /MeshoptDecoder|DRACOLoader/.test(id)),
        chunks: chunks.map(chunk => ({ file: chunk.fileName, bytes: Buffer.byteLength(chunk.code) }))
      };
    }
  }] });
  console.log(JSON.stringify(report));
}
```

The audit's `logLevel: 'silent'` affects only its in-memory diagnostic output. Normal `yarn build` retains the original warning behavior.
