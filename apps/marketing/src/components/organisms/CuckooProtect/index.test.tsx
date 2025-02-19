import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { CuckooProtect } from ".";

describe("CuckooProtect", () => {
  beforeAll(() => {
    process.env.NEXT_PUBLIC_ENABLE_CUCKOO_PROTECT = "true";
  });

  it("renders the logo", () => {
    render(<CuckooProtect />);
    expect(screen.getByAltText("Cuckoo protect logo")).toBeInTheDocument();
  });

  it("renders the paragraph", () => {
    render(<CuckooProtect />);
    expect(screen.getByText(/security and privacy/i)).toBeInTheDocument();
  });

  it("renders the text with ticks list", () => {
    render(<CuckooProtect />);
    const textItems = [
      "Included for free (worth £XX/month)",
      "Parental controls",
      "Guest networks",
      "Ad and app blocking",
      "Automatic security updates",
    ];
    textItems.forEach((item) => {
      expect(screen.getByText(item)).toBeInTheDocument();
    });
  });
});
