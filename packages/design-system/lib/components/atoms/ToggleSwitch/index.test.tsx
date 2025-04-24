import { fireEvent, render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { ToggleSwitch } from "./index";

describe("ToggleSwitch", () => {
  const defaultProps = {
    isOn: false,
    onChange: vi.fn(),
    leftLabel: "Off",
    rightLabel: "On",
  };

  it("renders correctly with default props", () => {
    render(<ToggleSwitch {...defaultProps} />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toBeInTheDocument();
    expect(toggle).toHaveAttribute("aria-checked", "false");
  });

  it("renders with isOn prop", () => {
    render(<ToggleSwitch {...defaultProps} isOn={true} />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveAttribute("aria-checked", "true");
  });

  it("calls onChange when clicked", () => {
    const handleChange = vi.fn();
    render(<ToggleSwitch {...defaultProps} onChange={handleChange} />);
    const toggle = screen.getByRole("switch");
    fireEvent.click(toggle);
    expect(handleChange).toHaveBeenCalledWith(true);
  });

  it("renders with custom labels", () => {
    render(
      <ToggleSwitch {...defaultProps} leftLabel="Left" rightLabel="Right" />,
    );
    expect(screen.getByText("Left")).toBeInTheDocument();
    expect(screen.getByText("Right")).toBeInTheDocument();
  });

  it("positions the black pill correctly when isOn is true", () => {
    render(<ToggleSwitch {...defaultProps} isOn={true} />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveClass("ds:before:right-1");
  });

  it("positions the black pill correctly when isOn is false", () => {
    render(<ToggleSwitch {...defaultProps} isOn={false} />);
    const toggle = screen.getByRole("switch");
    expect(toggle).toHaveClass("ds:before:left-1");
  });

  it("applies correct text color based on isOn state", () => {
    render(
      <ToggleSwitch
        {...defaultProps}
        isOn={true}
        leftLabel="Left"
        rightLabel="Right"
      />,
    );
    const leftLabel = screen.getByText("Left");
    const rightLabel = screen.getByText("Right");

    expect(leftLabel).toHaveClass("ds:text-core-black");
    expect(rightLabel).toHaveClass("ds:text-core-white");
  });

  it("applies correct text color when isOn is false", () => {
    render(
      <ToggleSwitch
        {...defaultProps}
        isOn={false}
        leftLabel="Left"
        rightLabel="Right"
      />,
    );
    const leftLabel = screen.getByText("Left");
    const rightLabel = screen.getByText("Right");

    expect(leftLabel).toHaveClass("ds:text-core-white");
    expect(rightLabel).toHaveClass("ds:text-core-black");
  });
});
