import { test, expect, Page } from "@playwright/test";
import { addDays, format } from "date-fns";

test.describe("Go live date", () => {
  const goLiveDate = addDays(new Date(), 3);

  const formattedDate = {
    month: format(goLiveDate, "MMMM"),
    fullDateString: format(goLiveDate, "d MMMM yyyy"),
    fullDateStringWithDay: format(goLiveDate, "EEE MMM dd yyyy"),
    dayWithMonthString: format(goLiveDate, "EEEE, d MMMM"),
  };

  const selectors = {
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
          id: "c-900",
          name: "C-900",
          speed: { download: 900, upload: 100 },
          price: { monthly: 43, setup: 0 },
          priceIncrease: { nextYearIncrease: 3, followingYearIncrease: 3 },
          contractLength: 12,
          description: "Full fibre speed",
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
        },
        eeroSelection: {
          id: "no-additional-eero",
          name: "No additional eero device",
          description: "Just one eero provided by us.",
          price: 0,
          isSelected: true,
        },
        switchingDetails: {
          isWillingToSwitch: false,
          currentProvider: {
            id: "noProvider",
            name: "noProvider",
            description: "No provider was selected",
          },
          switchOrderReference: "SKIPPED",
        },
        paymentDetails: null,
        goLiveDetails: null,
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

  test.beforeEach(async ({ page, context }) => {
    await context.clearCookies();
    await context.clearPermissions();
    await setupInitialState(page);
    await page.goto("/join-flow/go-live-date");
  });

  test("Page content and functionality verification", async ({ page }) => {
    await verifyInitialPageContent(page);
    await selectDate(page);
    await selectTimeslot(page);
    await proceedToPayment(page);
  });
});
