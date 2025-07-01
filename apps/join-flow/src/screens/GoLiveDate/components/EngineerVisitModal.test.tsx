import { render, screen } from "@testing-library/react";
import { createRef } from "react";
import { describe, expect, test, vi } from "vitest";

import { EngineerVisitModal } from "./EngineerVisitModal";

vi.mock("@react-component-library/ui", async () => {
  const actual = await vi.importActual("@react-component-library/ui");
  return {
    ...actual,
    InfoModal: vi.fn(({ title, buttonText, children }) => (
      <div data-testid="info-modal" role="dialog" aria-labelledby="modal-title">
        <h2 id="modal-title" className="modal-title">
          {title}
        </h2>
        <div className="modal-content">{children}</div>
        <button type="button" className="modal-button">
          {buttonText}
        </button>
      </div>
    )),
  };
});

const mockModalContent = {
  title: "Mock Modal Title",
  paragraphs: [
    "This is the first paragraph of mock content.",
    "This is the second paragraph with important information.",
    "This paragraph introduces a list below:",
    "First list item with mock content",
    "Second list item with mock content",
    "This paragraph contains a link to more information about the mock topic. Here's what happens on the day of the installation/activation?",
  ],
  link: "https://example.com/mock-link",
  buttonText: "Mock Button Text",
};

describe("EngineerVisitModal", () => {
  const renderComponent = (modalContent = mockModalContent) => {
    const modalRef = createRef<HTMLDialogElement>();
    return render(
      <EngineerVisitModal modalRef={modalRef} modalContent={modalContent} />,
    );
  };

  describe("Modal Structure", () => {
    test("renders InfoModal with correct title and button", () => {
      renderComponent();

      expect(screen.getByTestId("info-modal")).toBeInTheDocument();
      expect(screen.getByText(mockModalContent.title)).toBeInTheDocument();
      expect(screen.getByText(mockModalContent.buttonText)).toBeInTheDocument();
    });
  });

  describe("Content Rendering", () => {
    test("renders first three paragraphs as regular text", () => {
      renderComponent();

      const regularParagraphs = mockModalContent.paragraphs.slice(0, 3);
      regularParagraphs.forEach((paragraph) => {
        expect(screen.getByText(paragraph)).toBeInTheDocument();
      });
    });

    test("renders second paragraph with bolder text", () => {
      renderComponent();

      const emphasizedParagraph = screen.getByText(
        mockModalContent.paragraphs[1],
      );
      expect(emphasizedParagraph).toHaveClass("font-semibold");
    });

    test("renders paragraphs 4 and 5 as list items", () => {
      renderComponent();

      const list = screen.getByRole("list");
      expect(list).toBeInTheDocument();
      expect(list).toHaveClass("list-disc");

      const listItems = screen.getAllByRole("listitem");
      expect(listItems).toHaveLength(2);
      expect(listItems[0]).toHaveTextContent(mockModalContent.paragraphs[3]);
      expect(listItems[1]).toHaveTextContent(mockModalContent.paragraphs[4]);
    });

    test("renders last paragraph with InsertLink component", () => {
      renderComponent();

      expect(
        screen.getByText(/This paragraph contains a link/),
      ).toBeInTheDocument();

      const link = screen.getByRole("link");
      expect(link).toBeInTheDocument();
      expect(link).toHaveAttribute("href", mockModalContent.link);
      expect(link).toHaveAttribute("target", "_blank");
      expect(link).toHaveAttribute("rel", "noopener noreferrer");
    });
  });
});
