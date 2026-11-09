import { test, expect } from "@playwright/test";

test("small informative text meets minimum contrast on its rendered surface", async ({
  page,
}) => {
  await page.goto("/explorer");
  function luminance(rgb: number[]) {
    return rgb
      .map((v) => v / 255)
      .map((v) => (v <= 0.04045 ? v / 12.92 : ((v + 0.055) / 1.055) ** 2.4))
      .reduce((sum, v, i) => sum + v * [0.2126, 0.7152, 0.0722][i], 0);
  }
  for (const [selector, bg] of [
    [".content-footer", "245,247,250"],
    [".view-format", "237,242,243"],
    [".model-status", "237,242,243"],
    [".model-label>span:last-child", "245,247,250"],
  ]) {
    const color = await page
      .locator(selector)
      .evaluate((e) => getComputedStyle(e).color);
    const fg = luminance(color.match(/\d+/g)!.slice(0, 3).map(Number));
    const surface = luminance(bg.split(",").map(Number));
    expect(
      (Math.max(fg, surface) + 0.05) / (Math.min(fg, surface) + 0.05),
      selector,
    ).toBeGreaterThanOrEqual(4.5);
  }
});

test("Explorer mapping, reset, F01 gates and persistence", async ({ page }) => {
  const errors: string[] = [];
  page.on("pageerror", (e) => errors.push(e.message));
  await page.setViewportSize({ width: 1440, height: 900 });
  await page.goto("/explorer");
  await expect(page.getByTestId("model-status")).toHaveText("Mô hình sẵn sàng");
  const initialCanvas = page.locator("canvas");
  const initialBox = (await initialCanvas.boundingBox())!;
  await initialCanvas.click({
    position: { x: initialBox.width / 2, y: initialBox.height / 2 },
  });
  await expect(
    page.getByRole("heading", { name: "Lồng trước", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Cánh quạt", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Cánh quạt", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Xem riêng", exact: true }).click();
  // Click the actual projected blade geometry, not a DOM overlay.
  const canvas = page.locator("canvas");
  const box = (await canvas.boundingBox())!;
  await canvas.click({ position: { x: box.width / 2, y: box.height / 2 } });
  await expect(
    page.getByRole("button", { name: "Cánh quạt", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByLabel("Mức tách cụm").fill("70");
  await page.getByRole("button", { name: "Đặt lại mô hình" }).click();
  await expect(page.getByLabel("Mức tách cụm")).toHaveValue("0");
  await page.getByRole("button", { name: "Bắt đầu bài demo" }).click();
  await page.getByRole("button", { name: "Bắt đầu quan sát" }).click();
  await expect(
    page.getByRole("heading", { name: "Tìm cánh quạt", exact: true }),
  ).toBeFocused();
  await page.getByRole("button", { name: "Đế quạt", exact: true }).click();
  await page.getByRole("button", { name: "Kiểm tra lựa chọn" }).click();
  await expect(
    page.getByRole("status").filter({ hasText: "Bạn đang chọn đế quạt" }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Cánh quạt", exact: true }).click();
  await page.getByRole("button", { name: "Kiểm tra lựa chọn" }).click();
  await page.getByRole("button", { name: "Tiếp tục phân biệt" }).click();
  await page.getByLabel("Một cụm gồm nhiều chi tiết").check();
  await page.getByRole("button", { name: "Kiểm tra câu trả lời" }).click();
  await expect(
    page.getByText("Hãy nhìn lại ranh giới", { exact: false }),
  ).toBeVisible();
  await page.getByLabel("Một chi tiết trong cụm đầu quạt").check();
  await page
    .getByRole("button", { name: "Khám phá tự do", exact: true })
    .click();
  await page
    .getByRole("button", { name: "Học có hướng dẫn", exact: true })
    .click();
  await expect(
    page.getByLabel("Một chi tiết trong cụm đầu quạt"),
  ).toBeChecked();
  await page.getByRole("button", { name: "Đặt lại mô hình" }).click();
  await expect(
    page.getByLabel("Một chi tiết trong cụm đầu quạt"),
  ).toBeChecked();
  await page.getByRole("button", { name: "Kiểm tra câu trả lời" }).click();
  await expect(
    page.getByRole("heading", { name: "Bạn đã hoàn thành demo F01" }),
  ).toBeVisible();
  await expect(
    page.getByText("Đã lưu demo trên thiết bị này", { exact: true }),
  ).toBeVisible();
  await page.reload();
  await page
    .getByRole("button", { name: "Học có hướng dẫn", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Bạn đã hoàn thành demo F01" }),
  ).toBeVisible();
  expect(errors).toEqual([]);
  await page.getByRole("button", { name: "Tổng quan", exact: true }).click();
  await expect(
    page.getByText("Đã hoàn thành demo", { exact: true }),
  ).toBeVisible();
});

test("Dashboard new learner has no invented achievements and does not load the viewer", async ({
  page,
}) => {
  await page.goto("/?view=dashboard");
  await expect(
    page.getByRole("heading", {
      name: "Góc học tập của bạn.",
    }),
  ).toBeVisible();
  await expect(page.getByText("Bạn chưa bắt đầu bài Academy nào. Không có thành tích được tạo sẵn.", { exact: true })).toBeVisible();
  expect(
    await page.evaluate(() =>
      performance
        .getEntriesByType("resource")
        .some((r) => r.name.includes("fan-edu-v1.glb")),
    ),
  ).toBe(false);
  await page
    .getByRole("link", { name: "Mở F01", exact: true })
    .click();
  await expect(
    page.getByRole("heading", { name: "Từ một chiếc quạt đến từng chi tiết" }),
  ).toBeVisible();
});

for (const size of [
  { width: 1440, height: 900 },
  { width: 768, height: 1024 },
  { width: 390, height: 844 },
]) {
  test(`render ${size.width}×${size.height} without overflow`, async ({
    page,
  }) => {
    await page.setViewportSize(size);
    await page.goto("/explorer");
    await expect(page.getByTestId("model-status")).toHaveText(
      "Mô hình sẵn sàng",
    );
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= window.innerWidth,
      ),
    ).toBe(true);
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `../docs/qa/explorer-${size.width}.png`,
      fullPage: true,
    });
    if (size.width < 1200)
      await page.getByRole("tab", { name: "Bộ phận" }).click();
    await page.getByRole("button", { name: "Cánh quạt", exact: true }).click();
    if (size.width < 1200)
      await page.getByRole("tab", { name: "Thông tin" }).click();
    await page.getByRole("button", { name: "Nguồn và giới hạn" }).click();
    await expect(page.getByRole("dialog")).toBeVisible();
    await page.keyboard.press("Escape");
    await expect(page.getByRole("dialog")).not.toBeVisible();
    await expect(
      page.getByRole("button", { name: "Nguồn và giới hạn" }),
    ).toBeFocused();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `../docs/qa/inspector-${size.width}.png`,
      fullPage: true,
    });
    await page
      .getByRole("button", { name: "Bắt đầu bài demo", exact: true })
      .click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `../docs/qa/lesson-${size.width}.png`,
      fullPage: true,
    });
    await page.getByRole("button", { name: "Tổng quan", exact: true }).click();
    await page.evaluate(() => window.scrollTo(0, 0));
    await page.screenshot({
      path: `../docs/qa/dashboard-${size.width}.png`,
      fullPage: true,
    });
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
  });
}

test("asset error supports retry and a text learning alternative", async ({
  page,
}) => {
  await page.route("**/fan-edu-v1.glb", (r) => r.abort());
  await page.goto("/explorer");
  await expect(page.getByText("Không tải được mô hình 3D")).toBeVisible();
  await page.getByRole("button", { name: "Cánh quạt", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Cánh quạt", exact: true }),
  ).toBeVisible();
  await page.unroute("**/fan-edu-v1.glb");
  await page.getByRole("button", { name: "Thử tải lại mô hình" }).click();
  await expect(page.getByTestId("model-status")).toHaveText("Mô hình sẵn sàng");
});

test("keyboard selection, range, panel tabs, dialog focus and reduced motion", async ({
  page,
}) => {
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/explorer");
  await expect(page.getByTestId("model-status")).toHaveText("Mô hình sẵn sàng");
  const range = page.getByLabel("Mức tách cụm");
  await range.focus();
  await page.keyboard.press("ArrowRight");
  await expect(range).toHaveValue("1");
  await page.getByRole("button", { name: "Cánh quạt", exact: true }).focus();
  await page.keyboard.press("Enter");
  await expect(
    page.getByRole("button", { name: "Cánh quạt", exact: true }),
  ).toHaveAttribute("aria-pressed", "true");
  await page.getByRole("tab", { name: "Bộ phận" }).focus();
  await page.keyboard.press("ArrowRight");
  await expect(page.getByRole("tab", { name: "Thông tin" })).toBeFocused();
  await expect(
    page.getByRole("heading", { name: "Cánh quạt", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Nguồn và giới hạn" }).focus();
  await page.keyboard.press("Enter");
  await expect(page.getByRole("dialog")).toBeVisible();
  await page.keyboard.press("Tab");
  expect(
    await page
      .getByRole("dialog")
      .evaluate((d) => d.contains(document.activeElement)),
  ).toBe(true);
  await page.keyboard.press("Escape");
  await expect(
    page.getByRole("button", { name: "Nguồn và giới hạn" }),
  ).toBeFocused();
  expect(
    await page
      .getByRole("button", { name: "Đặt lại mô hình" })
      .evaluate((b) => getComputedStyle(b).transitionDuration),
  ).toBe("0s");
  await expect(
    page.getByRole("button", { name: "Xem chuyển động", exact: true }),
  ).toHaveAttribute("aria-pressed", "false");
});

test("storage failure keeps the current task and retry can save it", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = Storage.prototype.setItem;
    Object.assign(window, {
      restoreDemoStorage: () => {
        Storage.prototype.setItem = original;
      },
    });
    Storage.prototype.setItem = () => {
      throw new DOMException("Storage blocked", "QuotaExceededError");
    };
  });
  await page.goto("/explorer");
  await page.getByRole("button", { name: "Bài học demo", exact: true }).click();
  await page.getByRole("button", { name: "Bắt đầu quan sát" }).click();
  await expect(
    page.getByText("Chưa lưu được demo.", { exact: false }),
  ).toBeVisible();
  await expect(
    page.getByRole("heading", { name: "Tìm cánh quạt", exact: true }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Tổng quan", exact: true }).click();
  await expect(
    page.getByText(
      "Chưa lưu được demo. Kết quả hiện chỉ còn trong phiên này.",
      { exact: true },
    ),
  ).toBeVisible();
  await page.getByRole("button", { name: "Bài học demo", exact: true }).click();
  await page.evaluate(() => {
    (
      window as unknown as { restoreDemoStorage: () => void }
    ).restoreDemoStorage();
  });
  await page.getByRole("button", { name: "Thử lưu lại" }).click();
  await expect(
    page.getByText("Đã lưu demo trên thiết bị này", { exact: true }),
  ).toBeVisible();
});

test("viewer module failure offers a handled reload recovery without losing saved demo progress", async ({
  page,
}) => {
  const moduleUrl =
    /(?:\/assets\/Viewer-[^/]+\.js|\/src\/features\/explorer\/Viewer\.tsx)(?:\?.*)?$/;
  await page.route(moduleUrl, (r) => r.abort());
  await page.goto("/explorer");
  await expect(page.getByText("Không tải được mô hình 3D")).toBeVisible();
  await page.getByRole("button", { name: "Bài học demo", exact: true }).click();
  await page.getByRole("button", { name: "Bắt đầu quan sát" }).click();
  await page.getByRole("button", { name: "Thử tải lại mô hình" }).click();
  await expect(
    page.getByRole("button", { name: "Tải lại ứng dụng", exact: true }),
  ).toBeVisible();
  await page.unroute(moduleUrl);
  await page
    .getByRole("button", { name: "Tải lại ứng dụng", exact: true })
    .click();
  await expect(page.getByTestId("model-status")).toHaveText("Mô hình sẵn sàng");
  await page.getByRole("button", { name: "Bài học demo", exact: true }).click();
  await expect(
    page.getByRole("heading", { name: "Tìm cánh quạt", exact: true }),
  ).toBeVisible();
});

test("WebGL unavailable still allows completing F01 through the tree and 2D diagram", async ({
  page,
}) => {
  await page.addInitScript(() => {
    const original = HTMLCanvasElement.prototype.getContext;
    HTMLCanvasElement.prototype.getContext = function (
      this: HTMLCanvasElement,
      contextId: string,
      ...args: unknown[]
    ) {
      if (contextId.includes("webgl")) return null;
      return Reflect.apply(original, this, [contextId, ...args]);
    } as typeof original;
  });
  await page.goto("/explorer");
  await expect(page.getByText("Không tải được mô hình 3D")).toBeVisible();
  await expect(
    page.getByRole("img", { name: "Sơ đồ 2D:", exact: false }),
  ).toBeVisible();
  await page.getByRole("button", { name: "Bài học demo", exact: true }).click();
  await page.getByRole("button", { name: "Bắt đầu quan sát" }).click();
  await page.getByRole("button", { name: "Cánh quạt", exact: true }).click();
  await page.getByRole("button", { name: "Kiểm tra lựa chọn" }).click();
  await page.getByRole("button", { name: "Tiếp tục phân biệt" }).click();
  await page.getByLabel("Một chi tiết trong cụm đầu quạt").check();
  await page.getByRole("button", { name: "Kiểm tra câu trả lời" }).click();
  await expect(
    page.getByRole("heading", { name: "Bạn đã hoàn thành demo F01" }),
  ).toBeVisible();
});

test("mobile F01 is usable across tree and lesson panels", async ({ page }) => {
  await page.setViewportSize({ width: 390, height: 844 });
  await page.goto("/explorer");
  await page
    .getByRole("button", { name: "Học có hướng dẫn", exact: true })
    .click();
  await page.getByRole("button", { name: "Bắt đầu quan sát" }).click();
  await page.getByRole("tab", { name: "Bộ phận", exact: true }).click();
  await page.getByRole("button", { name: "Cánh quạt", exact: true }).click();
  await page.getByRole("tab", { name: "Bài học", exact: true }).click();
  await page.getByRole("button", { name: "Kiểm tra lựa chọn" }).click();
  await page.getByRole("button", { name: "Tiếp tục phân biệt" }).click();
  await page.getByLabel("Một chi tiết trong cụm đầu quạt").check();
  await page.reload();
  await page
    .getByRole("button", { name: "Học có hướng dẫn", exact: true })
    .click();
  await expect(
    page.getByLabel("Một chi tiết trong cụm đầu quạt"),
  ).toBeChecked();
  await page.getByRole("button", { name: "Kiểm tra câu trả lời" }).click();
  await expect(
    page.getByRole("heading", { name: "Bạn đã hoàn thành demo F01" }),
  ).toBeVisible();
  await page.evaluate(() => window.scrollTo(0, 0));
  await page.screenshot({
    path: "../docs/qa/lesson-complete-390.png",
    fullPage: true,
  });
});
