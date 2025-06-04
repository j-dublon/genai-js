import { BroadbandPackage } from "@store/useJoinFlowStore";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { PackageSelectionDetails } from "./index";

const mockUseTrustpilotScore = vi.fn().mockReturnValue({
  data: null,
  loading: false,
  error: null,
});

vi.mock("./EeroImage", () => ({
  EeroImage: ({ packageName }: { packageName: string }) => (
    <div data-testid="eero-image">{packageName}</div>
  ),
}));

vi.mock("./MoreInformation", () => ({
  MoreInformation: () => (
    <div data-testid="more-information">More Information</div>
  ),
}));

vi.mock("./PackageTitle", () => ({
  PackageTitle: ({ pkg }: { pkg: BroadbandPackage }) => (
    <div data-testid="package-title">{pkg.name}</div>
  ),
}));

vi.mock("./SpeedPriceDetails", () => ({
  SpeedPriceDetails: ({
    pkg,
    promotion,
  }: {
    pkg: BroadbandPackage;
    promotion: boolean;
  }) => (
    <div data-testid="speed-price-details">
      {pkg.name} {promotion ? "with promotion" : "without promotion"}
    </div>
  ),
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
    }) => (
      <button data-testid="add-to-basket" onClick={onClick}>
        {children}
      </button>
    ),
    TextWithTickList: ({ textItems }: { textItems: string[] }) => (
      <div data-testid="tick-list">{textItems.join(", ")}</div>
    ),
    TrustpilotHorizontal: ({
      trustScore,
      numberOfReviews,
    }: {
      trustScore: number;
      numberOfReviews: number;
    }) => (
      <div data-testid="trustpilot">
        Score: {trustScore}, Reviews: {numberOfReviews}
      </div>
    ),
    useTrustpilotScore: () => mockUseTrustpilotScore(),
  };
});

describe("PackageSelectionDetails", () => {
  const mockPackage: BroadbandPackage = {
    id: "test-id",
    name: "C-500",
    speed: {
      download: 500,
      upload: 100,
    },
    price: {
      monthly: 20,
      setup: 0,
    },
    priceIncrease: {
      nextYearIncrease: 3.0,
      followingYearIncrease: 3.0,
    },
    contractLength: 24,
    description: "Test package",
  };

  const mockSpeedyPackage: BroadbandPackage = {
    id: "test-id-speed",
    name: "C-900",
    speed: {
      download: 900,
      upload: 100,
    },
    price: {
      monthly: 50,
      setup: 0,
    },
    priceIncrease: {
      nextYearIncrease: 3.0,
      followingYearIncrease: 3.0,
    },
    contractLength: 24,
    description: "Test speedy package",
  };

  const mockHandlePackageSelection = vi.fn();

  const mockToggle = {
    isOn: false,
    onChange: vi.fn(),
    leftLabel: "Left",
    rightLabel: "Right",
  };

  const mockChangePackage = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseTrustpilotScore.mockReturnValue({
      data: { trustScore: 4.5, numberOfReviews: 100 },
      loading: false,
      error: null,
    });
  });

  it("renders both desktop and mobile views", () => {
    render(
      <PackageSelectionDetails
        packageDetails={mockPackage}
        handlePackageSelection={mockHandlePackageSelection}
        topSpeedPackage={mockPackage}
        toggle={mockToggle}
        changePackage={mockChangePackage}
      />,
    );

    const desktopView = screen.getByTestId("package-selection-details-desktop");
    expect(desktopView).toBeInTheDocument();
    expect(desktopView).toHaveClass("hidden", "md:block");

    const mobileView = screen.getByTestId("package-selection-details-mobile");
    expect(mobileView).toBeInTheDocument();
    expect(mobileView).toHaveClass("md:hidden");
  });

  it("has correct mobile view styling and components", () => {
    render(
      <PackageSelectionDetails
        packageDetails={mockPackage}
        handlePackageSelection={mockHandlePackageSelection}
        topSpeedPackage={mockPackage}
        toggle={mockToggle}
        changePackage={mockChangePackage}
      />,
    );

    const mobileView = screen.getByTestId("package-selection-details-mobile");

    expect(within(mobileView).getByTestId("eero-image")).toBeInTheDocument();
    expect(within(mobileView).getByTestId("package-title")).toBeInTheDocument();
    expect(
      within(mobileView).getByTestId("speed-price-details"),
    ).toBeInTheDocument();
    expect(within(mobileView).getByTestId("add-to-basket")).toBeInTheDocument();
    expect(within(mobileView).getByTestId("tick-list")).toBeInTheDocument();
    expect(within(mobileView).getByTestId("trustpilot")).toBeInTheDocument();
    expect(
      within(mobileView).getByTestId("more-information"),
    ).toBeInTheDocument();

    expect(mobileView).toHaveClass("flex", "flex-col", "gap-6", "md:hidden");

    const imageContainer = mobileView.querySelector(
      "div.flex.sm\\:gap-6.flex-col.gap-4.sm\\:flex-row",
    );
    expect(imageContainer).toBeInTheDocument();

    const tickListContainer = imageContainer?.querySelector(
      "div.flex.flex-col.gap-4",
    );
    expect(tickListContainer).toBeInTheDocument();

    const divider = mobileView.querySelector("hr");
    expect(divider).toHaveClass("border-t-[2px]", "text-ui-grey-300", "mt-4");
  });

  it("has correct desktop view styling and components", () => {
    render(
      <PackageSelectionDetails
        packageDetails={mockPackage}
        handlePackageSelection={mockHandlePackageSelection}
        topSpeedPackage={mockPackage}
        toggle={mockToggle}
        changePackage={mockChangePackage}
      />,
    );

    const desktopView = screen.getByTestId("package-selection-details-desktop");

    expect(desktopView).toHaveClass("hidden", "md:block");

    const mainContainer = desktopView.querySelector("div.flex.gap-10");
    expect(mainContainer).toBeInTheDocument();

    const columns = mainContainer?.querySelectorAll(
      "div.flex.flex-col.gap-12.w-1\\/2",
    );
    expect(columns).toHaveLength(2);

    const leftColumn = columns?.[0];
    expect(
      within(leftColumn as HTMLElement).getByTestId("eero-image"),
    ).toBeInTheDocument();
    expect(
      within(leftColumn as HTMLElement).getByTestId("speed-price-details"),
    ).toBeInTheDocument();

    const rightColumn = columns?.[1];
    expect(
      within(rightColumn as HTMLElement).getByTestId("package-title"),
    ).toBeInTheDocument();
    expect(
      within(rightColumn as HTMLElement).getByTestId("add-to-basket"),
    ).toBeInTheDocument();
    expect(
      within(rightColumn as HTMLElement).getByTestId("tick-list"),
    ).toBeInTheDocument();
    expect(
      within(rightColumn as HTMLElement).getByTestId("trustpilot"),
    ).toBeInTheDocument();

    const divider = desktopView.querySelector("hr");
    expect(divider).toHaveClass("border-t-[2px]", "text-ui-grey-300", "my-16");
  });

  it("handles package selection when clicking the button", () => {
    render(
      <PackageSelectionDetails
        packageDetails={mockPackage}
        handlePackageSelection={mockHandlePackageSelection}
        topSpeedPackage={mockPackage}
        toggle={mockToggle}
        changePackage={mockChangePackage}
      />,
    );

    const desktopView = screen.getByTestId("package-selection-details-desktop");
    const desktopButton = within(desktopView).getByTestId("add-to-basket");
    desktopButton.click();

    expect(mockHandlePackageSelection).toHaveBeenCalledWith(mockPackage.id);

    const mobileView = screen.getByTestId("package-selection-details-mobile");
    const mobileButton = within(mobileView).getByTestId("add-to-basket");
    mobileButton.click();

    expect(mockHandlePackageSelection).toHaveBeenCalledWith(mockPackage.id);
    expect(mockHandlePackageSelection).toHaveBeenCalledTimes(2);
  });

  it("renders without Trustpilot when no rating is available", () => {
    mockUseTrustpilotScore.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(
      <PackageSelectionDetails
        packageDetails={mockPackage}
        handlePackageSelection={mockHandlePackageSelection}
        topSpeedPackage={mockPackage}
        toggle={mockToggle}
        changePackage={mockChangePackage}
      />,
    );

    expect(screen.queryByTestId("trustpilot")).not.toBeInTheDocument();
  });

  it("shows the upgrade offer when the top speed package is different from the selected package", () => {
    render(
      <PackageSelectionDetails
        packageDetails={mockPackage}
        handlePackageSelection={mockHandlePackageSelection}
        topSpeedPackage={mockSpeedyPackage}
        toggle={mockToggle}
        changePackage={mockChangePackage}
      />,
    );

    const desktopView = screen.getByTestId("package-selection-details-desktop");
    const desktopUpgradeOffer =
      within(desktopView).getByTestId("upgrade-offer");
    expect(desktopUpgradeOffer).toBeInTheDocument();

    const mobileView = screen.getByTestId("package-selection-details-mobile");
    const mobileUpgradeOffer = within(mobileView).getByTestId("upgrade-offer");
    expect(mobileUpgradeOffer).toBeInTheDocument();

    const upgradeButton = within(mobileUpgradeOffer).getByText("Upgrade me");
    expect(upgradeButton).toBeInTheDocument();

    upgradeButton.click();

    expect(mockChangePackage).toHaveBeenCalledWith(mockSpeedyPackage);
  });
});
