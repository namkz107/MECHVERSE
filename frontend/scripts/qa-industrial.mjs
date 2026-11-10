import { chromium } from "@playwright/test";
import { mkdir, writeFile } from "node:fs/promises";

// Run against an already-running production preview. Never starts/kills a user's server.
const baseURL = process.env.QA_BASE_URL ?? "http://127.0.0.1:5175";
const output = new URL("../../docs/qa/industrial/", import.meta.url);
await mkdir(output, { recursive: true });
const browser = await chromium.launch({
  executablePath: process.env.PLAYWRIGHT_CHROMIUM_EXECUTABLE_PATH,
  headless: true,
  args: ["--use-angle=swiftshader", "--enable-webgl", "--ignore-gpu-blocklist"],
});
const report = {
  checkedAt: new Date().toISOString(),
  baseURL,
  conditions:
    "Chrome headless, Windows, SwiftShader, 1440x900, DPR 1, HTTP cache disabled, no throttling; resource bytes are browser Resource Timing (not FPS)",
  routes: [],
  switches: [],
};
try {
  for (const route of [
    "/products",
    "/explorer?product=locker",
    "/explorer?product=workbench",
    "/explorer?product=fan",
  ]) {
    const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage(),
      cdp = await context.newCDPSession(page),
      errors = [];
    page.on("pageerror", (error) => errors.push(error.message));
    await cdp.send("Network.enable");
    await cdp.send("Network.setCacheDisabled", { cacheDisabled: true });
    await page.goto(baseURL + route);
    if (route.includes("product="))
      await page
        .getByTestId("model-status")
        .filter({ hasText: "Mô hình sẵn sàng" })
        .waitFor();
    else await page.locator(".product-card").first().waitFor();
    await page.waitForTimeout(800);
    const network = await page.evaluate(() =>
      performance.getEntriesByType("resource").map((e) => ({
        name: new URL(e.name).pathname,
        encoded: e.encodedBodySize,
        decoded: e.decodedBodySize,
        transfer: e.transferSize,
      })),
    );
    const totals = network.reduce(
      (sum, r) => ({
        encoded: sum.encoded + r.encoded,
        decoded: sum.decoded + r.decoded,
        transfer: sum.transfer + r.transfer,
      }),
      { encoded: 0, decoded: 0, transfer: 0 },
    );
    const counters = route.includes("product=")
      ? await page.locator("canvas").evaluate((el) => ({ ...el.dataset }))
      : null;
    let cadCounters = null;
    if (route.includes("product=")) {
      const id = new URL(baseURL + route).searchParams.get("product");
      await page.locator(".industrial-canvas").screenshot({
        style: ".stage-top,.stage-bottom{visibility:hidden!important}",
        path: new URL(`preview-${id}.png`, output).pathname.replace(
          /^\/(\w:)/,
          "$1",
        ),
      });
      await page
        .getByRole("button", { name: "CAD · Cạnh hình", exact: true })
        .click();
      await page.waitForTimeout(300);
      cadCounters = await page
        .locator("canvas")
        .evaluate((el) => ({ ...el.dataset }));
    }
    report.routes.push({
      route,
      totals,
      resources: network,
      counters,
      cadCounters,
      errors,
    });
    await context.close();
  }
  const context = await browser.newContext({
      viewport: { width: 1440, height: 900 },
    }),
    page = await context.newPage();
  await page.goto(baseURL + "/explorer?product=workbench");
  await page
    .getByTestId("model-status")
    .filter({ hasText: "Mô hình sẵn sàng" })
    .waitFor();
  await page
    .getByRole("button", { name: "CAD · Cạnh hình", exact: true })
    .click();
  for (let n = 0; n < 8; n++) {
    const id = n % 2 ? "workbench" : "locker";
    await page.getByLabel("Đổi sản phẩm").selectOption(id);
    await page.waitForFunction(
      (id) => document.querySelector("canvas")?.dataset.asset === id,
      id,
    );
    await page
      .getByTestId("model-status")
      .filter({ hasText: "Mô hình sẵn sàng" })
      .waitFor();
    await page.waitForTimeout(150);
    report.switches.push({
      index: n,
      expectedAsset: id,
      ...(await page.locator("canvas").evaluate((el) => ({ ...el.dataset }))),
    });
  }
  await context.close();
  await writeFile(
    new URL("performance.json", output),
    JSON.stringify(report, null, 2),
    "utf8",
  );
  console.log(
    JSON.stringify({
      routes: report.routes.map(({ route, totals, counters, errors }) => ({
        route,
        totals,
        counters,
        errors,
      })),
      switches: report.switches,
    }),
  );
} finally {
  await browser.close();
}
