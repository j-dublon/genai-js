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
    backgroundColor: "bg-ui-grey-100",
  };

  it("renders the correct number of logos", () => {
    render(<ImageMarquee {...props} />);
    expect(screen.getAllByRole("img")).toHaveLength(2);
  });
});
