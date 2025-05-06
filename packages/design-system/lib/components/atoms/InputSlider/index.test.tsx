import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { InputSlider } from "./index";

describe("InputSlider", () => {
  const defaultProps = {
    value: 0,
    min: 0,
    max: 100,
    onChange: vi.fn(),
  };

  const testLabel = "Test Label";

  it("renders with default props", () => {
    render(<InputSlider {...defaultProps} />);
    const slider = screen.getByRole("slider");
    expect(slider).toBeInTheDocument();
    expect(slider).toHaveAttribute("value", "0");
    expect(slider).toHaveAttribute("min", "0");
    expect(slider).toHaveAttribute("max", "100");
  });

  it("renders with label when provided", () => {
    render(<InputSlider {...defaultProps} label={testLabel} />);
    expect(screen.getByText(testLabel)).toBeInTheDocument();
  });

  it("calls onChange when slider value changes", () => {
    render(<InputSlider {...defaultProps} />);
    const slider = screen.getByRole("slider");
    fireEvent.change(slider, { target: { value: "75" } });
    expect(defaultProps.onChange).toHaveBeenCalledWith(75);
  });

  it("displays value button when showValue is true", () => {
    render(<InputSlider {...defaultProps} />);
    const valueButton = screen.getByRole("button");
    expect(valueButton).toBeInTheDocument();
    expect(valueButton).toHaveTextContent("0");
  });

  it("hides value button when showValue is false", () => {
    render(<InputSlider {...defaultProps} showValue={false} />);
    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("disables slider and value button when disabled prop is true", () => {
    render(<InputSlider {...defaultProps} disabled />);
    const slider = screen.getByRole("slider");
    const valueButton = screen.getByRole("button");

    expect(slider).toBeDisabled();
    expect(valueButton).toBeDisabled();
  });

  it("increments value when value button is clicked", () => {
    render(<InputSlider {...defaultProps} />);
    const valueButton = screen.getByRole("button");
    fireEvent.click(valueButton);
    expect(defaultProps.onChange).toHaveBeenCalledWith(1);
  });

  it("disables value button when value equals max", () => {
    render(<InputSlider {...defaultProps} value={100} />);
    const valueButton = screen.getByRole("button");
    expect(valueButton).toBeDisabled();
    expect(valueButton).toHaveTextContent("100+");
  });

  it("applies custom className", () => {
    render(<InputSlider {...defaultProps} className="custom-class" />);
    const slider = screen.getByRole("slider");
    expect(slider).toHaveClass("custom-class");
  });
});
