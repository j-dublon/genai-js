import { test } from "@playwright/test";
import { playAudit } from "playwright-lighthouse";
import { mockTrustpilotReviews, mockTrustpilotScore } from "./helpers";

test.describe("Lighthouse Audit", () => {
  test("should pass Lighthouse audit", async ({ page }) => {
    await mockTrustpilotReviews(page);
    await mockTrustpilotScore(page);

    try {
      await page.goto("/", { waitUntil: "domcontentloaded" });
      await page.getByTestId("hero-banner").waitFor({ state: "visible" });
      const url = page.url();

      await playAudit({
        page: page,
        config: {
          extends: "lighthouse:default",
          settings: {
            onlyCategories: ["performance"],
            formFactor: "desktop",
            screenEmulation: { disabled: true },
            maxWaitForLoad: 15000,
            throttling: {
              rttMs: 40,
              throughputKbps: 10240,
              cpuSlowdownMultiplier: 1,
            },
          },
        },
        thresholds: {
          performance: process.env.CI ? 80 : 90,
        },
        port: 9222,
        url: url,
      });
    } catch (error) {
      console.error("Lighthouse audit failed:", error);
      throw error;
    }
  });
});
