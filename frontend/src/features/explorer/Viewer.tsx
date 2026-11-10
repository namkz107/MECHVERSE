import { Canvas } from "@react-three/fiber";
import { useStore } from "zustand";
import { ACESFilmicToneMapping, PCFSoftShadowMap } from "three";
import { explorerStore } from "./state";
import { getAsset, legacyFan } from "./assets";
import { Scene, StudioEnvironment } from "./Scene";
export const ASSET_URL = "/models/fan-edu-v1.glb";
// Requests are owned by Scene and aborted/disposed on unmount; no global GLB cache.
export function clearModel() {}
export default function Viewer({
  onReady,
  reduced,
  teaching = false,
}: {
  onReady: () => void;
  reduced: boolean;
  teaching?: boolean;
}) {
  const id = useStore(explorerStore, (s) => s.assetId),
    shade = useStore(explorerStore, (s) => s.shade),
    asset = teaching ? legacyFan : getAsset(id);
  return (
    <Canvas
      shadows={{ type: PCFSoftShadowMap }}
      camera={{
        position: asset.camera.position,
        fov: 37,
        near: 0.01,
        far: 100,
      }}
      dpr={[1, 1.5]}
      frameloop="demand"
      gl={{
        antialias: true,
        toneMapping: ACESFilmicToneMapping,
        toneMappingExposure: shade === "cad" ? 0.8 : 0.92,
      }}
      aria-label={`Mô hình ${asset.title} 3D tương tác; dùng cây bộ phận để thao tác bằng bàn phím`}
    >
      <color
        attach="background"
        args={[shade === "cad" ? "#fafaf8" : "#f0f1ef"]}
      />
      <hemisphereLight args={["#ffffff", "#b6b3aa", 0.6]} />
      <directionalLight
        position={[3, 6, 4]}
        intensity={shade === "cad" ? 1.3 : 1.8}
        castShadow
        shadow-mapSize={[2048, 2048]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={5}
        shadow-camera-bottom={-4}
        shadow-bias={-0.00015}
        shadow-normalBias={asset.id === "fan" ? 0.008 : 0.001}
        shadow-radius={4}
      />
      <directionalLight position={[-4, 3, -2]} intensity={0.75} />
      <StudioEnvironment />
      <Scene
        key={`${id}-${teaching}`}
        asset={asset}
        reduced={reduced}
        onReady={onReady}
      />
    </Canvas>
  );
}
