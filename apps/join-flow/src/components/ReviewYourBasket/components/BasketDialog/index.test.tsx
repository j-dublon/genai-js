import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { reviewYourBasketText } from "@/components/ReviewYourBasket/ReviewYourBasketProps";
import useJoinFlowStore, {
  EeroProduct,
  StoreSelectedPackage,
} from "@/store/useJoinFlowStore";

import { BasketDialog } from "./index";

vi.mock("@/store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));

// TODO: Next PR - handle eeros in review basket
describe.todo("BasketDialog", () => {
  const mockOnClose = vi.fn();
  const mockOnPlanChange = vi.fn();
  const mockOnAddressChange = vi.fn();

  const mockSelectedPackage: StoreSelectedPackage = {
    krakenProductCode: "BT-150-24M_38",
    frontendIdentifier: "150-24",
    termMonths: 24,
    frontendTitle: "C-150",
    selectionIdentifier: "0",
    installationRequired: true,
    appliedPromotionUUIDs: [],
    prices: {
      basePrice: 3200,
      discountedPrice: 3000,
      annualPriceRise: [
        {
          price: 3500,
          date: "2026-04-01T12:00:00.000Z",
          id: "test-rise-1",
        },
        {
          price: 3800,
          date: "2027-04-01T12:00:00.000Z",
          id: "test-rise-2",
        },
      ],
    },
    speeds: {
      download: 150,
      upload: 30,
    },
    extras: null,
    offers: null,
    id: "test-pkg-id",
  };

  const mockEeroSelection: EeroProduct = {
    code: "EERO_MESH_ROUTER_X1",
    family: "mesh_routers",
    selectionIdentifier: "1",
    price: 0,
  };

  const mockEeroProducts: EeroProduct[] = [
    mockEeroSelection,
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
      price: 800,
    },
  ];

  const mockAvailablePackages: StoreSelectedPackage[] = [
    {
      krakenProductCode: "BT-300-12M_38",
      frontendIdentifier: "300-12",
      frontendTitle: "C-150",
      termMonths: 12,
      selectionIdentifier: "1",
      installationRequired: true,
      appliedPromotionUUIDs: [],
      prices: {
        basePrice: 3800,
        discountedPrice: 3800,
        annualPriceRise: [
          {
            price: 4200,
            date: "2026-04-01T12:00:00.000Z",
            id: "test-rise-3",
          },
        ],
      },
      speeds: {
        download: 300,
        upload: 50,
      },
      extras: null,
      offers: null,
      id: "test-pkg-2-id",
    },
  ];

  const mockServiceAddress = {
    line1: "123",
    line2: "Test Street",
    line3: "Test City",
    postcode: "ABC 123",
  };

  const mockPricing = {
    monthlyPackagePrice: 32,
    monthlyEeroPrice: 0,
    monthlyTotal: 32,
    discountedPrice: 30,
    discountedMonthlyTotal: 30,
    predictedTotalNext: 38,
    predictedTotalFollowing: 42,
    nextPrice: 38,
    followingPrice: 42,
    packageName: "C-300",
  };

  beforeEach(() => {
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      serviceAddress: mockServiceAddress,
      selectedPackage: mockSelectedPackage,
      eeroSelection: mockEeroSelection,
    });
  });

  const renderComponent = (
    props: Partial<Parameters<typeof BasketDialog>[0]> = {},
  ) => {
    return render(
      <BasketDialog
        isOpen={true}
        onClose={mockOnClose}
        availablePackages={mockAvailablePackages}
        eeroProducts={mockEeroProducts}
        onPlanChange={mockOnPlanChange}
        onAddressChange={mockOnAddressChange}
        pricing={mockPricing}
        {...props}
      />,
    );
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not be open when isOpen is false", () => {
    render(
      <BasketDialog
        isOpen={false}
        onClose={mockOnClose}
        availablePackages={mockAvailablePackages}
        eeroProducts={mockEeroProducts}
        onPlanChange={mockOnPlanChange}
        onAddressChange={mockOnAddressChange}
        pricing={mockPricing}
      />,
    );

    const dialog = screen.queryByRole("dialog");
    expect(dialog).not.toBeInTheDocument();
  });

  it("should render the dialog title when open", () => {
    renderComponent();
    expect(screen.getByText(reviewYourBasketText.title)).toBeInTheDocument();
  });

  it("should display service address when provided", () => {
    renderComponent();

    expect(
      screen.getByText(reviewYourBasketText.yourAddress),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/123 Test Street, Test City, ABC 123/),
    ).toBeInTheDocument();
  });

  it("should display package information correctly", () => {
    renderComponent();

    expect(
      screen.getByText(reviewYourBasketText.broadbandPlan),
    ).toBeInTheDocument();
    expect(screen.getByText(/150Mbps/)).toBeInTheDocument();
    expect(screen.getByText(/150Mbps download speed/)).toBeInTheDocument();
    expect(screen.getByText(/30Mbps upload speed/)).toBeInTheDocument();
    expect(screen.getByText(/24 months/)).toBeInTheDocument();
  });

  it("should display the change plan option", async () => {
    renderComponent();
    const changePlanButton = screen.getByRole("button", {
      name: "Change plan",
    });
    expect(changePlanButton).toBeInTheDocument();
    expect(changePlanButton).toHaveTextContent(reviewYourBasketText.changePlan);
  });

  it("should not display eero section when eeroSelection is null", () => {
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      serviceAddress: mockServiceAddress,
      selectedPackage: mockSelectedPackage,
      eeroSelection: null,
    });
    renderComponent();

    expect(
      screen.queryByText(reviewYourBasketText.yourMeshNetwork),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(reviewYourBasketText.addMoreEeros),
    ).not.toBeInTheDocument();
  });

  it("should not display the subtotal section when eeroSelection is null", () => {
    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      serviceAddress: mockServiceAddress,
      selectedPackage: mockSelectedPackage,
      eeroSelection: null,
    });
    renderComponent();

    expect(
      screen.queryByText(reviewYourBasketText.yourSubtotal),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByText(reviewYourBasketText.yourTotal),
    ).not.toBeInTheDocument();
  });

  it("should call onClose when the close button is clicked", async () => {
    renderComponent();
    const user = userEvent.setup();

    const closeButton = screen.getByLabelText("Close basket");
    await user.click(closeButton);

    expect(mockOnClose).toHaveBeenCalledTimes(1);
  });

  it("should call onAddressChange when start again is clicked", async () => {
    renderComponent();
    const user = userEvent.setup();

    const startAgainButton = screen.getByText(reviewYourBasketText.startAgain);
    await user.click(startAgainButton);

    expect(mockOnAddressChange).toHaveBeenCalledTimes(1);
  });

  it("should show eero price in subtotal when premium eero is selected", () => {
    const premiumEero: EeroProduct = {
      code: "EERO_MESH_ROUTER_X2",
      family: "mesh_routers",
      selectionIdentifier: "2",
      price: 500,
    };

    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      serviceAddress: mockServiceAddress,
      selectedPackage: mockSelectedPackage,
      eeroSelection: premiumEero,
    });

    renderComponent({
      pricing: {
        monthlyPackagePrice: 32,
        monthlyEeroPrice: 5,
        monthlyTotal: 37,
        discountedPrice: 32,
        discountedMonthlyTotal: 37,
        predictedTotalNext: 43,
        predictedTotalFollowing: 47,
        nextPrice: 38,
        followingPrice: 42,
        packageName: "C-300",
      },
    });

    const eeroPrice = screen.getAllByText((content) =>
      content.includes("£5"),
    )[0];
    expect(eeroPrice).toBeInTheDocument();

    const monthlyTotal = screen.getAllByText((content) =>
      content.includes("£37"),
    )[0];
    expect(monthlyTotal).toBeInTheDocument();
  });

  it("should display correct package name from speeds", () => {
    renderComponent();

    expect(screen.getByText(/150Mbps/)).toBeInTheDocument();
  });

  it("should display pricing information correctly", () => {
    renderComponent();

    // Test for package price with discount suffix
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "£30/month for the first 3 months";
      }),
    ).toBeInTheDocument();

    // Test for total price with afterwards suffix
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "£32/month afterwards";
      }),
    ).toBeInTheDocument();

    // Test for package price after discount period
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "£32/month after discounted period";
      }),
    ).toBeInTheDocument();

    // Test for future pricing
    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "£38/month from April 2026";
      }),
    ).toBeInTheDocument();

    expect(
      screen.getByText((content, element) => {
        return element?.textContent === "£42/month from April 2027";
      }),
    ).toBeInTheDocument();
  });

  it("should show remove eeros option when premium eero is selected", () => {
    const premiumEero: EeroProduct = {
      code: "EERO_MESH_ROUTER_X2",
      family: "mesh_routers",
      selectionIdentifier: "2",
      price: 500,
    };

    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      serviceAddress: mockServiceAddress,
      selectedPackage: mockSelectedPackage,
      eeroSelection: premiumEero,
    });

    renderComponent();

    expect(
      screen.getByText(reviewYourBasketText.removeEeros),
    ).toBeInTheDocument();
    expect(
      screen.queryByText(reviewYourBasketText.addMoreEeros),
    ).toBeInTheDocument();
  });

  it("should show add eeros but not remove eeros button when minimum eero is selected", () => {
    renderComponent();

    expect(
      screen.queryByText(reviewYourBasketText.removeEeros),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(reviewYourBasketText.addMoreEeros),
    ).toBeInTheDocument();
  });

  it("should not show add more eeros button when maximum eero is selected", () => {
    const premiumEero: EeroProduct = {
      code: "EERO_MESH_ROUTER_X3",
      family: "mesh_routers",
      selectionIdentifier: "3",
      price: 800,
    };

    (useJoinFlowStore as unknown as ReturnType<typeof vi.fn>).mockReturnValue({
      serviceAddress: mockServiceAddress,
      selectedPackage: mockSelectedPackage,
      eeroSelection: premiumEero,
    });
    renderComponent();

    expect(
      screen.queryByText(reviewYourBasketText.addMoreEeros),
    ).not.toBeInTheDocument();
    expect(
      screen.getByText(reviewYourBasketText.removeEeros),
    ).toBeInTheDocument();
  });
});
