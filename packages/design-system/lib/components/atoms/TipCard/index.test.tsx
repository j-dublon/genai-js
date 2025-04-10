import { textColorVariants } from "@lib/variants";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { TipCard, tipCardColors } from ".";

describe("TipCard Component", () => {
  it("renders with simple text content", () => {
    render(<TipCard>This is a simple tip</TipCard>);

    const card = screen.getByLabelText("Tip card");
    expect(card).toBeInTheDocument();
    expect(card).toHaveTextContent("This is a simple tip");
  });

  it("renders with a subtitle and children", () => {
    render(
      <TipCard subtitle="Important:">
        This is a complex tip with a <a href="https://example.com">link</a> and{" "}
        <strong>formatted</strong> text.
      </TipCard>,
    );

    const card = screen.getByLabelText("Tip card");
    const subtitle = screen.getByText("Important:");

    expect(card).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(subtitle).toHaveClass("ds:font-semibold");
    expect(card).toHaveTextContent(
      "This is a complex tip with a link and formatted text",
    );
  });

  it("renders with an image", () => {
    render(
      <TipCard image={{ src: "/test-image.jpg", alt: "Test image" }}>
        Content with image
      </TipCard>,
    );

    const card = screen.getByLabelText("Tip card");
    const image = screen.getByRole("img", { name: "Test image" });

    expect(card).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      expect.stringContaining("test-image.jpg"),
    );
    expect(card).toHaveTextContent("Content with image");
  });

  it("applies custom background color", () => {
    render(<TipCard backgroundColor="blue">Content</TipCard>);

    const card = screen.getByLabelText("Tip card");
    expect(card).toHaveClass(tipCardColors.blue);
  });

  it("applies custom subtitle color", () => {
    render(
      <TipCard subtitle="Important" subtitleColor="secondary-blue">
        Content
      </TipCard>,
    );

    const card = screen.getByLabelText("Tip card");
    const subtitle = screen.getByText("Important");

    expect(card).toBeInTheDocument();
    expect(subtitle).toHaveClass("ds:text-secondary-blue");
  });

  it("applies custom className", () => {
    render(<TipCard className="custom-class">Content</TipCard>);

    const card = screen.getByLabelText("Tip card");
    expect(card).toHaveClass("custom-class");
  });

  it("renders with all optional props", () => {
    render(
      <TipCard
        subtitle="Important"
        image={{ src: "/test-image.jpg", alt: "Test image" }}
        backgroundColor="blue"
        subtitleColor="secondary-blue"
        className="custom-class"
      >
        Full featured tip
      </TipCard>,
    );

    const card = screen.getByLabelText("Tip card");
    const subtitle = screen.getByText("Important");
    const image = screen.getByRole("img", { name: "Test image" });

    expect(card).toBeInTheDocument();
    expect(subtitle).toBeInTheDocument();
    expect(image).toBeInTheDocument();
    expect(card).toHaveClass(tipCardColors.blue);
    expect(subtitle).toHaveClass("ds:text-secondary-blue");
    expect(card).toHaveClass("custom-class");
    expect(card).toHaveTextContent("Full featured tip");
  });

  it("applies default background and subtitle colors", () => {
    render(<TipCard subtitle="Important">Content</TipCard>);

    const card = screen.getByLabelText("Tip card");
    const subtitle = screen.getByText("Important");

    expect(card).toHaveClass(tipCardColors.white);
    expect(subtitle).toHaveClass(textColorVariants.black);
  });
});
