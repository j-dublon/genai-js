import { expect, Page, test } from "@playwright/test";
import { addDays, format } from "date-fns";

const goLiveDate = addDays(new Date(), 3);

const formattedDate = {
  month: format(goLiveDate, "MMMM"),
  fullDateString: format(goLiveDate, "d MMMM yyyy"),
  fullDateStringWithDay: format(goLiveDate, "EEE MMM dd yyyy"),
  dayWithMonthString: format(goLiveDate, "EEEE, d MMMM"),
};

const selectors = {
  otsFailBanner: "Important info:",
  pageTitle: "Your go-live Date",
  availabilityMessage: `Yay! We can get you live as early as ${formattedDate.fullDateString}`,
  dateButton: "Please select a date",
  monthHeading: formattedDate.month,
  dateOption: `Choose ${formattedDate.dayWithMonthString}`,
  selectedDateButton: formattedDate.fullDateStringWithDay,
  timeslotButton: "Select a timeslot",
  timeslotOption: "8am - 1pm",
  continueButton: "Continue to payment",
};

const setupInitialState = (page: Page) => {
  return page.addInitScript(() => {
    const initialState = {
      _hasHydrated: true,
      currentStep: 3,
      selectedPackage: {
        krakenProductCode: "BT-150-24M_32",
        frontendIdentifier: "150-24",
        termMonths: 24,
        frontendTitle: "C-150",
        selectionIdentifier: "5",
        installationRequired: true,
        appliedPromotionUUIDs: [],
        prices: {
          basePrice: 3200,
          discountedPrice: 3200,
          annualPriceRise: [
            {
              price: 3500,
              date: "2026-04-01T12:00:00.000Z",
              id: "684300d8e356fc4f487cfa2b",
            },
            {
              price: 3800,
              date: "2027-04-01T12:00:00.000Z",
              id: "684300d8e356fc4f487cfa2c",
            },
          ],
        },
        speeds: {
          download: 25,
          upload: 150,
        },
        extras: [
          {
            family: "mesh_routers",
            availableExtras: [
              {
                code: "EXTRA_NOKIA_MESH_X2",
                name: "Extra Nokia Mesh (x2)",
                description: "2 x Free Nokia Mesh",
                price: 0,
                selectionIdentifier: "0",
                id: "684300d8e356fc4f487cfa2d",
              },
              {
                code: "EXTRA_NOKIA_MESH_X1",
                name: "Extra Nokia Mesh (x1)",
                description: "1 x Free Nokia Mesh",
                price: 0,
                selectionIdentifier: "1",
                id: "684300d8e356fc4f487cfa2e",
              },
              {
                code: "EERO_MESH_ROUTER_X3",
                name: "Eero Mesh Router (x3)",
                description:
                  "A pack of 3 mesh routers to expand network coverage",
                price: 2100,
                selectionIdentifier: "2",
                id: "684300d8e356fc4f487cfa2f",
              },
              {
                code: "EERO_MESH_ROUTER_X2",
                name: "Eero Mesh Router (x2)",
                description:
                  "A pack of 2 mesh routers to expand network coverage",
                price: 1400,
                selectionIdentifier: "3",
                id: "684300d8e356fc4f487cfa30",
              },
              {
                code: "EERO_MESH_ROUTER_X1",
                name: "Eero Mesh Router (x1)",
                description:
                  "A single Eero mesh router to expand network coverage",
                price: 700,
                selectionIdentifier: "4",
                id: "684300d8e356fc4f487cfa31",
              },
            ],
            id: "684300d8e356fc4f487cfa32",
          },
          {
            family: "voips",
            availableExtras: [
              {
                code: "HOME_PHONE_1000_INT",
                name: "Home Phone 1000 INT",
                description: "HomePhone1000 INT",
                price: 1000,
                selectionIdentifier: "0",
                id: "684300d8e356fc4f487cfa33",
              },
              {
                code: "SWISH_VOICE_GO",
                name: "Swish Voice Go",
                description: "Voice Go",
                price: 500,
                selectionIdentifier: "1",
                id: "684300d8e356fc4f487cfa34",
              },
              {
                code: "SWISH_VOICE_UK",
                name: "Swish Voice UK",
                description: "Voice UK",
                price: 1000,
                selectionIdentifier: "2",
                id: "684300d8e356fc4f487cfa35",
              },
              {
                code: "SWISH_VOICE_WORLD",
                name: "Swish Voice World",
                description: "Voice World",
                price: 2000,
                selectionIdentifier: "3",
                id: "684300d8e356fc4f487cfa36",
              },
              {
                code: "BATTERY_BACK_UP",
                name: "Battery Back Up",
                description: "Battery Back Up",
                price: 0,
                selectionIdentifier: "4",
                id: "684300d8e356fc4f487cfa37",
              },
              {
                code: "HOME_PHONE_60_UK",
                name: "Home Phone 60 UK",
                description: "HomePhone60 UK",
                price: 400,
                selectionIdentifier: "5",
                id: "684300d8e356fc4f487cfa38",
              },
              {
                code: "HOME_PHONE_300_UK",
                name: "Home Phone 300 UK",
                description: "HomePhone300 UK",
                price: 600,
                selectionIdentifier: "6",
                id: "684300d8e356fc4f487cfa39",
              },
            ],
            id: "684300d8e356fc4f487cfa3a",
          },
          {
            family: "routers",
            availableExtras: [
              {
                code: "NOKIA_ROUTER",
                name: "Nokia Router",
                description: "Nokia Router",
                price: 0,
                selectionIdentifier: "0",
                id: "684300d8e356fc4f487cfa3b",
              },
              {
                code: "SWISH_STANDARD_ROUTER_PLUME",
                name: "Swish Standard Router (Plume)",
                description: "Swish Standard Router (Plume)",
                price: 0,
                selectionIdentifier: "1",
                id: "684300d8e356fc4f487cfa3c",
              },
              {
                code: "WIFI_6_ROUTER",
                name: "Wi-fi 6 Router",
                description: "Linksys Router",
                price: 0,
                selectionIdentifier: "2",
                id: "684300d8e356fc4f487cfa3d",
              },
              {
                code: "WIFI_6_ROUTER_UPGRADE",
                name: "Wi-fi 6 Router Upgrade",
                description: "Linksys Router Upgrade",
                price: 700,
                selectionIdentifier: "3",
                id: "684300d8e356fc4f487cfa3e",
              },
            ],
            id: "684300d8e356fc4f487cfa3f",
          },
          {
            family: "static_ips",
            availableExtras: [
              {
                code: "SWISH_STATIC_IP",
                name: "Swish Static IP",
                description: "Static IP v3",
                price: 300,
                selectionIdentifier: "0",
                id: "684300d8e356fc4f487cfa40",
              },
            ],
            id: "684300d8e356fc4f487cfa41",
          },
        ],
        offers: [],
        id: "684300d8e356fc4f487cfa42",
      },
      serviceAddress: {
        line1: "Test Address Line 1",
        line2: "Test Address Line 2",
        line3: "London",
        postcode: "SW1A 2AA",
        identifiers: [],
      },
      affiliateSession: {
        affiliateName: "test-affiliate-name",
        cuckooAffiliate: "",
        doEmailValidation: true,
        sessionId: "1645",
        useCreditCheckResult: true,
      },
      personalDetails: {
        firstName: "sam",
        lastName: "test",
        phone: "0",
        hasSmartphone: "yes",
        email: "test@test.com",
        confirmEmail: "test@testcom",
        marketingConsent: false,
        personalDetailsStep: "additional",
        personalDetailsCompleted: true,
        verificationCode: "123456",
        dobDay: "01",
        dobMonth: "01",
        dobYear: "1992",
        residencyDuration: "over-year",
        requiresLandline: false,
      },
      eeroSelection: {
        id: "no-additional-eero",
        name: "No additional eero device",
        description: "Just one eero provided by us.",
        price: 0,
        isSelected: true,
      },
      switchingDetails: {
        otsSwitchStatus: "OTS_FAILED",
      },
      paymentDetails: null,
      goLiveDetails: null,
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
                broadbandAndCurrentExtras: {
                  basePrice: 3700,
                  discount: 0,
                  customerPriceIncDiscount: 3700,
                  annualPriceRise: [
                    {
                      price: 4000,
                      date: "2026-04-01T12:00:00.000Z",
                      id: "684158f6b3586360474ec962",
                    },
                  ],
                },
                currentExtras: {
                  basePrice: 0,
                  discount: 0,
                  customerPriceIncDiscount: 0,
                },
                broadband: {
                  basePrice: 3700,
                  discount: 0,
                  customerPriceIncDiscount: 3700,
                  annualPriceRise: [
                    {
                      price: 4000,
                      date: "2026-04-01T12:00:00.000Z",
                      id: "684158f6b3586360474ec962",
                    },
                  ],
                },
              },
              speeds: { download: 500, upload: 75 },
              availableExtras: [],
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
                broadbandAndCurrentExtras: {
                  basePrice: 3900,
                  discount: 0,
                  customerPriceIncDiscount: 3900,
                  annualPriceRise: [
                    {
                      price: 4200,
                      date: "2026-04-01T12:00:00.000Z",
                      id: "684158f6b3586360474ec963",
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
                      id: "684158f6b3586360474ec963",
                    },
                  ],
                },
              },
              speeds: { download: 900, upload: 900 },
              availableExtras: [],
              offers: [],
              id: "684158f6b3586360474ec978",
            },
          ],
          quotingCode: "test-quote-code",
        },
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
};

const verifyInitialPageContent = async (page: Page) => {
  await expect(page.getByText(selectors.otsFailBanner)).toBeVisible();
  await expect(page.getByText(selectors.pageTitle)).toBeVisible();
  await expect(page.getByText(selectors.availabilityMessage)).toBeVisible();
  await expect(
    page.getByRole("button", { name: selectors.timeslotButton }),
  ).not.toBeVisible();
};

const selectDate = async (page: Page) => {
  await page.getByRole("button", { name: selectors.dateButton }).click();
  await expect(
    page.getByRole("heading", { name: selectors.monthHeading }),
  ).toBeVisible();
  await page.getByRole("option", { name: selectors.dateOption }).click();
  await expect(
    page.getByRole("button", { name: selectors.selectedDateButton }),
  ).toBeVisible();
};

const selectTimeslot = async (page: Page) => {
  await expect(
    page.getByRole("button", { name: selectors.timeslotButton }),
  ).toBeVisible();
  await page.getByRole("button", { name: selectors.timeslotButton }).click();
  await page.getByRole("button", { name: selectors.timeslotOption }).click();
  await expect(
    page.getByRole("button", { name: selectors.timeslotButton }),
  ).not.toBeVisible();
};

const proceedToPayment = async (page: Page) => {
  await page.getByRole("button", { name: selectors.continueButton }).click();
  await expect(page).toHaveURL(/payment-details/);
};

test.skip("Go live date page", () => {
  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    await setupInitialState(page);
    await page.goto("/join-flow/go-live-date");
  });

  test("Content and functionality verification", async ({ page }) => {
    await verifyInitialPageContent(page);
    await selectDate(page);
    await selectTimeslot(page);
    await proceedToPayment(page);
  });
});
