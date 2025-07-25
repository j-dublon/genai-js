import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { convertPenceToPounds } from "@/hooks/usePricingCalculations";
import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

import { PackageInfo } from "./PackageInfo";

vi.mock("@/hooks/useLoadingModal", () => ({
  useLoadingModal: vi.fn().mockReturnValue({
    loadingModalRef: vi.fn(),
    slidesWithAssetPath: [
      {
        src: "/images/world-animated.gif",
        message: "Sit tight! We're checking out your area",
      },
    ],
  }),
}));

describe("PackageInfo", () => {
  const mockOnPlanChange = vi.fn();

  const mockSelectedPackage: StoreSelectedPackage = {
    krakenProductCode: "BT-150-12M_38",
    frontendIdentifier: "150-12",
    frontendTitle: "C-150",
    termMonths: 12,
    selectionIdentifier: "0",
    installationRequired: true,
    appliedPromotionUUIDs: [],
    prices: {
      broadbandAndCurrentExtras: {
        basePrice: 3200,
        discount: 0,
        customerPriceIncDiscount: 3200,
        annualPriceRise: [
          {
            price: 3500,
            date: "2026-04-01T12:00:00.000Z",
            id: "test-rise-1",
          },
        ],
      },
      currentExtras: {
        basePrice: 0,
        discount: 0,
        customerPriceIncDiscount: 0,
      },
      broadband: {
        basePrice: 3200,
        discount: 0,
        customerPriceIncDiscount: 3200,
        annualPriceRise: [
          {
            price: 3500,
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

  const mockAvailablePackages: StoreSelectedPackage[] = [
    mockSelectedPackage,
    {
      krakenProductCode: "BT-300-12M_38",
      frontendIdentifier: "300-12",
      frontendTitle: "C-300",
      termMonths: 12,
      selectionIdentifier: "1",
      installationRequired: true,
      appliedPromotionUUIDs: [],
      prices: {
        broadbandAndCurrentExtras: {
          basePrice: 3800,
          discount: 0,
          customerPriceIncDiscount: 3800,
          annualPriceRise: [
            {
              price: 4200,
              date: "2026-04-01T12:00:00.000Z",
              id: "test-rise-2",
            },
          ],
        },
        currentExtras: {
          basePrice: 0,
          discount: 0,
          customerPriceIncDiscount: 0,
        },
        broadband: {
          basePrice: 3800,
          discount: 0,
          customerPriceIncDiscount: 3800,
          annualPriceRise: [
            {
              price: 4200,
              date: "2026-04-01T12:00:00.000Z",
              id: "test-rise-2",
            },
          ],
        },
      },
      speeds: {
        download: 300,
        upload: 50,
      },
      availableExtras: null,
      offers: null,
      id: "test-pkg-2-id",
    },
  ];

  const mockChangePlanButtonText = "Change Plan!";
  const mockBroadbandPlanText = "Amazing Broadband Plan";
  const mockPlanDescriptionText = "Magical Full Fiber";

  const defaultProps = {
    availablePackages: mockAvailablePackages,
    onPlanChange: mockOnPlanChange,
    selectedPackage: mockSelectedPackage,
    changePlanButtonText: mockChangePlanButtonText,
    broadbandPlanText: mockBroadbandPlanText,
    planDescriptionText: mockPlanDescriptionText,
    setBasketIsLoading: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("should render the package info correctly", () => {
    render(<PackageInfo {...defaultProps} />);

    expect(screen.getByText(mockBroadbandPlanText)).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockSelectedPackage.frontendIdentifier} ${mockPlanDescriptionText}`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(
        `${mockSelectedPackage.speeds.download}Mbps download speed`,
      ),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockSelectedPackage.speeds.upload}Mbps upload speed`),
    ).toBeInTheDocument();
    expect(
      screen.getByText(`${mockSelectedPackage.termMonths} months`),
    ).toBeInTheDocument();
    expect(screen.getByText(mockChangePlanButtonText)).toBeInTheDocument();
  });

  it("should show the plan options when change plan is clicked", async () => {
    render(<PackageInfo {...defaultProps} />);
    const user = userEvent.setup();

    const changePlanButton = screen.getByText(mockChangePlanButtonText);
    await user.click(changePlanButton);

    const dropdownOptions = screen.getByTestId("dropdown-options");
    const expected = `${mockAvailablePackages[1].speeds.download}Mbps - £${convertPenceToPounds(mockAvailablePackages[1].prices.broadbandAndCurrentExtras.basePrice)}/month - ${mockAvailablePackages[1].termMonths} months`;
    expect(dropdownOptions.children[1].textContent).toBe(expected);
  });

  it("should call onPlanChange and close the dropdown on submit", async () => {
    render(<PackageInfo {...defaultProps} />);
    const user = userEvent.setup();

    await user.click(screen.getByText(mockChangePlanButtonText));
    const dropdownOptions = screen.getByTestId("dropdown-options");
    await user.click(dropdownOptions.children[1]);

    expect(mockOnPlanChange).toHaveBeenCalledWith(
      mockAvailablePackages[1].frontendIdentifier,
    );
    expect(screen.queryByTestId("dropdown-options")).not.toBeInTheDocument();
  });

  it("should set loading state when updating basket", async () => {
    render(<PackageInfo {...defaultProps} />);
    const user = userEvent.setup();

    await user.click(screen.getByText(mockChangePlanButtonText));
    const dropdownOptions = screen.getByTestId("dropdown-options");
    await user.click(dropdownOptions.children[1]);

    expect(defaultProps.setBasketIsLoading).toHaveBeenCalledWith(true);

    await waitFor(() => {
      expect(defaultProps.setBasketIsLoading).toHaveBeenCalledWith(false);
    });
  });
});
