import { vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { FeatureText } from ".";

describe("FeatureText", () => {
  it("renders both texts correctly for screen readers", () => {
    render(
      <FeatureText
        topText="Hello"
        bottomText="World"
        backgroundColor="blue"
        textColor="indigo"
        textGap="medium"
      />,
    );

    expect(screen.getByText("Hello")).toBeInTheDocument();
    expect(screen.getByText("World")).toBeInTheDocument();
  });

  it("renders with custom background color", () => {
    render(
      <FeatureText
        topText="Hello"
        bottomText="World"
        backgroundColor="yellow"
        textColor="indigo"
        textGap="medium"
      />,
    );

    const container = screen.getByRole("region", {
      name: "Feature text display",
    });
    expect(container).toHaveClass("bg-yellow-300");
  });

  it("renders image when provided", () => {
    render(
      <FeatureText
        topText="Hello"
        bottomText="World"
        backgroundColor="yellow"
        textColor="indigo"
        textGap="medium"
        image={{
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

  it("does not render image when not provided", () => {
    render(
      <FeatureText
        topText="Hello"
        bottomText="World"
        backgroundColor="yellow"
        textColor="indigo"
        textGap="medium"
      />,
    );

    const images = screen.queryAllByRole("img");
    expect(images).toHaveLength(0);
  });

  it("hides decorative text from screen readers", () => {
    render(
      <FeatureText
        topText="Hello"
        bottomText="World"
        backgroundColor="yellow"
        textColor="indigo"
        textGap="medium"
      />,
    );

    const hiddenElements = document.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenElements.length).toBeGreaterThan(0);

    const wavyTextContainer = screen
      .getByText("Hello")
      .closest('[aria-hidden="true"]');
    expect(wavyTextContainer).toBeNull();
  });

  it("provides screen reader only text", () => {
    render(
      <FeatureText
        topText="Hello"
        bottomText="World"
        backgroundColor="yellow"
        textColor="indigo"
        textGap="medium"
      />,
    );

    const srOnlyElement = document.querySelector(".sr-only");
    expect(srOnlyElement).toBeInTheDocument();
    expect(srOnlyElement).toHaveTextContent("HelloWorld");
  });

  it("updates scale on window resize", () => {
    const { container } = render(
      <FeatureText
        topText="Hello"
        bottomText="World"
        backgroundColor="yellow"
        textColor="indigo"
        textGap="medium"
      />,
    );

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
    render(
      <FeatureText
        topText="Hello"
        bottomText="World"
        backgroundColor="yellow"
        textColor="indigo"
        textGap="medium"
        textScale={2.5}
      />,
    );

    const chars = screen
      .getAllByRole("generic", { hidden: true })
      .filter((el) => el.style.transform?.includes("scale"));

    expect(chars.length).toBeGreaterThan(0);
  });

  it("applies custom text gap", () => {
    render(
      <FeatureText
        topText="Hello"
        bottomText="World"
        backgroundColor="yellow"
        textColor="indigo"
        textGap="small"
      />,
    );

    const textElements = document.querySelectorAll('[role="presentation"]');
    textElements.forEach((element) => {
      expect(element).toHaveClass("gap-2");
    });
  });

  it("removes resize event listener on unmount", () => {
    const removeEventListenerSpy = vi.spyOn(window, "removeEventListener");

    const { unmount } = render(
      <FeatureText
        topText="Hello"
        bottomText="World"
        backgroundColor="yellow"
        textColor="indigo"
        textGap="small"
      />,
    );
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "resize",
      expect.any(Function),
    );

    removeEventListenerSpy.mockRestore();
  });
});
