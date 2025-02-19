import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { HomePage } from "../components/pages/HomePage";

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
    process.env.NEXT_PUBLIC_ENABLE_CUCKOO_PROTECT = "true";
    render(<HomePage />);
  });

  it("renders the Hero banner section", async () => {
    const heading = await screen.findByText(
      "Ridiculously fast full fibre broadband",
    );
    expect(heading).toBeInTheDocument();
  });

  it("renders the join the flock section section", () => {
    screen.getByText("Join the flock today");
  });

  it("renders the FAQ section", async () => {
    const heading = await screen.findByText(
      "Questions about full fibre, broadband, or anything else at all?",
    );
    expect(heading).toBeInTheDocument();
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

  it("renders the Life at Cuckoo section", () => {
    const titleText = screen.getByText("Properly good eggs");
    expect(titleText).toBeInTheDocument();
  });

  it("renders the Cuckoo Protect section", async () => {
    const imgElement = screen.getByAltText("Cuckoo protect logo");
    expect(imgElement).toBeInTheDocument();
  });

  it("renders the Footer section", async () => {
    const heading = await screen.findByText("Fast, fair, feel-good broadband");
    expect(heading).toBeInTheDocument();
  });
});
