import { test, expect } from "@playwright/test";
test("top-view raycast selects actual worktop geometry and keyboard shortcuts ignore search", async ({
  page,
}) => {
  await page.goto("/explorer?product=workbench");
  await expect(page.getByTestId("model-status")).toHaveText("Mô hình sẵn sàng");
  await page.getByRole("button", { name: "Top", exact: true }).click();
  await page.waitForTimeout(700);
  const canvas = page.locator("canvas"),
    bounds = (await canvas.boundingBox())!;
  await canvas.click({
    position: { x: bounds.width / 2, y: bounds.height / 2 },
  });
  await expect(
    page.getByRole("button", { name: "Mặt bàn ghép", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByLabel("Tìm bộ phận").fill("frame");
  await page.getByLabel("Tìm bộ phận").press("c");
  await expect(
    page.getByRole("button", { name: "Studio", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByLabel("Tìm bộ phận").blur();
  await page.locator("h1").click();
  await page.keyboard.press("c");
  await expect(
    page.getByRole("button", { name: "CAD · Cạnh hình", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
});
test("catalog filters real assets and loads previews without opening any GLB", async ({
  page,
}) => {
  const models: string[] = [];
  page.on("request", (r) => {
    if (r.url().endsWith(".glb")) models.push(r.url());
  });
  await page.goto("/products");
  await expect(page.locator(".product-card")).toHaveCount(3);
  await expect(page.locator(".research-card")).toHaveCount(2);
  await expect(page.locator("canvas")).toHaveCount(0);
  for (const img of await page.locator(".product-catalog img").all())
    expect(
      await img.evaluate(
        (e: HTMLImageElement) => e.complete && e.naturalWidth > 0,
      ),
    ).toBe(true);
  await page.getByLabel("Tìm sản phẩm").fill("ban co khi");
  await expect(page.locator(".product-card")).toHaveCount(1);
  await page.getByLabel("Tìm sản phẩm").clear();
  await page.getByLabel("Trạng thái dữ liệu").selectOption("Đang khảo sát");
  await expect(page.locator(".product-card")).toHaveCount(0);
  await expect(page.locator(".research-card a")).toHaveCount(0);
  expect(models).toEqual([]);
});
test("rapid product switch aborts old load, clears selection and keeps one Canvas", async ({
  page,
}) => {
  let release: (() => void) | undefined;
  await page.route("**/models/locker-r1.glb", async (route) => {
    await new Promise<void>((resolve) => {
      release = resolve;
    });
    await route.continue().catch(() => {});
  });
  await page.goto("/explorer?product=locker");
  await expect.poll(() => !!release).toBe(true);
  await page.getByRole("button", { name: "Cửa trên", exact: true }).click();
  await page.locator("canvas").evaluate((el) => {
    el.dataset.qaIdentity = "shared-context";
  });
  await page.getByLabel("Đổi sản phẩm").selectOption("workbench");
  await expect(page.getByTestId("model-status")).toHaveText("Mô hình sẵn sàng");
  release!();
  await page.waitForTimeout(150);
  await expect(page.locator("canvas")).toHaveAttribute(
    "data-asset",
    "workbench",
  );
  await expect(page.locator("canvas")).toHaveAttribute(
    "data-qa-identity",
    "shared-context",
  );
  await expect(
    page.locator(".industrial-tree-row [aria-pressed=true]"),
  ).toHaveCount(0);
  await expect(page.locator(".industrial-inspector>h2")).toHaveText(
    "Từ bề mặt, đến liên kết.",
  );
});
test("load failure retries; WebGL fallback keeps tree and assembly information usable", async ({
  page,
}) => {
  let fail = true;
  await page.route("**/models/locker-r1.glb", (route) =>
    fail ? route.abort() : route.continue(),
  );
  await page.goto("/explorer?product=locker");
  await expect(
    page.getByRole("heading", { name: "Không tải được mô hình 3D" }),
  ).toBeVisible();
  fail = false;
  await page.getByRole("button", { name: "Thử tải lại mô hình" }).click();
  await expect(page.getByTestId("model-status")).toHaveText("Mô hình sẵn sàng");
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      type: string,
      ...args: unknown[]
    ) {
      if (type.includes("webgl")) return null;
      return original.apply(this, [type, ...args] as never);
    } as typeof original;
  });
  await page.reload();
  await expect(
    page.getByRole("heading", { name: "Không tải được mô hình 3D" }),
  ).toBeVisible();
  await page
    .getByRole("button", { name: "Tay nắm cửa trên", exact: true })
    .click();
  await expect(page.locator(".industrial-inspector>h2")).toHaveText(
    "Tay nắm cửa trên",
  );
});
test("viewer controls preserve F01 and lesson drafts and survive repeated asset switches", async ({
  page,
}) => {
  test.setTimeout(120_000); // Six sequential software-rendered loads plus the learning regression.
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.goto("/learn/M01-L01");
  await page
    .getByLabel("Làm rõ điện thoại, nơi dùng và việc giá cần đáp ứng", {
      exact: true,
    })
    .check();
  const academy = await page.evaluate(() =>
    localStorage.getItem("mechverse:academy:progress"),
  );
  const f01 = JSON.stringify({
    release: "edu-fan-f01-demo-v1",
    stage: "classify",
    found: true,
    answer: "part",
  });
  await page.evaluate(
    (v) => localStorage.setItem("mechverse:demo:f01", v),
    f01,
  );
  await page.goto("/explorer?product=workbench");
  await expect(page.getByTestId("model-status")).toHaveText("Mô hình sẵn sàng");
  await page
    .getByRole("button", { name: "CAD · Cạnh hình", exact: true })
    .click();
  for (let n = 0; n < 6; n++) {
    await page
      .getByLabel("Đổi sản phẩm")
      .selectOption(n % 2 ? "workbench" : "locker");
    await expect(page.locator("canvas")).toHaveAttribute(
      "data-asset",
      n % 2 ? "workbench" : "locker",
    );
    await expect(page.getByTestId("model-status")).toHaveText(
      "Mô hình sẵn sàng",
    );
  }
  await page
    .getByRole("button", { name: "Đặt lại mô hình", exact: true })
    .click();
  expect(
    await page.evaluate(() =>
      localStorage.getItem("mechverse:academy:progress"),
    ),
  ).toBe(academy);
  expect(
    await page.evaluate(() => localStorage.getItem("mechverse:demo:f01")),
  ).toBe(f01);
  await page.goto("/learn/M01-L01");
  await expect(
    page.getByLabel("Làm rõ điện thoại, nơi dùng và việc giá cần đáp ứng", {
      exact: true,
    }),
  ).toBeChecked();
  expect(errors).toEqual([]);
});
test("workbench fixed frame, joint inspection and actual-asset previews", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  for (const id of ["workbench", "locker", "fan"]) {
    await page.goto(`/explorer?product=${id}`);
    await expect(page.getByTestId("model-status")).toHaveText(
      "Mô hình sẵn sàng",
    );
    await page.waitForTimeout(650);
    await page.locator(".industrial-canvas").screenshot({
      path: `../docs/qa/industrial/preview-${id}.png`,
      style: ".stage-top,.stage-bottom{visibility:hidden!important}",
    });
  }
  await page.goto("/explorer?product=workbench");
  await expect(page.getByTestId("model-status")).toHaveText("Mô hình sẵn sàng");
  await page.screenshot({
    path: "../docs/qa/industrial/workbench-studio-1440.png",
  });
  await expect(
    page.getByRole("button", { name: "Quay cánh", exact: true }),
  ).toHaveCount(0);
  await expect(page.locator(".joint-controls")).toHaveCount(0);
  await page
    .getByRole("button", { name: "CAD · Cạnh hình", exact: true })
    .click();
  await page.getByLabel("Mức tách cụm").fill("65");
  await page
    .getByRole("button", { name: "Bu lông mặt bàn 1", exact: true })
    .click();
  await page.getByRole("button", { name: "Đến bộ phận", exact: true }).click();
  await page.waitForTimeout(700);
  await page.screenshot({
    path: "../docs/qa/industrial/workbench-closeup-1440.png",
  });
  await page
    .getByRole("button", { name: "Đặt lại mô hình", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Tách theo cụm", exact: true })
    .click();
  await page.waitForTimeout(700);
  await page.screenshot({
    path: "../docs/qa/industrial/workbench-exploded-1440.png",
  });
});
test("fan remains a demo in the shared renderer, with CAD closeup and exploded capture", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/explorer?product=fan");
  await expect(page.getByTestId("model-status")).toHaveText("Mô hình sẵn sàng");
  await expect(
    page.getByText("Demo giáo dục giản lược", { exact: true }),
  ).toBeVisible();
  await page.screenshot({ path: "../docs/qa/industrial/fan-studio-1440.png" });
  await page.getByRole("button", { name: "Cánh quạt", exact: true }).click();
  await page.getByRole("button", { name: "Xem riêng", exact: true }).click();
  await page
    .getByRole("button", { name: "CAD · Cạnh hình", exact: true })
    .click();
  await page.getByRole("button", { name: "Đến bộ phận", exact: true }).click();
  await page.waitForTimeout(700);
  await page.screenshot({ path: "../docs/qa/industrial/fan-closeup-1440.png" });
  await page
    .getByRole("button", { name: "Đặt lại mô hình", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Tách theo cụm", exact: true })
    .click();
  await page.waitForTimeout(700);
  await page.screenshot({
    path: "../docs/qa/industrial/fan-exploded-1440.png",
  });
});
test("locker studio, CAD, real selection, hinge, explosion and reset", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/explorer?product=locker");
  await expect(page.getByTestId("model-status")).toHaveText("Mô hình sẵn sàng");
  await expect(page.locator("canvas")).toHaveAttribute("data-asset", "locker");
  await page.screenshot({
    path: "../docs/qa/industrial/locker-studio-1440.png",
  });
  await page.getByRole("button", { name: "Cửa trên", exact: true }).click();
  await page.getByLabel("Góc cửa trên", { exact: true }).fill("90");
  await expect(page.locator("canvas")).toHaveAttribute(
    "data-joints",
    '{"upper-door":90}',
  );
  await page.screenshot({ path: "../docs/qa/industrial/locker-open-1440.png" });
  await page
    .getByRole("button", { name: "CAD · Cạnh hình", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Tay nắm cửa trên", exact: true })
    .click();
  await page.getByRole("button", { name: "Đến bộ phận", exact: true }).click();
  await expect(page.locator("canvas")).toHaveAttribute("data-shade", "cad");
  await page.waitForTimeout(700);
  await page.screenshot({
    path: "../docs/qa/industrial/locker-closeup-1440.png",
  });
  await page
    .getByRole("button", { name: "Đặt lại mô hình", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Tách theo cụm", exact: true })
    .click();
  await expect(page.getByLabel("Góc cửa trên", { exact: true })).toHaveValue(
    "0",
  );
  await page.waitForTimeout(700);
  await page.screenshot({
    path: "../docs/qa/industrial/locker-exploded-1440.png",
  });
  await page
    .getByRole("button", { name: "Đặt lại mô hình", exact: true })
    .click();
  await expect(page.getByLabel("Mức tách cụm")).toHaveValue("0");
  await expect(
    page.getByRole("button", { name: "Quay cánh", exact: true }),
  ).toHaveCount(0);
  expect(errors).toEqual([]);
});
for (const width of [1024, 390])
  test(`locker responsive ${width}`, async ({ page }) => {
    await page.setViewportSize({ width, height: width === 390 ? 844 : 768 });
    await page.goto("/explorer?product=locker");
    await expect(page.getByTestId("model-status")).toHaveText(
      "Mô hình sẵn sàng",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `../docs/qa/industrial/locker-studio-${width}.png`,
    });
    if (width === 390) {
      await page.getByRole("tab", { name: "Thông tin", exact: true }).click();
      await page.getByLabel("Góc cửa dưới", { exact: true }).fill("80");
      await page.getByRole("tab", { name: "Mô hình", exact: true }).click();
      await expect(page.locator("canvas")).toBeVisible();
    }
  });
for (const width of [1440, 1024, 390])
  test(`catalog and workbench rendered ${width}`, async ({ page }) => {
    await page.setViewportSize({
      width,
      height: width === 390 ? 844 : width === 1024 ? 768 : 900,
    });
    await page.goto("/products");
    await expect(page.locator(".product-card")).toHaveCount(3);
    for (const img of await page.locator(".product-card img").all()) {
      await img.scrollIntoViewIfNeeded();
      await expect
        .poll(() =>
          img.evaluate(
            (e: HTMLImageElement) => e.complete && e.naturalWidth > 0,
          ),
        )
        .toBe(true);
    }
    await page.evaluate(() => scrollTo(0, 0));
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `../docs/qa/industrial/catalog-${width}.png`,
      fullPage: true,
    });
    await page.goto("/explorer?product=workbench");
    await expect(page.getByTestId("model-status")).toHaveText(
      "Mô hình sẵn sàng",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `../docs/qa/industrial/workbench-studio-${width}.png`,
    });
    if (width === 390) {
      await page.emulateMedia({ reducedMotion: "reduce" });
      await page.getByRole("tab", { name: "Mô hình", exact: true }).focus();
      await page.keyboard.press("ArrowRight");
      await expect(
        page.getByRole("tab", { name: "Cấu tạo", exact: true }),
      ).toHaveAttribute("aria-selected", "true");
      await page
        .getByRole("button", { name: "Khung ống hàn", exact: true })
        .click();
      await page.getByRole("tab", { name: "Thông tin", exact: true }).click();
      await expect(page.locator(".industrial-inspector>h2")).toHaveText(
        "Khung ống hàn",
      );
    }
  });
