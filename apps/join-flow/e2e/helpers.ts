import { Page } from "@playwright/test";

export const mockTrustpilotScore = async (page: Page) => {
  await page.waitForLoadState("domcontentloaded");
  await page.route(/.*\/api\/trustpilot.*/i, async (route) => {
    await route.fulfill({
      status: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        success: true,
        data: {
          trustScore: 4.5,
          numberOfReviews: 1234,
        },
      }),
    });
  });
};
