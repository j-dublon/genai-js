import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { DropdownInputField } from "./index";

describe("DropdownInputField", () => {
  const defaultProps = {
    isOpen: false,
    placeholderText: "Select an option",
    setIsOpen: vi.fn(),
  };

  it("renders with placeholder text when no value is provided", () => {
    render(<DropdownInputField {...defaultProps} />);
    expect(screen.getByText("Select an option")).toBeInTheDocument();
  });

  it("renders with value when provided", () => {
    render(<DropdownInputField {...defaultProps} value="Selected Value" />);
    expect(screen.getByText("Selected Value")).toBeInTheDocument();
  });

  it("calls setIsOpen when clicked", () => {
    render(<DropdownInputField {...defaultProps} />);
    fireEvent.click(screen.getByRole("button"));
    expect(defaultProps.setIsOpen).toHaveBeenCalledWith(true);
  });

  it("shows tick icon when value is provided and showTick is true", () => {
    render(
      <DropdownInputField
        {...defaultProps}
        value="Selected Value"
        showTick={true}
      />,
    );
    expect(screen.getByTestId("tick-icon")).toBeInTheDocument();
  });

  it("does not show tick icon when showTick is false", () => {
    render(
      <DropdownInputField
        {...defaultProps}
        value="Selected Value"
        showTick={false}
      />,
    );
    expect(screen.queryByTestId("tick-icon")).not.toBeInTheDocument();
  });

  it("rotates arrow icon when isOpen is true", () => {
    render(<DropdownInputField {...defaultProps} isOpen={true} />);
    const arrowIcon = screen.getByTestId("arrow-icon");
    expect(arrowIcon).toHaveClass("ds:rotate-180");
  });

  it("does not rotate arrow icon when isOpen is false", () => {
    render(<DropdownInputField {...defaultProps} isOpen={false} />);
    const arrowIcon = screen.getByTestId("arrow-icon");
    expect(arrowIcon).not.toHaveClass("ds:rotate-180");
  });
});
