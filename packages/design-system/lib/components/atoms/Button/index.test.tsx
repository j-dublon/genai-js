import { render, screen } from "@testing-library/react";

import { Button, Size, Tint, Variant } from ".";

describe("Button Component", () => {
  it("renders the button with children", () => {
    render(<Button>Click Me</Button>);

    // Check if the button with the text "Click Me" is in the document
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click Me");
  });

  it("renders the button with additional props", () => {
    render(<Button disabled>Click Me</Button>);

    // Check if the button is disabled
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toBeDisabled();
    expect(button).toHaveClass("cursor-not-allowed opacity-50");
  });

  it("supports other button attributes", () => {
    render(
      <Button aria-label="Custom Button" data-testid="custom-button">
        Click Me
      </Button>,
    );

    // Check if the button has the correct aria-label and data-testid
    const button = screen.getByTestId("custom-button");
    expect(button).toHaveAttribute("aria-label", "Custom Button");
  });

  it("renders an anchor when href is provided", () => {
    render(<Button href="https://www.google.com">Click Me</Button>);

    const button = screen.getByRole("link", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "https://www.google.com");
  });

  it("renders correct button type if provided", () => {
    render(<Button type="submit">Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveAttribute("type", "submit");
  });

  it.each([
    ["solid", "black", "bg-core-black text-core-white"],
    ["solid", "white", "bg-core-white text-core-black"],
    ["outline", "black", "before:border-core-black text-core-black"],
    ["outline", "white", "before:border-ui-grey-300 text-core-black"],
  ])(
    "applies correct class names for %s variant with %s tint",
    (variant, tint, expectedClass) => {
      render(
        <Button variant={variant as Variant} tint={tint as Tint}>
          Click Me
        </Button>,
      );

      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toHaveClass(expectedClass);
    },
  );

  it.each([
    ["small", "py-2 px-4 text-xs md:text-sm"],
    ["medium", "py-3 md:py-5 px-5 md:px-8 text-sm md:text-md"],
  ])(
    "applies padding and font size classes for %s size",
    (size, expectedClass) => {
      render(<Button size={size as Size}>Click Me</Button>);

      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toHaveClass(expectedClass);
    },
  );

  it("applies correct hover styles", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("button-animate hover:bg-opacity-10");
  });

  it("defaults to black outline medium button", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass(
      "before:border-core-black text-core-black py-3 md:py-5 px-5 md:px-8 text-sm md:text-md",
    );
  });

  it("applies any additional classNames passed in", () => {
    render(<Button className="test-class">Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("test-class");
  });

  it("accepts a textColor override", () => {
    render(<Button textColor="blue">Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass("text-secondary-blue");
  });
});
