import { ImageMarquee } from "@components/molecules/ImageMarquee";
import { render, screen } from "@testing-library/react";

describe("ImageMarquee Component", () => {
  const props = {
    images: [
      {
        altText: "Test Alt Text 1",
        width: "100",
        height: "100",
        imgSrc: "test-src-1.png",
      },
      {
        altText: "Test Alt Text 2",
        width: "120",
        height: "80",
        imgSrc: "test-src-2.png",
      },
    ],
  };

  it("renders all images in the DOM", () => {
    const { container } = render(<ImageMarquee {...props} />);
    const allImages = container.querySelectorAll("img");
    expect(allImages).toHaveLength(4); // 2 images × 2 sets
  });

  it("makes only first set of images available to screen readers", () => {
    render(<ImageMarquee {...props} />);
    const accessibleImages = screen.getAllByRole("img");
    expect(accessibleImages).toHaveLength(2);
  });
});
