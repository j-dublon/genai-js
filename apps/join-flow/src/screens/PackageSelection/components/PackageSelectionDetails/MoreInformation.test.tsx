import { render, screen } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { MoreInformation } from "./MoreInformation";
import { moreInformationItems } from "./PackageSelectionDetailsProps";

vi.mock("@react-component-library/ui", () => ({
  InfoAccordionItem: ({
    question,
    answer,
  }: {
    question: string;
    answer: string;
  }) => (
    <div data-testid="info-accordion-item">
      <div data-testid="question">{question}</div>
      <div data-testid="answer">{answer}</div>
    </div>
  ),
}));

vi.mock("./PackageSelectionDetailsProps", () => ({
  moreInformationItems: [
    {
      question: "Test Question 1",
      answer: "Test Answer 1",
    },
    {
      question: "Test Question 2",
      answer: "Test Answer 2",
    },
  ],
}));

describe("MoreInformation", () => {
  it("renders the component with correct title", () => {
    render(<MoreInformation />);
    expect(screen.getByText("More Information")).toBeInTheDocument();
  });

  it("renders all information items", () => {
    render(<MoreInformation />);
    const accordionItems = screen.getAllByTestId("info-accordion-item");
    expect(accordionItems).toHaveLength(moreInformationItems.length);
  });

  it("renders questions and answers correctly", () => {
    render(<MoreInformation />);
    const questions = screen.getAllByTestId("question");
    const answers = screen.getAllByTestId("answer");

    expect(questions[0]).toHaveTextContent("Test Question 1");
    expect(answers[0]).toHaveTextContent("Test Answer 1");
    expect(questions[1]).toHaveTextContent("Test Question 2");
    expect(answers[1]).toHaveTextContent("Test Answer 2");
  });
});
