import { render, screen } from "@testing-library/react";

import { PhoneTextContent } from ".";

describe("PhoneTextContent", () => {
  it("renders text without phone numbers unchanged", () => {
    render(<PhoneTextContent text="Hello world" />);
    expect(screen.getByText("Hello world")).toBeInTheDocument();
  });

  it.each([
    {
      description: "standard UK format with spaces",
      input: "Call 0330 912 9955",
      expectedNumber: "+443309129955",
      displayNumber: "0330 912 9955",
    },
    {
      description: "international format with spaces",
      input: "Call 44 20 1234 5678",
      expectedNumber: "+442012345678",
      displayNumber: "44 20 1234 5678",
    },
    {
      description: "plus prefix format",
      input: "Call +44 330 912 9955",
      expectedNumber: "+443309129955",
      displayNumber: "+44 330 912 9955",
    },
    {
      description: "format with parentheses",
      input: "Call +44 (0)330 912 9955",
      expectedNumber: "+443309129955",
      displayNumber: "+44 (0)330 912 9955",
    },
    {
      description: "no spaces format",
      input: "Call 03309129955",
      expectedNumber: "+443309129955",
      displayNumber: "03309129955",
    },
  ])(
    "converts $description correctly",
    ({ input, expectedNumber, displayNumber }) => {
      render(<PhoneTextContent text={input} />);

      const link = screen.getByRole("link");
      expect(link).toHaveAttribute("href", `tel:${expectedNumber}`);
      expect(link).toHaveTextContent(displayNumber);
      expect(screen.getByText(/Call/)).toBeInTheDocument();
    },
  );

  it("handles multiple phone numbers in the same text", () => {
    render(<PhoneTextContent text="Call 0330 912 9955 or +44 330 912 9955" />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveAttribute("href", "tel:+443309129955");
    expect(links[1]).toHaveAttribute("href", "tel:+443309129955");
  });

  it("adds correct accessibility attributes", () => {
    render(<PhoneTextContent text="Call 0330 912 9955" />);

    const link = screen.getByRole("link");
    expect(link).toHaveAttribute(
      "aria-label",
      "Call us directly on 0330 912 9955",
    );
    expect(link).toHaveAttribute("title", "Call us directly on 0330 912 9955");
  });

  it("has correct styling for mobile/desktop", () => {
    render(<PhoneTextContent text="Call 0330 912 9955" />);

    const link = screen.getByRole("link");
    expect(link).toHaveClass(
      "ds:text-inherit",
      "ds:underline",
      "ds:pointer-events-auto",
      "ds:md:no-underline",
      "ds:md:pointer-events-none",
    );
  });

  it("applies custom className to phone number links", () => {
    render(
      <PhoneTextContent text="Call 0330 912 9955" className="custom-class" />,
    );

    const link = screen.getByRole("link");
    expect(link).toHaveClass("custom-class");
  });
});
