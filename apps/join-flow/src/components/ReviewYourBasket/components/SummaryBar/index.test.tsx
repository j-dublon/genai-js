import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

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
    opacity,
  }: {
    width: number;
    height: number;
    opacity: string;
  }) => (
    <div data-testid="chevron-icon" style={{ width, height, opacity }}>
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
  const mockSelectedPackage = {
    id: "standard",
    price: {
      monthly: 39.99,
    },
    speed: {
      download: 100,
    },
    priceIncrease: {
      nextYearIncrease: 5,
      followingYearIncrease: 3,
    },
  };

  const mockProps = {
    selectedPackage: mockSelectedPackage,
    isDialogOpen: false,
    predictedTotalNextYear: 44.99,
    openDialog: vi.fn(),
  };

  it("renders fallback UI when no package is selected", () => {
    render(<SummaryBar {...mockProps} selectedPackage={null} />);

    expect(
      screen.getByText("Oops, have you selected a package?"),
    ).toBeInTheDocument();
  });

  it("renders package details when a package is selected", () => {
    render(<SummaryBar {...mockProps} />);

    expect(screen.getByText(/Standard/)).toBeInTheDocument();
    expect(screen.getByText(/Full fibre broadband/)).toBeInTheDocument();

    expect(screen.getByText(/£39.99/)).toBeInTheDocument();
    expect(
      screen.getByText(/£44.99\/month from April 2026/),
    ).toBeInTheDocument();
  });

  it("calls openDialog when View Basket button is clicked", () => {
    render(<SummaryBar {...mockProps} />);

    const button = screen.getByTestId("button");
    fireEvent.click(button);

    expect(mockProps.openDialog).toHaveBeenCalledTimes(1);
  });

  it("calls openDialog when ChevronVerticalWithCircle icon is clicked on mobile", () => {
    render(<SummaryBar {...mockProps} />);

    const chevronIcon = screen.getAllByTestId("chevron-icon")[1];
    fireEvent.click(chevronIcon);

    expect(mockProps.openDialog).toHaveBeenCalledTimes(1);
  });

  it("does not display View Basket button when dialog is open", () => {
    render(<SummaryBar {...mockProps} isDialogOpen={true} />);

    expect(screen.queryByText("View Basket")).not.toBeInTheDocument();
  });
});
