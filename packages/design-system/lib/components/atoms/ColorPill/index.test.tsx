import { render, screen } from "@testing-library/react";
import { ColorPill } from ".";

describe("ColorPill Component", () => {
  const props = {
    colorPillText: "Test text",
    backgroundColor: "bg-core-yellow",
    ariaLabel: "Custom aria label",
  };

  it("renders the ColorPill with custom text", () => {
    render(<ColorPill {...props} />);

    const colorPill = screen.getByText(/test text/i);
    expect(colorPill).toBeInTheDocument();
    expect(colorPill).toHaveTextContent("Test text");
  });

  it("renders the ColorPill with the correct background color", () => {
    render(<ColorPill {...props} />);

    const colorPill = screen.getByText(/test text/i);

    expect(colorPill).toHaveStyle("background-color: bg-core-yellow");
  });

  it("renders the ColorPill with the correct aria-label", () => {
    render(<ColorPill {...props} />);

    const colorPill = screen.getByLabelText(
      "Color pill with the text Test text"
    );
    expect(colorPill).toBeInTheDocument();
  });
});
