import { test, expect } from "@playwright/test";
import { lessons } from "../../src/features/academy/content";

test("all authored lessons render original readings, questions and source records", async ({
  page,
}) => {
  const errors: string[] = [];
  page.on("pageerror", (error) => errors.push(error.message));
  for (const lesson of lessons) {
    await page.goto(`/learn/${lesson.slug}`);
    await expect(page.locator("h1")).toHaveText(lesson.title);
    await expect(page.locator(".theory-block")).toHaveCount(
      lesson.blocks.length,
    );
    await expect(page.locator(".a-question")).toHaveCount(
      lesson.questions.length,
    );
    await expect(page.locator(".lesson-source-list details")).toHaveCount(
      lesson.sourceRefs.length,
    );
  }
  expect(errors).toEqual([]);
});

for (const width of [1440, 1024, 390]) {
  test(`study screens render without overflow at ${width}`, async ({
    page,
  }) => {
    await page.setViewportSize({
      width,
      height: width === 1440 ? 900 : width === 1024 ? 768 : 844,
    });
    const errors: string[] = [];
    page.on("pageerror", (error) => errors.push(error.message));
    for (const name of ["practice", "challenges", "knowledge", "dashboard"]) {
      await page.goto(`/${name}`);
      await expect(page.locator("main h1")).toBeVisible();
      await page.evaluate(() => document.fonts.ready);
      expect(
        await page.evaluate(
          () => document.documentElement.scrollWidth <= innerWidth,
        ),
      ).toBe(true);
      await page.screenshot({
        path: `../docs/qa/u4/${name}-${width}.png`,
        fullPage: true,
      });
    }
    await page.goto("/learn/mo-men-va-canh-tay-don#activity");
    await expect(page.locator(".activity-live-result")).toBeVisible();
    expect(
      await page.evaluate(
        () => document.documentElement.scrollWidth <= innerWidth,
      ),
    ).toBe(true);
    await page.screenshot({
      path: `../docs/qa/u4/torque-${width}.png`,
      fullPage: false,
    });
    expect(errors).toEqual([]);
  });
}

test("reading remains usable with doubled paragraph text and reduced motion", async ({
  page,
}) => {
  await page.setViewportSize({ width: 1024, height: 768 });
  await page.emulateMedia({ reducedMotion: "reduce" });
  await page.goto("/learn/mo-men-va-canh-tay-don");
  await page.addStyleTag({ content: ".academy-app p { font-size: 32px; }" });
  await expect(page.locator("h1")).toBeVisible();
  expect(
    await page.evaluate(
      () => document.documentElement.scrollWidth <= innerWidth,
    ),
  ).toBe(true);
  await page.screenshot({
    path: "../docs/qa/u4/lesson-text-200.png",
    fullPage: false,
  });
});
