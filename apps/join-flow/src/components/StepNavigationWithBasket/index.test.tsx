import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { StepNavigationWithBasket } from "./index";

vi.mock("../ReviewYourBasket", () => ({
  ReviewYourBasket: () => (
    <div data-testid="review-your-basket">Review Your Basket Mock</div>
  ),
}));

vi.mock("../Stepper", () => ({
  default: ({ showLabels }: { showLabels?: boolean }) => (
    <div data-testid="stepper" data-show-labels={showLabels}>
      Navigation Mock
    </div>
  ),
}));

vi.mock("@react-component-library/ui", () => ({
  SimpleNavBar: ({ children }: { children: React.ReactNode }) => (
    <nav data-testid="simple-nav-bar">{children}</nav>
  ),
  ColorPill: ({
    colorPillText,
    backgroundColor,
    size,
    className,
  }: {
    colorPillText: string;
    backgroundColor: string;
    size: string;
    className: string;
  }) => (
    <div
      data-testid="color-pill"
      data-text={colorPillText}
      data-background={backgroundColor}
      data-size={size}
      className={className}
    >
      {colorPillText}
    </div>
  ),
}));

describe("NavAndBasket", () => {
  const defaultProps = {
    step: 2,
  };

  it("renders with required props only", () => {
    render(<StepNavigationWithBasket {...defaultProps} />);

    expect(screen.getByTestId("simple-nav-bar")).toBeInTheDocument();
    expect(screen.getByTestId("stepper")).toBeInTheDocument();
    expect(screen.getByTestId("review-your-basket")).toBeInTheDocument();
  });

  it("displays the correct step number", () => {
    render(<StepNavigationWithBasket step={3} />);

    const stepText = screen.getByText((_, element) => {
      return element?.textContent === "Step 3 of 4";
    });
    expect(stepText).toBeInTheDocument();
  });

  it("applies correct mobile-only classes to step display", () => {
    render(<StepNavigationWithBasket {...defaultProps} />);

    const stepParagraph = screen.getByText((_, element) => {
      return element?.textContent === "Step 2 of 4";
    });
    expect(stepParagraph).toHaveClass(
      "block",
      "md:hidden",
      "text-xs",
      "leading-[1.6]",
      "font-normal",
      "text-ui-grey-500",
    );
  });

  it("does not render header section when step has no nextStepPillText", () => {
    render(<StepNavigationWithBasket step={4} />);

    expect(screen.queryByTestId("color-pill")).not.toBeInTheDocument();
    expect(screen.queryByText("What's next?")).not.toBeInTheDocument();
  });

  it("renders header section when step has nextStepPillText", () => {
    render(<StepNavigationWithBasket step={1} />);

    expect(screen.getByText("What's next?")).toBeInTheDocument();
    expect(screen.getByTestId("color-pill")).toBeInTheDocument();
    expect(screen.getByText("Adding your eero(s)")).toBeInTheDocument();
  });

  it("renders correct step text for step 2", () => {
    render(<StepNavigationWithBasket step={2} />);

    expect(screen.getByText("What's next?")).toBeInTheDocument();
    expect(screen.getByText("Switching & going live")).toBeInTheDocument();
  });

  it("renders correct step text for step 3", () => {
    render(<StepNavigationWithBasket step={3} />);

    expect(screen.getByText("What's next?")).toBeInTheDocument();
    expect(screen.getByText("Payment & join Cuckoo")).toBeInTheDocument();
  });

  it("applies correct desktop-only classes to header section", () => {
    render(<StepNavigationWithBasket step={1} />);

    const headerContainer = screen.getByText("What's next?").closest("div");
    expect(headerContainer).toHaveClass(
      "items-center",
      "gap-[2px]",
      "md:gap-2",
      "hidden",
      "md:flex",
      "md:flex-col",
    );
  });

  it("does not render step text when step exceeds totalSteps", () => {
    render(<StepNavigationWithBasket step={5} totalSteps={4} />);

    expect(
      screen.queryByText((_, element) => {
        return element?.textContent === "Step 5 of 4";
      }),
    ).not.toBeInTheDocument();
  });

  it("renders step text when step equals totalSteps", () => {
    render(<StepNavigationWithBasket step={4} totalSteps={4} />);

    const stepText = screen.getByText((_, element) => {
      return element?.textContent === "Step 4 of 4";
    });
    expect(stepText).toBeInTheDocument();
  });

  it("uses custom totalSteps value", () => {
    render(<StepNavigationWithBasket step={2} totalSteps={5} />);

    const stepText = screen.getByText((_, element) => {
      return element?.textContent === "Step 2 of 5";
    });
    expect(stepText).toBeInTheDocument();
  });

  describe("hideBasket prop", () => {
    it("hides ReviewYourBasket when hideBasket is true", () => {
      render(<StepNavigationWithBasket step={1} hideBasket={true} />);

      expect(
        screen.queryByTestId("review-your-basket"),
      ).not.toBeInTheDocument();
      expect(screen.getByTestId("stepper")).toBeInTheDocument();
    });

    it("shows ReviewYourBasket when hideBasket is false", () => {
      render(<StepNavigationWithBasket step={1} hideBasket={false} />);

      expect(screen.getByTestId("review-your-basket")).toBeInTheDocument();
    });

    it("shows ReviewYourBasket by default when hideBasket is not provided", () => {
      render(<StepNavigationWithBasket step={1} />);

      expect(screen.getByTestId("review-your-basket")).toBeInTheDocument();
    });
  });

  describe("hideLabels prop", () => {
    it("passes showLabels=false to Stepper when hideLabels is true", () => {
      render(<StepNavigationWithBasket step={1} hideLabels={true} />);

      const stepper = screen.getByTestId("stepper");
      expect(stepper).toHaveAttribute("data-show-labels", "false");
    });

    it("passes showLabels=true to Stepper when hideLabels is false", () => {
      render(<StepNavigationWithBasket step={1} hideLabels={false} />);

      const stepper = screen.getByTestId("stepper");
      expect(stepper).toHaveAttribute("data-show-labels", "true");
    });

    it("passes showLabels=true to Stepper by default when hideLabels is not provided", () => {
      render(<StepNavigationWithBasket step={1} />);

      const stepper = screen.getByTestId("stepper");
      expect(stepper).toHaveAttribute("data-show-labels", "true");
    });

    it("always passes showLabels=false when hideLabels is true, regardless of dialog state", () => {
      render(<StepNavigationWithBasket step={1} hideLabels={true} />);

      const stepper = screen.getByTestId("stepper");
      expect(stepper).toHaveAttribute("data-show-labels", "false");
    });
  });
});
