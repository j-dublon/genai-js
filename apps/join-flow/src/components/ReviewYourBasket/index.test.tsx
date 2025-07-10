import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import useJoinFlowStore from "@/store/useJoinFlowStore";

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
const mockUseJoinFlowStore = vi.mocked(useJoinFlowStore);

const mockSetIsDialogOpen = vi.fn();

const mockEeroProductContent = [
  {
    code: "EERO_MESH_ROUTER_X1",
    heading: "No additional Eero needed",
    description: "Just one eero provided by us.",
    totalCount: 1,
    imageURL: "",
  },
  {
    code: "EERO_MESH_ROUTER_X2",
    heading: "Add one extra eero to your plan",
    description: "2 eeros are amazing",
    totalCount: 2,
    imageURL: "",
  },
  {
    code: "EERO_MESH_ROUTER_X3",
    heading: "Add 2 extra eeros to your plan",
    description: "3 eeros are incredible",
    totalCount: 3,
    imageURL: "",
  },
];

describe("ReviewYourBasket", () => {
  beforeEach(() => {
    vi.clearAllMocks();

    mockUseJoinFlowStore.mockReturnValue({
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
        extras: [
          {
            family: "mesh_routers",
            availableExtras: [
              {
                code: "EERO_MESH_ROUTER_X1",
                family: "mesh_routers",
                selectionIdentifier: "1",
                price: 0,
              },
              {
                code: "EERO_MESH_ROUTER_X2",
                family: "mesh_routers",
                selectionIdentifier: "2",
                price: 500,
              },
              {
                code: "EERO_MESH_ROUTER_X3",
                family: "mesh_routers",
                selectionIdentifier: "3",
                price: 1000,
              },
            ],
          },
        ],
        offers: null,
        id: "test-package-id",
      },
      currentStep: "review-basket",
      eeroSelection: {
        code: "EERO_MESH_ROUTER_X1",
        family: "mesh_routers",
        selectionIdentifier: "1",
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
        eeroProductContent={mockEeroProductContent}
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
        eeroProductContent={mockEeroProductContent}
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
        eeroProductContent={mockEeroProductContent}
      />,
    );
    const user = userEvent.setup();

    const button = screen.getByLabelText("Close basket");
    await user.click(button);

    expect(mockSetIsDialogOpen).toHaveBeenCalledWith(false);
  });

  it("should display eero information when available", async () => {
    render(
      <ReviewYourBasket
        isDialogOpen={true}
        setIsDialogOpen={mockSetIsDialogOpen}
        eeroProductContent={mockEeroProductContent}
      />,
    );

    const eeroElements = screen.getAllByText(/1x eero router/);
    expect(screen.getByText("Your mesh network:")).toBeInTheDocument();
    expect(eeroElements.length).toBeGreaterThan(0);
    expect(
      screen.getByText("Just one eero provided by us."),
    ).toBeInTheDocument();
  });

  it("should display address information when available", async () => {
    render(
      <ReviewYourBasket
        isDialogOpen={true}
        setIsDialogOpen={mockSetIsDialogOpen}
        eeroProductContent={mockEeroProductContent}
      />,
    );

    expect(
      screen.getByText(/123 Test Street, Test City, ABC 123/),
    ).toBeInTheDocument();
  });
});
