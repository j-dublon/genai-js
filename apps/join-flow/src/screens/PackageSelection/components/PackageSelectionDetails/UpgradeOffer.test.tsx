import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { BroadbandPackage } from "@/store/useJoinFlowStore";

import { upgradeOfferText } from "./PackageSelectionDetailsProps";
import { UpgradeOffer } from "./UpgradeOffer";

const mockTopSpeedPackage: BroadbandPackage = {
  id: "test-package",
  name: "Test Package",
  description: "Test package description",
  contractLength: 12,
  speed: {
    download: 900,
    upload: 100,
  },
  price: {
    monthly: 45,
    setup: 0,
  },
  priceIncrease: {
    nextYearIncrease: 5,
    followingYearIncrease: 3,
  },
};

const mockToggle = {
  isOn: false,
  onChange: vi.fn(),
  leftLabel: "12",
  rightLabel: "24",
};

const mockSetShowUpgradeOffer = vi.fn();
const mockChangePackage = vi.fn();
const mockScrollToTop = vi.fn();

vi.mock("@/hooks/useScrollToElement", () => ({
  useScrollToElement: () => mockScrollToTop,
}));

describe("UpgradeOffer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should not render when topSpeedPackage is null", () => {
    render(
      <UpgradeOffer
        topSpeedPackage={null}
        toggle={mockToggle}
        offer={true}
        priceDifference={10}
        setShowUpgradeOffer={mockSetShowUpgradeOffer}
        changePackage={mockChangePackage}
      />,
    );

    expect(screen.queryByTestId("upgrade-offer")).not.toBeInTheDocument();
  });

  it("should not render when priceDifference is 0 or negative", () => {
    render(
      <UpgradeOffer
        topSpeedPackage={mockTopSpeedPackage}
        toggle={mockToggle}
        offer={true}
        priceDifference={0}
        setShowUpgradeOffer={mockSetShowUpgradeOffer}
        changePackage={mockChangePackage}
      />,
    );

    expect(screen.queryByTestId("upgrade-offer")).not.toBeInTheDocument();

    render(
      <UpgradeOffer
        topSpeedPackage={mockTopSpeedPackage}
        toggle={mockToggle}
        offer={true}
        priceDifference={-5}
        setShowUpgradeOffer={mockSetShowUpgradeOffer}
        changePackage={mockChangePackage}
      />,
    );

    expect(screen.queryByTestId("upgrade-offer")).not.toBeInTheDocument();
  });

  it("should render with correct package information", () => {
    const mockPriceDifference = 10;
    render(
      <UpgradeOffer
        topSpeedPackage={mockTopSpeedPackage}
        toggle={mockToggle}
        offer={true}
        priceDifference={mockPriceDifference}
        setShowUpgradeOffer={mockSetShowUpgradeOffer}
        changePackage={mockChangePackage}
      />,
    );

    expect(screen.getByTestId("upgrade-offer")).toBeInTheDocument();
    expect(
      screen.getByText(
        new RegExp(`For just £${mockPriceDifference} more per month`),
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(new RegExp(`${mockTopSpeedPackage.speed.download}Mbps`)),
    ).toBeInTheDocument();
  });

  it("should handle toggle changes correctly", () => {
    render(
      <UpgradeOffer
        topSpeedPackage={mockTopSpeedPackage}
        toggle={mockToggle}
        offer={true}
        priceDifference={10}
        setShowUpgradeOffer={mockSetShowUpgradeOffer}
        changePackage={mockChangePackage}
      />,
    );

    const dropdown = screen.getByRole("button", {
      name: "Dropdown menu pill with the text 12",
    });
    fireEvent.click(dropdown);

    const annualOption = screen.getByText("24");
    fireEvent.click(annualOption);

    expect(mockToggle.onChange).toHaveBeenCalledWith(true);
  });

  it("should display correct pricing information", () => {
    render(
      <UpgradeOffer
        topSpeedPackage={mockTopSpeedPackage}
        toggle={mockToggle}
        offer={true}
        priceDifference={10}
        setShowUpgradeOffer={mockSetShowUpgradeOffer}
        changePackage={mockChangePackage}
      />,
    );

    expect(screen.getByTestId("monthly-price")).toHaveTextContent("£45/month");
    expect(screen.getByTestId("next-year-price")).toHaveTextContent(
      "£50/month",
    );
    expect(screen.getByTestId("following-year-price")).toHaveTextContent(
      "£53/month",
    );
  });

  it("should handle 'No thanks' button click", () => {
    render(
      <UpgradeOffer
        topSpeedPackage={mockTopSpeedPackage}
        toggle={mockToggle}
        offer={true}
        priceDifference={10}
        setShowUpgradeOffer={mockSetShowUpgradeOffer}
        changePackage={mockChangePackage}
      />,
    );

    const noThanksButton = screen.getByText(upgradeOfferText.hideOfferButton);
    fireEvent.click(noThanksButton);

    expect(mockSetShowUpgradeOffer).toHaveBeenCalledWith(false);
  });

  it("should handle 'Upgrade me' button click", () => {
    render(
      <UpgradeOffer
        topSpeedPackage={mockTopSpeedPackage}
        toggle={mockToggle}
        offer={true}
        priceDifference={10}
        setShowUpgradeOffer={mockSetShowUpgradeOffer}
        changePackage={mockChangePackage}
      />,
    );

    const upgradeButton = screen.getByText(upgradeOfferText.upgradeButton);
    fireEvent.click(upgradeButton);

    expect(mockChangePackage).toHaveBeenCalledWith(mockTopSpeedPackage);
    expect(mockScrollToTop).toHaveBeenCalled();
  });

  it("should show offer text when offer prop is true", () => {
    render(
      <UpgradeOffer
        topSpeedPackage={mockTopSpeedPackage}
        toggle={mockToggle}
        offer={true}
        priceDifference={10}
        setShowUpgradeOffer={mockSetShowUpgradeOffer}
        changePackage={mockChangePackage}
      />,
    );

    expect(screen.getByTestId("upgrade-offer-subtitle")).toBeInTheDocument();
  });

  it("should not show offer text when offer prop is false", () => {
    render(
      <UpgradeOffer
        topSpeedPackage={mockTopSpeedPackage}
        toggle={mockToggle}
        offer={false}
        priceDifference={10}
        setShowUpgradeOffer={mockSetShowUpgradeOffer}
        changePackage={mockChangePackage}
      />,
    );

    expect(
      screen.queryByTestId("upgrade-offer-subtitle"),
    ).not.toBeInTheDocument();
  });
});
