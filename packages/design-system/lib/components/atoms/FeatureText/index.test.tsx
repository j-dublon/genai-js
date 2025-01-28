import { render, screen, fireEvent } from "@testing-library/react";
import { FeatureText } from ".";

describe("FeatureText", () => {
  const defaultProps = {
    topText: "Hello",
    bottomText: "World",
  };

  it("renders both texts correctly for screen readers", () => {
    render(<FeatureText {...defaultProps} />);

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("World")).toBeInTheDocument();
  });

  it("renders with custom background color", () => {
    render(<FeatureText {...defaultProps} backgroundColor="blue-500" />);

    const container = screen.getByRole("region", {
      name: "Feature text display",
    });
    expect(container).toHaveClass("bg-blue-500");
  });

  it("renders image when provided", () => {
    const imageProps = {
      ...defaultProps,
      image: {
        url: "/test-image.jpg",
        alt: "Test image",
      },
    };

    render(<FeatureText {...imageProps} />);

    const image = screen.getByAltText("Test image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "/test-image.jpg");
    expect(image).toHaveAttribute("alt", "Test image");
  });

  it("does not render image when not provided", () => {
    render(<FeatureText {...defaultProps} />);

    const images = screen.queryAllByRole("img");
    expect(images).toHaveLength(0);
  });

  it("hides decorative text from screen readers", () => {
    render(<FeatureText {...defaultProps} />);

    const hiddenElements = document.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenElements.length).toBeGreaterThan(0);

    const wavyTextContainer = screen
      .getByText("Hello")
      .closest('[aria-hidden="true"]');
    expect(wavyTextContainer).toBeNull();
  });

  it("provides screen reader only text", () => {
    render(<FeatureText {...defaultProps} />);

    const srOnlyElement = document.querySelector(".sr-only");
    expect(srOnlyElement).toBeInTheDocument();
    expect(srOnlyElement).toHaveTextContent("HelloWorld");
  });

  it("updates scale on window resize", () => {
    const { container } = render(<FeatureText {...defaultProps} />);

    Object.defineProperty(container.firstChild, "offsetWidth", { value: 1000 });
    Object.defineProperty(container.firstChild, "offsetHeight", { value: 500 });

    const textElement = container.querySelector('[aria-hidden="true"]');

    Object.defineProperty(textElement, "offsetWidth", { value: 200 });
    Object.defineProperty(textElement, "offsetHeight", { value: 100 });

    fireEvent(window, new Event("resize"));

    const chars = screen
      .getAllByRole("generic")
      .filter((el) => el.style.transform?.includes("scale"));

    chars.forEach((char) => {
      expect(char.style.transform).toContain("scale(9)");
    });
  });

  it("applies custom text scale", () => {
    render(<FeatureText {...defaultProps} textScale={2.5} />);

    const chars = screen
      .getAllByRole("generic", { hidden: true })
      .filter((el) => el.style.transform?.includes("scale"));

    expect(chars.length).toBeGreaterThan(0);
  });

  it("applies custom text gap", () => {
    render(<FeatureText {...defaultProps} textGap={24} />);

    const textElements = document.querySelectorAll('[role="presentation"]');
    textElements.forEach((element) => {
      expect(element).toHaveClass("gap-24");
    });
  });

  it("removes resize event listener on unmount", () => {
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    const { unmount } = render(<FeatureText {...defaultProps} />);
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );

    removeEventListenerSpy.mockRestore();
  });
});
