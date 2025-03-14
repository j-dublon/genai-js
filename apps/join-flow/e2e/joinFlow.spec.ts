import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("JoinFlowPage", () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/join-flow");
    await page.waitForSelector(".grid > div", { state: "visible" });
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    const accessibilityScanResults = await new AxeBuilder({ page })
      .withTags([
        "wcag2a",
        "wcag2aa",
        "wcag21a",
        "wcag21aa",
        "wcag22a",
        "wcag22aa",
      ])
      .analyze();

    expect(accessibilityScanResults.violations).toEqual([]);
  });
});
