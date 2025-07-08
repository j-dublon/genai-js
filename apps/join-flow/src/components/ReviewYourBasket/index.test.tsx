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

const mockSetIsDialogOpen = vi.fn();

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
        code: "EERO_MESH_ROUTER_X1",
        family: "mesh_routers",
        selectionIdentifier: "1",
        price: 700,
        totalCount: 3,
      },
      serviceAddress: {
        line1: "123",
        line2: "Test Street",
        line3: "Test City",
        postcode: "ABC 123",
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
    render(
      <ReviewYourBasket
        isDialogOpen={false}
        setIsDialogOpen={mockSetIsDialogOpen}
      />,
    );
    const button = screen.getByText("View Basket");
    expect(button).toBeInTheDocument();
  });

  it("should open dialog when button is clicked", async () => {
    render(
      <ReviewYourBasket
        isDialogOpen={false}
        setIsDialogOpen={mockSetIsDialogOpen}
      />,
    );
    const user = userEvent.setup();
    const button = screen.getByText("View Basket");
    await user.click(button);
    expect(mockSetIsDialogOpen).toHaveBeenCalledWith(true);
  });

  it("should close dialog when close button is clicked", async () => {
    render(
      <ReviewYourBasket
        isDialogOpen={true}
        setIsDialogOpen={mockSetIsDialogOpen}
      />,
    );
    const user = userEvent.setup();
    const button = screen.getByLabelText("Close basket");
    await user.click(button);
    expect(mockSetIsDialogOpen).toHaveBeenCalledWith(false);
  });

  // TODO: Next PR - handle eeros in review basket
  it.todo("should display eero information when available", async () => {
    render(
      <ReviewYourBasket
        isDialogOpen={true}
        setIsDialogOpen={mockSetIsDialogOpen}
      />,
    );
    expect(screen.getByText("Your mesh network:")).toBeInTheDocument();
    const eeroElements = screen.getAllByText(/3x eero router/);
    expect(eeroElements.length).toBeGreaterThan(0);
    expect(screen.getByText("The best eero router")).toBeInTheDocument();
  });

  it("should display address information when available", async () => {
    render(
      <ReviewYourBasket
        isDialogOpen={true}
        setIsDialogOpen={mockSetIsDialogOpen}
      />,
    );
    expect(
      screen.getByText(/123 Test Street, Test City, ABC 123/),
    ).toBeInTheDocument();
  });
});
