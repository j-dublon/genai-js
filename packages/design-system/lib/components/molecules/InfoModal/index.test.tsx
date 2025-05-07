import { fireEvent, render, screen } from "@testing-library/react";
import { RefObject } from "react";
import { describe, expect, it, vi } from "vitest";

import { InfoModal } from "./index";

describe("InfoModal component", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  const mockModalRef = {
    current: {},
  } as unknown as RefObject<HTMLDialogElement>;

  const defaultProps = {
    title: "Test Modal Title",
    modalRef: mockModalRef,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders with required props", () => {
    render(
      <InfoModal {...defaultProps}>
        <p>Test modal content</p>
      </InfoModal>,
    );

    expect(screen.getByText("Test Modal Title")).toBeInTheDocument();
    expect(screen.getByText("Test modal content")).toBeInTheDocument();
    expect(screen.getByLabelText("Close modal")).toBeInTheDocument();
  });

  it("renders with optional button text", () => {
    render(
      <InfoModal {...defaultProps} buttonText="Close">
        <p>Test modal content</p>
      </InfoModal>,
    );

    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("calls close method when close button is clicked", () => {
    render(
      <InfoModal {...defaultProps}>
        <p>Test modal content</p>
      </InfoModal>,
    );

    const closeButton = screen.getByLabelText("Close modal");
    fireEvent.click(closeButton);

    expect(mockModalRef.current.close).toHaveBeenCalledTimes(1);
  });

  it("calls close method and onButtonClick when button is clicked", () => {
    const onButtonClick = vi.fn();
    render(
      <InfoModal
        {...defaultProps}
        buttonText="Close"
        onButtonClick={onButtonClick}
      >
        <p>Test modal content</p>
      </InfoModal>,
    );

    const button = screen.getByText("Close");
    fireEvent.click(button);

    expect(mockModalRef.current.close).toHaveBeenCalledTimes(1);
    expect(onButtonClick).toHaveBeenCalledTimes(1);
  });

  it("has correct ARIA attributes", () => {
    render(
      <InfoModal {...defaultProps}>
        <p>Test modal content</p>
      </InfoModal>,
    );

    const dialog = document.querySelector("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });
});
