import { fireEvent, render, screen, waitFor } from "@testing-library/react";

import { InfoAccordionItem } from ".";

describe("InfoAccordionItem Component", () => {
  it("renders the info accordion item with question and answers", () => {
    const props = {
      question: "Test Question",
      answer: ["This is the first answer", "This is the second answer"],
    };

    render(<InfoAccordionItem {...props} />);

    const question = screen.getByText("Test Question");
    expect(question).toBeInTheDocument();

    fireEvent.click(question);

    expect(screen.getByText("This is the first answer")).toBeInTheDocument();
    expect(screen.getByText("This is the second answer")).toBeInTheDocument();
  });

  it("if accordion not expanded then content shouldn't show", async () => {
    const props = {
      question: "Test Question",
      answer: ["This is the first answer", "This is the second answer"],
    };

    render(<InfoAccordionItem {...props} />);

    const content = screen.getByTestId("collapser-content");

    expect(content).toHaveClass("ds:hidden");

    const question = screen.getByText("Test Question");
    fireEvent.click(question);

    await waitFor(() => {
      expect(content).not.toHaveClass("ds:hidden");
      expect(content).toBeVisible();
    });
  });
});
