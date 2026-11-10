import { Canvas } from "@react-three/fiber";
import { useStore } from "zustand";
import { ACESFilmicToneMapping, PCFSoftShadowMap } from "three";
import { explorerStore } from "./state";
import { getAsset } from "./assets";
import { Scene, StudioEnvironment } from "./Scene";
export const ASSET_URL = "/models/fan-edu-v1.glb";
// Requests are owned by Scene and aborted/disposed on unmount; no global GLB cache.
export function clearModel() {}
export default function Viewer({
  onReady,
  reduced,
}: {
  onReady: () => void;
  reduced: boolean;
}) {
  const id = useStore(explorerStore, (s) => s.assetId),
    shade = useStore(explorerStore, (s) => s.shade),
    asset = getAsset(id);
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
        toneMappingExposure: 0.9,
      }}
      aria-label={`Mô hình ${asset.title} 3D tương tác; dùng cây bộ phận để thao tác bằng bàn phím`}
    >
      <color
        attach="background"
        args={[shade === "cad" ? "#f2f2ed" : "#d9ddd7"]}
      />
      <ambientLight intensity={0.35} />
      <directionalLight
        position={[3, 6, 4]}
        intensity={2.5}
        castShadow
        shadow-mapSize={[1024, 1024]}
        shadow-camera-left={-4}
        shadow-camera-right={4}
        shadow-camera-top={5}
        shadow-camera-bottom={-4}
        shadow-bias={-0.00015}
        shadow-normalBias={0.003}
        shadow-radius={3}
      />
      <directionalLight position={[-4, 3, -2]} intensity={1.3} />
      <StudioEnvironment />
      <Scene key={id} asset={asset} reduced={reduced} onReady={onReady} />
    </Canvas>
  );
}
