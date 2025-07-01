import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Footer } from "@/components/Footer";

import { heading, reminders } from "./FooterProps";

const mockUseTrustpilotScore = vi.fn();

vi.mock("@react-component-library/ui", async () => {
  const actual = await vi.importActual("@react-component-library/ui");
  return {
    ...actual,
    useTrustpilotScore: () => mockUseTrustpilotScore(),
  };
});

describe("Footer Component", () => {
  beforeEach(() => {
    mockUseTrustpilotScore.mockReset();
    mockUseTrustpilotScore.mockReturnValue({
      data: {
        trustScore: 4.8,
        numberOfReviews: 1234,
      },
      loading: false,
      error: null,
    });
  });

  it("renders the footer with all required elements", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toBeInTheDocument();
    expect(screen.getByText(heading)).toBeInTheDocument();
    const tipCard = screen.getByRole("presentation");
    expect(tipCard).toBeInTheDocument();
    expect(screen.getByText("0330 912 9955")).toBeInTheDocument();
    expect(screen.getByText(/We're open Monday - Friday/)).toBeInTheDocument();
    reminders.forEach((reminder) => {
      expect(screen.getByText(reminder.textInput)).toBeInTheDocument();
    });
  });

  it("renders TrustpilotHorizontal with data from useTrustpilotScore", () => {
    render(<Footer />);

    expect(screen.getByTestId("trustpilot-link")).toBeInTheDocument();
    const reviewTextContainer = screen.getByText(/Based on/).closest("div");
    expect(reviewTextContainer).toHaveTextContent("Based on 1,234 reviews");
  });

  it("does not render TrustpilotHorizontal when useTrustpilotScore returns no data", () => {
    mockUseTrustpilotScore.mockReturnValue({
      data: null,
      loading: false,
      error: null,
    });

    render(<Footer />);
    expect(screen.queryByTestId("trustpilot-link")).not.toBeInTheDocument();
    expect(screen.queryByText(/Based on/)).not.toBeInTheDocument();
  });

  it("renders the mobile-only heading on larger screens", () => {
    render(<Footer />);

    const heading = screen.getByText("Prefer to talk to someone?");
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("hidden", "md:block");
  });

  it("orders the footer items correctly", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    const secondLevelDiv = footer.firstElementChild?.firstElementChild;
    // row on desktop, reversed column on mobile
    expect(secondLevelDiv).toHaveClass("flex-col-reverse", "md:flex-row");
  });

  it("renders different colours for desktop and mobile", () => {
    render(<Footer />);

    const footer = screen.getByRole("contentinfo");
    expect(footer).toHaveClass("md:bg-ui-grey-100", "bg-core-white");
    const tipCard = screen.getByLabelText("Tip card");
    expect(tipCard).toHaveClass("bg-ui-grey-100", "md:bg-core-white");
  });
});
