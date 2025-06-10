import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import {
  type ModalContent,
  ModalContent as ModalContentComponent,
} from "@/components/ModalContent";

describe("ModalContent Component", () => {
  it("renders multiple content items correctly", () => {
    const mockContent: ModalContent[] = [
      { title: "First Title", text: "First text content" },
      { title: "Second Title", text: "Second text content" },
    ];

    render(<ModalContentComponent content={mockContent} />);

    expect(screen.getByText("First Title")).toBeInTheDocument();
    expect(screen.getByText("Second Title")).toBeInTheDocument();

    expect(screen.getByText("First text content")).toBeInTheDocument();
    expect(screen.getByText("Second text content")).toBeInTheDocument();
  });

  it("renders a single content item correctly", () => {
    const mockContent: ModalContent[] = [
      { title: "Solo Title", text: "Solo text content" },
    ];

    render(<ModalContentComponent content={mockContent} />);

    expect(screen.getByText("Solo Title")).toBeInTheDocument();
    expect(screen.getByText("Solo text content")).toBeInTheDocument();
  });

  it("renders nothing when content array is empty", () => {
    const mockContent: ModalContent[] = [];

    const { container } = render(
      <ModalContentComponent content={mockContent} />,
    );

    expect(container.firstChild).toHaveClass("bg-ui-grey-100");
    expect(container.firstChild?.childNodes.length).toBe(0);
  });

  it("assigns correct IDs to content elements", () => {
    const mockContent: ModalContent[] = [
      { title: "First Title", text: "First text content" },
      { title: "Second Title", text: "Second text content" },
    ];

    render(<ModalContentComponent content={mockContent} />);

    expect(screen.getByText("First Title")).toHaveAttribute(
      "id",
      "modal-subtitle-0",
    );
    expect(screen.getByText("Second Title")).toHaveAttribute(
      "id",
      "modal-subtitle-1",
    );
    expect(screen.getByText("First text content")).toHaveAttribute(
      "id",
      "modal-content-0",
    );
    expect(screen.getByText("Second text content")).toHaveAttribute(
      "id",
      "modal-content-1",
    );
  });
});
