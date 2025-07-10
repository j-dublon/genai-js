import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import React from "react";
import { describe, expect, it, vi } from "vitest";

import { ToolTipOrModal } from "./ToolTipOrModal";

vi.mock("@/components/HoverTooltip", () => ({
  HoverTooltip: ({
    tooltipText,
    tooltipContent,
  }: {
    tooltipText: string;
    tooltipContent: string;
  }) => (
    <div data-testid="hover-tooltip" className="hidden md:block">
      <span>{tooltipText}</span>
      <span>{tooltipContent}</span>
    </div>
  ),
}));

vi.mock("@react-component-library/ui", () => ({
  InfoModal: ({
    title,
    modalRef,
    buttonText,
    children,
  }: {
    title: string;
    modalRef: React.RefObject<HTMLDialogElement>;
    buttonText: string;
    children: React.ReactNode;
  }) => (
    <dialog ref={modalRef} data-testid="info-modal">
      <h1>{title}</h1>
      {children}
      {buttonText && (
        <button
          aria-label="Confirm and close modal"
          type="button"
          onClick={() => modalRef.current?.close()}
        >
          {buttonText}
        </button>
      )}
    </dialog>
  ),
  useClickOutside: vi.fn(),
}));

describe("ToolTipOrModal", () => {
  const tooltipText = "Test Tooltip";
  const tooltipContent = "This is the tooltip content.";

  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the desktop HoverTooltip with expected props", () => {
    render(
      <ToolTipOrModal
        tooltipText={tooltipText}
        tooltipContent={tooltipContent}
      />,
    );
    const hoverTooltip = screen.getByTestId("hover-tooltip");
    expect(hoverTooltip).toBeInTheDocument();
    expect(hoverTooltip).toHaveTextContent(tooltipText);
    expect(hoverTooltip).toHaveTextContent(tooltipContent);
  });

  it("renders mobile button with expected props and hidden on desktop", () => {
    render(
      <ToolTipOrModal
        tooltipText={tooltipText}
        tooltipContent={tooltipContent}
      />,
    );
    const button = screen.getByRole("button", { name: tooltipText });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass("md:hidden");
  });

  it("opens modal on mobile button click", async () => {
    render(
      <ToolTipOrModal
        tooltipText={tooltipText}
        tooltipContent={tooltipContent}
      />,
    );
    const button = screen.getByRole("button", { name: tooltipText });
    await userEvent.click(button);
    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
    const modal = screen.getByTestId("info-modal");
    expect(modal).toBeInTheDocument();
    expect(modal).toHaveTextContent(tooltipText);
    expect(modal).toHaveTextContent(tooltipContent);
  });
});
