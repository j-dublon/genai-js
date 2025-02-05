import { render, screen } from "@testing-library/react";
import { TimelineCard } from ".";

describe("TimelineCard Component", () => {
  const mockProps = {
    colorPillText: "Test text",
    backgroundColor: "bg-core-yellow",
    subtitleText: "Test subtitle text",
    contextText: "Test lighter text"
  };
  it("renders the component", () => {
    render(<TimelineCard {...mockProps} />);

    const colorPill = screen.getByText(/test text/i);
    expect(colorPill).toBeInTheDocument();
    expect(colorPill).toHaveTextContent("Test text");
    expect(colorPill).toHaveStyle("background-color: bg-core-yellow");

    const subtitleText = screen.getByText(/test subtitle text/i);

    expect(subtitleText).toBeInTheDocument();
    expect(subtitleText).toHaveClass("font-bold");

    const contextText = screen.getByText(/test lighter text/i);

    expect(contextText).toBeInTheDocument();
  });
});
