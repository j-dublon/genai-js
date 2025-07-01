import { render, screen, within } from "@testing-library/react";
import { beforeEach, describe, expect, it, vi } from "vitest";

import { getAssetPath } from "@/lib/get-asset-path";

import { NotReadyToJoin } from "./";

vi.mock("./NotReadyToJoinProps", () => ({
  notReadyToJoinProps: {
    heading: "Mock Not Ready Heading",
    description: "Mock Not Ready Description",
    contactInfoHeading: "Mock Contact Info Heading",
    contactInfo: {
      phoneNumber: "01234 567890",
      openingHours: "Mock Opening Hours",
    },
  },
}));

vi.mock("./NotReadyToJoinForm", () => ({
  NotReadyToJoinForm: () => (
    <div data-testid="not-ready-to-join-form">Not Ready To Join Form</div>
  ),
}));

describe("NotReadyToJoin", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders the component correctly", () => {
    render(<NotReadyToJoin />);

    const section = screen.getByRole("region", {
      name: "Not ready to join section",
    });
    expect(section).toBeInTheDocument();
    expect(section).toHaveClass("bg-core-yellow");
  });

  it("displays the correct heading", () => {
    render(<NotReadyToJoin />);

    const heading = screen.getByRole("heading", {
      level: 2,
      name: "Mock Not Ready Heading",
    });
    expect(heading).toBeInTheDocument();
    expect(heading).toHaveClass("font-semibold", "text-[26px]", "md:text-3xl");
  });

  it("displays the description text", () => {
    render(<NotReadyToJoin />);

    const description = screen.getByText("Mock Not Ready Description");
    expect(description).toBeInTheDocument();
  });

  it("displays the contact info heading on desktop", () => {
    render(<NotReadyToJoin />);

    const contactHeading = screen.getByRole("heading", {
      level: 3,
      name: "Mock Contact Info Heading",
    });
    expect(contactHeading).toBeInTheDocument();
    expect(contactHeading).toHaveClass("hidden", "md:block");
  });

  it("renders the TipCard with correct props", () => {
    render(<NotReadyToJoin />);

    const tipCard = screen.getByLabelText("Tip card");
    expect(tipCard).toBeInTheDocument();
    expect(tipCard).toHaveClass("bg-core-white", "sm:max-w-[505px]");

    const tipCardImage = within(tipCard).getByRole("presentation");
    expect(tipCardImage).toBeInTheDocument();
    expect(tipCardImage).toHaveAttribute(
      "src",
      getAssetPath("/images/love.svg"),
    );
  });

  it("renders the ContactInfo component with correct props", () => {
    render(<NotReadyToJoin />);

    const contactInfo = screen.getByLabelText(/Call us directly/i);
    expect(contactInfo).toBeInTheDocument();
    expect(contactInfo).toHaveAttribute("href", "tel:01234567890");
    expect(contactInfo).toHaveTextContent("01234 567890");

    expect(contactInfo.parentElement).toHaveTextContent("Mock Opening Hours");
  });

  it("renders the NotReadyToJoinForm component", () => {
    render(<NotReadyToJoin />);

    const form = screen.getByTestId("not-ready-to-join-form");
    expect(form).toBeInTheDocument();
    expect(form).toHaveTextContent("Not Ready To Join Form");
  });
});
