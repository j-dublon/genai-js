import { render, screen } from "@testing-library/react";

import { EeroHelpModalContents } from "./index";

describe("EeroHelpModalContents", () => {
  const defaultProps = {
    subtitle: "Test Modal Subtitle",
    content: [
      { subtitle: "First Item", description: "First description" },
      { subtitle: "Second Item", description: "Second description" },
      { subtitle: "Third Item", description: "Third description" },
    ],
  };

  it("renders with all required props", () => {
    render(<EeroHelpModalContents {...defaultProps} />);

    const subtitle = screen.getByText("Test Modal Subtitle");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveAttribute("id", "modal-subtitle");
  });

  it("renders all content items with subtitles and descriptions", () => {
    render(<EeroHelpModalContents {...defaultProps} />);

    expect(screen.getByText("First Item")).toBeInTheDocument();
    expect(screen.getByText("First description")).toBeInTheDocument();
    expect(screen.getByText("Second Item")).toBeInTheDocument();
    expect(screen.getByText("Second description")).toBeInTheDocument();
    expect(screen.getByText("Third Item")).toBeInTheDocument();
    expect(screen.getByText("Third description")).toBeInTheDocument();
  });

  it("renders TipCard when tipCardText is provided", () => {
    const propsWithTipCard = {
      ...defaultProps,
      tipCardText: "This is a helpful tip",
    };

    render(<EeroHelpModalContents {...propsWithTipCard} />);

    expect(screen.getByText("This is a helpful tip")).toBeInTheDocument();
  });

  it("does not render TipCard when tipCardText is not provided", () => {
    render(<EeroHelpModalContents {...defaultProps} />);

    expect(screen.queryByText("This is a helpful tip")).not.toBeInTheDocument();
  });

  it("handles single content item", () => {
    const propsWithSingleContent = {
      subtitle: "Test Modal Subtitle",
      content: [{ subtitle: "Single Item", description: "Single description" }],
    };

    render(<EeroHelpModalContents {...propsWithSingleContent} />);

    expect(screen.getByText("Single Item")).toBeInTheDocument();
    expect(screen.getByText("Single description")).toBeInTheDocument();
    expect(screen.queryByText("Second Item")).not.toBeInTheDocument();
  });

  it("handles empty content array", () => {
    const propsWithEmptyContent = {
      subtitle: "Test Modal Subtitle",
      content: [],
    };

    render(<EeroHelpModalContents {...propsWithEmptyContent} />);

    expect(screen.getByText("Test Modal Subtitle")).toBeInTheDocument();
    const contentDiv = document.getElementById("modal-content");
    expect(contentDiv).toBeInTheDocument();
    expect(contentDiv).toHaveTextContent("");
  });
});
