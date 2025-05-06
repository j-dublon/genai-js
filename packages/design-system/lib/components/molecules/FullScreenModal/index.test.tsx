import { fireEvent, render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, it, vi } from "vitest";

import { FullScreenModal } from "./index";

describe("FullScreenModal", () => {
  const mockTitle = "Test Modal";
  const mockModalRef = createRef<HTMLDialogElement>();

  it("renders with the correct title", () => {
    render(
      <FullScreenModal title={mockTitle} modalRef={mockModalRef}>
        <div>Modal content</div>
      </FullScreenModal>,
    );

    expect(screen.getByText(mockTitle)).toBeInTheDocument();
  });

  it("renders children content", () => {
    const childContent = "Modal content";
    render(
      <FullScreenModal title={mockTitle} modalRef={mockModalRef}>
        <div>{childContent}</div>
      </FullScreenModal>,
    );

    expect(screen.getByText(childContent)).toBeInTheDocument();
  });

  it("has correct accessibility attributes", () => {
    render(
      <FullScreenModal title={mockTitle} modalRef={mockModalRef}>
        <div>Modal content</div>
      </FullScreenModal>,
    );

    const dialog = document.querySelector("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-label", `${mockTitle} modal`);
    expect(dialog).toHaveAttribute("role", "dialog");

    const closeButton = screen.getByLabelText("Close modal");
    expect(closeButton).toBeInTheDocument();
  });

  it("closes the modal when close button is clicked", () => {
    const mockClose = vi.fn();
    Object.defineProperty(HTMLDialogElement.prototype, "close", {
      value: mockClose,
      writable: true,
    });

    render(
      <FullScreenModal title={mockTitle} modalRef={mockModalRef}>
        <div>Modal content</div>
      </FullScreenModal>,
    );

    const closeButton = screen.getByLabelText("Close modal");
    fireEvent.click(closeButton);

    expect(mockClose).toHaveBeenCalled();
  });

  it("renders with correct styling classes", () => {
    render(
      <FullScreenModal title={mockTitle} modalRef={mockModalRef}>
        <div>Modal content</div>
      </FullScreenModal>,
    );

    const dialog = document.querySelector("dialog");
    expect(dialog).toHaveClass(
      "ds:bg-[#3B3B3B]",
      "ds:max-w-[100vw]",
      "ds:max-h-[100vh]",
      "ds:w-full",
      "ds:h-full",
    );

    const title = screen.getByText(mockTitle);
    expect(title).toHaveClass("ds:text-core-white");

    const contentContainer = screen.getByText("Modal content").parentElement;
    expect(contentContainer).toHaveClass("ds:bg-core-white", "ds:rounded-lg");
  });
});
