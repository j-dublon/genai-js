import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Radio } from ".";

describe("Radio", () => {
  const mockValue = "test";
  const mockOnChange = vi.fn();
  const mockLabel = "Test Radio";
  const mockName = "test-group";

  it("renders with label", () => {
    render(<Radio label={mockLabel} value={mockValue} />);
    expect(screen.getByText(mockLabel)).toBeInTheDocument();
  });

  it("renders with correct value", () => {
    render(<Radio label={mockLabel} value={mockValue} />);
    const radio = screen.getByRole("radio");
    expect(radio).toHaveAttribute("value", mockValue);
  });

  it("handles checked state", () => {
    render(<Radio label={mockLabel} value={mockValue} checked={true} />);
    const radio = screen.getByRole("radio");
    expect(radio).toBeChecked();
  });

  it("handles unchecked state", () => {
    render(<Radio label={mockLabel} value={mockValue} checked={false} />);
    const radio = screen.getByRole("radio");
    expect(radio).not.toBeChecked();
  });

  it("calls onChange with the correct value when clicked", () => {
    render(
      <Radio label={mockLabel} value={mockValue} onChange={mockOnChange} />,
    );
    const radio = screen.getByRole("radio");
    fireEvent.click(radio);
    expect(mockOnChange).toHaveBeenCalledWith(mockValue);
  });

  it("handles disabled state", () => {
    render(<Radio label={mockLabel} value={mockValue} disabled={true} />);
    const radio = screen.getByRole("radio");
    expect(radio).toBeDisabled();
  });

  it("applies custom className", () => {
    render(
      <Radio label={mockLabel} value={mockValue} className="custom-class" />,
    );
    const radio = screen.getByRole("radio");
    expect(radio).toHaveClass("custom-class");
  });

  it("renders with name attribute", () => {
    render(<Radio label={mockLabel} value={mockValue} name={mockName} />);
    const radio = screen.getByRole("radio");
    expect(radio).toHaveAttribute("name", mockName);
  });

  it("has the correct classes to show/hide the icon depending on the checked state", () => {
    render(<Radio label={mockLabel} value={mockValue} checked={true} />);
    const svg = document.querySelector("svg");
    expect(svg).toBeInTheDocument();
    expect(svg).toHaveClass("ds:peer-checked:block", "ds:hidden");
  });

  it("applies custom label className", () => {
    render(
      <Radio
        label={mockLabel}
        value={mockValue}
        labelClassName="custom-label-class"
      />,
    );
    const label = screen.getByText(mockLabel);
    expect(label).toHaveClass("custom-label-class");
  });
});
