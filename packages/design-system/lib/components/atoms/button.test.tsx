import { render, screen } from "@testing-library/react";
import { Button } from "./Button";

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
  });

  it("supports other button attributes", () => {
    render(
      <Button aria-label="Custom Button" data-testid="custom-button">
        Click Me
      </Button>
    );

    // Check if the button has the correct aria-label and data-testid
    const button = screen.getByTestId("custom-button");
    expect(button).toHaveAttribute("aria-label", "Custom Button");
  });
});
