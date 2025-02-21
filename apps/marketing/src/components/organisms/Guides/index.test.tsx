import { BackgroundColors } from "@react-component-library/ui";
import { render, screen, within } from "@testing-library/react";
import { describe, expect, it, vi } from "vitest";

import { Guides } from ".";

describe("Guides", () => {
  global.ResizeObserver = vi.fn().mockImplementation(() => ({
    observe: vi.fn(),
    unobserve: vi.fn(),
    disconnect: vi.fn(),
  }));

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
    {
      title: "Guide 3",
      tags: [{ text: "Tag 3", backgroundColor: "pink" as BackgroundColors }],
      image: { src: "image3.jpg", alt: "Image 3", width: 300, height: 100 },
      onClick: vi.fn(),
    },
  ];

  const mockTitle = "Guides section";
  const mockSubTitle = "Some text here";

  it("renders slider with correct accessibility attributes", () => {
    render(
      <Guides
        guides={mockGuides}
        guidesHeading={mockTitle}
        guidesSubHeading={mockSubTitle}
      />,
    );

    const section = screen.getByLabelText("Cuckoo Guides");
    expect(section).toBeInTheDocument();
    const slider = within(section).getByRole("region", {
      name: "Scrollable content",
    });
    expect(slider).toHaveAttribute("aria-roledescription", "slider");
    expect(slider).toHaveClass("cursor-grab");
  });

  it("renders correct number of guide cards with proper slide labeling", () => {
    render(
      <Guides
        guides={mockGuides}
        guidesHeading={mockTitle}
        guidesSubHeading={mockSubTitle}
      />,
    );

    const section = screen.getByLabelText("Cuckoo Guides");
    const carousel = within(section).getByRole("region", {
      name: "Scrollable content",
    });
    const slides = Array.from(carousel.children).filter(
      (child) => child.tagName === "DIV",
    );
    expect(slides).toHaveLength(3);

    slides.forEach((slide, index) => {
      expect(slide).toHaveAttribute("role", "group");
      expect(slide).toHaveClass("slider-item");
      expect(slide).toHaveAttribute("aria-roledescription", "slide");
      const slideContent = within(slide as HTMLElement).getByRole("group");
      expect(slideContent).toHaveAttribute(
        "aria-label",
        `${index + 1} of ${mockGuides.length}`,
      );
    });
  });

  it("handles empty guides array", () => {
    render(
      <Guides
        guides={[]}
        guidesHeading={mockTitle}
        guidesSubHeading={mockSubTitle}
      />,
    );

    const section = screen.getByLabelText("Cuckoo Guides");
    const slider = within(section).getByRole("region", {
      name: "Scrollable content",
    });
    expect(slider).toBeInTheDocument();
    expect(screen.queryAllByRole("group")).toHaveLength(0);
  });

  it("renders section with correct aria-label", () => {
    render(
      <Guides
        guides={mockGuides}
        guidesHeading={mockTitle}
        guidesSubHeading={mockSubTitle}
      />,
    );

    const section = screen.getByLabelText("Cuckoo Guides");
    expect(section).toBeInTheDocument();
  });

  it("renders heading and subheading", () => {
    render(
      <Guides
        guides={mockGuides}
        guidesHeading={mockTitle}
        guidesSubHeading={mockSubTitle}
      />,
    );

    const heading = screen.getByText(mockTitle);
    const subheading = screen.getByText(mockSubTitle);

    expect(heading).toBeInTheDocument();
    expect(subheading).toBeInTheDocument();
  });
});
