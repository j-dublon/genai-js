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
    content: "Test modal content",
    modalRef: mockModalRef,
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders with required props", () => {
    render(<InfoModal {...defaultProps} />);

    expect(screen.getByText("Test Modal Title")).toBeInTheDocument();
    expect(screen.getByText("Test modal content")).toBeInTheDocument();
    expect(screen.getByLabelText("Close modal")).toBeInTheDocument();
  });

  it("renders with optional subtitle", () => {
    render(<InfoModal {...defaultProps} subtitle="Test subtitle" />);

    expect(screen.getByText("Test subtitle")).toBeInTheDocument();
  });

  it("renders with optional image", () => {
    render(<InfoModal {...defaultProps} image="test-image.jpg" />);

    const image = screen.getByAltText("Modal Image");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute("src", "test-image.jpg");
  });

  it("renders with optional button text", () => {
    render(<InfoModal {...defaultProps} buttonText="Close" />);

    expect(screen.getByText("Close")).toBeInTheDocument();
  });

  it("calls close method when close button is clicked", () => {
    render(<InfoModal {...defaultProps} />);

    const closeButton = screen.getByLabelText("Close modal");
    fireEvent.click(closeButton);

    expect(mockModalRef.current.close).toHaveBeenCalledTimes(1);
  });

  it("calls close method when button is clicked", () => {
    render(<InfoModal {...defaultProps} buttonText="Close" />);

    const button = screen.getByText("Close");
    fireEvent.click(button);

    expect(mockModalRef.current.close).toHaveBeenCalledTimes(1);
  });

  it("has correct ARIA attributes", () => {
    render(<InfoModal {...defaultProps} subtitle="Test subtitle" />);

    const dialog = document.querySelector("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
    expect(dialog).toHaveAttribute(
      "aria-describedby",
      "modal-subtitle modal-content",
    );
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });

  it("has correct ARIA attributes without subtitle", () => {
    render(<InfoModal {...defaultProps} />);

    const dialog = document.querySelector("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("aria-labelledby", "modal-title");
    expect(dialog).toHaveAttribute("aria-describedby", "modal-content");
    expect(dialog).toHaveAttribute("aria-modal", "true");
  });
});
