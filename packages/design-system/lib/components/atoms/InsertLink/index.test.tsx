import { render, screen } from "@testing-library/react";

import { InsertLink } from "./index";

describe("InsertLink", () => {
  it("should render text with link when searchText is found", () => {
    const props = {
      text: "Please click here to continue",
      searchText: "here",
      href: "/continue",
    };

    render(<InsertLink {...props} />);
    expect(screen.getByText(/Please click/i)).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/continue");
    expect(link).toHaveTextContent(/here/i);
    expect(link).toHaveClass(
      "ds:text-ui-link",
      "ds:font-medium",
      "ds:underline",
    );
    expect(screen.getByText(/to continue/i)).toBeInTheDocument();
  });

  it("should render original text when searchText is not found", () => {
    const props = {
      text: "This is a simple text",
      searchText: "missing",
      href: "/nowhere",
    };

    render(<InsertLink {...props} />);
    expect(screen.getByText("This is a simple text")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("should handle searchText at the beginning of text", () => {
    const props = {
      text: "Start with this text",
      searchText: "Start",
      href: "/start",
    };

    render(<InsertLink {...props} />);

    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("Start");
    expect(screen.getByText("with this text")).toBeInTheDocument();
  });

  it("should handle searchText at the end of text", () => {
    const props = {
      text: "Text ending here",
      searchText: "here",
      href: "/end",
    };

    render(<InsertLink {...props} />);
    expect(screen.getByText("Text ending")).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("here");
  });

  it("should handle searchText that spans the entire text", () => {
    const props = {
      text: "entiretext",
      searchText: "entiretext",
      href: "/full",
    };

    render(<InsertLink {...props} />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("entiretext");
    expect(screen.queryByText(/^(?!entiretext$).+/)).not.toBeInTheDocument();
  });

  it("should handle empty searchText", () => {
    const props = {
      text: "Some text here",
      searchText: "",
      href: "/empty",
    };

    render(<InsertLink {...props} />);

    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Some text here")).toBeInTheDocument();
  });

  it("should only match the first occurrence of searchText", () => {
    const props = {
      text: "test this test again",
      searchText: "test",
      href: "/test",
    };

    render(<InsertLink {...props} />);

    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(1);
    expect(links[0]).toHaveTextContent("test");
    expect(screen.getByText(/this/i)).toBeInTheDocument();
    expect(screen.getByText(/test again/i)).toBeInTheDocument();
  });

  it("should be case sensitive", () => {
    const props = {
      text: "Find THIS text",
      searchText: "this",
      href: "/case",
    };

    render(<InsertLink {...props} />);
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
    expect(screen.getByText("Find THIS text")).toBeInTheDocument();
  });

  it("should handle special characters in searchText", () => {
    const props = {
      text: "Click [here] to continue",
      searchText: "[here]",
      href: "/special",
    };

    render(<InsertLink {...props} />);

    expect(screen.getByText(/Click/i)).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("[here]");
    expect(screen.getByText(/to continue/i)).toBeInTheDocument();
  });

  it("should open in same tab by default", () => {
    const props = {
      text: "Click here to continue",
      searchText: "here",
      href: "/continue",
    };

    render(<InsertLink {...props} />);
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("should open in same tab when openInNewTab is false", () => {
    const props = {
      text: "Click here to continue",
      searchText: "here",
      href: "/continue",
      openInNewTab: false,
    };

    render(<InsertLink {...props} />);
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("should open in new tab when openInNewTab is true", () => {
    const props = {
      text: "Click here to continue",
      searchText: "here",
      href: "/continue",
      openInNewTab: true,
    };

    render(<InsertLink {...props} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
