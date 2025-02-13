import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { HomePage } from "../components/pages/homePage";

const mockedFetch = vi.fn(() =>
  Promise.resolve({
    ok: true,
    status: 200,
    json: vi.fn(() =>
      Promise.resolve({ data: { trustScore: 4.5, numberOfReviews: 100 } }),
    ),
  } as unknown as Response),
);

global.fetch = mockedFetch;

describe("HomePage", () => {
  beforeEach(() => {
    mockedFetch.mockClear();
    render(<HomePage />);
  });
  it("renders the 'Ridiculously fast full fibre broadband' heading", async () => {
    const heading = await screen.findByText(
      "Ridiculously fast full fibre broadband",
    );
    expect(heading).toBeInTheDocument();
  });

  it("renders the description text", async () => {
    const description = await screen.findByText(
      "Stream, game and WFH, all at the same time, with no drop-offs.",
    );
    expect(description).toBeInTheDocument();
  });

  it("renders PostcodeChecker input", async () => {
    const input = await screen.findByPlaceholderText("Pop in your address");
    expect(input).toBeInTheDocument();
  });

  it("renders TrustpilotVertical component", async () => {
    const logo = await screen.findAllByLabelText("TrustPilot Logo");
    expect(logo[0]).toBeInTheDocument();
  });

  it("renders all TextWithTick items", async () => {
    const item1 = await screen.findByText("Full fibre speeds up to 900Mbps");
    const item2 = await screen.findByText(
      "UK’s most reliable broadband technology",
    );
    const item3 = await screen.findByText(
      "Free* eero Pro 6E router, worth £249.99**",
    );
    const item4 = await screen.findByText("Fair and transparent prices");

    expect(item1).toBeInTheDocument();
    expect(item2).toBeInTheDocument();
    expect(item3).toBeInTheDocument();
    expect(item4).toBeInTheDocument();
  });

  it("applies background image correctly", async () => {
    const heroBanner = await screen.findByTestId("hero-banner");
    expect(heroBanner).toHaveStyle(
      "background-image: url('/assets/images/cuckoo_background.png')",
    );
  });

  it("renders the Click Switch Done section", () => {
    const titleText = screen.getByText("Click. Switch.");
    const imgElement = screen.getByAltText(
      "Done text in a pink coloured pill with an arrow icon pointing at it",
    );
    expect(titleText).toBeInTheDocument();
    expect(imgElement).toBeInTheDocument();
    expect(imgElement).toHaveAttribute(
      "src",
      "../../assets/images/done_button.svg",
    );
    expect(imgElement).toHaveClass("w-32 md:w-56 h-auto");
  });
});
