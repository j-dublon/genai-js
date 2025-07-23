import { render, screen } from "@testing-library/react";

import { LoadingSlide } from "./index";

describe("LoadingSlide", () => {
  const defaultProps = {
    src: "/test-image.png",
    message: "Loading...",
  };

  it("renders with required props", () => {
    render(<LoadingSlide {...defaultProps} />);

    const loadingElement = screen.getByRole("status");
    const image = screen.getByRole("presentation");
    const message = screen.getByText("Loading...");

    expect(loadingElement).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(message).toBeInTheDocument();
  });

  it("applies correct accessibility attributes", () => {
    render(<LoadingSlide {...defaultProps} />);

    const loadingElement = screen.getByRole("status");

    expect(loadingElement).toHaveAttribute("aria-label", "Loading");
    expect(loadingElement).toHaveAttribute("aria-busy", "true");
  });

  it("displays the provided message", () => {
    const customMessage = "Please wait while we process your request";
    render(<LoadingSlide {...defaultProps} message={customMessage} />);

    expect(screen.getByText(customMessage)).toBeInTheDocument();
  });

  it("applies custom className when provided", () => {
    const customClassName = "custom-loading-class";
    render(<LoadingSlide {...defaultProps} className={customClassName} />);

    const loadingElement = screen.getByRole("status");

    expect(loadingElement).toHaveClass(customClassName);
    expect(loadingElement).toHaveClass("ds:max-w-md");
    expect(loadingElement).toHaveClass("ds:bg-secondary-teal");
  });

  it("renders without optional className", () => {
    render(<LoadingSlide src="/test.png" message="Test message" />);

    const loadingElement = screen.getByRole("status");

    expect(loadingElement).toBeInTheDocument();
    expect(loadingElement).toHaveClass("ds:max-w-md");
    expect(loadingElement).toHaveClass("ds:bg-secondary-teal");
  });

  it("handles different image sources", () => {
    const differentSrc = "/different-image.svg";
    render(<LoadingSlide {...defaultProps} src={differentSrc} />);

    const image = screen.getByRole("presentation");
    expect(image).toHaveAttribute("src", differentSrc);
  });

  it("handles empty message", () => {
    render(<LoadingSlide {...defaultProps} message="" />);

    const messageElement = screen.getByText((content, element) => {
      return element?.tagName.toLowerCase() === "p" && content === "";
    });
    expect(messageElement).toBeInTheDocument();
  });

  it("handles long messages", () => {
    const longMessage =
      "This is a very long loading message that might wrap to multiple lines and should still be displayed correctly within the component";
    render(<LoadingSlide {...defaultProps} message={longMessage} />);

    expect(screen.getByText(longMessage)).toBeInTheDocument();
  });
});
