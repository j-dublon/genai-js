import { fireEvent, render, screen } from "@testing-library/react";
import { ReactNode } from "react";
import { vi } from "vitest";

import { useCookieNotice } from "@/contexts/CookieNotice"; // Adjust the import path
import { defaultChoices } from "@/contexts/CookieNotice/defaultChoices";

import { cookieBannerProps } from "./cookieBannerProps";
import { CookieNotice } from "./cookieNotice"; // Adjust the import path

// Mock the useCookieNotice hook
vi.mock("@/contexts/CookieNotice", () => ({
  useCookieNotice: vi.fn(),
}));

// Mock the ScrollerVertical and Button components
vi.mock("./scrollerVertical", () => ({
  ScrollerVertical: ({ children }: { children: ReactNode }) => (
    <div>{children}</div>
  ),
}));

vi.mock("@react-component-library/ui", () => ({
  Button: ({ children, ...props }: { children: ReactNode }) => (
    <button {...props}>{children}</button>
  ),
}));

describe("CookieNotice Component", () => {
  const mockSave = vi.fn();

  beforeEach(() => {
    (useCookieNotice as jest.Mock).mockReturnValue({
      choices: { defaultChoices },
      save: mockSave,
    });
  });

  afterEach(() => {
    mockSave.mockClear();
  });

  it("renders the cookie notice with the correct header and message", () => {
    render(<CookieNotice />);

    expect(
      screen.getByText(cookieBannerProps.cookie_header_one),
    ).toBeInTheDocument();
    expect(
      screen.getByText(cookieBannerProps.cookie_message_one),
    ).toBeInTheDocument();
  });

  it('calls save function with correct preferences when "Accept All Cookies" is clicked', () => {
    render(<CookieNotice />);

    const acceptButton = screen.getByRole("button", {
      name: cookieBannerProps.cookie_button_one_text,
    });
    fireEvent.click(acceptButton);

    expect(mockSave).toHaveBeenCalledWith({
      functionality_storage: "granted",
      ad_storage: "granted",
      ad_user_data: "granted",
      ad_personalization: "granted",
      analytics_storage: "granted",
      personalization_storage: "granted",
      security_storage: "granted",
      ads_backend_tracking: "granted",
    });
  });

  it('toggles the checkCookies state when "Check & manage cookies" is clicked', () => {
    render(<CookieNotice />);

    const manageButton = screen.getByRole("button", {
      name: cookieBannerProps.cookie_button_two_text,
    });
    fireEvent.click(manageButton);

    expect(
      screen.getByText(cookieBannerProps.cookie_header_two),
    ).toBeInTheDocument();
    expect(
      screen.getByText(cookieBannerProps.cookie_message_two),
    ).toBeInTheDocument();
  });

  it("Save preferences called correctly when no options selected", () => {
    render(<CookieNotice />);

    const manageButton = screen.getByRole("button", {
      name: cookieBannerProps.cookie_button_two_text,
    });
    fireEvent.click(manageButton);

    const saveChoices = screen.getByRole("button", {
      name: cookieBannerProps.cookie_button_three_text,
    });
    fireEvent.click(saveChoices);

    expect(mockSave).toHaveBeenCalledWith({
      defaultChoices: {
        ad_storage: "denied",
        ad_user_data: "denied",
        ad_personalization: "denied",
        analytics_storage: "denied",
        personalization_storage: "denied",
        ads_backend_tracking: "denied",
        functionality_storage: "granted",
        security_storage: "granted",
      },
    });
  });
});
