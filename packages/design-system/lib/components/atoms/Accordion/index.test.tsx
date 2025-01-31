import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { AccordionItem } from ".";

describe("Accordion Component", () => {
  it("renders the accordion item with children", () => {
    const questions = {
      dropdown_header: "testing header",
      dropdown_content: ["this is some content", "this is some more content"],
      button_text: "button text",
      button_link: "www.test.com",
    };

    render(<AccordionItem key={`faq-question-test`} question={questions} />);

    const header = screen.getByText("testing header");
    expect(header).toBeInTheDocument();

    fireEvent.click(header);

    expect(screen.getByText("this is some content")).toBeInTheDocument();
    expect(screen.getByText("this is some more content")).toBeInTheDocument();

    const button = screen.getByRole("link", { name: "button text" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "www.test.com");
  });

  it("when no button values passed in button doesn't show", () => {
    const questions = {
      dropdown_header: "testing header",
      dropdown_content: ["this is some content", "this is some more content"],
    };

    render(<AccordionItem key={`faq-question-test`} question={questions} />);

    const button = screen.queryByRole("link");
    expect(button).not.toBeInTheDocument();
  });

  it("if accordion not expanded then content shouldn't show", async () => {
    const questions = {
      dropdown_header: "testing header",
      dropdown_content: ["this is some content", "this is some more content"],
      button_text: "button text",
      button_link: "www.test.com",
    };

    render(<AccordionItem key={`faq-question-test`} question={questions} />);

    const content = screen.getByTestId("collapser-content");

    // Instead of checking visibility, check if it has the "hidden" class or attribute
    expect(content).toHaveClass("hidden");

    const header = screen.getByText("testing header");
    fireEvent.click(header);

    // Wait for transition effect to apply changes
    await waitFor(() => {
      expect(content).not.toHaveClass("hidden");
      expect(content).toBeVisible();
    });
  });
});
