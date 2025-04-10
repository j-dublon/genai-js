import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";

import { ContactInfo } from ".";

describe("ContactInfo Component", () => {
  it("renders with phone number and opening hours", () => {
    render(
      <ContactInfo
        phoneNumber="0123 456 7890"
        openingHoursText="We're open Monday - Friday between the hours of 9am - 6pm and Saturday 9am - 5pm"
      />,
    );

    expect(screen.getByText("0123 456 7890")).toBeInTheDocument();
    expect(screen.getByText(/We're open Monday - Friday/)).toBeInTheDocument();
    const link = screen.getByRole("link");
    expect(link).toHaveAttribute("href", "tel:01234567890");
    expect(link).toHaveAttribute(
      "aria-label",
      "Call us directly on 0123 456 7890",
    );
  });

  it("hides the mobile-only text on medium and larger screens", () => {
    render(
      <ContactInfo
        phoneNumber="0123 456 7890"
        openingHoursText="We're open Monday - Friday between the hours of 9am - 6pm and Saturday 9am - 5pm"
      />,
    );
    const mobileText = screen.getByText("Prefer to talk to a person?");
    expect(mobileText).toBeInTheDocument();
    expect(mobileText).toHaveClass("md:hidden");
  });
});
