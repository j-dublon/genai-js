import { render, screen } from "@testing-library/react";

import { FeatureImage } from ".";

describe("FeatureText", () => {
  it("renders with custom background color", () => {
    render(
      <FeatureImage
        backgroundColor="yellow"
        backgroundImage={{
          url: "/test-image.jpg",
          alt: "Test image",
        }}
      />,
    );

    const container = screen.getByRole("region", {
      name: "Feature image display",
    });
    expect(container).toHaveClass("ds:bg-core-yellow");
  });

  it("renders background image", () => {
    render(
      <FeatureImage
        backgroundColor="yellow"
        backgroundImage={{
          url: "/test-image.jpg",
          alt: "Test image",
        }}
      />,
    );

    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
    expect(image).toHaveAttribute("alt", "Test image");
  });

  it("renders overlay image when provided", () => {
    render(
      <FeatureImage
        backgroundColor="yellow"
        backgroundImage={{
          url: "/test-image.jpg",
          alt: "Test image",
        }}
        overlayImage={{
          url: "/test-overlay-image.jpg",
          alt: "Test overlay image",
        }}
      />,
    );

    const image = screen.getByAltText("Test overlay image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-overlay-image.jpg");
    expect(image).toHaveAttribute("alt", "Test overlay image");
  });

  it("does not render overlay image when not provided", () => {
    render(
      <FeatureImage
        backgroundColor="yellow"
        backgroundImage={{
          url: "/test-image.jpg",
          alt: "Test image",
        }}
      />,
    );

    const image = screen.queryByAltText("Test overlay image");
    expect(image).not.toBeInTheDocument();
  });

  it("renders promotion image when provided", () => {
    render(
      <FeatureImage
        backgroundColor="yellow"
        backgroundImage={{
          url: "/test-image.jpg",
          alt: "Test image",
        }}
        promotionImage={{
          url: "/test-promotion-image.jpg",
          alt: "Test promotion image",
        }}
      />,
    );

    const image = screen.getByAltText("Test promotion image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-promotion-image.jpg");
    expect(image).toHaveAttribute("alt", "Test promotion image");
  });

  it("does not render promotion image when not provided", () => {
    render(
      <FeatureImage
        backgroundColor="yellow"
        backgroundImage={{
          url: "/test-image.jpg",
          alt: "Test image",
        }}
      />,
    );

    const image = screen.queryByAltText("Test promotion image");
    expect(image).not.toBeInTheDocument();
  });
});
