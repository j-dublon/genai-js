import { render, screen } from "@testing-library/react";

import { OtsFailBanner } from "./OtsFailBanner";

const mockBannerText =
  "We couldn't find your current provider. Please let them know you are switching!";
const mockHighlightText = "let them know";

describe("OtsFailBanner", () => {
  it("should render the banner with correct content", () => {
    render(
      <OtsFailBanner
        bannerText={mockBannerText}
        highlightText={mockHighlightText}
      />,
    );

    expect(screen.getByText("Important info:")).toBeInTheDocument();
    expect(
      screen.getByText(/We couldn't find your current provider/),
    ).toBeInTheDocument();
  });

  it("should render the InsertFormattedText component with correct props", () => {
    render(
      <OtsFailBanner
        bannerText={mockBannerText}
        highlightText={mockHighlightText}
      />,
    );

    const span = screen.getByText(/let them know/);
    expect(span).toHaveClass("font-medium underline");
  });
});
