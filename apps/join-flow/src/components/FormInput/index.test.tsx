import { render, screen } from "@testing-library/react";
import React from "react";
import type { FieldError } from "react-hook-form";
import { describe, expect, it, vi } from "vitest";

import FormInput, { FormInputProps } from "./";

vi.mock("@react-component-library/ui/icons", () => ({
  TickWithCircle: (props: {
    width: number;
    height: number;
    circleFill: string;
  }) => <svg data-testid="tick-icon" {...props} />,
  InfoIcon: (props: { color: string; height: number; width: number }) => (
    <svg data-testid="info-icon" {...props} />
  ),
}));
vi.mock("../Tooltip", () => ({
  ToolTip: (props: {
    gap: number;
    content: string;
    children: React.ReactNode;
  }) => (
    <span
      data-testid="tooltip"
      data-gap={props.gap}
      data-content={props.content}
    >
      {props.children}
    </span>
  ),
}));

const baseProps: FormInputProps = {
  id: "test-input",
  placeholder: "Type here...",
};

describe("FormInput", () => {
  it("renders the input with given props", () => {
    render(<FormInput {...baseProps} />);
    const input = screen.getByPlaceholderText(
      "Type here...",
    ) as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.id).toBe("test-input");
    expect(input).toHaveAttribute("aria-invalid", "false");
  });

  it("renders error border and error message", () => {
    const error: FieldError = { type: "required", message: "This is required" };
    render(<FormInput {...baseProps} error={error} />);
    const input = screen.getByPlaceholderText("Type here...");
    expect(input).toHaveClass("border-ui-error");
    expect(screen.getByText("This is required")).toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("renders error border and no error message if showErrorMessages is false", () => {
    const error: FieldError = { type: "required", message: "This is required" };
    render(
      <FormInput {...baseProps} error={error} showErrorMessages={false} />,
    );
    const input = screen.getByPlaceholderText("Type here...");
    expect(input).toHaveClass("border-ui-error");
    expect(screen.queryByText("This is required")).not.toBeInTheDocument();
    expect(input).toHaveAttribute("aria-invalid", "true");
  });

  it("renders tick icon if no error", () => {
    render(<FormInput hasSubmitted={true} {...baseProps} />);
    expect(screen.getByTestId("tick-icon")).toBeInTheDocument();
    expect(screen.queryByTestId("tooltip")).not.toBeInTheDocument();
    expect(screen.queryByTestId("info-icon")).not.toBeInTheDocument();
  });

  it("renders tooltip and info icon if iconTooltip is provided and not valid", () => {
    render(
      <FormInput error={{ type: "max" }} {...baseProps} iconTooltip="Why?" />,
    );
    expect(screen.getByTestId("tooltip")).toBeInTheDocument();
    expect(screen.getAllByTestId("info-icon")[0]).toBeInTheDocument();
    expect(screen.getByTestId("tooltip")).toHaveAttribute(
      "data-content",
      "Why?",
    );
  });

  it("forwards additional props to input", () => {
    render(
      <FormInput {...baseProps} type="email" data-testid="custom-input" />,
    );
    const input = screen.getByTestId("custom-input") as HTMLInputElement;
    expect(input.type).toBe("email");
  });

  it("applies custom className", () => {
    render(<FormInput {...baseProps} className="custom-class" />);
    const input = screen.getByPlaceholderText("Type here...");
    expect(input).toHaveClass("custom-class");
  });
});
