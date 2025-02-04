import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { HomePage } from "../components/pages/homePagetemp";

describe("HomePage", () => {
  it("renders the Ridiculously fast full fibre broadband heading", () => {
    render(<HomePage />);

    // Check if the heading is in the document
    const heading = screen.getByText("Ridiculously fast full fibre broadband");
    expect(heading).toBeInTheDocument();
  });

  it("renders the description text", () => {
    render(<HomePage />);
    expect(
      screen.getByText(
        "Stream, game and WFH, all at the same time, with no drop-offs."
      )
    ).toBeInTheDocument();
  });

  it("renders PostcodeChecker input", () => {
    render(<HomePage />);
    expect(
      screen.getByPlaceholderText("Pop in your address")
    ).toBeInTheDocument();
  });

  it("renders TrustpilotVertical component", () => {
    render(<HomePage />);
    expect(screen.getByAltText("Trustpilot Logo")).toBeInTheDocument();
  });

  it("renders all TextWithTick items", () => {
    render(<HomePage />);
    expect(
      screen.getByText("Full fibre speeds up to 900Mbps")
    ).toBeInTheDocument();
    expect(
      screen.getByText("5x more reliable than traditional broadband")
    ).toBeInTheDocument();
    expect(screen.getByText("eero Pro 6E router")).toBeInTheDocument();
    expect(screen.getByText("UK-based Customer Care team")).toBeInTheDocument();
  });

  it("applies background image correctly", () => {
    render(<HomePage />);
    const heroBanner = screen.getByTestId("hero-banner");
    expect(heroBanner).toHaveStyle(
      "background-image: url('/assets/images/cuckoo_background.png')"
    );
  });
});
