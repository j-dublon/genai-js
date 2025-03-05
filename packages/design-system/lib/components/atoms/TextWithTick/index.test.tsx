import { render, screen } from "@testing-library/react";

import { TextWithTick } from ".";

describe("TextWithTick Component", () => {
  const props = { textInput: "Test text", "aria-label": "Custom aria label" };

  it("renders the TextWithTick with custom text", () => {
    render(<TextWithTick {...props} />);

    const textWithTick = screen.getByText(/test text/i);
    expect(textWithTick).toBeInTheDocument();
    expect(textWithTick).toHaveTextContent("Test text");
  });

  it("renders the TextWithTick with the correct aria-label", () => {
    render(<TextWithTick {...props} />);

    const textWithTick = screen.getByLabelText(
      "Text with tick with the statement Test text",
    );
    expect(textWithTick).toBeInTheDocument();
  });

  it("applies padding by default and removes it when noPadding is true", () => {
    const { rerender } = render(<TextWithTick {...props} />);

    let container = screen.getByLabelText(
      "Text with tick with the statement Test text",
    );
    expect(container).toHaveClass("px-6", "py-3");

    rerender(<TextWithTick {...props} noPadding />);
    container = screen.getByLabelText(
      "Text with tick with the statement Test text",
    );
    expect(container).not.toHaveClass("px-6", "py-3");
  });
});
