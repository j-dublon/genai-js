import { render, screen } from "@testing-library/react";

import { EeroSelectionHelpModal } from "./index";

describe("EeroSelectionHelpModal", () => {
  const defaultProps = {
    title: "Test Modal Title",
    buttonText: "Close",
    modalRef: { current: null },
    subtitle: "Test Subtitle",
    content: ["First paragraph", "Second paragraph", "Third paragraph"],
    image: "test-image.png",
  };

  it("renders with all required props", () => {
    render(<EeroSelectionHelpModal {...defaultProps} />);

    expect(screen.getByText("Test Modal Title")).toBeInTheDocument();
    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("renders subtitle correctly", () => {
    render(<EeroSelectionHelpModal {...defaultProps} />);

    const subtitle = screen.getByText("Test Subtitle");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveAttribute("id", "modal-subtitle");
  });

  it("renders all content paragraphs", () => {
    render(<EeroSelectionHelpModal {...defaultProps} />);

    expect(screen.getByText("First paragraph")).toBeInTheDocument();
    expect(screen.getByText("Second paragraph")).toBeInTheDocument();
    expect(screen.getByText("Third paragraph")).toBeInTheDocument();
  });

  it("renders image when provided", () => {
    render(<EeroSelectionHelpModal {...defaultProps} />);

    const image = screen.getByTestId("modal-image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveClass("w-64", "m-auto");
    expect(image).toHaveAttribute(
      "src",
      "/vc-ap-join-flow/assets/test-image.png",
    );
  });

  it("does not render image when not provided", () => {
    const propsWithoutImage = {
      title: "Test Modal Title",
      buttonText: "Close",
      modalRef: { current: null },
      subtitle: "Test Subtitle",
      content: ["First paragraph", "Second paragraph", "Third paragraph"],
    };

    render(<EeroSelectionHelpModal {...propsWithoutImage} />);

    expect(screen.queryByTestId("modal-image")).not.toBeInTheDocument();
  });

  it("handles single content item", () => {
    const propsWithSingleContent = {
      ...defaultProps,
      content: ["Single paragraph"],
    };

    render(<EeroSelectionHelpModal {...propsWithSingleContent} />);

    expect(screen.getByText("Single paragraph")).toBeInTheDocument();
    expect(screen.queryByText("Second paragraph")).not.toBeInTheDocument();
  });
});
