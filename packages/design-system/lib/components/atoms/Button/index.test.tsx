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
    expect(button).toHaveClass("ds:cursor-not-allowed ds:opacity-50");
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
    ["solid", "black", "ds:bg-core-black ds:text-core-white"],
    ["solid", "white", "ds:bg-core-white ds:text-core-black"],
    ["outline", "black", "ds:before:border-core-black ds:text-core-black"],
    ["outline", "white", "ds:before:border-ui-grey-300 ds:text-core-black"],
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
    ["small", "ds:py-2 ds:px-4 ds:text-xs ds:md:text-sm"],
    [
      "medium",
      "ds:h-[60px] ds:text-sm ds:sm:text-md  ds:py-4 ds:md:px-4 ds:lg:px-8",
    ],
    ["large", "ds:text-sm ds:sm:text-md ds:py-3 ds:md:py-5 ds:px-5 ds:md:px-8"],
  ])(
    "applies padding and font size classes for %s size",
    (size, expectedClass) => {
      render(<Button size={size as Size}>Click Me</Button>);

      const button = screen.getByRole("button", { name: /click me/i });
      expect(button).toHaveClass(expectedClass);
    },
  );

  it.each([
    [
      "small",
      "ds:rounded-sm ds:before:rounded-sm ds:hover:before:rounded-md ds:hover:before:-inset-[2px]",
    ],
    [
      "medium",
      "ds:rounded-md ds:before:rounded-md ds:hover:before:rounded-lg ds:hover:before:-inset-[2px]",
    ],
    [
      "large",
      "ds:rounded-md ds:before:rounded-md ds:hover:before:rounded-lg ds:hover:before:-inset-[4px]",
    ],
  ])("applies correct hover styles for %s size", (size, expectedClass) => {
    render(<Button size={size as Size}>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass(expectedClass);
  });

  it("defaults to black outline large button", () => {
    render(<Button>Click Me</Button>);

    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toHaveClass(
      "ds:before:border-core-black ds:text-core-black ds:py-3 ds:md:py-5 ds:px-5 ds:md:px-8 ds:text-sm ds:sm:text-md",
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
    expect(button).toHaveClass("ds:text-secondary-blue");
  });
});
