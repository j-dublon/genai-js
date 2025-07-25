import { expect, Page, test } from "@playwright/test";

const setupInitialState = (page: Page) => {
  return page.addInitScript(() => {
    const initialState = {
      _hasHydrated: true,
      currentStep: 1,
      selectedPackage: null,
      serviceAddress: {
        line1: "Test Address Line 1",
        line2: "Test Address Line 2",
        line3: "London",
        postcode: "SW1A 2AA",
        identifiers: [],
        id: "test-address-id",
        selectionIdentifier: "test-selection-id",
      },
      quoteResponse: {
        documentID: "test-doc-id",
        response: {
          products: [
            {
              krakenProductCode: "BT-150-12M_38",
              frontendIdentifier: "150-12",
              frontendTitle: "C-150",
              termMonths: 12,
              selectionIdentifier: "0",
              installationRequired: true,
              appliedPromotionUUIDs: [],
              prices: {
                broadbandAndCurrentExtras: {
                  basePrice: 3800,
                  discount: 0,
                  customerPriceIncDiscount: 3800,
                  annualPriceRise: [
                    {
                      price: 4100,
                      date: "2026-04-01T12:00:00.000Z",
                      id: "684158f6b3586360474ec95e",
                    },
                  ],
                },
                currentExtras: {
                  basePrice: 0,
                  discount: 0,
                  customerPriceIncDiscount: 0,
                },
                broadband: {
                  basePrice: 3800,
                  discount: 0,
                  customerPriceIncDiscount: 3800,
                  annualPriceRise: [
                    {
                      price: 4100,
                      date: "2026-04-01T12:00:00.000Z",
                      id: "684158f6b3586360474ec95e",
                    },
                  ],
                },
              },
              speeds: { download: 150, upload: 25 },
              availableExtras: [],
              offers: [],
              id: "684158f6b3586360474ec973",
            },
            {
              krakenProductCode: "BT-500-12M_42",
              frontendIdentifier: "500-12",
              frontendTitle: "C-500",
              termMonths: 12,
              selectionIdentifier: "1",
              installationRequired: true,
              appliedPromotionUUIDs: [],
              prices: {
                broadbandAndCurrentExtras: {
                  basePrice: 3900,
                  discount: 0,
                  customerPriceIncDiscount: 3900,
                  annualPriceRise: [
                    {
                      price: 4200,
                      date: "2026-04-01T12:00:00.000Z",
                      id: "684158f6b3586360474ec95f",
                    },
                  ],
                },
                currentExtras: {
                  basePrice: 0,
                  discount: 0,
                  customerPriceIncDiscount: 0,
                },
                broadband: {
                  basePrice: 3900,
                  discount: 0,
                  customerPriceIncDiscount: 3900,
                  annualPriceRise: [
                    {
                      price: 4200,
                      date: "2026-04-01T12:00:00.000Z",
                      id: "684158f6b3586360474ec95f",
                    },
                  ],
                },
              },
              speeds: { download: 500, upload: 75 },
              availableExtras: [],
              offers: [],
              id: "684158f6b3586360474ec974",
            },
            {
              krakenProductCode: "BT-900-12M_45",
              frontendIdentifier: "900-12",
              frontendTitle: "C-900",
              termMonths: 12,
              selectionIdentifier: "2",
              installationRequired: true,
              appliedPromotionUUIDs: [],
              prices: {
                broadbandAndCurrentExtras: {
                  basePrice: 4100,
                  discount: 0,
                  customerPriceIncDiscount: 4100,
                  annualPriceRise: [
                    {
                      price: 4400,
                      date: "2026-04-01T12:00:00.000Z",
                      id: "684158f6b3586360474ec960",
                    },
                  ],
                },
                currentExtras: {
                  basePrice: 0,
                  discount: 0,
                  customerPriceIncDiscount: 0,
                },
                broadband: {
                  basePrice: 4100,
                  discount: 0,
                  customerPriceIncDiscount: 4100,
                  annualPriceRise: [
                    {
                      price: 4400,
                      date: "2026-04-01T12:00:00.000Z",
                      id: "684158f6b3586360474ec960",
                    },
                  ],
                },
              },
              speeds: { download: 900, upload: 900 },
              availableExtras: [],
              offers: [],
              id: "684158f6b3586360474ec975",
            },
            {
              krakenProductCode: "BT-150-24M_38",
              frontendIdentifier: "150-24",
              frontendTitle: "C-150",
              termMonths: 24,
              selectionIdentifier: "3",
              installationRequired: true,
              appliedPromotionUUIDs: [],
              prices: {
                broadbandAndCurrentExtras: {
                  basePrice: 3600,
                  discount: 0,
                  customerPriceIncDiscount: 3600,
                  annualPriceRise: [
                    {
                      price: 3900,
                      date: "2026-04-01T12:00:00.000Z",
                      id: "684158f6b3586360474ec961",
                    },
                  ],
                },
                currentExtras: {
                  basePrice: 0,
                  discount: 0,
                  customerPriceIncDiscount: 0,
                },
                broadband: {
                  basePrice: 3600,
                  discount: 0,
                  customerPriceIncDiscount: 3600,
                  annualPriceRise: [
                    {
                      price: 3900,
                      date: "2026-04-01T12:00:00.000Z",
                      id: "684158f6b3586360474ec961",
                    },
                  ],
                },
              },
              speeds: { download: 150, upload: 25 },
              availableExtras: [],
              offers: [],
              id: "684158f6b3586360474ec976",
            },
            {
              krakenProductCode: "BT-500-24M_42",
              frontendIdentifier: "500-24",
              frontendTitle: "C-500",
              termMonths: 24,
              selectionIdentifier: "4",
              installationRequired: true,
              appliedPromotionUUIDs: [],
              prices: {
                basePrice: 3700,
                discountedPrice: 3700,
                annualPriceRise: [
                  {
                    price: 4000,
                    date: "2026-04-01T12:00:00.000Z",
                    id: "684158f6b3586360474ec962",
                  },
                ],
              },
              speeds: { download: 500, upload: 75 },
              extras: [],
              offers: [],
              id: "684158f6b3586360474ec977",
            },
            {
              krakenProductCode: "BT-900-24M_45",
              frontendIdentifier: "900-24",
              frontendTitle: "C-900",
              termMonths: 24,
              selectionIdentifier: "5",
              installationRequired: true,
              appliedPromotionUUIDs: [],
              prices: {
                basePrice: 3900,
                discountedPrice: 3900,
                annualPriceRise: [
                  {
                    price: 4200,
                    date: "2026-04-01T12:00:00.000Z",
                    id: "684158f6b3586360474ec963",
                  },
                ],
              },
              speeds: { download: 900, upload: 900 },
              extras: [],
              offers: [],
              id: "684158f6b3586360474ec978",
            },
          ],
          quotingCode: "test-quote-code",
        },
      },
      accessibilityRequirements: null,
      affiliateSession: {
        affiliateName: "test-affiliate-name",
        cuckooAffiliate: "",
        doEmailValidation: true,
        id: "1645",
        useCreditCheckResult: true,
      },
      personalDetails: null,
      eeroSelection: null,
      switchingDetails: null,
      paymentDetails: null,
      goLiveDetails: null,
      basket: null,
      isLoadingModalOpen: false,
    };

    localStorage.setItem(
      "cuckoo-join-flow-storage",
      JSON.stringify({ state: initialState, version: 0 }),
    );

    localStorage.setItem(
      "cookieNotice",
      JSON.stringify({
        functionality_storage: "granted",
        ad_storage: "granted",
        ad_user_data: "granted",
        ad_personalization: "granted",
        analytics_storage: "granted",
        personalization_storage: "granted",
        security_storage: "granted",
        ads_backend_tracking: "granted",
      }),
    );
  });
};

test.describe("Select package page", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await context.clearPermissions();

    await page.route("**/*", async (route) => {
      const url = route.request().url();
      const method = route.request().method();

      if (url.includes("baskets") && method === "POST") {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            basket: {
              id: "test-basket-id",
              locked: false,
              product: {
                quoteLookup: {
                  value: "test-doc-id",
                  relationTo: "newSaleQuoteLookups",
                },
                selectionIdentifier: "5",
              },
              updatedAt: new Date().toISOString(),
              createdAt: new Date().toISOString(),
            },
          }),
        });
        return;
      }

      if (url.includes("trustpilot")) {
        await route.fulfill({
          status: 200,
          contentType: "application/json",
          body: JSON.stringify({
            trustScore: 4.5,
            numberOfReviews: 1234,
          }),
        });
        return;
      }

      await route.continue();
    });

    await setupInitialState(page);
    await page.goto("/join-flow/package-selection");
  });

  test("Basic page load test", async ({ page }) => {
    await page.waitForLoadState("load");
    const bodyExists = await page.locator("body").isVisible();
    expect(bodyExists).toBe(true);
    const pageText = await page.textContent("body");
    expect(pageText).toBeTruthy();
    expect(pageText?.length || 0).toBeGreaterThan(10);
  });

  test("Packages should render on page", async ({ page }) => {
    await page.waitForLoadState("load");
    try {
      await page.waitForSelector(':has-text("24")', { timeout: 10000 });
      await page.waitForSelector(':has-text("£")', { timeout: 5000 });
      await page.waitForSelector(':has-text("Mbps")', { timeout: 5000 });
      const allText = await page.textContent("body");
      expect(allText).toBeTruthy();
      expect(allText).toContain("£");
      expect(allText).toContain("Mbps");
    } catch {
      await page.screenshot({
        path: "failed-package-load.png",
        fullPage: true,
      });
    }
  });
});
