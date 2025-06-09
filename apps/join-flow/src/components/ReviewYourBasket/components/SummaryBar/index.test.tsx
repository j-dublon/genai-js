import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

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

vi.mock("@/components/ReviewYourBasket/ReviewYourBasketProps", () => ({
  reviewYourBasketText: {
    eeroImage: "/mock-eero-image.png",
    biDirectionalImage: "/mock-bidirectional-image.png",
  },
}));

describe("SummaryBar", () => {
  const mockSelectedPackage: StoreSelectedPackage = {
    krakenProductCode: "BT-150-12M_38",
    frontendIdentifier: "150-12",
    termMonths: "12",
    selectionIdentifier: "0",
    installationRequired: true,
    appliedPromotionUUIDs: [],
    prices: {
      basePrice: 3999,
      discountedPrice: 3999,
      annualPriceRise: [
        {
          price: 4499,
          date: "2026-04-01T12:00:00.000Z",
          id: "test-rise-1",
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

  const mockProps = {
    selectedPackage: mockSelectedPackage,
    isDialogOpen: false,
    predictedTotalNext: 45,
    openDialog: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders fallback UI when no package is selected", () => {
    render(<SummaryBar {...mockProps} selectedPackage={null} />);

    expect(
      screen.getByText("Oops, have you selected a package?"),
    ).toBeInTheDocument();
  });

  it("renders package details when a package is selected", () => {
    render(<SummaryBar {...mockProps} />);

    expect(screen.getByText(/150Mbps/)).toBeInTheDocument();
    expect(screen.getByText(/Full fibre broadband/)).toBeInTheDocument();
    expect(
      screen.getByText(/150 upload and download speed/),
    ).toBeInTheDocument();

    expect(screen.getByText(/12\/month/)).toBeInTheDocument();
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

  it("does not display View Basket button when dialog is open", () => {
    render(<SummaryBar {...mockProps} isDialogOpen={true} />);

    expect(screen.queryByText("View Basket")).not.toBeInTheDocument();
  });

  it("displays correct package information from StoreSelectedPackage", () => {
    const customPackage: StoreSelectedPackage = {
      ...mockSelectedPackage,
      speeds: {
        download: 300,
        upload: 50,
      },
      termMonths: "24",
      prices: {
        basePrice: 4500,
        discountedPrice: 4500,
        annualPriceRise: null,
      },
    };

    render(
      <SummaryBar
        {...mockProps}
        selectedPackage={customPackage}
        predictedTotalNext={48}
      />,
    );

    expect(screen.getByText(/300Mbps/)).toBeInTheDocument();
    expect(
      screen.getByText(/300 upload and download speed/),
    ).toBeInTheDocument();

    expect(screen.getByText(/24\/month/)).toBeInTheDocument();
    expect(screen.getByText(/£45/)).toBeInTheDocument();
  });

  it("handles price conversion correctly", () => {
    const packageWithOddPrice: StoreSelectedPackage = {
      ...mockSelectedPackage,
      prices: {
        basePrice: 3300,
        discountedPrice: 3300,
        annualPriceRise: null,
      },
    };

    render(<SummaryBar {...mockProps} selectedPackage={packageWithOddPrice} />);

    expect(screen.getByText(/£33/)).toBeInTheDocument();
  });
});
