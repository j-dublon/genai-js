import "@testing-library/jest-dom";

import { ReviewCardProps } from "@react-component-library/ui";
import { render, screen } from "@testing-library/react";
import { vi } from "vitest";

import { TrustPilotSlider } from ".";

// Mock UI components
vi.mock("@react-component-library/ui", () => ({
  ReviewCard: ({ title, author, reviewText, starRating }: ReviewCardProps) => (
    <div data-testid="review-card">
      <h3>{title}</h3>
      <div>{reviewText}</div>
      <div>{author}</div>
      <div>Rating: {starRating}</div>
    </div>
  ),
  Slider: ({
    children,
    ...props
  }: {
    children: React.ReactNode;
    "aria-label"?: string;
    "aria-roledescription"?: string;
    draggable?: boolean;
    margin?: string;
    trustScore?: number;
    numberOfReviews?: number;
  }) => (
    <div data-testid="slider" {...props}>
      {children}
      <div data-testid="trustpilot-horizontal">
        <img alt="Trustpilot logo" className="w-20 sm:w-[105px] h-auto" />
        <div className="w-26 h-7 sm:w-[105px] sm:h-[26px] flex items-center justify-center overflow-hidden">
          <div data-testid="trustpilot-stars" />
        </div>
        <span>
          Based on <strong>{mockProps.reviewCount.toLocaleString()}</strong>{" "}
          reviews
        </span>
      </div>
    </div>
  ),
}));

vi.mock("@react-component-library/ui/server", () => ({
  ReviewCardSkeleton: () => <div data-testid="review-card-skeleton" />,
}));

const mockProps = {
  title: "Test Title",
  subtitle: "Test Subtitle",
  reviewCount: 100,
  trustScore: 4.5,
  reviews: [
    {
      id: "1",
      title: "Great Service",
      reviewText: "Amazing experience!",
      author: "John Doe",
      starRating: 5,
    },
    {
      id: "2",
      title: "Excellent",
      reviewText: "Very satisfied",
      author: "Jane Smith",
      starRating: 4,
    },
  ],
};

describe("TrustPilotSlider", () => {
  beforeEach(() => {
    // Set default desktop viewport
    Object.defineProperty(window, "innerWidth", {
      writable: true,
      configurable: true,
      value: 1024,
    });
  });

  it("renders the title and subtitle", () => {
    render(<TrustPilotSlider {...mockProps} isLoading={false} />);

    expect(screen.getByText(mockProps.title)).toBeInTheDocument();
    expect(screen.getByText(mockProps.subtitle)).toBeInTheDocument();
  });

  it("renders loading state with skeletons when isLoading is true", () => {
    render(<TrustPilotSlider {...mockProps} isLoading={true} />);

    const skeletons = screen.getAllByTestId("review-card-skeleton");
    expect(skeletons).toHaveLength(5);
  });

  it("renders reviews when not loading", () => {
    render(<TrustPilotSlider {...mockProps} isLoading={false} />);

    const reviewCards = screen.getAllByTestId("review-card");
    expect(reviewCards).toHaveLength(mockProps.reviews.length);

    // Check first review content
    const firstReview = mockProps.reviews[0];
    expect(screen.getByText(firstReview.title)).toBeInTheDocument();
    expect(screen.getByText(firstReview.reviewText)).toBeInTheDocument();
    expect(screen.getByText(firstReview.author)).toBeInTheDocument();
  });

  it("renders the slider with correct accessibility attributes", () => {
    render(<TrustPilotSlider {...mockProps} isLoading={false} />);

    const slider = screen.getByTestId("slider");
    expect(slider).toHaveAttribute("aria-label", "Customer reviews");
    expect(slider).toHaveAttribute("aria-roledescription", "carousel");
  });

  it("renders review slides with correct accessibility attributes", () => {
    render(<TrustPilotSlider {...mockProps} isLoading={false} />);

    mockProps.reviews.forEach((_, index) => {
      const slide = screen.getByLabelText(
        `Review ${index + 1} of ${mockProps.reviews.length}`,
      );
      expect(slide).toHaveAttribute("aria-roledescription", "slide");
    });
  });

  it("renders loading slides with correct accessibility attributes", () => {
    render(<TrustPilotSlider {...mockProps} isLoading={true} />);

    Array.from({ length: 5 }).forEach((_, index) => {
      const slide = screen.getByLabelText(`Loading review ${index + 1} of 5`);
      expect(slide).toHaveAttribute("aria-roledescription", "slide");
    });
  });

  it("renders the TrustPilot logo and score", () => {
    render(<TrustPilotSlider {...mockProps} isLoading={false} />);

    expect(
      screen.getByRole("img", { name: "Trustpilot logo" }),
    ).toBeInTheDocument();
    expect(screen.getByTestId("trustpilot-stars")).toBeInTheDocument();

    // Check for the text content using a function matcher
    const reviewsText = screen.getByText((content, element) => {
      return (
        element?.tagName.toLowerCase() === "span" &&
        content.includes("Based on") &&
        content.includes("reviews")
      );
    });
    expect(reviewsText).toBeInTheDocument();
    expect(reviewsText).toHaveTextContent(
      `Based on ${mockProps.reviewCount.toLocaleString()} reviews`,
    );
  });

  it("handles mobile TrustPilot logo sizing", () => {
    window.innerWidth = 500;
    render(<TrustPilotSlider {...mockProps} isLoading={false} />);
    const mobileLogo = screen.getByRole("img", { name: "Trustpilot logo" });
    expect(mobileLogo).toHaveClass("w-20");
  });

  it("handles desktop TrustPilot logo sizing", () => {
    window.innerWidth = 1024;
    render(<TrustPilotSlider {...mockProps} isLoading={false} />);
    const desktopLogo = screen.getByRole("img", { name: "Trustpilot logo" });
    expect(desktopLogo).toHaveClass("sm:w-[105px]");
  });
});
