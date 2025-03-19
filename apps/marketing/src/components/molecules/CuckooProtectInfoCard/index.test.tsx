import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { CuckooProtectInfoCard } from ".";

describe("Cuckoo protect info card", () => {
  it("renders the logo", () => {
    render(<CuckooProtectInfoCard />);
    expect(
      screen.getByAltText("Cuckoo protect logo on info card"),
    ).toBeInTheDocument();
  });

  it("renders the paragraph", () => {
    render(<CuckooProtectInfoCard />);
    expect(screen.getByText("Pssst...")).toBeInTheDocument();
    expect(
      screen.getByText(
        "advanced security and privacy features come free with your plan, too (worth £199.98/month).",
      ),
    ).toBeInTheDocument();
  });
});
