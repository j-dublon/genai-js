import { describe, it, expect, beforeEach, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import { Guides } from ".";
import useIsDesktopScreen from "@lib/hooks/isDesktop";
import { SliderProps } from "@components/atoms/Slider";
import { BackgroundColors } from "@lib/types";

vi.mock("@lib/hooks/isDesktop", () => ({
  default: vi.fn(),
}));

let lastSliderProps: SliderProps | null = null;

vi.mock("@components/atoms/Slider", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  Slider: ({ children, ...props }: any) => {
    lastSliderProps = props;
    return (
      <div data-testid="slider" {...props}>
        {children}
      </div>
    );
  },
}));

vi.mock("@components/atoms/GuideCard", () => ({
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  GuideCard: ({ title }: any) => <div data-testid="guide-card">{title}</div>,
}));

describe("Guides", () => {
  const mockGuides = [
    {
      title: "Guide 1",
      tags: [{ text: "Tag 1", backgroundColor: "yellow" as BackgroundColors }],
      image: { src: "image1.jpg", alt: "Image 1", width: 300, height: 100 },
      onClick: vi.fn(),
    },
    {
      title: "Guide 2",
      tags: [{ text: "Tag 2", backgroundColor: "pink" as BackgroundColors }],
      image: { src: "image2.jpg", alt: "Image 2", width: 300, height: 100 },
      onClick: vi.fn(),
    },
  ];

  beforeEach(() => {
    vi.clearAllMocks();
    lastSliderProps = null;
  });

  it("renders slider with correct accessibility attributes", () => {
    const isDesktopMock = vi.mocked(useIsDesktopScreen);
    isDesktopMock.mockReturnValue(true);

    render(<Guides guides={mockGuides} />);

    const slider = screen.getByTestId("slider");
    expect(slider).toHaveAttribute("aria-roledescription", "carousel");
    expect(lastSliderProps?.draggable).toBe(true);
  });

  it("sets correct responsive showScrollbar prop based on isDesktop", () => {
    const isDesktopMock = vi.mocked(useIsDesktopScreen);

    // Test desktop view
    isDesktopMock.mockReturnValue(true);
    const { rerender } = render(<Guides guides={mockGuides} />);

    expect(lastSliderProps?.showScrollbar).toBe(true);

    // Test mobile view
    isDesktopMock.mockReturnValue(false);
    rerender(<Guides guides={mockGuides} />);

    expect(lastSliderProps?.showScrollbar).toBe(false);
  });

  it("renders correct number of guide cards with proper slide labeling", () => {
    const isDesktopMock = vi.mocked(useIsDesktopScreen);
    isDesktopMock.mockReturnValue(true);

    render(<Guides guides={mockGuides} />);

    const slides = screen.getAllByRole("group");
    expect(slides).toHaveLength(2);

    slides.forEach((slide, index) => {
      expect(slide).toHaveAttribute("aria-roledescription", "slide");
      expect(slide).toHaveAttribute(
        "aria-label",
        `${index + 1} of ${mockGuides.length}`,
      );
    });
  });

  it("handles empty guides array", () => {
    const isDesktopMock = vi.mocked(useIsDesktopScreen);
    isDesktopMock.mockReturnValue(true);

    render(<Guides guides={[]} />);

    const slider = screen.getByTestId("slider");
    expect(slider).toBeInTheDocument();
    expect(screen.queryAllByRole("group")).toHaveLength(0);
  });

  it("renders section with correct aria-label", () => {
    const isDesktopMock = vi.mocked(useIsDesktopScreen);
    isDesktopMock.mockReturnValue(true);

    render(<Guides guides={mockGuides} />);

    const section = screen.getByRole("region", { name: "Guides" });
    expect(section).toBeInTheDocument();
  });
});
