import { render, screen } from "@testing-library/react";

import { EeroInfoModalContents } from "./index";

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
    render(<EeroInfoModalContents {...defaultProps} />);

    const subtitle = screen.getByText("Test Subtitle");
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveAttribute("id", "modal-subtitle");
  });

  it("renders all content paragraphs", () => {
    render(<EeroInfoModalContents {...defaultProps} />);

    expect(screen.getByText("First paragraph")).toBeInTheDocument();
    expect(screen.getByText("Second paragraph")).toBeInTheDocument();
    expect(screen.getByText("Third paragraph")).toBeInTheDocument();
  });

  it("renders image when provided", () => {
    render(<EeroInfoModalContents {...defaultProps} />);

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

    render(<EeroInfoModalContents {...propsWithoutImage} />);

    expect(screen.queryByTestId("modal-image")).not.toBeInTheDocument();
  });

  it("handles single content item", () => {
    const propsWithSingleContent = {
      ...defaultProps,
      content: ["Single paragraph"],
    };

    render(<EeroInfoModalContents {...propsWithSingleContent} />);

    expect(screen.getByText("Single paragraph")).toBeInTheDocument();
    expect(screen.queryByText("Second paragraph")).not.toBeInTheDocument();
  });
});
