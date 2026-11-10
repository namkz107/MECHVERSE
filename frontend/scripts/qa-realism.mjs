import { chromium } from "@playwright/test";
import { createServer } from "vite";
import { mkdir, writeFile } from "node:fs/promises";
import { fileURLToPath } from "node:url";

// Own a separate server; never attach to or stop a developer's running instance.
const server = await createServer({
  server: { host: "127.0.0.1", port: 5175, strictPort: true },
});
const output = new URL("../../docs/qa/realism/", import.meta.url);
await mkdir(output, { recursive: true });
let browser;
const report = {
  conditions:
    "Linux, headless Chromium, SwiftShader, no network throttling; emulated mobile viewport is not a physical phone",
  checkedAt: new Date().toISOString(),
  renders: [],
  errors: [],
};
try {
  await server.listen();
  browser = await chromium.launch({
    executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
    headless: true,
    args: [
      "--use-angle=swiftshader",
      "--enable-webgl",
      "--ignore-gpu-blocklist",
    ],
  });
  for (const id of ["fan", "locker", "workbench"]) {
    const context = await browser.newContext({
      viewport: { width: 1600, height: 1000 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    page.on("pageerror", (e) => report.errors.push({ id, message: e.message }));
    await page.goto(`http://127.0.0.1:5175/explorer?product=${id}`);
    await page
      .getByTestId("model-status")
      .filter({ hasText: "Mô hình sẵn sàng" })
      .waitFor();
    await page.waitForTimeout(1200);
    await page.screenshot({
      path: fileURLToPath(new URL(`${id}-studio.png`, output)),
    });
    await page
      .locator(".industrial-canvas")
      .screenshot({
        path: fileURLToPath(
          new URL(`../public/previews/${id}.png`, import.meta.url),
        ),
        style: ".stage-top,.stage-bottom{visibility:hidden!important}",
      });
    await page
      .getByRole("button", { name: "CAD · Cạnh hình", exact: true })
      .click();
    await page
      .getByRole("button", { name: "Tách theo cụm", exact: true })
      .click();
    await page.waitForTimeout(1200);
    await page.screenshot({
      path: fileURLToPath(new URL(`${id}-cad-exploded.png`, output)),
    });
    report.renders.push({
      id,
      counters: await page
        .locator("canvas")
        .evaluate((el) => ({ ...el.dataset })),
    });
    await page.setViewportSize({ width: 390, height: 844 });
    await page.waitForTimeout(1000);
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > innerWidth,
    );
    if (overflow) throw new Error(`${id}: mobile horizontal overflow`);
    await page.screenshot({
      path: fileURLToPath(new URL(`${id}-mobile.png`, output)),
      fullPage: true,
    });
    await context.close();
  }
  if (report.errors.length) throw new Error(JSON.stringify(report.errors));
} finally {
  await writeFile(
    new URL("render-check.json", output),
    JSON.stringify(report, null, 2),
  );
  await browser?.close();
  await server.close();
}
console.log(JSON.stringify(report));
process.exit(0);
