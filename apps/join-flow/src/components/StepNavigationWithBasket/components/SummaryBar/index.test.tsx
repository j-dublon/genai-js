import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { usePricingCalculations } from "@/hooks/usePricingCalculations";
import useJoinFlowStore, {
  StoreSelectedPackage,
} from "@/store/useJoinFlowStore";

import { SummaryBar } from "./index";

vi.mock("@react-component-library/ui", () => ({
  Button: ({
    children,
    onClick,
  }: {
    children: React.ReactNode;
    onClick?: () => void;
  }) => (
    <button onClick={onClick} data-testid="button">
      {children}
    </button>
  ),
}));

vi.mock("@react-component-library/ui/icons", () => ({
  ChevronVerticalWithCircle: ({
    width,
    height,
    borderColor,
  }: {
    width: number;
    height: number;
    borderColor: string;
  }) => (
    <div
      data-testid="chevron-icon"
      style={{ width, height }}
      data-border-color={borderColor}
    >
      Icon
    </div>
  ),
}));

vi.mock("./summaryBarProps", () => ({
  summaryBarProps: {
    eeroImage: "/mock-eero-image.png",
    biDirectionalImage: "/mock-bidirectional-image.png",
  },
}));

vi.mock("@/store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));
const mockUseJoinFlowStore = vi.mocked(useJoinFlowStore);

vi.mock("@/hooks/usePricingCalculations", () => ({
  usePricingCalculations: vi.fn(),
}));
const mockUsePricingCalculations = vi.mocked(usePricingCalculations);

describe("SummaryBar", () => {
  const mockSelectedPackage: StoreSelectedPackage = {
    krakenProductCode: "BT-150-12M_38",
    frontendIdentifier: "150-12",
    termMonths: 12,
    frontendTitle: "C-150",
    selectionIdentifier: "0",
    installationRequired: true,
    appliedPromotionUUIDs: [],
    prices: {
      broadband: {
        basePrice: 3999,
        discount: 0,
        customerPriceIncDiscount: 3999,
        annualPriceRise: [
          {
            price: 4499,
            date: "2026-04-01T12:00:00.000Z",
            id: "test-rise-1",
          },
        ],
      },
    },
    speeds: {
      download: 150,
      upload: 30,
    },
    availableExtras: null,
    offers: null,
    id: "test-pkg-id",
  };

  const mockProps = {
    isDialogOpen: false,
    openDialog: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseJoinFlowStore.mockReturnValue({
      selectedPackage: mockSelectedPackage,
      eeroSelection: null,
    });
    mockUsePricingCalculations.mockReturnValue({
      discountedPrice: "39",
      monthlyPackagePrice: "42",
      nextPrice: "45",
      followingPrice: "48",
      monthlySaving: "3",
      totalPlanSaving: "3",
      monthlyEeroPrice: "0",
      monthlyTotal: "42",
      discountedMonthlyTotal: "39",
      predictedTotalNext: "45",
      predictedTotalFollowing: "48",
      packageName: "150Mbps",
      nextPriceRiseAmount: "3",
      followingPriceRiseAmount: "3",
    });
  });

  it("renders null when no package is selected", () => {
    mockUseJoinFlowStore.mockReturnValue({
      selectedPackage: null,
      eeroSelection: null,
    });

    render(<SummaryBar {...mockProps} />);

    expect(screen.queryByTestId("summary-bar")).toBeNull();
  });

  it("renders package details when a package is selected", () => {
    render(<SummaryBar {...mockProps} />);

    expect(
      screen.getByText(mockSelectedPackage.frontendIdentifier),
    ).toBeInTheDocument();
    expect(screen.getByText(/Full fibre broadband/)).toBeInTheDocument();
    expect(
      screen.getByText(/150Mbps upload & download speed/),
    ).toBeInTheDocument();

    expect(screen.getByText(/12\-month/)).toBeInTheDocument();
    expect(screen.getByText(/£39/)).toBeInTheDocument();

    const monthlyElements = screen.getAllByText(/\/month/);
    expect(monthlyElements.length).toBeGreaterThan(0);
    expect(screen.getByText(/£45\/month from April 2026/)).toBeInTheDocument();
  });

  it("calls openDialog when View Basket button is clicked", () => {
    render(<SummaryBar {...mockProps} />);

    const button = screen.getByTestId("button");
    fireEvent.click(button);

    expect(mockProps.openDialog).toHaveBeenCalledTimes(1);
  });

  it("calls openDialog when ChevronVerticalWithCircle icon is clicked on mobile", () => {
    render(<SummaryBar {...mockProps} />);

    const chevronIcons = screen.getAllByTestId("chevron-icon");

    expect(chevronIcons).toHaveLength(2);

    const mobileChevronParent = chevronIcons[1].parentElement;
    fireEvent.click(mobileChevronParent!);

    expect(mockProps.openDialog).toHaveBeenCalledTimes(1);
  });

  it("hides SummaryBar when dialog is open", () => {
    render(<SummaryBar {...mockProps} isDialogOpen={true} />);

    expect(screen.queryByTestId("summary-bar")).toHaveClass("hidden");
  });

  it("displays correct package information from StoreSelectedPackage", () => {
    const customPackage: StoreSelectedPackage = {
      ...mockSelectedPackage,
      speeds: {
        download: 300,
        upload: 50,
      },
      termMonths: 24,
      prices: {
        broadband: {
          basePrice: 4500,
          discount: 0,
          customerPriceIncDiscount: 4500,
          annualPriceRise: null,
        },
      },
    };
    mockUseJoinFlowStore.mockReturnValue({
      selectedPackage: customPackage,
      eeroSelection: null,
    });

    render(<SummaryBar {...mockProps} />);

    expect(
      screen.getByText(customPackage.frontendIdentifier),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/300Mbps upload & download speed/),
    ).toBeInTheDocument();

    expect(screen.getByText(/24\-month/)).toBeInTheDocument();
    expect(screen.getByText(/£45/)).toBeInTheDocument();
  });
});
