import { render, screen } from "@testing-library/react";
import { expect, test } from "vitest";

import { ReferAFriendPage } from "@/components/pages/ReferAFriendPage";

vi.mock("@react-component-library/ui", () => ({
  useTrustpilotScore: () => ({ data: { trustScore: 4.5 } }),
  ReferAFriendHero: ({
    title,
    text,
    buttonText,
  }: {
    title: string;
    text: string;
    buttonText: string;
  }) => (
    <div data-testid="refer-a-friend-hero">
      <h1>{title}</h1>
      <p>{text}</p>
      <button>{buttonText}</button>
    </div>
  ),
  Button: ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href} data-testid="button">
      {children}
    </a>
  ),
  ColorPill: ({ colorPillText }: { colorPillText: string }) => (
    <span data-testid="color-pill">{colorPillText}</span>
  ),
  ReferralCard: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="referral-card">{children}</div>
  ),
  ReferralCardWrapper: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="referral-card-wrapper">{children}</div>
  ),
  ReasonCard: ({
    heading,
    subHeading,
  }: {
    heading: string;
    subHeading: string;
  }) => (
    <div data-testid="reason-card">
      <h3>{heading}</h3>
      <p>{subHeading}</p>
    </div>
  ),
}));

vi.mock("@/components/molecules/FAQSection", () => ({
  FAQSection: ({ heading, subText }: { heading: string; subText: string }) => (
    <div data-testid="faq-section">
      <h2>{heading}</h2>
      <p>{subText}</p>
    </div>
  ),
}));

vi.mock("@/components/molecules/HowFastCanYouGo", () => ({
  HowFastCanYouGoWrapper: () => (
    <div data-testid="how-fast-can-you-go">How Fast Can You Go Section</div>
  ),
}));

vi.mock("@/components/organisms/Footer", () => ({
  FooterWrapper: ({ trustScore }: { trustScore?: number }) => (
    <footer data-testid="footer">Trust Score: {trustScore}</footer>
  ),
}));

vi.mock("@/components/organisms/Guides", () => ({
  Guides: ({
    guidesHeading,
    guidesSubHeading,
  }: {
    guidesHeading: string;
    guidesSubHeading: string;
  }) => (
    <div data-testid="guides-section">
      <h2>{guidesHeading}</h2>
      <p>{guidesSubHeading}</p>
    </div>
  ),
}));

vi.mock("@/components/organisms/NavBar", () => ({
  NavBarWrapper: ({ isContentPage }: { isContentPage: boolean }) => (
    <nav data-testid="navbar">
      Content Page: {isContentPage ? "true" : "false"}
    </nav>
  ),
}));

vi.mock("next/link", () => ({
  default: ({
    children,
    href,
    target,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    target?: string;
    className?: string;
  }) => (
    <a href={href} target={target} className={className}>
      {children}
    </a>
  ),
}));

describe("ReferAFriend Page E2E", () => {
  test("renders the main page structure", () => {
    render(<ReferAFriendPage />);
    expect(screen.getByTestId("navbar")).toBeInTheDocument();
    expect(screen.getByTestId("refer-a-friend-hero")).toBeInTheDocument();
    expect(screen.getByTestId("footer")).toBeInTheDocument();
  });

  test("displays the hero section with correct content", () => {
    render(<ReferAFriendPage />);
    const heroSection = screen.getByTestId("refer-a-friend-hero");
    expect(heroSection).toHaveTextContent("Share the love and get £50 each");
    expect(heroSection).toHaveTextContent("Get your referral code");
  });

  test('renders the "Everyone wins" section with 3 steps', () => {
    render(<ReferAFriendPage />);
    expect(screen.getByText("Everyone wins (woohoo!)")).toBeInTheDocument();
    expect(screen.getByText("Step 1")).toBeInTheDocument();
    expect(screen.getByText("Step 2")).toBeInTheDocument();
    expect(screen.getByText("Step 3")).toBeInTheDocument();
    expect(screen.getByText("Invite your pals")).toBeInTheDocument();
    expect(screen.getByText("Nudge them to sign up")).toBeInTheDocument();
    expect(screen.getByText("Reap the rewards")).toBeInTheDocument();
    expect(screen.getByTestId("referral-card-wrapper")).toBeInTheDocument();
    expect(screen.getAllByTestId("referral-card")).toHaveLength(3);
  });

  test('displays the "Why Go Cuckoo" section with reason cards', () => {
    render(<ReferAFriendPage />);
    expect(screen.getByText(/You get it/)).toBeInTheDocument();
    expect(screen.getByText(/here's why they will too/)).toBeInTheDocument();
    const reasonCards = screen.getAllByTestId("reason-card");
    expect(reasonCards).toHaveLength(3);
    expect(
      screen.getByText("Ridiculously fast full fibre"),
    ).toBeInTheDocument();
    expect(screen.getByText("Really fancy eero router")).toBeInTheDocument();
    expect(screen.getByText("UK-based Customer Care")).toBeInTheDocument();
  });

  test("includes FAQ section", () => {
    render(<ReferAFriendPage />);
    const faqSection = screen.getByTestId("faq-section");
    expect(faqSection).toBeInTheDocument();
    expect(faqSection).toHaveTextContent(
      "Got questions? We've got the answers.",
    );
  });

  test("includes Guides section", () => {
    render(<ReferAFriendPage />);
    const guidesSection = screen.getByTestId("guides-section");
    expect(guidesSection).toBeInTheDocument();
    expect(guidesSection).toHaveTextContent(
      "Guiding you every step of the way",
    );
  });

  test("displays Terms and Conditions link", () => {
    render(<ReferAFriendPage />);
    const tcLink = screen.getByRole("link", { name: "Ts&Cs" });
    expect(tcLink).toBeInTheDocument();
    expect(tcLink).toHaveAttribute("href", "/legal/promotional-terms");
    expect(tcLink).toHaveAttribute("target", "_blank");
  });

  test('displays "Refer a friend now" button with correct link', () => {
    render(<ReferAFriendPage />);
    const referButton = screen.getByRole("link", {
      name: "Refer a friend now",
    });
    expect(referButton).toBeInTheDocument();
    expect(referButton).toHaveAttribute("href", "/account/login");
  });

  test("includes How Fast Can You Go section", () => {
    render(<ReferAFriendPage />);
    expect(screen.getByTestId("how-fast-can-you-go")).toBeInTheDocument();
  });

  test("displays trust score in footer", () => {
    render(<ReferAFriendPage />);
    const footer = screen.getByTestId("footer");
    expect(footer).toHaveTextContent("Trust Score: 4.5");
  });

  test("displays the £50 referral amount in multiple places", () => {
    render(<ReferAFriendPage />);
    expect(
      screen.getByText(/Share the love and get £50 each/),
    ).toBeInTheDocument();
    expect(
      screen.getByText(/you'll both get £50\* of referral credit/),
    ).toBeInTheDocument();
  });
});
