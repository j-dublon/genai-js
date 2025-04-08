import { render, screen } from "@testing-library/react";

import { TextWithTick } from ".";

describe("TextWithTick Component", () => {
  const props = { textInput: "Test text", "aria-label": "Custom aria label" };

  it("renders the TextWithTick with custom text", () => {
    render(<TextWithTick {...props} />);

    const textWithTick = screen.getByText(/test text/i);
    expect(textWithTick).toBeInTheDocument();
    expect(textWithTick).toHaveTextContent("Test text");
  });

  it("renders the TextWithTick with the correct aria-label", () => {
    render(<TextWithTick {...props} />);

    const textWithTick = screen.getByLabelText(
      "Text with tick with the statement Test text",
    );
    expect(textWithTick).toBeInTheDocument();
  });

  it.each([
    {
      padding: "default",
      expectedClasses: ["ds:px-3", "ds:md:px-6", "ds:py-[10px]", "ds:md:py-3"],
      notExpectedClasses: ["ds:md:py-4"],
    },
    {
      padding: "large",
      expectedClasses: ["ds:px-3", "ds:md:px-6", "ds:py-[10px]", "ds:md:py-4"],
      notExpectedClasses: ["ds:md:py-3"],
    },
    {
      padding: "none",
      expectedClasses: [],
      notExpectedClasses: [
        "ds:px-3",
        "ds:md:px-6",
        "ds:py-[10px]",
        "ds:md:py-3",
        "ds:md:py-4",
      ],
    },
  ])(
    "applies correct padding when padding is $padding",
    ({ padding, expectedClasses, notExpectedClasses }) => {
      render(
        <TextWithTick
          {...props}
          padding={padding as "default" | "large" | "none"}
        />,
      );

      const container = screen.getByLabelText(
        "Text with tick with the statement Test text",
      );

      expectedClasses.forEach((className) => {
        expect(container).toHaveClass(className);
      });

      notExpectedClasses.forEach((className) => {
        expect(container).not.toHaveClass(className);
      });
    },
  );

  it("applies border styling when outline is true", () => {
    render(<TextWithTick {...props} outline={true} />);

    const container = screen.getByLabelText(
      "Text with tick with the statement Test text",
    );

    expect(container).toHaveClass("ds:border-2");
    expect(container).toHaveClass("ds:border-ui-grey-300");
  });

  it("does not apply border styling when outline is false", () => {
    render(<TextWithTick {...props} outline={false} />);

    const container = screen.getByLabelText(
      "Text with tick with the statement Test text",
    );

    expect(container).not.toHaveClass("ds:border-2");
    expect(container).not.toHaveClass("ds:border-ui-grey-300");
  });
});
