import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useJoinFlowStore from "@/store/useJoinFlowStore";
import { getNextPage } from "@/validation/getNextPage";

import { ReviewYourBasket } from "./index";

vi.mock("next/navigation", () => ({
  useRouter: () => ({
    push: vi.fn(),
  }),
  usePathname: () => "/review-basket",
}));

vi.mock("@/store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));

vi.mock("@/validation/getNextPage", () => ({
  getNextPage: vi.fn(),
}));

describe("ReviewYourBasket", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    (getNextPage as ReturnType<typeof vi.fn>).mockReturnValue({
      name: "Next Page",
    });

    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      selectedPackage: {
        krakenProductCode: "test-package",
        frontendIdentifier: "test-package-24",
        termMonths: 24,
        selectionIdentifier: "test-selection",
        installationRequired: false,
        appliedPromotionUUIDs: null,
        prices: {
          basePrice: 2999,
          discountedPrice: 2999,
          annualPriceRise: [
            {
              price: 3299,
              date: "2025-04-01",
              id: "rise-1",
            },
            {
              price: 3599,
              date: "2026-04-01",
              id: "rise-2",
            },
          ],
        },
        speeds: {
          download: 100,
          upload: 20,
        },
        extras: null,
        offers: null,
        id: "test-package-id",
      },
      currentStep: "review-basket",
      eeroSelection: {
        id: "eero-pro-6",
        name: "eero Pro 6",
        description: "Test description",
        price: 999,
        isSelected: true,
      },
      serviceAddress: {
        line1: "123 Test Street",
        line2: "Test Town",
        line3: "Test City",
        postcode: "SW1A 1AA",
        addressKey: "test-key",
        addressKeyType: "NAD",
      },
      selectPackage: vi.fn(),
      selectEeroProduct: vi.fn(),
      resetFlow: vi.fn(),
      quoteResponse: {
        response: {
          products: [
            {
              krakenProductCode: "test-package",
              frontendIdentifier: "test-package-24",
              termMonths: 24,
              selectionIdentifier: "test-selection",
              installationRequired: false,
              appliedPromotionUUIDs: null,
              prices: {
                basePrice: 2999,
                discountedPrice: 2999,
                annualPriceRise: [
                  {
                    price: 3299,
                    date: "2025-04-01",
                    id: "rise-1",
                  },
                  {
                    price: 3599,
                    date: "2026-04-01",
                    id: "rise-2",
                  },
                ],
              },
              speeds: {
                download: 100,
                upload: 20,
              },
              extras: null,
              offers: null,
              id: "test-package-id",
            },
          ],
        },
      },
    });
  });

  it("should render basket button", () => {
    render(<ReviewYourBasket />);
    const button = screen.getByText("View Basket");
    expect(button).toBeInTheDocument();
  });

  it("should open dialog when button is clicked", async () => {
    render(<ReviewYourBasket />);
    const user = userEvent.setup();
    const button = screen.getByText("View Basket");
    await user.click(button);
    expect(screen.getByText("Review my basket")).toBeInTheDocument();
  });

  it("should close dialog when close button is clicked", async () => {
    render(<ReviewYourBasket />);
    const user = userEvent.setup();
    const button = screen.getByText("View Basket");
    await user.click(button);

    const allButtons = screen.getAllByRole("button");
    const closeButton = allButtons.find(
      (btn) =>
        !btn.textContent?.includes("View Basket") && btn.querySelector("svg"),
    );

    expect(closeButton).toBeInTheDocument();
    await user.click(closeButton!);

    expect(screen.queryByText("Review my basket")).not.toBeInTheDocument();
  });

  it("should display eero information when available", async () => {
    render(<ReviewYourBasket />);
    const user = userEvent.setup();
    const button = screen.getByText("View Basket");
    await user.click(button);
    expect(screen.getByText("Your mesh network:")).toBeInTheDocument();
    const eeroElements = screen.getAllByText(/eero Pro 6/);
    expect(eeroElements.length).toBeGreaterThan(0);
    expect(screen.getByText("Test description")).toBeInTheDocument();
  });

  it("should display address information when available", async () => {
    render(<ReviewYourBasket />);
    const user = userEvent.setup();
    const button = screen.getByText("View Basket");
    await user.click(button);
    expect(
      screen.getByText(/123 Test Street, Test Town, Test City/),
    ).toBeInTheDocument();
  });
});
