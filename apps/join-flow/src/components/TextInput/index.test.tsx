import "@testing-library/jest-dom";

import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { TextInput } from "./index";

describe("TextInput Component", () => {
  it("renders input element with correct attributes", () => {
    render(
      <TextInput
        id="test-input"
        placeholder="Enter text"
        hasSubmitted={false}
      />,
    );

    const input = screen.getByPlaceholderText("Enter text");
    expect(input).toBeInTheDocument();
    expect(input).toHaveAttribute("id", "test-input");
  });

  it("forwards ref to input element", () => {
    const ref = createRef<HTMLInputElement>();
    render(
      <TextInput ref={ref} data-testid="ref-input" hasSubmitted={false} />,
    );

    expect(ref.current).not.toBeNull();
    expect(ref.current?.tagName).toBe("INPUT");
  });

  it("applies custom className", () => {
    render(
      <TextInput
        className="custom-class"
        data-testid="class-input"
        hasSubmitted={false}
      />,
    );

    const input = screen.getByTestId("class-input");
    expect(input).toHaveClass("custom-class");
  });

  it("applies correct styling when isInvalid is false", () => {
    render(
      <TextInput aria-invalid={false} data-testid="valid-input" hasSubmitted />,
    );

    const input = screen.getByTestId("valid-input");
    expect(input).toHaveClass("border-ui-teal");
    expect(input).not.toHaveClass("border-ui-error");
  });

  it("applies correct styling when isInvalid is true", () => {
    render(
      <TextInput
        aria-invalid={true}
        data-testid="invalid-input"
        hasSubmitted
      />,
    );

    const input = screen.getByTestId("invalid-input");
    expect(input).toHaveClass("border-ui-error");
    expect(input).not.toHaveClass("border-ui-teal");
  });

  it("applies default styling when validField is undefined", () => {
    render(
      <TextInput
        aria-invalid={undefined}
        data-testid="null-input"
        hasSubmitted
      />,
    );

    const input = screen.getByTestId("null-input");
    expect(input).toHaveClass("border-ui-grey-300");
    expect(input).not.toHaveClass("border-ui-teal");
    expect(input).not.toHaveClass("border-ui-error");
  });

  it("sets aria-invalid attribute correctly", () => {
    render(
      <TextInput aria-invalid={true} data-testid="aria-input" hasSubmitted />,
    );

    const input = screen.getByTestId("aria-input");
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("handles input changes correctly", () => {
    const handleChange = vi.fn();
    render(
      <TextInput
        onChange={handleChange}
        data-testid="change-input"
        hasSubmitted
      />,
    );

    const input = screen.getByTestId("change-input");
    fireEvent.change(input, { target: { value: "test value" } });

    expect(handleChange).toHaveBeenCalledTimes(1);
    expect(input).toHaveValue("test value");
  });

  it("passes other HTML attributes to input element", () => {
    render(
      <TextInput
        maxLength={10}
        placeholder="Max 10 chars"
        disabled
        data-testid="attrs-input"
        hasSubmitted={false}
      />,
    );

    const input = screen.getByTestId("attrs-input");
    expect(input).toHaveAttribute("maxLength", "10");
    expect(input).toHaveAttribute("placeholder", "Max 10 chars");
    expect(input).toBeDisabled();
  });

  it("applies default border when validField is undefined", () => {
    render(<TextInput data-testid="undefined-input" hasSubmitted={false} />);

    const input = screen.getByTestId("undefined-input");
    expect(input).toHaveClass("border-ui-grey-300");
    expect(input).not.toHaveClass("border-ui-teal");
    expect(input).not.toHaveClass("border-ui-error");
  });
});
