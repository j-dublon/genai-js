import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import {
  RegisterOfInterestForm,
  RegisterOfInterestFormProps,
} from "./RegisterOfInterestForm";

vi.mock("@react-component-library/ui", async () => {
  const actual = await vi.importActual("@react-component-library/ui");
  return {
    ...actual,
    TipCard: ({ children }: { children: React.ReactNode }) => (
      <div data-testid="mock-tip-card">{children}</div>
    ),
    Button: ({
      children,
      ...props
    }: { children: React.ReactNode } & Record<string, unknown>) => (
      <button data-testid="mock-button" {...props}>
        {children}
      </button>
    ),
  };
});

vi.mock("@/hooks/useRoiAddress", () => ({
  useRoiAddress: () => ({ postcode: "AB12 3CD" }),
}));

vi.mock("@/store/useJoinFlowStore", () => ({
  __esModule: true,
  default: () => ({ affiliateSession: { affiliateName: "test-affiliate" } }),
}));

const user = userEvent.setup();

describe("RegisterOfInterestForm", () => {
  const defaultProps: RegisterOfInterestFormProps = {
    source: "not-shown",
    buttonText: "Submit",
    privacyNoticeText: "Here's a link to the Privacy Notice",
    privacyNoticeLinkText: "Privacy Notice",
    privacyNoticeUrl: "https://example.com/privacy",
    errorTipCardTitle: "Error!",
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders all required fields and the submit button", () => {
    render(<RegisterOfInterestForm {...defaultProps} />);
    expect(screen.getByPlaceholderText("Full name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Phone number (optional)"),
    ).toBeInTheDocument();
    const submitButton = screen.getByTestId("mock-button");
    expect(submitButton).toBeInTheDocument();
    expect(submitButton).toHaveTextContent("Submit");
    const privacyNoticeLink = screen.getByText(/Privacy Notice/i);
    expect(privacyNoticeLink).toBeInTheDocument();
    expect(privacyNoticeLink).toHaveAttribute(
      "href",
      "https://example.com/privacy",
    );
    expect(privacyNoticeLink).toHaveAttribute("target", "_blank");
    expect(privacyNoticeLink).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("shows error message tipCard when submitting empty form", async () => {
    render(<RegisterOfInterestForm {...defaultProps} />);
    await user.click(screen.getByTestId("mock-button"));
    const errorTipCard = await screen.findByTestId("mock-tip-card");
    expect(errorTipCard).toBeInTheDocument();
    expect(
      within(errorTipCard).getByText("Full name is required"),
    ).toBeInTheDocument();
    expect(
      within(errorTipCard).getByText("Invalid email address"),
    ).toBeInTheDocument();
  });

  it("submits the form with valid data", async () => {
    render(<RegisterOfInterestForm {...defaultProps} />);
    await user.type(screen.getByPlaceholderText("Full name"), "John Doe");
    await user.type(screen.getByPlaceholderText("Email"), "john@example.com");
    await user.type(
      screen.getByPlaceholderText("Phone number (optional)"),
      "07123456789",
    );
    await user.click(screen.getByTestId("mock-button"));
    expect(screen.queryByTestId("mock-tip-card")).not.toBeInTheDocument();
  });
});
