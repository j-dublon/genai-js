import { CompanyLogoStrip } from "@components/molecules/CompanyLogoStrip";
import { render } from "@testing-library/react";

describe("CompanyLogoStrip Component", () => {
  const props = {
    logos: [
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
    backgroundColor: "bg-gray-100",
  };

  it("renders all logo images in the DOM", () => {
    const { container } = render(<CompanyLogoStrip {...props} />);
    const allImages = container.querySelectorAll("img");
    expect(allImages).toHaveLength(6); // 2 logos × 3 sets (desktop, mobile-1, mobile-2)
  });

  it("properly hides duplicate content from screen readers", () => {
    const { container } = render(<CompanyLogoStrip {...props} />);
    const hiddenElements = container.querySelectorAll('[aria-hidden="true"]');
    expect(hiddenElements).toHaveLength(1); // mobile-2 container should be hidden
  });

  it("will hide desktop marquee when in mobile view and vice versa", () => {
    const { getByTestId } = render(<CompanyLogoStrip {...props} />);
    const mobileContainer = getByTestId("mobile-logo-container");
    const desktopContainer = getByTestId("desktop-logo-container");
    expect(mobileContainer).toHaveClass("ds:md:hidden");
    expect(desktopContainer).toHaveClass("ds:hidden");
  });
});
