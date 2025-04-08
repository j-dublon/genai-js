import { fireEvent, render, screen } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getAssetPath } from "@/lib/get-asset-path";

import { NavWrapper } from "./index";
import { props } from "./NavWrapperProps";

describe("NavWrapper", () => {
  beforeAll(() => {
    HTMLDialogElement.prototype.show = vi.fn();
    HTMLDialogElement.prototype.showModal = vi.fn();
    HTMLDialogElement.prototype.close = vi.fn();
  });

  beforeEach(() => {
    vi.clearAllMocks();
  });

  afterAll(() => {
    vi.clearAllMocks();
  });

  it("renders the SimpleNavBar with correct props", () => {
    render(<NavWrapper />);

    const logo = screen.getByAltText("Cuckoo");
    expect(logo).toBeInTheDocument();
    expect(logo).toHaveAttribute("src", getAssetPath("/images/cuckoo.svg"));

    const infoButton = screen.getByText(props.infoText);
    expect(infoButton).toBeInTheDocument();

    const additionalInfo = screen.getByText(props.additionalInfoText);
    expect(additionalInfo).toBeInTheDocument();
  });

  it("renders the InfoModal with correct props", () => {
    render(<NavWrapper />);

    expect(screen.getByText(props.title)).toBeInTheDocument();
    expect(screen.getByText(props.subtitle)).toBeInTheDocument();
    expect(screen.getByText(props.content)).toBeInTheDocument();
    expect(screen.getByText(props.buttonText)).toBeInTheDocument();

    const modal = screen.getByText(props.title).closest("dialog");
    expect(modal).toBeInTheDocument();
    expect(modal).not.toHaveAttribute("open");
  });

  it("has a clickable info button that opens the modal", () => {
    render(<NavWrapper />);

    const infoButton = screen.getByText(props.infoText);
    expect(infoButton).toBeInTheDocument();

    const modal = screen.getByText(props.title).closest("dialog");
    expect(modal).toBeInTheDocument();
    expect(modal).not.toHaveAttribute("open");

    fireEvent.click(infoButton);

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();
  });

  it("closes the modal when clicking outside", () => {
    render(<NavWrapper />);

    const infoButton = screen.getByText(props.infoText);

    fireEvent.click(infoButton);

    expect(HTMLDialogElement.prototype.showModal).toHaveBeenCalled();

    const dialogElement = document.querySelector("dialog");
    if (dialogElement) {
      dialogElement.setAttribute("open", "");
    }

    // Simulate a click outside the modal
    fireEvent.mouseDown(document.body, { clientX: 1, clientY: 1 });

    expect(HTMLDialogElement.prototype.close).toHaveBeenCalled();
  });
});
