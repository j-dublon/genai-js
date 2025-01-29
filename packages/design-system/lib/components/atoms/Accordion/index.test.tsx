import { fireEvent, render, screen } from "@testing-library/react";
import { AccordionItem } from ".";
import { describe, expect, it } from "vitest";

describe("Accordion Component", () => {
  it("renders the accordion item with children", () => {
    const questions = {
      dropdown_header: "testing header",
      dropdown_content: ["this is some content", "this is some more content"],
      button_text: "button text",
      button_link: "www.test.com",
    };

    render(
      <AccordionItem
        questionColour="core-white"
        key={`faq-question-test`}
        question={questions}
      />
    );

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

    render(
      <AccordionItem
        questionColour="core-white"
        key={`faq-question-test`}
        question={questions}
      />
    );

    const button = screen.queryByRole("link");
    expect(button).not.toBeInTheDocument();
  });

  it("if accordion not expanded then content shouldn't show", () => {
    const questions = {
      dropdown_header: "testing header",
      dropdown_content: ["this is some content", "this is some more content"],
      button_text: "button text",
      button_link: "www.test.com",
    };

    render(
      <AccordionItem
        questionColour="core-white"
        key={`faq-question-test`}
        question={questions}
      />
    );

    const content = screen.getByTestId("collapser-content");

    expect(content).not.toBeVisible();

    const header = screen.getByText("testing header");
    fireEvent.click(header);

    // const content = screen.getByTestId("collapser-content");
    expect(content).toBeVisible();
    expect(screen.getByText("this is some content")).toBeInTheDocument();
    expect(screen.getByText("this is some more content")).toBeInTheDocument();

    const button = screen.getByRole("link", { name: "button text" });
    expect(button).toBeInTheDocument();
    expect(button).toHaveAttribute("href", "www.test.com");
  });
});
