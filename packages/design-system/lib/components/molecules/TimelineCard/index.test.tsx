import { BackgroundColors } from "@lib/types";
import { render, screen } from "@testing-library/react";

import { TimelineCard } from ".";

describe("TimelineCard Component", () => {
  const mockProps = {
    colorPillText: "Test text",
    backgroundColor: "yellow" as BackgroundColors,
    subtitleText: "Test subtitle text",
    subHeading: "Test lighter text",
    className: "",
  };
  it("renders the component", () => {
    render(<TimelineCard {...mockProps} />);

    const colorPill = screen.getByText(/test text/i);
    expect(colorPill).toBeInTheDocument();
    expect(colorPill).toHaveTextContent("Test text");
    expect(colorPill).toHaveStyle("background-color: ds:bg-core-yellow");

    const subtitleText = screen.getByText(/test subtitle text/i);

    expect(subtitleText).toBeInTheDocument();

    const subHeading = screen.getByText(/test lighter text/i);

    expect(subHeading).toBeInTheDocument();
  });
});
