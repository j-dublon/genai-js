import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Checkbox } from ".";

describe("Checkbox", () => {
  const mockValue = "test";
  const mockOnChange = vi.fn();
  const mockLabel = "Test Checkbox";
  const mockName = "test-group";

  it("renders with label", () => {
    render(<Checkbox label={mockLabel} value={mockValue} />);
    expect(screen.getByText(mockLabel)).toBeInTheDocument();
  });

  it("renders with correct value", () => {
    render(<Checkbox label={mockLabel} value={mockValue} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("value", mockValue);
  });

  it("handles checked state", () => {
    render(<Checkbox label={mockLabel} value={mockValue} checked={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeChecked();
  });

  it("handles unchecked state", () => {
    render(<Checkbox label={mockLabel} value={mockValue} checked={false} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).not.toBeChecked();
  });

  it("calls onChange when clicked", () => {
    render(
      <Checkbox label={mockLabel} value={mockValue} onChange={mockOnChange} />,
    );
    const checkbox = screen.getByRole("checkbox");
    fireEvent.click(checkbox);
    expect(mockOnChange).toHaveBeenCalledWith(true);
  });

  it("handles disabled state", () => {
    render(<Checkbox label={mockLabel} value={mockValue} disabled={true} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toBeDisabled();
  });

  it("applies custom className", () => {
    render(
      <Checkbox label={mockLabel} value={mockValue} className="custom-class" />,
    );
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveClass("custom-class");
  });

  it("renders with name attribute", () => {
    render(<Checkbox label={mockLabel} value={mockValue} name={mockName} />);
    const checkbox = screen.getByRole("checkbox");
    expect(checkbox).toHaveAttribute("name", mockName);
  });

  it("has the correct classes to show/hide the icon depending on the checked state", () => {
    render(<Checkbox label={mockLabel} value={mockValue} checked={true} />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("ds:peer-checked:block", "ds:hidden");
  });

  it("applies custom label className", () => {
    render(
      <Checkbox
        label={mockLabel}
        value={mockValue}
        labelClassName="custom-label-class"
      />,
    );
    const label = screen.getByText(mockLabel);
    expect(label).toHaveClass("custom-label-class");
  });
});
