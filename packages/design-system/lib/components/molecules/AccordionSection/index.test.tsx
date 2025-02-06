import { render, screen } from "@testing-library/react";
import { AccordionSection } from ".";

describe("Accordion section Component", () => {
  it("renders the accordion item with children", () => {
    const questions = {
      dropdown_header: "testing question header",
      dropdown_content: ["this is some content", "this is some more content"],
      button_text: "button text",
      button_link: "www.test.com",
    };

    render(
      <AccordionSection
        heading="Test main header"
        subText="Test sub header text"
        questionsArr={[questions]}
      />,
    );

    expect(screen.getByText("Test main header")).toBeInTheDocument();
    expect(screen.getByText("Test sub header text")).toBeInTheDocument();
    const header = screen.getByText("testing question header");
    expect(header).toBeInTheDocument();
  });

  it("when no button values passed in button doesn't show", () => {
    render(
      <AccordionSection
        heading="Still not sure? Tell us what’s bothering you."
        questionsArr={[]}
      />,
    );

    const button = screen.queryByRole("link");
    expect(button).not.toBeInTheDocument();
  });
});
