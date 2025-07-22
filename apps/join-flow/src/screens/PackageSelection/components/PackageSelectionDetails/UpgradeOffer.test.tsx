import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

import { upgradeOfferText } from "./PackageSelectionDetailsProps";
import { UpgradeOffer } from "./UpgradeOffer";

const mockTopSpeedPackage: StoreSelectedPackage = {
  krakenProductCode: "BT-900-24M_45",
  frontendIdentifier: "900-24",
  frontendTitle: "C-900",
  termMonths: 24,
  selectionIdentifier: "2",
  installationRequired: true,
  appliedPromotionUUIDs: [],
  prices: {
    basePrice: 4500,
    discountedPrice: 4500,
    annualPriceRise: [
      {
        price: 5000,
        date: "2027-04-01T12:00:00.000Z",
        id: "rise-1",
      },
      {
        price: 5300,
        date: "2028-04-01T12:00:00.000Z",
        id: "rise-2",
      },
    ],
  },
  speeds: {
    download: 900,
    upload: 100,
  },
  extras: null,
  offers: null,
  id: "test-package",
};

const mockToggle = {
  isOn: false,
  onChange: vi.fn(),
  leftLabel: "12",
  rightLabel: "24",
};

const mockHandlePackageSelection = vi.fn();

vi.mock("@/hooks/usePricingCalculations", () => ({
  usePricingCalculations: (topSpeedPackage: StoreSelectedPackage | null) => {
    if (!topSpeedPackage) {
      return {
        monthlyPackagePrice: 0,
        nextPrice: 0,
        followingPrice: 0,
        monthlyEeroPrice: 0,
        monthlyTotal: 0,
        predictedTotalNext: 0,
        predictedTotalfollowing: 0,
        packageName: "",
      };
    }

    const monthlyPackagePrice = topSpeedPackage.prices.basePrice / 100;
    const nextPrice = topSpeedPackage.prices.annualPriceRise?.[0]?.price
      ? topSpeedPackage.prices.annualPriceRise[0].price / 100
      : monthlyPackagePrice;
    const followingPrice = topSpeedPackage.prices.annualPriceRise?.[1]?.price
      ? topSpeedPackage.prices.annualPriceRise[1].price / 100
      : nextPrice;

    return {
      monthlyPackagePrice,
      nextPrice,
      followingPrice,
      monthlyEeroPrice: 0,
      monthlyTotal: monthlyPackagePrice,
      predictedTotalNext: nextPrice,
      predictedTotalfollowing: followingPrice,
      packageName: `${topSpeedPackage.speeds.download}Mbps`,
    };
  },
}));

vi.mock("@react-component-library/ui", async () => {
  const actual = await vi.importActual("@react-component-library/ui");
  return {
    ...actual,
    Button: ({
      children,
      onClick,
    }: {
      children: React.ReactNode;
      onClick: () => void;
    }) => <button onClick={onClick}>{children}</button>,
    DropdownPill: ({
      value,
      setValue,
      options,
      setIsOpen,
    }: {
      value: string;
      setValue: (value: string) => void;
      options: string[];
      setIsOpen: (open: boolean) => void;
    }) => (
      <div>
        <button
          role="button"
          aria-label={`Dropdown menu pill with the text ${value}`}
          onClick={() => setIsOpen(true)}
        >
          {value}
        </button>
        {options.map((option) => (
          <button key={option} onClick={() => setValue(option)}>
            {option}
          </button>
        ))}
      </div>
    ),
  };
});

describe("UpgradeOffer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not render when priceDifference is 0 or negative", () => {
    render(
      <UpgradeOffer
        topSpeedPackage={mockTopSpeedPackage}
        toggle={mockToggle}
        hasOnlyOneContractLengthAvailable={false}
        priceDifference={0}
        handlePackageSelection={mockHandlePackageSelection}
      />,
    );

    expect(screen.queryByTestId("upgrade-offer")).not.toBeInTheDocument();

    render(
      <UpgradeOffer
        topSpeedPackage={mockTopSpeedPackage}
        toggle={mockToggle}
        hasOnlyOneContractLengthAvailable={false}
        priceDifference={-5}
        handlePackageSelection={mockHandlePackageSelection}
      />,
    );

    expect(screen.queryByTestId("upgrade-offer")).not.toBeInTheDocument();
  });

  it("should render with correct package information", () => {
    const mockPriceDifference = 1000;
    render(
      <UpgradeOffer
        topSpeedPackage={mockTopSpeedPackage}
        toggle={mockToggle}
        hasOnlyOneContractLengthAvailable={false}
        priceDifference={mockPriceDifference}
        handlePackageSelection={mockHandlePackageSelection}
      />,
    );

    expect(screen.getByTestId("upgrade-offer")).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`For just £10 more per month`)),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`${mockTopSpeedPackage.speeds.download}Mbps`),
      ),
    ).toBeInTheDocument();
  });

  it("should handle toggle changes correctly", () => {
    render(
      <UpgradeOffer
        topSpeedPackage={mockTopSpeedPackage}
        toggle={mockToggle}
        hasOnlyOneContractLengthAvailable={false}
        priceDifference={10}
        handlePackageSelection={mockHandlePackageSelection}
      />,
    );

    const dropdown = screen.getByRole("button", {
      name: "Dropdown menu pill with the text 12",
    });
    fireEvent.click(dropdown);

    const annualOption = screen.getByText(24);
    fireEvent.click(annualOption);

    expect(mockToggle.onChange).toHaveBeenCalledWith(true);
  });

  it("should display correct pricing information", () => {
    render(
      <UpgradeOffer
        topSpeedPackage={mockTopSpeedPackage}
        toggle={mockToggle}
        hasOnlyOneContractLengthAvailable={false}
        priceDifference={10}
        handlePackageSelection={mockHandlePackageSelection}
      />,
    );

    expect(screen.getByTestId("monthly-price")).toHaveTextContent("£45/month");
    expect(screen.getByTestId("next-price")).toHaveTextContent("£50/month");
    expect(screen.getByTestId("following-price")).toHaveTextContent(
      "£53/month",
    );
  });

  it("should handle 'Upgrade me' button click", () => {
    render(
      <UpgradeOffer
        topSpeedPackage={mockTopSpeedPackage}
        toggle={mockToggle}
        hasOnlyOneContractLengthAvailable={false}
        priceDifference={10}
        handlePackageSelection={mockHandlePackageSelection}
      />,
    );

    const upgradeButton = screen.getByText(upgradeOfferText.upgradeButton);
    fireEvent.click(upgradeButton);

    expect(mockHandlePackageSelection).toHaveBeenCalledWith(
      mockTopSpeedPackage,
    );
  });

  it("should handle missing price rises", () => {
    const packageWithoutRises: StoreSelectedPackage = {
      ...mockTopSpeedPackage,
      prices: {
        ...mockTopSpeedPackage.prices,
        annualPriceRise: null,
      },
    };

    render(
      <UpgradeOffer
        topSpeedPackage={packageWithoutRises}
        toggle={mockToggle}
        hasOnlyOneContractLengthAvailable={false}
        priceDifference={10}
        handlePackageSelection={mockHandlePackageSelection}
      />,
    );

    expect(screen.getByTestId("monthly-price")).toHaveTextContent("£45/month");
    expect(screen.getByTestId("next-price")).toHaveTextContent("£45/month");
    expect(screen.getByTestId("following-price")).toHaveTextContent(
      "£45/month",
    );
  });
});
