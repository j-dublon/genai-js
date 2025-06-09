import { render, screen } from "@testing-library/react";

import { AnnualPriceRise } from "@/lib/sortAnnualPriceRise";
import { StoreSelectedPackage } from "@/store/useJoinFlowStore";

import { SpeedPriceDetails } from "./SpeedPriceDetails";

vi.mock("@react-component-library/ui/icons", () => ({
  Arrow: ({ direction, color }: { direction: string; color: string }) => (
    <div data-testid={`arrow-${direction}`} style={{ color }}>
      Arrow {direction}
    </div>
  ),
}));

vi.mock("@/lib/sortAnnualPriceRise", () => ({
  sortAnnualPriceRiseByDate: (priceRises: AnnualPriceRise) => priceRises || [],
}));

describe("SpeedPriceDetails", () => {
  const mockPackage: StoreSelectedPackage = {
    krakenProductCode: "BT-100-24M_25",
    frontendIdentifier: "100-24",
    termMonths: "24",
    selectionIdentifier: "0",
    installationRequired: true,
    appliedPromotionUUIDs: [],
    prices: {
      basePrice: 2500,
      discountedPrice: 2500,
      annualPriceRise: [
        {
          price: 3000,
          date: "2026-04-01T12:00:00.000Z",
          id: "rise-1",
        },
        {
          price: 3300,
          date: "2027-04-01T12:00:00.000Z",
          id: "rise-2",
        },
      ],
    },
    speeds: {
      download: 100,
      upload: 20,
    },
    extras: null,
    offers: null,
    id: "test-package",
  };

  it("renders speed details correctly", () => {
    render(<SpeedPriceDetails pkg={mockPackage} promotion={false} />);

    expect(screen.getByText("Our speed promise")).toBeInTheDocument();
    expect(screen.getByLabelText("Upload speed")).toHaveTextContent("20Mbps");
    expect(screen.getByLabelText("Download speed")).toHaveTextContent(
      "100Mbps",
    );
  });

  it("renders price details correctly without promotion", () => {
    render(<SpeedPriceDetails pkg={mockPackage} promotion={false} />);

    expect(screen.getByText("What you'll be paying")).toBeInTheDocument();
    expect(screen.getByLabelText("Current monthly price")).toHaveTextContent(
      "£25",
    );
    expect(screen.getByLabelText("Price next displayed")).toHaveTextContent(
      "£30",
    );
    expect(screen.getByLabelText("Price following display")).toHaveTextContent(
      "£33",
    );
  });

  it("renders price details correctly with promotion", () => {
    render(<SpeedPriceDetails pkg={mockPackage} promotion={true} />);

    expect(screen.getByText("What you'll be paying")).toBeInTheDocument();
    expect(screen.getByLabelText("Current monthly price")).toHaveTextContent(
      "£0",
    );
    expect(screen.getByLabelText("Price after promotion")).toHaveTextContent(
      "£25",
    );
    expect(screen.getByLabelText("Price next displayed")).toHaveTextContent(
      "£30",
    );
    expect(screen.getByLabelText("Price following display")).toHaveTextContent(
      "£33",
    );
  });

  it("handles missing price rises", () => {
    const packageWithoutRises: StoreSelectedPackage = {
      ...mockPackage,
      prices: {
        ...mockPackage.prices,
        annualPriceRise: null,
      },
    };

    render(<SpeedPriceDetails pkg={packageWithoutRises} promotion={false} />);

    expect(
      screen.queryByLabelText("Price next displayed"),
    ).not.toBeInTheDocument();
    expect(
      screen.queryByLabelText("Price following display"),
    ).not.toBeInTheDocument();
  });

  it("handles single price rise", () => {
    const packageWithSingleRise: StoreSelectedPackage = {
      ...mockPackage,
      prices: {
        ...mockPackage.prices,
        annualPriceRise: [
          {
            price: 3000,
            date: "2026-04-01T12:00:00.000Z",
            id: "rise-1",
          },
        ],
      },
    };

    render(<SpeedPriceDetails pkg={packageWithSingleRise} promotion={false} />);

    expect(screen.getByLabelText("Price next displayed")).toHaveTextContent(
      "£30",
    );
    expect(
      screen.queryByLabelText("Price following display"),
    ).not.toBeInTheDocument();
  });
});
