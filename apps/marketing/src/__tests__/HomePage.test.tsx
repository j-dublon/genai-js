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
  });
  it("renders the 'Ridiculously fast full fibre broadband' heading", async () => {
    render(<HomePage />);
    const heading = await screen.findByText(
      "Ridiculously fast full fibre broadband",
    );
    expect(heading).toBeInTheDocument();
  });

  it("renders the description text", async () => {
    render(<HomePage />);
    const description = await screen.findByText(
      "Stream, game and WFH, all at the same time, with no drop-offs.",
    );
    expect(description).toBeInTheDocument();
  });

  it("renders PostcodeChecker input", async () => {
    render(<HomePage />);
    const input = await screen.findByPlaceholderText("Pop in your address");
    expect(input).toBeInTheDocument();
  });

  it("renders TrustpilotVertical component", async () => {
    render(<HomePage />);
    const logo = await screen.findAllByLabelText("TrustPilot Logo");
    expect(logo[0]).toBeInTheDocument();
  });

  it("renders all TextWithTick items", async () => {
    render(<HomePage />);

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
    render(<HomePage />);
    const heroBanner = await screen.findByTestId("hero-banner");
    expect(heroBanner).toHaveStyle(
      "background-image: url('/assets/images/cuckoo_background.png')",
    );
  });
});
