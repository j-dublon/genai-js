import "@testing-library/jest-dom";

import { render, screen } from "@testing-library/react";

import { Reminders } from ".";
import { featureImage, heading, reminders } from "./RemindersProps";

describe("Reminders Section", () => {
  it("renders the section and heading correctly", () => {
    render(<Reminders />);
    const section = screen.getByRole("region");
    expect(section).toBeInTheDocument();
    expect(section).toHaveAttribute("aria-label", "Reminders section");
    expect(screen.getByText(heading)).toBeInTheDocument();
  });

  it("renders all reminder items", () => {
    render(<Reminders />);

    reminders.forEach((item) => {
      const textWithTick = screen.getByLabelText(
        `Text with tick with the statement ${item.textInput}`,
      );
      expect(textWithTick).toBeInTheDocument();
      expect(textWithTick.querySelector("p")).toHaveTextContent(item.textInput);
    });
  });

  it("renders the image with correct attributes", () => {
    render(<Reminders />);

    const image = screen.getByRole("img");
    expect(image).toBeInTheDocument();
    expect(image).toHaveAttribute(
      "src",
      `/vc-ap-join-flow/assets${featureImage.src}`,
    );
    expect(image).toHaveAttribute("alt", featureImage.alt);
  });
});
