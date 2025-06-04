import { render, screen } from "@testing-library/react";

import { SpeedPriceDetails } from "./SpeedPriceDetails";

const mockPackage = {
  id: "test-package",
  name: "Test Package",
  contractLength: 24,
  description: "Test package description",
  speed: {
    download: 100,
    upload: 20,
  },
  price: {
    monthly: 25,
    setup: 0,
  },
  priceIncrease: {
    nextYearIncrease: 5,
    followingYearIncrease: 3,
  },
};

const {
  speed: { download, upload },
  price: { monthly },
  priceIncrease: { nextYearIncrease, followingYearIncrease },
} = mockPackage;

describe("SpeedPriceDetails", () => {
  it("renders speed details correctly", () => {
    render(<SpeedPriceDetails pkg={mockPackage} promotion={false} />);

    expect(screen.getByText("Our speed promise")).toBeInTheDocument();
    expect(screen.getByLabelText("Upload speed")).toHaveTextContent(
      `${upload}Mbs`,
    );
    expect(screen.getByLabelText("Download speed")).toHaveTextContent(
      `${download}Mbs`,
    );
  });

  it("renders price details correctly without promotion", () => {
    render(<SpeedPriceDetails pkg={mockPackage} promotion={false} />);

    expect(screen.getByText("What you'll be paying")).toBeInTheDocument();
    expect(screen.getByLabelText("Current monthly price")).toHaveTextContent(
      `£${monthly}`,
    );
    expect(screen.getByLabelText("Price next year")).toHaveTextContent(
      `£${monthly + nextYearIncrease}`,
    );
    expect(screen.getByLabelText("Price following year")).toHaveTextContent(
      `£${monthly + nextYearIncrease + followingYearIncrease}`,
    );
  });

  it("renders price details correctly with promotion", () => {
    render(<SpeedPriceDetails pkg={mockPackage} promotion={true} />);

    expect(screen.getByText("What you'll be paying")).toBeInTheDocument();
    expect(screen.getByLabelText("Current monthly price")).toHaveTextContent(
      "£0",
    );
    expect(screen.getByLabelText("Price after promotion")).toHaveTextContent(
      `£${monthly}`,
    );
    expect(screen.getByLabelText("Price next year")).toHaveTextContent(
      `£${monthly + nextYearIncrease}`,
    );
    expect(screen.getByLabelText("Price following year")).toHaveTextContent(
      `£${monthly + nextYearIncrease + followingYearIncrease}`,
    );
  });
});
