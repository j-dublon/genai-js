import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

import { PackageSelectionDetails } from "./index";

const mockUseTrustpilotScore = vi.fn().mockReturnValue({
  data: null,
  loading: false,
  error: null,
});

vi.mock("./EeroImage", () => ({
  EeroImage: ({ packageSpeed }: { packageSpeed: number }) => (
    <div data-testid="eero-image">{packageSpeed}</div>
  ),
}));

vi.mock("./MoreInformation", () => ({
  MoreInformation: () => (
    <div data-testid="more-information">More Information</div>
  ),
}));

vi.mock("./PackageTitle", () => ({
  PackageTitle: ({ pkg }: { pkg: StoreSelectedPackage }) => (
    <div data-testid="package-title">{pkg.speeds.download}Mbps</div>
  ),
}));

vi.mock("./SpeedPriceDetails", () => ({
  SpeedPriceDetails: ({
    pkg,
    promotion,
  }: {
    pkg: StoreSelectedPackage;
    promotion: boolean;
  }) => (
    <div data-testid="speed-price-details">
      {pkg.speeds.download}Mbps{" "}
      {promotion ? "with promotion" : "without promotion"}
    </div>
  ),
}));

vi.mock("./UpgradeOffer", () => ({
  UpgradeOffer: ({
    topSpeedPackage,
    handlePackageSelection,
  }: {
    topSpeedPackage: StoreSelectedPackage | null;
    handlePackageSelection: (pkg: StoreSelectedPackage) => void;
  }) => (
    <div data-testid="upgrade-offer">
      <button
        onClick={() =>
          topSpeedPackage && handlePackageSelection(topSpeedPackage)
        }
      >
        Upgrade me
      </button>
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
  const mockPackage: StoreSelectedPackage = {
    krakenProductCode: "BT-500-24M_20",
    frontendIdentifier: "500-24",
    frontendTitle: "C-500",
    termMonths: 24,
    selectionIdentifier: "1",
    installationRequired: true,
    appliedPromotionUUIDs: [],
    prices: {
      basePrice: 2000,
      discountedPrice: 2000,
      annualPriceRise: [
        {
          price: 2300,
          date: "2026-04-01T12:00:00.000Z",
          id: "rise-1",
        },
      ],
    },
    speeds: {
      download: 500,
      upload: 100,
    },
    extras: null,
    offers: null,
    id: "test-id",
  };

  const mockSpeedyPackage: StoreSelectedPackage = {
    krakenProductCode: "BT-900-24M_50",
    frontendIdentifier: "900-24",
    frontendTitle: "C-150",
    termMonths: 24,
    selectionIdentifier: "2",
    installationRequired: true,
    appliedPromotionUUIDs: [],
    prices: {
      basePrice: 5000,
      discountedPrice: 5000,
      annualPriceRise: [
        {
          price: 5300,
          date: "2026-04-01T12:00:00.000Z",
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
    id: "test-id-speed",
  };

  const mockHandlePackageSelection = vi.fn();

  const mockToggle = {
    isOn: false,
    onChange: vi.fn(),
    leftLabel: "Left",
    rightLabel: "Right",
  };

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
        hasOnlyOneContractLengthAvailable={false}
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
        hasOnlyOneContractLengthAvailable={false}
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
        hasOnlyOneContractLengthAvailable={false}
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
        hasOnlyOneContractLengthAvailable={false}
      />,
    );

    const desktopView = screen.getByTestId("package-selection-details-desktop");
    const desktopButton = within(desktopView).getByTestId("add-to-basket");
    desktopButton.click();

    expect(mockHandlePackageSelection).toHaveBeenCalledWith(mockPackage);

    const mobileView = screen.getByTestId("package-selection-details-mobile");
    const mobileButton = within(mobileView).getByTestId("add-to-basket");
    mobileButton.click();

    expect(mockHandlePackageSelection).toHaveBeenCalledWith(mockPackage);
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
        hasOnlyOneContractLengthAvailable={false}
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
        hasOnlyOneContractLengthAvailable={false}
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

    expect(mockHandlePackageSelection).toHaveBeenCalledWith(mockSpeedyPackage);
  });

  it("passes correct packageSpeed to EeroImage", () => {
    render(
      <PackageSelectionDetails
        packageDetails={mockPackage}
        handlePackageSelection={mockHandlePackageSelection}
        topSpeedPackage={mockPackage}
        toggle={mockToggle}
        hasOnlyOneContractLengthAvailable={false}
      />,
    );

    const eeroImages = screen.getAllByTestId("eero-image");
    eeroImages.forEach((image) => {
      expect(image).toHaveTextContent("500");
    });
  });

  it("does not show promotion for non-high speed packages", () => {
    render(
      <PackageSelectionDetails
        packageDetails={mockPackage}
        handlePackageSelection={mockHandlePackageSelection}
        topSpeedPackage={mockPackage}
        toggle={mockToggle}
        hasOnlyOneContractLengthAvailable={false}
      />,
    );

    const speedPriceDetails = screen.getAllByTestId("speed-price-details");
    speedPriceDetails.forEach((detail) => {
      expect(detail).toHaveTextContent("without promotion");
    });
  });
});
