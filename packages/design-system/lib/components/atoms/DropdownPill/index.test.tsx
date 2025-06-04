import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DropdownPill } from "./index";

describe("DropdownPill", () => {
  const defaultProps = {
    isOpen: false,
    setIsOpen: vi.fn(),
    value: "Test Value",
    setValue: vi.fn(),
    options: ["Option 1", "Option 2", "Option 3"],
  };

  it("renders with default props", () => {
    render(<DropdownPill {...defaultProps} />);

    expect(screen.getByText("Test Value")).toBeInTheDocument();
    expect(screen.getByRole("button")).toHaveAttribute(
      "aria-label",
      "Dropdown menu pill with the text Test Value",
    );
  });

  it("opens dropdown when clicked", () => {
    render(<DropdownPill {...defaultProps} />);

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(defaultProps.setIsOpen).toHaveBeenCalledWith(true);
  });

  it("displays options when open", () => {
    render(<DropdownPill {...defaultProps} isOpen={true} />);

    defaultProps.options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("selects an option and closes dropdown when option is clicked", () => {
    render(<DropdownPill {...defaultProps} isOpen={true} />);

    const option = screen.getByText("Option 1");
    fireEvent.click(option);

    expect(defaultProps.setValue).toHaveBeenCalledWith("Option 1");
    expect(defaultProps.setIsOpen).toHaveBeenCalledWith(false);
  });

  it("applies white text styles when whiteText prop is true", () => {
    render(<DropdownPill {...defaultProps} whiteText={true} />);

    const text = screen.getByText("Test Value");
    expect(text).toHaveClass("ds:text-core-white");
  });

  it("applies custom className", () => {
    const customClass = "custom-class";
    render(<DropdownPill {...defaultProps} className={customClass} />);

    const button = screen.getByRole("button");
    expect(button).toHaveClass(customClass);
  });

  it("renders without padding when noPadding is true", () => {
    render(<DropdownPill {...defaultProps} noPadding={true} />);

    const button = screen.getByRole("button");
    expect(button).not.toHaveClass("ds:px-4");
    expect(button).not.toHaveClass("ds:py-2");
  });

  it("uses custom aria label when provided", () => {
    const customAriaLabel = "Custom Label";
    render(<DropdownPill {...defaultProps} ariaLabel={customAriaLabel} />);

    const text = screen.getByText("Test Value");
    expect(text).toHaveAttribute("aria-label", customAriaLabel);
  });
});
