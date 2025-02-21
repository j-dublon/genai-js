import { BackgroundColors } from "@lib/types";
import { render, screen } from "@testing-library/react";
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
    expect(screen.getByRole("heading", { level: 3 })).toHaveTextContent(
      "Test Guide",
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
      "flex flex-col sm:w-[466px] w-[292px] h-fit",
    );
  });

  it("renders title with correct font size classes", () => {
    render(<GuideCard {...defaultProps} />);

    const title = screen.getByRole("heading", { level: 3 });
    expect(title.className).toContain("mt-2 text-xl md:text-[26px] font-bold");
  });

  it("renders tags with correct layout", () => {
    render(<GuideCard {...defaultProps} />);

    const tagContainer = screen.getByRole("list");
    expect(tagContainer.className).toContain("flex flex-row mt-2 gap-2 pl-0");
  });

  it("maintains image aspect ratio", () => {
    render(<GuideCard {...defaultProps} />);

    const imageContainer = screen.getByRole("img").parentElement;
    expect(imageContainer?.className).toContain("relative w-full aspect-video");
  });
});
