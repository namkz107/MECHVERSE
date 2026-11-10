import { CanvasTexture, RepeatWrapping, SRGBColorSpace } from "three";
// Original deterministic, metre-scaled texture. Grain runs along the long axis.
export function woodTexture() {
  const canvas = document.createElement("canvas");
  canvas.width = 1024;
  canvas.height = 512;
  const c = canvas.getContext("2d")!;
  for (let y = 0; y < 512; y++) {
    const stave = Math.floor(y / 51.2),
      v =
        Math.sin(y * 1.9) * 3 +
        Math.sin(y * 0.13) * 5 +
        Math.sin(stave * 4.7) * 7;
    c.fillStyle = `rgb(${174 + v},${129 + v},${78 + v})`;
    c.fillRect(0, y, 1024, 1);
  }
  for (let n = 0; n < 180; n++) {
    const base = n * 2.9;
    c.beginPath();
    c.moveTo(0, base);
    for (let x = 0; x <= 1024; x += 16)
      c.lineTo(
        x,
        base +
          Math.sin(x * 0.009 + n * 0.4) * 1.5 +
          Math.sin(x * 0.003 + n) * 2,
      );
    c.strokeStyle = "rgba(78,49,25,0.13)";
    c.lineWidth = 0.7;
    c.stroke();
  }
  for (let i = 1; i < 10; i++) {
    c.fillStyle = "rgba(71,46,25,0.16)";
    c.fillRect(0, i * 51.2, 1024, 0.7);
  }
  const t = new CanvasTexture(canvas);
  t.colorSpace = SRGBColorSpace;
  t.wrapS = t.wrapT = RepeatWrapping;
  t.repeat.set(1 / 1.5, 1 / 0.7);
  t.anisotropy = 4;
  return t;
}
