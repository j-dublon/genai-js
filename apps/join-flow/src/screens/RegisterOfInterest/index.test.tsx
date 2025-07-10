import { render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { RegisterOfInterest } from ".";
import type { RegisterOfInterestFormProps } from "./components/RegisterOfInterestForm";
import type { ToolTipOrModalProps } from "./components/ToolTipOrModal";

const mockTrustpilotScore = vi.hoisted(() =>
  vi.fn().mockReturnValue({
    data: {
      trustScore: 4.8,
      numberOfReviews: 1234,
    },
    isLoading: false,
    error: null,
  }),
);

vi.mock("./components/RegisterOfInterestForm", () => ({
  RegisterOfInterestForm: (props: RegisterOfInterestFormProps) => (
    <div data-testid="mock-register-of-interest-form">
      {Object.entries(props).map(([key, value]) => (
        <p key={key}>{String(value)}</p>
      ))}
    </div>
  ),
}));

vi.mock("./components/ToolTipOrModal", () => ({
  ToolTipOrModal: (props: ToolTipOrModalProps) => (
    <div data-testid="mock-tooltip-or-modal">
      {Object.entries(props).map(([key, value]) => (
        <p key={key}>{String(value)}</p>
      ))}
    </div>
  ),
}));

vi.mock("@react-component-library/ui", async () => {
  const actual = await vi.importActual("@react-component-library/ui");
  return {
    ...actual,
    TrustpilotHorizontal: (props: Record<string, unknown>) => (
      <div data-testid="mock-trustpilot-horizontal" {...props} />
    ),
    useTrustpilotScore: mockTrustpilotScore,
    SimpleNavBar: () => <nav data-testid="mock-simple-navbar" />,
  };
});

describe("RegisterOfInterest", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it.each([["not-shown"], ["cannot-service-address"], ["unavailable"]])(
    "renders correctly for source '%s'",
    (source) => {
      render(
        <RegisterOfInterest
          source={
            source as "not-shown" | "cannot-service-address" | "unavailable"
          }
        />,
      );
      expect(
        screen.getByTestId("mock-register-of-interest-form"),
      ).toBeInTheDocument();
      expect(screen.getByTestId("mock-tooltip-or-modal")).toBeInTheDocument();
      expect(screen.getByTestId("mock-simple-navbar")).toBeInTheDocument();
      expect(
        screen.getByTestId("mock-trustpilot-horizontal"),
      ).toBeInTheDocument();
      expect(screen.getByTestId(`${source}-roi`)).toBeInTheDocument();
    },
  );

  it("does not render TrustpilotHorizontal if no trustScore", async () => {
    mockTrustpilotScore.mockReturnValue({
      data: null,
      isLoading: false,
      error: "Error fetching Trustpilot data",
    });
    render(<RegisterOfInterest source="not-shown" />);
    expect(
      screen.queryByTestId("mock-trustpilot-horizontal"),
    ).not.toBeInTheDocument();
  });
});
