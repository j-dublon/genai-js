import { render, screen } from "@testing-library/react";
import { ColourPill } from ".";

describe("ColourPill Component", () => {
  const props = {
    colourPillText: "Test text",
    backgroundColor: "bg-core-yellow",
    ariaLabel: "Custom aria label",
  };

  it("renders the ColourPill with custom text", () => {
    render(<ColourPill {...props} />);

    const colourPill = screen.getByText(/test text/i);
    expect(colourPill).toBeInTheDocument();
    expect(colourPill).toHaveTextContent("Test text");
  });

  it("renders the ColourPill with the correct background color", () => {
    render(<ColourPill {...props} />);

    const colourPill = screen.getByText(/test text/i);

    expect(colourPill).toHaveStyle("background-color: bg-core-yellow");
  });

  it("renders the ColourPill with the correct aria-label", () => {
    render(<ColourPill {...props} />);

    const colourPill = screen.getByLabelText(
      "Colour pill with the text Test text"
    );
    expect(colourPill).toBeInTheDocument();
  });
});
