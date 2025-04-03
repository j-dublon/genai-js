import { expect, Page, Locator } from "@playwright/test";

export const checkPostcodeChecker = async (parent: Locator, page: Page) => {
  const postcodeInput = parent.getByLabel("enter your postcode");
  await expect(postcodeInput).toBeVisible();
  await postcodeInput.fill("SW1A 1AA");

  const ctaButton = parent.getByRole("button");
  await expect(ctaButton).toBeVisible();

  await Promise.all([
    page.waitForURL("**/join/choose-your-address?postcode=SW1A+1AA"),
    ctaButton.click(),
  ]);

  expect(page.url()).toContain("/join/choose-your-address?postcode=SW1A+1AA");
};

export const checkTrustpilotLogo = async (parent: Locator) => {
  const trustpilotLogo = parent.getByRole("img", { name: "TrustPilot Logo" });
  await expect(trustpilotLogo).toBeVisible();
};

export const mockTrustpilotReviews = async (page: Page) => {
  await page.route("/api/trustpilot/reviews*", async (route) => {
    const url = new URL(route.request().url());
    const reviewIds = url.searchParams.get("reviewIds")?.split(",") || [];

    const mockReviews = reviewIds.map((id) => ({
      id,
      title: `Great Service ${id}`,
      reviewText: "Cuckoo is great!",
      author: `Happy Customer ${id}`,
      starRating: 5,
    }));

    await route.fulfill({
      status: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        success: true,
        data: mockReviews,
      }),
    });
  });
};

export const mockTrustpilotScore = async (page: Page) => {
  await page.route("/api/trustpilot", async (route) => {
    await route.fulfill({
      status: 200,
      headers: { "content-type": "application/json" },
      body: JSON.stringify({
        success: true,
        data: {
          trustScore: 4.8,
          numberOfReviews: 1234,
        },
      }),
    });
  });
};

export interface TestCase {
  selector: string;
  type: "testId" | "role" | "locator";
}

export const checkVisibility = async (page: Page, section: TestCase) => {
  let element: Locator;
  switch (section.type) {
    case "testId":
      element = page.getByTestId(section.selector);
      break;
    case "role":
      element = page.getByRole("region", { name: section.selector });
      break;
    case "locator":
      element = page.locator(section.selector);
      break;
    default:
      throw new Error(`Unsupported section type: ${section.type}`);
  }
  await expect(element).toBeVisible();
};
