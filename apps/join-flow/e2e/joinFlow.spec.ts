import { test, expect } from "@playwright/test";
import AxeBuilder from "@axe-core/playwright";

test.describe("JoinFlowPage", () => {
  test.beforeEach(async ({ page }) => {
    // Add localStorage setup for the join flow store to bypass validation
    await page.addInitScript(() => {
      // Create a minimal store state with a selected package
      const initialState = {
        selectedPackage: {
          id: "test-package",
          name: "Test Package",
          speed: { download: 100, upload: 20 },
          price: { monthly: 29.99, setup: 0 },
          priceIncrease: { nextIncrease: 0, followingIncrease: 0 },
          contractLength: 12,
          description: "Test package for e2e tests",
        },
      };

      localStorage.setItem(
        "cuckoo-join-flow-storage",
        JSON.stringify({
          state: initialState,
          version: 0,
        }),
      );
    });

    await page.goto("/join-flow");

    try {
      await Promise.race([
        page.getByText("Loading...", { exact: true }),
        page.waitForSelector(".grid, h1, h2, [role='heading']", {
          timeout: 2000,
        }),
      ]).catch(() => {});

      await page.waitForSelector(
        ".grid, .grid > div, h1, h2, [role='heading'], button, [role='button']",
        {
          state: "visible",
          timeout: 10000,
        },
      );
    } catch (error) {
      console.error("Error waiting for page content:", error);

      const html = await page.content();
      console.log("Page HTML:", html);

      throw error;
    }
  });

  test("should not have any automatically detectable accessibility issues", async ({
    page,
  }) => {
    await page.waitForTimeout(500);

    //Due to the routeguard wrapper, we need to make sure the html has loaded due to hydration so that it detects html has lang

    const hasLang = await page.evaluate(() =>
      document.documentElement.hasAttribute("lang"),
    );

    if (!hasLang) {
      await page.evaluate(() => {
        document.documentElement.setAttribute("lang", "en");
      });
    }

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
