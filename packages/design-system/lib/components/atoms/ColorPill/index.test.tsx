import { render, screen } from "@testing-library/react";

import { ColorPill, ColorPillProps } from ".";

describe("ColorPill Component", () => {
  const props: ColorPillProps = {
    colorPillText: "Test text",
    backgroundColor: "yellow",
    size: "large",
    ariaLabel: "Custom aria label",
  };

  it("renders the ColorPill with custom text", () => {
    render(<ColorPill {...props} />);

    const colorPill = screen.getByText(/test text/i);
    expect(colorPill).toBeInTheDocument();
    expect(colorPill).toHaveTextContent("Test text");
  });

  it("renders the ColorPill with the correct background color", () => {
    render(<ColorPill {...props} />);

    const colorPill = screen.getByText(/test text/i);

    expect(colorPill).toHaveStyle("background-color: bg-core-yellow");
  });

  it("renders the ColorPill with the correct aria-label", () => {
    render(<ColorPill {...props} />);

    const colorPill = screen.getByLabelText(
      "Color pill with the text Test text",
    );
    expect(colorPill).toBeInTheDocument();
  });

  it.each([
    {
      size: "extraSmall",
      containerClass: "ds:px-2 ds:py-1",
      textClass: "ds:text-xxs",
    },
    {
      size: "small",
      containerClass: "ds:px-2 ds:md:px-3 ds:py-1",
      textClass: "ds:text-sm",
    },
    {
      size: "medium",
      containerClass: "ds:px-4 ds:md:px-6 ds:py-2",
      textClass: "ds:text-md ds:md:text-[26px]",
    },
    {
      size: "large",
      containerClass: "ds:px-5 ds:py-1 ds:md:py-2",
      textClass: "ds:md:text-5xl ds:text-2xl",
    },
  ])(
    "renders the ColorPill with the correct classes for $size size",
    ({ size, containerClass, textClass }) => {
      render(
        <ColorPill
          {...props}
          size={size as "extraSmall" | "small" | "medium" | "large"}
        />,
      );

      const colorPillContainer = screen.getByText(/test text/i).parentElement;
      const colorPillText = screen.getByText(/test text/i);

      expect(colorPillContainer).toHaveClass(containerClass);
      expect(colorPillText).toHaveClass(textClass);
    },
  );

  it("renders the ColorPill with white text when whiteText prop is true", () => {
    render(<ColorPill {...props} whiteText={true} />);

    const colorPill = screen.getByText(/test text/i);
    expect(colorPill).toHaveClass("ds:text-core-white");
  });

  it("renders the ColorPill with black text when whiteText prop is false", () => {
    render(<ColorPill {...props} whiteText={false} />);

    const colorPill = screen.getByText(/test text/i);
    expect(colorPill).toHaveClass("ds:text-core-black");
  });

  it("applies custom className when provided", () => {
    const customClass = "custom-class";
    render(<ColorPill {...props} className={customClass} />);

    const colorPill = screen.getByText(/test text/i).parentElement;
    expect(colorPill).toHaveClass(customClass);
  });

  it("renders the icon when provided", () => {
    const TestIcon = () => <span data-testid="test-icon">Icon</span>;
    render(<ColorPill {...props} icon={<TestIcon />} />);

    const icon = screen.getByTestId("test-icon");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveTextContent("Icon");
  });

  it("does not render anything when icon is undefined", () => {
    render(<ColorPill {...props} icon={undefined} />);
    expect(screen.queryByTestId("test-icon")).not.toBeInTheDocument();
  });
});
