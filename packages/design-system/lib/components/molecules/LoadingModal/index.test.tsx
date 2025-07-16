import { act, render, screen } from "@testing-library/react";
import { RefObject, useState } from "react";
import {
  afterEach,
  beforeAll,
  beforeEach,
  describe,
  expect,
  it,
  vi,
} from "vitest";

import { LoadingModal, Slide } from ".";

beforeAll(() => {
  HTMLDialogElement.prototype.show = vi.fn();
  HTMLDialogElement.prototype.showModal = vi.fn();
  HTMLDialogElement.prototype.close = vi.fn();
});

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
  vi.clearAllMocks();
});

describe("LoadingModal", () => {
  const mockModalRef = {
    current: {},
  } as unknown as RefObject<HTMLDialogElement>;

  const slides: Slide[] = [
    { src: "slide1.png", message: "Loading step 1..." },
    { src: "slide2.png", message: "Loading step 2..." },
  ];

  it("renders the dialog with correct ARIA attributes", () => {
    render(
      <LoadingModal slides={slides} modalRef={mockModalRef} loading={true} />,
    );
    const dialog = document.querySelector("dialog");
    expect(dialog).toBeInTheDocument();
    expect(dialog).toHaveAttribute("role", "dialog");
    expect(dialog).toHaveAttribute("aria-modal", "true");
    expect(dialog).toHaveAttribute("aria-label", "Loading");
  });

  it("renders the current slide's message and image", () => {
    render(
      <LoadingModal slides={slides} modalRef={mockModalRef} loading={true} />,
    );
    expect(screen.getByText("Loading step 1...")).toBeInTheDocument();
    const img = screen.getAllByRole("presentation", { hidden: true })[0];
    expect(img).toHaveAttribute("src", "slide1.png");
    expect(img.parentElement).toHaveAttribute("aria-hidden", "false");
  });

  it("only the current slide is visible and has aria-live='polite'", () => {
    render(
      <LoadingModal slides={slides} modalRef={mockModalRef} loading={true} />,
    );
    const visibleSlide = screen.getByText("Loading step 1...").parentElement;
    expect(visibleSlide).toHaveAttribute("aria-live", "polite");
    expect(visibleSlide).toHaveAttribute("aria-hidden", "false");

    const hiddenSlide = screen.getByText("Loading step 2...").parentElement;
    expect(hiddenSlide).toHaveAttribute("aria-hidden", "true");
  });

  it("advances to the next slide after 3 seconds", () => {
    render(
      <LoadingModal slides={slides} modalRef={mockModalRef} loading={true} />,
    );
    // First slide visible
    expect(screen.getByText("Loading step 1...").parentElement).toHaveAttribute(
      "aria-hidden",
      "false",
    );
    expect(screen.getByText("Loading step 2...").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );

    act(() => {
      vi.advanceTimersByTime(3000);
    });

    // Second slide visible
    expect(screen.getByText("Loading step 1...").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );
    expect(screen.getByText("Loading step 2...").parentElement).toHaveAttribute(
      "aria-hidden",
      "false",
    );
  });

  it("does not advance slides when loading is false", () => {
    render(
      <LoadingModal slides={slides} modalRef={mockModalRef} loading={false} />,
    );
    act(() => {
      vi.advanceTimersByTime(3000);
    });
    // Still on the first slide
    expect(screen.getByText("Loading step 1...").parentElement).toHaveAttribute(
      "aria-hidden",
      "false",
    );
    expect(screen.getByText("Loading step 2...").parentElement).toHaveAttribute(
      "aria-hidden",
      "true",
    );
  });

  const Wrapper = ({
    slides,
    modalRef,
  }: {
    slides: Slide[];
    modalRef: RefObject<HTMLDialogElement>;
  }) => {
    const [loading, setLoading] = useState(false);
    return (
      <>
        <button onClick={() => setLoading(true)}>Start Loading</button>
        <LoadingModal slides={slides} modalRef={modalRef} loading={loading} />
      </>
    );
  };

  it("resets to first slide when loading transitions from false to true", () => {
    render(<Wrapper slides={slides} modalRef={mockModalRef} />);

    act(() => {
      screen.getByText("Start Loading").click();
    });
    expect(screen.getByText("Loading step 1...").parentElement).toHaveAttribute(
      "aria-hidden",
      "false",
    );
  });

  it("renders correctly with a single slide", () => {
    render(
      <LoadingModal
        slides={[{ src: "slide1.png", message: "Only Slide" }]}
        modalRef={mockModalRef}
        loading={true}
      />,
    );
    expect(screen.getByText("Only Slide")).toBeInTheDocument();
    expect(screen.getByText("Only Slide").parentElement).toHaveAttribute(
      "aria-hidden",
      "false",
    );
  });

  it("applies className and slidesClassName to the correct elements", () => {
    render(
      <LoadingModal
        slides={slides}
        modalRef={mockModalRef}
        loading={true}
        className="custom-modal-class"
        slidesClassName="custom-slide-class"
      />,
    );

    const modalWrapper = document.querySelector(".custom-modal-class");
    expect(modalWrapper).toBeInTheDocument();

    const currentSlide = screen.getByText("Loading step 1...").parentElement;
    expect(currentSlide).toHaveClass("custom-slide-class");
  });
});
