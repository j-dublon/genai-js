import useJoinFlowStore from "@store/useJoinFlowStore";
import { render, screen } from "@testing-library/react";
import { beforeEach, describe, it, vi } from "vitest";

import { usePricingCalculations } from "@/hooks/usePricingCalculations";
import { hydrateEeroProductWithContent } from "@/lib/createEeroOptions";
import { formatDisplayDateMonthYear } from "@/lib/formatDate";
import { sortAnnualPriceRiseByDate } from "@/lib/sortAnnualPriceRise";

import { PaymentSummary } from "./PaymentSummary";

vi.mock("@store/useJoinFlowStore", () => ({
  default: vi.fn(),
}));
const mockUseJoinFlowStore = vi.mocked(useJoinFlowStore);

vi.mock("@/hooks/usePricingCalculations", () => ({
  usePricingCalculations: vi.fn(),
}));
const mockUsePricingCalculations = vi.mocked(usePricingCalculations);

vi.mock("@/lib/createEeroOptions", () => ({
  hydrateEeroProductWithContent: vi.fn(),
}));
const mockHydrateEeroProductWithContent = vi.mocked(
  hydrateEeroProductWithContent,
);

vi.mock("@/lib/sortAnnualPriceRise", () => ({
  sortAnnualPriceRiseByDate: vi.fn(),
}));
const mockSortAnnualPriceRiseByDate = vi.mocked(sortAnnualPriceRiseByDate);

vi.mock("@/lib/formatDate", () => ({
  formatDisplayDateMonthYear: vi.fn(),
}));
const mockFormatDisplayDateMonthYear = vi.mocked(formatDisplayDateMonthYear);

vi.mock("./PaymentConfirmationProps", () => ({
  paymentConfirmationText: {
    monthlyPaymentTitle: "Your monthly payment",
    totalMonthlyPaymentTitle: "Your total monthly payment",
    eeroProductContent: [
      {
        code: "EERO_MESH_ROUTER_X1",
        heading: "No additional Eero needed",
        description: "Just one eero provided by us.",
        totalCount: 1,
        imageURL: "",
      },
    ],
  },
}));

describe("PaymentSummary", () => {
  const selectedPackage = {
    krakenProductCode: "PKG-1",
    frontendIdentifier: "pkg-1",
    frontendTitle: "Superfast",
    termMonths: 24,
    selectionIdentifier: "sel-1",
    installationRequired: false,
    appliedPromotionUUIDs: null,
    prices: {
      broadband: {
        basePrice: 3000,
        discount: 500,
        customerPriceIncDiscount: 2500,
        annualPriceRise: [
          { price: 3500, date: "2025-04-01", id: "rise-1" },
          { price: 4000, date: "2026-04-01", id: "rise-2" },
        ],
      },
    },
    speeds: { download: 150, upload: 30 },
    availableExtras: null,
    offers: null,
    id: "pkg-1-id",
  };
  const eeroSelection = {
    code: "EERO_MESH_ROUTER_X1",
    family: "mesh_routers",
    selectionIdentifier: "1",
    price: 0,
  };
  const pricing = {
    monthlyPackagePrice: "30",
    discountedPrice: "25",
    nextPrice: "35",
    followingPrice: "40",
    monthlyEeroPrice: "0",
    monthlyTotal: "30",
    discountedMonthlyTotal: "25",
    predictedTotalNext: "35",
    predictedTotalFollowing: "40",
    monthlySaving: "5",
    totalPlanSaving: "60",
    packageName: "150Mbps",
    nextPriceRiseAmount: "5",
    followingPriceRiseAmount: "5",
  };
  const eeroWithContent = {
    ...eeroSelection,
    heading: "No additional Eero needed",
    description: "Just one eero provided by us.",
    imageURL: "",
    totalCount: 1,
  };
  const annualPriceRise = [
    { price: 3500, date: "2025-04-01", id: "rise-1" },
    { price: 4000, date: "2026-04-01", id: "rise-2" },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    mockUseJoinFlowStore.mockReturnValue({
      selectedPackage,
      eeroSelection,
    });
    mockUsePricingCalculations.mockReturnValue(pricing);
    mockHydrateEeroProductWithContent.mockReturnValue(eeroWithContent);
    mockSortAnnualPriceRiseByDate.mockReturnValue(annualPriceRise);
    mockFormatDisplayDateMonthYear.mockImplementation((date: string) => {
      if (date === "2025-04-01") return "April 2025";
      if (date === "2026-04-01") return "April 2026";
      return date;
    });
  });

  it("renders the payment summary with eero", () => {
    render(<PaymentSummary />);

    expect(screen.getByRole("presentation")).toBeInTheDocument();
    expect(screen.getByText("Your monthly payment")).toBeInTheDocument();
    expect(screen.getByText("150Mbps")).toBeInTheDocument();
    expect(screen.getByText("No additional Eero needed")).toBeInTheDocument();
    expect(
      screen.getByText("Just one eero provided by us."),
    ).toBeInTheDocument();
    expect(screen.getByText("Included")).toBeInTheDocument();
    expect(screen.getByText("Your total monthly payment")).toBeInTheDocument();
    expect(screen.getAllByText("£25")).toHaveLength(2);
    expect(
      screen.getByText(/From April 2025 an increase of/),
    ).toBeInTheDocument();
    expect(screen.getAllByText("£5")).toHaveLength(2);
    expect(screen.getByText("£35")).toBeInTheDocument();
    expect(
      screen.getByText(/From April 2026 an increase of/),
    ).toBeInTheDocument();
    expect(screen.getByText("£40")).toBeInTheDocument();
  });

  it("renders only next price label if only one price rise", () => {
    mockSortAnnualPriceRiseByDate.mockReturnValue([
      { price: 3500, date: "2025-04-01", id: "rise-1" },
    ]);
    render(<PaymentSummary />);

    expect(
      screen.getByText(/From April 2025 an increase of/),
    ).toBeInTheDocument();
    expect(screen.getAllByText("£5")).toHaveLength(1);
    expect(
      screen.queryByText(/From April 2026 an increase of/),
    ).not.toBeInTheDocument();
  });

  it("renders price values correctly when discountedMonthlyTotal is falsy", () => {
    mockUsePricingCalculations.mockReturnValue({
      ...pricing,
      discountedMonthlyTotal: "",
    });
    render(<PaymentSummary />);

    expect(screen.getByText("£30")).toBeInTheDocument();
  });
});
