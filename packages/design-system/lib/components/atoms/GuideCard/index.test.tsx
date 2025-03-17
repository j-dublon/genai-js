import { BackgroundColors } from "@lib/types";
import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { GuideCard } from ".";

vi.mock("../ColorPill", () => ({
  ColorPill: ({
    colorPillText,
    backgroundColor,
  }: {
    colorPillText: string;
    backgroundColor: BackgroundColors;
  }) => (
    <div data-testid="color-pill" style={{ backgroundColor }}>
      {colorPillText}
    </div>
  ),
}));

describe("GuideCard", () => {
  const mockImage = {
    src: "/test-image.jpg",
    alt: "Test image description",
    width: 300,
    height: 200,
  };

  const mockTags: { text: string; backgroundColor: BackgroundColors }[] = [
    { text: "Tag 1", backgroundColor: "yellow" },
    { text: "Tag 2", backgroundColor: "pink" },
  ];

  const defaultProps = {
    title: "Test Guide",
    image: mockImage,
    url: "https://example.com",
    tags: mockTags,
    onClick: vi.fn(),
  };

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the guide card with all elements", () => {
    render(<GuideCard {...defaultProps} />);

    // Check image
    const image = screen.getByRole("img");
    expect(image).toHaveAttribute("src", mockImage.src);
    expect(image).toHaveAttribute("alt", mockImage.alt);
    expect(image).toHaveAttribute("draggable", "false");
    expect(image).toHaveAttribute("loading", "lazy");

    // Check title
    const heading = screen.getByRole("heading", { level: 2 });
    expect(heading).toHaveTextContent("Test Guide");
    expect(within(heading).getByRole("link")).toHaveAttribute(
      "href",
      defaultProps.url,
    );

    // Check tags
    expect(screen.getByRole("list", { name: "Tags" })).toBeInTheDocument();
    expect(screen.getAllByRole("listitem")).toHaveLength(2);
    expect(screen.getAllByTestId("color-pill")).toHaveLength(2);
  });

  it("handles click events", async () => {
    render(<GuideCard {...defaultProps} />);

    const card = screen.getByRole("button");
    await userEvent.click(card);

    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("handles Enter key press", async () => {
    render(<GuideCard {...defaultProps} />);

    const card = screen.getByRole("button");
    await userEvent.type(card, "{Enter}");

    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("handles Space key press", async () => {
    render(<GuideCard {...defaultProps} />);

    const card = screen.getByRole("button");
    await userEvent.type(card, " ");

    expect(defaultProps.onClick).toHaveBeenCalled();
  });

  it("prevents default on Space key to avoid page scrolling", () => {
    render(<GuideCard {...defaultProps} />);

    const card = screen.getByRole("button");
    const preventDefaultSpy = vi.fn();

    const event = new KeyboardEvent("keydown", {
      key: " ",
      bubbles: true,
      cancelable: true,
    });
    Object.defineProperty(event, "preventDefault", {
      value: preventDefaultSpy,
    });

    card.dispatchEvent(event);

    expect(preventDefaultSpy).toHaveBeenCalled();
  });

  it("does not render as button when onClick is not provided", () => {
    const { onClick, ...propsWithoutClick } = defaultProps;
    render(<GuideCard {...propsWithoutClick} />);

    expect(screen.queryByRole("button")).not.toBeInTheDocument();
  });

  it("applies correct responsive styles", () => {
    render(<GuideCard {...defaultProps} />);

    const container = screen.getByRole("button");
    expect(container.className).toContain(
      "ds:flex ds:flex-col ds:sm:w-[466px] ds:w-[292px] ds:group",
    );
  });

  it("renders title with correct font size classes", () => {
    render(<GuideCard {...defaultProps} />);

    const title = screen.getByRole("heading", { level: 2 });
    expect(title.className).toContain(
      "ds:mt-2 ds:text-xl ds:md:text-[26px] ds:font-bold",
    );
  });

  it("renders tags with correct layout", () => {
    render(<GuideCard {...defaultProps} />);

    const tagContainer = screen.getByRole("list");
    expect(tagContainer.className).toContain(
      "ds:flex ds:flex-row ds:pt-6 ds:gap-2 ds:pl-0",
    );
  });

  it("maintains image aspect ratio", () => {
    render(<GuideCard {...defaultProps} />);

    const imageContainer = screen.getByRole("img").parentElement?.parentElement;
    expect(imageContainer?.className).toContain(
      "ds:relative ds:w-full ds:aspect-video",
    );
  });

  it("applies hover scale animation to the image", () => {
    const { getByRole } = render(<GuideCard {...defaultProps} />);

    const image = getByRole("img");
    expect(image.className).toContain(
      "ds:transition-transform ds:duration-500 ds:group-hover:scale-105",
    );
  });
});
