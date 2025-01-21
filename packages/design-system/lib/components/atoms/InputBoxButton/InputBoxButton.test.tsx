import { render, screen } from "@testing-library/react";
import { InputBoxButton } from "./InputBoxButton";

describe("InputBoxButton Component", () => {
  const props = { inputBoxButtonText: "Click me" };

  it("renders the button with children", () => {
    render(<InputBoxButton {...props} />);

    // Check if the button with the text "Click Me" is in the document
    const button = screen.getByRole("button", { name: /click me/i });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent("Click me");
  });
});
