import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { FieldErrors, UseFormRegister } from "react-hook-form";
import { beforeEach, describe, expect, it, vi } from "vitest";

import PersonalDetails from "..";
import { EmailVerificationForm } from "./emailVerificationForm";

const NUM_FIELDS = 6;

const defaultProps = {
  verificationSection: {
    title: "Verify your email",
    description: "Enter the code we sent to your email",
    tipCardText: "We sent a code to",
    inputLabelText: "Verification code",
  },
  isVerified: false,
  isCodeValid: undefined,
  onVerificationSuccess: vi.fn(),
  currentEmail: "test@example.com",
  handleBack: vi.fn(),
  validateCode: vi.fn(),
  handleCodeChange: vi.fn(),
  handleResendCode: vi.fn(),
  register: vi.fn() as unknown as UseFormRegister<PersonalDetails>,
  errors: {} as FieldErrors<PersonalDetails>,
};

describe("EmailVerificationForm", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all inputs and texts", () => {
    render(<EmailVerificationForm {...defaultProps} />);

    expect(
      screen.getByText(defaultProps.verificationSection.title),
    ).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.verificationSection.description),
    ).toBeInTheDocument();
    expect(screen.getByText(defaultProps.currentEmail)).toBeInTheDocument();
    expect(
      screen.getByText(defaultProps.verificationSection.inputLabelText),
    ).toBeInTheDocument();

    const inputs = screen.getAllByRole("textbox");
    expect(inputs).toHaveLength(NUM_FIELDS);
  });

  it("calls onVerificationSuccess if isVerified is true on mount", () => {
    render(<EmailVerificationForm {...defaultProps} isVerified={true} />);
    expect(defaultProps.onVerificationSuccess).toHaveBeenCalledTimes(1);
  });

  it("updates input values and moves focus on input", async () => {
    render(<EmailVerificationForm {...defaultProps} />);

    const inputs = screen.getAllByRole("textbox");

    await userEvent.type(inputs[0], "a");
    expect(inputs[0]).toHaveValue("a");

    expect(document.activeElement).toBe(inputs[1]);

    await userEvent.type(inputs[1], "b");
    expect(inputs[1]).toHaveValue("b");

    expect(defaultProps.validateCode).not.toHaveBeenCalled();
  });

  it("calls validateCode when all inputs are filled", async () => {
    render(<EmailVerificationForm {...defaultProps} />);

    const inputs = screen.getAllByRole("textbox");

    for (let i = 0; i < NUM_FIELDS; i++) {
      await userEvent.type(inputs[i], String(i + 1));
    }

    const expectedCode = Array(NUM_FIELDS)
      .fill("")
      .map((_, i) => String(i + 1))
      .join("");

    await waitFor(() => {
      expect(defaultProps.validateCode).toHaveBeenCalledWith(expectedCode);
    });
  });

  it("handles backspace correctly", async () => {
    render(<EmailVerificationForm {...defaultProps} />);

    const inputs = screen.getAllByRole("textbox");

    await userEvent.type(inputs[0], "A");
    expect(inputs[0]).toHaveValue("A");

    fireEvent.keyDown(inputs[0], { key: "Backspace" });
    expect(inputs[0]).toHaveValue("");

    fireEvent.keyDown(inputs[0], { key: "Backspace" });
    expect(document.activeElement).toBe(inputs[1]);

    await userEvent.type(inputs[0], "A");
    await userEvent.type(inputs[1], "B");

    inputs[1].focus();
    fireEvent.keyDown(inputs[1], { key: "Backspace" });
    expect(inputs[1]).toHaveValue("");

    fireEvent.keyDown(inputs[1], { key: "Backspace" });
    expect(document.activeElement).toBe(inputs[0]);
    expect(inputs[0]).toHaveValue("");
  });

  it("handles paste event and calls validateCode", async () => {
    render(<EmailVerificationForm {...defaultProps} />);

    const inputs = screen.getAllByRole("textbox");

    const pasteData = "ABC123";

    const clipboardData = {
      getData: vi.fn(() => pasteData),
    };
    const pasteEvent = new Event("paste", {
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(pasteEvent, "clipboardData", {
      value: clipboardData,
    });

    inputs[0].focus();
    fireEvent(inputs[0], pasteEvent);

    await waitFor(() => {
      expect(inputs[0]).toHaveValue("A");
      expect(inputs[1]).toHaveValue("B");
      expect(inputs[2]).toHaveValue("C");
      expect(inputs[3]).toHaveValue("1");
      expect(inputs[4]).toHaveValue("2");
      expect(inputs[5]).toHaveValue("3");
    });

    expect(defaultProps.validateCode).toHaveBeenCalledWith(pasteData);
  });

  it("displays success message when isCodeValid true", () => {
    render(<EmailVerificationForm {...defaultProps} isCodeValid={true} />);

    expect(
      screen.getByText(/Lovely – that['’]s just the code we['’]re after/i),
    ).toBeInTheDocument();
  });

  it("displays resend message when isCodeValid false", () => {
    render(<EmailVerificationForm {...defaultProps} isCodeValid={false} />);

    expect(
      screen.getByText(/You should receive your code within 2 minutes/i),
    ).toBeInTheDocument();
  });

  it("calls handleBack when back button clicked", async () => {
    render(<EmailVerificationForm {...defaultProps} />);

    const button = screen.getByRole("button", {
      name: /I want to use a different email address/i,
    });

    await userEvent.click(button);

    expect(defaultProps.handleBack).toHaveBeenCalled();
  });
});
