import { render, screen } from "@testing-library/react";
import { TimelineCard } from ".";

describe("TimelineCard Component", () => {
  const mockProps = {
    colourPillText: "Test text",
    backgroundColor: "bg-core-yellow",
    subtitleText: "Test subtitle text",
    lighterText: "Test lighter text",
  };
  it("renders the component", () => {
    render(<TimelineCard {...mockProps} />);

    const colourPill = screen.getByText(/test text/i);
    expect(colourPill).toBeInTheDocument();
    expect(colourPill).toHaveTextContent("Test text");
    expect(colourPill).toHaveStyle("background-color: bg-core-yellow");

    const subtitleText = screen.getByText(/test subtitle text/i);

    expect(subtitleText).toBeInTheDocument();
    expect(subtitleText).toHaveClass("font-bold");

    const lighterText = screen.getByText(/test lighter text/i);

    expect(lighterText).toBeInTheDocument();
  });
});
