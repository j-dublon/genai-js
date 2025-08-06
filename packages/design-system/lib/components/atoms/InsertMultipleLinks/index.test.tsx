import { render, screen } from "@testing-library/react";

import { InsertMultipleLinks } from "./";

describe("InsertMultipleLinks", () => {
  it("should render text with a single link", () => {
    const props = {
      text: "Please click here to continue",
      links: [{ searchText: "here", href: "/continue" }],
    };

    render(<InsertMultipleLinks {...props} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "/continue");
    expect(link).toHaveTextContent("here");
    expect(screen.getByText(/Please click/i)).toBeInTheDocument();
    expect(screen.getByText(/to continue/i)).toBeInTheDocument();
  });

  it("should render text with multiple links", () => {
    const props = {
      text: "Click Google or GitHub to learn more.",
      links: [
        { searchText: "Google", href: "https://google.com" },
        { searchText: "GitHub", href: "https://github.com" },
      ],
    };

    render(<InsertMultipleLinks {...props} />);
    const links = screen.getAllByRole("link");
    expect(links).toHaveLength(2);
    expect(links[0]).toHaveTextContent("Google");
    expect(links[0]).toHaveAttribute("href", "https://google.com");
    expect(links[1]).toHaveTextContent("GitHub");
    expect(links[1]).toHaveAttribute("href", "https://github.com");
    expect(screen.getByText(/Click/i)).toBeInTheDocument();
    expect(screen.getByText(/to learn more\./i)).toBeInTheDocument();
  });

  it("should render original text when no links provided", () => {
    const props = {
      text: "Nothing here should be a link.",
      links: [],
    };

    render(<InsertMultipleLinks {...props} />);
    expect(
      screen.getByText("Nothing here should be a link."),
    ).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("should handle link at the beginning and end of text", () => {
    const props = {
      text: "Google is better than Bing",
      links: [
        { searchText: "Google", href: "https://google.com" },
        { searchText: "Bing", href: "https://bing.com" },
      ],
    };

    render(<InsertMultipleLinks {...props} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent("Google");
    expect(links[1]).toHaveTextContent("Bing");
    expect(screen.getByText(/is better than/i)).toBeInTheDocument();
  });

  it("should handle full match for entire string", () => {
    const props = {
      text: "StackOverflow",
      links: [
        { searchText: "StackOverflow", href: "https://stackoverflow.com" },
      ],
    };

    render(<InsertMultipleLinks {...props} />);
    const link = screen.getByRole("link");
    expect(link).toHaveTextContent("StackOverflow");
    expect(screen.queryByText(/^(?!StackOverflow$).+/)).not.toBeInTheDocument();
  });

  it("should not render links for empty searchText", () => {
    const props = {
      text: "Some text here",
      links: [{ searchText: "", href: "/empty" }],
    };

    render(<InsertMultipleLinks {...props} />);
    expect(screen.getByText("Some text here")).toBeInTheDocument();
    expect(screen.queryByRole("link")).not.toBeInTheDocument();
  });

  it("should be case sensitive", () => {
    const props = {
      text: "This is TEXT not text",
      links: [{ searchText: "text", href: "/lowercase" }],
    };

    render(<InsertMultipleLinks {...props} />);
    expect(screen.queryByRole("link")).not.toHaveTextContent("TEXT");
    expect(screen.getByText("This is TEXT not")).toBeInTheDocument();
  });

  it("should escape special characters in searchText", () => {
    const props = {
      text: "Match this [link] and also (another)",
      links: [
        { searchText: "[link]", href: "/link" },
        { searchText: "(another)", href: "/another" },
      ],
    };

    render(<InsertMultipleLinks {...props} />);
    const links = screen.getAllByRole("link");
    expect(links[0]).toHaveTextContent("[link]");
    expect(links[1]).toHaveTextContent("(another)");
  });

  it("should open links in same tab by default", () => {
    const props = {
      text: "Go to here",
      links: [{ searchText: "here", href: "/default-tab" }],
    };

    render(<InsertMultipleLinks {...props} />);
    const link = screen.getByRole("link");
    expect(link).not.toHaveAttribute("target");
    expect(link).not.toHaveAttribute("rel");
  });

  it("should open in new tab when openInNewTab is true", () => {
    const props = {
      text: "Go to here",
      links: [{ searchText: "here", href: "/new-tab", openInNewTab: true }],
    };

    render(<InsertMultipleLinks {...props} />);
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("target", "_blank");
    expect(link).toHaveAttribute("rel", "noopener noreferrer");
  });
});
