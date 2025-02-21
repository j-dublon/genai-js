import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { LifeAtCuckoo } from "../LifeAtCuckoo/";
import { imageMarqueeProps } from "./imageMarqueeProps";

describe("LifeAtCuckoo", () => {
  beforeEach(() => {
    render(<LifeAtCuckoo />);
  });

  it("renders the Life at Cuckoo section images", () => {
    for (let i = 1; i <= imageMarqueeProps.images.length; i++) {
      const imgElement = screen.getAllByAltText(`Life at Cuckoo ${1}`)[0];
      expect(imgElement).toBeInTheDocument();
    }
  });
});
